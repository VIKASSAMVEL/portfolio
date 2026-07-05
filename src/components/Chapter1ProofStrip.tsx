import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { resumeData } from '../data/resume';

const ScrambledText: React.FC<{ text: string; active: boolean }> = ({ text, active }) => {
  const [display, setDisplay] = useState('');
  const chars = '01XYZ#@$%&*+=_';
  
  useEffect(() => {
    if (!active) {
      setDisplay('');
      return;
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 0.5; // resolution speed
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, active]);

  return <span>{display || text}</span>;
};

export const Chapter1ProofStrip: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.proof-item');
      
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
            onToggle: (self) => {
              if (self.isActive) setIsActive(true);
            }
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (idx: number) => {
    if (idx === 0) return 'text-accent'; // CGPA - Blue/Cyan
    if (idx === 2) return 'text-emerald-400'; // Hackathon - Active Green
    if (idx === 4) return 'text-warning'; // Patent - Alert Red/Orange
    return 'text-white/60';
  };

  const getStatusCode = (idx: number) => {
    if (idx === 0) return 'ACC_SYS: EXCELLENT';
    if (idx === 1) return 'RNK_VAL: TOP_TIER';
    if (idx === 2) return 'HAC_EVT: CHAMPION';
    if (idx === 3) return 'PER_ACC: ELITE_5%';
    return 'PAT_REG: 2_PENDING';
  };

  return (
    <section ref={sectionRef} className="min-h-[60vh] w-full flex flex-col justify-center items-center bg-background px-6 py-24 border-t border-white/5 relative overflow-hidden">
      {/* Visual background lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 z-10">
        {resumeData.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="proof-item hud-frame-double bg-black/30 p-6 flex flex-col justify-between h-44 select-none hover:border-accent/40 transition-colors duration-300"
          >
            {/* Top diagnostic line */}
            <div className="flex items-center justify-between font-mono text-[8px] tracking-widest text-white/30">
              <span>STAT_ID: 0{idx + 1}</span>
              <span className={`flex items-center gap-1.5 ${getStatusColor(idx)}`}>
                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                {getStatusCode(idx)}
              </span>
            </div>

            {/* Main statistical data display */}
            <div className="my-auto py-2">
              <span className="text-3xl md:text-4xl font-display font-black text-white tracking-tight block">
                <ScrambledText text={stat.value} active={isActive} />
              </span>
            </div>

            {/* Label details */}
            <div>
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">
                {stat.label}
              </span>
              {stat.context && (
                <span className="text-[9px] font-mono text-white/30 block mt-0.5 truncate">
                  // {stat.context}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
