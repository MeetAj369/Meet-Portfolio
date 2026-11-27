// Smooth scroll to section with dynamic navbar height offset, safe clearance, and optional transition veil
export const scrollToSection = (sectionId, options = {}) => {
  const { transition = true } = options;
  const element = document.getElementById(sectionId);
  if (!element) return;

  const performScroll = () => {
    const navEl = document.querySelector('header');
    const navHeight = navEl ? navEl.offsetHeight : (window.innerWidth <= 768 ? 64 : 72);
    const safeClearance = 24;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = Math.max(0, elementTop - navHeight - safeClearance);

    window.scrollTo({
      top: targetPosition,
      behavior: transition ? 'auto' : 'smooth'
    });

    // Trigger crisp arrival focus reveal on destination section & ensure children are revealed
    element.classList.remove('section-arriving');
    void element.offsetWidth;
    element.classList.add('section-arriving');
    element.classList.add('revealed');
    element.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((child) => {
      child.classList.add('revealed');
    });

    try {
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } catch (_) {}
  };

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navEl = document.querySelector('header');
  const navHeight = navEl ? navEl.offsetHeight : 72;
  const dist = Math.abs(element.getBoundingClientRect().top - navHeight - 24);

  if (transition && !prefersReducedMotion && dist > 140) {
    window.dispatchEvent(
      new CustomEvent('portfolio:navigate', {
        detail: { sectionId, onApex: performScroll }
      })
    );
  } else {
    performScroll();
  }
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get current year
export const getCurrentYear = () => new Date().getFullYear();

// Validate email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Clamp value
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Format number with commas
export const formatNumber = (num) => num.toLocaleString();

// Lerp (linear interpolation)
export const lerp = (start, end, factor) => start + (end - start) * factor;
