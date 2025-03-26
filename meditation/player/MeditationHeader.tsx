
import React from 'react';
import { MeditationGuide } from "@/types/meditation";

interface MeditationHeaderProps {
  meditation: MeditationGuide;
}

const MeditationHeader = ({ meditation }: MeditationHeaderProps) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-medium">{meditation.title}</h2>
      <p className="text-gray-500 text-sm">{meditation.type} • {meditation.duration} minutes</p>
    </div>
  );
};

export default MeditationHeader;
