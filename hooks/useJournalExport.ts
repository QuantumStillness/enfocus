
import { useState } from 'react';
import { toast } from 'sonner';
import { formatForObsidian, generateObsidianFilename } from '@/utils/markdown';
import { journalToMarkdown } from '@/utils/markdownUtils';

export const useJournalExport = () => {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'obsidian'>('markdown');

  const handleDownloadMarkdown = (
    title: string,
    content: string,
    tags: string[] = [],
    chakras: string[] = [],
    currentEmotion: {emotion: string, intensity?: number} | null = null,
    obsidianFormat = false
  ) => {
    if (!title && !content) {
      toast.error("Nothing to download. Please write something first.");
      return;
    }
    
    // Get intentions from localStorage
    const key = `intentions-${new Date().toISOString().split('T')[0]}`;
    const intentionsString = localStorage.getItem(key);
    let intentions;
    
    if (intentionsString) {
      try {
        intentions = JSON.parse(intentionsString);
      } catch (error) {
        console.error("Error parsing intentions:", error);
      }
    }
    
    // Get chakra energy levels from localStorage
    const chakraKey = 'chakra-energy-levels';
    const energyLevelsString = localStorage.getItem(chakraKey);
    let energyLevels;
    
    if (energyLevelsString) {
      try {
        energyLevels = JSON.parse(energyLevelsString);
      } catch (error) {
        console.error("Error parsing energy levels:", error);
      }
    }
    
    // Create markdown content with emotion if available
    let markdownContent = journalToMarkdown(
      title, 
      content,
      intentions,
      energyLevels,
      currentEmotion
    );
    
    // If Obsidian format is requested, add frontmatter
    if (obsidianFormat) {
      const metadata = {
        title: title || `Journal - ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString(),
        tags,
        chakras,
        emotion: currentEmotion?.emotion,
        emotion_intensity: currentEmotion?.intensity
      };
      
      markdownContent = formatForObsidian(markdownContent, metadata);
    }
    
    // Create file name
    const fileName = obsidianFormat 
      ? generateObsidianFilename(title)
      : (title 
          ? `${title.toLowerCase().replace(/\s+/g, '-')}.md` 
          : `journal-entry-${new Date().toISOString().split('T')[0]}.md`);
    
    // Create a blob with the content
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    
    // Create download link and trigger click
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast.success(obsidianFormat 
      ? "Journal entry downloaded in Obsidian format" 
      : "Journal entry downloaded as markdown"
    );
  };

  return {
    exportFormat,
    setExportFormat,
    handleDownloadMarkdown
  };
};

export default useJournalExport;
