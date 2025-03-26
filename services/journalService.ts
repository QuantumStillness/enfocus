
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type JournalEntry = {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  chakras: string[];
};

export const saveJournalEntry = async (
  entry: JournalEntry,
  userId: string | undefined
): Promise<{ success: boolean; entryId?: string }> => {
  if (!userId) {
    toast.error("Please sign in to save your journal");
    return { success: false };
  }
  
  if (entry.content.trim() === '') {
    toast.error("Journal entry is empty");
    return { success: false };
  }

  if (entry.title.trim() === '') {
    toast.error("Please provide a title for your journal entry");
    return { success: false };
  }
  
  try {
    const today = new Date().toISOString().split('T')[0];
    
    if (entry.id) {
      // Update existing entry
      const { error } = await supabase
        .from('journal_entries')
        .update({
          title: entry.title,
          content: entry.content,
          tags: entry.tags,
          chakras: entry.chakras,
          updated_at: new Date().toISOString()
        })
        .eq('id', entry.id);
      
      if (error) throw error;
      
      toast.success("Journal entry updated");
      return { success: true, entryId: entry.id };
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: userId,
          title: entry.title,
          content: entry.content,
          tags: entry.tags,
          chakras: entry.chakras,
          date: today
        })
        .select();
      
      if (error) throw error;
      
      const entryId = data && data.length > 0 ? data[0].id : undefined;
      
      toast.success("Journal entry saved");
      return { success: true, entryId };
    }
  } catch (error) {
    console.error("Error saving journal entry:", error);
    toast.error("Could not save your journal entry");
    return { success: false };
  }
};

export const saveJournalDraft = (
  entry: JournalEntry
): void => {
  const draftData = JSON.stringify({
    title: entry.title,
    content: entry.content,
    tags: entry.tags,
    chakras: entry.chakras
  });
  
  localStorage.setItem('journal-draft', draftData);
};

export const loadJournalDraft = (): JournalEntry | null => {
  const savedDraft = localStorage.getItem('journal-draft');
  
  if (savedDraft) {
    try {
      const parsed = JSON.parse(savedDraft);
      return {
        title: parsed.title || '',
        content: parsed.content || '',
        tags: parsed.tags || [],
        chakras: parsed.chakras || []
      };
    } catch (e) {
      // If the stored value is not valid JSON, just use it as content
      return {
        title: '',
        content: savedDraft,
        tags: [],
        chakras: []
      };
    }
  }
  
  return null;
};
