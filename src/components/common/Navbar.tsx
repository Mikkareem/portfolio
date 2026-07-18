import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { portfolioRepository } from '../../data/repositories/portfolioRepository';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const profile = portfolioRepository.getProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const majorProjectsCount = portfolioRepository.getMajorProjects().length;
  const miniProjectsCount = portfolioRepository.getMiniProjects().length;
  const blogsCount = portfolioRepository.getBlogs().length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects', count: majorProjectsCount },
    { name: 'Mini Projects', path: '/mini-projects', count: miniProjectsCount },
    { name: 'Blogs', path: '/blogs', count: blogsCount },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled || isOpen ? 'glass-nav backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name styled exactly as Immersive UI */}
          <Link
            id="brand-logo"
            to="/"
            className="flex items-center gap-3 text-[#f8fafc] font-sans font-semibold tracking-tight text-base group whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center font-bold text-white text-xs glow-blue select-none leading-none shrink-0">
              MIK
            </div>
            <span className="font-semibold tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
              Irsath Kareem
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 font-sans">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                      isActive ? 'text-brand-primary' : 'text-text-muted hover:text-white'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.count !== undefined && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none rounded-full bg-brand-secondary text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      {link.count}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}

            {/* Resume button/CTA */}
            <a
              id="nav-cta-resume"
              href="/contact"
              className="ml-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-brand-primary hover:bg-brand-primary/95 font-sans rounded-full transition-transform active:scale-95 duration-200"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu-drawer"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden glass-panel border-b border-white/5 absolute top-full left-0 right-0 py-6 px-4 bg-bg-base/95 shadow-xl shadow-black/80 max-h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar"
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    id={`mobile-nav-link-${link.name.toLowerCase()}`}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.count !== undefined && (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none rounded-full bg-brand-secondary text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                        {link.count}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  id="mobile-nav-resume"
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary text-black font-semibold uppercase tracking-widest text-xs hover:bg-brand-primary/95 transition-all"
                >
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
