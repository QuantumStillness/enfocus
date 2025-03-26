
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface EmotionWheelProps {
  onEmotionSelect: (emotion: string, intensity?: number) => void;
  className?: string;
}

type EmotionCategory = {
  name: string;
  color: string;
  emotions: string[];
};

const emotionCategories: EmotionCategory[] = [
  {
    name: 'Joy',
    color: 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
    emotions: ['Happy', 'Content', 'Ecstatic', 'Pleased', 'Satisfied', 'Proud', 'Optimistic']
  },
  {
    name: 'Love',
    color: 'bg-red-100 border-red-400 hover:bg-red-200',
    emotions: ['Affectionate', 'Connected', 'Intimate', 'Grateful', 'Tender', 'Compassionate']
  },
  {
    name: 'Fear',
    color: 'bg-purple-100 border-purple-400 hover:bg-purple-200',
    emotions: ['Scared', 'Anxious', 'Insecure', 'Worried', 'Nervous', 'Panicked', 'Overwhelmed']
  },
  {
    name: 'Anger',
    color: 'bg-orange-100 border-orange-400 hover:bg-orange-200',
    emotions: ['Frustrated', 'Irritated', 'Resentful', 'Annoyed', 'Outraged', 'Bitter']
  },
  {
    name: 'Sadness',
    color: 'bg-blue-100 border-blue-400 hover:bg-blue-200',
    emotions: ['Disappointed', 'Lonely', 'Hopeless', 'Hurt', 'Depressed', 'Grief', 'Regretful']
  },
  {
    name: 'Surprise',
    color: 'bg-green-100 border-green-400 hover:bg-green-200',
    emotions: ['Amazed', 'Confused', 'Stunned', 'Shocked', 'Excited', 'Curious']
  },
  {
    name: 'Calm',
    color: 'bg-teal-100 border-teal-400 hover:bg-teal-200',
    emotions: ['Peaceful', 'Relaxed', 'Serene', 'Centered', 'Mindful', 'Balanced']
  },
  {
    name: 'Shame',
    color: 'bg-gray-100 border-gray-400 hover:bg-gray-200',
    emotions: ['Guilty', 'Embarrassed', 'Inadequate', 'Remorseful', 'Self-conscious']
  }
];

const EmotionWheel: React.FC<EmotionWheelProps> = ({ onEmotionSelect, className }) => {
  const [selectedCategory, setSelectedCategory] = useState<EmotionCategory | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [activeTab, setActiveTab] = useState("wheel");
  
  const handleCategorySelect = (category: EmotionCategory) => {
    setSelectedCategory(category);
  };
  
  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setActiveTab("intensity");
  };
  
  const handleIntensitySelect = () => {
    if (selectedEmotion) {
      onEmotionSelect(selectedEmotion, intensity);
      setOpen(false);
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`text-xs flex items-center gap-1 ${className}`}
        >
          <Heart className="h-4 w-4" color={selectedEmotion ? "red" : undefined} />
          <span>{selectedEmotion || "Track Emotion"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">How are you feeling?</h4>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wheel">Emotion Wheel</TabsTrigger>
              <TabsTrigger value="intensity">Intensity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wheel" className="space-y-4 py-2">
              {selectedCategory ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs" 
                      onClick={() => setSelectedCategory(null)}
                    >
                      ← Back to categories
                    </Button>
                    <div className="ml-2 text-sm font-medium">{selectedCategory.name}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCategory.emotions.map((emotion) => (
                      <Card 
                        key={emotion}
                        className={`cursor-pointer border ${selectedCategory.color}`}
                        onClick={() => handleEmotionSelect(emotion)}
                      >
                        <CardContent className="p-2 text-center">
                          <span className="text-sm">{emotion}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {emotionCategories.map((category) => (
                    <Card 
                      key={category.name}
                      className={`cursor-pointer border ${category.color}`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <CardContent className="p-2 text-center">
                        <span className="text-sm font-medium">{category.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="intensity" className="space-y-4 py-2">
              <div className="space-y-4">
                <div className="text-sm">
                  {selectedEmotion ? (
                    <>How intense is your <strong>{selectedEmotion}</strong> feeling? (1-10)</>
                  ) : (
                    <>Please select an emotion first</>
                  )}
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <Button
                      key={value}
                      variant={intensity === value ? "default" : "outline"}
                      size="sm"
                      className="w-7 h-7 p-0"
                      onClick={() => setIntensity(value)}
                      disabled={!selectedEmotion}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
                
                {selectedEmotion && (
                  <Button 
                    className="w-full mt-2" 
                    onClick={handleIntensitySelect}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmotionWheel;
