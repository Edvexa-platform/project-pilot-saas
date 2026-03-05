import sqlite3

def check_schema():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    print("--- User Table Schema ---")
    cursor.execute("PRAGMA table_info(users)")
    columns = cursor.fetchall()
    for col in columns:
        print(f"ID: {col[0]}, Name: {col[1]}, Type: {col[2]}")
        
    print("\n--- Tables in DB ---")
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for table in tables:
        print(table)
        
    conn.close()

if __name__ == "__main__":
    check_schema()
