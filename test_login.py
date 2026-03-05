import requests

url = "http://127.0.0.1:8000/api/auth/login"
data = {"username": "test@example.com", "password": "password123"}
try:
    # OAuth2 login uses form data
    response = requests.post(url, data=data)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Error:", e)
