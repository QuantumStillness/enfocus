
import { useState, useEffect } from 'react';
import { Clock, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WhiteNoisePlayer } from './white-noise';
import { PomodoroTimer } from './timer';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { WhiteNoiseType } from './white-noise/types';

const TimerOverlay = () => {
  const [soundType, setSoundType] = useState<WhiteNoiseType>('none');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const { toast } = useToast();

  const handleTimerComplete = async () => {
    toast({
      title: "Timer Complete",
      description: "Your session has ended",
      duration: 5000,
    });
    
    try {
      const audio = new Audio('/sounds/notification.mp3');
      await audio.play();
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
    
    if (soundType !== 'none') {
      setSoundType('none');
    }
  };

  useEffect(() => {
    const handleMeditationTimer = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (!customEvent.detail) {
        console.error("Invalid meditation timer event - missing details");
        return;
      }
      
      const { duration, title } = customEvent.detail;
      
      setIsOpen(true);
      setIsPlaying(true);
      
      toast({
        title: `Starting ${title}`,
        description: `${duration} minute session began`,
        duration: 3000,
      });
    };

    window.addEventListener('startMeditationTimer', handleMeditationTimer);
    return () => {
      window.removeEventListener('startMeditationTimer', handleMeditationTimer);
    };
  }, [toast]);

  const toggleFullscreenMode = () => {
    setFullscreenMode(!fullscreenMode);
    if (!fullscreenMode) {
      setIsOpen(false);
    }
  };

  const TimerContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-amber-800">Focus Timer</h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreenMode}
          className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
        >
          {fullscreenMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      
      <PomodoroTimer 
        onTimerComplete={handleTimerComplete}
        isPlaying={isPlaying}
        onPlayingChange={setIsPlaying}
      />
      
      <Separator className="my-2 bg-amber-200/50" />
      
      <h3 className="font-medium text-lg text-amber-800">Ambient Sounds</h3>
      
      <WhiteNoisePlayer 
        isPlaying={isPlaying}
        soundType={soundType}
        onChangeSoundType={setSoundType}
      />
    </div>
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isOpen && !fullscreenMode} onOpenChange={(open) => {
          if (fullscreenMode) return;
          setIsOpen(open);
        }}>
          <PopoverTrigger asChild>
            <Button
              className="h-14 w-14 rounded-full shadow-lg gold-gradient-bg"
              onClick={() => {
                if (fullscreenMode) {
                  setFullscreenMode(false);
                }
                setIsOpen(true);
              }}
            >
              <Clock className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 border-amber-200 bg-white shadow-md z-50" side="top">
            <TimerContent />
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={fullscreenMode} onOpenChange={setFullscreenMode}>
        <DialogContent className="sm:max-w-[600px] border-amber-200 bg-white">
          <DialogHeader>
            <DialogTitle className="text-amber-800">Focus Timer</DialogTitle>
            <DialogDescription>
              Set your timer and ambient sounds for a focused session
            </DialogDescription>
          </DialogHeader>
          <TimerContent />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerOverlay;
