
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IntentionsDialogProps } from '../types';
import { useDialogState } from '@/hooks/useDialogState';

const IntentionsDialog: React.FC<IntentionsDialogProps> = ({
  open,
  onOpenChange,
  intentions,
  onIntentionsChange,
  onSave
}) => {
  const dialogState = useDialogState();
  
  // Sync with parent component's open state
  React.useEffect(() => {
    dialogState.setIsOpen(open);
  }, [open, dialogState.setIsOpen]);

  // Sync parent component with our open state
  React.useEffect(() => {
    if (dialogState.isOpen !== open) {
      onOpenChange(dialogState.isOpen);
    }
  }, [dialogState.isOpen, onOpenChange, open]);
  
  const handleSave = () => {
    onSave();
    dialogState.close();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            12-Week Year Intentions
          </DialogTitle>
          <DialogDescription>
            Set your intentions and capture your "why" for this 12-week period.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Textarea
            className="min-h-[300px]"
            placeholder="Write your 12-week year intentions, goals, and vision here..."
            value={intentions}
            onChange={(e) => onIntentionsChange(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Intentions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntentionsDialog;
