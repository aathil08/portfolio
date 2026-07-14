/* ============================================================
   Footer — Social links, copyright, back-to-top
   ============================================================ */
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { HiArrowUp }  from 'react-icons/hi2';
import { personalInfo } from '../../data';
import { useTheme } from '../../context/ThemeContext';

const SOCIAL = [
  { icon: FaGithub,   href: personalInfo.github,   label: 'GitHub'   },
  { icon: FaLinkedin, href: personalInfo.linkedin,  label: 'LinkedIn' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`
        relative py-10 px-6 md:px-10
        ${isDark
          ? 'bg-dark-primary border-t border-white/5'
          : 'bg-light-tertiary border-t border-gray-200'
        }
      `}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-primary opacity-30" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-2xl font-black gradient-text">MA</span>
          <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Crafted with{' '}
            <FaHeart className="text-red-500 animate-pulse-slow inline" size={12} />{' '}
            by Mohamed Aathil
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>

        {/* Center: Nav quick links */}
        <div className="flex gap-6 flex-wrap justify-center">
          {['About', 'Skills', 'Projects', 'Contact'].map(l => (
            <button
              key={l}
              onClick={() => document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-sm transition-colors duration-200 ${isDark ? 'text-gray-500 hover:text-accent-cyan' : 'text-gray-500 hover:text-accent-blue'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Right: Social + back to top */}
        <div className="flex items-center gap-4">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`transition-colors duration-200 ${isDark ? 'text-gray-500 hover:text-accent-cyan' : 'text-gray-500 hover:text-accent-blue'}`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-2 w-9 h-9 rounded-full border border-accent-cyan/30 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/10 hover:shadow-glow-cyan-sm transition-all duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <HiArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
