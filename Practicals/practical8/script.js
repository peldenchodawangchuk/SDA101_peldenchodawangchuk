document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = document.getElementById('submitButton');
            
    // Get error message containers
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');
            
    // Get icons
    const usernameIcon = document.getElementById('username-icon');
    const emailIcon = document.getElementById('email-icon');
    const passwordIcon = document.getElementById('password-icon');
    const confirmPasswordIcon = document.getElementById('confirmPassword-icon');
            
    // Get password requirement elements
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqLowercase = document.getElementById('req-lowercase');
    const reqSpecial = document.getElementById('req-special');
            
    // Get password strength meter
    const passwordStrengthMeter = document.querySelector('.password-strength-meter');
            
    // Validation functions
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username.length < 3) {
            showError(usernameInput, usernameError, usernameIcon, "Username must be at least 3 characters long");
            return false;
        } else {
            showSuccess(usernameInput, usernameError, usernameIcon);
            return true;
        }
    }
            
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, emailIcon, "Please enter a valid email address");
            return false;
        } else {
            showSuccess(emailInput, emailError, emailIcon);
            return true;
        }
    }
            
    function validatePassword() {
        const password = passwordInput.value;
        let isValid = true;
        let strength = 0;
        
        // Check length
        if (password.length >= 8) {
            markRequirementValid(reqLength);
            strength++;
        } else {
            markRequirementInvalid(reqLength);
            isValid = false;
        }
                
        // Check uppercase
        if (/[A-Z]/.test(password)) {
            markRequirementValid(reqUppercase);
            strength++;
        } else {
            markRequirementInvalid(reqUppercase);
            isValid = false;
        }
                
        // Check lowercase
        if (/[a-z]/.test(password)) {
            markRequirementValid(reqLowercase);
            strength++;
        } else {
            markRequirementInvalid(reqLowercase);
            isValid = false;
        }
                
        // Check special character
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            markRequirementValid(reqSpecial);
            strength++;
        } else {
            markRequirementInvalid(reqSpecial);
            isValid = false;
        }
                
        // Update password strength meter
        passwordStrengthMeter.className = `password-strength-meter strength-${strength}`;
        
        if (isValid) {
            showSuccess(passwordInput, passwordError, passwordIcon);
        } else {
            showError(passwordInput, passwordError, passwordIcon, "Password does not meet all requirements");
        }
        
        return isValid;
    }
            
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
                
        if (confirmPassword === "" || password !== confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError, confirmPasswordIcon, "Passwords do not match");
            return false;
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError, confirmPasswordIcon);
            return true;
        }
    }
            
    // Helper functions
    function showError(input, errorElement, iconElement, message) {
        input.classList.remove('valid-input');
        input.classList.add('invalid-input');
        errorElement.textContent = message;
        iconElement.className = 'fas fa-times-circle text-red-500';
    }
            
    function showSuccess(input, errorElement, iconElement) {
        input.classList.remove('invalid-input');
        input.classList.add('valid-input');
        errorElement.textContent = '';
        iconElement.className = 'fas fa-check-circle text-green-500';
    }
            
    function markRequirementValid(element) {
        const icon = element.querySelector('i');
        icon.className = 'fas fa-check-circle mr-2 text-green-500';
        element.classList.add('text-green-600');
        element.classList.remove('text-gray-500');
    }
            
    function markRequirementInvalid(element) {
        const icon = element.querySelector('i');
        icon.className = 'fas fa-circle mr-2 text-gray-300';
        element.classList.remove('text-green-600');
        element.classList.add('text-gray-500');
    }
            
    function validateForm() {
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
                
        // Enable submit button only if all validations pass
        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
            
    // Event listeners for real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
            
    // Validate entire form on any input to update submit button state
    form.addEventListener('input', validateForm);
            
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
                
        if (validateForm()) {
            // In a real application, you would submit the form data to a server here
            alert('Form submitted successfully!');
            // Reset form
            form.reset();
            submitButton.disabled = true;
                    
            // Reset styles and icons
            const inputs = [usernameInput, emailInput, passwordInput, confirmPasswordInput];
            const icons = [usernameIcon, emailIcon, passwordIcon, confirmPasswordIcon];
                    
            inputs.forEach(input => {
                input.classList.remove('valid-input', 'invalid-input');
            });
                    
            icons.forEach(icon => {
                icon.className = 'fas text-gray-400';
            });
                    
            // Reset password requirements
            const requirements = [reqLength, reqUppercase, reqLowercase, reqSpecial];
            requirements.forEach(req => {
                const icon = req.querySelector('i');
                icon.className = 'fas fa-circle mr-2 text-gray-300';
                req.classList.remove('text-green-600');
                req.classList.add('text-gray-500');
            });
                    
            // Reset password strength meter
            passwordStrengthMeter.className = 'password-strength-meter strength-0';
        }
    });
});