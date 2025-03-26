
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info, Save, Loader2, Download } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MindfulnessTutorial } from '@/data/journalData';

interface JournalControlsProps {
  onNewEntry: () => void;
  onPreviewToggle: () => void;
  isPreview: boolean;
  onSave: () => void;
  onDownloadMarkdown: () => void;
  saving: boolean;
  isUserLoggedIn: boolean;
  selectedTutorial: MindfulnessTutorial | null;
  onTutorialSelect: (tutorial: MindfulnessTutorial) => void;
  setSelectedTutorial: (tutorial: MindfulnessTutorial | null) => void;
  children: React.ReactNode; // For the Dialog content
}

const JournalControls: React.FC<JournalControlsProps> = ({
  onNewEntry,
  onPreviewToggle,
  isPreview,
  onSave,
  onDownloadMarkdown,
  saving,
  isUserLoggedIn,
  children // This will contain the Dialog content
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-medium">Journal Entry</h2>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onNewEntry}
        >
          New Entry
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Info size={14} />
              <span>Tutorials</span>
            </Button>
          </DialogTrigger>
          {children}
        </Dialog>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={onDownloadMarkdown}
          title="Download as Markdown"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
        
        <Button 
          size="sm"
          onClick={onSave}
          disabled={saving || !isUserLoggedIn}
          className="flex items-center gap-1"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default JournalControls;
