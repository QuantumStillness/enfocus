
import React from 'react';
import { MeditationGuide } from "@/types/meditation";

interface StepDisplayProps {
  meditation: MeditationGuide;
  currentStep: number;
}

const StepDisplay = ({ meditation, currentStep }: StepDisplayProps) => {
  return (
    <div className="h-[240px] flex flex-col items-center justify-center border border-gray-100 rounded-lg p-8 bg-gray-50">
      <p className="text-lg text-center animate-scale-in">
        {meditation.steps[currentStep]}
      </p>
    </div>
  );
};

export default StepDisplay;
