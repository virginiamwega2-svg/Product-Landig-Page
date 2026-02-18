document.addEventListener('DOMContentLoaded', () => {
    // contact form handling
    const form = document.getElementById('contact-form');
    const messageEl = document.getElementById('form-message');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.email.value;
            if (email) {
                messageEl.textContent = `Thanks for subscribing, ${email}!`;
                messageEl.focus();
                form.reset();
            }
        });
    }

    // reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }

    // mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.site-header nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
        });
    }

    // initialize AOS for pre-built scroll animations
    if (window.AOS) {
        AOS.init({ duration: 800, once: true, mirror: false });
    }

    // theme (dark mode) toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') document.body.classList.add('dark');
    if (themeToggle) {
        // set initial icon based on theme
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    // back-to-top button
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (backBtn) {
            backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    });
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // FAQ expand/collapse
    document.querySelectorAll('.faq-question').forEach((btn) => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            if (answer) {
                answer.style.display = expanded ? 'none' : 'block';
                answer.setAttribute('aria-hidden', String(expanded));
            }
        });
    });

    // register service worker if supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('Service Worker registered'))
            .catch((e) => console.error('Service Worker registration failed', e));
    }
});