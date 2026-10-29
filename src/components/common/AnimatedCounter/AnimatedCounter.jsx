import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimatedCounter.module.css';

const AnimatedCounter = ({ target, value, suffix = '+', duration = 2000 }) => {
  const rawTarget = target ?? value ?? 0;
  const isFloat = rawTarget.toString().includes('.');
  const finalTarget = parseFloat(rawTarget);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );
    const el = counterRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || finalTarget === 0) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      if (isFloat) {
        setCount((eased * finalTarget).toFixed(2));
      } else {
        setCount(Math.floor(eased * finalTarget));
      }
      if (progress < 1) requestAnimationFrame(step);
      else setCount(isFloat ? finalTarget.toFixed(2) : finalTarget);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, finalTarget, duration, isFloat]);

  return (
    <span ref={counterRef} className={styles.counter}>
      {isFloat ? count : Number(count).toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
