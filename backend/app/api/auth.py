from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import os
from jose import jwt, JWTError

from app.database import get_db
from app.models.user import User
from app.models.auth import AuthToken, PasswordReset, SecurityLog
from app.schemas.user import (
    UserRegister, UserResponse, Token, TokenRefreshRequest, 
    ForgotPasswordRequest, ResetPasswordRequest
)
from app.auth.utils import get_password_hash, verify_password
from app.auth.jwt_handler import (
    create_access_token, create_refresh_token, SECRET_KEY, ALGORITHM,
    generate_secure_token, hash_token
)
from app.services.email_service import send_reset_password_email, send_verification_email

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email, 
        name=user.name,
        hashed_password=hashed_password,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Send verification email mock
    send_verification_email(new_user.email, f"http://localhost:3000/verify?token=mock_token")
    
    return new_user

@router.post("/login", response_model=Token)
def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        # Log failed login attempt
        if user:
            log = SecurityLog(
                user_id=user.id, 
                action="failed_login", 
                ip_address=request.client.host,
                device_info=request.headers.get("user-agent")
            )
            db.add(log)
            db.commit()
            
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    
    # Issue tokens
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    # Save Refresh Token
    new_auth_token = AuthToken(
        user_id=user.id,
        refresh_token_hash=hash_token(refresh_token),
        ip_address=request.client.host,
        device_info=request.headers.get("user-agent"),
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(new_auth_token)
    
    # Log successful login
    log = SecurityLog(
        user_id=user.id, 
        action="login", 
        ip_address=request.client.host,
        device_info=request.headers.get("user-agent")
    )
    db.add(log)
    
    db.commit()
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
def refresh(request: Request, refresh_data: TokenRefreshRequest, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(refresh_data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        if email is None or token_type != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
        
    # Check if refresh token is in DB and not expired
    token_hash = hash_token(refresh_data.refresh_token)
    db_token = db.query(AuthToken).filter(AuthToken.refresh_token_hash == token_hash).first()
    
    if not db_token or db_token.expires_at < datetime.utcnow():
        if db_token:
            db.delete(db_token)
            db.commit()
        raise HTTPException(status_code=401, detail="Refresh token expired or revoked")
        
    user = db.query(User).filter(User.id == db_token.user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    # Rotate refresh token (issue new access + new refresh)
    new_access_token = create_access_token(data={"sub": user.email})
    new_refresh_token = create_refresh_token(data={"sub": user.email})
    
    # Update DB token
    db_token.refresh_token_hash = hash_token(new_refresh_token)
    db_token.expires_at = datetime.utcnow() + timedelta(days=7)
    db_token.ip_address = request.client.host
    
    # Log rotation
    log = SecurityLog(user_id=user.id, action="token_refresh", ip_address=request.client.host)
    db.add(log)
    
    db.commit()
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    
    # To prevent email enumeration, we always return success message
    if user:
        token = generate_secure_token()
        expiry = datetime.utcnow() + timedelta(minutes=15)
        
        # Store reset token hash
        user.reset_token_hash = hash_token(token)
        user.reset_token_expiry = expiry
        
        # Also store in PasswordReset table for auditing
        db_reset = PasswordReset(
            user_id=user.id,
            token_hash=hash_token(token),
            expires_at=expiry
        )
        db.add(db_reset)
        
        # Log event
        log = SecurityLog(user_id=user.id, action="password_reset_requested")
        db.add(log)
        db.commit()
        
        # Send email
        reset_link = f"http://localhost:3000/reset-password?token={token}"
        send_reset_password_email(user.email, reset_link)
        
        return {
            "message": "If an account exists for this email, a password reset link has been sent.",
            "dev_reset_link": reset_link
        }
        
    return {"message": "If an account exists for this email, a password reset link has been sent."}

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    token_hash = hash_token(data.token)
    user = db.query(User).filter(User.reset_token_hash == token_hash).first()
    
    if not user or user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
        
    # Update password
    user.hashed_password = get_password_hash(data.new_password)
    
    # Clear reset token
    user.reset_token_hash = None
    user.reset_token_expiry = None
    
    # Revoke all active sessions for security
    db.query(AuthToken).filter(AuthToken.user_id == user.id).delete()
    
    # Log event
    log = SecurityLog(user_id=user.id, action="password_reset_completed")
    db.add(log)
    
    db.commit()
    
    return {"message": "Password updated successfully. All other sessions have been logged out."}
