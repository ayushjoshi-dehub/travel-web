document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const emailInput = document.querySelector('.input[type="email"]');
    const passwordInput = document.querySelector('.input[type="password"]');
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    const socialButtons = document.querySelectorAll('.social-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }
        if (email === 'user@example.com' && password === 'password') {
            alert('Login successful!');
            window.location.href = 'anthola.html';
        } else {
            alert('Invalid email or password.');
        }
    });

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Password reset instructions sent to your email.');
    });

    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.querySelector('.svg').alt || 'social';
            console.log(`Sign in with ${provider}`);
        });
    });
});