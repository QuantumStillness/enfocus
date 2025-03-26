
import { useState } from 'react';
import { mindfulnessTutorials } from '@/data/journalData';
import { JournalEntry } from '@/services/journalService';
import { useAuth } from '@/contexts/AuthContext';

export const useJournalState = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [chakras, setChakras] = useState<string[]>([]);
  const [selectedTutorial, setSelectedTutorial] = useState<typeof mindfulnessTutorials[0] | null>(null);
  const [saving, setSaving] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const { user } = useAuth();

  const journalEntry: JournalEntry = {
    id: currentEntryId || undefined,
    title,
    content,
    tags,
    chakras
  };

  return {
    title,
    content,
    preview,
    autoSave,
    tags,
    chakras,
    selectedTutorial,
    saving,
    currentEntryId,
    user,
    journalEntry,
    setTitle,
    setContent,
    setPreview,
    setAutoSave,
    setTags,
    setChakras,
    setSelectedTutorial,
    setSaving,
    setCurrentEntryId,
  };
};
