
import { Slider } from "@/components/ui/slider";
import { TimerDurationControlProps } from './types';

const TimerDurationControl = ({ 
  duration, 
  onDurationChange, 
  isActive,
  min,
  max,
  step
}: TimerDurationControlProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs">{`${duration} min`}</span>
      <Slider
        defaultValue={[duration]}
        min={min}
        max={max}
        step={step}
        value={[duration]}
        onValueChange={onDurationChange}
        disabled={isActive}
        className="w-32"
      />
    </div>
  );
};

export default TimerDurationControl;
