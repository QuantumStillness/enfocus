
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { TimerSettingsTabProps } from './types';

const TimerSettingsTab = ({ 
  settings, 
  setAutoStartBreaks, 
  setAutoStartPomodoros, 
  setAlarmSound,
  setIntervalsBeforeLongBreak,
  isActive
}: TimerSettingsTabProps) => {
  const { 
    autoStartBreaks, 
    autoStartPomodoros, 
    alarmSound, 
    intervalsBeforeLongBreak 
  } = settings;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Auto-start breaks</Label>
          <div className="text-xs text-gray-500">
            Start breaks automatically after each focus session
          </div>
        </div>
        <Switch 
          checked={autoStartBreaks}
          onCheckedChange={setAutoStartBreaks}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Auto-start pomodoros</Label>
          <div className="text-xs text-gray-500">
            Start focus sessions automatically after each break
          </div>
        </div>
        <Switch 
          checked={autoStartPomodoros}
          onCheckedChange={setAutoStartPomodoros}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Alarm sound</Label>
          <div className="text-xs text-gray-500">
            Play sound when timer completes
          </div>
        </div>
        <Switch 
          checked={alarmSound}
          onCheckedChange={setAlarmSound}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Sessions before long break</Label>
        <div className="flex items-center gap-2">
          <Slider
            defaultValue={[intervalsBeforeLongBreak]}
            min={1}
            max={6}
            step={1}
            value={[intervalsBeforeLongBreak]}
            onValueChange={(value) => setIntervalsBeforeLongBreak(value[0])}
            disabled={isActive}
            className="w-full"
          />
          <span className="text-sm">{intervalsBeforeLongBreak}</span>
        </div>
      </div>
    </div>
  );
};

export default TimerSettingsTab;
