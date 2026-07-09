import { useParams, Link } from 'react-router-dom';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Hourglass, Bookmark, Tag, Compass } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn } from '../components/animations/FadeIn';

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = portfolioRepository.getBlogBySlug(slug || '');

  if (!blog || blog.isExternal) {
    return (
      <div className="min-h-screen pt-36 text-center space-y-4 font-sans">
        <h2 className="text-2xl font-display font-bold text-white">Article Not Found</h2>
        <p className="text-text-muted">The internal documentation index could not recognize this slug.</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline bg-surface py-2 px-4 rounded-xl border border-white/5">
          <ArrowLeft className="w-4 h-4" /> Return to Articles
        </Link>
      </div>
    );
  }

  // Generate Table of Contents by parsing markdown headers dynamically
  const tocHeaders = blog.content
    .split('\n')
    .filter(line => line.startsWith('## ') || line.startsWith('### '))
    .map(line => {
      const isSub = line.startsWith('### ');
      const text = line.replace(/^###?\s+/, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { text, id, isSub };
    });

  return (
    <div id="blog-detail-page" className="relative min-h-screen pt-28 pb-20 font-sans">
      
      {/* Decorative background visualizers */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Navigation back */}
        <FadeIn direction="up">
          <Link
            id="back-to-blogs-btn"
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-white transition-colors py-2 px-4 rounded-xl border border-white/5 bg-surface-card"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
        </FadeIn>

        {/* Article header */}
        <div className="space-y-6 max-w-4xl">
          <FadeIn direction="up">
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted font-sans font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" /> {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Hourglass className="w-3.5 h-3.5 text-brand-primary" /> {blog.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl font-display font-extrabold text-white sm:text-4xl md:text-5xl leading-tight pt-2">
              {blog.title}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="flex flex-wrap gap-2 pt-2 border-b border-white/5 pb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 text-xs font-mono text-brand-accent bg-brand-accent/5 border border-brand-accent/10 rounded-full">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Main Content Layout with Sidebar Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Markdown Content (8 Columns) */}
          <div className="lg:col-span-8">
            <FadeIn direction="up" delay={0.25}>
              <div className="glass-panel p-6 sm:p-10 rounded-3xl border-white/5 bg-surface-card shadow-2xl relative">
                
                {/* Header Image */}
                <div className="h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 border border-white/5 bg-surface">
                  <img 
                    src={blog.thumbnail} 
                    alt={blog.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Render via MarkdownRenderer */}
                <MarkdownRenderer content={blog.content} />
              </div>
            </FadeIn>
          </div>

          {/* Sticky Table of Contents Sidebar (4 Columns) */}
          <div className="lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-6">
              
              <FadeIn direction="up" delay={0.3}>
                <div className="glass-panel p-6 rounded-2xl border-white/5 bg-surface-card space-y-4">
                  <h3 className="text-sm font-display font-bold tracking-wider text-white uppercase flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-primary" /> Guide Nav-Index
                  </h3>
                  
                  {tocHeaders.length > 0 ? (
                    <ul className="space-y-3 font-sans text-xs sm:text-sm">
                      {tocHeaders.map((hdr, idx) => (
                        <li 
                          key={idx}
                          className={`${
                            hdr.isSub ? 'pl-4 text-text-muted text-xs' : 'text-white font-medium'
                          } hover:text-brand-primary transition-colors flex items-start gap-1`}
                        >
                          <span className="text-brand-primary/55 select-none pt-0.5">↳</span>
                          <span className="cursor-pointer line-clamp-1 hover:underline">
                            {hdr.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-text-muted">A standard linear checklist covers this article.</p>
                  )}
                </div>
              </FadeIn>

              {/* Action Promo */}
              <FadeIn direction="up" delay={0.4}>
                <div className="p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-surface to-black text-center space-y-4">
                  <Bookmark className="w-5 h-5 text-brand-primary mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Need Custom Engineering?</h4>
                    <p className="text-xs text-text-muted font-sans leading-relaxed">Let&apos;s build durable solutions. Write to Mohamed directly.</p>
                  </div>
                  <Link
                    id="sidebar-blog-contact"
                    to="/contact"
                    className="inline-block w-full py-2 bg-brand-primary text-black font-semibold uppercase tracking-wider text-xs rounded-xl hover:bg-brand-primary/95 transition-all font-sans"
                  >
                    Send Message
                  </Link>
                </div>
              </FadeIn>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default BlogDetail;
