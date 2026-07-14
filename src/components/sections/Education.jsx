/* ============================================================
   Education Section — Academic timeline with flip-reveal cards
   ============================================================ */
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCalendar, HiMapPin, HiStar } from 'react-icons/hi2';
import { education } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import { fadeInUp, staggerContainer, revealViewport } from '../../utils/animations';

export default function Education() {
  const { isDark } = useTheme();

  return (
    <section
      id="education"
      className={`section-wrap ${isDark ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="05. Education"
          title="Academic Background"
          subtitle="The foundation that shaped my technical thinking and problem-solving approach."
        />

        <motion.div
          className="flex flex-col gap-8 max-w-4xl mx-auto"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
        >
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              variants={fadeInUp}
              className={`
                group relative rounded-2xl border p-6 md:p-8
                transition-all duration-350 hover:-translate-y-1
                ${isDark
                  ? 'glass-dark border-white/6 hover:border-accent-cyan/20 hover:shadow-card-hover'
                  : 'bg-white border-gray-100 hover:border-accent-blue/25 hover:shadow-card-light-hover'
                }
              `}
            >
              {/* Gradient left border accent */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
                style={{
                  background: edu.color === 'cyan'
                    ? 'linear-gradient(180deg, #00d4ff, #3b82f6)'
                    : 'linear-gradient(180deg, #7c3aed, #00d4ff)',
                }}
              />

              <div className="pl-4 flex flex-col gap-5">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    {/* Degree */}
                    <h3 className={`font-bold text-lg leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {edu.degree}
                    </h3>
                    {/* Institution */}
                    <p className={`font-semibold text-base ${edu.color === 'cyan' ? 'text-accent-cyan' : 'text-violet-400'}`}>
                      {edu.institution}
                    </p>
                    {/* Meta */}
                    <div className={`flex flex-wrap gap-4 text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <span className="flex items-center gap-1.5"><HiCalendar /> {edu.period}</span>
                      <span className="flex items-center gap-1.5"><HiMapPin  /> {edu.location}</span>
                    </div>
                  </div>

                  {/* Grade badge */}
                  <div className="flex-shrink-0 flex items-center gap-2 bg-gradient-primary p-[1px] rounded-xl self-start">
                    <div className={`rounded-xl px-4 py-2 ${isDark ? 'bg-dark-elevated' : 'bg-white'} flex items-center gap-2`}>
                      <HiStar className="text-yellow-400 text-sm" />
                      <span className={`font-mono font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {edu.description}
                </p>

                {/* Key courses */}
                <div>
                  <p className={`font-mono text-2xs tracking-widest uppercase mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Key Courses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map(course => (
                      <span
                        key={course}
                        className={`font-mono text-2xs px-2.5 py-1 rounded-lg border
                          ${isDark
                            ? 'bg-dark-primary border-white/5 text-gray-400'
                            : 'bg-light-tertiary border-gray-100 text-gray-500'
                          }`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graduation cap icon */}
              <div className={`absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${isDark ? 'text-accent-cyan' : 'text-accent-blue'}`}>
                <HiAcademicCap size={48} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
