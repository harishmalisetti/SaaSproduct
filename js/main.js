/* ============================================
   FlowDesk Landing Page — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather Icons
  feather.replace();

  // ---- DOM Elements ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const pricingToggle = document.getElementById('pricingToggle');
  const priceElements = document.querySelectorAll('.price');
  const demoForm = document.getElementById('demoForm');
  const successMessage = document.getElementById('successMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // ============================================
  // 1. NAVBAR — scroll effect & active link
  // ============================================
  /**
   * Add a 'scrolled' class to the navbar when the page is scrolled,
   * giving it a subtle bottom border and shadow.
   */
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /**
   * Highlight the navigation link corresponding to the section
   * currently visible in the viewport.
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTop();
  });

  // ============================================
  // 2. MOBILE MENU — hamburger toggle
  // ============================================
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a nav link is clicked
  navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // 3. SMOOTH SCROLLING — for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80; // height of fixed navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 4. BACK TO TOP BUTTON
  // ============================================
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 5. PRICING TOGGLE — monthly / yearly
  // ============================================
  pricingToggle.addEventListener('change', () => {
    const isYearly = pricingToggle.checked;
    priceElements.forEach((el) => {
      const monthly = el.getAttribute('data-monthly');
      const yearly = el.getAttribute('data-yearly');
      // Simple counter animation
      animatePrice(el, parseInt(el.textContent), parseInt(isYearly ? yearly : monthly));
    });
  });

  /**
   * Animate a price element from one value to another.
   * Uses requestAnimationFrame for smooth transitions.
   */
  function animatePrice(element, from, to) {
    const duration = 300; // ms
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ============================================
  // 6. FORM VALIDATION & SUBMISSION
  // ============================================

  /**
   * Validate a single form field and display an error message
   * if the value is invalid. Returns true if valid.
   */
  function validateField(input, errorEl, rules) {
    const value = input.value.trim();
    let errorMsg = '';

    if (rules.required && value === '') {
      errorMsg = `${rules.label} is required.`;
    } else if (rules.email && value !== '' && !isValidEmail(value)) {
      errorMsg = 'Please enter a valid email address.';
    } else if (rules.minLength && value.length < rules.minLength) {
      errorMsg = `${rules.label} must be at least ${rules.minLength} characters.`;
    }

    if (errorMsg) {
      input.classList.add('error');
      errorEl.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('error');
      errorEl.textContent = '';
      return true;
    }
  }

  /**
   * Check if a string is a valid email address using a simple regex.
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Field configurations for validation
  const fields = [
    {
      input: document.getElementById('fullName'),
      error: document.getElementById('fullNameError'),
      rules: { required: true, minLength: 2, label: 'Full Name' },
    },
    {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      rules: { required: true, email: true, label: 'Email' },
    },
    {
      input: document.getElementById('company'),
      error: document.getElementById('companyError'),
      rules: { required: true, minLength: 2, label: 'Company Name' },
    },
  ];

  // Real-time validation on blur
  fields.forEach(({ input, error, rules }) => {
    input.addEventListener('blur', () => validateField(input, error, rules));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input, error, rules);
      }
    });
  });

  // Form submission
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    let isFormValid = true;
    fields.forEach(({ input, error, rules }) => {
      if (!validateField(input, error, rules)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Focus the first invalid field
      const firstError = demoForm.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate form submission (no backend)
    const submitBtn = demoForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';

    // Simulated delay
    setTimeout(() => {
      demoForm.style.display = 'none';
      successMessage.classList.add('visible');
      // Re-initialize Feather icons for the success icon
      feather.replace();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Request Demo <i data-feather="send"></i>';
    }, 1500);
  });

  // Reset form button
  resetFormBtn.addEventListener('click', () => {
    successMessage.classList.remove('visible');
    demoForm.style.display = 'block';
    demoForm.reset();
    // Clear any error states
    fields.forEach(({ input, error }) => {
      input.classList.remove('error');
      error.textContent = '';
    });
    feather.replace();
  });

  // ============================================
  // 7. SCROLL REVEAL ANIMATION
  // ============================================
  /**
   * Use Intersection Observer to add a fade-in animation
   * to elements as they enter the viewport.
   */
  const revealElements = document.querySelectorAll(
    '.feature-card, .step-card, .pricing-card, .testimonial-card'
  );

  // Add initial hidden state
  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger the animation slightly for each visible element
          const delay = Array.from(revealElements).indexOf(entry.target) % 3;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // ============================================
  // 8. PROGRESS BAR ANIMATION (Hero mockup)
  // ============================================
  /**
   * Animate the progress bars in the hero dashboard mockup
   * when they come into view.
   */
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});
