from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.auth.dependencies import get_current_user
from app.models.project import Project
from app.schemas.project import (
    ProjectRequest, 
    ProjectResponse, 
    ProjectGenerationResponse,
    ProjectCreate,
    ProjectUpdate
)

router = APIRouter()

# --- CRUD Endpoints ---

@router.get("/", response_model=list[ProjectResponse])
async def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Project).filter(Project.user_id == current_user.id).order_by(Project.created_at.desc()).all()

@router.post("/", response_model=ProjectResponse)
async def create_user_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_project = Project(**project.dict(), user_id=current_user.id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.post("/{project_id}/generate")
async def generate_project_files(
    project_id: int,
    api_key: str, # Passed from frontend for user's quota
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    try:
        # Generate project content using existing generator
        project_data = generate_project(
            api_key=api_key,
            domain=db_project.category,
            topic=db_project.title,
            difficulty="Advanced", # Default or from project meta if added
            tech_stack=db_project.tech_stack,
            level="Senior"
        )
        
        # Save generated content to DB
        db_project.abstract = project_data.get("abstract")
        db_project.problem_statement = project_data.get("problem_statement")
        db_project.architecture_description = project_data.get("architecture_description")
        import json
        db_project.tech_stack_details = json.dumps(project_data.get("tech_stack_details", {}))
        db_project.files_json = json.dumps(project_data.get("files", []))
        
        # In a real SaaS, we'd upload files to S3 here. 
        # For now, we'll mark as generated and keep content in DB for on-the-fly download.
        from datetime import datetime
        db_project.generated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_project)
        return {"message": "Generation complete", "project": db_project}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}/download/report")
async def download_project_report(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project or not project.generated_at:
        raise HTTPException(status_code=404, detail="Project or report not found")
    
    try:
        import json
        project_data = {
            "title": project.title,
            "domain": project.category,
            "abstract": project.abstract,
            "problem_statement": project.problem_statement,
            "architecture_description": project.architecture_description,
            "tech_stack_details": json.loads(project.tech_stack_details or "{}")
        }
        buffer = generate_report(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f"attachment; filename={project.title.replace(' ', '_')}_Report.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}/download/ppt")
async def download_project_ppt(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project or not project.generated_at:
        raise HTTPException(status_code=404, detail="Project or presentation not found")
    
    try:
        import json
        project_data = {
            "title": project.title,
            "domain": project.category,
            "abstract": project.abstract,
            "problem_statement": project.problem_statement,
            "architecture_description": project.architecture_description,
            "tech_stack_details": json.loads(project.tech_stack_details or "{}")
        }
        buffer = generate_ppt(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": f"attachment; filename={project.title.replace(' ', '_')}_Presentation.pptx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}/download/code")
async def download_project_code(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project or not project.generated_at:
        raise HTTPException(status_code=404, detail="Project or codebase not found")
    
    try:
        import json
        project_data = {
            "files": json.loads(project.files_json or "[]")
        }
        buffer = generate_code_zip(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/zip",
            headers={"Content-Disposition": f"attachment; filename={project.title.replace(' ', '_')}_Codebase.zip"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Legacy/Helper Endpoints ---

@router.post("/generate-raw", response_model=ProjectGenerationResponse)
async def create_raw_project(request: ProjectRequest, current_user: User = Depends(get_current_user)):
    try:
        project_data = generate_project(
            api_key=request.api_key,
            domain=request.domain,
            topic=request.topic,
            difficulty=request.difficulty,
            tech_stack=request.tech_stack,
            level=request.year
        )
        return project_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/download/report")
async def download_report(project_data: dict):
    try:
        buffer = generate_report(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=project_report.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/download/ppt")
async def download_ppt(project_data: dict):
    try:
        buffer = generate_ppt(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": "attachment; filename=project_presentation.pptx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/download/code")
async def download_code(project_data: dict):
    try:
        buffer = generate_code_zip(project_data)
        return StreamingResponse(
            buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=project_code.zip"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
