
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, EyeOff, Eye, Save, Loader2, Maximize2 } from 'lucide-react';
import ExportControls from './ExportControls';

interface JournalHeaderActionsProps {
  preview: boolean;
  saving: boolean;
  user: any;
  onNewEntry: () => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onExportMarkdown: () => void;
  onExportObsidian: () => void;
  onFullScreen: () => void;
  handleInsertTutorial: (index: number) => void;
}

const JournalHeaderActions: React.FC<JournalHeaderActionsProps> = ({
  preview,
  saving,
  user,
  onNewEntry,
  onPreviewToggle,
  onSave,
  onExportMarkdown,
  onExportObsidian,
  onFullScreen,
  handleInsertTutorial
}) => {
  return <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
      <Button variant="outline" size="sm" onClick={onNewEntry} className="flex items-center gap-1">
        <Plus className="h-4 w-4" />
        <span>New</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={onPreviewToggle} className="flex items-center gap-1">
        {preview ? <>
            <EyeOff className="h-4 w-4" />
            <span>Edit</span>
          </> : <>
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </>}
      </Button>
      
      <ExportControls onExportMarkdown={onExportMarkdown} onExportObsidian={onExportObsidian} />
      
      <Button variant="outline" size="sm" onClick={onFullScreen} className="flex items-center gap-1">
        <Maximize2 className="h-4 w-4" />
        <span>Full Screen</span>
      </Button>
      
      <Button size="sm" onClick={onSave} disabled={saving || !user} className="flex items-center gap-1">
        {saving ? <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </> : <>
            <Save className="h-4 w-4" />
            <span>Save</span>
          </>}
      </Button>
    </div>;
};

export default JournalHeaderActions;
