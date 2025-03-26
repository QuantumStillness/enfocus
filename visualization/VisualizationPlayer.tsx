
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Clock } from 'lucide-react';
import { formatTimeFromSeconds } from '@/utils/meditation/timeUtils';
import { Card } from '@/components/ui/card';

interface VisualizationPlayerProps {
  exercise: any;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const VisualizationPlayer: React.FC<VisualizationPlayerProps> = ({
  exercise,
  isPlaying,
  setIsPlaying
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timePerStep, setTimePerStep] = useState(30); // Default 30 seconds per step
  const progressInterval = useRef<number | null>(null);
  const totalSteps = exercise.steps.length;
  
  // Calculate time per step based on exercise duration and number of steps
  const calculatedTimePerStep = Math.round((exercise.duration * 60) / totalSteps);
  
  useEffect(() => {
    // Initialize with the calculated time per step
    setTimePerStep(calculatedTimePerStep || 30);
  }, [exercise, calculatedTimePerStep]);

  // Progress percentage calculation
  const progressPercentage = Math.min(Math.round((progress / timePerStep) * 100), 100);
  
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Start a new interval
      progressInterval.current = window.setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          
          // If we reached the time per step, move to the next step
          if (newProgress >= timePerStep) {
            if (currentStep < totalSteps - 1) {
              setCurrentStep(prevStep => prevStep + 1);
              return 0; // Reset progress for the next step
            } else {
              // End of visualization
              setIsPlaying(false);
              clearInterval(progressInterval.current as number);
              return timePerStep; // Keep progress at maximum
            }
          }
          
          return newProgress;
        });
      }, 1000);
    } else {
      // Clear interval when paused
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentStep, timePerStep, totalSteps, setIsPlaying]);
  
  const handleTimePerStepChange = (values: number[]) => {
    setTimePerStep(values[0]);
    // Reset progress when changing time per step
    setProgress(0);
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Step {currentStep + 1}: {exercise.steps[currentStep]}</h3>
        <p className="text-gray-600">{exercise.stepDescriptions?.[currentStep] || "Focus on this visualization step."}</p>
      </Card>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{formatTimeFromSeconds(progress)}/{formatTimeFromSeconds(timePerStep)}</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant={isPlaying ? "default" : "outline"}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                <span>Play</span>
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="timePerStep" className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Time per step</span>
          </label>
          <span className="text-sm text-gray-500">{timePerStep} seconds</span>
        </div>
        
        <Slider 
          defaultValue={[calculatedTimePerStep]} 
          max={120}
          min={10}
          step={5}
          value={[timePerStep]}
          onValueChange={handleTimePerStepChange}
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

export default VisualizationPlayer;
