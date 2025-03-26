
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Heart, Dumbbell, Utensils, Calendar } from 'lucide-react';
import MarkdownPreview from '../editor/MarkdownPreview';
import TemplateTabs from './components/TemplateTabs';
import TemplateEditor from './components/TemplateEditor';
import { useTemplateDialog } from './hooks/useTemplateDialog';
import { templates } from './data/templateData';

interface TemplateMenuProps {
  onSelectTemplate: (template: string) => void;
}

const TemplateMenu: React.FC<TemplateMenuProps> = ({ onSelectTemplate }) => {
  const templateDialog = useTemplateDialog(onSelectTemplate);
  
  return (
    <Dialog open={templateDialog.isOpen} onOpenChange={templateDialog.setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Templates
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-50">
          <DropdownMenuItem onSelect={() => {
            templateDialog.setActiveTab('mindfulness');
            templateDialog.setIsOpen(true);
          }}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Mindfulness</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {
            templateDialog.setActiveTab('workoutGoals');
            templateDialog.setIsOpen(true);
          }}>
            <Dumbbell className="mr-2 h-4 w-4" />
            <span>Workout Goals</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {
            templateDialog.setActiveTab('mindfulEating');
            templateDialog.setIsOpen(true);
          }}>
            <Utensils className="mr-2 h-4 w-4" />
            <span>Mindful Eating</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {
            templateDialog.setActiveTab('twelveWeekYear');
            templateDialog.setIsOpen(true);
          }}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>12-Week Year</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        
        {templateDialog.selectedTemplate ? (
          <TemplateEditor 
            selectedTemplate={templateDialog.selectedTemplate}
            templateContent={templateDialog.templateContent}
            setTemplateContent={templateDialog.setTemplateContent}
            onBackToTemplates={templateDialog.handleBackToTemplates}
            onApplyTemplate={templateDialog.handleApplyTemplate}
            previewMode={templateDialog.previewMode}
            togglePreview={templateDialog.togglePreview}
            previewComponent={<MarkdownPreview content={templateDialog.templateContent} />}
          />
        ) : (
          <TemplateTabs 
            templates={templates}
            activeTab={templateDialog.activeTab}
            onTabChange={templateDialog.handleTabChange}
            onSelectTemplate={templateDialog.handleSelectTemplate}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateMenu;
