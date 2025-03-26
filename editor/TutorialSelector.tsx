
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { mindfulnessTutorials } from '@/data/journalData';

interface TutorialSelectorProps {
  onSelectTutorial: (tutorialIndex: number) => void;
}

const TutorialSelector: React.FC<TutorialSelectorProps> = ({ onSelectTutorial }) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Mindfulness Journal Templates</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <p className="text-sm text-muted-foreground">
          Select a mindfulness template to use as a starting point for your journal entry.
          Each template includes markdown formatting to help structure your reflection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mindfulnessTutorials.map((tutorial, idx) => (
            <Button 
              key={idx} 
              variant="outline" 
              className="h-auto py-3 px-4 justify-start text-left flex flex-col items-start"
              onClick={() => onSelectTutorial(idx)}
            >
              <span className="font-medium">{tutorial.title}</span>
              <span className="text-xs text-muted-foreground mt-1">
                Click to use this template
              </span>
            </Button>
          ))}
        </div>
      </div>
      <DialogClose asChild>
        <Button type="button" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
};

export default TutorialSelector;
