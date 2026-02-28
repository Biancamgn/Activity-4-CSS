/* =============================================
   PORTFOLIO SCRIPT
   - Active nav highlight on scroll
   - Scroll-to-top button visibility
   - Mobile sidebar toggle
   ============================================= */

(function () {
  'use strict';

  /* ── Helper ── */
  const select = (selector) => document.querySelector(selector);
  const selectAll = (selector) => document.querySelectorAll(selector);

  /* ──────────────────────────────────────────
     1. MOBILE SIDEBAR TOGGLE
  ─────────────────────────────────────────── */
  const sidebar = select('#header');
  const toggleBtn = select('.mobile-nav-toggle');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-open');
      toggleBtn.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      }
    });

    /* Close sidebar when a nav link is clicked on mobile */
    selectAll('#navmenu a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1200) {
          sidebar.classList.remove('sidebar-open');
          toggleBtn.classList.remove('active');
          const icon = toggleBtn.querySelector('i');
          if (icon) {
            icon.classList.add('bi-list');
            icon.classList.remove('bi-x');
          }
        }
      });
    });
  }

  /* ──────────────────────────────────────────
     2. SCROLL-TO-TOP BUTTON
  ─────────────────────────────────────────── */
  const scrollTopBtn = select('.scroll-top');

  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.classList.toggle('active', window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleScrollTop);
    toggleScrollTop(); // run once on load

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ──────────────────────────────────────────
     3. ACTIVE NAV LINK ON SCROLL (scroll spy)
  ─────────────────────────────────────────── */
  const navLinks = selectAll('#navmenu a');
  const sections = selectAll('section[id]');

  const updateActiveNav = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop    = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // run once on load

  /* ──────────────────────────────────────────
     4. FORM SUBMIT FEEDBACK
  ─────────────────────────────────────────── */
  const contactForm = select('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="bi bi-check2-circle"></i> Sent!';
      btn.style.background = '#28a745';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

})();
