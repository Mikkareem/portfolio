import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';

export const Skills = () => {
  const skillGroups = portfolioRepository.getSkills();

  // Helper to dynamically match Lucide icons safely
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name] || Icons.Code2;
    return <IconComponent className="w-5 h-5 text-brand-primary group-hover:text-black transition-colors duration-300" />;
  };

  return (
    <div id="skills-page" className="relative min-h-screen pt-28 pb-20 font-sans">
      {/* Visual background decorations */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">TECHNOLOGY INDEX</span>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">Skills & <span className="text-gradient">Capabilities</span></h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-lg text-text-muted leading-relaxed">
              An intuitive visual taxonomy mapping languages, testing packages, deployment meshes, and declarative cross-platform mobile frameworks.
            </p>
          </FadeIn>
        </div>

        {/* Categories Grid */}
        <StaggerContainer staggerBy={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillGroups.map((group) => (
              <StaggerItem key={group.category}>
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 bg-surface-card h-full space-y-6 flex flex-col justify-between group/card hover:border-brand-primary/20 transition-all duration-300 shadow-lg">

                  {/* Category Title Header */}
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-xl font-display font-bold text-white group-hover/card:text-brand-primary transition-colors flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                      {group.category} Tech(s)
                    </h2>
                  </div>

                  {/* Skills List inside current Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                    {group.skills.map((skill) => {
                      const getGradientClass = (cat: string) => {
                        switch (cat) {
                          case 'Frontend':
                            return 'from-blue-500/25 via-purple-500/15 to-pink-500/25 hover:from-blue-500/40 hover:to-pink-500/40 border-blue-400/20 hover:border-blue-400/50 shadow-blue-500/10';
                          case 'Backend':
                            return 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25 hover:from-emerald-500/40 hover:to-cyan-500/40 border-emerald-400/20 hover:border-emerald-400/50 shadow-emerald-500/10';
                          case 'DevOps':
                            return 'from-orange-500/25 via-amber-500/15 to-red-500/25 hover:from-orange-500/40 hover:to-red-500/40 border-orange-400/20 hover:border-orange-400/50 shadow-orange-500/10';
                          case 'Mobile':
                            return 'from-indigo-500/25 via-violet-500/15 to-fuchsia-500/25 hover:from-indigo-500/40 hover:to-fuchsia-500/40 border-indigo-400/20 hover:border-indigo-400/50 shadow-indigo-500/10';
                          default:
                            return 'from-white/[0.08] to-white/[0.02] hover:from-brand-primary/20 hover:to-brand-accent/10';
                        }
                      };

                      return (
                        <div
                          key={skill.name}
                          className={`p-4 rounded-xl border bg-gradient-to-br ${getGradientClass(group.category)} flex items-center justify-between transition-all duration-300 group shadow-md hover:shadow-lg hover:scale-[1.01]`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded bg-white/5 border border-white/10 group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors duration-300">
                              {getIcon(skill.iconName)}
                            </div>
                            <span className="text-sm font-semibold text-white tracking-wide">{skill.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

      </div>
    </div>
  );
};
export default Skills;
