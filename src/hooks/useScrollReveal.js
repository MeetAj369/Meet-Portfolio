import { useEffect, useRef } from 'react';

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isParentRevealed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (entry.target === element) {
              isParentRevealed = true;
            }
            if (options.once !== false) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    );

    const observeSelector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    if (options.children) {
      observer.observe(element);
      const children = element.querySelectorAll(observeSelector);
      children.forEach(child => observer.observe(child));

      // Observe dynamic child DOM changes (e.g. tabs/filters)
      const mutObserver = new MutationObserver(() => {
        const newChildren = element.querySelectorAll(observeSelector);
        newChildren.forEach(child => {
          if (isParentRevealed || element.classList.contains('revealed')) {
            child.classList.add('revealed');
          } else {
            observer.observe(child);
          }
        });
      });

      mutObserver.observe(element, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutObserver.disconnect();
      };
    } else {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [options.threshold, options.rootMargin, options.once, options.children]);

  return ref;
};
