// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initMobileMenu();
    initStickyHeader();
    initScrollAnimations();
    initTestimonialSlider();
    initAuthForms();
    initPasswordToggle();
    initPasswordStrength();
    initButtonHandlers();
    
    // Check URL params for auth form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'true') {
        showSignupForm();
    }
});

// Add button handlers initialization
function initButtonHandlers() {
    // Get Started button in hero section
    const getStartedButtons = document.querySelectorAll('a[href="login.html?signup=true"]');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html?signup=true';
        });
    });

    // Login and Signup buttons in header
    const loginButton = document.querySelector('.cta-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.cta-buttons a[href="login.html?signup=true"]');

    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html?signup=true';
        });
    }

    // How It Works button
    const howItWorksButton = document.querySelector('a[href="#how-it-works"]');
    if (howItWorksButton) {
        howItWorksButton.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector('#how-it-works');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const menu = document.querySelector('.menu');
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    const bars = document.querySelectorAll('.hamburger-menu .bar');
                    if (bars.length > 0) {
                        bars[0].style.transform = 'none';
                        bars[1].style.opacity = '1';
                        bars[2].style.transform = 'none';
                    }
                }
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    
    if (!hamburger || !menu) return;
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        // Animate hamburger icon
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
        
        if (menu.classList.contains('active')) {
            // When menu is active, transform bars into X
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            // Reset to original state
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            // Reset hamburger icon
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Sticky header functionality
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '16px 0';
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Add class to trigger animations when elements enter viewport
    const elements = document.querySelectorAll('.feature-card, .benefit-item, .step, .testimonial');
    
    if (elements.length === 0) return;
    
    elements.forEach(element => {
        element.classList.add('scroll-fade-in');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Function to handle scroll event
    function handleScroll() {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0 || dots.length === 0) return;
    
    let currentIndex = 0;
    let interval;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial and dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Start automatic slider
    function startSlider() {
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showTestimonial(index);
            startSlider();
        });
    });
    
    // Initialize slider
    showTestimonial(0);
    startSlider();
}

// Authentication forms functionality
function initAuthForms() {
    const loginTab = document.querySelector('.login-tab');
    const signupTab = document.querySelector('.signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    
    if (!loginTab || !signupTab || !loginForm || !signupForm) return;
    
    // Function to show login form
    function showLoginForm() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }
    
    // Function to show signup form
    function showSignupForm() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }
    
    // Add click events to tabs
    loginTab.addEventListener('click', showLoginForm);
    signupTab.addEventListener('click', showSignupForm);
    
    // Add click events to switch links
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Form submission handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally send a request to your backend
            // For this demo, just show an alert and redirect
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'https://6fe3-103-255-232-154.ngrok-free.app/'; // Redirect to React app dev server after login
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            if (!name || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!terms) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }
            
            // Here you would normally send a request to your backend
            // For this demo, just show an alert and redirect
            alert('Sign up successful! Redirecting to dashboard...');
            window.location.href = 'https://6fe3-103-255-232-154.ngrok-free.app/'; // Redirect to React app dev server after signup
        });
    }
    
    // Make the showSignupForm function available globally
    window.showSignupForm = showSignupForm;
}

// Password toggle functionality
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    if (toggleButtons.length === 0) return;
    
    toggleButtons.forEach(button => {
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
}

// Password strength meter
function initPasswordStrength() {
    const passwordInput = document.getElementById('signup-password');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    if (!passwordInput || strengthSegments.length === 0 || !strengthText) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Reset segments
        strengthSegments.forEach(segment => {
            segment.className = 'strength-segment';
        });
        
        if (password.length > 0) {
            // Check length
            if (password.length >= 8) strength += 1;
            
            // Check for lowercase and uppercase
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
            
            // Check for numbers
            if (/\d/.test(password)) strength += 1;
            
            // Check for special characters
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // Update UI based on strength
            if (strength === 1) {
                strengthSegments[0].classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength === 2) {
                strengthSegments[0].classList.add('weak');
                strengthSegments[1].classList.add('medium');
                strengthText.textContent = 'Fair password';
            } else if (strength === 3) {
                strengthSegments[0].classList.add('medium');
                strengthSegments[1].classList.add('medium');
                strengthSegments[2].classList.add('medium');
                strengthText.textContent = 'Good password';
            } else if (strength >= 4) {
                strengthSegments.forEach(segment => {
                    segment.classList.add('strong');
                });
                strengthText.textContent = 'Strong password';
            }
        } else {
            strengthText.textContent = 'Password strength';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menu = document.querySelector('.menu');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            // Reset hamburger icon
            const bars = document.querySelectorAll('.hamburger-menu .bar');
            if (bars.length > 0) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
});
