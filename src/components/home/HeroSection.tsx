import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioRepository } from '../../data/repositories/portfolioRepository';
import { FadeIn } from '../animations/FadeIn';

export const HeroSection = () => {
  const profile = portfolioRepository.getProfile();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const rolesList = profile.roles || [];
    if (rolesList.length === 0) return;
    const fullText = rolesList[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);

        if (currentText === fullText) {
          // Pause at end
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % rolesList.length);
          setTypingSpeed(500); // Pause before next word
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, profile.roles]);

  return (
    <div className="lg:col-span-7 flex flex-col justify-center">
      <FadeIn direction="up" delay={0.15}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#38bdf8] text-xs font-medium mb-6 w-fit select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
          Available for new projects
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.25}>
        <div className="space-y-4 mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.1] select-none">
            Mohamed Irsath<br />
            <span className="text-gradient hover:glow-text transition-all duration-300">
              Kareem
            </span>
          </h1>
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-mono font-bold uppercase tracking-wider w-fit select-none">
            {profile.title}
          </div>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.35}>
        <div className="h-8 md:h-10">
          <span className="text-xl sm:text-2xl md:text-3xl text-[#94a3b8] font-display font-semibold typing-cursor">
            {currentText}
          </span>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.45}>
        <div className="space-y-4 max-w-xl font-sans">
          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
            {profile.tagline}
          </p>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            {profile.bio}
          </p>
        </div>
      </FadeIn>

      {/* CTAs */}
      <FadeIn direction="up" delay={0.55}>
        <div className="flex flex-wrap items-center gap-4 pt-4 font-sans">
          <Link
            id="hero-cta-projects"
            to="/projects"
            className="px-8 py-4 rounded-xl bg-[#38bdf8] text-[#050816] font-bold text-sm glow-blue hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#38bdf8]/10"
          >
            View Projects
          </Link>
          <Link
            id="hero-cta-blogs"
            to="/blogs"
            className="px-8 py-4 rounded-xl glass font-bold text-sm border-white/20 hover:bg-white/5 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Read Articles
          </Link>
          <Link
            id="hero-cta-contact"
            to="/contact"
            className="px-6 py-4 text-[#94a3b8] hover:text-white transition-all font-semibold text-sm"
          >
            Contact Me
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};
export default HeroSection;
