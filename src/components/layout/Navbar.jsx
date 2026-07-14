/* ============================================================
   Navbar — Sticky navigation with glass effect on scroll
   Desktop: horizontal links | Mobile: hamburger drawer
   ============================================================ */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX }  from 'react-icons/hi';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { useTheme }       from '../../context/ThemeContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { navLinks }        from '../../data';

const SECTION_IDS = navLinks.map(l => l.href.replace('#', ''));

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  /* Detect scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16
          transition-all duration-400
          ${scrolled
            ? isDark
              ? 'glass-dark-heavy shadow-card'
              : 'glass-light-heavy shadow-card-light'
            : 'bg-transparent'
          }
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 2.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px]">

          {/* ── Logo ── */}
          <motion.button
            onClick={() => scrollTo('#hero')}
            className="text-2xl font-black font-sans tracking-tighter gradient-text select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to top"
          >
            MA
          </motion.button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <motion.button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`
                    relative font-semibold text-sm tracking-wide
                    transition-colors duration-200
                    ${isActive
                      ? 'text-accent-cyan'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                  {/* Active underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-primary"
                    initial={false}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                border transition-all duration-300
                ${isDark
                  ? 'border-white/10 text-yellow-300 hover:border-yellow-300/30 hover:bg-yellow-300/10'
                  : 'border-gray-200 text-gray-700 hover:border-accent-blue/40 hover:bg-accent-blue/10'
                }
              `}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span key="sun" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiSun size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiMoon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen(p => !p)}
              className={`
                lg:hidden w-10 h-10 rounded-full flex items-center justify-center
                border transition-all duration-300
                ${isDark ? 'border-white/10 text-gray-300 hover:border-accent-cyan/30 hover:text-accent-cyan' : 'border-gray-200 text-gray-700 hover:border-accent-blue/40'}
              `}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x"    initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <HiX    size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <HiMenu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className={`
                fixed top-[72px] left-0 right-0 z-50 lg:hidden
                ${isDark ? 'glass-dark-heavy' : 'glass-light-heavy'}
                border-t ${isDark ? 'border-white/5' : 'border-gray-100'}
              `}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col py-4 px-6">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`
                      text-left py-4 text-base font-semibold border-b
                      transition-colors duration-200
                      ${isDark ? 'border-white/5 text-gray-300 hover:text-accent-cyan' : 'border-gray-100 text-gray-700 hover:text-accent-blue'}
                      ${active === href.replace('#', '') ? 'text-accent-cyan' : ''}
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="font-mono text-accent-cyan text-xs mr-3">0{i + 1}.</span>
                    {label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
