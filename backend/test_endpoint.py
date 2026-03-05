import requests
import json

url = "http://localhost:8000/api/auth/forgot-password"
payload = {"email": "khilanmangukiya@gmail.com"}
headers = {"Content-Type": "application/json"}

print(f"Sending POST request to {url}")
try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
