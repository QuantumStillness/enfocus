
import React from 'react';
import { Button } from "@/components/ui/button";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const PlayerControls = ({
  isPlaying,
  onPlayToggle,
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={isFirstStep}>
        Previous
      </Button>
      <Button 
        variant={isPlaying ? "destructive" : "default"}
        onClick={onPlayToggle}
      >
        {isPlaying ? "Pause" : "Start"}
      </Button>
      <Button variant="outline" onClick={onNext} disabled={isLastStep}>
        Next
      </Button>
    </div>
  );
};

export default PlayerControls;
