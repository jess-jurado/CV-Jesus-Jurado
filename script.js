// Global State
let currentLang = 'es';
let currentTheme = 'dark';

// i18n Logic
function updateLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// Theme Logic
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById('theme-icon').innerText = currentTheme === 'dark' ? '🌙' : '☀️';
}

// Tooltip Logic
const tooltip = document.getElementById('tooltip');

function showTooltip(content, e) {
    if (content) {
        tooltip.innerHTML = content;
        tooltip.style.display = 'block';
        moveTooltip(e);
    }
}

function moveTooltip(e) {
    tooltip.style.left = e.clientX + 15 + 'px';
    tooltip.style.top = e.clientY + 15 + 'px';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', (e) => {
        const skill = e.target.getAttribute('data-skill');
        showTooltip(skillDescriptions[currentLang][skill], e);
    });
    tag.addEventListener('mousemove', moveTooltip);
    tag.addEventListener('mouseleave', hideTooltip);
});

document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const cert = e.target.getAttribute('data-cert');
        showTooltip(certDescriptions[currentLang][cert], e);
    });
    card.addEventListener('mousemove', moveTooltip);
    card.addEventListener('mouseleave', hideTooltip);
});

// Event Listeners
document.getElementById('lang-select').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glass-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Global movement state for background
let mouseX = 0;
let mouseY = 0;

// Combined update for background glow
function updateBackground() {
    const glow = document.querySelector('.bg-glow');
    if (glow) {
        const scrollRotation = window.scrollY * 0.015; // "pero poco"
        const scrollTranslate = window.scrollY * 0.05;

        // Multiplicamos por factores para que el movimiento sea sutil
        const finalX = mouseX + (scrollTranslate * 0.2);
        const finalY = mouseY + (scrollTranslate * 0.1);

        glow.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${scrollRotation}deg) scale(1.1)`;
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    updateBackground();
});

// Subtle parallax for glow background
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
    updateBackground();
});

// Initial Setup
updateLanguage('es');
