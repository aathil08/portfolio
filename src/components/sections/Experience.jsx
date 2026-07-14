/* ============================================================
   Experience Section — Vertical timeline with animated cards
   ============================================================ */
import { motion } from 'framer-motion';
import { HiBriefcase, HiMapPin, HiCalendar } from 'react-icons/hi2';
import { experience } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { fadeInLeft, fadeInRight, fadeInUp, revealViewport, staggerContainer } from '../../utils/animations';

const ACCENT_MAP = { cyan: 'accent-cyan', violet: 'violet-400', blue: 'blue-400' };

export default function Experience() {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      className={`section-wrap ${isDark ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="03. Experience"
          title="Work Journey"
          subtitle="Where I've applied my skills and grown as a developer."
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: 'linear-gradient(180deg, #00d4ff, #7c3aed, transparent)' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={revealViewport}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Experience cards */}
          <div className="flex flex-col gap-12">
            {experience.map((exp, i) => {
              const isEven = i % 2 === 0;
              const anim   = isEven ? fadeInLeft : fadeInRight;
              const accent = ACCENT_MAP[exp.color] || 'accent-cyan';

              return (
                <div key={exp.id} className="relative flex items-start gap-6 md:gap-0">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 mt-6">
                    <motion.div
                      className={`w-9 h-9 rounded-full border-2 border-${accent} bg-dark-primary flex items-center justify-center shadow-glow-cyan-sm`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={revealViewport}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <HiBriefcase className={`text-${accent} text-sm`} />
                    </motion.div>
                  </div>

                  {/* Card — alternates left/right on desktop */}
                  <motion.div
                    className={`
                      flex-1 ml-4 md:ml-0
                      ${isEven ? 'md:mr-[calc(50%+2rem)] md:text-right' : 'md:ml-[calc(50%+2rem)]'}
                    `}
                    variants={anim}
                    initial="hidden"
                    whileInView="show"
                    viewport={revealViewport}
                  >
                    <div
                      className={`
                        rounded-2xl p-6 border group
                        transition-all duration-350 hover:-translate-y-1
                        ${isDark
                          ? 'bg-dark-tertiary/60 border-white/6 hover:border-accent-cyan/20 hover:shadow-card-hover glass-dark'
                          : 'bg-white border-gray-100 hover:border-accent-blue/25 hover:shadow-card-light-hover'
                        }
                      `}
                    >
                      {/* Header */}
                      <div className={`flex flex-col gap-1 mb-4 ${isEven ? 'md:items-end' : ''}`}>
                        {/* Type badge */}
                        <span className={`font-mono text-2xs tracking-widest text-${accent} uppercase`}>
                          {exp.type}
                        </span>

                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {exp.role}
                        </h3>
                        <p className={`font-semibold text-${accent}`}>{exp.company}</p>

                        <div className={`flex gap-4 flex-wrap text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} ${isEven ? 'md:justify-end' : ''}`}>
                          <span className="flex items-center gap-1.5">
                            <HiCalendar /> {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <HiMapPin /> {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <motion.ul
                        className={`flex flex-col gap-2 mb-5 ${isEven ? 'md:items-end' : ''}`}
                        variants={staggerContainer(0.07)}
                        initial="hidden"
                        whileInView="show"
                        viewport={revealViewport}
                      >
                        {exp.description.map((point, j) => (
                          <motion.li
                            key={j}
                            className={`text-sm flex gap-2 ${isEven ? 'md:flex-row-reverse md:text-right' : ''} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                            variants={fadeInUp}
                          >
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-${accent} flex-shrink-0 opacity-70`} />
                            {point}
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* Tech badges */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {exp.tech.map(t => (
                          <Badge key={t} label={t} variant={exp.color === 'cyan' ? 'cyan' : exp.color === 'violet' ? 'violet' : 'blue'} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
