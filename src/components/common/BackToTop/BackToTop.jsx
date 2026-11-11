import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './BackToTop.module.css';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isVis = window.scrollY > 400;
          setVisible((prev) => (prev !== isVis ? isVis : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default BackToTop;

