from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    tech_stack: str
    deadline: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tech_stack: Optional[str] = None
    deadline: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    # Generation metadata
    generated_at: Optional[datetime] = None
    report_file_url: Optional[str] = None
    ppt_file_url: Optional[str] = None
    code_zip_url: Optional[str] = None
    
    # Contents
    abstract: Optional[str] = None
    problem_statement: Optional[str] = None
    architecture_description: Optional[str] = None
    tech_stack_details: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class ProjectRequest(BaseModel):
    api_key: str
    domain: str
    topic: Optional[str] = "Random innovative topic"
    difficulty: str
    tech_stack: str
    year: str

class ProjectGenerationResponse(BaseModel):
    title: str
    abstract: str
    problem_statement: Optional[str] = ""
    architecture_description: Optional[str] = ""
    tech_stack_details: Dict[str, str] = {}
    files: List[Dict[str, str]] = []
    viva_questions: List[Dict[str, str]] = []
    tags: List[str] = []
    estimated_completion_time: Optional[str] = ""

class VivaRequest(BaseModel):
    api_key: str
    messages: List[Dict[str, str]]
    project_data: Dict[str, Any]

class VivaResponse(BaseModel):
    response: str
