import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn } from '../components/animations/FadeIn';

// Extracted Sub-components
import { HeroSection } from '../components/home/HeroSection';
import { TerminalSimulation } from '../components/home/TerminalSimulation';
import { StatsCounters } from '../components/home/StatsCounters';
import { SkillsOrbitGalaxy } from '../components/home/SkillsOrbitGalaxy';
import { MajorProjectCard } from '../components/common/MajorProjectCard';
import { MiniProjectCard } from '../components/common/MiniProjectCard';

export const Home = () => {
  const majorProjects = portfolioRepository.getMajorProjects().slice(0, 2);
  const miniProjects = portfolioRepository.getMiniProjects().slice(0, 2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="home-page" className="relative min-h-screen pt-28 pb-16 overflow-hidden flex flex-col justify-center">

      {/* Visual glowing meshes */}
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Core Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[60vh]">
          <HeroSection />
          <TerminalSimulation />
        </div>

        {/* Counter Statistics Section */}
        <StatsCounters />

        {/* Collective Orbital Skills Block */}
        <div className="mt-28 md:mt-36 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <FadeIn direction="up">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">TECHNICAL STACK</span>
                <h2 className="text-3xl font-display font-bold text-white">Core <span className="text-gradient">Skills</span></h2>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <Link
                id="view-all-skills-home"
                to="/skills"
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#38bdf8] text-[#050816] hover:bg-[#38bdf8]/90 text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#38bdf8]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 select-none"
              >
                <span className="relative flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#050816] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#050816]"></span>
                  </span>
                  Want Full Insights?
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </FadeIn>
          </div>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed max-w-4xl font-sans">
              A snapshot of the core technologies, programming languages, frameworks, and development tools I use to build performant, scalable, and user-focused applications with a focus on efficiency, maintainability, and high-quality software development.
            </p>
          </FadeIn>

          <SkillsOrbitGalaxy isMobile={isMobile} />
        </div>

        {/* Featured Projects Highlights */}
        <div className="mt-28 md:mt-36 space-y-12">

          {/* Section 1: Major Projects */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <FadeIn direction="up">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">NOTABLE / FEATURED</span>
                  <h2 className="text-3xl font-display font-bold text-white">Major Projects</h2>
                </div>
              </FadeIn>

              <FadeIn direction="up">
                <Link
                  id="view-all-projects-home"
                  to="/projects"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#38bdf8] text-[#050816] hover:bg-[#38bdf8]/90 text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#38bdf8]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 select-none"
                >
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#050816] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#050816]"></span>
                    </span>
                    View Project Catalog
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              {majorProjects.map((project, idx) => (
                <FadeIn key={project.id} direction="up" delay={idx * 0.15}>
                  <MajorProjectCard project={project} idx={idx} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Section 2: Experimental Labs */}
          <div className="space-y-8 pt-10 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <FadeIn direction="up">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#c084fc] uppercase">LABS &amp; EXPERIMENTS</span>
                  <h2 className="text-3xl font-display font-bold text-white">Mini Projects</h2>
                </div>
              </FadeIn>

              <FadeIn direction="up">
                <Link
                  id="view-all-mini-projects-home"
                  to="/mini-projects"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#c084fc] text-[#050816] hover:bg-[#c084fc]/90 text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#c084fc]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 select-none"
                >
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#050816] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#050816]"></span>
                    </span>
                    View Mini Projects
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              {miniProjects.map((project, idx) => (
                <FadeIn key={project.id} direction="up" delay={idx * 0.15}>
                  <MiniProjectCard project={project} idx={idx} />
                </FadeIn>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
