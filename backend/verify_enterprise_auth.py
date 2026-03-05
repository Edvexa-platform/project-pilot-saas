import requests
import json
import time

BASE_URL = "http://localhost:8000/api"
TEST_EMAIL = f"test_{int(time.time())}@example.com"
TEST_PASS = "EnterprisePass123!"

def test_enterprise_auth():
    print(f"Testing with Email: {TEST_EMAIL}")
    
    # 1. Register
    print("\n--- 1. Registering ---")
    reg_res = requests.post(f"{BASE_URL}/auth/register", json={
        "email": TEST_EMAIL,
        "password": TEST_PASS,
        "name": "Test Enterprise User"
    })
    print(f"Status: {reg_res.status_code}")
    if reg_res.status_code != 200:
        print(reg_res.text)
        return

    # 2. Login
    print("\n--- 2. Logging In ---")
    login_res = requests.post(f"{BASE_URL}/auth/login", data={
        "username": TEST_EMAIL,
        "password": TEST_PASS
    })
    print(f"Status: {login_res.status_code}")
    if login_res.status_code != 200:
        print(login_res.text)
        return
    
    tokens = login_res.json()
    access_token = tokens["access_token"]
    refresh_token = tokens["refresh_token"]
    print("Tokens received successfully.")

    # 3. Refresh Token
    print("\n--- 3. Refreshing Token ---")
    refresh_res = requests.post(f"{BASE_URL}/auth/refresh", json={
        "refresh_token": refresh_token
    })
    print(f"Status: {refresh_res.status_code}")
    if refresh_res.status_code == 200:
        print("Token rotation successful.")
        new_tokens = refresh_res.json()
        access_token = new_tokens["access_token"]
    else:
        print(f"Refresh failed: {refresh_res.text}")

    # 4. Forgot Password
    print("\n--- 4. Forgot Password ---")
    fp_res = requests.post(f"{BASE_URL}/auth/forgot-password", json={
        "email": TEST_EMAIL
    })
    print(f"Status: {fp_res.status_code}")
    print(fp_res.json().get("message"))

    # 5. Access Restricted (Get Me)
    print("\n--- 5. Get Current User ---")
    me_res = requests.get(f"{BASE_URL}/users/me", headers={
        "Authorization": f"Bearer {access_token}"
    })
    print(f"Status: {me_res.status_code}")
    if me_res.status_code == 200:
        user = me_res.json()
        print(f"Hello, {user.get('name')} (Role: {user.get('role')})")

if __name__ == "__main__":
    test_enterprise_auth()
