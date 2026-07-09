import { useState } from 'react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';
import { PlatformType } from '../types';
import { MajorProjectCard } from '../components/common/MajorProjectCard';
import { Monitor, Smartphone, Cpu, Layers } from 'lucide-react';

export const Projects = () => {
  const [filter, setFilter] = useState<'all' | PlatformType>('all');
  
  const majorProjects = portfolioRepository.getMajorProjects();

  const filteredMajorProjects = majorProjects.filter(p => {
    if (filter === 'all') return true;
    return p.platforms.includes(filter);
  });

  const getPlatformIcon = (platform: PlatformType) => {
    if (platform === 'web') return <Monitor className="w-4 h-4" />;
    if (platform === 'android' || platform === 'ios') return <Smartphone className="w-4 h-4" />;
    if (platform === 'backend') return <Cpu className="w-4 h-4" />;
    return <Layers className="w-4 h-4" />;
  };

  return (
    <div id="projects-page" className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background glow meshes */}
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Title details block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4 max-w-2xl text-left">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">PROJECT CATALOG</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
                Major <span className="text-gradient">Releases</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <p className="text-base text-text-muted leading-relaxed font-sans">
                A showcase of production-ready systems, tools, and platforms built with enterprise-grade architectures and modern frameworks.
              </p>
            </FadeIn>
          </div>

          {/* Filtering navigation container */}
          <div className="flex-shrink-0">
            <FadeIn direction="up" delay={0.2}>
              <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
                {(['all', 'web', 'android', 'ios', 'backend'] as const).map(tag => (
                  <button
                    key={tag}
                    id={`projects-filter-${tag}`}
                    onClick={() => setFilter(tag)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 flex items-center gap-2 ${
                      filter === tag
                        ? 'bg-brand-primary text-[#050816] shadow-lg shadow-brand-primary/20'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tag !== 'all' && getPlatformIcon(tag)}
                    {tag === 'all' ? 'All Systems' : tag}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Major Projects Core System */}
        <div className="space-y-10">
          <FadeIn direction="up">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-brand-primary" /> Major Core Releases
            </h2>
          </FadeIn>

          <StaggerContainer key={filter}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredMajorProjects.map((project, idx) => (
                <StaggerItem key={project.id}>
                  <MajorProjectCard project={project} idx={idx} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

      </div>
    </div>
  );
};
export default Projects;
