import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreHorizontal } from 'lucide-react';

interface MoreOptionsMenuProps {
  onInsertTemplate?: () => void;
  onInsertPrompt?: (prompt: string) => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
}

// This component is now deprecated as we've moved these actions to direct buttons
// Keeping it for backward compatibility
const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({
  onInsertTemplate,
  onInsertPrompt,
  onOpenIntentions,
  onOpenEnergyBalance,
  onOpenMeditation
}) => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More Options</p>
        </TooltipContent>
      </Tooltip>
      
      <DropdownMenuContent className="w-48">
        {onInsertTemplate && (
          <DropdownMenuItem onClick={onInsertTemplate}>
            Insert Template
          </DropdownMenuItem>
        )}
        
        {onInsertPrompt && (
          <DropdownMenuItem onClick={() => onInsertPrompt("What am I grateful for today?")}>
            Insert Gratitude Prompt
          </DropdownMenuItem>
        )}
        
        {onOpenIntentions && (
          <DropdownMenuItem onClick={onOpenIntentions}>
            Set Daily Intentions
          </DropdownMenuItem>
        )}
        
        {onOpenEnergyBalance && (
          <DropdownMenuItem onClick={onOpenEnergyBalance}>
            Energy Balance Check
          </DropdownMenuItem>
        )}
        
        {onOpenMeditation && (
          <DropdownMenuItem onClick={onOpenMeditation}>
            Meditation Notes
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptionsMenu;
