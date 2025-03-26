
import React from 'react';
import EditorSettings from './EditorSettings';
import EmotionSection from '../emotions/EmotionSection';
import PromptsSection from './PromptsSection';
import TagAndChakraSection from './TagAndChakraSection';

interface JournalSidebarProps {
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
  onClearContent: () => void;
  isUserLoggedIn: boolean;
  showEmotionSection: boolean;
  currentEmotion: { emotion: string; intensity?: number } | null;
  onEmotionSelect: (emotion: string, intensity?: number) => void;
  onIntentionApply: (intention: string, gratitude: string, affirmation: string) => void;
  onEnergyBalanceApply: (energyLevels: Record<string, number[]>) => void;
  onInsertMeditationTemplate: (template: any) => void;
  showPrompts: boolean;
  togglePrompts: () => void;
  onSelectPrompt: (prompt: string) => void;
  tags: string[];
  chakras: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onToggleChakra: (chakra: string) => void;
}

const JournalSidebar: React.FC<JournalSidebarProps> = ({
  autoSave,
  setAutoSave,
  onClearContent,
  isUserLoggedIn,
  showEmotionSection,
  currentEmotion,
  onEmotionSelect,
  onIntentionApply,
  onEnergyBalanceApply,
  onInsertMeditationTemplate,
  showPrompts,
  togglePrompts,
  onSelectPrompt,
  tags,
  chakras,
  onAddTag,
  onRemoveTag,
  onToggleChakra
}) => {
  return (
    <div className="space-y-6">
      <EditorSettings
        autoSave={autoSave}
        setAutoSave={setAutoSave}
        onClearContent={onClearContent}
        isUserLoggedIn={isUserLoggedIn}
      />
      
      {showEmotionSection && (
        <EmotionSection 
          currentEmotion={currentEmotion}
          onEmotionSelect={onEmotionSelect}
          onIntentionApply={onIntentionApply}
          onEnergyBalanceApply={onEnergyBalanceApply}
          onInsertMeditationTemplate={onInsertMeditationTemplate}
        />
      )}
      
      {showPrompts && (
        <PromptsSection
          showPrompts={showPrompts}
          togglePrompts={togglePrompts}
          onSelectPrompt={onSelectPrompt}
        />
      )}
      
      <TagAndChakraSection
        tags={tags}
        chakras={chakras}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
        onToggleChakra={onToggleChakra}
      />
    </div>
  );
};

export default JournalSidebar;
