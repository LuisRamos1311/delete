// Auth state management
let currentUser = null;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const signupLink = document.getElementById('signupLink');

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login (in a real app, this would be an API call)
    login(email, password);
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Toggle form to signup mode
    document.querySelector('.modal h2').textContent = 'Sign Up';
    loginForm.querySelector('button[type="submit"]').textContent = 'Sign Up';
    signupLink.parentElement.style.display = 'none';
});

// Auth functions
function login(email, password) {
    // Simulate API call
    currentUser = {
        email,
        id: Math.random().toString(36).substr(2, 9)
    };
    
    // Save user data
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    loginModal.style.display = 'none';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    updateAuthUI();
}

function updateAuthUI() {
    if (currentUser) {
        loginBtn.textContent = currentUser.email;
        loginBtn.classList.add('logged-in');
        
        // Create user menu if it doesn't exist
        if (!document.querySelector('.user-menu-content')) {
            const menu = document.createElement('div');
            menu.className = 'user-menu-content';
            menu.innerHTML = `
                <a href="#" id="watchlistLink">My Watchlist</a>
                <a href="#" id="logoutBtn">Log Out</a>
            `;
            loginBtn.parentElement.appendChild(menu);
            
            // Add logout handler
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    } else {
        loginBtn.textContent = 'Log In';
        loginBtn.classList.remove('logged-in');
        
        // Remove user menu if it exists
        const menu = document.querySelector('.user-menu-content');
        if (menu) {
            menu.remove();
        }
    }
}

// Check for existing session
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
});