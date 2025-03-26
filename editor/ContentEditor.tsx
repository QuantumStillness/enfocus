
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import FormattingToolbar from './FormattingToolbar';
import MarkdownPreview from './MarkdownPreview';
import AnimatedTransition from '../AnimatedTransition';

interface ContentEditorProps {
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
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
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
  onOpenMeditation
}) => {
  return (
    <>
      <AnimatedTransition delay={50}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter a title for your journal entry..."
            className="w-full"
          />
        </div>
      </AnimatedTransition>
      
      <AnimatedTransition delay={100}>
        {!preview && (
          <FormattingToolbar 
            onInsertMarkdown={onInsertMarkdown}
            onInsertPrompt={onInsertPrompt}
            onInsertTemplate={onInsertTemplate}
            onOpenIntentions={onOpenIntentions}
            onOpenEnergyBalance={onOpenEnergyBalance}
            onOpenMeditation={onOpenMeditation}
          />
        )}
        <div className="editor-container" style={{ minHeight: '400px' }}>
          {preview ? (
            <MarkdownPreview content={content} />
          ) : (
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Begin writing here... Use markdown formatting for headings (#), bold (**), italic (*), and lists (*)."
              className="w-full h-full min-h-[350px] resize-none border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          )}
        </div>
      </AnimatedTransition>
    </>
  );
};

export default ContentEditor;
