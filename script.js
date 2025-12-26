// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service items
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });
});

// ========================================
// CONTACT CARD INTERACTIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// ========================================
// AVATAR INTERACTION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const avatar = document.querySelector('.avatar');
    
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// FORM VALIDATION (if forms are added later)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone);
}

// ========================================
// CONTACT FORM HANDLING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('.btn-submit');
        
        // Real-time validation
        emailInput.addEventListener('blur', function() {
            validateField(emailInput, validateEmail);
        });
        
        phoneInput.addEventListener('blur', function() {
            if (phoneInput.value.trim()) {
                validateField(phoneInput, validatePhone);
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // Validate phone if provided
            if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                submitButton.disabled = true;
                submitButton.querySelector('.btn-text').textContent = 'Sending...';
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    // Create mailto link as fallback
                    const subject = encodeURIComponent(document.getElementById('subject').value || 'Contact Form Submission');
                    const body = encodeURIComponent(
                        `Name: ${nameInput.value}\n` +
                        `Email: ${emailInput.value}\n` +
                        `Phone: ${phoneInput.value || 'Not provided'}\n` +
                        `Service: ${document.getElementById('service').value || 'Not specified'}\n\n` +
                        `Message:\n${messageInput.value}`
                    );
                    
                    // Show success message
                    showFormMessage('success', 'Thank you! Your message has been sent. I will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Open email client (optional - you can remove this)
                    // window.location.href = `mailto:musumbamatia23@gmail.com?subject=${subject}&body=${body}`;
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.querySelector('.btn-text').textContent = 'Send Message';
                }, 1500);
            }
        });
        
        function validateField(input, validator) {
            const formGroup = input.closest('.form-group');
            if (input.value.trim() && !validator(input.value)) {
                formGroup.classList.add('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = input === emailInput ? 'Please enter a valid email' : 'Please enter a valid phone number';
                    errorMsg.style.display = 'block';
                }
                return false;
            } else {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) errorMsg.style.display = 'none';
                return true;
            }
        }
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = message;
                errorMsg.style.display = 'block';
            }
        }
        
        function showFormMessage(type, message) {
            formMessage.className = `form-message ${type}`;
            formMessage.textContent = message;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});

// ========================================
// ENHANCED NAVIGATION ACTIVE STATE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ========================================
// ANIMATE ELEMENTS ON SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-card, .service-detail-card, .contact-info-card, .contact-form-card, .why-item, .quick-action-card');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        animateObserver.observe(el);
    });
});

// ========================================
// PHONE NUMBER CLICK HANDLER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for phone links (optional analytics)
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
            // Add analytics tracking here if needed
        });
    });
});

// ========================================
// WHATSAPP LINK HANDLER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp link clicked');
            // Add analytics tracking here if needed
        });
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (element.dataset.target > 50 ? '+' : '%');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + (element.dataset.target > 50 ? '+' : '%');
            }
        };
        window.requestAnimationFrame(step);
    };
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ========================================
// SERVICE LINK HANDLING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Handle service links from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = service;
        }
    }
});

// ========================================
// BUTTON CLICK TRACKING (for analytics)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-primary, .btn-service');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log('CTA Button clicked:', buttonText);
            // Add analytics tracking here if needed
            // Example: gtag('event', 'button_click', { 'button_name': buttonText });
        });
    });
});

// ========================================
// ENHANCED FORM SUBMISSION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Pre-fill service if coming from services page
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const serviceMap = {
            'education': 'Education (ICT & CRE)',
            'music': 'Music Training',
            'web-design': 'Website Design'
        };
        
        if (serviceParam && serviceMap[serviceParam]) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                for (let option of serviceSelect.options) {
                    if (option.text === serviceMap[serviceParam]) {
                        serviceSelect.value = option.value;
                        break;
                    }
                }
            }
        }
    }
});

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY (Optional)
// ========================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            // Show temporary success message
            showNotification('Copied to clipboard!');
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--primary-color); color: white; padding: 1rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 10000; animation: fadeInUp 0.3s ease-out;';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Handle anchor links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

