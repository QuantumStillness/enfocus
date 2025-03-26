
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicsTab from '@/components/markdown/BasicsTab';
import ExamplesTab from '@/components/markdown/ExamplesTab';
import ObsidianTab from './ObsidianTab';

const MarkdownWiki: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Markdown & Obsidian Wiki</h1>
      
      <Tabs defaultValue="markdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="markdown">Markdown Basics</TabsTrigger>
          <TabsTrigger value="obsidian">Obsidian Usage</TabsTrigger>
          <TabsTrigger value="examples">Examples & Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="markdown">
          <BasicsTab />
        </TabsContent>
        
        <TabsContent value="obsidian">
          <ObsidianTab />
        </TabsContent>
        
        <TabsContent value="examples">
          <ExamplesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarkdownWiki;
