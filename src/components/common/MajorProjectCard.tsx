import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Monitor, Smartphone, Cpu, Layers } from 'lucide-react';
import { MajorProject, PlatformType } from '../../types';

interface MajorProjectCardProps {
  project: MajorProject;
  idx: number;
}

const getPlatformIcon = (platform: PlatformType) => {
  if (platform === 'web') return <Monitor className="w-4 h-4 text-brand-primary" />;
  if (platform === 'android' || platform === 'ios') return <Smartphone className="w-4 h-4 text-brand-accent" />;
  if (platform === 'backend') return <Cpu className="w-4 h-4 text-brand-secondary" />;
  return <Layers className="w-4 h-4 text-brand-primary" />;
};

export const MajorProjectCard = ({ project, idx }: MajorProjectCardProps) => {
  const gradientClass = idx % 4 === 0
    ? 'from-blue-500/25 via-purple-500/15 to-pink-500/25 hover:from-blue-500/40 hover:to-pink-500/40 border-blue-400/20 hover:border-blue-400/50 shadow-blue-500/10'
    : idx % 4 === 1
      ? 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25 hover:from-emerald-500/40 hover:to-cyan-500/40 border-emerald-400/20 hover:border-emerald-400/50 shadow-emerald-500/10'
      : idx % 4 === 2
        ? 'from-orange-500/25 via-amber-500/15 to-red-500/25 hover:from-orange-500/40 hover:to-red-500/40 border-orange-400/20 hover:border-orange-400/50 shadow-orange-500/10'
        : 'from-indigo-500/25 via-violet-500/15 to-fuchsia-500/25 hover:from-indigo-500/40 hover:to-fuchsia-500/40 border-indigo-400/20 hover:border-indigo-400/50 shadow-indigo-500/10';

  return (
    <div className={`glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:scale-[1.01] transition-all duration-300 group relative border bg-gradient-to-br ${gradientClass}`}>

      {/* Entire Card Clickable Overlay */}
      <Link
        to={`/project/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}`}
      />

      <div className="h-60 overflow-hidden relative">
        <img
          src={
            project.thumbnailImage.startsWith('http')
              ? project.thumbnailImage
              : `${import.meta.env.BASE_URL}${project.thumbnailImage.startsWith('/') ? project.thumbnailImage.slice(1) : project.thumbnailImage}`
          }
          alt={project.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2.5 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg shadow-black/25">
          {project.platforms.map((platform, pIdx) => (
            <span key={platform} className="text-[11px] font-bold text-white capitalize flex items-center gap-1.5">
              {pIdx > 0 && <span className="w-1 h-1 rounded-full bg-white/20 mr-1" />}
              {getPlatformIcon(platform)}
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider"
                style={{
                  background: tag.color.length > 1
                    ? `linear-gradient(135deg, ${tag.color.join(', ')})`
                    : tag.color[0]
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold font-display text-white group-hover:text-brand-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="px-2.5 py-1 text-xs font-mono text-brand-accent bg-brand-accent/5 border border-brand-accent/10 rounded-md">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-mono text-text-muted bg-white/5 rounded-md">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-sm font-semibold text-white group-hover:text-brand-primary transition-colors flex items-center gap-1.5">
              Specs &amp; Architecture
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </span>
            {project.source && (
              <a
                id={`proj-living-app-${project.id}`}
                href={project.source}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-text-muted hover:text-brand-primary flex items-center gap-1.5 transition-colors z-20 relative text-xs font-semibold"
              >
                Source Link <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MajorProjectCard;
