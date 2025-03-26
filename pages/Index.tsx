import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import JournalEditor from "@/components/JournalEditor";
import JournalEditorFullScreen from "@/components/JournalEditorFullScreen";
import AnimatedTransition from "@/components/AnimatedTransition";
import { format } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Compass, Timer, FileText, CloudLightning } from 'lucide-react';
import { MeditationSelector } from '@/components/meditation';
import MarkdownInfo from '@/components/markdown/MarkdownInfo';
import { useToast } from "@/hooks/use-toast";
import { PomodoroTimer } from '@/components/timer';
import { WhiteNoisePlayer } from '@/components/white-noise';
import { WhiteNoiseType } from '@/components/white-noise/types';
import VisualizationTraining from '@/components/visualization/VisualizationTraining';
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<WhiteNoiseType>('none');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setCurrentDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
  }, []);

  const handleTimerComplete = () => {
    toast({
      title: "Timer Complete",
      description: "Your session has ended",
      duration: 5000,
    });
    
    // Play notification sound
    const audio = new Audio('/sounds/notification.mp3');
    audio.play().catch(error => {
      console.error("Error playing notification sound:", error);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className={`pt-${isMobile ? '20' : '24'} pb-20`}>
        <div className="journal-container max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <AnimatedTransition>
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-light text-gray-800 mb-1`}>Mindful Journal</h1>
            </AnimatedTransition>
            <AnimatedTransition delay={100}>
              <p className="text-gray-500">{currentDate}</p>
            </AnimatedTransition>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AnimatedTransition delay={200}>
              <Tabs defaultValue="journal" className="w-full">
                <TabsList className={`grid w-full ${isMobile ? 'max-w-full gap-1 p-1' : 'max-w-md mx-auto mb-6'} grid-cols-5`}>
                  <TabsTrigger value="journal" className={`flex items-center ${isMobile ? 'text-xs py-1.5 px-1 justify-center' : 'gap-2'}`}>
                    <BookOpen className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {!isMobile && <span>Journal</span>}
                  </TabsTrigger>
                  <TabsTrigger value="meditation" className={`flex items-center ${isMobile ? 'text-xs py-1.5 px-1 justify-center' : 'gap-2'}`}>
                    <Compass className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {!isMobile && <span>Meditations</span>}
                  </TabsTrigger>
                  <TabsTrigger value="visualization" className={`flex items-center ${isMobile ? 'text-xs py-1.5 px-1 justify-center' : 'gap-2'}`}>
                    <CloudLightning className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {!isMobile && <span>Visualize</span>}
                  </TabsTrigger>
                  <TabsTrigger value="timer" className={`flex items-center ${isMobile ? 'text-xs py-1.5 px-1 justify-center' : 'gap-2'}`}>
                    <Timer className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {!isMobile && <span>Timer</span>}
                  </TabsTrigger>
                  <TabsTrigger value="markdown" className={`flex items-center ${isMobile ? 'text-xs py-1.5 px-1 justify-center' : 'gap-2'}`}>
                    <FileText className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {!isMobile && <span>Markdown</span>}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="journal" className="mt-0">
                  <div className="grid grid-cols-1 gap-8">
                    <JournalEditorFullScreen />
                  </div>
                </TabsContent>
                
                <TabsContent value="meditation" className="mt-0">
                  <MeditationSelector />
                </TabsContent>
                
                <TabsContent value="visualization" className="mt-0">
                  <VisualizationTraining />
                </TabsContent>
                
                <TabsContent value="timer" className="mt-0">
                  <div className={`${isMobile ? 'max-w-full' : 'max-w-md mx-auto'}`}>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-xl font-medium mb-4">Focus Timer</h2>
                        <PomodoroTimer 
                          onTimerComplete={handleTimerComplete}
                          isPlaying={isPlaying}
                          onPlayingChange={setIsPlaying}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h2 className="text-xl font-medium mb-4">Ambient Sounds</h2>
                        <WhiteNoisePlayer
                          isPlaying={isPlaying}
                          soundType={soundType}
                          onChangeSoundType={setSoundType}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="markdown" className="mt-0">
                  <MarkdownInfo />
                </TabsContent>
              </Tabs>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
