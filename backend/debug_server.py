import uvicorn
import sys
import os

# Add the current directory to sys.path to allow importing 'app'
sys.path.append(os.getcwd())

from app.main import app

if __name__ == "__main__":
    print("Starting debug server on port 8000...")
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug")
    except Exception as e:
        print(f"FAILED TO START SERVER: {e}")
