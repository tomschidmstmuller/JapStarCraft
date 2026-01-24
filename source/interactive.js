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


const defaultConfig = {
    commander_name: 'ADM. RAYNOR',
    fleet_name: 'TERRAN DOMINION FLEET',
    mission_title: 'OPERATION: DARK SWARM',
    sector_name: 'SECTOR 7-G',
    status_message: 'ALL SYSTEMS OPERATIONAL',
    background_color: '#0a0e1a',
    panel_color: '#0d1420',
    text_color: '#e0f2fe',
    primary_accent: '#00d9ff',
    secondary_accent: '#14b8a6',
    font_family: 'Rajdhani',
    font_size: 16
};

let config = { ...defaultConfig };

// Mission clock
let missionSeconds = 0;
setInterval(() => {
    missionSeconds++;
    const hours = Math.floor(missionSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((missionSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (missionSeconds % 60).toString().padStart(2, '0');
    const clockEl = document.getElementById('mission-clock');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

// System time
setInterval(() => {
    const now = new Date();
    const timeEl = document.getElementById('system-time');
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);

// Animated resource counters
let minerals = 14820;
let vespene = 9640;
let supplyUsed = 168;

setInterval(() => {
    minerals += Math.floor(Math.random() * 80) + 20;
    vespene += Math.floor(Math.random() * 40) + 10;
    
    const mineralsEl = document.getElementById('minerals');
    const vespeneEl = document.getElementById('vespene');
    
    if (mineralsEl) {
    mineralsEl.textContent = minerals.toLocaleString();
    mineralsEl.classList.add('stat-animate');
    setTimeout(() => mineralsEl.classList.remove('stat-animate'), 400);
    }
    
    if (vespeneEl) {
    vespeneEl.textContent = vespene.toLocaleString();
    vespeneEl.classList.add('stat-animate');
    setTimeout(() => vespeneEl.classList.remove('stat-animate'), 400);
    }
}, 3500);

// Supply fluctuation
setInterval(() => {
    supplyUsed = Math.min(200, supplyUsed + Math.floor(Math.random() * 3) - 1);
    const supplyUsedEl = document.getElementById('supply-used');
    if (supplyUsedEl) {
    supplyUsedEl.textContent = supplyUsed;
    supplyUsedEl.classList.add('stat-animate');
    setTimeout(() => supplyUsedEl.classList.remove('stat-animate'), 400);
    }
}, 5000);

// Intel feed updates
const intelMessages = [
    { type: 'green', text: '● Patrol route complete - All sectors clear' },
    { type: 'red', text: '⚠ Zerg bioforms detected - 12.3 km northeast' },
    { type: 'yellow', text: '◆ Reinforcement squadron inbound - ETA 4 min' },
    { type: 'cyan', text: '◇ Anomaly scan initiated - Deep space sector' },
    { type: 'green', text: '● Hyperspace jump calculations verified' },
    { type: 'red', text: '⚠ Hull breach alarm - Damage control dispatched' },
    { type: 'yellow', text: '◆ Encrypted transmission intercepted' },
    { type: 'cyan', text: '◇ Mining operations at 97% efficiency' },
    { type: 'green', text: '● Fighter squadron launch successful' },
    { type: 'red', text: '⚠ Hostile ship signatures multiplying' },
    { type: 'yellow', text: '◆ Command reviewing tactical options' },
    { type: 'cyan', text: '◇ Long-range sensors recalibrated' }
];

setInterval(() => {
    const feed = document.getElementById('intel-feed');
    if (!feed) return;
    
    const msg = intelMessages[Math.floor(Math.random() * intelMessages.length)];
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    
    const colors = {
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
    cyan: 'text-cyan-300'
    };
    
    const container = feed.querySelector('.space-y-2');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = 'intel-message flex gap-2 items-start opacity-90';
    div.innerHTML = `
    <span class="text-cyan-500/50 whitespace-nowrap">${time}</span>
    <span class="${colors[msg.type]}">${msg.text}</span>
    `;
    
    container.insertBefore(div, container.firstChild);
    
    if (container.children.length > 25) {
    container.removeChild(container.lastChild);
    }
}, 7000);

async function onConfigChange(cfg) {
    config = { ...defaultConfig, ...cfg };
    
    const commanderEl = document.getElementById('commander-name');
    if (commanderEl) commanderEl.textContent = config.commander_name || defaultConfig.commander_name;
    
    const fleetEl = document.getElementById('fleet-name');
    if (fleetEl) fleetEl.textContent = config.fleet_name || defaultConfig.fleet_name;
    
    const missionEl = document.getElementById('mission-title');
    if (missionEl) missionEl.textContent = config.mission_title || defaultConfig.mission_title;
    
    const sectorEl = document.getElementById('sector-name');
    if (sectorEl) sectorEl.textContent = config.sector_name || defaultConfig.sector_name;
    
    const statusEl = document.getElementById('status-message');
    if (statusEl) statusEl.textContent = config.status_message || defaultConfig.status_message;
    
    // Apply colors
    document.documentElement.style.setProperty('--bg-primary', config.background_color || defaultConfig.background_color);
    document.documentElement.style.setProperty('--panel-bg', config.panel_color || defaultConfig.panel_color);
    document.documentElement.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
    document.documentElement.style.setProperty('--cyan-glow', config.primary_accent || defaultConfig.primary_accent);
    document.documentElement.style.setProperty('--teal-accent', config.secondary_accent || defaultConfig.secondary_accent);
    
    // Apply font
    const fontFamily = config.font_family || defaultConfig.font_family;
    document.body.style.fontFamily = `${fontFamily}, Rajdhani, sans-serif`;
    
    // Apply font size
    const baseSize = config.font_size || defaultConfig.font_size;
    document.documentElement.style.fontSize = `${baseSize}px`;
}

function mapToCapabilities(cfg) {
    return {
    recolorables: [
        {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
            cfg.background_color = value;
            if (window.elementSdk) window.elementSdk.setConfig({ background_color: value });
        }
        },
        {
        get: () => cfg.panel_color || defaultConfig.panel_color,
        set: (value) => {
            cfg.panel_color = value;
            if (window.elementSdk) window.elementSdk.setConfig({ panel_color: value });
        }
        },
        {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
            cfg.text_color = value;
            if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
        }
        },
        {
        get: () => cfg.primary_accent || defaultConfig.primary_accent,
        set: (value) => {
            cfg.primary_accent = value;
            if (window.elementSdk) window.elementSdk.setConfig({ primary_accent: value });
        }
        },
        {
        get: () => cfg.secondary_accent || defaultConfig.secondary_accent,
        set: (value) => {
            cfg.secondary_accent = value;
            if (window.elementSdk) window.elementSdk.setConfig({ secondary_accent: value });
        }
        }
    ],
    borderables: [],
    fontEditable: {
        get: () => cfg.font_family || defaultConfig.font_family,
        set: (value) => {
        cfg.font_family = value;
        if (window.elementSdk) window.elementSdk.setConfig({ font_family: value });
        }
    },
    fontSizeable: {
        get: () => cfg.font_size || defaultConfig.font_size,
        set: (value) => {
        cfg.font_size = value;
        if (window.elementSdk) window.elementSdk.setConfig({ font_size: value });
        }
    }
    };
}

function mapToEditPanelValues(cfg) {
    return new Map([
    ['commander_name', cfg.commander_name || defaultConfig.commander_name],
    ['fleet_name', cfg.fleet_name || defaultConfig.fleet_name],
    ['mission_title', cfg.mission_title || defaultConfig.mission_title],
    ['sector_name', cfg.sector_name || defaultConfig.sector_name],
    ['status_message', cfg.status_message || defaultConfig.status_message]
    ]);
}

if (window.elementSdk) {
    window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
    });
} else {
    onConfigChange(defaultConfig);
}
