
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MarkdownPreview from '@/components/editor/MarkdownPreview';
import { TemplateDialogProps } from '../types';
import { templates } from '../templates';

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  selectedTemplate,
  templateContent,
  onContentChange,
  onSaveTemplate,
  templatePreview,
  onTogglePreview
}) => {
  const templateTitle = templates.find(t => t.id === selectedTemplate)?.title || '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{templateTitle}</DialogTitle>
          <DialogDescription>
            Edit this template for your needs, then save it as a markdown file.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-end space-x-2 mb-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onTogglePreview}
            >
              {templatePreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
          
          {templatePreview ? (
            <div className="border rounded-md p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
              <MarkdownPreview content={templateContent} />
            </div>
          ) : (
            <Textarea
              className="min-h-[400px] font-mono"
              value={templateContent}
              onChange={(e) => onContentChange(e.target.value)}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSaveTemplate}>
            Download as Markdown
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
