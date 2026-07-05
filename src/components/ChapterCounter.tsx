import React from 'react';

interface ChapterCounterProps {
  current: number;
  total: number;
}

export const ChapterCounter: React.FC<ChapterCounterProps> = ({ current, total }) => {
  const getModeLabel = (idx: number) => {
    if (idx === 0) return 'INIT_BOOT';
    if (idx === 1) return 'SYS_VERIFY';
    if (idx >= 2 && idx <= 7) return `NODE_ENG_0${idx - 1}`;
    if (idx === 8) return 'DEPLOY_LOGS';
    if (idx === 9) return 'CLI_SHELL';
    return 'SYS_CLOSED';
  };

  return (
    <div className="fixed top-3 right-6 z-50 font-mono text-[10px] tracking-widest text-accent/60 bg-background/50 px-3 py-1 border border-white/5 backdrop-blur-xs select-none flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
        <span>SYS_STATUS: {getModeLabel(current)}</span>
      </div>
      <div className="text-white/10">|</div>
      <div>
        LOC: {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};
