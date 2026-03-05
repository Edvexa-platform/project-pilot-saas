import sqlite3
import os

db_path = os.path.join('backend', 'sql_app.db')
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    print("Tables:", cursor.fetchall())
    try:
        cursor.execute("SELECT * FROM users;")
        print("Users:", cursor.fetchall())
    except Exception as e:
        print("Error reading users:", e)
    conn.close()
else:
    print("DB file not found at", db_path)
