
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import JournalHeader from './JournalHeader';
import ContentEditor from './ContentEditor';
import { useToast } from "@/hooks/use-toast";

interface FullScreenJournalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  preview: boolean;
  saving: boolean;
  user: any;
  onNewEntry: () => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onInsertMarkdown: (markdownType: string) => void;
  onExportMarkdown: () => void;
  onExportObsidian: () => void;
  selectedTutorial: any;
  setSelectedTutorial: (tutorial: any) => void;
  handleInsertTutorial: (index: number) => void;
}

const FullScreenJournal: React.FC<FullScreenJournalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  preview,
  saving,
  user,
  onNewEntry,
  onPreviewToggle,
  onSave,
  onTitleChange,
  onContentChange,
  onInsertMarkdown,
  onExportMarkdown,
  onExportObsidian,
  selectedTutorial,
  setSelectedTutorial,
  handleInsertTutorial
}) => {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Full Screen Journal</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <JournalHeader
            title={title}
            preview={preview}
            saving={saving}
            user={user}
            selectedTutorial={selectedTutorial}
            onNewEntry={onNewEntry}
            onPreviewToggle={onPreviewToggle}
            onSave={onSave}
            setSelectedTutorial={setSelectedTutorial}
            handleInsertTutorial={handleInsertTutorial}
            onExportMarkdown={onExportMarkdown}
            onExportObsidian={onExportObsidian}
          />
          
          <div className="mt-6">
            <ContentEditor
              title={title}
              content={content}
              preview={preview}
              onTitleChange={onTitleChange}
              onContentChange={onContentChange}
              onInsertMarkdown={onInsertMarkdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenJournal;
