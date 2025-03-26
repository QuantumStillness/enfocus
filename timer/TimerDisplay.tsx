
import { Progress } from "@/components/ui/progress";

interface TimerDisplayProps {
  timerType: 'focus' | 'break' | 'longBreak';
  currentInterval: number;
  intervalsBeforeLongBreak: number;
  timeLeft: number;
  progress: number;
}

const TimerDisplay = ({ 
  timerType, 
  currentInterval, 
  intervalsBeforeLongBreak, 
  timeLeft, 
  progress 
}: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg">
          {timerType === 'focus' ? 'Focus Session' : timerType === 'break' ? 'Short Break' : 'Long Break'}
          {timerType === 'focus' && <span className="ml-2 text-sm text-gray-500">({currentInterval}/{intervalsBeforeLongBreak})</span>}
        </div>
        <div className="text-2xl font-bold">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
    </>
  );
};

export default TimerDisplay;
