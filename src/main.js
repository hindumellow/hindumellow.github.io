
// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference, if any, on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDark ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  // Simple icon toggle (Sun/Moon emojis or SVGs)
  // For now using emoji
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    // Change icon based on state
    if (navLinks.classList.contains('nav-open')) {
      menuToggle.textContent = '✕';
      menuToggle.style.position = 'fixed'; // Keep it visible on top of menu
      menuToggle.style.right = '20px';
    } else {
      menuToggle.textContent = '☰';
      menuToggle.style.position = 'static';
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      menuToggle.textContent = '☰';
      menuToggle.style.position = 'static';
    });
  });
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .skill-category, .interest-card').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

console.log('Portfolio initialized');
