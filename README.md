# HACKER CTF Platform

A terminal-style CTF (Capture The Flag) platform with a basic SQL injection challenge, now powered by Python Flask!

## Features

- **Terminal Interface**: Authentic hacker-style terminal UI with green text on black background
- **SQL Injection Challenge**: Basic SQL injection vulnerability in the login system
- **Progressive Hints**: 5 consecutive hints that gradually reveal the solution
- **Interactive Commands**: Terminal commands like `help`, `hint`, `scan`, etc.
- **Python Backend**: Flask server with SQLite database
- **Responsive Design**: Works on desktop and mobile devices

## Files Structure

- `app.py` - Python Flask server (main application)
- `requirements.txt` - Python dependencies
- `run.bat` - Windows batch file to start the server
- `run.sh` - Linux/Mac shell script to start the server
- `index.html` - Main homepage with terminal interface
- `login.html` - SQL injection challenge page
- `style.css` - Terminal-themed CSS styles
- `script.js` - Main JavaScript functionality
- `login.js` - Login challenge specific JavaScript
- `ctf.db` - SQLite database (created automatically)

## Quick Start

### Windows:
1. **Double-click `run.bat`** - This will install dependencies and start the server
2. Open your browser and go to: `http://localhost:5000`

### Linux/Mac:
1. **Run `./run.sh`** - This will install dependencies and start the server
2. Open your browser and go to: `http://localhost:5000`

### Manual Setup:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

## Challenge Details

### SQL Injection Challenge

**Objective**: Bypass the login authentication and retrieve the flag

**Vulnerability**: The login form uses unsanitized user input in SQL queries

**Target**: `/login` endpoint - Login form submission

**Difficulty**: Easy

### Progressive Hints

1. "Look closely at the login form... there might be something interesting about how it handles user input."
2. "Sometimes developers forget to properly sanitize user input before passing it to database queries."
3. "What happens if you try entering special characters like single quotes (') in the username field?"
4. "SQL injection often involves manipulating the WHERE clause of a SELECT statement. Think about how you could make it always return true."
5. "Try using ' OR '1'='1 as both username and password. Sometimes the simplest payloads work best."

### Solution

The vulnerable query is:
```sql
SELECT * FROM users WHERE username = '{username}' AND password = '{password}'
```

**Payload**: 
- Username: `' OR '1'='1`
- Password: `' OR '1'='1`

This manipulates the WHERE clause to always return true, bypassing authentication.

## Terminal Commands

- `help` - Show available commands
- `hint` - Show hint about authorization
- `status` - Check system status
- `scan` - Scan for vulnerabilities
- `login` - Access login system
- `clear` - Clear terminal output
- `whoami` - Show current user
- `ls` - List files
- `pwd` - Show current directory

## Security Notice

⚠️ **WARNING**: This platform is intentionally vulnerable for educational purposes only. Do not use this code in production environments.

## Educational Value

- Demonstrates basic SQL injection concepts
- Shows the importance of input sanitization
- Provides hands-on experience with web application security
- Teaches proper error handling and secure coding practices
- Interactive terminal commands for engagement

## Requirements

- Python 3.6+
- Flask 2.3.3
- SQLite3 (included with Python)

## Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

Educational use only. Not for production deployment.