/* ============================================================
   Loader — "System Boot" intro animation
   MA monogram → SVG ring → slide-up reveal
   ============================================================ */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(1); // 1: logo, 2: ring, 3: text, 4: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 500);
    const t2 = setTimeout(() => setPhase(3), 1400);
    const t3 = setTimeout(() => setPhase(4), 1900);
    const t4 = setTimeout(() => onComplete?.(), 2500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-dark-primary"
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient orbs */}
          <div className="orb-cyan absolute -top-32 -right-32 opacity-50" />
          <div className="orb-violet absolute -bottom-24 -left-24 opacity-40" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">

            {/* SVG ring + MA monogram */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Rotating ring */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 120 120"
                initial={{ opacity: 0, rotate: -90 }}
                animate={phase >= 2 ? { opacity: 1, rotate: -90 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                {phase >= 2 && (
                  <motion.circle
                    cx="60" cy="60" r="54"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </motion.svg>

              {/* Outer spinning dashes */}
              {phase >= 2 && (
                <motion.div
                  className="absolute inset-[-8px] rounded-full border border-dashed border-accent-cyan/20 animate-spin-slow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
              )}

              {/* MA Monogram */}
              <motion.div
                className="relative z-10 text-4xl font-black font-sans tracking-tighter gradient-text select-none"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                MA
              </motion.div>
            </div>

            {/* Boot text */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono text-xs tracking-[0.25em] text-accent-cyan uppercase">
                Initializing Portfolio
              </p>

              {/* Progress bar */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={phase >= 3 ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
