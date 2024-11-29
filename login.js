document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateEmail(email) {
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        input.parentElement.classList.add('error');
    }

    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = '';
        input.parentElement.classList.remove('error');
    }

    emailInput.addEventListener('input', () => {
        clearError(emailInput);
    });

    passwordInput.addEventListener('input', () => {
        clearError(passwordInput);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Email validation
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically make an API call to validate credentials
            // For demonstration, we'll use localStorage (not secure for real applications)
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const user = storedUsers.find(u => 
                u.email === emailInput.value && u.password === passwordInput.value
            );

            if (user) {
                alert('Login Successful!');
                // Redirect to dashboard or home page
                // window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        }
    });
});