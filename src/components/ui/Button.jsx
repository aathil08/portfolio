/* ============================================================
   Button — Primary / Secondary / Ghost variants
   ============================================================ */
import { motion } from 'framer-motion';

const VARIANTS = {
  primary: `
    relative overflow-hidden
    bg-gradient-primary text-white font-semibold
    shadow-glow-cyan-sm hover:shadow-glow-cyan
    border border-transparent
  `,
  secondary: `
    bg-transparent text-accent-cyan font-semibold
    border border-accent-cyan
    hover:bg-accent-cyan/10 hover:shadow-glow-cyan-sm
  `,
  ghost: `
    bg-transparent text-gray-300 dark:text-gray-300 text-gray-600 font-semibold
    border border-white/10 dark:border-white/10 border-gray-200
    hover:border-white/20 dark:hover:border-white/20 hover:border-gray-300
    hover:text-white dark:hover:text-white hover:text-gray-900
  `,
  outline: `
    bg-transparent font-semibold
    border border-accent-violet text-violet-400
    hover:bg-accent-violet/10 hover:shadow-glow-violet
  `,
};

const SIZES = {
  sm:  'text-sm px-5 py-2.5 rounded-lg',
  md:  'text-sm px-7 py-3.5 rounded-xl',
  lg:  'text-base px-9 py-4 rounded-xl',
};

/**
 * @param {string}  variant   — 'primary' | 'secondary' | 'ghost' | 'outline'
 * @param {string}  size      — 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth
 * @param {boolean} loading
 * @param {string}  href      — if provided, renders as <a>
 */
export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  fullWidth = false,
  loading   = false,
  href,
  onClick,
  className = '',
  ...rest
}) {
  const base = `
    inline-flex items-center justify-center gap-2
    transition-all duration-300 ease-expo-out
    cursor-pointer select-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${VARIANTS[variant] ?? VARIANTS.primary}
    ${SIZES[size] ?? SIZES.md}
    ${className}
  `;

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap:   { scale: 0.96 },
    transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps} {...rest}>
        {loading ? <Spinner /> : children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={base}
      onClick={onClick}
      disabled={loading}
      {...motionProps}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </motion.button>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
