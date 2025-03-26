
import { useState, useEffect, useRef } from 'react';
import { MeditationGuide } from "@/types/meditation";

interface UsePlayerProps {
  meditation: MeditationGuide;
}

export const usePlayer = ({ meditation }: UsePlayerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timePerStep, setTimePerStep] = useState(30); // Default 30 seconds per step
  const progressInterval = useRef<number | null>(null);
  const totalSteps = meditation.steps.length;
  
  // Calculate time per step based on meditation duration and number of steps
  const calculatedTimePerStep = Math.round((meditation.duration * 60) / totalSteps);
  
  useEffect(() => {
    // Initialize with the calculated time per step
    setTimePerStep(calculatedTimePerStep);
  }, [meditation, calculatedTimePerStep]);

  // Progress percentage calculation
  const progressPercentage = Math.min(Math.round((progress / timePerStep) * 100), 100);
  
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Set initial progress
      setProgress(0);
      
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
              // End of meditation
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
  }, [isPlaying, currentStep, timePerStep, totalSteps]);
  
  const handleTimePerStepChange = (value: number) => {
    setTimePerStep(value);
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
  
  return {
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
  };
};
