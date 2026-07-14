/* ============================================================
   useActiveSection — Tracks which section is currently in view
   Powers the active nav-link highlight
   ============================================================ */
import { useState, useEffect } from 'react';

/**
 * @param {string[]} sectionIds — array of section id strings (without #)
 * @param {number}   offset     — px offset from top to trigger
 * @returns {string}             active section id
 */
export function useActiveSection(sectionIds, offset = 100) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold:  0,
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return active;
}
