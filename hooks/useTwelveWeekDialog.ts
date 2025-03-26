
import { useState } from 'react';
import { useDialogState } from './useDialogState';
import { templates } from '@/components/insights/twelve-week-year/templates';

export function useTwelveWeekDialog(onTemplateSelect: (content: string) => void) {
  const { isOpen, setIsOpen, open, close } = useDialogState();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [templateContent, setTemplateContent] = useState(templates[0].content);
  const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleSelectTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setTemplateContent(template.content);
    setViewMode('edit');
  };
  
  const handleApplyTemplate = () => {
    onTemplateSelect(templateContent);
    setIsOpen(false);
  };
  
  const handleBackToList = () => {
    setViewMode('list');
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    selectedTemplate,
    templateContent,
    setTemplateContent,
    viewMode,
    previewMode,
    handleSelectTemplate,
    handleApplyTemplate,
    handleBackToList,
    togglePreview
  };
}
