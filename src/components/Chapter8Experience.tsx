import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { resumeData } from '../data/resume';

export const Chapter8Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');

      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCompanyId = (company: string) => {
    return company.toUpperCase().replace(/\s+/g, '_');
  };

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center bg-background px-6 py-24 border-t border-white/5 relative overflow-hidden">
      {/* Decorative vertical coordinates overlay */}
      <div className="absolute right-6 top-24 font-mono text-[8px] text-white/10 tracking-widest uppercase writing-mode-vertical select-none hidden md:block" style={{ writingMode: 'vertical-rl' }}>
        SEC_FLOW // TIME_SERIES_MARKER // 2024_2026
      </div>

      <div className="max-w-4xl mx-auto w-full z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-mono text-accent tracking-widest uppercase mb-2">
            // CAREER_DEPLOYMENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white text-center tracking-tight uppercase">
            System Deployment Timeline
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-8 ml-4 space-y-12">
          {/* Animated timeline background pulse */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent/20 pointer-events-none" />

          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="timeline-item relative group">
              {/* Timeline square HUD dot */}
              <div className="absolute -left-[37px] top-2 w-2.5 h-2.5 bg-background border border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <div className="w-1 h-1 bg-accent/40 group-hover:bg-background" />
              </div>

              <div className="hud-frame-double bg-black/40 p-6 border border-white/5 select-none relative hover:border-accent/40 transition-colors duration-300">
                {/* Floating corner label */}
                <div className="absolute top-2 right-4 font-mono text-[8px] text-white/20 select-none">
                  DEPLOY_NODE: {getCompanyId(exp.company)}
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs font-mono text-accent bg-accent/5 px-2 py-0.5 border border-accent/20">
                      {exp.period.toUpperCase().replace(/\s*–\s*/g, ' // ')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white tracking-tight leading-none mt-1">
                    {exp.role}
                  </h3>
                  
                  <h4 className="text-sm font-mono text-white/50 leading-none">
                    &gt; {exp.company}
                  </h4>

                  <p className="text-sm text-white/70 leading-relaxed max-w-2xl mt-2 border-l border-white/5 pl-3 font-mono">
                    {exp.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
