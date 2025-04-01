function handleScrollEvents() {
    reveal();
    revealAbout();
    revealSections();
    handleNavbarScroll();
}

function initializeAll() {
    initAnimations();
    setupLightbox();
    setupNavigation();
    handleFormSubmission();
}

// Reveal animations on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Specific About section animations
function revealAbout() {
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    const features = document.querySelectorAll('.feature-item');
    
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    // Check if about section is in view
    const aboutTop = document.querySelector('.about').getBoundingClientRect().top;
    
    if (aboutTop < windowHeight - elementVisible) {
        aboutImage.classList.add('active');
        aboutContent.classList.add('active');
        
        // Add delay to each feature item
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('active');
            }, 200 * (index + 1));
        });
    }
}

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically handle the form submission
    // For now, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Navbar scroll effect
function handleNavbarScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Initialize all animations
function initAnimations() {
    reveal();
    revealAbout();
    handleNavbarScroll();
}

// Event listeners
window.addEventListener('scroll', initAnimations);
window.addEventListener('load', initAnimations);
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Optional: Refresh animations on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAnimations, 250);
});

function revealSections() {
    const titleContainers = document.querySelectorAll('.section-title-container');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    titleContainers.forEach(container => {
        const elementTop = container.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            container.classList.add('active');
        }
    });
}

// Add these lines to your script.js file to setup full-screen image viewing
function setupLightbox() {
    const projectImages = document.querySelectorAll('.project-card img');
    const viewLinks = document.querySelectorAll('.view-image-link');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Function to open lightbox
    function openLightbox(imageSrc, title) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imageSrc;
        
        // Only show caption if not on mobile
        if (window.innerWidth > 768) {
            lightboxCaption.textContent = title;
            lightboxCaption.style.display = 'block';
        } else {
            lightboxCaption.style.display = 'none';
        }
        
        document.body.style.overflow = 'hidden';
    }
    
    // Open lightbox when clicking on project images
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('.project-info h3').textContent;
            openLightbox(this.src, projectTitle);
        });
    });
    
    // Open lightbox when clicking on "View Image" links
    viewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const img = projectCard.querySelector('img');
            const projectTitle = projectCard.querySelector('.project-info h3').textContent;
            openLightbox(img.src, projectTitle);
        });
    });
    
    // Close lightbox when clicking the close button
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Update lightbox behavior on window resize
    window.addEventListener('resize', function() {
        if (lightbox.style.display === 'flex') {
            if (window.innerWidth <= 768) {
                lightboxCaption.style.display = 'none';
            } else {
                lightboxCaption.style.display = 'block';
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', initializeAll);
window.addEventListener('scroll', handleScrollEvents);