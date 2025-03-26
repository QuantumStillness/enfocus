
import React from 'react';
import { Button } from "@/components/ui/button";
import AnimatedTransition from '../AnimatedTransition';
import { toast } from 'sonner';
import { Trash2, Save, BookOpen } from 'lucide-react';

interface EditorSettingsProps {
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
  onClearContent: () => void;
  isUserLoggedIn: boolean;
  onOpenNotes?: () => void;
}

const EditorSettings: React.FC<EditorSettingsProps> = ({
  autoSave,
  setAutoSave,
  onClearContent,
  isUserLoggedIn,
  onOpenNotes
}) => {
  const handleClearContent = () => {
    if (window.confirm('Are you sure you want to clear the journal entry?')) {
      onClearContent();
      toast.info("Journal entry cleared");
    }
  };

  return (
    <AnimatedTransition delay={300}>
      <div className="flex items-center space-x-2 bg-amber-50/50 p-2 rounded-md border border-amber-100">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearContent}
          className="flex gap-1 items-center text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-900"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear</span>
        </Button>
        
        {onOpenNotes && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onOpenNotes}
            className="flex gap-1 items-center text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-900"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Notes</span>
          </Button>
        )}
        
        <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded border border-amber-100">
          <input
            type="checkbox"
            id="autosave"
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
            className="rounded text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="autosave" className="text-sm text-amber-800 ml-1">
            Autosave (every minute)
          </label>
        </div>
        
        {!isUserLoggedIn && (
          <div className="text-xs text-amber-700 bg-amber-100/50 px-2 py-0.5 rounded-md border border-amber-200">
            Login optional during beta
          </div>
        )}
      </div>
    </AnimatedTransition>
  );
};

export default EditorSettings;
