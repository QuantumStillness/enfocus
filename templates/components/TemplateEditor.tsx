
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TemplateEditorProps {
  selectedTemplate: {
    title: string;
    description: string;
  };
  templateContent: string;
  setTemplateContent: (content: string) => void;
  onBackToTemplates: () => void;
  onApplyTemplate: () => void;
  previewMode: boolean;
  togglePreview: () => void;
  previewComponent: React.ReactNode;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  selectedTemplate,
  templateContent,
  setTemplateContent,
  onBackToTemplates,
  onApplyTemplate,
  previewMode,
  togglePreview,
  previewComponent
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBackToTemplates}>
          Back to Templates
        </Button>
        <Button variant="outline" onClick={togglePreview}>
          {previewMode ? 'Edit' : 'Preview'}
        </Button>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{selectedTemplate.title}</h3>
      <p className="text-gray-500 mb-4">{selectedTemplate.description}</p>
      
      {previewMode ? (
        <div className="border rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
          {previewComponent}
        </div>
      ) : (
        <Textarea
          value={templateContent}
          onChange={(e) => setTemplateContent(e.target.value)}
          className="min-h-[300px] font-mono"
        />
      )}
      
      <div className="flex justify-end mt-4">
        <Button onClick={onApplyTemplate}>
          Apply Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateEditor;
