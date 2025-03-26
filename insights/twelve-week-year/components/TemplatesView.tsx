
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { TemplatesViewProps } from '../types';

const TemplatesView: React.FC<TemplatesViewProps> = ({ templates, onTemplateSelect }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="hover:border-primary/20 transition-colors cursor-pointer"
            onClick={() => onTemplateSelect(template)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="secondary" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesView;
