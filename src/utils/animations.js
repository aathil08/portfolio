/* ============================================================
   Framer Motion Animation Variants
   Reusable variants imported across all section components
   ============================================================ */

// ── Easing curves ────────────────────────────────────────────
export const EASE_OUT_EXPO   = [0.16, 1, 0.3, 1];
export const EASE_BACK_OUT   = [0.34, 1.56, 0.64, 1];
export const EASE_SOFT       = [0.4, 0, 0.2, 1];

// ── Basic fade variants ──────────────────────────────────────
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.60, ease: EASE_OUT_EXPO } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: EASE_SOFT } },
};

// ── Scale variants ───────────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_BACK_OUT } },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

// ── Stagger container ────────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

// ── Specialized variants ──────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  scale: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

export const buttonTap = {
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const iconHover = {
  rest:  { scale: 1, rotate: 0 },
  hover: { scale: 1.15, rotate: 5, transition: { duration: 0.25, ease: EASE_BACK_OUT } },
};

// ── Section reveal (whileInView preset) ──────────────────────
export const revealViewport = {
  once:   true,
  margin: '-80px 0px',
};

// ── Loader variants ──────────────────────────────────────────
export const loaderContainer = {
  exit: {
    y: '-100%',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const loaderLogo = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_BACK_OUT } },
};

// ── Timeline line draw ────────────────────────────────────────
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show:   {
    pathLength: 1, opacity: 1,
    transition: { duration: 1.5, ease: EASE_SOFT },
  },
};
