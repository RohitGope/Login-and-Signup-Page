document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');

    // Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    function validateName(name) {
        return nameRegex.test(name);
    }

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

    // Input event listeners to clear errors
    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Name validation
        if (!validateName(nameInput.value.trim())) {
            showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
            isValid = false;
        }

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

        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Store user in localStorage (Note: Not secure for real applications)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            const existingUser = users.find(u => u.email === emailInput.value);
            if (existingUser) {
                alert('Email already registered');
                return;
            }

            const newUser = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration Successful! Please login.');
            window.location.href = 'index.html';
        }
    });
});