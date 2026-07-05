import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ChapterCounter } from './components/ChapterCounter';
import { ScrollProgress } from './components/ScrollProgress';
import { Chapter0Opening } from './components/Chapter0Opening';
import { Chapter1ProofStrip } from './components/Chapter1ProofStrip';
import { Chapter8Experience } from './components/Chapter8Experience';
import { Chapter9Capabilities } from './components/Chapter9Capabilities';
import { Chapter10Closing } from './components/Chapter10Closing';
import { ProjectChapter } from './components/ProjectChapter';
import { resumeData } from './data/resume';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const totalChapters = resumeData.projects.length + 4; // Dynamic count matching index 0 to length+4

  useEffect(() => {
    const timer = setTimeout(() => {
      const chapters = gsap.utils.toArray('.chapter-section');
      
      // Setup ScrollTriggers for each chapter
      chapters.forEach((chapter: any, i) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => {
            if (self.isActive) setCurrentChapter(i);
          }
        });
      });

      // Calculate initial active chapter based on scroll position
      const scrollY = window.scrollY;
      const centerY = scrollY + window.innerHeight / 2;
      let initialActive = 0;

      chapters.forEach((chapter: any, i) => {
        const rect = chapter.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = rect.bottom + scrollY;
        if (centerY >= top && centerY <= bottom) {
          initialActive = i;
        }
      });

      setCurrentChapter(initialActive);
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen text-foreground overflow-x-hidden">
      <ScrollProgress />
      <ChapterCounter current={currentChapter} total={totalChapters} />

      <main>
        <div className="chapter-section"><Chapter0Opening /></div>
        <div className="chapter-section"><Chapter1ProofStrip /></div>
        
        {/* Chapters 2-7: Projects */}
        {resumeData.projects.map((project) => (
          <div key={project.id} className="chapter-section">
            <ProjectChapter project={project} />
          </div>
        ))}
        
        <div className="chapter-section"><Chapter8Experience /></div>
        <div className="chapter-section"><Chapter9Capabilities /></div>
        <div className="chapter-section"><Chapter10Closing /></div>
      </main>
    </div>
  );
}

export default App;
