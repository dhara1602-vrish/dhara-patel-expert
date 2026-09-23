/**
 * Zukiswa Phiri — Minimal Editorial Portfolio Motion Engine
 * Powered by GSAP 3 & ScrollTrigger (with graceful fallback & reduced-motion support)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Accessibility Check: Prefers Reduced Motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Verify GSAP Availability
  if (typeof gsap === 'undefined' || prefersReducedMotion) {
    console.log('Editorial Folio: Standard static rendering active (Reduced motion or GSAP not loaded).');
    // Ensure all elements are fully visible
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });
    return;
  }

  // Register GSAP Plugins
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // -------------------------------------------------------------------------
  // 2. SVG Hand-Drawn Arrow Stroke Setup
  // -------------------------------------------------------------------------
  const arrowPath = document.querySelector('.arrow-path');
  const arrowHead = document.querySelector('.arrow-head');
  let arrowLength = 120;
  if (arrowPath && arrowPath.getTotalLength) {
    arrowLength = arrowPath.getTotalLength();
    gsap.set(arrowPath, {
      strokeDasharray: arrowLength,
      strokeDashoffset: arrowLength
    });
  }
  if (arrowHead) {
    gsap.set(arrowHead, { opacity: 0 });
  }

  // -------------------------------------------------------------------------
  // 3. Hero Page Load Timeline
  // -------------------------------------------------------------------------
  const heroTL = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Initial states
  gsap.set('[data-animate="hero-meta"]', { opacity: 0, y: -14 });
  gsap.set('.hero-photo-frame .image-inner-wrapper', {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
  });
  gsap.set('.hero-img', { scale: 1.08 });
  gsap.set('[data-animate="hero-badge"] .hero-name-badge', {
    opacity: 0,
    scale: 0.94,
    rotation: -14,
    y: 20
  });
  gsap.set('[data-animate="hero-subbadge"]', {
    opacity: 0,
    x: 25,
    y: 10
  });

  // Hero entrance choreography
  heroTL
    .to('[data-animate="hero-meta"]', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.15
    })
    .to('.hero-photo-frame .image-inner-wrapper', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'power4.inOut'
    }, '-=0.5')
    .to('.hero-img', {
      scale: 1,
      duration: 1.3,
      ease: 'power3.out'
    }, '-=1.1')
    .to('[data-animate="hero-badge"] .hero-name-badge', {
      opacity: 1,
      scale: 1,
      rotation: -9.5,
      y: 0,
      duration: 0.9,
      ease: 'back.out(1.4)'
    }, '-=0.8')
    .to(arrowPath, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    }, '-=0.4')
    .to(arrowHead, {
      opacity: 1,
      duration: 0.25
    }, '-=0.1')
    .to('[data-animate="hero-subbadge"]', {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'back.out(1.2)'
    }, '-=0.4');

  // -------------------------------------------------------------------------
  // 4. Section 2: My Work Scroll Animations
  // -------------------------------------------------------------------------
  if (typeof ScrollTrigger !== 'undefined') {
    // Keyboard Photo Reveal
    gsap.set('.keyboard-photo-frame .image-inner-wrapper', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    });
    gsap.to('.keyboard-photo-frame .image-inner-wrapper', {
      scrollTrigger: {
        trigger: '.keyboard-photo-frame',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.1,
      ease: 'power4.inOut'
    });

    // Work Right Column Content Timeline
    const workTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-right-column',
        start: 'top 78%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    });

    gsap.set('[data-animate="work-badge"]', { opacity: 0, x: -20 });
    gsap.set('[data-animate="work-bio"]', { opacity: 0, y: 18 });
    gsap.set('[data-animate="project-item"]', { opacity: 0, y: 22 });
    gsap.set('.project-asterisk-icon', { rotation: -90 });

    workTL
      .to('[data-animate="work-badge"]', {
        opacity: 1,
        x: 0,
        duration: 0.7
      })
      .to('[data-animate="work-bio"]', {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, '-=0.4')
      .to('[data-animate="project-item"]', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2
      }, '-=0.3')
      .to('.project-asterisk-icon', {
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      }, '-=0.6');

    // -----------------------------------------------------------------------
    // 5. Section 3: Services I Offer Scroll Animations
    // -----------------------------------------------------------------------
    const servicesTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-services',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    });

    gsap.set('[data-animate="services-header"]', { opacity: 0, scale: 0.95, y: -15 });
    gsap.set('[data-animate="service-card"]', { opacity: 0, y: 28 });
    gsap.set('.service-icon-wrap', { scale: 0.9, opacity: 0 });

    servicesTL
      .to('[data-animate="services-header"]', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7
      })
      .to('[data-animate="service-card"]', {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.15
      }, '-=0.3')
      .to('.service-icon-wrap', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.5)'
      }, '-=0.5');

    // -----------------------------------------------------------------------
    // 6. Section 4: Connect With Me Scroll Animations
    // -----------------------------------------------------------------------
    const contactTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-contact',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    });

    gsap.set('.contact-photo-frame .image-inner-wrapper', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    });
    gsap.set('.contact-img', { scale: 1.06 });
    gsap.set('[data-animate="contact-badge"] .contact-badge', {
      opacity: 0,
      scale: 0.95,
      rotation: -8,
      x: -25
    });
    gsap.set('.contact-detail-row', { opacity: 0, y: 15 });

    contactTL
      .to('.contact-photo-frame .image-inner-wrapper', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.1,
        ease: 'power4.inOut'
      })
      .to('.contact-img', {
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.9')
      .to('[data-animate="contact-badge"] .contact-badge', {
        opacity: 1,
        scale: 1,
        rotation: -4.5,
        x: 0,
        duration: 0.8,
        ease: 'back.out(1.3)'
      }, '-=0.7')
      .to('.contact-detail-row', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15
      }, '-=0.4');
  }

  // -------------------------------------------------------------------------
  // 7. Microinteractions: Subtle Badge Tilts on Desktop Hover
  // -------------------------------------------------------------------------
  if (window.innerWidth >= 992) {
    const heroBadge = document.querySelector('.hero-name-badge');
    if (heroBadge) {
      heroBadge.addEventListener('mouseenter', () => {
        gsap.to(heroBadge, { rotation: -7, duration: 0.3, ease: 'power2.out' });
      });
      heroBadge.addEventListener('mouseleave', () => {
        gsap.to(heroBadge, { rotation: -9.5, duration: 0.4, ease: 'power2.out' });
      });
    }

    const contactBadge = document.querySelector('.contact-badge');
    if (contactBadge) {
      contactBadge.addEventListener('mouseenter', () => {
        gsap.to(contactBadge, { rotation: -2.5, duration: 0.3, ease: 'power2.out' });
      });
      contactBadge.addEventListener('mouseleave', () => {
        gsap.to(contactBadge, { rotation: -4.5, duration: 0.4, ease: 'power2.out' });
      });
    }
  }

  // Refresh ScrollTrigger after fonts/images settle
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
});
