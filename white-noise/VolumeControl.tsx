
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { VolumeControlProps } from './types';

const VolumeControl = ({ 
  volume, 
  onVolumeChange, 
  isMuted, 
  onMuteToggle 
}: VolumeControlProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onMuteToggle}
        className="text-gray-700"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
      
      <Slider
        value={[volume]}
        max={100}
        step={1}
        onValueChange={(value) => onVolumeChange(value[0])}
        className="w-32"
      />
    </div>
  );
};

export default VolumeControl;

