import React from 'react';

interface ArchitectureDiagramProps {
  nodes: string[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ nodes }) => {
  return (
    <div className="flex flex-col items-stretch justify-center gap-4 py-4 w-full max-w-md mx-auto">
      {nodes.map((node, idx) => (
        <React.Fragment key={idx}>
          {/* Node Wrapper */}
          <div className="relative border border-white/10 bg-black/40 px-4 py-3 select-none flex items-center justify-between hover:border-accent/40 transition-colors duration-300">
            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
              <span className="font-mono text-[11px] text-white/90">{node}</span>
            </div>
            
            {/* Metadata code */}
            <span className="font-mono text-[8px] text-white/20">
              SYS_NODE_0{idx + 1}
            </span>
          </div>
          
          {/* Animated Connecting Line */}
          {idx < nodes.length - 1 && (
            <div className="flex justify-center items-center h-8 relative select-none">
              {/* Vertical connector line */}
              <div className="w-[1px] h-full bg-white/10 relative">
                {/* Traveling data particle */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-[2px] h-4 bg-accent"
                  style={{
                    animation: 'data-travel 2.5s infinite linear',
                    animationDelay: `${idx * 0.6}s`
                  }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Embedded inline keyframes for GPU-accelerated animations */}
      <style>{`
        @keyframes data-travel {
          0% {
            top: 0%;
            opacity: 0;
            height: 4px;
          }
          15% {
            opacity: 1;
            height: 12px;
          }
          85% {
            opacity: 1;
            height: 12px;
          }
          100% {
            top: 100%;
            opacity: 0;
            height: 4px;
          }
        }
      `}</style>
    </div>
  );
};
