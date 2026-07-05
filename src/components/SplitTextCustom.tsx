import React from 'react';

interface SplitTextCustomProps {
  text: string;
}

export const SplitTextCustom: React.FC<SplitTextCustomProps> = ({ text }) => {
  return (
    <span aria-label={text} className="inline-block">
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          aria-hidden="true" 
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
