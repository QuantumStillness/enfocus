
import { useState } from 'react';
import { templates } from '../templates';

export const useTemplateManager = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateContent, setTemplateContent] = useState("");
  const [templatePreview, setTemplatePreview] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setTemplateContent(template.content);
    setShowTemplateDialog(true);
  };

  const handleSaveTemplate = () => {
    // Create a blob and download the markdown file
    const blob = new Blob([templateContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate || 'template'}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowTemplateDialog(false);
  };

  return {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    templateContent,
    setTemplateContent,
    templatePreview,
    setTemplatePreview,
    showTemplateDialog,
    setShowTemplateDialog,
    handleTemplateSelect,
    handleSaveTemplate
  };
};
