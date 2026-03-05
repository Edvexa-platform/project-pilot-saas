import logging
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, body_text: str, body_html: str):
    """
    Core email sender that chooses the backend based on environment variables.
    """
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")
    resend_api_key = os.getenv("RESEND_API_KEY")
    smtp_host = os.getenv("SMTP_HOST")
    
    # 1. Try Gmail SMTP (as requested by user)
    if email_user and email_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = os.getenv("MAIL_FROM", email_user)
            msg["To"] = to_email

            part1 = MIMEText(body_text, "plain")
            part2 = MIMEText(body_html, "html")
            msg.attach(part1)
            msg.attach(part2)

            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(email_user, email_pass)
                server.sendmail(msg["From"], [to_email], msg.as_string())
            
            logger.info(f"Email sent via Gmail SMTP to {to_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send via Gmail SMTP: {e}")

    # 2. Try Resend
    elif resend_api_key:
        try:
            import requests
            url = "https://api.resend.com/emails"
            headers = {
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "from": os.getenv("MAIL_FROM", "ProjectPilot <onboarding@resend.dev>"),
                "to": [to_email],
                "subject": subject,
                "html": body_html
            }
            res = requests.post(url, headers=headers, json=payload)
            if res.status_code in [200, 201]:
                logger.info(f"Email sent via Resend to {to_email}")
                return True
            logger.error(f"Resend Error: {res.text}")
        except Exception as e:
            logger.error(f"Failed to send via Resend: {e}")

    # 3. Try Standard SMTP Fallback
    elif smtp_host:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = os.getenv("MAIL_FROM", "noreply@projectpilot.com")
            msg["To"] = to_email

            part1 = MIMEText(body_text, "plain")
            part2 = MIMEText(body_html, "html")
            msg.attach(part1)
            msg.attach(part2)

            with smtplib.SMTP(smtp_host, int(os.getenv("SMTP_PORT", 587))) as server:
                if os.getenv("SMTP_TLS", "true").lower() == "true":
                    server.starttls()
                server.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASS"))
                server.sendmail(msg["From"], [to_email], msg.as_string())
            
            logger.info(f"Email sent via SMTP to {to_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send via SMTP: {e}")

    # 3. Fallback: Local HTML Inbox (Developer Mode)
    try:
        inbox_path = os.path.join(os.getcwd(), "inbox.html")
        email_content = f"""
        <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0; font-family: sans-serif; border-radius: 12px; background: #fff;">
            <div style="color: #666; font-size: 12px; margin-bottom: 10px;">
                <strong>To:</strong> {to_email} | 
                <strong>Subject:</strong> {subject} | 
                <strong>Time:</strong> {os.getenv('LOCAL_TIME', 'Just now')}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            {body_html}
        </div>
        """
        
        # Write to file (append mode)
        with open(inbox_path, "a", encoding="utf-8") as f:
            f.write(email_content)
        
        logger.info(f"DEBUG: Email saved to {inbox_path}. Open this file in your browser to view the reset link.")
        return True
    except Exception as e:
        logger.error(f"Failed to write to local inbox: {e}")
        return False

def send_reset_password_email(email: str, reset_link: str):
    subject = "Reset Your ProjectPilot Password"
    body_text = f"Hello, click the link below to reset your password: {reset_link}\nThis link expires in 15 minutes."
    body_html = f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000;">Reset Your Password</h2>
        <p>You requested a password reset for your ProjectPilot account. Click the button below to set a new password:</p>
        <a href="{reset_link}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
        <p style="color: #999; font-size: 12px;">The link will expire in 15 minutes.</p>
    </div>
    """
    return send_email(email, subject, body_text, body_html)

def send_verification_email(email: str, verification_link: str):
    subject = "Verify Your ProjectPilot Account"
    body_text = f"Welcome to ProjectPilot! Please verify your email: {verification_link}"
    body_html = f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000;">Verify Your Email</h2>
        <p>Welcome to ProjectPilot! Please verify your email address to get started:</p>
        <a href="{verification_link}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify Email</a>
    </div>
    """
    return send_email(email, subject, body_text, body_html)
