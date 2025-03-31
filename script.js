document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Form validation and submission
    const loginFormElement = document.getElementById('login-form');
    
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Basic validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Here you would normally send the data to your server
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Simulate successful login
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to the next page after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
    
    // Create account link
    const createAccountLink = document.getElementById('create-account-link');
    
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
    
    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        
        if (!email) {
            showNotification('Please enter your email first', 'error');
            return;
        }
        
        // Here you would normally send a password reset email
        console.log('Password reset requested for:', email);
        
        showNotification('Password reset link sent to your email', 'success');
    });
    
    // Notification system
    function showNotification(message, type) {
        // Check if a notification container already exists
        let notificationContainer = document.querySelector('.notification-container');
        
        // If not, create one
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
            
            // Style the notification container
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.right = '20px';
            notificationContainer.style.zIndex = '1000';
        }
        
        // Create the notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        // Add the notification to the container
        notificationContainer.appendChild(notification);
        
        // Trigger reflow to enable animation
        notification.offsetHeight;
        
        // Show the notification
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            
            // Remove the element after the transition
            setTimeout(() => {
                notification.remove();
                
                // Remove the container if it's empty
                if (notificationContainer.children.length === 0) {
                    notificationContainer.remove();
                }
            }, 300);
        }, 3000);
    }
});
