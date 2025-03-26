
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JournalEntry } from './types';
import { getFormattedDate, getChakraColor } from './utils';

interface EntryDetailDialogProps {
  entry: JournalEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEntryClick: (entryId: number) => void;
}

const EntryDetailDialog: React.FC<EntryDetailDialogProps> = ({
  entry,
  open,
  onOpenChange,
  onEntryClick,
}) => {
  // Function to replace markdown content with HTML
  const formatContent = (content: string) => {
    // Replace headings
    let formatted = content.replace(/#{1,6}\s(.*?)$/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>');
    
    // Replace bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace line breaks with paragraphs
    formatted = formatted.split('\n\n').map(p => `<p class="mb-3">${p}</p>`).join('');
    
    return formatted;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{entry.title}</DialogTitle>
          <p className="text-sm text-gray-500">{getFormattedDate(entry.date)}</p>
        </DialogHeader>
        
        <div className="flex flex-wrap gap-2 my-2">
          {entry.chakras && entry.chakras.map((chakra) => (
            <span 
              key={chakra} 
              className={`px-2 py-1 text-xs rounded-full ${getChakraColor(chakra)}`}
            >
              {chakra}
            </span>
          ))}
        </div>
        
        <Separator className="my-2" />
        
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: formatContent(entry.content) }} 
        />
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {entry.tags && entry.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  onOpenChange(false);
                  // Here we would normally filter by tag
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EntryDetailDialog;
