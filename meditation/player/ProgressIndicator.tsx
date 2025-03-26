
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { formatTimeFromSeconds } from '@/utils/meditation/timeUtils';

interface ProgressIndicatorProps {
  progress: number;
  progressPercentage: number;
  currentStep: number;
  totalSteps: number;
  timePerStep: number;
  calculatedTimePerStep: number;
  onTimePerStepChange: (value: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  progressPercentage,
  currentStep,
  totalSteps,
  timePerStep,
  calculatedTimePerStep,
  onTimePerStepChange
}) => {
  const handleSliderChange = (values: number[]) => {
    onTimePerStepChange(values[0]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{formatTimeFromSeconds(progress)}/{formatTimeFromSeconds(timePerStep)}</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="timePerStep" className="text-sm font-medium">
            Time per step
          </label>
          <span className="text-sm text-gray-500">{timePerStep} seconds</span>
        </div>
        
        <Slider 
          defaultValue={[calculatedTimePerStep]} 
          max={120}
          min={10}
          step={5}
          value={[timePerStep]}
          onValueChange={handleSliderChange}
          id="timePerStep"
        />
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>10s</span>
          <span>30s</span>
          <span>60s</span>
          <span>90s</span>
          <span>120s</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
