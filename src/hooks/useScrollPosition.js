import { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentPos / docHeight) * 100 : 0;

    setScrollDirection(currentPos > scrollPosition ? 'down' : 'up');
    setScrollPosition(currentPos);
    setScrollProgress(progress);

    // Detect active section
    const sections = document.querySelectorAll('section[id]');
    let current = 'hero';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (currentPos >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    setActiveSection(current);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { scrollPosition, scrollDirection, activeSection, scrollProgress };
};
