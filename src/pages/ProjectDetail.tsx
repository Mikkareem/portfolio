import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, Activity, Layers, CornerDownRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import { 
  SPRING_TECHNOLOGIES, 
  INFRASTRUCTURE_TECHNOLOGIES, 
  MOBILE_TECHNOLOGIES, 
  TESTING_TECHNOLOGIES 
} from '../data/technologies';

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioRepository.getProjectBySlug(slug || '');
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = project ? [project.thumbnailImage, ...project.screenshots].filter(Boolean) : [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!project) {
    return (
      <div className="min-h-screen pt-36 text-center space-y-4 font-sans">
        <h2 className="text-2xl font-display font-bold text-white">Project Specification Not Found</h2>
        <p className="text-text-muted">The system could not retrieve the target release metadata.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline bg-surface py-2 px-4 rounded-xl border border-white/5">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div id="project-detail-page" className="relative min-h-screen pt-28 pb-20 font-sans">

      {/* Visual background enhancements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Navigation Feed back */}
        <FadeIn direction="up">
          <Link
            id="back-to-projects-btn"
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-white transition-colors py-2 px-4 rounded-xl border border-white/5 bg-surface-card"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </FadeIn>

        {/* Headline details */}
        <div className="space-y-6">
          <FadeIn direction="up">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-brand-primary/5 border border-brand-primary/10 px-3 py-1 rounded">
                System Release Specs
              </span>
              {project.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider"
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
              <h1 className="text-3xl font-display font-extrabold text-white sm:text-4xl md:text-5xl">
                {project.name}
              </h1>
              <div className="flex items-center space-x-3">
                {project.source && (
                  <a
                    id="spec-source-link"
                    href={project.source}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-brand-primary text-black hover:bg-brand-primary/95 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Build &amp; Source
                  </a>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="text-lg text-text-muted leading-relaxed">
              {project.description}
            </p>
          </FadeIn>
        </div>

        {/* Primary Screenshots Carousel */}
        {slides.length > 0 && (
          <FadeIn direction="up" delay={0.25}>
            <div className="relative group max-w-4xl mx-auto h-[300px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-2xl border border-white/5 shadow-2xl bg-surface-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={slides[activeSlide]}
                  alt={`${project.name} Interface ${activeSlide + 1}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Prev Button */}
              {slides.length > 1 && (
                <button
                  onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Next Button */}
              {slides.length > 1 && (
                <button
                  onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Dots indicator */}
              {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'bg-brand-primary w-6' : 'bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Descriptive Long-form Details & Tech side grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">

          {/* Main overview */}
          <div className="lg:col-span-8 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-primary" /> Architectural Overview
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 bg-surface-card space-y-4">
                <MarkdownRenderer content={project.overview} />
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h3 className="text-sm font-semibold tracking-wide text-white">Engine Specifications</h3>
                  <ul className="space-y-2 text-sm text-text-muted">
                    <li className="flex items-center gap-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Decoupled cloud architecture configured across high-concurrency systems.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Responsive multi-platform deployments optimizing local system state persistence.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Side specs sheet */}
          <div className="lg:col-span-4 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-accent" /> System Stack
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="glass-panel p-6 rounded-2xl border-white/5 bg-surface-card space-y-4">
                <div className="space-y-3 font-sans text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Platform Scope:</span>
                    <span className="text-white font-semibold capitalize">{project.platforms.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">System Complexity:</span>
                    <span className="text-white font-semibold">Production Ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Persistence Cache:</span>
                    <span className="text-white font-semibold">Enabled</span>
                  </div>
                </div>
              </div>
            </FadeIn>

             {/* Categorized Tech Cards */}
            {(() => {
              const springTechs = project.technologies.filter(t => SPRING_TECHNOLOGIES.includes(t));
              const infraTechs = project.technologies.filter(t => INFRASTRUCTURE_TECHNOLOGIES.includes(t));
              const mobileTechs = project.technologies.filter(t => MOBILE_TECHNOLOGIES.includes(t));
              const testingTechs = project.technologies.filter(t => TESTING_TECHNOLOGIES.includes(t));

              const categories = [
                { name: 'Spring Technologies', techs: springTechs },
                { name: 'Infrastructure Technologies', techs: infraTechs },
                { name: 'Mobile Technologies', techs: mobileTechs },
                { name: 'Testing Technologies', techs: testingTechs },
              ].filter(c => c.techs.length > 0);

              return categories.map((cat, idx) => (
                <FadeIn key={cat.name} direction="up" delay={0.15 + idx * 0.05}>
                  <div className="glass-panel p-5 rounded-2xl border-white/5 bg-surface-card space-y-3">
                    <h3 className="text-xs font-mono font-bold tracking-wider text-text-muted uppercase">
                      {cat.name}
                    </h3>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
                      {cat.techs.map(tech => (
                        <div
                          key={tech}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-brand-primary bg-brand-primary/5 border border-brand-primary/10 rounded-md w-full md:w-auto hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300"
                        >
                          <span className="text-brand-accent font-bold">&gt;)</span>
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ));
            })()}
          </div>

        </div>

      </div>
    </div>
  );
};
export default ProjectDetail;
