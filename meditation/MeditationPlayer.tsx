
import React from 'react';
import { MeditationPlayerProps } from './types';
import {
  StepDisplay,
  ProgressIndicator,
  PlayerControls,
  MeditationHeader,
  usePlayer
} from './player';

const MeditationPlayer = ({ meditation, onClose }: MeditationPlayerProps) => {
  const {
    currentStep,
    isPlaying,
    setIsPlaying,
    progress,
    progressPercentage,
    timePerStep,
    handleTimePerStepChange,
    handleNext,
    handlePrevious,
    totalSteps,
    calculatedTimePerStep
  } = usePlayer({ meditation });
  
  return (
    <div className="space-y-6">
      <MeditationHeader meditation={meditation} />
      
      <StepDisplay 
        meditation={meditation} 
        currentStep={currentStep} 
      />
      
      <ProgressIndicator
        progress={progress}
        progressPercentage={progressPercentage}
        currentStep={currentStep}
        totalSteps={totalSteps}
        timePerStep={timePerStep}
        calculatedTimePerStep={calculatedTimePerStep}
        onTimePerStepChange={handleTimePerStepChange}
      />
      
      <PlayerControls
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === totalSteps - 1}
      />
    </div>
  );
};

export default MeditationPlayer;
