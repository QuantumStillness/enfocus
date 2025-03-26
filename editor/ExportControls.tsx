
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ExportControlsProps {
  onExportMarkdown: () => void;
  onExportObsidian: () => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({
  onExportMarkdown,
  onExportObsidian
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onExportMarkdown}>
          Download as Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportObsidian}>
          Export to Obsidian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportControls;
