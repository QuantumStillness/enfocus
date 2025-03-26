
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FormatButton from './toolbar/FormatButton';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  Link as LinkIcon
} from 'lucide-react';

interface FormattingToolbarProps {
  onInsertMarkdown: (markdownType: string) => void;
  onInsertPrompt?: (prompt: string) => void;
  onInsertTemplate?: () => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
}

const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  onInsertMarkdown
}) => {
  const formatButtons = [
    { icon: Bold, label: "Bold", action: "bold" },
    { icon: Italic, label: "Italic", action: "italic" },
    { icon: Heading1, label: "Heading 1", action: "h1" },
    { icon: Heading2, label: "Heading 2", action: "h2" },
    { icon: Heading3, label: "Heading 3", action: "h3" },
    { icon: List, label: "List", action: "list" },
    { icon: LinkIcon, label: "Link", action: "link" }
  ];

  return (
    <div className="flex items-center space-x-1 mb-2 p-1 border rounded-md bg-white">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          {formatButtons.map((button) => (
            <FormatButton
              key={button.action}
              icon={button.icon}
              label={button.label}
              onClick={() => onInsertMarkdown(button.action)}
            />
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FormattingToolbar;
