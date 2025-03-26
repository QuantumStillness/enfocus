import { useState, useEffect } from 'react';
import { MeditationGuide } from "@/types/meditation";
import { 
  getMeditationNotes, 
  saveMeditationNotes 
} from "@/utils/markdown";

export default function useNotes(meditation: MeditationGuide) {
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  
  useEffect(() => {
    const savedNotes = getMeditationNotes(meditation.id);
    setNotes(savedNotes || getDefaultNotes());
  }, [meditation.id]);
  
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (notes) {
        saveMeditationNotes(meditation.id, notes);
      }
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [notes, meditation.id]);
  
  const getDefaultNotes = () => {
    return `# ${meditation.title} - My Notes\n\n` +
           `*Date: ${new Date().toLocaleDateString()}*\n\n` +
           `## Insights\n\n` +
           `## Challenges\n\n` +
           `## Practice Steps\n\n`;
  };
  
  const handleSave = () => {
    saveMeditationNotes(meditation.id, notes);
    return true;
  };
  
  return {
    notes,
    setNotes,
    activeTab,
    setActiveTab,
    handleSave
  };
}
