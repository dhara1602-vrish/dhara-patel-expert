/**
 * Dhara Patel - Portfolio Vanilla JavaScript Engine
 * Pure Vanilla JS: Accessible navigation, scrollspy, header elevation & reveal observer
 * Zero external frameworks or libraries.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. DOM Elements
  // -------------------------------------------------------------------------
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation Controller
  // -------------------------------------------------------------------------
  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (isOpen) => {
      const state = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', state);
      mobileToggle.setAttribute('aria-expanded', String(state));
    };

    mobileToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close menu when clicking on any mobile navigation link
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });

    // Close menu when clicking outside of header
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Header Scroll Elevation
  // -------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 4. Scrollspy Navigation Highlighter
  // -------------------------------------------------------------------------
  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // -------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // -------------------------------------------------------------------------
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers without IntersectionObserver
    revealElements.forEach((el) => {
      el.classList.add('revealed');
    });
  }
});
