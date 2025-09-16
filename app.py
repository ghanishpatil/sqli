from flask import Flask, request, render_template_string, redirect, url_for, send_from_directory
import sqlite3
import os
from flask_cors import CORS

app = Flask(__name__, static_folder='.')
CORS(app)

# Database configuration
DB_NAME = 'ctf.db'

def init_database():
    """Initialize the SQLite database with test data"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT
        )
    ''')
    
    # Insert test data (only if table is empty)
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO users (username, password) VALUES ('admin', 'password123')")
        cursor.execute("INSERT INTO users (username, password) VALUES ('user1', 'secret')")
        cursor.execute("INSERT INTO users (username, password) VALUES ('hacker', 'pwned')")
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    """Serve the main index page"""
    return send_from_directory('.', 'index.html')

@app.route('/login.html')
def login_page():
    """Serve the login page"""
    return send_from_directory('.', 'login.html')

@app.route('/login', methods=['POST'])
def login():
    """Handle login form submission - VULNERABLE TO SQL INJECTION"""
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    
    # Log the attempt (for educational purposes)
    print(f"Login attempt - Username: {username}, Password: {password}")
    
    # Special challenge payload: username must be 'admin' and password must be exactly "'1=1" (no trailing quote)
    if username.strip().lower() == 'admin' and password.strip() == "'1=1":
        return '''
        <div class="success-message">
            <h3>🎉 LOGIN SUCCESSFUL! 🎉</h3>
            <p>Welcome, admin!</p>
            <p>You have successfully bypassed the authentication system!</p>
            <div class="flag-container">
                <h4>🏆 FLAG CAPTURED! 🏆</h4>
                <div class="flag">flag= location 6</div>
            </div>
            <p class="congratulations">Congratulations! You have completed the SQL Injection challenge!</p>
        </div>
        
        <style>
            .success-message {
                background: rgba(0, 255, 0, 0.1);
                border: 2px solid #00ff00;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                color: #00ff00;
                text-align: center;
            }
            .flag-container {
                background: rgba(0, 0, 0, 0.5);
                border: 2px solid #ffff00;
                border-radius: 5px;
                padding: 15px;
                margin: 15px 0;
            }
            .flag {
                font-family: 'Source Code Pro', monospace;
                font-size: 1.2em;
                font-weight: bold;
                color: #ffff00;
                background: #000;
                padding: 10px;
                border-radius: 3px;
                margin: 10px 0;
                text-shadow: 0 0 10px #ffff00;
            }
            .congratulations {
                font-size: 1.1em;
                font-weight: bold;
                color: #00ff00;
                margin-top: 20px;
                text-shadow: 0 0 10px #00ff00;
            }
        </style>
        '''
    
    # VULNERABLE SQL QUERY - This is intentionally vulnerable to SQL injection (kept for realism)
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    print(f"SQL Query: {query}")
    
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        conn.close()
        
        if result:
            # Successful login
            return f'''
            <div class="success-message">
                <h3>🎉 LOGIN SUCCESSFUL! 🎉</h3>
                <p>Welcome, {result[1]}!</p>
                <p>You have successfully bypassed the authentication system!</p>
                <div class="flag-container">
                    <h4>🏆 FLAG CAPTURED! 🏆</h4>
                    <div class="flag">flag= location 6</div>
                </div>
                <div class="admin-panel">
                    <h4>Admin Panel Access Granted:</h4>
                    <ul>
                        <li>User ID: {result[0]}</li>
                        <li>Username: {result[1]}</li>
                        <li>Password: {result[2]}</li>
                    </ul>
                </div>
                <p class="congratulations">Congratulations! You have completed the SQL Injection challenge!</p>
            </div>
            
            <style>
                .success-message {{
                    background: rgba(0, 255, 0, 0.1);
                    border: 2px solid #00ff00;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    color: #00ff00;
                    text-align: center;
                }}
                .flag-container {{
                    background: rgba(0, 0, 0, 0.5);
                    border: 2px solid #ffff00;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 15px 0;
                }}
                .flag {{
                    font-family: 'Source Code Pro', monospace;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #ffff00;
                    background: #000;
                    padding: 10px;
                    border-radius: 3px;
                    margin: 10px 0;
                    text-shadow: 0 0 10px #ffff00;
                }}
                .admin-panel {{
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid #00ff00;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 15px 0;
                    text-align: left;
                }}
                .admin-panel ul {{
                    list-style: none;
                    padding: 0;
                }}
                .admin-panel li {{
                    padding: 5px 0;
                    border-bottom: 1px solid #333;
                }}
                .admin-panel li:last-child {{
                    border-bottom: none;
                }}
                .congratulations {{
                    font-size: 1.1em;
                    font-weight: bold;
                    color: #00ff00;
                    margin-top: 20px;
                    text-shadow: 0 0 10px #00ff00;
                }}
            </style>
            '''
        else:
            # Failed login
            return '''
            <div class="error-message">
                <h3>❌ LOGIN FAILED ❌</h3>
                <p>Invalid username or password. Try again!</p>
                <p class="hint">💡 Hint: This system is vulnerable to SQL injection. Think about how you could manipulate the query...</p>
            </div>
            
            <style>
                .error-message {
                    background: rgba(255, 0, 0, 0.1);
                    border: 2px solid #ff0000;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    color: #ff0000;
                    text-align: center;
                }
                .hint {
                    font-style: italic;
                    color: #ffff00;
                    margin-top: 10px;
                }
            </style>
            '''
    except Exception as e:
        return (
            '<div class="error-message">'
            '<h3>❌ ERROR ❌</h3>'
            '<p>Database error: ' + str(e) + '</p>'
            '</div>'
            '<style>'
            '.error-message {'
            'background: rgba(255, 0, 0, 0.1);'
            'border: 2px solid #ff0000;'
            'border-radius: 8px;'
            'padding: 20px;'
            'margin: 20px 0;'
            'color: #ff0000;'
            'text-align: center;'
            '}'
            '</style>'
        )

@app.route('/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, etc.)"""
    return send_from_directory('.', filename)

if __name__ == '__main__':
    # Initialize database
    init_database()
    
    port = int(os.environ.get('PORT', 5000))
    print("🚀 Starting HACKER CTF Platform...")
    print(f"📍 Server running at: http://localhost:{port}")
    print("⚠️  WARNING: This platform is intentionally vulnerable for educational purposes!")
    print("🔓 SQL Injection vulnerability is active on /login endpoint")
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=port)
