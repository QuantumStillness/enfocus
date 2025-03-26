
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownPreview from "@/components/editor/MarkdownPreview";
import { useToast } from "@/hooks/use-toast";
import { MeditationNotesProps } from './types';
import { AudioGenerator, NotesEditor, useNotes } from './notes';

const MeditationNotes: React.FC<MeditationNotesProps> = ({ meditation }) => {
  const { notes, setNotes, activeTab, setActiveTab, handleSave } = useNotes(meditation);
  const { toast } = useToast();
  
  const onSave = () => {
    const saved = handleSave();
    if (saved) {
      toast({
        title: "Notes Saved",
        description: "Your meditation notes have been saved."
      });
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <Tabs 
        defaultValue="edit" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="flex-1 flex flex-col h-[calc(100%-40px)]">
          <NotesEditor 
            notes={notes}
            onChange={setNotes}
            onSave={onSave}
            meditationId={meditation.id}
            meditationTitle={meditation.title}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 overflow-auto h-[calc(100%-40px)] border rounded-md p-4">
          <MarkdownPreview content={notes} />
        </TabsContent>
        
        <TabsContent value="audio" className="flex-1 overflow-auto h-[calc(100%-40px)] border rounded-md p-4">
          <AudioGenerator notes={notes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeditationNotes;
