
import React, { useState } from 'react';
import EmotionWheel from './EmotionWheel';
import { Button } from '@/components/ui/button';
import { Heart, Gauge, Sparkles, BookOpen } from 'lucide-react';
import IntentionDialog from '../intentions/IntentionDialog';
import EnergyBalanceDialog from '../chakra/EnergyBalanceDialog';
import MeditationTemplatesDialog from '../meditation/MeditationTemplatesDialog';

interface EmotionSectionProps {
  currentEmotion: {emotion: string, intensity?: number} | null;
  onEmotionSelect: (emotion: string, intensity?: number) => void;
  onIntentionApply?: (intention: string, gratitude: string, affirmation: string) => void;
  onEnergyBalanceApply?: (chakras: Record<string, number[]>) => void;
  onInsertMeditationTemplate?: (meditation: any) => void;
}

const EmotionSection: React.FC<EmotionSectionProps> = ({ 
  currentEmotion,
  onEmotionSelect,
  onIntentionApply,
  onEnergyBalanceApply,
  onInsertMeditationTemplate
}) => {
  const [intentionDialogOpen, setIntentionDialogOpen] = useState(false);
  const [energyDialogOpen, setEnergyDialogOpen] = useState(false);
  const [meditationDialogOpen, setMeditationDialogOpen] = useState(false);

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-800">Journal Tools</h3>
        
        {currentEmotion && (
          <div className="text-xs text-gray-500">
            Current emotion: <span className="font-medium">{currentEmotion.emotion}</span>
            {currentEmotion.intensity && <span> (Intensity: {currentEmotion.intensity}/10)</span>}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <EmotionWheel 
          onEmotionSelect={onEmotionSelect}
        />
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setIntentionDialogOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          <span>Set Intention</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setEnergyDialogOpen(true)}
        >
          <Gauge className="h-4 w-4" />
          <span>Energy Balance</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setMeditationDialogOpen(true)}
        >
          <BookOpen className="h-4 w-4" />
          <span>Meditation</span>
        </Button>
      </div>
      
      <IntentionDialog 
        open={intentionDialogOpen} 
        onOpenChange={setIntentionDialogOpen} 
        onIntentionSet={onIntentionApply}
      />
      
      <EnergyBalanceDialog 
        open={energyDialogOpen} 
        onOpenChange={setEnergyDialogOpen}
        onEnergySet={onEnergyBalanceApply}
      />
      
      <MeditationTemplatesDialog
        open={meditationDialogOpen}
        onOpenChange={setMeditationDialogOpen}
        onMeditationSelect={onInsertMeditationTemplate}
      />
    </div>
  );
};

export default EmotionSection;
