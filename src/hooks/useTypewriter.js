import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (words, { typeSpeed = 100, deleteSpeed = 50, delaySpeed = 2000 } = {}) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    if (isWaiting) return;

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setText(currentWord.substring(0, text.length + 1));
      if (text.length === currentWord.length) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delaySpeed);
      }
    }
  }, [text, wordIndex, isDeleting, isWaiting, words, delaySpeed]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return { text, isDeleting };
};
