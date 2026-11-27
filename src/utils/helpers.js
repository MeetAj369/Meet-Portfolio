export const PAGE_ORDER = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export const SECTION_TO_PAGE = {
  home: { page: 'hero', anchor: null },
  hero: { page: 'hero', anchor: null },
  about: { page: 'about', anchor: null },
  statistics: { page: 'about', anchor: 'statistics' },
  education: { page: 'about', anchor: 'education' },
  skills: { page: 'skills', anchor: null },
  'what-i-build': { page: 'skills', anchor: 'what-i-build' },
  projects: { page: 'projects', anchor: null },
  experience: { page: 'experience', anchor: null },
  certifications: { page: 'experience', anchor: 'certifications' },
  resume: { page: 'experience', anchor: 'resume' },
  contact: { page: 'contact', anchor: null }
};

export const resolveRouteTarget = (targetId) => {
  const key = (targetId || 'hero').toLowerCase().replace(/^#/, '');
  return SECTION_TO_PAGE[key] || { page: 'hero', anchor: null };
};

// Navigate seamlessly across multi-page views with optional IMG_2370.MP4 horizontal slide + clean spinner
export const scrollToSection = (sectionId, options = {}) => {
  const { transition = true } = options;
  const { page, anchor } = resolveRouteTarget(sectionId);

  window.dispatchEvent(
    new CustomEvent('portfolio:route', {
      detail: {
        targetId: sectionId,
        page,
        anchor,
        transition
      }
    })
  );
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
