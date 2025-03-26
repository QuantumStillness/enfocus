
import React from 'react';
import { useJournalEditor } from '@/hooks/useJournalEditor';
import JournalHeader from './editor/JournalHeader';
import JournalEditorContent from './editor/JournalEditorContent';
import { useEmotionHandlers } from './editor/EmotionHandlers';
import { useExportHandlers } from './editor/ExportHandlers';

const JournalEditor = () => {
  const {
    state,
    actions,
    showEmotionSection,
    setShowEmotionSection,
    currentEmotion,
    setCurrentEmotion,
    showPrompts,
    togglePrompts,
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    handleExportMarkdown,
    handleExportObsidian
  } = useJournalEditor();

  // Use the refactored functionality hooks
  const { handleEmotionSelect } = useEmotionHandlers({
    content: state.content,
    setContent: actions.setContent,
    setCurrentEmotion
  });

  return (
    <div className="space-y-6">
      <JournalHeader 
        title={state.title}
        preview={state.preview}
        saving={state.saving}
        user={state.user}
        selectedTutorial={state.selectedTutorial}
        onNewEntry={actions.handleNewEntry}
        onPreviewToggle={() => actions.setPreview(!state.preview)}
        onSave={actions.handleSave}
        setSelectedTutorial={actions.setSelectedTutorial}
        handleInsertTutorial={actions.handleInsertTutorial}
        onExportMarkdown={handleExportMarkdown}
        onExportObsidian={handleExportObsidian}
        onEmotionClick={() => setShowEmotionSection(!showEmotionSection)}
        onIntentionClick={actions.handleIntentionApply}
        onEnergyBalanceClick={actions.handleEnergyBalanceApply}
        onMeditationClick={actions.handleInsertMeditationTemplate}
        onFullScreen={enterFullScreen}
      />
      
      <JournalEditorContent 
        showEmotionSection={showEmotionSection}
        currentEmotion={currentEmotion}
        onEmotionSelect={handleEmotionSelect}
        onIntentionApply={actions.handleIntentionApply}
        onEnergyBalanceApply={actions.handleEnergyBalanceApply}
        onInsertMeditationTemplate={actions.handleInsertMeditationTemplate}
        showPrompts={showPrompts}
        togglePrompts={togglePrompts}
      />
    </div>
  );
};

export default JournalEditor;
