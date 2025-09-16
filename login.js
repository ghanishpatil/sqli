// Login Challenge JavaScript
let currentHintIndex = 0;
const hints = [
    "Look closely at the login form... there might be something interesting about how it handles user input.",
    "Sometimes developers forget to properly sanitize user input before passing it to database queries.",
    "What happens if you try entering special characters like single quotes (') in the username field?",
    "SQL injection often involves manipulating the WHERE clause of a SELECT statement. Think about how you could make it always return true.",
    "Try using ' OR '1'='1 as both username and password. Sometimes the simplest payloads work best."
];

// Initialize the login challenge
document.addEventListener('DOMContentLoaded', function() {
    updateHintDisplay();
    
    // Add form submission handler
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Add terminal output
    addTerminalOutput(`login_attempt --user="${username}"`);
    
    // Send login request
    const API_BASE = window.API_BASE || 'https://your-render-service.onrender.com';
    fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.text())
    .then(data => {
        displayResponse(data);
        addTerminalOutput(`login_response --status=received`);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse('Error: Unable to connect to server');
        addTerminalOutput(`login_error --message="Connection failed"`);
    });
}

// Display response from server
function displayResponse(response) {
    const responseArea = document.getElementById('response-area');
    const responseContent = document.getElementById('response-content');
    
    responseContent.innerHTML = response;
    responseArea.style.display = 'block';
    
    // Add some terminal effects
    addTerminalOutput(`response_analysis --length=${response.length}`);
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

// Add some challenge-specific effects
function addChallengeEffects() {
    const effects = [
        'sql_analysis --injection_points=1',
        'vulnerability_scan --target=login.php',
        'payload_generator --ready',
        'exploit_framework --loaded',
        'database_connection --established',
        'admin_panel --access_denied',
        'authentication_bypass --attempting',
        'sql_injection --testing'
    ];
    
    setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance every 3 seconds
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            addTerminalOutput(randomEffect);
        }
    }, 3000);
}

// Start challenge effects
setTimeout(addChallengeEffects, 2000);
