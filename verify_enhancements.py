import sys
import os

# Add backend directory to path
backend_path = os.path.join(os.getcwd(), 'backend')
sys.path.append(backend_path)

from app.schemas.project import ProjectResponse

def verify_project_response():
    mock_data = {
        "title": "Smart City IoT Dashboard",
        "abstract": "A comprehensive dashboard for monitoring smart city sensors.",
        "problem_statement": "Urban areas lack real-time visibility into sensor data.",
        "architecture_description": "Microservices with MQTT and React frontend.",
        "tech_stack_details": {
            "Frontend": "React",
            "Backend": "FastAPI",
            "Database": "TimescaleDB",
            "IoT": "MQTT"
        },
        "files": [
            {"filename": "main.py", "content": "print('IoT')"}
        ],
        "viva_questions": [
            {"question": "What is MQTT?", "answer": "A lightweight messaging protocol."}
        ],
        "tags": ["IoT", "Dashboard", "Smart City"],
        "estimated_completion_time": "3 weeks"
    }

    try:
        response = ProjectResponse(**mock_data)
        print("[SUCCESS] Validation Successful!")
        print(f"Title: {response.title}")
        print(f"Tags: {response.tags}")
        print(f"ECT: {response.estimated_completion_time}")
    except Exception as e:
        print(f"[ERROR] Validation Failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    verify_project_response()
