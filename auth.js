// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('usernameDisplay').textContent = currentUser.username;
        document.getElementById('creditsDisplay').textContent = currentUser.credits;
    } else {
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
    }
}

// Show signup form
function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Show login form
function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Sign up new user
function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
        alert('Username already exists. Please choose a different one.');
        return;
    }
    
    // Create new user
    const newUser = {
        username,
        password, // Note: In a real app, you should hash passwords
        credits: 100 // Starting credits
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('Account created successfully! You received 100 starting credits.');
    checkAuth();
}

// Login user
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        alert('Invalid username or password');
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    checkAuth();
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    checkAuth();
}

// Update user credits
function updateCredits(amount) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (currentUser) {
        currentUser.credits += amount;
        
        // Update in users array
        const userIndex = users.findIndex(user => user.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex].credits = currentUser.credits;
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update display if on dashboard
        if (document.getElementById('creditsDisplay')) {
            document.getElementById('creditsDisplay').textContent = currentUser.credits;
        }
        
        return currentUser.credits;
    }
    
    return 0;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});