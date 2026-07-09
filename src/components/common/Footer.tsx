import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp, Terminal } from 'lucide-react';
import { portfolioRepository } from '../../data/repositories/portfolioRepository';

export const Footer = () => {
  const profile = portfolioRepository.getProfile();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative border-t border-white/5 bg-bg-base pt-16 pb-12 overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand/Logo column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-white font-sans font-semibold tracking-tight text-base group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center font-bold text-white text-xs glow-blue select-none leading-none shrink-0">
                MIK
              </div>
              <span className="font-semibold tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
                Irsath Kareem
              </span>
            </Link>
            <p className="text-text-muted font-sans text-sm max-w-sm leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                id="social-github-footer"
                href={profile.socials.github}
                target="_blank"
                referrerPolicy="no-referrer"
                className="transition-transform duration-300 hover:scale-110 shrink-0"
                aria-label="GitHub Link"
              >
                <svg fill="#ea48dc" className="w-6 h-6 shrink-0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24.00 24.00" xmlSpace="preserve" stroke="#ea48dc" strokeWidth={0.00024}><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth={0.048}></g><g id="SVGRepo_iconCarrier"> <g id="social-github"> <path d="M22.4,6c-1.1-1.8-2.5-3.3-4.4-4.4C16.2,0.5,14.2,0,12,0C9.8,0,7.8,0.5,6,1.6C4.1,2.7,2.7,4.1,1.6,6C0.5,7.8,0,9.8,0,12 c0,2.6,0.8,5,2.3,7.1c1.5,2.1,3.5,3.5,5.9,4.3c0.3,0.1,0.5,0,0.6-0.1C9,23.2,9,23,9,22.8c0,0,0-0.3,0-0.8c0-0.5,0-1,0-1.4l-0.4,0.1 c-0.2,0-0.5,0.1-0.9,0.1c-0.3,0-0.7,0-1.1-0.1c-0.4-0.1-0.7-0.2-1-0.5c-0.3-0.2-0.6-0.6-0.7-1l-0.2-0.4c-0.1-0.2-0.3-0.5-0.5-0.8 c-0.2-0.3-0.5-0.5-0.7-0.6l-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2c0.1,0,0.2-0.1,0.5-0.1 l0.3,0c0.2,0,0.5,0.2,0.8,0.4c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.5,0.8,0.9,1c0.3,0.2,0.7,0.3,1,0.3c0.3,0,0.6,0,0.9-0.1 C8.6,19.1,8.8,19,9,18.9c0.1-0.7,0.3-1.2,0.8-1.6c-0.6-0.1-1.1-0.2-1.6-0.3c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.6-1.3-1 c-0.3-0.4-0.6-1-0.8-1.6c-0.2-0.7-0.3-1.5-0.3-2.3c0-1.3,0.4-2.3,1.2-3.2C5.2,7.2,5.2,6.1,5.7,5C6,4.9,6.4,4.9,7,5.2 c0.6,0.2,1,0.4,1.3,0.6C8.6,5.9,8.8,6.1,9,6.2c1-0.3,2-0.4,3-0.4s2,0.1,3,0.4l0.6-0.4C16,5.6,16.5,5.3,17,5.1 c0.6-0.2,1-0.3,1.3-0.2c0.5,1.2,0.5,2.2,0.1,3.2c0.8,0.9,1.2,2,1.2,3.2c0,0.9-0.1,1.7-0.3,2.4c-0.2,0.7-0.5,1.2-0.8,1.6 c-0.3,0.4-0.8,0.8-1.3,1c-0.5,0.3-1,0.5-1.5,0.6c-0.5,0.1-1,0.2-1.6,0.3c0.5,0.5,0.8,1.2,0.8,2.2v3.3c0,0.2,0.1,0.3,0.2,0.5 c0.1,0.1,0.3,0.2,0.6,0.1c2.4-0.8,4.4-2.2,5.9-4.3C23.2,17,24,14.6,24,12C24,9.8,23.5,7.8,22.4,6z"></path> </g> </g></svg>
              </a>
              <a
                id="social-linkedin-footer"
                href={profile.socials.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="transition-transform duration-300 hover:scale-110 shrink-0"
                aria-label="LinkedIn Link"
              >
                <img 
                  src="https://www.svgrepo.com/show/448234/linkedin.svg" 
                  className="w-6 h-6 object-contain"
                  alt="LinkedIn"
                />
              </a>
              <a
                id="social-medium-footer"
                href={profile.socials.medium}
                target="_blank"
                referrerPolicy="no-referrer"
                className="transition-transform duration-300 hover:scale-110 shrink-0"
                aria-label="Medium Link"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ea48dc"><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12C13 15.3137 10.3137 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C10.3137 6 13 8.68629 13 12Z" fill="#ea48dc"></path> <path d="M23 12C23 14.7614 22.5523 17 22 17C21.4477 17 21 14.7614 21 12C21 9.23858 21.4477 7 22 7C22.5523 7 23 9.23858 23 12Z" fill="#ea48dc"></path> <path d="M17 18C18.6569 18 20 15.3137 20 12C20 8.68629 18.6569 6 17 6C15.3431 6 14 8.68629 14 12C14 15.3137 15.3431 18 17 18Z" fill="#ea48dc"></path> </g></svg>
              </a>
              <a
                id="social-email-footer"
                href={`mailto:${profile.socials.email}`}
                className="transition-transform duration-300 hover:scale-110 shrink-0"
                aria-label="Email Link"
              >
                <img 
                  src="https://www.svgrepo.com/show/353812/google-gmail.svg" 
                  className="w-6 h-6 object-contain"
                  alt="Email"
                />
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-text-main uppercase font-display">Navigation</h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link to="/" className="text-text-muted hover:text-brand-primary transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-text-muted hover:text-brand-primary transition-colors duration-200">About</Link>
              </li>
              <li>
                <Link to="/projects" className="text-text-muted hover:text-brand-primary transition-colors duration-200">Projects</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-text-muted hover:text-brand-primary transition-colors duration-200">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Quick contact Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-text-main uppercase font-display">Reach Out</h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link to="/skills" className="text-text-muted hover:text-brand-primary transition-colors duration-200">Skills Matrix</Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-muted hover:text-brand-primary transition-colors duration-200">Get in Touch</Link>
              </li>
              <li className="text-text-muted">
                Loc: <span className="text-white">Chennai, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Animated Divider */}
        <div className="relative mt-16 mb-8">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent origin-left"
          />
        </div>

        {/* Footer bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-text-muted">
            &copy; {new Date().getFullYear()} Mohamed Irsath Kareem. All absolute rights reserved.
          </p>
          
          <button
            id="scroll-to-top"
            onClick={handleScrollTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-surface text-xs font-medium text-text-muted hover:text-brand-primary hover:border-brand-primary/20 transition-all duration-300"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
