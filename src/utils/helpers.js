// Smooth scroll to section
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 72; // matches var(--navbar-height)
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
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
