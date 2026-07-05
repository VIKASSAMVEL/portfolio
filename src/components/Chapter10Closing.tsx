import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { resumeData } from '../data/resume';
import { Mail, Phone, Download, Link, Code } from 'lucide-react';

export const Chapter10Closing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shutdownComplete, setShutdownComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
      
      tl.fromTo('.closing-char', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, ease: 'power4.out' }
      )
      .fromTo('.contact-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.resume-btn',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );
    }, containerRef);

    // Simulate system shutdown logs completing after scroll entry
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          setTimeout(() => {
            setShutdownComplete(true);
          }, 1500);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderSplitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        aria-hidden="true" 
        className="closing-char inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col justify-center items-center bg-background px-6 border-t border-white/5 relative overflow-hidden crt-overlay">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/3 to-transparent pointer-events-none" />

      {/* Decorative systems metadata */}
      <div className="absolute top-12 left-6 font-mono text-[8px] text-white/10 select-none">
        SYS_LOGOUT // PROCESS_QUIT_STATE
      </div>
      
      <div className="text-center mb-4 font-mono text-[10px] tracking-widest text-accent/60 uppercase">
        // CONCLUDING_TRANSMISSION
      </div>

      <h2 className="text-4xl md:text-7xl font-display font-black mb-12 text-center text-white tracking-tight uppercase overflow-hidden">
        {renderSplitText("Let's build something")}
      </h2>

      {/* Contact card links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mb-16">
        <a 
          href={`mailto:${resumeData.personal.email}`} 
          className="contact-item border border-white/5 bg-black/30 hover:border-accent/40 p-4 font-mono text-[11px] text-white/80 hover:text-accent transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <Mail size={14} className="text-accent/60 group-hover:text-accent transition-colors" />
            <span>EMAIL</span>
          </div>
          <span className="text-white/30 text-[10px] group-hover:text-accent select-all truncate max-w-[150px]">{resumeData.personal.email}</span>
        </a>

        <a 
          href={`tel:${resumeData.personal.phone}`} 
          className="contact-item border border-white/5 bg-black/30 hover:border-accent/40 p-4 font-mono text-[11px] text-white/80 hover:text-accent transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <Phone size={14} className="text-accent/60 group-hover:text-accent transition-colors" />
            <span>PHONE</span>
          </div>
          <span className="text-white/30 text-[10px] group-hover:text-accent select-all">{resumeData.personal.phone}</span>
        </a>

        <a 
          href={resumeData.personal.linkedin} 
          target="_blank" 
          rel="noreferrer" 
          className="contact-item border border-white/5 bg-black/30 hover:border-accent/40 p-4 font-mono text-[11px] text-white/80 hover:text-accent transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <Link size={14} className="text-accent/60 group-hover:text-accent transition-colors" />
            <span>LINKEDIN</span>
          </div>
          <span className="text-accent font-bold">» CONNECT</span>
        </a>

        <a 
          href={resumeData.personal.github} 
          target="_blank" 
          rel="noreferrer" 
          className="contact-item border border-white/5 bg-black/30 hover:border-accent/40 p-4 font-mono text-[11px] text-white/80 hover:text-accent transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <Code size={14} className="text-accent/60 group-hover:text-accent transition-colors" />
            <span>GITHUB</span>
          </div>
          <span className="text-accent font-bold">» SOURCE</span>
        </a>
      </div>

      {/* Technical Resume download card */}
      <a 
        href="/resume_master.pdf"
        download="S_Vikas_Resume.pdf"
        className="resume-btn select-none cursor-pointer hud-frame-double p-5 bg-black/50 hover:bg-accent/5 hover:border-accent/40 transition-all duration-300 max-w-sm w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-accent/20 bg-accent/5 flex items-center justify-center text-accent">
            <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="text-left font-mono">
            <span className="text-[10px] text-white/40 block leading-none">// FILE_EXPORTER</span>
            <span className="text-sm font-bold text-white leading-none mt-1 block">DOWNLOAD_RESUME.pdf</span>
          </div>
        </div>
        <span className="font-mono text-xs text-accent mr-1 group-hover:translate-x-1 transition-transform">»</span>
      </a>

      {/* Terminal closure metrics */}
      <div className="absolute bottom-8 font-mono text-[9px] text-accent/60 flex items-center gap-2 select-none">
        <span className={`w-1.5 h-1.5 rounded-full ${shutdownComplete ? 'bg-accent' : 'bg-warning animate-pulse'}`} />
        <span>
          {shutdownComplete 
            ? 'SYS_SHUTDOWN // SEQUENCE_TERMINATED_SUCCESSFULLY // OK.' 
            : 'SYS_SHUTDOWN // TERMINATION_SEQUENCE_IN_PROGRESS...'
          }
        </span>
      </div>
    </section>
  );
};
