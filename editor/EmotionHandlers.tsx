
import React from 'react';
import { toast } from "sonner";

interface EmotionHandlersProps {
  content: string;
  setContent: (content: string) => void;
  setCurrentEmotion: (emotion: {emotion: string, intensity?: number} | null) => void;
}

export const useEmotionHandlers = ({
  content,
  setContent,
  setCurrentEmotion
}: EmotionHandlersProps) => {
  const handleEmotionSelect = (emotion: string, intensity?: number) => {
    setCurrentEmotion({ emotion, intensity });
    
    // Optionally add emotion to journal content
    if (!content.includes(`**Emotion:** ${emotion}`)) {
      const emotionText = intensity 
        ? `**Emotion:** ${emotion} (Intensity: ${intensity}/10)\n\n` 
        : `**Emotion:** ${emotion}\n\n`;
      
      if (content.trim() === '') {
        setContent(emotionText);
      } else {
        setContent(emotionText + content);
      }
    }
  };

  return { handleEmotionSelect };
};

export default useEmotionHandlers;
