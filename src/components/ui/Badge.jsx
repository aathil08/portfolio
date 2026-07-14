/* ============================================================
   Badge — Tech tag / category pill
   ============================================================ */

const VARIANT_STYLES = {
  cyan:    'bg-accent-cyan/10   border-accent-cyan/30   text-accent-cyan',
  violet:  'bg-accent-violet/10 border-accent-violet/30 text-violet-400',
  blue:    'bg-accent-blue/10   border-accent-blue/30   text-blue-400',
  green:   'bg-emerald-500/10   border-emerald-500/30   text-emerald-400',
  orange:  'bg-orange-500/10    border-orange-500/30    text-orange-400',
  default: 'bg-white/5         border-white/10         text-gray-300 dark:text-gray-300 text-gray-600',
};

/**
 * @param {string}  label   — badge text
 * @param {string}  variant — 'cyan' | 'violet' | 'blue' | 'green' | 'orange' | 'default'
 * @param {string}  size    — 'sm' | 'md'
 */
export default function Badge({ label, variant = 'default', size = 'sm' }) {
  const base = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;
  const sz   = size === 'md' ? 'text-xs px-3 py-1' : 'text-2xs px-2 py-0.5';

  return (
    <span
      className={`inline-block font-mono rounded border transition-colors duration-200 ${base} ${sz}`}
    >
      {label}
    </span>
  );
}
