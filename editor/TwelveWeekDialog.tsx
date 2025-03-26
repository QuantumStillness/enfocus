
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from './MarkdownPreview';
import { useIsMobile } from "@/hooks/use-mobile";
import { useTwelveWeekDialog } from '@/hooks/useTwelveWeekDialog';
import { templates } from '@/components/insights/twelve-week-year/templates';
import { BookOpen, Calendar } from 'lucide-react';
import { useMarkdownNotes } from '@/hooks/useMarkdownNotes';
import MarkdownNotes from '../notes/MarkdownNotes';

interface TwelveWeekDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateSelect: (content: string) => void;
}

const TwelveWeekDialog: React.FC<TwelveWeekDialogProps> = ({
  open,
  onOpenChange,
  onTemplateSelect
}) => {
  const dialog = useTwelveWeekDialog(onTemplateSelect);
  const isMobile = useIsMobile();
  const { notesOpen, openNotes, closeNotes, initialWeek } = useMarkdownNotes();
  
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
  
  const handleOpenNotes = () => {
    // Extract week number from the template title if possible
    if (dialog.selectedTemplate?.title) {
      const weekMatch = dialog.selectedTemplate.title.match(/Week (\d+)/i);
      if (weekMatch && weekMatch[1]) {
        const weekNumber = parseInt(weekMatch[1], 10);
        openNotes(weekNumber);
        return;
      }
    }
    openNotes();
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw]' : 'sm:max-w-[700px]'} max-h-[80vh] overflow-auto`}>
          <DialogHeader>
            <DialogTitle>12-Week Year Templates</DialogTitle>
          </DialogHeader>
          
          {dialog.viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => dialog.handleSelectTemplate(template)}
                >
                  <h3 className="font-medium text-lg">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {template.tags.map(tag => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={dialog.handleBackToList}>
                  Back to Templates
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleOpenNotes}
                    className="flex items-center gap-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Notes</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={dialog.togglePreview}
                  >
                    {dialog.previewMode ? 'Edit' : 'Preview'}
                  </Button>
                </div>
              </div>
              
              <h3 className="font-medium text-lg">{dialog.selectedTemplate.title}</h3>
              
              {dialog.previewMode ? (
                <div className="border rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                  <MarkdownPreview content={dialog.templateContent} />
                </div>
              ) : (
                <Textarea
                  value={dialog.templateContent}
                  onChange={(e) => dialog.setTemplateContent(e.target.value)}
                  className="min-h-[300px] font-mono"
                />
              )}
            </div>
          )}
          
          <DialogFooter>
            {dialog.viewMode === 'list' ? (
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            ) : (
              <div className={`flex ${isMobile ? 'flex-col w-full gap-2' : 'gap-2'}`}>
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className={isMobile ? 'w-full' : ''}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={dialog.handleApplyTemplate}
                  className={isMobile ? 'w-full' : ''}
                >
                  Use Template
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <MarkdownNotes 
        open={notesOpen} 
        onOpenChange={closeNotes}
        initialWeek={initialWeek}
      />
    </>
  );
};

export default TwelveWeekDialog;
