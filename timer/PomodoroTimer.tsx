
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import TimerDurationControl from "./TimerDurationControl";
import TimerTypeControls from "./TimerTypeControls";
import TimerSettingsTab from "./TimerSettingsTab";
import { useTimer } from "./useTimer";
import { TimerProps } from "./types";

const PomodoroTimer = ({ onTimerComplete, isPlaying, onPlayingChange }: TimerProps) => {
  const {
    timerType,
    setTimerType,
    timeLeft,
    setTimeLeft,
    progress,
    currentInterval,
    sessionDuration,
    breakDuration,
    longBreakDuration,
    intervalsBeforeLongBreak,
    isActive,
    autoStartBreaks,
    autoStartPomodoros,
    alarmSound,
    handleToggleTimer,
    handleResetTimer,
    handleSessionDurationChange,
    handleBreakDurationChange,
    handleLongBreakDurationChange,
    setAutoStartBreaks,
    setAutoStartPomodoros,
    setAlarmSound,
    setIntervalsBeforeLongBreak
  } = useTimer({ onTimerComplete, isPlaying, onPlayingChange });

  return (
    <div className="space-y-4">
      <TimerDisplay 
        timerType={timerType}
        currentInterval={currentInterval}
        intervalsBeforeLongBreak={intervalsBeforeLongBreak}
        timeLeft={timeLeft}
        progress={progress}
      />
      
      <div className="flex justify-between items-center">
        <TimerControls 
          isActive={isActive}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
        />
        
        {timerType === 'focus' && (
          <TimerDurationControl 
            duration={sessionDuration}
            onDurationChange={handleSessionDurationChange}
            isActive={isActive}
            min={5}
            max={60}
            step={5}
          />
        )}
        {timerType === 'break' && (
          <TimerDurationControl 
            duration={breakDuration}
            onDurationChange={handleBreakDurationChange}
            isActive={isActive}
            min={1}
            max={15}
            step={1}
          />
        )}
        {timerType === 'longBreak' && (
          <TimerDurationControl 
            duration={longBreakDuration}
            onDurationChange={handleLongBreakDurationChange}
            isActive={isActive}
            min={5}
            max={30}
            step={5}
          />
        )}
      </div>
      
      <Tabs defaultValue="timer-types" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="timer-types">Timer Types</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timer-types" className="space-y-4">
          <TimerTypeControls 
            timerType={timerType}
            isActive={isActive}
            setTimerType={setTimerType}
            setTimeLeft={setTimeLeft}
            sessionDuration={sessionDuration}
            breakDuration={breakDuration}
            longBreakDuration={longBreakDuration}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <TimerSettingsTab 
            settings={{
              sessionDuration,
              breakDuration,
              longBreakDuration,
              intervalsBeforeLongBreak,
              autoStartBreaks,
              autoStartPomodoros,
              alarmSound
            }}
            setAutoStartBreaks={setAutoStartBreaks}
            setAutoStartPomodoros={setAutoStartPomodoros}
            setAlarmSound={setAlarmSound}
            setIntervalsBeforeLongBreak={setIntervalsBeforeLongBreak}
            isActive={isActive}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PomodoroTimer;
