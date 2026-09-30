/**
 * Dhara - Digital Marketing & Social Media Manager Portfolio
 * Dynamic Interactions & Bento Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Greeting Day Logic
  initDynamicDay();

  // 2. Bento Card Spotlight Tracking
  initBentoSpotlight();

  // 3. Live Vadodara Time
  initVadodaraClock();

  // 4. Interactive Copy to Clipboard
  initCopyEmail();

  // 5. Newsletter Subscription Handling
  initNewsletterForm();

  // 6. Quick Contact Form Simulation
  initContactForm();

  // 7. Active Navigation State Tracking
  initScrollSpy();

  // 8. Mobile Navigation Toggle
  initMobileMenu();
});

/**
 * Updates dynamic greeting with the current day of the week
 * e.g., "Hey, Dhara here. How's your Monday?"
 */
function initDynamicDay() {
  const dayElement = document.getElementById('dynamic-day');
  if (!dayElement) return;

  try {
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    dayElement.textContent = today;
  } catch (error) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    dayElement.textContent = currentDay || 'day';
  }
}

/**
 * Tracks mouse position within bento cards to produce interactive radial lighting
 */
function initBentoSpotlight() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Displays live time in Vadodara, Gujarat (IST, UTC+5:30)
 */
function initVadodaraClock() {
  const clockElement = document.getElementById('vadodara-clock');
  if (!clockElement) return;

  function updateClock() {
    try {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(now);

      clockElement.textContent = `${timeStr} IST`;
    } catch (e) {
      // Fallback
      clockElement.textContent = 'GMT+5:30';
    }
  }

  updateClock();
  setInterval(updateClock, 30000);
}

/**
 * One-click copy for email with feedback toast
 */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'dhara.marketing@example.com';

      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        // Fallback prompt
        window.prompt('Copy email address:', email);
      }
    });
  });
}

/**
 * Newsletter submission handler
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = input.value.trim();

    if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      input.focus();
      return;
    }

    // Success simulation
    localStorage.setItem('newsletter_subscriber', emailVal);
    input.value = '';
    
    if (feedback) {
      feedback.classList.remove('hidden');
    }
    showToast('🎉 You are subscribed! Value coming your way.');
  });
}

/**
 * Quick Contact form submission handler
 */
function initContactForm() {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('[name="name"]');
    const messageInput = form.querySelector('[name="message"]');

    if (!messageInput || !messageInput.value.trim()) {
      showToast('Please type a brief message to send.', 'error');
      return;
    }

    const name = nameInput ? nameInput.value.trim() : 'Friend';
    showToast(`Thanks ${name}! Your message is prepared to send.`);
    
    // Mailto fallback trigger
    const mailtoUri = `mailto:dhara.marketing@example.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(messageInput.value)}`;
    window.location.href = mailtoUri;

    form.reset();
  });
}

/**
 * Universal Toast Notification System
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const isError = type === 'error';
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm font-medium transition-all duration-300 toast-enter ${
    isError 
      ? 'bg-rose-950/80 border-rose-500/40 text-rose-200' 
      : 'bg-zinc-900/90 border-violet-500/30 text-zinc-100'
  }`;

  toast.innerHTML = `
    <span class="inline-flex items-center justify-center w-6 h-6 rounded-full ${isError ? 'bg-rose-500/20 text-rose-400' : 'bg-violet-500/20 text-violet-400'}">
      ${isError ? '✕' : '✓'}
    </span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-active');
  });

  // Auto dismiss after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('toast-active');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Scroll spy for highlighting current active section in nav
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-nav-target]');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-nav-target') === id) {
            link.classList.add('text-white', 'bg-white/10');
            link.classList.remove('text-zinc-400');
          } else {
            link.classList.remove('text-white', 'bg-white/10');
            link.classList.add('text-zinc-400');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Mobile Menu Dropdown Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking mobile link
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
