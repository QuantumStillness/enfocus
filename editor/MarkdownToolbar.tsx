
import React from 'react';
import FormattingToolbar from './FormattingToolbar';

interface MarkdownToolbarProps {
  onInsertMarkdown: (markdownType: string) => void;
  onInsertPrompt?: (prompt: string) => void;
  onInsertTemplate?: () => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ 
  onInsertMarkdown
}) => {
  return (
    <FormattingToolbar 
      onInsertMarkdown={onInsertMarkdown}
    />
  );
};

export default MarkdownToolbar;
