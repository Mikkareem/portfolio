import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Calendar, Hourglass, ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';

export const Blogs = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'internal' | 'medium'>('all');
  const blogs = portfolioRepository.getBlogs();

  const filteredBlogs = blogs.filter(blog => {
    if (activeTab === 'all') return true;
    if (activeTab === 'internal') return !blog.isExternal;
    if (activeTab === 'medium') return blog.isExternal;
    return true;
  });

  return (
    <div id="blogs-page" className="relative min-h-screen pt-28 pb-20 font-sans">
      
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative space-y-16">
        
        {/* Page Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase font-display">TECHNICAL ARTICLES</span>
              <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">Insights & <span className="text-gradient">Blueprints</span></h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <p className="text-lg text-text-muted leading-relaxed">
                Exploring declarative animations inside Kotlin UI stacks, infrastructure engineering with Spring Cloud/Kubernetes, and clean architecture guides.
              </p>
            </FadeIn>
          </div>

          {/* Filtering tabs */}
          <FadeIn direction="up">
            <div className="flex p-1.5 rounded-xl bg-surface border border-white/5 shadow-md self-start md:self-end">
              {(['all', 'internal', 'medium'] as const).map(tab => (
                <button
                  key={tab}
                  id={`blog-tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#38bdf8] text-[#050816] glow-blue'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {tab === 'internal' ? 'Internal Articles' : tab === 'medium' ? 'Medium Posts' : 'All Feeds'}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Feature grid */}
        <StaggerContainer key={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <StaggerItem key={blog.id}>
                <div className={`glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:scale-[1.01] transition-all duration-300 group border bg-gradient-to-br ${
                  idx % 4 === 0 
                    ? 'from-blue-500/25 via-purple-500/15 to-pink-500/25 hover:from-blue-500/40 hover:to-pink-500/40 border-blue-400/20 hover:border-blue-400/50 shadow-blue-500/10'
                    : idx % 4 === 1
                    ? 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25 hover:from-emerald-500/40 hover:to-cyan-500/40 border-emerald-400/20 hover:border-emerald-400/50 shadow-emerald-500/10'
                    : idx % 4 === 2
                    ? 'from-orange-500/25 via-amber-500/15 to-red-500/25 hover:from-orange-500/40 hover:to-red-500/40 border-orange-400/20 hover:border-orange-400/50 shadow-orange-500/10'
                    : 'from-indigo-500/25 via-violet-500/15 to-fuchsia-500/25 hover:from-indigo-500/40 hover:to-fuchsia-500/40 border-indigo-400/20 hover:border-indigo-400/50 shadow-indigo-500/10'
                }`}>
                  
                  {/* Thumbnail */}
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={blog.thumbnail} 
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold">
                      {blog.isExternal ? 'Medium Pub' : 'Internal Release'}
                    </div>
                  </div>

                  {/* Body text & metadata */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      
                      {/* Meta dates and read times */}
                      <div className="flex items-center space-x-4 text-xs text-text-muted font-sans font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hourglass className="w-3.5 h-3.5" /> {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white group-hover:text-brand-primary transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      
                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs font-mono text-brand-accent bg-brand-accent/5 border border-brand-accent/10 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Direction CTAs */}
                      <div className="pt-2">
                        {blog.isExternal ? (
                          <a
                            id={`external-blog-link-${blog.id}`}
                            href={blog.externalUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="text-sm font-semibold text-white group-hover:text-brand-primary flex items-center gap-1.5 transition-colors"
                          >
                            Read Full Publication <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            id={`internal-blog-link-${blog.id}`}
                            to={`/blog/${blog.slug}`}
                            className="text-sm font-semibold text-white group-hover:text-brand-primary flex items-center gap-1.5 transition-colors"
                          >
                            Explore Document specs <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>

                    </div>
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
export default Blogs;
