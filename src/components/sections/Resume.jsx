/* ============================================================
   Resume Section — Stylized preview + download CTA
   ============================================================ */
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFilePdf } from 'react-icons/fa';
import { personalInfo } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { scaleIn, fadeInUp, revealViewport } from '../../utils/animations';

/* Simulated resume preview card */
function ResumePreview({ isDark }) {
  const sections = [
    { label: 'Experience',      width: '85%', color: 'bg-accent-cyan'  },
    { label: 'Skills',          width: '90%', color: 'bg-violet-400'   },
    { label: 'Projects',        width: '80%', color: 'bg-blue-400'     },
    { label: 'Education',       width: '75%', color: 'bg-emerald-400'  },
    { label: 'Certifications',  width: '70%', color: 'bg-orange-400'   },
  ];

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={`
        relative max-w-sm w-full mx-auto rounded-3xl border overflow-hidden
        ${isDark ? 'glass-dark border-white/8 shadow-card' : 'bg-white border-gray-100 shadow-card-light'}
      `}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Header strip */}
      <div className="h-2 w-full bg-gradient-primary" />

      {/* Content */}
      <div className="p-8 flex flex-col gap-6">
        {/* Name block */}
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-black gradient-text">Mohamed Aathil</div>
          <div className={`font-mono text-xs tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Full Stack Developer · Java Developer
          </div>
        </div>

        {/* Divider */}
        <div className={`h-[1px] ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />

        {/* Section bars */}
        <div className="flex flex-col gap-4">
          {sections.map(({ label, width, color }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className={`font-mono text-2xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
                <span className={`font-mono text-2xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>✓</span>
              </div>
              <div className={`h-1 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <motion.div
                  className={`h-full rounded-full ${color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className={`flex items-center gap-3 pt-2 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
          <FaFilePdf className="text-red-400 text-xl" />
          <div>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Mohamed_Aathil_Resume.pdf
            </p>
            <p className={`font-mono text-2xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              B.E CSE · M.I.E.T Engineering College
            </p>
          </div>
        </div>
      </div>

      {/* Decorative corner glow */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-accent-cyan opacity-10 blur-2xl" />
    </motion.div>
  );
}

export default function Resume() {
  const { isDark } = useTheme();

  return (
    <section
      id="resume"
      className={`section-wrap ${isDark ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="07. Resume"
          title="My Resume"
          subtitle="A concise overview of my experience, skills, and achievements."
        />

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Preview */}
          <ResumePreview isDark={isDark} />

          {/* Right: CTA content */}
          <motion.div
            className="flex flex-col gap-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <div className="flex flex-col gap-4">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Get the full picture
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                My resume covers my complete work history, technical skill stack, notable projects,
                academic background, and certifications — all structured for quick review.
              </p>
            </div>

            {/* Highlights */}
            <ul className="flex flex-col gap-3">
              {[
                '📄 Clean, ATS-friendly resume format',
                '⚡ B.E CSE · M.I.E.T Engineering College (8.13 CGPA)',
                '🛠  Full stack & programming skills overview',
                '🏅 5 industry certifications listed',
              ].map(item => (
                <li
                  key={item}
                  className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="md"
                href={personalInfo.resumeUrl}
                download
              >
                <FaDownload size={13} />
                Download PDF
              </Button>
              <Button
                variant="secondary"
                size="md"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEye size={14} />
                View Online
              </Button>
            </div>

            {/* Last updated note */}
            <p className={`font-mono text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              🕐 Last updated: June 2025
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
