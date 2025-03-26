
import React, { useState } from 'react';
import { useJournalEditor } from '@/hooks/useJournalEditor';
import JournalHeader from './editor/JournalHeader';
import JournalTools from './editor/JournalTools';
import ContentEditor from './editor/ContentEditor';
import TagAndChakraSection from './editor/TagAndChakraSection';
import EmotionSection from './emotions/EmotionSection';
import EditorSettings from './editor/EditorSettings';
import PromptsSection from './editor/PromptsSection';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import MarkdownPreview from './editor/MarkdownPreview';
import IntentionDialog from './intentions/IntentionDialog';
import EnergyBalanceDialog from './chakra/EnergyBalanceDialog';
import MeditationTemplatesDialog from './meditation/MeditationTemplatesDialog';
import TwelveWeekDialog from './editor/TwelveWeekDialog';
import TutorialSelector from './editor/TutorialSelector';

const JournalEditorFullScreen = () => {
  const editor = useJournalEditor();
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showIntentionDialog, setShowIntentionDialog] = useState(false);
  const [showEnergyDialog, setShowEnergyDialog] = useState(false);
  const [showMeditationDialog, setShowMeditationDialog] = useState(false);
  const [showTutorialDialog, setShowTutorialDialog] = useState(false);
  const [show12WeekDialog, setShow12WeekDialog] = useState(false);
  
  const handleSelectTemplate = (template: string) => {
    if (editor.state.content && !window.confirm("This will replace your current journal entry. Continue?")) {
      return;
    }
    
    // Extract title from template if it starts with a heading
    const titleMatch = template.match(/^# (.*)/m);
    if (titleMatch && titleMatch[1]) {
      editor.actions.setTitle(titleMatch[1]);
    }
    
    editor.actions.setContent(template);
    toast.success("Template applied successfully");
  };
  
  return (
    <div className="space-y-6">
      <JournalHeader
        title={editor.state.title}
        preview={editor.state.preview}
        saving={editor.state.saving}
        user={editor.state.user}
        selectedTutorial={editor.state.selectedTutorial}
        onNewEntry={editor.actions.handleNewEntry}
        onPreviewToggle={() => editor.actions.setPreview(!editor.state.preview)}
        onSave={editor.actions.handleSave}
        setSelectedTutorial={editor.actions.setSelectedTutorial}
        handleInsertTutorial={editor.actions.handleInsertTutorial}
        onExportMarkdown={editor.handleExportMarkdown}
        onExportObsidian={editor.handleExportObsidian}
        onFullScreen={editor.isFullScreen ? editor.exitFullScreen : editor.enterFullScreen}
        date={editor.journalDate}
        setDate={editor.setJournalDate}
        onEmotionClick={() => editor.setShowEmotionSection(!editor.showEmotionSection)}
        onSelectTemplate={handleSelectTemplate}
      />
      
      {/* Add JournalTools component here */}
      <JournalTools
        onInsertTemplate={() => setShowTemplateDialog(true)}
        onInsertPrompt={editor.actions.handleInsertPrompt}
        onOpenIntentions={() => setShowIntentionDialog(true)}
        onOpenEnergyBalance={() => setShowEnergyDialog(true)}
        onOpenMeditation={() => setShowMeditationDialog(true)}
        onOpenTutorials={() => setShowTutorialDialog(true)}
        onOpen12WeekTemplates={() => setShow12WeekDialog(true)}
      />
      
      <div>
        <Input
          type="text"
          placeholder="Title (optional)"
          value={editor.state.title}
          onChange={(e) => editor.actions.setTitle(e.target.value)}
          className="mb-4 text-lg font-medium"
        />
        
        <div className="mb-4 min-h-[300px]">
          {editor.state.preview ? (
            <div className="border rounded-md p-4 min-h-[300px]">
              <MarkdownPreview content={editor.state.content} />
            </div>
          ) : (
            <ContentEditor
              title={editor.state.title}
              content={editor.state.content}
              preview={false}
              onTitleChange={editor.actions.setTitle}
              onContentChange={editor.actions.setContent}
              onInsertMarkdown={editor.actions.handleInsertMarkdown}
              onInsertPrompt={editor.actions.handleInsertPrompt}
              onInsertTemplate={() => setShowTemplateDialog(true)}
              onOpenIntentions={() => setShowIntentionDialog(true)}
              onOpenEnergyBalance={() => setShowEnergyDialog(true)}
              onOpenMeditation={() => setShowMeditationDialog(true)}
            />
          )}
        </div>
        
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="w-full lg:w-3/4">
            <TagAndChakraSection
              tags={editor.state.tags}
              chakras={editor.state.chakras}
              onAddTag={(tag) => editor.actions.handleAddTag(tag)} 
              onRemoveTag={(tag) => editor.actions.handleRemoveTag(tag)}
              onToggleChakra={(chakra) => editor.actions.handleToggleChakra(chakra)}
            />
            
            {editor.showEmotionSection && (
              <EmotionSection
                currentEmotion={editor.currentEmotion}
                onEmotionSelect={editor.handleEmotionSelect}
              />
            )}
          </div>
          
          <div className="w-full lg:w-1/4">
            <div className="space-y-4">
              <EditorSettings
                autoSave={editor.state.autoSave}
                setAutoSave={(value) => editor.actions.setAutoSave(value)}
                onClearContent={editor.actions.handleClearContent}
                isUserLoggedIn={!!editor.state.user}
              />
              
              <PromptsSection
                showPrompts={editor.showPrompts}
                togglePrompts={editor.togglePrompts}
                onSelectPrompt={editor.actions.handleInsertPrompt}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <IntentionDialog 
        open={showIntentionDialog} 
        onOpenChange={setShowIntentionDialog} 
        onIntentionSet={(intention, gratitude, affirmation) => {
          editor.actions.handleIntentionApply(intention || "", gratitude || "", affirmation || "");
        }} 
      />
      
      <EnergyBalanceDialog 
        open={showEnergyDialog} 
        onOpenChange={setShowEnergyDialog} 
        onEnergySet={(energyLevels) => {
          editor.actions.handleEnergyBalanceApply(energyLevels);
        }} 
      />
      
      <MeditationTemplatesDialog 
        open={showMeditationDialog} 
        onOpenChange={setShowMeditationDialog} 
        onTemplateSelect={(template) => {
          editor.actions.handleInsertMeditationTemplate(template);
        }} 
      />
      
      <TwelveWeekDialog 
        open={show12WeekDialog} 
        onOpenChange={setShow12WeekDialog} 
        onTemplateSelect={handleSelectTemplate} 
      />
      
      {showTutorialDialog && (
        <TutorialSelector 
          onSelectTutorial={editor.actions.handleInsertTutorial} 
        />
      )}
    </div>
  );
};

export default JournalEditorFullScreen;
