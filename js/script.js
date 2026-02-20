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
        const closeMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('open');
        };

        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
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
        // Use escape sequences to avoid encoding issues in source files.
        const moonIcon = '\uD83C\uDF19';
        const sunIcon = '\u2600\uFE0F';
        themeToggle.textContent = document.body.classList.contains('dark') ? sunIcon : moonIcon;
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = document.body.classList.contains('dark') ? sunIcon : moonIcon;
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

    // FAQ accordion behavior (single-open + keyboard navigation)
    const faqButtons = Array.from(document.querySelectorAll('.faq-question'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setAnswerState = (answer, open, immediate = false) => {
        if (!answer) return;
        if (open) {
            answer.hidden = false;
            answer.classList.add('is-open');
            answer.setAttribute('aria-hidden', 'false');
            if (immediate) {
                answer.style.maxHeight = reducedMotion ? 'none' : `${answer.scrollHeight}px`;
                return;
            }
            if (reducedMotion) {
                answer.style.maxHeight = 'none';
                return;
            }
            answer.style.maxHeight = '0px';
            requestAnimationFrame(() => {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            });
            return;
        }

        answer.classList.remove('is-open');
        answer.setAttribute('aria-hidden', 'true');
        if (immediate) {
            answer.style.maxHeight = '0px';
            answer.hidden = true;
            return;
        }
        if (reducedMotion) {
            answer.style.maxHeight = '0px';
            answer.hidden = true;
            return;
        }
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        requestAnimationFrame(() => {
            answer.style.maxHeight = '0px';
        });
        const onTransitionEnd = () => {
            if (answer.getAttribute('aria-hidden') === 'true') {
                answer.hidden = true;
            }
            answer.removeEventListener('transitionend', onTransitionEnd);
        };
        answer.addEventListener('transitionend', onTransitionEnd);
    };

    // Initialize FAQ so one item is open by default.
    if (faqButtons.length && !faqButtons.some((btn) => btn.getAttribute('aria-expanded') === 'true')) {
        faqButtons[0].setAttribute('aria-expanded', 'true');
    }
    faqButtons.forEach((btn) => {
        const answerId = btn.getAttribute('aria-controls');
        const answer = answerId ? document.getElementById(answerId) : null;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        setAnswerState(answer, isExpanded, true);
    });

    faqButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';

            faqButtons.forEach((otherBtn) => {
                if (otherBtn === btn) return;
                otherBtn.setAttribute('aria-expanded', 'false');
                const otherAnswerId = otherBtn.getAttribute('aria-controls');
                const otherAnswer = otherAnswerId ? document.getElementById(otherAnswerId) : null;
                setAnswerState(otherAnswer, false);
            });

            btn.setAttribute('aria-expanded', String(!expanded));
            const answerId = btn.getAttribute('aria-controls');
            const answer = answerId ? document.getElementById(answerId) : null;
            setAnswerState(answer, !expanded);
        });

        btn.addEventListener('keydown', (event) => {
            if (!faqButtons.length) return;
            let targetIndex = index;

            if (event.key === 'ArrowDown') targetIndex = (index + 1) % faqButtons.length;
            if (event.key === 'ArrowUp') targetIndex = (index - 1 + faqButtons.length) % faqButtons.length;
            if (event.key === 'Home') targetIndex = 0;
            if (event.key === 'End') targetIndex = faqButtons.length - 1;

            if (targetIndex !== index) {
                event.preventDefault();
                faqButtons[targetIndex].focus();
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
