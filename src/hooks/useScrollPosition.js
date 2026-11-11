import { useState, useEffect, useRef } from 'react';

export const useScrollPosition = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const lastActiveRef = useRef('hero');

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const currentPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollMid = viewportHeight * 0.35; // 35% from top of viewport

      let current = 'hero';
      const sections = document.querySelectorAll('section[id]');

      if (window.innerHeight + currentPos >= document.documentElement.scrollHeight - 60) {
        current = 'contact';
      } else {
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scrollMid && rect.bottom > scrollMid) {
            current = section.getAttribute('id');
          }
        });
      }

      // ONLY trigger a React state re-render when the active section actually changes
      if (current !== lastActiveRef.current) {
        lastActiveRef.current = current;
        setActiveSection(current);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    updateActive();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { activeSection, scrollPosition: 0, scrollDirection: 'up', scrollProgress: 0 };
};
