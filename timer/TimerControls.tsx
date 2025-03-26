
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TimerControlsProps } from './types';

const TimerControls = ({ isActive, onToggleTimer, onResetTimer }: TimerControlsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        onClick={onToggleTimer}
        variant={isActive ? "destructive" : "default"}
        size="sm"
      >
        {isActive ? <Pause size={16} /> : <Play size={16} />}
        {isActive ? " Pause" : " Start"}
      </Button>
      
      <Button
        onClick={onResetTimer}
        variant="outline"
        size="sm"
      >
        <RotateCcw size={16} className="mr-1" />
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;
