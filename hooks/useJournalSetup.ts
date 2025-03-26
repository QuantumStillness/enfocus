
import { useEffect, useState } from 'react';
import { loadJournalDraft } from '@/services/journalService';

interface UseJournalSetupProps {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSelectedTutorial: (tutorial: any | null) => void;
  setSavedContent: (content: string) => void;
}

interface EmotionState {
  emotion: string;
  intensity?: number;
}

export const useJournalSetup = ({
  setTitle,
  setContent,
  setSelectedTutorial,
  setSavedContent
}: UseJournalSetupProps) => {
  const [showPrompts, setShowPrompts] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionState | null>(null);
  
  // Load draft and preferences
  useEffect(() => {
    // Load any existing draft from localStorage
    const draft = loadJournalDraft();
    if (draft) {
      setTitle(draft.title);
      setContent(draft.content);
      setSelectedTutorial(null);
      setSavedContent(draft.content);
    }
    
    // Load showPrompts preference from localStorage
    const savedShowPrompts = localStorage.getItem('show-journal-prompts');
    if (savedShowPrompts) {
      setShowPrompts(savedShowPrompts === 'true');
    }
    
    // Load emotion from localStorage if available
    const savedEmotion = localStorage.getItem('journal-emotion');
    if (savedEmotion) {
      try {
        setCurrentEmotion(JSON.parse(savedEmotion));
      } catch (e) {
        console.error("Failed to parse saved emotion:", e);
      }
    }
  }, []);
  
  // Save showPrompts preference to localStorage
  useEffect(() => {
    localStorage.setItem('show-journal-prompts', showPrompts.toString());
  }, [showPrompts]);
  
  // Save emotion to localStorage
  useEffect(() => {
    if (currentEmotion) {
      localStorage.setItem('journal-emotion', JSON.stringify(currentEmotion));
    }
  }, [currentEmotion]);

  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
  };

  return {
    showPrompts,
    currentEmotion,
    setCurrentEmotion,
    togglePrompts
  };
};

export default useJournalSetup;
