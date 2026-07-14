/* ============================================================
   useTypingEffect — Cycles through an array of strings
   with a typewriter / erase animation
   ============================================================ */
import { useState, useEffect, useRef } from 'react';

/**
 * @param {string[]} texts       — array of strings to cycle through
 * @param {number}   typeSpeed   — ms per character (typing)
 * @param {number}   eraseSpeed  — ms per character (erasing)
 * @param {number}   holdDelay   — ms to hold completed string
 * @returns {{ displayed: string, isTyping: boolean }}
 */
export function useTypingEffect(
  texts,
  typeSpeed  = 80,
  eraseSpeed = 40,
  holdDelay  = 2000
) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping,  setIsTyping]  = useState(true);
  const indexRef    = useRef(0);
  const charRef     = useRef(0);
  const dirRef      = useRef('typing'); // 'typing' | 'erasing' | 'holding'
  const timerRef    = useRef(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const tick = () => {
      const current = texts[indexRef.current];

      if (dirRef.current === 'typing') {
        setIsTyping(true);
        charRef.current++;
        setDisplayed(current.slice(0, charRef.current));

        if (charRef.current >= current.length) {
          dirRef.current = 'holding';
          timerRef.current = setTimeout(tick, holdDelay);
          return;
        }
        timerRef.current = setTimeout(tick, typeSpeed);

      } else if (dirRef.current === 'holding') {
        dirRef.current = 'erasing';
        setIsTyping(false);
        timerRef.current = setTimeout(tick, eraseSpeed);

      } else {
        // erasing
        charRef.current--;
        setDisplayed(current.slice(0, charRef.current));

        if (charRef.current <= 0) {
          indexRef.current = (indexRef.current + 1) % texts.length;
          dirRef.current   = 'typing';
          timerRef.current = setTimeout(tick, typeSpeed);
          return;
        }
        timerRef.current = setTimeout(tick, eraseSpeed);
      }
    };

    timerRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timerRef.current);
  }, [texts, typeSpeed, eraseSpeed, holdDelay]);

  return { displayed, isTyping };
}
