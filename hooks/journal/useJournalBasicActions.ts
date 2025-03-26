
import { toast } from "sonner";
import { saveJournalEntry } from '@/services/journalService';
import { insertMarkdown, insertPrompt } from '@/utils/markdown';

export const useJournalBasicActions = (
  state: ReturnType<typeof import('./useJournalState').useJournalState>
) => {
  const {
    journalEntry,
    user,
    content,
    currentEntryId,
    setContent,
    setTitle,
    setTags,
    setChakras,
    setCurrentEntryId,
    setSaving,
    setSelectedTutorial
  } = state;

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await saveJournalEntry(journalEntry, user?.id);
      
      if (result.success && result.entryId) {
        setCurrentEntryId(result.entryId);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    } finally {
      setSaving(false);
    }
  };
  
  const handleNewEntry = () => {
    if (content && content !== '') {
      if (!window.confirm("You have unsaved changes. Create a new entry anyway?")) {
        return;
      }
    }
    
    setTitle('');
    setContent('');
    setTags([]);
    setChakras([]);
    setCurrentEntryId(null);
    localStorage.removeItem('journal-draft');
  };

  const handleInsertMarkdown = (markdownType: string) => {
    const textarea = document.querySelector('textarea');
    const selectionStart = textarea?.selectionStart || 0;
    const selectionEnd = textarea?.selectionEnd || 0;
    
    const { newContent, newPosition } = insertMarkdown(content, markdownType, selectionStart, selectionEnd);
    setContent(newContent);
    
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const handleInsertPrompt = (prompt: string) => {
    setContent(insertPrompt(content, prompt));
  };

  const handleInsertTutorial = (tutorialIndex: number) => {
    const tutorial = (import('@/data/journalData').then(({ mindfulnessTutorials }) => mindfulnessTutorials[tutorialIndex]));
    
    if (content && !window.confirm("This will replace your current journal entry. Continue?")) {
      return;
    }
    
    tutorial.then((tutorial) => {
      setContent(tutorial.content);
      setSelectedTutorial(null);
      
      const titleMatch = tutorial.content.match(/# (.*)/);
      if (titleMatch && titleMatch[1]) {
        setTitle(titleMatch[1]);
      } else {
        setTitle(tutorial.title);
      }
    });
  };

  const handleAddTag = (tag: string) => {
    if (!state.tags.includes(tag)) {
      setTags([...state.tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(state.tags.filter(t => t !== tag));
  };

  const handleToggleChakra = (chakra: string) => {
    if (state.chakras.includes(chakra)) {
      setChakras(state.chakras.filter(c => c !== chakra));
    } else {
      setChakras([...state.chakras, chakra]);
    }
  };

  const handleClearContent = () => {
    setContent('');
    setTitle('');
    setTags([]);
    setChakras([]);
  };

  return {
    handleSave,
    handleNewEntry,
    handleInsertMarkdown,
    handleInsertPrompt,
    handleInsertTutorial,
    handleAddTag,
    handleRemoveTag,
    handleToggleChakra,
    handleClearContent
  };
};
