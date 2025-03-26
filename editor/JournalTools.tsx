
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  FileText, 
  Heart, 
  Lightbulb, 
  ActivitySquare, 
  Compass, 
  Calendar, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';

interface JournalToolsProps {
  onInsertTemplate?: () => void;
  onInsertPrompt?: (prompt: string) => void;
  onOpenIntentions?: () => void;
  onOpenEnergyBalance?: () => void;
  onOpenMeditation?: () => void;
  onOpenTutorials?: () => void;
  onOpen12WeekTemplates?: () => void;
}

const JournalTools: React.FC<JournalToolsProps> = ({
  onInsertTemplate,
  onInsertPrompt,
  onOpenIntentions,
  onOpenEnergyBalance,
  onOpenMeditation,
  onOpenTutorials,
  onOpen12WeekTemplates
}) => {
  return (
    <div className="mb-4 border-b border-amber-200 pb-4 bg-gradient-to-r from-amber-50/50 to-transparent p-3 rounded-t-md">
      <h3 className="text-sm font-medium text-amber-800 mb-2">Templates & Tools</h3>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {onInsertTemplate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                  onClick={onInsertTemplate}
                >
                  <FileText className="h-4 w-4 text-amber-600" />
                  <span>Template</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-amber-50 border-amber-200 text-amber-900">
                <p>Insert a template for your journal</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onOpenTutorials && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                  onClick={onOpenTutorials}
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Mindfulness</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-amber-50 border-amber-200 text-amber-900">
                <p>Browse mindfulness templates</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onOpen12WeekTemplates && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                  onClick={onOpen12WeekTemplates}
                >
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span>12-Week Year</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-emerald-50 border-emerald-200 text-emerald-900">
                <p>Browse 12-Week Year templates</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onInsertPrompt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                  onClick={() => onInsertPrompt("What am I grateful for today?")}
                >
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span>Gratitude</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-amber-50 border-amber-200 text-amber-900">
                <p>Add a gratitude prompt</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onOpenIntentions && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                  onClick={onOpenIntentions}
                >
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Intentions</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-amber-50 border-amber-200 text-amber-900">
                <p>Set your daily intentions</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onOpenEnergyBalance && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                  onClick={onOpenEnergyBalance}
                >
                  <ActivitySquare className="h-4 w-4 text-emerald-600" />
                  <span>Energy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-emerald-50 border-emerald-200 text-emerald-900">
                <p>Track your energy balance</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {onOpenMeditation && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                  onClick={onOpenMeditation}
                >
                  <Compass className="h-4 w-4 text-emerald-600" />
                  <span>Meditation</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-emerald-50 border-emerald-200 text-emerald-900">
                <p>Add meditation notes</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default JournalTools;
