
import { toast } from "sonner";

export const useJournalMeditation = (
  content: string, 
  setContent: (content: string) => void
) => {
  const handleInsertMeditationTemplate = (meditationData: {
    title: string;
    type: string;
    duration: number;
    description?: string;
    steps?: string[];
    customNotes?: string;
  }) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    let template = `## Meditation Reflection: ${meditationData.title}

**Type:** ${meditationData.type}
**Duration:** ${meditationData.duration} minutes
**Date:** ${currentDate}
**Time:** ${currentTime}

`;

    // Add description if provided
    if (meditationData.description) {
      template += `### Description
${meditationData.description}

`;
    }

    // Add steps if provided
    if (meditationData.steps && meditationData.steps.length > 0) {
      template += `### Practice Steps
`;
      meditationData.steps.forEach((step, index) => {
        template += `${index + 1}. ${step}
`;
      });
      template += `
`;
    }

    // Add custom notes if provided
    if (meditationData.customNotes) {
      template += `### Custom Notes
${meditationData.customNotes}

`;
    }

    // Add default journal sections
    template += `### Practice Notes
- 
- 

### Insights & Reflections

### How I Feel After
- Physically: 
- Mentally: 
- Emotionally: 

### Integration
How can I apply what I've learned in my daily life?

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
