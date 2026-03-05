import os
import smtplib
from dotenv import load_dotenv

load_dotenv()
email_user = os.getenv("EMAIL_USER")
email_pass = os.getenv("EMAIL_PASS")

print(f"Testing login for {email_user}...")
try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.set_debuglevel(1)
        server.starttls()
        server.login(email_user, email_pass)
        print("Login successful!")
except Exception as e:
    print(f"Login failed: {e}")
