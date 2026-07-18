import { useState } from 'react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';
import { PlatformType } from '../types';
import { MiniProjectCard } from '../components/common/MiniProjectCard';
import { Monitor, Smartphone, Cpu, Layers } from 'lucide-react';

export const MiniProjects = () => {
  const [filter, setFilter] = useState<'all' | PlatformType>('all');

  const miniProjects = portfolioRepository.getMiniProjects();

  const filteredMiniProjects = miniProjects.filter(p => {
    if (filter === 'all') return true;
    return p.platforms.includes(filter);
  });

  const getPlatformIcon = (platform: PlatformType) => {
    if (platform === 'web') return <Monitor className="w-4 h-4 text-brand-primary" />;
    if (platform === 'android' || platform === 'ios') return <Smartphone className="w-4 h-4 text-brand-accent" />;
    if (platform === 'backend') return <Cpu className="w-4 h-4 text-brand-secondary" />;
    return <Layers className="w-4 h-4 text-brand-primary" />;
  };

  return (
    <div id="mini-projects-page" className="relative min-h-screen pt-28 pb-20 font-sans">

      {/* Visual glowing effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative space-y-12">

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4 text-left">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-bold tracking-widest text-[#c084fc] uppercase font-display">EXPERIMENTAL LAB</span>
              <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">Mini <span className="text-gradient">Projects</span></h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <p className="text-lg text-text-muted leading-relaxed">
                A showcase of projects featuring UI layout labs, specialized Jetpack Compose animations, and canvas-intensive micro-visualizers.
              </p>
            </FadeIn>
          </div>

          {/* Filtering Tabs for Mini projects */}
          <div className="w-full md:w-auto">
            <FadeIn direction="up">
              <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-start md:justify-end">
                <div className="flex p-1.5 rounded-xl bg-surface border border-white/5 shadow-md gap-1 min-w-max">
                  {(['all', 'web', 'android', 'ios', 'desktop', 'backend'] as const).map(tab => (
                    <button
                      key={tab}
                      id={`filter-${tab}`}
                      onClick={() => setFilter(tab)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-1.5 ${filter === tab
                        ? 'bg-[#38bdf8] text-[#050816] glow-blue'
                        : 'text-[#94a3b8] hover:text-white'
                        }`}
                    >
                      {tab !== 'all' && getPlatformIcon(tab)}
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Mini Projects & UI Labs Grid */}
        <div className="space-y-10">
          <StaggerContainer key={filter} staggerBy={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMiniProjects.map((project, idx) => (
                <StaggerItem key={project.id}>
                  <MiniProjectCard project={project} idx={idx} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

      </div>
    </div>
  );
};

export default MiniProjects;
