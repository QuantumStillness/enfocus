
import React from 'react';
import { toast } from "sonner";

interface MeditationHandlersProps {
  content: string;
  setContent: (content: string) => void;
}

export const useMeditationHandlers = ({
  content,
  setContent
}: MeditationHandlersProps) => {
  const handleInsertMeditationTemplate = (meditationData: any) => {
    const template = `## Meditation Reflection: ${meditationData.title}

**Type:** ${meditationData.type}
**Duration:** ${meditationData.duration} minutes
**Date:** ${new Date().toLocaleDateString()}

### Practice Notes
- 
- 

### Insights & Reflections

### How I Feel After

`;
    
    // Add the template to the content
    if (content.trim() === '') {
      setContent(template);
    } else {
      setContent(content + '\n\n' + template);
    }
    
    toast.success(`Added meditation template for ${meditationData.title}`);
  };

  return { handleInsertMeditationTemplate };
};

export default useMeditationHandlers;
