/* ============================================================
   Certifications Section — Card grid with certificate lightbox
   ============================================================ */
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckBadge, HiArrowTopRightOnSquare, HiXMark, HiArrowDownTray, HiEye } from 'react-icons/hi2';
import { certifications } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, scaleIn, revealViewport } from '../../utils/animations';

/* ── Certificate Lightbox Modal ─────────────────────────── */
function CertModal({ cert, onClose }) {
  const { isDark } = useTheme();

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal card */}
        <motion.div
          className={`relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border
            ${isDark ? 'bg-[#0f1117] border-white/10' : 'bg-white border-gray-200'}
          `}
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-5 py-4 border-b
            ${isDark ? 'border-white/8' : 'border-gray-100'}
          `}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-lg`}>
                {cert.emoji}
              </div>
              <div>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {cert.title}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Download button */}
              <a
                href={cert.imageUrl}
                download
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${isDark
                    ? 'bg-white/8 hover:bg-white/14 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }
                `}
                title="Download certificate"
              >
                <HiArrowDownTray size={13} />
                Download
              </a>

              {/* Verify link (if real URL) */}
              {cert.verifyUrl && cert.verifyUrl !== '#' && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${isDark
                      ? 'bg-accent-cyan/15 hover:bg-accent-cyan/25 text-accent-cyan'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }
                  `}
                >
                  <HiArrowTopRightOnSquare size={13} />
                  Verify
                </a>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                  ${isDark
                    ? 'bg-white/8 hover:bg-red-500/20 text-gray-400 hover:text-red-400'
                    : 'bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500'
                  }
                `}
                aria-label="Close modal"
              >
                <HiXMark size={16} />
              </button>
            </div>
          </div>

          {/* Certificate Image */}
          <div className={`p-4 ${isDark ? 'bg-[#080a0f]' : 'bg-gray-50'}`}>
            <img
              src={cert.imageUrl}
              alt={`${cert.title} certificate`}
              className="w-full h-auto rounded-xl object-contain max-h-[65vh] shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Certificate Card ───────────────────────────────────── */
function CertCard({ cert, isDark, onView }) {
  const { title, issuer, date, credentialId, verifyUrl, gradient, emoji, description } = cert;

  return (
    <motion.div
      variants={scaleIn}
      className={`
        group relative flex flex-col gap-4 rounded-2xl border p-6
        transition-all duration-350 hover:-translate-y-2 overflow-hidden
        ${isDark
          ? 'glass-dark border-white/6 hover:border-accent-cyan/25 hover:shadow-card-hover'
          : 'bg-white border-gray-100 hover:border-accent-blue/25 hover:shadow-card-light-hover'
        }
      `}
    >
      {/* Background glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        {/* Emoji icon in gradient circle */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
          {emoji}
        </div>

        {/* Verify link */}
        {verifyUrl && verifyUrl !== '#' && (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 font-mono text-2xs transition-colors duration-200 flex-shrink-0 mt-1 ${isDark ? 'text-gray-600 hover:text-accent-cyan' : 'text-gray-400 hover:text-accent-blue'}`}
            aria-label="Verify certificate"
          >
            Verify <HiArrowTopRightOnSquare size={11} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-10 flex-1">
        <h3 className={`font-bold text-sm leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <HiCheckBadge className="text-emerald-400 text-base flex-shrink-0" />
          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {issuer}
          </p>
        </div>

        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between pt-3 border-t relative z-10 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
        <span className={`font-mono text-2xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          {credentialId}
        </span>
        <span className={`font-mono text-2xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {date}
        </span>
      </div>

      {/* View Certificate Button */}
      <button
        onClick={() => onView(cert)}
        className={`
          relative z-10 w-full flex items-center justify-center gap-2
          py-2.5 rounded-xl text-xs font-semibold tracking-wide
          transition-all duration-300 group/btn overflow-hidden
          border
          ${isDark
            ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-gradient-to-r hover:from-accent-cyan/20 hover:to-accent-blue/20 hover:border-accent-cyan/40 hover:text-white'
            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 hover:text-blue-700'
          }
        `}
      >
        <HiEye size={14} className="transition-transform duration-300 group-hover/btn:scale-110" />
        View Certificate
      </button>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────── */
export default function Certifications() {
  const { isDark } = useTheme();
  const [activeCert, setActiveCert] = useState(null);

  const handleView = useCallback((cert) => setActiveCert(cert), []);
  const handleClose = useCallback(() => setActiveCert(null), []);

  return (
    <section
      id="certifications"
      className={`section-wrap ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="06. Certifications"
          title="Credentials"
          subtitle="Industry-recognized certifications that validate my technical expertise."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
        >
          {certifications.map(cert => (
            <CertCard key={cert.id} cert={cert} isDark={isDark} onView={handleView} />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {activeCert && (
        <CertModal cert={activeCert} onClose={handleClose} />
      )}
    </section>
  );
}
