import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectChapterProps {
  project: {
    id: string;
    title: string;
    tagline: string;
    techStack: string[];
    engineeringNotes: string[];
    link?: string;
    architectureNodes?: string[];
  };
}

export const ProjectChapter: React.FC<ProjectChapterProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
        }
      });

      // Oversized background title enters, then fades out as content comes up
      tl.fromTo(titleRef.current,
        { scale: 1.3, opacity: 0, y: 50 },
        { scale: 1, opacity: 0.15, y: 0, duration: 1, ease: 'power2.out' }
      )
        .to(titleRef.current, { scale: 0.9, opacity: 0.02, y: -40, duration: 1, ease: 'power2.inOut' })
        // Content reveals
        .fromTo(contentRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '<0.4'
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex flex-col justify-center bg-background px-6 overflow-hidden border-t border-white/5">
      {/* Absolute layout grid details */}
      <div className="absolute top-4 left-6 font-mono text-[8px] text-white/10 select-none">
        NODE_VAL // ID: {project.id.toUpperCase()}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 ref={titleRef} className="text-6xl md:text-9xl font-display font-black text-center whitespace-nowrap text-white mix-blend-overlay">
          {project.title.toUpperCase()}
        </h2>
      </div>

      <div ref={contentRef} className="max-w-5xl mx-auto w-full z-10 hud-frame-double bg-black/40 p-6 md:p-10 border border-white/5 select-none relative">
        {/* Aesthetic technical lines */}
        <div className="absolute top-0 right-10 w-[1px] h-3 bg-accent" />
        <div className="absolute bottom-0 left-10 w-[1px] h-3 bg-accent" />

        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent tracking-widest uppercase">
                // ACTIVE_DEPLOYMENT
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-none">{project.title}</h3>
              <p className="text-sm md:text-base text-white/60 font-mono italic mt-1">{project.tagline}</p>
            </div>
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="font-mono text-xs text-accent hover:text-white border border-accent/30 hover:border-accent bg-accent/5 px-4 py-2 transition-all duration-300 w-fit flex items-center gap-2"
              >
                [ VIEW_LIVE_DEPLOYMENT ]
                <span className="text-accent">→</span>
              </a>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-white/5 text-white/80 font-mono text-[11px] border border-white/10 hover:border-accent/40 transition-colors select-none">
                {tech}
              </span>
            ))}
          </div>

          {/* Details split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <h4 className="text-xs uppercase tracking-widest text-accent mb-4 font-mono font-bold flex items-center gap-2">
                <span className="w-1 h-1 bg-accent animate-pulse" />
                SYSTEMS DIAGNOSTICS LOG
              </h4>
              <ul className="space-y-4 font-mono text-[13px] text-white/80">
                {project.engineeringNotes.map((note, idx) => (
                  <li key={idx} className="flex gap-3 items-start border-l border-white/10 pl-3 py-0.5 hover:border-accent transition-colors">
                    <span className="text-accent text-[10px] tracking-wider select-none shrink-0">[LOG_0{idx + 1}]</span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.architectureNodes && (
              <div className="md:col-span-5 flex flex-col justify-center bg-white/[0.01] border border-white/5 p-4 relative">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent/20" />
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-mono text-center md:text-left">
                  PIPELINE_ROUTE:
                </h4>
                <ArchitectureDiagram nodes={project.architectureNodes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
