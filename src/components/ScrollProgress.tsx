import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          if (textRef.current) {
            const percent = Math.round(self.progress * 100);
            textRef.current.innerText = `SYS_BUFF // ${String(percent).padStart(3, '0')}%`;
          }
        }
      }
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="w-full h-1 bg-white/5 relative">
        <div ref={barRef} className="h-full bg-accent origin-left scale-x-0" style={{ boxShadow: '0 0 8px var(--color-accent)' }} />
      </div>
      <div className="absolute top-3 left-6 font-mono text-[10px] tracking-widest text-accent/60 bg-background/50 px-2 py-0.5 border border-white/5 backdrop-blur-xs select-none">
        <span ref={textRef}>SYS_BUFF // 000%</span>
      </div>
    </div>
  );
};
