
import { Button } from "@/components/ui/button";
import { SoundButtonsProps } from './types';

const SoundButtons = ({ soundType, onChangeSoundType }: SoundButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="sm" 
        variant={soundType === 'rain' ? "default" : "outline"}
        onClick={() => onChangeSoundType('rain')}
      >
        Rain
      </Button>
      <Button 
        size="sm" 
        variant={soundType === 'ocean' ? "default" : "outline"}
        onClick={() => onChangeSoundType('ocean')}
      >
        Ocean
      </Button>
      <Button 
        size="sm" 
        variant={soundType === 'forest' ? "default" : "outline"}
        onClick={() => onChangeSoundType('forest')}
      >
        Forest
      </Button>
      <Button 
        size="sm" 
        variant={soundType === 'whitenoise' ? "default" : "outline"}
        onClick={() => onChangeSoundType('whitenoise')}
      >
        White Noise
      </Button>
      <Button 
        size="sm" 
        variant={soundType === 'none' ? "default" : "outline"}
        onClick={() => onChangeSoundType('none')}
      >
        None
      </Button>
    </div>
  );
};

export default SoundButtons;

