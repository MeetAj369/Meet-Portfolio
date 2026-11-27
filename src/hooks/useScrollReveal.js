import { useEffect, useRef } from 'react';

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observeSelector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    const revealTarget = (target) => {
      target.classList.add('revealed');
    };

    // Immediately reveal elements already within viewport on initial page mount
    const immediateCheck = (el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 60) {
        revealTarget(el);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight + 40) {
            revealTarget(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.02,
        rootMargin: options.rootMargin ?? '60px 0px 60px 0px'
      }
    );

    if (options.children) {
      if (!immediateCheck(element)) observer.observe(element);
      const children = element.querySelectorAll(observeSelector);
      children.forEach((child) => {
        if (!immediateCheck(child)) observer.observe(child);
      });

      return () => observer.disconnect();
    } else {
      if (!immediateCheck(element)) observer.observe(element);
      return () => observer.disconnect();
    }
  }, [options.threshold, options.rootMargin, options.children]);

  return ref;
};
