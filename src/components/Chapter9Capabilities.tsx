import React, { useEffect, useRef, useState } from 'react';
import { resumeData } from '../data/resume';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'system' | 'error';
}

export const Chapter9Capabilities: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'SYS_SHELL_INITIALIZED // CONSOLE_MODE_ACTIVE', type: 'system' },
    { text: 'Type "help" for a list of valid commands or use quick-links below.', type: 'output' },
    { text: 'skills', type: 'input' }
  ]);

  // Initial load outputs the skills command content
  useEffect(() => {
    executeSkillsCommand(false);
  }, []);

  useEffect(() => {
    // Scroll to bottom of terminal when logs change
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const executeSkillsCommand = (addInputLog = true) => {
    const newLogs: LogLine[] = [];
    if (addInputLog) {
      newLogs.push({ text: 'skills', type: 'input' });
    }

    resumeData.capabilities.forEach(cap => {
      newLogs.push({ text: `\n[ CATEGORY: ${cap.category.toUpperCase()} ]`, type: 'system' });
      newLogs.push({ text: `» ${cap.skills.join(' | ')}`, type: 'output' });
    });

    setHistory(prev => [...prev, ...newLogs]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    setInputValue('');
    const newHistory = [...history, { text: cmd, type: 'input' as const }];

    if (cmd === 'help') {
      newHistory.push(
        { text: 'AVAILABLE STACK DIAGNOSTICS COMMANDS:', type: 'system' },
        { text: '  skills    - Load entire capability grid matrix', type: 'output' },
        { text: '  diagnose  - Run detailed engineering proficiency check', type: 'output' },
        { text: '  clear     - Wipe shell logs', type: 'output' },
        { text: '  help      - Print current options list', type: 'output' }
      );
      setHistory(newHistory);
    } else if (cmd === 'skills') {
      setHistory(newHistory);
      executeSkillsCommand(false);
    } else if (cmd === 'diagnose') {
      newHistory.push(
        { text: 'RUNNING CORE STACK PROFILES...', type: 'system' },
        { text: '  TypeScript  [ ██████████████████░░ ] 90% // SECURE', type: 'output' },
        { text: '  React.js    [ ██████████████████░░ ] 90% // ACTIVE', type: 'output' },
        { text: '  Next.js     [ ████████████████░░░░ ] 80% // ACTIVE', type: 'output' },
        { text: '  Python      [ ██████████████████░░ ] 90% // COGNITIVE', type: 'output' },
        { text: '  PostgreSQL  [ ████████████████░░░░ ] 80% // STATE_OK', type: 'output' },
        { text: '  Docker      [ ████████████░░░░░░░░ ] 60% // HOST_READY', type: 'output' },
        { text: 'DIAGNOSTICS SEQUENCE LOGS FINISHED. PIPELINES NORMAL.', type: 'system' }
      );
      setHistory(newHistory);
    } else if (cmd === 'clear') {
      setHistory([{ text: 'SYS_SHELL_RESET // CONSOLE_MODE_ACTIVE', type: 'system' }]);
    } else {
      newHistory.push({ text: `Error: Command "${cmd}" unrecognized by shell. Type "help" for syntax.`, type: 'error' });
      setHistory(newHistory);
    }
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center bg-background px-6 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full z-10 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-accent tracking-widest uppercase mb-2">
            // INTERACTIVE_STACK_QUERY
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white text-center tracking-tight uppercase">
            Capabilities Matrix
          </h2>
        </div>

        {/* CLI Terminal */}
        <div 
          className="hud-frame-double bg-black/60 border border-white/5 h-[400px] flex flex-col justify-between overflow-hidden cursor-text select-none font-mono text-xs md:text-sm text-foreground/90 relative"
          onClick={focusInput}
        >
          {/* Terminal Title Bar */}
          <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent/20 border border-accent/40" />
              <span className="text-[10px] tracking-widest text-accent/60">SYS_CONSOLE // v1.0.0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] text-white/40">ONLINE</span>
            </div>
          </div>

          {/* Logs scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text custom-scrollbar">
            {history.map((line, index) => {
              if (line.type === 'input') {
                return (
                  <div key={index} className="text-white/60">
                    <span className="text-accent">&gt; </span>
                    <span>{line.text}</span>
                  </div>
                );
              }
              if (line.type === 'system') {
                return (
                  <div key={index} className="text-accent font-bold">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'error') {
                return (
                  <div key={index} className="text-warning">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={index} className="text-white/80 whitespace-pre-wrap pl-2 border-l border-white/5">
                  {line.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt input area */}
          <form onSubmit={handleCommandSubmit} className="bg-black/60 border-t border-white/5 p-3 flex items-center gap-2 select-text">
            <span className="text-accent font-bold">&gt;</span>
            <input 
              ref={inputRef}
              type="text" 
              className="flex-1 bg-transparent border-none outline-none font-mono text-accent caret-accent focus:ring-0 p-0 text-xs md:text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Type "help" or run a quick command...'
              autoComplete="off"
              autoCapitalize="off"
            />
          </form>
        </div>

        {/* Quick Link Buttons (Touch & Interaction guidelines!) */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button 
            type="button"
            onClick={() => { executeSkillsCommand(true); }}
            className="cursor-pointer font-mono text-[10px] text-accent/80 hover:text-white border border-accent/20 hover:border-accent bg-accent/5 px-4 py-2 transition-all duration-300"
          >
            [ CMD: SKILLS ]
          </button>
          <button 
            type="button"
            onClick={() => {
              setHistory(prev => [
                ...prev, 
                { text: 'diagnose', type: 'input' },
                { text: 'RUNNING CORE STACK PROFILES...', type: 'system' },
                { text: '  TypeScript  [ ██████████████████░░ ] 90% // SECURE', type: 'output' },
                { text: '  React.js    [ ██████████████████░░ ] 90% // ACTIVE', type: 'output' },
                { text: '  Next.js     [ ████████████████░░░░ ] 80% // ACTIVE', type: 'output' },
                { text: '  Python      [ ██████████████████░░ ] 90% // COGNITIVE', type: 'output' },
                { text: '  PostgreSQL  [ ████████████████░░░░ ] 80% // STATE_OK', type: 'output' },
                { text: '  Docker      [ ████████████░░░░░░░░ ] 60% // HOST_READY', type: 'output' },
                { text: 'DIAGNOSTICS SEQUENCE LOGS FINISHED. PIPELINES NORMAL.', type: 'system' }
              ]);
            }}
            className="cursor-pointer font-mono text-[10px] text-accent/80 hover:text-white border border-accent/20 hover:border-accent bg-accent/5 px-4 py-2 transition-all duration-300"
          >
            [ CMD: DIAGNOSE ]
          </button>
          <button 
            type="button"
            onClick={() => {
              setHistory(prev => [
                ...prev,
                { text: 'help', type: 'input' },
                { text: 'AVAILABLE STACK DIAGNOSTICS COMMANDS:', type: 'system' },
                { text: '  skills    - Load entire capability grid matrix', type: 'output' },
                { text: '  diagnose  - Run detailed engineering proficiency check', type: 'output' },
                { text: '  clear     - Wipe shell logs', type: 'output' },
                { text: '  help      - Print current options list', type: 'output' }
              ]);
            }}
            className="cursor-pointer font-mono text-[10px] text-accent/80 hover:text-white border border-accent/20 hover:border-accent bg-accent/5 px-4 py-2 transition-all duration-300"
          >
            [ CMD: HELP ]
          </button>
          <button 
            type="button"
            onClick={() => { setHistory([{ text: 'SYS_SHELL_RESET // CONSOLE_MODE_ACTIVE', type: 'system' }]); }}
            className="cursor-pointer font-mono text-[10px] text-white/40 hover:text-white border border-white/10 hover:border-white/30 bg-white/5 px-4 py-2 transition-all duration-300"
          >
            [ CMD: CLEAR ]
          </button>
        </div>

      </div>
    </section>
  );
};
