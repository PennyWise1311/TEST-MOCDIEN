// Modern JavaScript for Mộc Điền Website

class MocDienWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupContactForm();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Header scroll effect
        window.addEventListener('scroll', this.handleHeaderScroll.bind(this));
        
        // Product card interactions
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', this.handleProductCardClick.bind(this));
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation link
            this.updateActiveNavLink(targetId);
        }
    }

    updateActiveNavLink(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleProductCardClick(e) {
        const card = e.currentTarget;
        const category = card.dataset.category;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Navigate to relevant section
        const targetSection = document.querySelector(`#${category}`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    setupScrollEffects() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.coffee-item, .food-category, .value-card, .gallery-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Active section highlighting
        this.setupSectionHighlighting();
    }

    setupSectionHighlighting() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    setupAnimations() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.bg-image');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Hover effects for interactive elements
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        // Coffee items hover effect
        document.querySelectorAll('.coffee-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Value cards hover effect
        document.querySelectorAll('.value-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });

        // Gallery items hover effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (mobileToggle.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = '';
                        span.style.opacity = '';
                    }
                });
            });
        }
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            const handleSearch = () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm) {
                    this.performSearch(searchTerm);
                }
            };
            
            searchBtn.addEventListener('click', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
            
            // Search suggestions
            searchInput.addEventListener('input', this.handleSearchInput.bind(this));
        }
    }

    performSearch(searchTerm) {
        const searchMappings = {
            'coffee': '#coffee',
            'cà phê': '#coffee',
            'ca phe': '#coffee',
            'food': '#food',
            'thực phẩm': '#food',
            'thuc pham': '#food',
            'art': '#creative',
            'nghệ thuật': '#creative',
            'nghe thuat': '#creative',
            'sáng tạo': '#creative',
            'sang tao': '#creative',
            'about': '#about',
            'về': '#about',
            've': '#about',
            'contact': '#contact',
            'liên hệ': '#contact',
            'lien he': '#contact'
        };
        
        for (const [key, section] of Object.entries(searchMappings)) {
            if (searchTerm.includes(key)) {
                const targetElement = document.querySelector(section);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        }
    }

    handleSearchInput(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Visual feedback
        const searchBtn = document.querySelector('.search-btn');
        if (searchTerm.length > 0) {
            searchBtn.style.color = 'var(--primary-color)';
        } else {
            searchBtn.style.color = '';
        }
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
            
            // Form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        }
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (this.validateForm(form)) {
            this.submitContactForm(data);
        }
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Trường này là bắt buộc');
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                this.showFieldError(emailField, 'Email không hợp lệ');
                isValid = false;
            }
        }
        
        return isValid;
    }

    validateField(e) {
        const field = e.target;
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'Trường này là bắt buộc');
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Email không hợp lệ');
            }
        }
    }

    showFieldError(field, message) {
        this.clearFieldError({ target: field });
        
        field.style.borderColor = 'var(--accent-color)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--accent-color)';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(e) {
        const field = e.target;
        field.style.borderColor = '';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    submitContactForm(data) {
        // Show loading state
        const submitBtn = document.querySelector('.contact-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset form
            document.querySelector('.contact-form form').reset();
        }, 2000);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: var(--shadow-medium);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            ">
                ✅ Tin nhắn đã được gửi thành công!
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            this.adjustMobileLayout();
        } else {
            // Desktop-specific adjustments
            this.adjustDesktopLayout();
        }
    }

    adjustMobileLayout() {
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }

    adjustDesktopLayout() {
        // Ensure mobile menu is hidden
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MocDienWebsite();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *, .product-showcase .product-card');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: var(--shadow-medium);
        z-index: 999;
    }
    
    .nav-menu.active .nav-link {
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .hero-text > *,
    .product-showcase .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);