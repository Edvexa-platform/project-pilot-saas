from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String)
    tech_stack = Column(String)
    deadline = Column(String, nullable=True)
    
    # AI Generation Content
    abstract = Column(Text, nullable=True)
    problem_statement = Column(Text, nullable=True)
    architecture_description = Column(Text, nullable=True)
    tech_stack_details = Column(Text, nullable=True) # JSON string
    files_json = Column(Text, nullable=True) # JSON string of files
    
    # File URLs/Paths
    report_file_url = Column(String, nullable=True)
    ppt_file_url = Column(String, nullable=True)
    code_zip_url = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    generated_at = Column(DateTime, nullable=True)

    owner = relationship("User", back_populates="projects")
