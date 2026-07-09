import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { orbitSkills } from '../../data/orbitSkills';

interface SkillsOrbitGalaxyProps {
  isMobile: boolean;
}

export const SkillsOrbitGalaxy = ({ isMobile }: SkillsOrbitGalaxyProps) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedSkillIndex((prev) => (prev + 1) % orbitSkills.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const gradientClass = selectedSkillIndex % 4 === 0
    ? 'from-blue-500/25 via-purple-500/15 to-pink-500/25 border-blue-400/20 shadow-blue-500/10'
    : selectedSkillIndex % 4 === 1
      ? 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25 border-emerald-400/20 shadow-emerald-500/10'
      : selectedSkillIndex % 4 === 2
        ? 'from-orange-500/25 via-amber-500/15 to-red-500/25 border-orange-400/20 shadow-orange-500/10'
        : 'from-indigo-500/25 via-violet-500/15 to-fuchsia-500/25 border-indigo-400/20 shadow-indigo-500/10';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      {/* Left Column: Floating Orbital Arena (6 Columns) */}
      <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] md:min-h-[500px] lg:min-h-[540px]">

        {/* Outer Orbit Dotted Rings matching expanded/responsive radius */}
        <div className={`absolute rounded-full border border-dashed border-white/10 animate-[spin_50s_linear_infinite] ${isMobile ? 'w-[230px] h-[230px]' : 'w-[350px] h-[350px]'}`} />
        <div className={`absolute rounded-full border border-dashed border-white/5 animate-[spin_80s_linear_infinite_reverse] ${isMobile ? 'w-[290px] h-[290px]' : 'w-[420px] h-[420px]'}`} />

        {/* Central Sun Node */}
        <div className={`absolute rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-[#8b5cf6]/20 border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl relative z-10 hover:border-[#38bdf8]/40 transition-all duration-500 glow-blue group cursor-pointer select-none backdrop-blur-md ${isMobile ? 'w-24 h-24' : 'w-36 h-36'}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38bdf8]/10 to-[#8b5cf6]/10 animate-[spin_10s_linear_infinite] opacity-50" />
          <span className={`font-mono text-[#38bdf8] uppercase tracking-widest font-extrabold relative z-10 ${isMobile ? 'text-[7px]' : 'text-[10px]'}`}>IRSATH KAREEM</span>
          <span className={`font-display font-black text-white tracking-wider relative z-10 uppercase mt-0.5 ${isMobile ? 'text-[10px]' : 'text-sm'}`}>TECH CORE</span>
          <div className="flex items-center gap-1 mt-0.5 relative z-10">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
            <span className={`font-mono text-green-400 font-bold uppercase tracking-widest ${isMobile ? 'text-[7px]' : 'text-[9px]'}`}>ACTIVE</span>
          </div>
        </div>

        {/* Floating Orbiting Nodes */}
        {orbitSkills.map((skill, idx) => {
          const angle = (idx / orbitSkills.length) * 2 * Math.PI - Math.PI / 2; // offset starting point
          const radius = isMobile ? 115 : 175; // responsive orbit radius
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isSelected = selectedSkillIndex === idx;

          return (
            <motion.button
              key={skill.name}
              id={`floating-skill-node-${idx}`}
              onClick={() => setSelectedSkillIndex(idx)}
              className={`absolute rounded-full border flex items-center justify-center transition-all duration-300 group ${isMobile ? 'w-14 h-14' : 'w-20 h-20'} ${isSelected
                ? `bg-gradient-to-br scale-110 z-20 ${idx % 4 === 0
                  ? 'from-blue-500/25 to-pink-500/25 border-blue-400 shadow-lg shadow-blue-500/30'
                  : idx % 4 === 1
                    ? 'from-emerald-500/25 to-cyan-500/25 border-emerald-400 shadow-lg shadow-emerald-500/30'
                    : idx % 4 === 2
                      ? 'from-orange-500/25 to-red-500/25 border-orange-400 shadow-lg shadow-orange-500/30'
                      : 'from-indigo-500/25 to-fuchsia-500/25 border-indigo-400 shadow-lg shadow-indigo-500/30'
                }`
                : `bg-black/80 border-white/10 hover:scale-[1.08] z-10 ${idx % 4 === 0
                  ? 'hover:border-blue-400'
                  : idx % 4 === 1
                    ? 'hover:border-emerald-400'
                    : idx % 4 === 2
                      ? 'hover:border-orange-400'
                      : 'hover:border-indigo-400'
                }`
                }`}
              style={{ left: `calc(50% + ${x}px - ${isMobile ? 28 : 40}px)`, top: `calc(50% + ${y}px - ${isMobile ? 28 : 40}px)` }}
              animate={{
                x: [0, (idx % 2 === 0 ? 5 : -5), (idx % 3 === 0 ? -4 : 4), 0],
                y: [0, (idx % 2 === 0 ? -6 : 6), (idx % 3 === 0 ? 4 : -4), 0],
              }}
              transition={{
                duration: 6 + (idx % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {skill.iconSvg ? (
                skill.iconSvg(isMobile ? 'w-8 h-8' : 'w-12 h-12')
              ) : (
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className={`object-contain filter brightness-110 ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`}
                />
              )}

              {/* Tiny visual connecting line */}
              <div className={`absolute w-[1.5px] bg-gradient-to-b from-transparent to-white/10 hidden lg:block origin-bottom pointer-events-none transition-opacity ${isSelected ? 'opacity-30' : 'opacity-10'
                }`}
                style={{
                  height: `${radius}px`,
                  bottom: '50%',
                  transform: `rotate(${-angle * (180 / Math.PI) + 90}deg)`
                }} />

              {/* Tooltip on Hover */}
              <span className="absolute bottom-full mb-2 bg-slate-950 text-white text-[10px] font-mono px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none select-none z-30 shadow-xl">
                {skill.name}
              </span>
            </motion.button>
          );
        })}

      </div>

      {/* Right Column: Detailed Skill Metrics Showcase (6 Columns) */}
      <div className="lg:col-span-6 space-y-6">
        <div className={`glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden min-h-[360px] flex flex-col justify-between border bg-gradient-to-br transition-all duration-500 ${gradientClass}`}>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  {orbitSkills[selectedSkillIndex].iconSvg ? (
                    orbitSkills[selectedSkillIndex].iconSvg('w-5 h-5 object-contain')
                  ) : (
                    <img
                      src={orbitSkills[selectedSkillIndex].imageUrl}
                      className="w-5 h-5 object-contain"
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold tracking-widest block">
                    {orbitSkills[selectedSkillIndex].tag}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {orbitSkills[selectedSkillIndex].name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#94a3b8] leading-relaxed min-h-[64px]">
              {orbitSkills[selectedSkillIndex].longDesc}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-white/50 block">Associated Architecture &amp; Concepts</span>
              <div className="flex flex-wrap gap-2">
                {orbitSkills[selectedSkillIndex].concepts.map(concept => (
                  <span key={concept} className="text-xs px-2.5 py-1 rounded bg-[#050816]/60 border border-white/5 text-white/80">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dot Carousel Navigation */}
          <div className="flex justify-center gap-2 pt-4 border-t border-white/5 z-20">
            {orbitSkills.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSkillIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedSkillIndex === idx ? 'bg-brand-primary w-5' : 'bg-white/20 hover:bg-white/40'
                  }`}
                aria-label={`Go to skill slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Click instruction */}
        <p className="text-center lg:text-left text-xs text-[#94a3b8]/60 font-mono">
          💡 Tip: Click on any hovering icon in the technology orbit to explore.
        </p>
      </div>

    </div>
  );
};
export default SkillsOrbitGalaxy;
