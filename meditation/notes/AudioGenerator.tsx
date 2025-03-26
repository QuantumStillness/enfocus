
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Play, Pause } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  saveApiKey, 
  getApiKey, 
  generateAudio, 
  availableVoices 
} from "@/services/notebookLmService";

interface AudioGeneratorProps {
  notes: string;
}

const AudioGenerator: React.FC<AudioGeneratorProps> = ({ notes }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('default');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  
  React.useEffect(() => {
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => setIsPlaying(false);
      audioElement.addEventListener('ended', handleEnded);
      return () => {
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioUrl]);
  
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your NotebookLM API key has been saved."
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
        variant: "destructive"
      });
    }
  };
  
  const handleGenerateAudio = async () => {
    setIsGenerating(true);
    
    try {
      const audioUrlResult = await generateAudio(notes, selectedVoice);
      
      if (audioUrlResult) {
        setAudioUrl(audioUrlResult);
        toast({
          title: "Audio Generated",
          description: "Your meditation audio has been generated successfully."
        });
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Audio Generation Failed",
        description: "There was an error generating the audio.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="text-base font-medium mb-2">NotebookLM API Settings</h3>
        <div className="flex gap-2 mb-4">
          <Input
            type="password"
            placeholder="Enter NotebookLM API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button variant="secondary" onClick={handleSaveApiKey}>
            Save Key
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm mr-2">Voice:</span>
          <select 
            className="p-2 bg-background border rounded-md text-sm"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {availableVoices.map(voice => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="default" 
          onClick={handleGenerateAudio}
          disabled={isGenerating || !apiKey}
          className="flex-1"
        >
          <Mic className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Audio'}
        </Button>
      </div>
      
      {audioUrl && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-sm font-medium">
              {isPlaying ? 'Playing audio' : 'Audio ready'}
            </span>
          </div>
          <audio ref={audioRef} src={audioUrl} className="hidden" />
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Note: This feature uses the NotebookLM API to generate audio from your notes. 
        You need to provide your own API key to use this feature.</p>
      </div>
    </div>
  );
};

export default AudioGenerator;
