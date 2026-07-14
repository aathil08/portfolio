/* ============================================================
   App.jsx — Root component: theme provider, loader, all sections
   ============================================================ */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Navbar       from './components/layout/Navbar';
import Footer       from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import SideLinks    from './components/layout/SideLinks';

// UI
import Loader from './components/ui/Loader';

// Sections
import Hero           from './components/sections/Hero';
import About          from './components/sections/About';
import Skills         from './components/sections/Skills';
import Experience     from './components/sections/Experience';
import Projects       from './components/sections/Projects';
import Education      from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Resume         from './components/sections/Resume';
import Contact        from './components/sections/Contact';

/* ── Inner app (needs ThemeProvider context) ─────────────── */
function PortfolioApp() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content (hidden under loader until it exits) */}
      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <SideLinks />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certifications />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

/* ── Root export ─────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
