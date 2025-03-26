
import React from 'react';
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Layout } from "lucide-react";

interface JournalHeaderControlsProps {
  onFullScreen?: () => void;
}

const JournalHeaderControls: React.FC<JournalHeaderControlsProps> = ({
  onFullScreen
}) => {
  if (!onFullScreen) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onFullScreen}>
            <Layout className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Full Screen</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default JournalHeaderControls;
