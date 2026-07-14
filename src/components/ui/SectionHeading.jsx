/* ============================================================
   SectionHeading — Consistent section titles across all sections
   ============================================================ */
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { fadeInUp, revealViewport } from '../../utils/animations';

/**
 * @param {string}  eyebrow  — "01. About" styled label
 * @param {string}  title    — main heading
 * @param {string}  subtitle — optional subtitle
 * @param {string}  align    — 'left' | 'center'
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const { isDark } = useTheme();
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      className={`flex flex-col ${alignment} gap-4 mb-16`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <span className="font-mono text-sm tracking-[0.22em] text-accent-cyan uppercase">
          {eyebrow}
        </span>
      )}

      {/* Main title */}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight
        ${isDark ? 'text-white' : 'text-gray-900'}
      `}>
        {title}
      </h2>

      {/* Gradient underline */}
      <div
        className={`h-[4px] w-20 rounded-full bg-gradient-primary ${
          align === 'center' ? 'self-center' : 'self-start'
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className={`max-w-2xl text-base md:text-lg leading-relaxed mt-1
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
