
import React from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AddEventDialogProps } from '../types';
import { useDialogState } from '@/hooks/useDialogState';

const AddEventDialog: React.FC<AddEventDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedDay, 
  onAddEvent 
}) => {
  const dialogState = useDialogState();
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");

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

  const handleSubmit = () => {
    if (!eventTitle) return;
    
    onAddEvent(eventTitle, eventDescription);
    setEventTitle("");
    setEventDescription("");
    dialogState.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedDay && `Add Event for ${format(selectedDay, 'MMMM d, yyyy')}`}
          </DialogTitle>
          <DialogDescription>
            Create a new event or task for this day.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Event Title</label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              placeholder="Add details about this event"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
