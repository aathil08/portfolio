/* ============================================================
   Contact Section — Info panel + EmailJS form with toast alerts
   ============================================================ */
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  HiEnvelope, HiMapPin, HiCheckCircle, HiXCircle,
  HiPaperAirplane,
} from 'react-icons/hi2';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../../data';
import { useTheme } from '../../context/ThemeContext';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, revealViewport } from '../../utils/animations';

/* ── Toast notification ─────────────────────────────────── */
function Toast({ type, message }) {
  return (
    <motion.div
      className={`
        fixed bottom-8 right-8 z-50 flex items-center gap-3
        px-5 py-4 rounded-2xl shadow-elevated backdrop-blur-sm
        ${type === 'success'
          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
          : 'bg-red-500/20 border border-red-500/40 text-red-400'
        }
      `}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {type === 'success' ? <HiCheckCircle size={20} /> : <HiXCircle size={20} />}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}

/* ── Input field ─────────────────────────────────────────── */
function Field({ label, name, type = 'text', placeholder, value, onChange, isDark, rows }) {
  const base = `
    w-full rounded-xl border px-4 py-3 text-sm outline-none
    transition-all duration-200 font-sans
    ${isDark
      ? 'bg-dark-elevated border-white/8 text-white placeholder-gray-600 focus:border-accent-cyan focus:shadow-glow-cyan-sm'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30'
    }
  `;
  return (
    <div className="flex flex-col gap-2">
      <label className={`font-mono text-xs tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} resize-none`}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={base}
          required
        />
      )}
    </div>
  );
}

/* ── Contact Section ─────────────────────────────────────── */
export default function Contact() {
  const { isDark } = useTheme();
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error
  const [toast, setToast]     = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      /*
       * Replace these with your actual EmailJS credentials:
       *   SERVICE_ID  — from emailjs.com > Email Services
       *   TEMPLATE_ID — from emailjs.com > Email Templates
       *   PUBLIC_KEY  — from emailjs.com > Account > Public Key
       */
      await emailjs.sendForm(
        'service_pyiy1he',
        'template_c1qi1x3',
        formRef.current,
        '8YFsDoxiWKQs6NhhU'
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      showToast('success', 'Message sent! I\'ll get back to you soon 🚀');
    } catch {
      setStatus('error');
      showToast('error', 'Failed to send. Please email me directly.');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const SOCIALS = [
    { icon: FaGithub,   href: personalInfo.github,  label: 'GitHub'   },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section
      id="contact"
      className={`section-wrap relative overflow-hidden ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}
    >
      {/* Ambient orbs */}
      <div className="orb-cyan -bottom-20 right-0 opacity-40" />
      <div className="orb-violet -top-20 left-0 opacity-30" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="08. Contact"
          title="Let's Connect"
          subtitle="Whether it's a project idea, collaboration, or just saying hi — my inbox is always open."
        />

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── Left: Info panel ── */}
          <motion.div
            className="flex flex-col gap-8"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <div className={`flex flex-col gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="text-base leading-relaxed">
                I'm currently <span className="text-accent-cyan font-semibold">open to new opportunities</span> — 
                full-time roles, freelance projects, or exciting collaborations.
                Let's build something great together.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                { icon: HiEnvelope, label: 'Email',    value: personalInfo.email,    href: `mailto:${personalInfo.email}`  },
                { icon: HiMapPin,   label: 'Location', value: personalInfo.location,  href: null                            },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-dark-tertiary border border-white/5' : 'bg-light-tertiary border border-gray-100'}`}>
                    <Icon className="text-accent-cyan text-base" />
                  </div>
                  <div>
                    <p className={`font-mono text-2xs tracking-widest uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{label}</p>
                    {href ? (
                      <a href={href} className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-300 hover:text-accent-cyan' : 'text-gray-700 hover:text-accent-blue'}`}>{value}</a>
                    ) : (
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <p className={`font-mono text-2xs tracking-widest uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                Find me on
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${isDark ? 'border-white/8 text-gray-400 hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-glow-cyan-sm' : 'border-gray-200 text-gray-500 hover:border-accent-blue/40 hover:text-accent-blue'}`}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className={`flex items-center gap-3 rounded-2xl p-4 border ${isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                <span className="font-semibold">Available</span> for new opportunities starting immediately.
              </p>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`flex flex-col gap-5 rounded-2xl border p-6 md:p-8 ${isDark ? 'glass-dark border-white/6' : 'bg-white border-gray-100 shadow-card-light'}`}
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <motion.div
              className="grid sm:grid-cols-2 gap-5"
              variants={staggerContainer(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <motion.div variants={fadeInUp}>
                <Field label="Your Name"    name="name"    placeholder="John Doe"             value={form.name}    onChange={handleChange} isDark={isDark} />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Field label="Email Address" name="email"  type="email" placeholder="john@example.com" value={form.email}   onChange={handleChange} isDark={isDark} />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={revealViewport}>
              <Field label="Subject" name="subject" placeholder="Project Collaboration" value={form.subject} onChange={handleChange} isDark={isDark} />
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={revealViewport}>
              <Field label="Message" name="message" placeholder="Tell me about your project or idea..." value={form.message} onChange={handleChange} isDark={isDark} rows={5} />
            </motion.div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              loading={status === 'sending'}
            >
              <HiPaperAirplane size={15} />
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent! ✓' : 'Send Message'}
            </Button>

            <p className={`text-center font-mono text-2xs ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
              I typically respond within 24 hours.
            </p>
          </motion.form>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </section>
  );
}
