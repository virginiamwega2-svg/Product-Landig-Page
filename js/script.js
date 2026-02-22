document.addEventListener('DOMContentLoaded', () => {
    const emitEvent = (eventName, properties = {}) => {
        if (typeof window.trackEvent === 'function') {
            window.trackEvent(eventName, properties);
        }
    };

    document.querySelectorAll('[data-track]').forEach((element) => {
        element.addEventListener('click', () => {
            emitEvent(element.dataset.track, {
                location: element.dataset.trackLocation || 'unknown',
                label: element.textContent ? element.textContent.trim() : ''
            });
        });
    });

    // contact form handling
    const form = document.getElementById('contact-form');
    const messageEl = document.getElementById('form-message');
    if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.email.value.trim();
            if (!email || !form.checkValidity()) {
                messageEl.textContent = 'Please enter a valid email address.';
                messageEl.classList.add('error');
                messageEl.classList.remove('success');
                messageEl.focus();
                emitEvent('lead_submit_invalid', { location: 'contact_form' });
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            const endpoint = form.dataset.endpoint || form.getAttribute('action');
            const formData = new FormData(form);

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Lead submission failed with status ${response.status}`);
                }

                messageEl.textContent = `Thanks, ${email}. We will send your free account setup details shortly.`;
                messageEl.classList.add('success');
                messageEl.classList.remove('error');
                emitEvent('lead_submit_success', { location: 'contact_form' });
                form.reset();
                window.location.assign('thank-you.html');
            } catch (error) {
                messageEl.textContent = 'Signup failed. Please try again or email support@schedai.com.';
                messageEl.classList.add('error');
                messageEl.classList.remove('success');
                emitEvent('lead_submit_error', {
                    location: 'contact_form',
                    reason: error instanceof Error ? error.message : 'unknown'
                });
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Create Free Account';
                }
                messageEl.focus();
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
        const getFocusableInNav = () =>
            Array.from(nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'))
                .filter((el) => !el.hasAttribute('disabled'));
        const isMenuOpen = () => nav.classList.contains('open');

        const closeMenu = ({ restoreFocus = false } = {}) => {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('open');
            if (restoreFocus) {
                menuToggle.focus();
            }
        };

        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
            if (!expanded) {
                const firstLink = getFocusableInNav()[0];
                if (firstLink) firstLink.focus();
            }
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => closeMenu());
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu({ restoreFocus: true });
            }
            if (event.key === 'Tab' && isMenuOpen()) {
                const focusable = getFocusableInNav();
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (!isMenuOpen()) return;
            const target = event.target;
            if (!(target instanceof Node)) return;
            if (!nav.contains(target) && !menuToggle.contains(target)) {
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
