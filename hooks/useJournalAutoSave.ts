
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { JournalEntry, saveJournalDraft } from '@/services/journalService';

export const useJournalAutoSave = (
  entry: JournalEntry,
  autoSave: boolean
) => {
  const [savedContent, setSavedContent] = useState<string>(entry.content || '');
  
  useEffect(() => {
    // Set up autosave
    if (autoSave) {
      const interval = setInterval(() => {
        if (entry.content && entry.content !== savedContent) {
          saveJournalDraft(entry);
          setSavedContent(entry.content);
          toast.info("Journal entry autosaved", {
            duration: 2000,
          });
        }
      }, 60000); // Autosave every minute
      
      return () => clearInterval(interval);
    }
  }, [entry, savedContent, autoSave]);
  
  return { savedContent, setSavedContent };
};

export default useJournalAutoSave;
