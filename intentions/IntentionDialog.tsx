
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import IntentionForm from './IntentionForm';
import { useIntentionDialog } from '@/hooks/useIntentionDialog';

interface IntentionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIntentionSet?: (intention: string, gratitude: string, affirmation: string) => void;
}

const IntentionDialog: React.FC<IntentionDialogProps> = ({
  open,
  onOpenChange,
  onIntentionSet
}) => {
  const dialog = useIntentionDialog(onIntentionSet);
  
  // Sync with parent component's open state
  React.useEffect(() => {
    dialog.setIsOpen(open);
  }, [open, dialog.setIsOpen]);

  // Sync parent component with our open state
  React.useEffect(() => {
    if (dialog.isOpen !== open) {
      onOpenChange(dialog.isOpen);
    }
  }, [dialog.isOpen, onOpenChange, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Set Your Intentions</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <IntentionForm
            intention={dialog.intention}
            gratitude={dialog.gratitude}
            affirmation={dialog.affirmation}
            setIntention={dialog.setIntention}
            setGratitude={dialog.setGratitude}
            setAffirmation={dialog.setAffirmation}
            handleSave={dialog.handleSave}
            saving={dialog.saving}
            isAuthenticated={dialog.isAuthenticated}
            compact={false}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={dialog.handleSave} disabled={dialog.saving}>
            {dialog.saving ? 'Saving...' : 'Apply to Journal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntentionDialog;
