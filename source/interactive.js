// Mobile menu toggle - updated for current HTML structure
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Add icon change
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-terran-blue';
        } else {
            icon.className = 'fas fa-times text-terran-blue';
        }
    });
}

// Add scrolling effect for navigation
let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background on scroll
    if (scrollTop > 50) {
        nav.style.background = 'rgba(26, 32, 44, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'rgba(26, 32, 44, 0.8)';
    }
    
    // Hide/show nav on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
        nav.style.transition = 'transform 0.3s ease';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Image hover effects - enhanced
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        this.style.boxShadow = '0 0 30px rgba(49, 130, 206, 0.5)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Status counter animation - enhanced with Terran theme
let units = 147;
let minerals = 12450;
let vespene = 3280;
let apm = 287;

function updateTerranStatus() {
    // Animate unit count
    units += Math.floor(Math.random() * 3) - 1;
    if (units < 140) units = 140;
    if (units > 160) units = 160;
    
    // Animate resource counts
    minerals += Math.floor(Math.random() * 200) - 100;
    if (minerals < 11000) minerals = 11000;
    if (minerals > 13000) minerals = 13000;
    
    vespene += Math.floor(Math.random() * 100) - 50;
    if (vespene < 3000) vespene = 3000;
    if (vespene > 3500) vespene = 3500;
    
    // Animate APM
    apm += Math.floor(Math.random() * 11) - 5;
    if (apm < 250) apm = 250;
    if (apm > 320) apm = 320;
    
    // Update DOM elements
    const unitElements = document.querySelectorAll('.text-terran-blue');
    if (unitElements.length > 0) {
        unitElements.forEach(el => {
            if (el.textContent.includes('UNITS') || el.parentElement.textContent.includes('UNITS')) {
                el.textContent = units;
            }
        });
    }
    
    const mineralElements = document.querySelectorAll('.text-yellow-400');
    if (mineralElements.length > 0) {
        mineralElements.forEach(el => {
            if (el.textContent.includes('MINERALS') || el.parentElement.textContent.includes('MINERALS')) {
                el.textContent = (minerals / 1000).toFixed(1) + 'K';
            }
        });
    }
    
    const vespeneElements = document.querySelectorAll('.text-green-400');
    if (vespeneElements.length > 0) {
        vespeneElements.forEach(el => {
            if (el.textContent.includes('VESPENE') || el.parentElement.textContent.includes('VESPENE')) {
                el.textContent = (vespene / 1000).toFixed(1) + 'K';
            }
        });
    }
    
    // Update APM counter if exists
    const apmCounter = document.getElementById('apm-counter');
    if (apmCounter) {
        apmCounter.textContent = apm;
    }
}

// Update status every 3 seconds
setInterval(updateTerranStatus, 3000);

// Initialize status on load
updateTerranStatus();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.className = 'fas fa-bars text-terran-blue';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Section observer for active nav highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add pulse animation to status dots
const statusDots = document.querySelectorAll('.status-dot');
statusDots.forEach(dot => {
    dot.style.animation = 'pulse 2s infinite';
});

// Deploy button effects
const deployButtons = document.querySelectorAll('button:contains("DEPLOY"), button:contains("Deploy")');
deployButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.boxShadow = '0 10px 25px rgba(49, 130, 206, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '';
    });
    
    button.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        }, 100);
        
        // Play deploy sound (you would need audio file)
        // const deploySound = new Audio('deploy-sound.mp3');
        // deploySound.play();
        
        // Show deploy animation
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(49, 130, 206, 0.3)';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        ripple.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: '200px', height: '200px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    });
});

// Add typing effect to command status
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const commandStatus = document.querySelector('.text-green-400');
    if (commandStatus && commandStatus.textContent === 'ONLINE') {
        const texts = [
            'COMMAND ONLINE',
            'SYSTEMS NOMINAL',
            'TERRAN DOMINION ACTIVE',
            'ALL UNITS REPORTING'
        ];
        let currentIndex = 0;
        
        setInterval(() => {
            typeWriter(commandStatus, texts[currentIndex]);
            currentIndex = (currentIndex + 1) % texts.length;
        }, 5000);
    }
});

// Add parallax effect to background images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-cover');
    
    parallaxElements.forEach((element, index) => {
        const rate = scrolled * 0.1 * (index % 2 === 0 ? -1 : 1);
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + D for deploy
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        const deployBtn = document.querySelector('button:contains("DEPLOY")');
        if (deployBtn) deployBtn.click();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.className = 'fas fa-bars text-terran-blue';
    }
});

// Initialize tooltips
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(26, 32, 44, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.border = '1px solid #3182ce';
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                element._tooltip.remove();
                delete element._tooltip;
            }
        });
    });
};

// Initialize tooltips on load
window.addEventListener('load', initTooltips);

// Add this to handle window resize (close mobile menu on large screens)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.className = 'fas fa-bars text-terran-blue';
    }
});