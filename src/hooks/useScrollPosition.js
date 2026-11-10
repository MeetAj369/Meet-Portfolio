import { useState, useEffect, useRef } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentPos / docHeight) * 100 : 0;

      setScrollDirection(currentPos > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentPos;
      setScrollPosition(currentPos);
      setScrollProgress(progress);

      // Detect active section using viewport reading zone
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      const viewportHeight = window.innerHeight;
      const scrollMid = viewportHeight * 0.35; // 35% from the top of the viewport

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
      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Initial check
    updateScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollPosition, scrollDirection, activeSection, scrollProgress };
};
