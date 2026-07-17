import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Monitor, Smartphone, Cpu, Layers } from 'lucide-react';
import { MiniProject, PlatformType } from '../../types';

interface MiniProjectCardProps {
  project: MiniProject;
  idx: number;
}

const getPlatformIcon = (platform: PlatformType) => {
  if (platform === 'web') return <Monitor className="w-4 h-4 text-brand-primary" />;
  if (platform === 'android' || platform === 'ios') return <Smartphone className="w-4 h-4 text-brand-accent" />;
  if (platform === 'backend') return <Cpu className="w-4 h-4 text-brand-secondary" />;
  return <Layers className="w-4 h-4 text-brand-primary" />;
};

const VideoPlayer = ({ src }: { src: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-xs z-10">
          <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        onLoadStart={() => setIsLoading(true)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
      />
    </div>
  );
};

export const MiniProjectCard = ({ project, idx }: MiniProjectCardProps) => {
  const gradientClass = idx % 4 === 0
    ? 'from-blue-500/25 via-purple-500/15 to-pink-500/25 hover:from-blue-500/40 hover:to-pink-500/40 border-blue-400/20 hover:border-blue-400/50 shadow-blue-500/10'
    : idx % 4 === 1
      ? 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25 hover:from-emerald-500/40 hover:to-cyan-500/40 border-emerald-400/20 hover:border-emerald-400/50 shadow-emerald-500/10'
      : idx % 4 === 2
        ? 'from-orange-500/25 via-amber-500/15 to-red-500/25 hover:from-orange-500/40 hover:to-red-500/40 border-orange-400/20 hover:border-orange-400/50 shadow-orange-500/10'
        : 'from-indigo-500/25 via-violet-500/15 to-fuchsia-500/25 hover:from-indigo-500/40 hover:to-fuchsia-500/40 border-indigo-400/20 hover:border-indigo-400/50 shadow-indigo-500/10';

  const videoUrl = project.thumbnail?.video;
  const imageUrl = project.thumbnail?.image;
  const hasVideo = !!videoUrl;
  const hasImage = !!imageUrl;
  const hasThumbnail = hasVideo || hasImage;

  return (
    <div className={`glass-panel p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between space-y-4 h-full group relative border bg-gradient-to-br ${gradientClass}`}>

      {/* Entire Card Clickable Overlay */}
      <Link
        to={`/mini-project/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}`}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between z-20 relative">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider rounded"
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
          <div className="flex gap-1">
            {project.platforms.map(p => (
              <span key={p} title={p}>
                {getPlatformIcon(p)}
              </span>
            ))}
          </div>
        </div>

        {hasThumbnail && (
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center mb-1">
            {hasVideo ? (
              <VideoPlayer src={videoUrl} />
            ) : (
              <img
                src={
                  imageUrl!.startsWith('http')
                    ? imageUrl
                    : `${import.meta.env.BASE_URL}${imageUrl!.startsWith('/') ? imageUrl!.slice(1) : imageUrl}`
                }
                alt={project.name}
                className="w-full h-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        )}

        <h3 className="text-base font-bold font-display text-white group-hover:text-brand-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5 z-20 relative">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-mono bg-white/5 rounded text-text-muted">
              {tech}
            </span>
          ))}
        </div>

        {project.source && (
          <a
            id={`mini-source-${project.id}`}
            href={project.source}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-text-muted hover:text-brand-primary transition-colors"
            aria-label="Minis Source"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
export default MiniProjectCard;
