
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    description: string;
    content: string;
  };
  onSelect: (template: any) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <Card 
      key={template.id} 
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={() => onSelect(template)}
    >
      <CardHeader className="pb-2">
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">
          {template.content.split('\n').slice(0, 2).join(' ')}...
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
          className="w-full"
        >
          Select Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
