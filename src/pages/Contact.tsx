import { Mail, Send } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn } from '../components/animations/FadeIn';

export const Contact = () => {
  const profile = portfolioRepository.getProfile();

  return (
    <div id="contact-page" className="relative min-h-screen pt-28 pb-20 font-sans">

      {/* Background decorations */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Header Segment */}
        <div className="max-w-3xl space-y-4">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase font-display">GET IN TOUCH</span>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">Commence <span className="text-gradient">Dialogue</span></h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-lg text-text-muted leading-relaxed">
              Have a complex architectural project in pipeline, looking to deploy cross-platform systems, or simply want to chat? Write an email directly to me.
            </p>
          </FadeIn>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">

          {/* Info cards (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-xl font-display font-bold text-white">Contact Handles</h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="glass-panel p-6 rounded-2xl border-white/5 bg-surface-card space-y-6">

                {/* Email Direct link */}
                <a
                  id="direct-email-card"
                  href={`mailto:${profile.socials.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-brand-primary/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <img
                    src="https://www.svgrepo.com/show/353812/google-gmail.svg"
                    className="w-8 h-8 object-contain shrink-0"
                    alt="Email"
                  />
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Direct Email</h3>
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-brand-primary transition-colors">{profile.socials.email}</p>
                  </div>
                </a>

                {/* GitHub link */}
                {/* GitHub link */}
                <a
                  id="social-github-contact"
                  href={profile.socials.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-brand-primary/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <svg fill="#ea48dc" className="w-8 h-8 shrink-0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24.00 24.00" xmlSpace="preserve" stroke="#ea48dc" strokeWidth={0.00024}><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth={0.048}></g><g id="SVGRepo_iconCarrier"> <g id="social-github"> <path d="M22.4,6c-1.1-1.8-2.5-3.3-4.4-4.4C16.2,0.5,14.2,0,12,0C9.8,0,7.8,0.5,6,1.6C4.1,2.7,2.7,4.1,1.6,6C0.5,7.8,0,9.8,0,12 c0,2.6,0.8,5,2.3,7.1c1.5,2.1,3.5,3.5,5.9,4.3c0.3,0.1,0.5,0,0.6-0.1C9,23.2,9,23,9,22.8c0,0,0-0.3,0-0.8c0-0.5,0-1,0-1.4l-0.4,0.1 c-0.2,0-0.5,0.1-0.9,0.1c-0.3,0-0.7,0-1.1-0.1c-0.4-0.1-0.7-0.2-1-0.5c-0.3-0.2-0.6-0.6-0.7-1l-0.2-0.4c-0.1-0.2-0.3-0.5-0.5-0.8 c-0.2-0.3-0.5-0.5-0.7-0.6l-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2c0.1,0,0.2-0.1,0.5-0.1 l0.3,0c0.2,0,0.5,0.2,0.8,0.4c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.5,0.8,0.9,1c0.3,0.2,0.7,0.3,1,0.3c0.3,0,0.6,0,0.9-0.1 C8.6,19.1,8.8,19,9,18.9c0.1-0.7,0.3-1.2,0.8-1.6c-0.6-0.1-1.1-0.2-1.6-0.3c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.6-1.3-1 c-0.3-0.4-0.6-1-0.8-1.6c-0.2-0.7-0.3-1.5-0.3-2.3c0-1.3,0.4-2.3,1.2-3.2C5.2,7.2,5.2,6.1,5.7,5C6,4.9,6.4,4.9,7,5.2 c0.6,0.2,1,0.4,1.3,0.6C8.6,5.9,8.8,6.1,9,6.2c1-0.3,2-0.4,3-0.4s2,0.1,3,0.4l0.6-0.4C16,5.6,16.5,5.3,17,5.1 c0.6-0.2,1-0.3,1.3-0.2c0.5,1.2,0.5,2.2,0.1,3.2c0.8,0.9,1.2,2,1.2,3.2c0,0.9-0.1,1.7-0.3,2.4c-0.2,0.7-0.5,1.2-0.8,1.6 c-0.3,0.4-0.8,0.8-1.3,1c-0.5,0.3-1,0.5-1.5,0.6c-0.5,0.1-1,0.2-1.6,0.3c0.5,0.5,0.8,1.2,0.8,2.2v3.3c0,0.2,0.1,0.3,0.2,0.5 c0.1,0.1,0.3,0.2,0.6,0.1c2.4-0.8,4.4-2.2,5.9-4.3C23.2,17,24,14.6,24,12C24,9.8,23.5,7.8,22.4,6z"></path> </g> </g></svg>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Github (Personal)</h3>
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-brand-primary transition-colors">Mikkareem</p>
                  </div>
                </a>

                {/* GitHub Org link */}
                <a
                  id="social-github-org-contact"
                  href="https://github.com/Techullurgy"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-brand-primary/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <svg fill="#ea48dc" className="w-8 h-8 shrink-0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24.00 24.00" xmlSpace="preserve" stroke="#ea48dc" strokeWidth={0.00024}><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth={0.048}></g><g id="SVGRepo_iconCarrier"> <g id="social-github"> <path d="M22.4,6c-1.1-1.8-2.5-3.3-4.4-4.4C16.2,0.5,14.2,0,12,0C9.8,0,7.8,0.5,6,1.6C4.1,2.7,2.7,4.1,1.6,6C0.5,7.8,0,9.8,0,12 c0,2.6,0.8,5,2.3,7.1c1.5,2.1,3.5,3.5,5.9,4.3c0.3,0.1,0.5,0,0.6-0.1C9,23.2,9,23,9,22.8c0,0,0-0.3,0-0.8c0-0.5,0-1,0-1.4l-0.4,0.1 c-0.2,0-0.5,0.1-0.9,0.1c-0.3,0-0.7,0-1.1-0.1c-0.4-0.1-0.7-0.2-1-0.5c-0.3-0.2-0.6-0.6-0.7-1l-0.2-0.4c-0.1-0.2-0.3-0.5-0.5-0.8 c-0.2-0.3-0.5-0.5-0.7-0.6l-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2c0.1,0,0.2-0.1,0.5-0.1 l0.3,0c0.2,0,0.5,0.2,0.8,0.4c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.5,0.8,0.9,1c0.3,0.2,0.7,0.3,1,0.3c0.3,0,0.6,0,0.9-0.1 C8.6,19.1,8.8,19,9,18.9c0.1-0.7,0.3-1.2,0.8-1.6c-0.6-0.1-1.1-0.2-1.6-0.3c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.6-1.3-1 c-0.3-0.4-0.6-1-0.8-1.6c-0.2-0.7-0.3-1.5-0.3-2.3c0-1.3,0.4-2.3,1.2-3.2C5.2,7.2,5.2,6.1,5.7,5C6,4.9,6.4,4.9,7,5.2 c0.6,0.2,1,0.4,1.3,0.6C8.6,5.9,8.8,6.1,9,6.2c1-0.3,2-0.4,3-0.4s2,0.1,3,0.4l0.6-0.4C16,5.6,16.5,5.3,17,5.1 c0.6-0.2,1-0.3,1.3-0.2c0.5,1.2,0.5,2.2,0.1,3.2c0.8,0.9,1.2,2,1.2,3.2c0,0.9-0.1,1.7-0.3,2.4c-0.2,0.7-0.5,1.2-0.8,1.6 c-0.3,0.4-0.8,0.8-1.3,1c-0.5,0.3-1,0.5-1.5,0.6c-0.5,0.1-1,0.2-1.6,0.3c0.5,0.5,0.8,1.2,0.8,2.2v3.3c0,0.2,0.1,0.3,0.2,0.5 c0.1,0.1,0.3,0.2,0.6,0.1c2.4-0.8,4.4-2.2,5.9-4.3C23.2,17,24,14.6,24,12C24,9.8,23.5,7.8,22.4,6z"></path> </g> </g></svg>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Github Organization</h3>
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-brand-primary transition-colors">Techullurgy</p>
                  </div>
                </a>

                {/* LinkedIn Link */}
                <a
                  id="social-linkedin-contact"
                  href={profile.socials.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-brand-primary/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <img
                    src="https://www.svgrepo.com/show/448234/linkedin.svg"
                    className="w-8 h-8 object-contain shrink-0"
                    alt="LinkedIn"
                  />
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">LinkedIn Profile</h3>
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-brand-primary transition-colors">mikkareem</p>
                  </div>
                </a>

                {/* Medium Pub link */}
                <a
                  id="social-medium-contact"
                  href={profile.socials.medium}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-brand-primary/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ea48dc"><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12C13 15.3137 10.3137 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C10.3137 6 13 8.68629 13 12Z" fill="#ea48dc"></path> <path d="M23 12C23 14.7614 22.5523 17 22 17C21.4477 17 21 14.7614 21 12C21 9.23858 21.4477 7 22 7C22.5523 7 23 9.23858 23 12Z" fill="#ea48dc"></path> <path d="M17 18C18.6569 18 20 15.3137 20 12C20 8.68629 18.6569 6 17 6C15.3431 6 14 8.68629 14 12C14 15.3137 15.3431 18 17 18Z" fill="#ea48dc"></path> </g></svg>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Medium Blogs</h3>
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-brand-primary transition-colors">{profile.socials.medium.split('medium.com/')[1] || '@irsathkareem'}</p>
                  </div>
                </a>

              </div>
            </FadeIn>
          </div>

          {/* Email Call-To-Action (8 Columns) */}
          <div className="lg:col-span-8">
            <FadeIn direction="left" delay={0.15}>
              <div className="glass-panel p-8 sm:p-12 rounded-3xl border-white/5 bg-surface-card shadow-2xl relative min-h-[380px] flex flex-col justify-center items-center text-center space-y-8 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-brand-accent/10 border-brand-primary/20 hover:border-brand-primary/35 transition-all duration-300">
                <div className="p-4 rounded-full bg-brand-primary/15 text-brand-primary animate-pulse">
                  <Mail className="w-10 h-10" />
                </div>

                <div className="space-y-3 max-w-lg">
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide uppercase">START A CONVERSATION</h3>
                  <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed font-sans">
                    I am always open to discussing new architectures, full stack developments, or sharing ideas. Click below to launch your email client.
                  </p>
                </div>

                <a
                  id="mailto-direct-cta"
                  href={`mailto:${profile.socials.email}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#050816] font-bold rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-sans shadow-lg shadow-[#38bdf8]/20 glow-blue text-base tracking-wide uppercase"
                >
                  <Send className="w-5 h-5" />
                  <span>Write Email</span>
                </a>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </div>
  );
};
export default Contact;
