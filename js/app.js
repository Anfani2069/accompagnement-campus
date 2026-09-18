/* ============================================================
   AGENCE ACCOMPAGNEMENT — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    /* Close menu when a link is clicked */
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const header    = document.querySelector('.site-header');
  const headerH   = header ? header.offsetHeight + 16 : 80;

  function setActiveLink() {
    let current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - headerH) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---- Scroll fade-up animations ---- */
  const fadeTargets = [
    '.srv-card', '.step-item', '.why-card', '.plan-card',
    '.blog-card', '.faq-item', '.about-inner', '.hero-content',
    '.hero-visual', '.contact-inner', '.section-header'
  ];

  document.querySelectorAll(fadeTargets.join(',')).forEach(function (el) {
    el.classList.add('fade-up');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  /* ---- Stagger children in grids ---- */
  const gridParents = document.querySelectorAll(
    '.services-grid, .why-grid, .blog-grid, .steps-list, .pricing-grid'
  );
  gridParents.forEach(function (parent) {
    parent.querySelectorAll('.fade-up').forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  /* ---- Contact form validation ---- */
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      /* Clear previous errors */
      form.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      /* Required fields */
      const required = form.querySelectorAll('[required]');
      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      /* Email format */
      const emailField = form.querySelector('#email');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) {
        feedback.textContent = 'Veuillez remplir tous les champs obligatoires correctement.';
        feedback.className = 'form-feedback error';
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      /* Success state (static demo — replace with real submission) */
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

      setTimeout(function () {
        feedback.textContent = 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.';
        feedback.className = 'form-feedback success';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma demande';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1000);
    });

    /* Live error clearing */
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) field.classList.remove('error');
      });
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
