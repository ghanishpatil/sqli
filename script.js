// Terminal Interface JavaScript
let currentHintIndex = 0;
const hints = [
    "Look closely at the login form... there might be something interesting about how it handles user input.",
    "Sometimes developers forget to properly sanitize user input before passing it to database queries.",
    "What happens if you try entering special characters like single quotes (') in the username field?",
    "SQL injection often involves manipulating the WHERE clause of a SELECT statement. Think about how you could make it always return true.",
    "Try using ' OR '1'='1 as both username and password. Sometimes the simplest payloads work best."
];

// Available commands
const commands = {
    'help': {
        description: 'Show available commands',
        execute: () => {
            return `Available commands:
help     - Show this help message
hint     - Show hint about authorization
status   - Check system status
scan     - Scan for vulnerabilities
login    - Access login system
clear    - Clear terminal output
whoami   - Show current user
ls       - List files
pwd      - Show current directory`;
        }
    },
    'hint': {
        description: 'Show hint about authorization',
        execute: () => {
            return `Hint: Authorization = Login
You need to find a way to bypass the login system.
Think about how web applications handle user input...`;
        }
    },
    'status': {
        description: 'Check system status',
        execute: () => {
            return `System Status:
- Database: ONLINE
- Web Server: RUNNING
- Security: ENABLED
- Authentication: REQUIRED
- Vulnerabilities: DETECTED`;
        }
    },
    'scan': {
        description: 'Scan for vulnerabilities',
        execute: () => {
            return `Vulnerability Scan Results:
- SQL Injection: DETECTED
- XSS: NOT DETECTED
- CSRF: NOT DETECTED
- File Upload: NOT DETECTED
- Authentication Bypass: POSSIBLE`;
        }
    },
    'login': {
        description: 'Access login system',
        execute: () => {
            window.location.href = 'login.html';
            return 'Redirecting to login system...';
        }
    },
    'clear': {
        description: 'Clear terminal output',
        execute: () => {
            const output = document.getElementById('command-output');
            output.innerHTML = '';
            return '';
        }
    },
    'whoami': {
        description: 'Show current user',
        execute: () => {
            return `Current user: root
User ID: 0
Groups: root, admin, hacker
Access Level: MAXIMUM`;
        }
    },
    'ls': {
        description: 'List files',
        execute: () => {
            return `Directory listing:
-rw-r--r-- 1 root root 1024 login.php
-rw-r--r-- 1 root root 2048 index.html
-rw-r--r-- 1 root root 1536 style.css
-rw-r--r-- 1 root root 4096 script.js
-rw-r--r-- 1 root root 1024 ctf.db
drwxr-xr-x 2 root root 4096 admin/`;
        }
    },
    'pwd': {
        description: 'Show current directory',
        execute: () => {
            return '/var/www/html/ctf-platform';
        }
    }
};

// Initialize the terminal interface
document.addEventListener('DOMContentLoaded', function() {
    // Add some terminal-like effects
    addTerminalEffects();
    
    // Initialize hint system
    updateHintDisplay();
    
    // Initialize terminal commands
    initializeTerminalCommands();
});

