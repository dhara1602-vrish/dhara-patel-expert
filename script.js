/**
 * Creative Editorial Portfolio JavaScript Engine
 * Controls navigation drawer, scrollspy, scroll reveals, and WhatsApp quick form
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Element References
  // -------------------------------------------------------------------------
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.masthead-nav .masthead-link, .mobile-editorial-link');
  const sections = document.querySelectorAll('main section[id]');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const contactForm = document.getElementById('contact-form');

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation Controller
  // -------------------------------------------------------------------------
  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (isOpen) => {
      const state = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', state);
      mobileToggle.setAttribute('aria-expanded', String(state));
      document.body.style.overflow = state ? 'hidden' : '';
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

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });

    // Close when clicking outside of header
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Header Scroll Styling
  // -------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 4. Scrollspy Active Link Highlighter
  // -------------------------------------------------------------------------
  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 140;

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
  // 5. Scroll Reveal Observer (IntersectionObserver)
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
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback
    revealElements.forEach((el) => {
      el.classList.add('revealed');
    });
  }

  // -------------------------------------------------------------------------
  // 6. Interactive Contact Form -> WhatsApp Redirect
  // -------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name')?.value.trim() || 'Client';
      const contact = document.getElementById('client-contact')?.value.trim() || 'Not provided';
      const service = document.getElementById('project-scope')?.value || 'General Inquiry';
      const brief = document.getElementById('project-brief')?.value.trim() || 'I would like to discuss a project.';

      const message = `Hello Dhara, my name is ${name}.
Contact: ${contact}
Interested in: ${service}
Brief: ${brief}`;

      const whatsappUrl = `https://wa.me/919601907678?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // -------------------------------------------------------------------------
  // 7. Accessible Exclusive Accordion for FAQ Details
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.editorial-faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach((faq) => {
      faq.addEventListener('toggle', () => {
        if (faq.open) {
          faqItems.forEach((otherFaq) => {
            if (otherFaq !== faq && otherFaq.open) {
              otherFaq.open = false;
            }
          });
        }
      });
    });
  }
});
