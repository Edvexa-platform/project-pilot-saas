import requests
import json

BASE_URL = "http://localhost:8000"

# User details from previous check
EMAIL = "khilanmangukiya@gmail.com"
PASSWORD = "password" # Assuming standard password for testing or from context

def test_project_flow():
    # 1. Login
    print("--- 1. Logging in ---")
    login_res = requests.post(f"{BASE_URL}/api/auth/login", data={"username": EMAIL, "password": PASSWORD})
    if login_res.status_code != 200:
        print(f"Login failed: {login_res.text}")
        return
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful.")

    # 2. Create Project
    print("\n--- 2. Creating Project ---")
    proj_data = {
        "title": "AI Smart Home Security",
        "description": "An IoT based security system using ESP32 and Computer Vision.",
        "category": "IoT",
        "tech_stack": "Python, OpenCV, ESP32, MQTT",
        "deadline": "2024-06-01"
    }
    create_res = requests.post(f"{BASE_URL}/api/projects/", json=proj_data, headers=headers)
    if create_res.status_code != 200:
        print(f"Create failed: {create_res.text}")
        return
    project = create_res.json()
    project_id = project["id"]
    print(f"Project created with ID: {project_id}")

    # 3. List Projects
    print("\n--- 3. Listing Projects ---")
    list_res = requests.get(f"{BASE_URL}/api/projects/", headers=headers)
    print(f"Projects count: {len(list_res.json())}")

    # 4. Trigger Generation
    print("\n--- 4. Triggering Generation ---")
    # Using a dummy key for testing, backend should handle or error gracefully
    gen_res = requests.post(f"{BASE_URL}/api/projects/{project_id}/generate?api_key=test_key", headers=headers)
    if gen_res.status_code != 200:
        print(f"Generation failed: {gen_res.text}")
    else:
        print("Generation triggered successfully.")
        print(gen_res.json()["message"])

    # 5. Check Project Again
    print("\n--- 5. Verifying Data Persistence ---")
    get_res = requests.get(f"{BASE_URL}/api/projects/{project_id}", headers=headers)
    updated_proj = get_res.json()
    if updated_proj.get("generated_at"):
        print("PASS: generated_at is set.")
    else:
        print("FAIL: generated_at is NOT set (might be expected if Groq call failed).")

if __name__ == "__main__":
    test_project_flow()
