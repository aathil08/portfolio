/* ============================================================
   Hero Section — Full viewport landing with particles,
   typing animation, profile avatar, and CTAs
   ============================================================ */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi2';
import { personalInfo } from '../../data';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

/* ── Canvas Particle Background ────────────────────────────── */
function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Create particles
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        vx:  (Math.random() - 0.5) * 0.35,
        vy:  (Math.random() - 0.5) * 0.35,
        r:   Math.random() * 1.5 + 0.5,
        o:   Math.random() * 0.35 + 0.08,
      });
    }

    const color = isDark ? '0,212,255' : '59,130,246';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.o})`;
        ctx.fill();

        // Lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2  = particles[j];
          const dx  = p.x - p2.x, dy = p.y - p2.y;
          const d   = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - d / 130)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isDark ? 0.7 : 0.4 }}
    />
  );
}

/* ── Profile Avatar ─────────────────────────────────────────── */
function ProfileAvatar() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 md:w-88 md:h-88 mx-auto">

      {/* Outer slow-spinning dashed ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-cyan/20 animate-spin-slow" />

      {/* Middle counter-rotating ring */}
      <div className="absolute inset-4 rounded-full border border-accent-violet/20 animate-spin-reverse" />

      {/* Ambient glow behind photo */}
      <div className="absolute inset-8 rounded-full bg-gradient-primary opacity-15 blur-2xl animate-pulse-slow" />

      {/* ── Main profile photo ── */}
      <motion.div
        className="relative z-10 w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Gradient ring border — cyan → violet */}
        <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-primary">
          <div className="w-full h-full rounded-full overflow-hidden bg-dark-secondary">
            <img
              src="/profile.jpg"
              alt="Mohamed Aathil — Full Stack Developer"
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating tech badges */}
      {[
        { label: 'Java',    pos: '-top-2 -left-6',    delay: 1.8 },
        { label: 'React',   pos: '-top-2 -right-6',   delay: 2.0 },
        { label: 'Django',  pos: '-bottom-2 -left-2', delay: 2.2 },
        { label: 'Node.js', pos: '-bottom-2 right-0', delay: 2.4 },
      ].map(({ label, pos, delay }) => (
        <motion.div
          key={label}
          className={`absolute ${pos} bg-dark-elevated/90 border border-accent-cyan/20 rounded-lg px-3 py-1.5 font-mono text-xs text-accent-cyan backdrop-blur-sm shadow-glow-cyan-sm`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay, duration: 0.4 },
            scale:   { delay, duration: 0.4 },
            y:       { delay: delay + 0.4, duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Hero Section ───────────────────────────────────────────── */
export default function Hero() {
  const { isDark } = useTheme();
  const { displayed, isTyping } = useTypingEffect(personalInfo.roles, 75, 35, 2200);

  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className={`
        relative min-h-screen flex items-center overflow-hidden
        ${isDark ? 'bg-gradient-dark-bg' : 'bg-gradient-light-bg'}
      `}
    >
      {/* Particle background */}
      <ParticleCanvas isDark={isDark} />

      {/* Ambient orbs */}
      <div className="orb-cyan -top-32 -right-32 opacity-60" />
      <div className="orb-violet -bottom-20 -left-20 opacity-50" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)'
            : 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <div className="section-container section-wrap relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

          {/* Left — Text content */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">

            {/* Greeting */}
            <motion.p
              className="font-mono text-sm tracking-[0.2em] text-accent-cyan uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello World!  I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              className={`
                text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'gradient-text block' : 'block'}>
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Typing role */}
            <motion.div
              className="h-10 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              <span className={`text-xl md:text-2xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {displayed}
                <span
                  className="inline-block w-0.5 h-6 bg-accent-cyan ml-1 align-middle animate-pulse"
                  style={{ opacity: isTyping ? 1 : 0.3 }}
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className={`text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.85, duration: 0.6 }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload size={14} />
                Resume
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.15 }}
            >
              {[
                { icon: FaGithub,   href: personalInfo.github,  label: 'GitHub'   },
                { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-accent-cyan' : 'text-gray-500 hover:text-accent-blue'}`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  {label}
                </motion.a>
              ))}

              {/* Availability badge */}
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {personalInfo.availability}
              </div>
            </motion.div>
          </div>

          {/* Right — Avatar */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfileAvatar />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2
            transition-colors duration-200
            ${isDark ? 'text-gray-500 hover:text-accent-cyan' : 'text-gray-400 hover:text-accent-blue'}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          aria-label="Scroll down"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <HiArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
