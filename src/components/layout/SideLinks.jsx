/* ============================================================
   SideLinks — Fixed left social icons + right email (desktop)
   ============================================================ */
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { personalInfo } from '../../data';

const SOCIAL = [
  { icon: FaGithub,    href: personalInfo.github,     label: 'GitHub',    color: 'hover:text-gray-200'   },
  { icon: FaLinkedin,  href: personalInfo.linkedin,   label: 'LinkedIn',  color: 'hover:text-blue-400'   },
  { icon: FaWhatsapp,  href: personalInfo.whatsapp,   label: 'WhatsApp',  color: 'hover:text-green-400'  },
  { icon: FaInstagram, href: personalInfo.instagram,  label: 'Instagram', color: 'hover:text-pink-400'   },
  { icon: FaFacebook,  href: personalInfo.facebook,   label: 'Facebook',  color: 'hover:text-blue-500'   },
];

export default function SideLinks() {
  return (
    <>
      {/* ── Left side: Social icons ── */}
      <motion.div
        className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center gap-5 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        {SOCIAL.map(({ icon: Icon, href, label, color }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`text-gray-500 transition-colors duration-200 ${color}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.25, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={19} />
          </motion.a>
        ))}
        {/* Vertical line */}
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent-cyan/40 to-transparent" />
      </motion.div>

      {/* ── Right side: Email ── */}
      <motion.div
        className="hidden lg:flex fixed right-8 bottom-0 flex-col items-center gap-4 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="font-mono text-xs tracking-[0.15em] text-gray-500 hover:text-accent-cyan transition-colors duration-200"
          style={{ writingMode: 'vertical-rl' }}
          whileHover={{ scale: 1.05 }}
        >
          {personalInfo.email}
        </motion.a>
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent-cyan/40 to-transparent" />
      </motion.div>
    </>
  );
}
