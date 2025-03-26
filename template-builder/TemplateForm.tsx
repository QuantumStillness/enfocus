
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Eye, Save } from 'lucide-react';
import MarkdownPreview from "@/components/editor/MarkdownPreview";

interface TemplateFormProps {
  title: string;
  content: string;
  category: 'journal' | 'meditation' | '12week' | 'other';
  previewMode: boolean;
  selectedTemplate: any | null;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCategoryChange: (category: 'journal' | 'meditation' | '12week' | 'other') => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  title,
  content,
  category,
  previewMode,
  selectedTemplate,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  onPreviewToggle,
  onSave,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Template Details</h3>
        <Input
          placeholder="Template Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={category === 'journal' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('journal')}
            size="sm"
          >
            Journal
          </Button>
          <Button
            variant={category === 'meditation' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('meditation')}
            size="sm"
          >
            Meditation
          </Button>
          <Button
            variant={category === '12week' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('12week')}
            size="sm"
          >
            12-Week Year
          </Button>
          <Button
            variant={category === 'other' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('other')}
            size="sm"
          >
            Other
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Template Content</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreviewToggle}
            className="flex items-center gap-1"
          >
            {previewMode ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{previewMode ? 'Edit' : 'Preview'}</span>
          </Button>
        </div>
        
        {previewMode ? (
          <div className="border rounded-md p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
            <MarkdownPreview content={content} />
          </div>
        ) : (
          <Textarea
            placeholder="Enter your template content using Markdown..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[300px] max-h-[500px] font-mono"
          />
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          {selectedTemplate ? 'Update Template' : 'Save Template'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateForm;
