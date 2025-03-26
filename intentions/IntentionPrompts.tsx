
import React, { useState, useEffect } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntentionPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const intentionPrompts = [
  "I intend to bring mindfulness to my interactions today",
  "Today, I choose to respond rather than react",
  "I will make time for self-care today",
  "I intend to focus on the present moment"
];

const IntentionPrompts: React.FC<IntentionPromptsProps> = ({ onPromptClick }) => {
  const [showPrompts, setShowPrompts] = useState(false);
  
  // Load user preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('show-intention-prompts');
    if (savedPreference) {
      setShowPrompts(savedPreference === 'true');
    } else {
      // Default to hidden if no preference is set
      setShowPrompts(false);
      localStorage.setItem('show-intention-prompts', 'false');
    }
  }, []);
  
  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('show-intention-prompts', showPrompts.toString());
  }, [showPrompts]);
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">Prompt suggestions</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 text-xs flex items-center gap-1 px-2" 
          onClick={() => setShowPrompts(!showPrompts)}
        >
          {showPrompts ? (
            <>
              <EyeOff className="h-3 w-3" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye className="h-3 w-3" />
              <span>Show</span>
            </>
          )}
        </Button>
      </div>
      
      {showPrompts && (
        <div className="flex flex-wrap gap-2">
          {intentionPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onPromptClick(prompt)}
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntentionPrompts;
