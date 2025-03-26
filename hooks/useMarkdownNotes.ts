
import { useState } from 'react';

export function useMarkdownNotes() {
  const [notesOpen, setNotesOpen] = useState(false);
  const [initialWeek, setInitialWeek] = useState<number | undefined>(undefined);
  
  const openNotes = (week?: number) => {
    if (week) {
      setInitialWeek(week);
    }
    setNotesOpen(true);
  };
  
  const closeNotes = () => {
    setNotesOpen(false);
    setInitialWeek(undefined);
  };
  
  return {
    notesOpen,
    setNotesOpen,
    initialWeek,
    openNotes,
    closeNotes
  };
}
