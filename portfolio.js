// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you soon.');

});

// ============================================
// Notification Function
// ============================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// Smooth Scroll Animation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
const animatedElements = document.querySelectorAll('.skill-card, .project-card');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.highlight-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 30;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Start animation when element is in view
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        }, { threshold: 0.5 });

        counterObserver.observe(counter);
    });
}

animateCounters();

// ============================================
// Active Navigation Link
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #6366f1;
        border-bottom: 3px solid #6366f1;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ============================================
// Customization Helper
// ============================================
console.log(`
╔════════════════════════════════════════════════════════════╗
║         Personal Portfolio - Customization Guide          ║
╚════════════════════════════════════════════════════════════╝

TO CUSTOMIZE THIS PORTFOLIO:

1. UPDATE PERSONAL INFO (index.html):
   - Change "John Doe" to your name (line 17, 65, etc.)
   - Update email: hello@johndoe.com
   - Update phone: +1234567890
   - Update location: San Francisco, CA
   - Update social media links (Twitter, GitHub, etc.)

2. UPDATE CONTENT (index.html):
   - Hero subtitle and description
   - About section content
   - Project titles, descriptions, and technologies
   - Skills section

3. CUSTOMIZE COLORS (style.css):
   - Primary color: --primary-color: #6366f1
   - Secondary color: --secondary-color: #ec4899
   - Text colors, backgrounds, etc.

4. UPDATE PROJECT IMAGES:
   - Replace placeholder images with your own
   - Update src attribute in project cards

5. CUSTOMIZE FONTS:
   - Change --font-primary and --font-mono in :root

6. ADJUST SPACING:
   - Modify spacing variables (--spacing-xs through --spacing-2xl)
   - Adjust padding/margin throughout

Happy customizing! 🚀
`);
