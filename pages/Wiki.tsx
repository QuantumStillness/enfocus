
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownWiki from '@/components/wiki/MarkdownWiki';
import TwelveWeekWiki from '@/components/wiki/TwelveWeekWiki';
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { BookOpen, Calendar } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const Wiki = () => {
  const [activeTab, setActiveTab] = useState('markdown');
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className={`pt-${isMobile ? '20' : '24'} pb-20`}>
        <AnimatedTransition>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-800 mb-1">Knowledge Wiki</h1>
              <p className="text-gray-500">Reference guides and templates for your personal growth journey</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <Tabs defaultValue="markdown" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-2">
                  <TabsTrigger value="markdown" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Obsidian & Markdown</span>
                  </TabsTrigger>
                  <TabsTrigger value="twelve-week" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>12-Week Year</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="markdown">
                  <MarkdownWiki />
                </TabsContent>
                
                <TabsContent value="twelve-week">
                  <TwelveWeekWiki />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Wiki;
