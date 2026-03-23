/* ============================================================
   Content Fabrik — Interactions
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* Initialize Lucide icons */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNav();
  initHamburger();
  initScrollReveal();
  initActiveNav();
  initContactForm();

});

/* ============================================================
   NAVIGATION — scroll state
   ============================================================ */
function initNav() {
  const nav = document.querySelector('.nav-wrapper');
  if (!nav) return;

  const THRESHOLD = 80;

  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > THRESHOLD);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const hamburger  = document.querySelector('.hamburger');
  const closeBtn   = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  if (!hamburger || !mobileMenu) return;

  const open = () => {
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Menü schliessen');

    /* Focus first link */
    const firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) setTimeout(() => firstLink.focus(), 300);
  };

  const close = () => {
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Menü öffnen');
    hamburger.focus();
  };

  const toggle = () => {
    document.body.classList.contains('menu-open') ? close() : open();
  };

  hamburger.addEventListener('click', toggle);
  closeBtn?.addEventListener('click', close);

  /* Close on mobile link click */
  mobileLinks.forEach(link => link.addEventListener('click', close));

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      close();
    }
  });

  /* Close on overlay backdrop click */
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) close();
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  /* Add stagger delays to groups of cards/pillars/pricing */
  const staggerSelectors = [
    { parent: '.cards-2x2',    child: '.card' },
    { parent: '.pillars-grid', child: '.pillar' },
    { parent: '.portfolio-grid', child: '.portfolio-card' },
    { parent: '.pricing-grid', child: '.pricing-card' },
  ];

  staggerSelectors.forEach(({ parent, child }) => {
    document.querySelectorAll(parent).forEach(grid => {
      grid.querySelectorAll(child).forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        /* Trigger pillar border animation */
        if (entry.target.classList.contains('pillar')) {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach(el => observer.observe(el));

  /* Pillar observer — triggers the top-border width animation */
  const pillars = document.querySelectorAll('.pillar');
  const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        pillarObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  pillars.forEach(p => pillarObserver.observe(p));
}

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', isActive);
          link.toggleAttribute('aria-current', isActive);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -30% 0px',
  });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  const validators = {
    name:    (v) => v.trim().length >= 2 ? null : 'Bitte geben Sie Ihren Namen ein.',
    email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    message: (v) => v.trim().length >= 10 ? null : 'Bitte schreiben Sie mindestens 10 Zeichen.',
    privacy: (_, el) => el.checked ? null : 'Bitte stimmen Sie der Datenschutzerklärung zu.',
  };

  const getError = (name, el) => {
    const fn = validators[name];
    return fn ? fn(el.value, el) : null;
  };

  const showError = (field, msg) => {
    const input = field.querySelector('.form-input, .form-checkbox');
    const errorEl = field.querySelector('.form-error');
    if (input) input.classList.toggle('is-error', !!msg);
    if (errorEl) errorEl.textContent = msg || '';
  };

  const clearError = (field) => showError(field, null);

  /* Live validation on blur */
  form.querySelectorAll('.form-input, .form-checkbox').forEach(input => {
    input.addEventListener('blur', () => {
      const field = input.closest('.form-field');
      if (!field) return;
      const name = input.id || input.name;
      const error = getError(name, input);
      showError(field, error);
    });

    input.addEventListener('input', () => {
      const field = input.closest('.form-field');
      if (!field) return;
      const name = input.id || input.name;
      const error = getError(name, input);
      if (!error) clearError(field);
    });
  });

  /* Submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const fields = form.querySelectorAll('.form-field');
    fields.forEach(field => {
      const input = field.querySelector('.form-input, .form-checkbox');
      if (!input) return;
      const name = input.id || input.name;
      if (!validators[name]) return;
      const error = getError(name, input);
      showError(field, error);
      if (error) isValid = false;
    });

    if (!isValid) {
      /* Focus first error */
      const firstError = form.querySelector('.form-input.is-error, .form-checkbox.is-error');
      firstError?.focus();
      return;
    }

    /* Simulate submission — replace with real endpoint */
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Wird gesendet…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.hidden = true;
      if (success) {
        success.hidden = false;
        /* Re-init Lucide for the success icon */
        if (typeof lucide !== 'undefined') lucide.createIcons();
        success.focus();
      }
    }, 800);
  });
}

/* ============================================================
   SMOOTH ANCHOR SCROLL (respects nav height)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
