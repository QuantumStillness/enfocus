
import { useState } from 'react';
import { useJournalActions } from './useJournalActions';
import { useJournalSetup } from './useJournalSetup';
import { useJournalAutoSave } from './useJournalAutoSave';
import { useJournalExport } from './useJournalExport';
import { useFullScreen } from './useFullScreen';
import { useEmotionHandlers } from '@/components/editor/EmotionHandlers';

export const useJournalEditor = () => {
  const { state, actions } = useJournalActions();
  const [journalDate, setJournalDate] = useState(new Date());
  const [savedContent, setSavedContent] = useState(state.content);
  const [showEmotionSection, setShowEmotionSection] = useState(false);
  
  const { 
    showPrompts, 
    currentEmotion, 
    setCurrentEmotion, 
    togglePrompts 
  } = useJournalSetup({
    setTitle: actions.setTitle,
    setContent: actions.setContent,
    setSelectedTutorial: actions.setSelectedTutorial,
    setSavedContent
  });
  
  useJournalAutoSave(state.journalEntry, state.autoSave);
  
  const { handleDownloadMarkdown } = useJournalExport();
  const { isFullScreen, enterFullScreen, exitFullScreen } = useFullScreen();

  // Add the emotion handlers
  const { handleEmotionSelect } = useEmotionHandlers({
    content: state.content,
    setContent: actions.setContent,
    setCurrentEmotion
  });

  const handleExportMarkdown = () => {
    handleDownloadMarkdown(
      state.title,
      state.content,
      state.tags,
      state.chakras,
      currentEmotion,
      false
    );
  };

  const handleExportObsidian = () => {
    handleDownloadMarkdown(
      state.title,
      state.content,
      state.tags,
      state.chakras,
      currentEmotion,
      true
    );
  };
  
  return {
    state,
    actions,
    journalDate,
    setJournalDate,
    savedContent,
    setSavedContent,
    showEmotionSection,
    setShowEmotionSection,
    showPrompts,
    currentEmotion,
    setCurrentEmotion,
    togglePrompts,
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    handleExportMarkdown,
    handleExportObsidian,
    handleEmotionSelect // Add this to the returned object
  };
};
