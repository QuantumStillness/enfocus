
import { useJournalState } from './journal/useJournalState';
import { useJournalBasicActions } from './journal/useJournalBasicActions';
import { useJournalIntentions } from './journal/useJournalIntentions';
import { useJournalEnergyBalance } from './journal/useJournalEnergyBalance';
import { useJournalMeditation } from './journal/useJournalMeditation';

export const useJournalActions = () => {
  const state = useJournalState();
  const basicActions = useJournalBasicActions(state);
  const { handleIntentionApply } = useJournalIntentions(state.content, state.setContent);
  const { handleEnergyBalanceApply } = useJournalEnergyBalance(state.content, state.setContent);
  const { handleInsertMeditationTemplate } = useJournalMeditation(state.content, state.setContent);

  return {
    state,
    actions: {
      ...basicActions,
      setTitle: state.setTitle,
      setContent: state.setContent,
      setPreview: state.setPreview,
      setAutoSave: state.setAutoSave,
      setSelectedTutorial: state.setSelectedTutorial,
      handleIntentionApply,
      handleEnergyBalanceApply,
      handleInsertMeditationTemplate
    }
  };
};
