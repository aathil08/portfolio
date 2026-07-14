/* ============================================================
   Skills Section — Categorized grid with icons & hover effects
   ============================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons  from 'react-icons/fa';
import * as SiIcons  from 'react-icons/si';
import * as VscIcons from 'react-icons/vsc';
import * as TbIcons  from 'react-icons/tb';
import { skills, skillCategories } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, scaleIn, revealViewport } from '../../utils/animations';

/* ── Icon resolver ─────────────────────────────────────────── */
const ALL_ICONS = { ...FaIcons, ...SiIcons, ...VscIcons, ...TbIcons };
function resolveIcon(name) {
  return ALL_ICONS[name] || ALL_ICONS['FaCode'];
}

/* ── Single skill card ──────────────────────────────────────── */
function SkillCard({ name, icon, color, isDark }) {
  const Icon = resolveIcon(icon);
  return (
    <motion.div
      variants={scaleIn}
      className={`
        group relative flex flex-col items-center justify-center gap-3
        p-5 rounded-2xl border cursor-default
        transition-all duration-350
        ${isDark
          ? 'bg-dark-tertiary/50 border-white/5 hover:border-accent-cyan/25 hover:bg-dark-elevated/60 hover:shadow-card-hover'
          : 'bg-white border-gray-100 hover:border-accent-blue/30 hover:shadow-card-light-hover'
        }
      `}
      whileHover={{ y: -5, scale: 1.03 }}
    >
      {/* Icon */}
      <motion.div
        className={`text-3xl ${color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg`}
      >
        <Icon />
      </motion.div>

      {/* Name */}
      <span
        className={`font-mono text-xs text-center tracking-wide leading-tight ${
          isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'
        } transition-colors duration-200`}
      >
        {name}
      </span>

      {/* Hover glow dot */}
      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('Programming');

  const CATEGORY_ACCENT = {
    Programming: 'text-yellow-400   border-yellow-400   bg-yellow-400/10',
    Frontend:    'text-accent-cyan  border-accent-cyan  bg-accent-cyan/10',
    Backend:     'text-violet-400   border-violet-400   bg-violet-400/10',
    Database:    'text-emerald-400  border-emerald-400  bg-emerald-400/10',
    Tools:       'text-orange-400   border-orange-400   bg-orange-400/10',
  };

  return (
    <section
      id="skills"
      className={`section-wrap ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="02. Skills"
          title="Technical Arsenal"
          subtitle="Technologies I use daily to architect, build, and ship production-ready applications."
        />

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {skillCategories.map(cat => {
            const isActive = activeTab === cat;
            const accent   = CATEGORY_ACCENT[cat];
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                  px-5 py-2 rounded-full font-mono text-xs tracking-wider border
                  transition-all duration-300
                  ${isActive
                    ? accent
                    : isDark
                      ? 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={staggerContainer(0.07)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {(skills[activeTab] || []).map(skill => (
              <SkillCard key={skill.name} {...skill} isDark={isDark} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom note ── */}
        <motion.p
          className={`text-center text-sm mt-10 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
        >
          + and always learning more 🚀
        </motion.p>
      </div>
    </section>
  );
}
