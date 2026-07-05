import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitTextCustom } from './SplitTextCustom';
import { resumeData } from '../data/resume';

export const Chapter0Opening: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootSequence = [
      'SYS_INIT // BOOT_LOADER_ACTIVE',
      'SYS_LOAD // LOADING COGNITIVE AGENTS...',
      'SYS_OK   // FAISS VECTOR STORAGE CONNECTED',
      'SYS_OK   // SECURE SOCKET ROUTING ENGAGED',
      'SYS_OK   // YOLOv8 CORE VISION PIPELINE ENGINE ONLINE',
      'SYS_OK   // WEBCRYPTO RSA/AES TUNNELS ESTABLISHED',
      'SYS_READY // WELCOME PROTOCOL LOADED'
    ];

    // Simulate boot logs typing out sequentially
    bootSequence.forEach((log, index) => {
      const timeoutId = setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, index * 250);
      return () => clearTimeout(timeoutId);
    });

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.char');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          scrub: 1
        }
      });
      
      // Intro animation on load
      gsap.fromTo(chars, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, ease: 'power4.out', delay: 0.4 }
      );
      
      gsap.fromTo('.tagline-hud',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      gsap.fromTo('.boot-terminal',
        { opacity: 0, x: -20 },
        { opacity: 0.7, x: 0, duration: 0.5, delay: 0.1 }
      );

      gsap.fromTo('.scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2 }
      );

      // Scroll animations (fade elements out as scroll triggers)
      tl.to(chars, { y: -80, opacity: 0, stagger: 0.01, duration: 1, ease: 'power2.in' }, 0)
        .to('.tagline-hud', { opacity: 0, y: -20, duration: 0.6 }, 0)
        .to('.boot-terminal', { opacity: 0, y: -40, duration: 0.5 }, 0)
        .to('.scroll-cue', { opacity: 0, duration: 0.2 }, 0);

      // Mouse-move reactive background warp
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(gridRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col justify-center items-center bg-background px-6 relative overflow-hidden crt-overlay">
      {/* HUD background grid */}
      <svg ref={gridRef} className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] opacity-10 pointer-events-none select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" className="text-accent/30" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="1" className="fill-accent/50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Simulated system coordinate overlays */}
      <div className="absolute top-16 left-6 font-mono text-[8px] tracking-widest text-white/20 select-none hidden md:block">
        GRID_COORD: 13°04'52"N 80°14'48"E // ALT_STAB: 12.5m
      </div>

      <div className="absolute top-16 right-6 font-mono text-[8px] tracking-widest text-white/20 select-none hidden md:block">
        SYS_VER: v6.12 // SECURE_RUN
      </div>

      {/* Boot terminal logs in top-left */}
      <div className="boot-terminal absolute bottom-16 left-6 max-w-xs md:max-w-md font-mono text-[9px] text-accent/80 space-y-1 bg-black/40 p-3 border border-white/5 backdrop-blur-xs select-none pointer-events-none hidden md:block">
        <div className="text-white/40 border-b border-white/10 pb-1 mb-1.5 flex items-center justify-between">
          <span>SYSTEM_DIAGNOSTICS</span>
          <span className="w-1 h-1 bg-accent animate-pulse" />
        </div>
        {logs.map((log, index) => (
          <div key={index} className={log.includes('SYS_READY') ? 'text-accent' : 'text-accent/70'}>
            &gt; {log}
          </div>
        ))}
        {logs.length < 7 && <div className="terminal-cursor text-accent/40">&gt; PROCESSING...</div>}
      </div>

      {/* Name Display */}
      <h1 className="text-6xl md:text-[10vw] font-display font-black mb-6 overflow-hidden z-10 text-center tracking-tighter text-white">
        <SplitTextCustom text={resumeData.personal.name} />
      </h1>
      
      {/* Tagline wrapped in HUD brackets */}
      <div className="tagline-hud z-10 flex flex-col items-center gap-2 max-w-4xl px-4 text-center">
        <div className="text-xs font-mono text-accent uppercase tracking-widest mb-1 select-none">
          [ DEPLOYED_AGENT: FULL_STACK ]
        </div>
        <p className="text-lg md:text-2xl text-foreground/80 font-mono leading-snug border-x border-accent/20 px-6 py-2">
          {resumeData.personal.tagline}
        </p>
      </div>
      
      {/* Dynamic Scroll Cue */}
      <div className="scroll-cue absolute bottom-8 flex flex-col items-center gap-2 text-accent font-mono text-[10px] tracking-widest z-10 select-none">
        <span className="animate-pulse">SCROLL_DOWN</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};
