
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, PlusCircle } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  content: string;
  category: 'journal' | 'meditation' | '12week' | 'other';
  createdAt: Date;
}

interface TemplateListProps {
  templates: Template[];
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (id: string) => void;
  onDownloadTemplate: (template: Template) => void;
  onCreateNew: () => void;
  getCategoryBadgeClass: (category: string) => string;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEditTemplate,
  onDeleteTemplate,
  onDownloadTemplate,
  onCreateNew,
  getCategoryBadgeClass
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
        <p className="text-gray-500 mb-4">Create your first template to see it here</p>
        <Button onClick={onCreateNew}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeClass(template.category)}`}>
                {template.category}
              </span>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="h-24 overflow-hidden text-sm opacity-70 font-mono">
              {template.content.substring(0, 150)}
              {template.content.length > 150 && '...'}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => onEditTemplate(template)}>
              Edit
            </Button>
            <div className="space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDeleteTemplate(template.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDownloadTemplate(template)}
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Export
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplateList;
