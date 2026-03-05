import sqlite3
import argparse
import sys
from app.auth.utils import get_password_hash

DB_PATH = "sql_app.db"

def connect_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        return conn
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        sys.exit(1)

def list_users():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, role FROM users")
    users = cursor.fetchall()
    
    print("\n--- CURRENT USERS ---")
    if not users:
        print("No users found.")
    else:
        print(f"{'ID':<5} | {'Email':<35} | {'Role':<10}")
        print("-" * 55)
        for user in users:
            print(f"{user[0]:<5} | {user[1]:<35} | {user[2]:<10}")
    print("---------------------\n")
    conn.close()

def delete_user(email):
    conn = connect_db()
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if not cursor.fetchone():
        print(f"❌ User with email '{email}' not found.")
        conn.close()
        return

    cursor.execute("DELETE FROM users WHERE email = ?", (email,))
    conn.commit()
    print(f"✅ Successfully deleted user: {email}")
    conn.close()

def update_password(email, new_password):
    conn = connect_db()
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if not cursor.fetchone():
        print(f"❌ User with email '{email}' not found.")
        conn.close()
        return

    hashed_pw = get_password_hash(new_password)
    # Also clear any reset tokens
    cursor.execute("""
        UPDATE users 
        SET hashed_password = ?, reset_token_hash = NULL, reset_token_expiry = NULL 
        WHERE email = ?
    """, (hashed_pw, email))
    
    conn.commit()
    print(f"✅ Successfully updated password for user: {email}")
    conn.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage ProjectPilot Database Users")
    parser.add_argument("--list", action="store_true", help="List all registered users")
    parser.add_argument("--delete", metavar="EMAIL", help="Delete a user by email")
    parser.add_argument("--password", nargs=2, metavar=("EMAIL", "NEW_PASSWORD"), help="Update a user's password")
    
    args = parser.parse_args()

    if args.list:
        list_users()
    elif args.delete:
        delete_user(args.delete)
    elif args.password:
        update_password(args.password[0], args.password[1])
    else:
        parser.print_help()
