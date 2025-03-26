
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateCard from './TemplateCard';
import { Heart, Dumbbell, Utensils, Calendar } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface TemplateCategory {
  [key: string]: Template[];
}

interface TemplateTabsProps {
  templates: TemplateCategory;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateTabs: React.FC<TemplateTabsProps> = ({
  templates,
  activeTab,
  onTabChange,
  onSelectTemplate
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="mindfulness" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>Mindfulness</span>
        </TabsTrigger>
        <TabsTrigger value="workoutGoals" className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4" />
          <span>Workout</span>
        </TabsTrigger>
        <TabsTrigger value="mindfulEating" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span>Nutrition</span>
        </TabsTrigger>
        <TabsTrigger value="twelveWeekYear" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>12-Week Year</span>
        </TabsTrigger>
      </TabsList>
      
      {Object.entries(templates).map(([key, templateList]) => (
        <TabsContent key={key} value={key} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templateList.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                onSelect={onSelectTemplate} 
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TemplateTabs;
