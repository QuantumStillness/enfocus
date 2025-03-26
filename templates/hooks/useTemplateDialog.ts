
import { useState } from 'react';
import { toast } from "sonner";
import { Template } from '../data/templateData';

export const useTemplateDialog = (onTemplateSelect: (template: string) => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mindfulness');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateContent, setTemplateContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setTemplateContent(template.content);
    setPreviewMode(false);
  };
  
  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
  };
  
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect(templateContent);
      setIsOpen(false);
      toast.success(`${selectedTemplate.title} template applied`);
    }
  };
  
  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    selectedTemplate,
    setSelectedTemplate,
    templateContent,
    setTemplateContent,
    previewMode,
    setPreviewMode,
    handleTabChange,
    handleSelectTemplate,
    handleBackToTemplates,
    togglePreview,
    handleApplyTemplate
  };
};
