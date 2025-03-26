
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import { journalPrompts } from '@/data/journalData';

interface PromptSelectorProps {
  onSelectPrompt: (prompt: string) => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({ onSelectPrompt }) => {
  return (
    <AnimatedTransition delay={200}>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Journaling Prompts</h3>
        <div className="flex flex-wrap gap-2">
          {journalPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(prompt)}
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt}
            </button>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default PromptSelector;
