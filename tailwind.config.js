/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary:   '#050a14',
          secondary: '#0a1628',
          tertiary:  '#0f1e38',
          elevated:  '#162040',
        },
        light: {
          primary:   '#f8faff',
          secondary: '#ffffff',
          tertiary:  '#f1f5f9',
          elevated:  '#e8edf7',
        },
        accent: {
          cyan:        '#00d4ff',
          'cyan-dim':  '#00a8cc',
          violet:      '#7c3aed',
          'violet-dim':'#6d28d9',
          blue:        '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary':  'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
        'gradient-reverse':  'linear-gradient(135deg, #7c3aed 0%, #00d4ff 100%)',
        'gradient-cta':      'linear-gradient(135deg, #00d4ff, #3b82f6, #7c3aed)',
        'gradient-dark-bg':  'radial-gradient(ellipse at top, #0a1628 0%, #050a14 60%)',
        'gradient-light-bg': 'radial-gradient(ellipse at top, #e8edf7 0%, #f8faff 60%)',
      },
      animation: {
        'spin-slow':     'spin 10s linear infinite',
        'spin-reverse':  'spin-reverse 14s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out 1.5s infinite',
        'pulse-slow':    'pulse 4s ease-in-out infinite',
        'bounce-soft':   'bounce-soft 2s ease-in-out infinite',
        'glow-pulse':    'glow-pulse 3s ease-in-out infinite',
        'scan-line':     'scan-line 3s linear infinite',
        'gradient-move': 'gradient-move 6s ease infinite',
        'draw-line':     'draw-line 1.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(1.5deg)' },
          '66%':      { transform: 'translateY(-7px) rotate(-1deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to:   { transform: 'rotate(0deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1' },
          to:   { strokeDashoffset: '0' },
        },
      },
      boxShadow: {
        'glow-cyan-sm': '0 0 10px rgba(0,212,255,0.25)',
        'glow-cyan':    '0 0 20px rgba(0,212,255,0.35), 0 0 40px rgba(0,212,255,0.10)',
        'glow-cyan-lg': '0 0 30px rgba(0,212,255,0.45), 0 0 80px rgba(0,212,255,0.15)',
        'glow-violet':  '0 0 20px rgba(124,58,237,0.35)',
        'glow-violet-lg':'0 0 30px rgba(124,58,237,0.45), 0 0 60px rgba(124,58,237,0.15)',
        'card':         '0 4px 24px rgba(0,0,0,0.40), 0 1px 4px rgba(0,0,0,0.20)',
        'card-hover':   '0 8px 32px rgba(0,0,0,0.50), 0 0 24px rgba(0,212,255,0.12)',
        'card-light':   '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)',
        'card-light-hover':'0 8px 32px rgba(0,0,0,0.12), 0 0 20px rgba(2,132,199,0.10)',
        'inner-glow':   'inset 0 0 20px rgba(0,212,255,0.06)',
      },
      transitionTimingFunction: {
        'expo-out':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'back-out':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'soft-in-out':'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};
