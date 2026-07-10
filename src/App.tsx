import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { InteractiveBackground } from './components/animations/InteractiveBackground';

// Lazy-loaded pages for optimized chunk split delivery
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const MiniProjects = lazy(() => import('./pages/MiniProjects'));
const MajorProjectDetail = lazy(() => import('./pages/MajorProjectDetail'));
const MiniProjectDetail = lazy(() => import('./pages/MiniProjectDetail'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));

// Helper to restore scroll position to top on page transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Module fallback loader
const ModuleLoader = () => (
  <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center font-mono space-y-4">
    <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-text-muted">Loading System Module...</span>
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Dynamic Background Canvas (Constant, no flickering) */}
      <InteractiveBackground />

      <div className="relative min-h-screen text-white flex flex-col justify-between selection:bg-brand-primary/25 selection:text-brand-primary overflow-x-hidden w-full max-w-full">
        
        {/* Sticky Header Nav */}
        <Navbar />

        {/* Content Gateway */}
        <main className="flex-grow">
          <Suspense fallback={<ModuleLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/mini-projects" element={<MiniProjects />} />
              <Route path="/project/:slug" element={<MajorProjectDetail />} />
              <Route path="/mini-project/:slug" element={<MiniProjectDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback back to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {/* Branding Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}
