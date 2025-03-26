
import { useState } from 'react';
import { useDialogState } from './useDialogState';
import { meditationGuides } from '@/data/meditationGuides';

export function useMeditationDialog(
  onMeditationSelect?: (meditation: any) => void
) {
  const { isOpen, setIsOpen } = useDialogState();
  const [customNotes, setCustomNotes] = useState('');
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedMeditation, setSelectedMeditation] = useState<any>(null);

  const handleSelectMeditation = (meditation: any) => {
    setSelectedMeditation(meditation);
    setActiveTab('customize');
  };

  const handleAddToJournal = () => {
    if (selectedMeditation && onMeditationSelect) {
      onMeditationSelect({
        ...selectedMeditation,
        customNotes: customNotes.trim() ? customNotes : undefined
      });
      
      setIsOpen(false);
      setCustomNotes('');
      setSelectedMeditation(null);
      setActiveTab('templates');
    }
  };

  const handleCancel = () => {
    setCustomNotes('');
    setSelectedMeditation(null);
    setActiveTab('templates');
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    customNotes,
    setCustomNotes,
    activeTab,
    setActiveTab,
    selectedMeditation,
    meditationGuides,
    handleSelectMeditation,
    handleAddToJournal,
    handleCancel
  };
}
