/* ============================================================
   About Section — Bio, animated stats (no duplicate profile image)
   ============================================================ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { HiSparkles, HiEnvelope, HiPhone } from 'react-icons/hi2';
import { personalInfo, stats } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import {
  fadeInLeft, fadeInRight, staggerContainer,
  scaleIn, revealViewport,
} from '../../utils/animations';

/* ── Animated stat counter ───────────────────────────────── */
function StatCard({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1"
      variants={scaleIn}
    >
      <div className="text-4xl font-black gradient-text tabular-nums">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.1, delay }}
        >
          {inView ? value : 0}
        </motion.span>
        {suffix}
      </div>
      <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`section-wrap ${isDark ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="01. About"
          title="Who I Am"
          subtitle="A developer who cares deeply about craft, performance, and the impact of well-written code."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Bio ── */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            {/* Bio paragraphs */}
            <div className={`flex flex-col gap-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {personalInfo.bio.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Contact info chips */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                  ${isDark
                    ? 'bg-dark-tertiary/60 border-white/8 text-gray-300 hover:border-accent-cyan/40 hover:text-accent-cyan'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
              >
                <HiEnvelope className="text-accent-cyan" size={15} />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                  ${isDark
                    ? 'bg-dark-tertiary/60 border-white/8 text-gray-300 hover:border-accent-cyan/40 hover:text-accent-cyan'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
              >
                <HiPhone className="text-accent-cyan" size={15} />
                {personalInfo.phone}
              </a>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border
                ${isDark ? 'bg-dark-tertiary/60 border-white/8 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                <FaMapMarkerAlt className="text-accent-cyan" size={13} />
                {personalInfo.location}
              </div>
            </div>


          </motion.div>

          {/* ── Right: Quick facts + availability ── */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            {/* Availability badge */}
            <div className="flex items-center gap-2 w-fit bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm text-emerald-400 font-medium">{personalInfo.availability}</span>
            </div>

            {/* Quick facts */}
            <div
              className={`rounded-2xl p-6 border ${isDark ? 'bg-dark-tertiary/50 border-white/5' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-center gap-2 mb-5">
                <HiSparkles className="text-accent-cyan" size={18} />
                <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Quick Facts
                </span>
              </div>
              <ul className={`flex flex-col gap-3.5 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {[
                  ['🎯', 'Problem solving & analytical thinking'],
                  ['⚡', 'Adaptability & continuous learning mindset'],
                  ['🤝', 'Teamwork & cross-functional collaboration'],
                  ['🌱', 'Passionate about building impactful applications'],
                  ['🎓', 'B.E. CSE Graduate — M.I.E.T Engineering College'],
                  ['📍', 'Based in Kumbakonam, Tamil Nadu, India'],
                ].map(([emoji, text]) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="text-base leading-snug">{emoji}</span>
                    <span className="leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          className={`
            mt-20 grid grid-cols-2 md:grid-cols-4 gap-8
            rounded-2xl p-8 border
            ${isDark ? 'bg-dark-tertiary/40 border-white/5' : 'bg-light-tertiary border-gray-100'}
          `}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
        >
          {stats.map(({ value, suffix, label }, i) => (
            <StatCard key={label} value={value} suffix={suffix} label={label} delay={i * 0.12} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