// Add terminal effects
function addTerminalEffects() {
    // Add blinking cursor effect
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '_';
    cursor.style.animation = 'blink 1s infinite';
    
    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .cursor {
            color: #00ff00;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Show challenges section
function showChallenge() {
    const challengeSection = document.getElementById('challenge-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    
    challengeSection.style.display = 'block';
    leaderboardSection.style.display = 'none';
    
    // Add some terminal output
    addTerminalOutput('challenge_list --active');
    addTerminalOutput('Found 1 active challenge: SQL Injection - Basic');
}

// Show leaderboard section
function showLeaderboard() {
    const challengeSection = document.getElementById('challenge-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    
    challengeSection.style.display = 'none';
    leaderboardSection.style.display = 'block';
    
    // Add some terminal output
    addTerminalOutput('leaderboard --show');
    addTerminalOutput('Retrieving top hackers...');
}

// Add terminal output
function addTerminalOutput(command) {
    const terminalContent = document.querySelector('.terminal-content');
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'root@hacker-ctf:~$';
    
    const commandSpan = document.createElement('span');
    commandSpan.className = 'command';
    commandSpan.textContent = command;
    
    newLine.appendChild(prompt);
    newLine.appendChild(commandSpan);
    terminalContent.appendChild(newLine);
    
    // Scroll to bottom
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Show next hint
function showNextHint() {
    if (currentHintIndex < hints.length) {
        const hintsList = document.getElementById('hints-list');
        const hintItem = document.createElement('div');
        hintItem.className = 'hint-item';
        hintItem.textContent = `HINT ${currentHintIndex + 1}: ${hints[currentHintIndex]}`;
        hintsList.appendChild(hintItem);
        
        currentHintIndex++;
        updateHintDisplay();
        
        // Add terminal output
        addTerminalOutput(`hint_request --hint_${currentHintIndex}`);
        addTerminalOutput(`Hint ${currentHintIndex} revealed. Use it wisely...`);
        
        // Disable button if all hints shown
        if (currentHintIndex >= hints.length) {
            const hintBtn = document.querySelector('.hint-btn');
            hintBtn.disabled = true;
            hintBtn.textContent = 'ALL HINTS REVEALED';
        }
    }
}

// Update hint display
function updateHintDisplay() {
    const hintCount = document.getElementById('hint-count');
    hintCount.textContent = `${currentHintIndex}/${hints.length}`;
}

// Add some random terminal effects
function addRandomTerminalEffects() {
    const effects = [
        'system_check --security_scan',
        'vulnerability_scan --target=login.php',
        'sql_analysis --injection_points=3',
        'penetration_test --status=running',
        'exploit_framework --loaded',
        'payload_generator --ready',
        'database_connection --established',
        'admin_panel --access_denied'
    ];
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 5 seconds
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            addTerminalOutput(randomEffect);
        }
    }, 5000);
}

// Start random effects after page load
setTimeout(addRandomTerminalEffects, 3000);

// Initialize terminal commands
function initializeTerminalCommands() {
    const commandInput = document.getElementById('command-input');
    const commandOutput = document.getElementById('command-output');
    
    if (commandInput) {
        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = '';
                
                // Add command to output
                addCommandToOutput(command);
                
                // Execute command
                executeCommand(command);
            }
        });
        
        // Focus on input when page loads
        commandInput.focus();
    }
}

// Add command to output
function addCommandToOutput(command) {
    const commandOutput = document.getElementById('command-output');
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'root@hacker-ctf:~$';
    
    const commandSpan = document.createElement('span');
    commandSpan.className = 'command';
    commandSpan.textContent = command;
    
    commandLine.appendChild(prompt);
    commandLine.appendChild(commandSpan);
    commandOutput.appendChild(commandLine);
    
    // Scroll to bottom
    commandOutput.scrollTop = commandOutput.scrollHeight;
}

// Execute command
function executeCommand(command) {
    const commandOutput = document.getElementById('command-output');
    
    if (commands[command]) {
        const result = commands[command].execute();
        if (result) {
            const outputLine = document.createElement('div');
            outputLine.className = 'command-result';
            outputLine.textContent = result;
            commandOutput.appendChild(outputLine);
        }
    } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'command-error';
        errorLine.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
        commandOutput.appendChild(errorLine);
    }
    
    // Scroll to bottom
    commandOutput.scrollTop = commandOutput.scrollHeight;
}

// Add some hacker-style console messages
console.log('%cWARNING: This is a CTF platform for educational purposes only!', 'color: #ff0000; font-size: 16px; font-weight: bold;');
console.log('%cUnauthorized access attempts will be logged and monitored.', 'color: #ffff00; font-size: 12px;');
console.log('%cHappy hacking! 🚀', 'color: #00ff00; font-size: 14px;');
