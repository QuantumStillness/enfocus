import React, { useState } from 'react';
import { meditationGuides } from "@/data/meditationGuides";
import { MeditationGuide } from "@/types/meditation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AnimatedTransition from '@/components/AnimatedTransition';
import { MeditationPlayer } from './index';

const MeditationSelector = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationGuide | null>(null);
  
  // Display first 3 meditations on the home page tab
  const homepageMeditations = meditationGuides.slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {homepageMeditations.map((meditation, index) => (
          <AnimatedTransition key={meditation.id} delay={200 + index * 100}>
            <Card className="h-full card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{meditation.title}</CardTitle>
                <CardDescription>{meditation.type} • {meditation.duration} minutes</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 text-sm line-clamp-3">{meditation.description}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedMeditation(meditation)}
                      size="sm"
                    >
                      Begin Practice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Guided Meditation</DialogTitle>
                      <DialogDescription>
                        Follow the instructions at your own pace
                      </DialogDescription>
                    </DialogHeader>
                    {selectedMeditation && (
                      <MeditationPlayer 
                        meditation={selectedMeditation} 
                        onClose={() => setSelectedMeditation(null)} 
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </AnimatedTransition>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" asChild>
          <a href="/meditations" className="inline-flex items-center gap-2">
            <span>View All Meditations</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MeditationSelector;
