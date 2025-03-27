// Wait for DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Add keyboard support for hamburger menu
    if (hamburger) {
        hamburger.setAttribute('tabindex', '0');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
                const expanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', expanded);
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate indicator
        testimonialSlides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners for carousel controls
    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        
        // Allow indicators to directly navigate to slides
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Add keyboard support for carousel controls
    const controls = document.querySelectorAll('.control');
    controls.forEach(control => {
        control.setAttribute('tabindex', '0');
        control.setAttribute('role', 'button');
        control.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                control.click();
            }
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send this data to your server
            // For demo purposes, we'll just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavLink() {
        let currentSection = '';
        const headerHeight = document.getElementById('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initial highlight
    highlightNavLink();
    
    // Animation on scroll (simple implementation)
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.service-card, .case-study, .about-image, .about-text');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial styles for animated elements
    document.querySelectorAll('.service-card, .case-study, .about-image, .about-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation function on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});