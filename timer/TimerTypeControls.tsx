
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TimerTypeControlsProps } from './types';

const TimerTypeControls = ({ 
  timerType, 
  isActive, 
  setTimerType, 
  setTimeLeft,
  sessionDuration,
  breakDuration,
  longBreakDuration
}: TimerTypeControlsProps) => {
  const handleTimerTypeChange = (type: 'focus' | 'break' | 'longBreak') => {
    if (isActive) return;
    
    setTimerType(type);
    if (type === 'focus') {
      setTimeLeft(sessionDuration * 60);
    } else if (type === 'break') {
      setTimeLeft(breakDuration * 60);
    } else if (type === 'longBreak') {
      setTimeLeft(longBreakDuration * 60);
    }
  };

  return (
    <div className="flex justify-between mt-2">
      <Button
        variant={timerType === 'focus' ? "default" : "outline"}
        size="sm"
        onClick={() => handleTimerTypeChange('focus')}
      >
        <Clock className="mr-2 h-4 w-4" />
        Focus ({sessionDuration}m)
      </Button>
      
      <Button
        variant={timerType === 'break' ? "default" : "outline"}
        size="sm"
        onClick={() => handleTimerTypeChange('break')}
      >
        <Clock className="mr-2 h-4 w-4" />
        Break ({breakDuration}m)
      </Button>
      
      <Button
        variant={timerType === 'longBreak' ? "default" : "outline"}
        size="sm"
        onClick={() => handleTimerTypeChange('longBreak')}
      >
        <Clock className="mr-2 h-4 w-4" />
        Long ({longBreakDuration}m)
      </Button>
    </div>
  );
};

export default TimerTypeControls;
