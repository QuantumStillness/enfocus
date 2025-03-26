
import React from 'react';
import ContentEditor from './ContentEditor';
import JournalTools from './JournalTools';

interface JournalMainProps {
  title: string;
  content: string;
  preview: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onInsertMarkdown: (markdownType: string) => void;
  onInsertPrompt?: (prompt: string) => void;
  onInsertTemplate?: () => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
  onOpenTutorials?: () => void;
  onOpen12WeekTemplates?: () => void;
}

const JournalMain: React.FC<JournalMainProps> = ({
  title,
  content,
  preview,
  onTitleChange,
  onContentChange,
  onInsertMarkdown,
  onInsertPrompt,
  onInsertTemplate,
  onOpenIntentions,
  onOpenEnergyBalance,
  onOpenMeditation,
  onOpenTutorials,
  onOpen12WeekTemplates
}) => {
  return (
    <div className="space-y-6">
      {/* Add JournalTools component */}
      <JournalTools
        onInsertTemplate={onInsertTemplate}
        onInsertPrompt={onInsertPrompt}
        onOpenIntentions={onOpenIntentions}
        onOpenEnergyBalance={onOpenEnergyBalance}
        onOpenMeditation={onOpenMeditation}
        onOpenTutorials={onOpenTutorials}
        onOpen12WeekTemplates={onOpen12WeekTemplates}
      />
      
      <ContentEditor
        title={title}
        content={content}
        preview={preview}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        onInsertMarkdown={onInsertMarkdown}
      />
    </div>
  );
};

export default JournalMain;
