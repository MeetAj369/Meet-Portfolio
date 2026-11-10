// Smooth scroll to section with dynamic navbar height offset and safe clearance
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navEl = document.querySelector('header');
    const navHeight = navEl ? navEl.offsetHeight : (window.innerWidth <= 768 ? 64 : 72);
    // Add 16px of comfortable breathing room so the section header is never covered
    const safeClearance = 16;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = Math.max(0, elementTop - navHeight - safeClearance);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Keep the browser URL updated cleanly
    try {
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } catch (_) {}
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
