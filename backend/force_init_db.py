import sys
import os

# Add the current directory to sys.path
sys.path.append(os.getcwd())

from app.database import engine, Base
from app.models.user import User
from app.models.project import Project
from app.models.auth import AuthToken, PasswordReset, SecurityLog

def init_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully.")

    # Verify schema
    import sqlite3
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(users)")
    columns = [col[1] for col in cursor.fetchall()]
    print(f"Columns in 'users' table: {columns}")
    if 'name' in columns:
        print("SUCCESS: 'name' column found.")
    else:
        print("ERROR: 'name' column NOT found.")
    conn.close()

if __name__ == "__main__":
    init_db()
