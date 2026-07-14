/* ============================================================
   Projects Section — Filterable showcase with glass cards
   ============================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { projects, projectCategories } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { staggerContainer, scaleIn, revealViewport } from '../../utils/animations';

/* ── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project, isDark }) {
  const { title, description, tech, gradient, icon, github, live, featured } = project;

  return (
    <motion.article
      variants={scaleIn}
      className={`
        group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer
        transition-all duration-350 hover:-translate-y-2
        ${isDark
          ? 'glass-dark hover:border-accent-cyan/25 hover:shadow-card-hover'
          : 'bg-white border-gray-100 hover:border-accent-blue/25 hover:shadow-card-light-hover'
        }
      `}
      whileHover={{ scale: 1.01 }}
    >
      {/* ── Image / Preview strip ── */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Icon */}
        <span className="text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>

        {/* Featured ribbon */}
        {featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-yellow-300 rounded-full px-2.5 py-1 text-2xs font-mono">
            <FaStar size={9} /> Featured
          </div>
        )}

        {/* "View on GitHub" hint overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none z-10">
          <FaGithub className="text-white" size={20} />
          <span className="text-white text-sm font-semibold tracking-wide">View on GitHub</span>
        </div>

        {/* Scan line animation on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="w-full h-[1px] bg-white/40 absolute animate-scan-line" />
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Title */}
        <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {tech.map(t => (
            <Badge key={t} label={t} variant="cyan" size="sm" />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-1 relative z-20">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 hover:scale-105 ${isDark ? 'text-gray-500 hover:text-accent-cyan' : 'text-gray-500 hover:text-accent-blue'}`}
          >
            <FaGithub size={13} /> GitHub
          </a>
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <FaExternalLinkAlt size={11} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Full-card clickable overlay → opens GitHub repo */}
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title} on GitHub`}
        className="absolute inset-0 z-10"
      />
    </motion.article>
  );
}

/* ── Projects Section ───────────────────────────────────────── */
export default function Projects() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="projects"
      className={`section-wrap ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="04. Projects"
          title="Featured Work"
          subtitle="A selection of real-world applications I've designed, built, and shipped."
        />

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {projectCategories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-5 py-2 rounded-full font-mono text-xs tracking-wider border
                transition-all duration-300
                ${activeFilter === cat
                  ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan shadow-glow-cyan-sm'
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
          ))}
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} isDark={isDark} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── View all on GitHub ── */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/aathil08"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 font-mono text-sm border rounded-xl px-6 py-3 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'border-white/10 text-gray-400 hover:border-accent-cyan/30 hover:text-accent-cyan hover:shadow-glow-cyan-sm' : 'border-gray-200 text-gray-500 hover:border-accent-blue/30 hover:text-accent-blue'}`}
          >
            <FaGithub size={16} /> View more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
