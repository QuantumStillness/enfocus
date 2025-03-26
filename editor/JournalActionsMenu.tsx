
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { BookOpen, Calendar, Download, FileDown, MoreHorizontal, PenTool, Sparkles, Gauge } from "lucide-react";

interface JournalActionsMenuProps {
  onExportMarkdown: () => void;
  onExportObsidian: () => void;
  onOpenTutorials: () => void;
  onOpen12WeekTemplates: () => void;
  onEmotionClick?: () => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
}

const JournalActionsMenu: React.FC<JournalActionsMenuProps> = ({
  onExportMarkdown,
  onExportObsidian,
  onOpenTutorials,
  onOpen12WeekTemplates,
  onEmotionClick,
  onOpenIntentions,
  onOpenEnergyBalance,
  onOpenMeditation
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Export options */}
        <DropdownMenuLabel>Export</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onExportMarkdown}>
            <FileDown className="mr-2 h-4 w-4" />
            Export as Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportObsidian}>
            <Download className="mr-2 h-4 w-4" />
            Export for Obsidian
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {/* Templates and Tools */}
        <DropdownMenuLabel>Templates</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onOpenTutorials}>
            <Sparkles className="mr-2 h-4 w-4" />
            Mindfulness Templates
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpen12WeekTemplates}>
            <Calendar className="mr-2 h-4 w-4" />
            12-Week Year Templates
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {/* Mindfulness Tools */}
        <DropdownMenuLabel>Mindfulness Tools</DropdownMenuLabel>
        <DropdownMenuGroup>
          {onEmotionClick && (
            <DropdownMenuItem onClick={onEmotionClick}>
              <PenTool className="mr-2 h-4 w-4" />
              Track Emotion
            </DropdownMenuItem>
          )}
          {onOpenIntentions && (
            <DropdownMenuItem onClick={onOpenIntentions}>
              <Sparkles className="mr-2 h-4 w-4" />
              Set Intentions
            </DropdownMenuItem>
          )}
          {onOpenEnergyBalance && (
            <DropdownMenuItem onClick={onOpenEnergyBalance}>
              <Gauge className="mr-2 h-4 w-4" />
              Energy Balance
            </DropdownMenuItem>
          )}
          {onOpenMeditation && (
            <DropdownMenuItem onClick={onOpenMeditation}>
              <BookOpen className="mr-2 h-4 w-4" />
              Meditation Notes
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JournalActionsMenu;
