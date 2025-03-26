
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen } from 'lucide-react';

interface TemplateControlsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TemplateControls: React.FC<TemplateControlsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="create" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Create Template</span>
        </TabsTrigger>
        <TabsTrigger value="browse" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Browse Templates</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TemplateControls;
