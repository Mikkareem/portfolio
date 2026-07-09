import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Code2, Smartphone, Cpu } from 'lucide-react';
import { portfolioRepository } from '../../data/repositories/portfolioRepository';
import { FadeIn } from '../animations/FadeIn';

export const TerminalSimulation = () => {
  const profile = portfolioRepository.getProfile();
  const [termText1, setTermText1] = useState('');
  const [termText2, setTermText2] = useState('');
  const [termStep, setTermStep] = useState(0);

  useEffect(() => {
    const cmd1 = 'IrsathKareem.init()';
    const cmd2 = 'IrsathKareem.getStats()';

    if (termStep === 0) {
      let idx = 0;
      const interval = setInterval(() => {
        setTermText1(cmd1.substring(0, idx + 1));
        idx++;
        if (idx >= cmd1.length) {
          clearInterval(interval);
          setTimeout(() => setTermStep(1), 600);
        }
      }, 70);
      return () => clearInterval(interval);
    } else if (termStep === 1) {
      const timer = setTimeout(() => {
        setTermStep(2);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (termStep === 2) {
      let idx = 0;
      const interval = setInterval(() => {
        setTermText2(cmd2.substring(0, idx + 1));
        idx++;
        if (idx >= cmd2.length) {
          clearInterval(interval);
          setTimeout(() => setTermStep(3), 600);
        }
      }, 70);
      return () => clearInterval(interval);
    } else if (termStep === 3) {
      // Loop simulator: restart after 8 seconds
      const timer = setTimeout(() => {
        setTermText1('');
        setTermText2('');
        setTermStep(0);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [termStep]);

  return (
    <div className="lg:col-span-5 relative mt-6 lg:mt-0">
      <FadeIn direction="left" delay={0.4} scale={true}>
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative border-white/10 bg-surface-card glow-secondary">

          {/* Simulated terminal */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-[#64748b] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> bash
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm space-y-4 text-left leading-relaxed min-h-[160px] text-text-muted">
            <p>
              <span className="text-brand-primary">&gt;</span> {termText1}
              {termStep === 0 && <span className="animate-pulse">_</span>}
            </p>

            {termStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-brand-accent">
                  &quot;Deploying cloud native instances...&quot;
                </p>
                <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-2">
                  <p className="text-green-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Web Layer: Active (ReactJS/Vite)
                  </p>
                  <p className="text-green-400 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Mobile Layer: Active (KMP/Compose)
                  </p>
                  <p className="text-brand-primary flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Infra Mesh: Up (EKS/Docker)
                  </p>
                </div>
              </motion.div>
            )}

            {termStep >= 2 && (
              <p>
                <span className="text-brand-primary">&gt;</span> {termText2}
                {termStep === 2 && <span className="animate-pulse">_</span>}
              </p>
            )}

            {termStep >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white"
              >
                &#123; experience: &quot;{profile.yearsExperience}+ Years&quot;, projects: {profile.projectsBuiltCount} &#125;
              </motion.p>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
export default TerminalSimulation;
