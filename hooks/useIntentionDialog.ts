
import { useDialogState } from './useDialogState';
import { useIntentions } from './useIntentions';
import { useAuth } from '@/contexts/AuthContext';

export function useIntentionDialog(
  onIntentionSet?: (intention: string, gratitude: string, affirmation: string) => void
) {
  const { isOpen, setIsOpen } = useDialogState();
  const { user } = useAuth();
  const {
    date,
    setDate,
    intention,
    setIntention,
    gratitude,
    setGratitude,
    affirmation,
    setAffirmation,
    saving,
    saveIntentions,
    getCurrentIntentionData
  } = useIntentions(user?.id);

  const handleSave = async () => {
    await saveIntentions();
    
    if (onIntentionSet) {
      onIntentionSet(intention, gratitude, affirmation);
    }
    
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    intention,
    gratitude,
    affirmation,
    setIntention,
    setGratitude,
    setAffirmation,
    saving,
    handleSave,
    isAuthenticated: !!user
  };
}
