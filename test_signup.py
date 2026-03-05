import requests

url = "http://127.0.0.1:8000/api/auth/signup"
data = {"email": "test@example.com", "password": "password123"}
try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Error:", e)
