// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelectorAll('a[href^="#"]').forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = document.querySelectorAll('.project-text, .project-gallery, .about-text, .about-images, .values-text, .values-cards, .values-image, .section-title');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Active link highlighting on scroll
    const sections = Array.from(document.querySelectorAll('section[id], footer[id], .product-card[id]'));
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        rootMargin: '-30% 0px -65% 0px',
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
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
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => sec && sectionObserver.observe(sec));
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Gallery item hover effects
document.querySelectorAll('.gallery-item, .about-img-main, .about-img-secondary, .values-image img').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Value card hover effects
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(212, 175, 55, 0.1)';
        this.style.transform = 'translateX(10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        this.style.transform = 'translateX(0)';
    });
});

// Search functionality
document.querySelector('.search-box input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm) {
            // Simple search functionality - scroll to relevant section
            if (searchTerm.includes('coffee') || searchTerm.includes('cà phê')) {
                document.querySelector('.product-showcase').scrollIntoView({ behavior: 'smooth' });
            } else if (searchTerm.includes('food') || searchTerm.includes('thức ăn')) {
                document.querySelector('.product-showcase').scrollIntoView({ behavior: 'smooth' });
            } else if (searchTerm.includes('project') || searchTerm.includes('dự án')) {
                document.querySelector('.project-section').scrollIntoView({ behavior: 'smooth' });
            } else if (searchTerm.includes('about') || searchTerm.includes('về chúng tôi')) {
                document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Mobile menu toggle (for future mobile optimization)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-image');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.signature-section > *, .product-showcase .product-card');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states for animated elements
    const heroElements = document.querySelectorAll('.signature-section > *, .product-showcase .product-card');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Social media links functionality
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your social media URLs here
        console.log('Social media link clicked');
    });
});

// Form validation for search
document.querySelector('.search-box input').addEventListener('input', function() {
    const searchButton = document.querySelector('.search-box button');
    if (this.value.trim()) {
        searchButton.style.color = '#D4AF37';
    } else {
        searchButton.style.color = '#fff';
    }
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
});

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, a, .product-card, .gallery-item, .value-card');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
});