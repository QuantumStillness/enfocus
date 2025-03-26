
import { Dispatch, SetStateAction } from 'react';

export type TimerType = 'focus' | 'break' | 'longBreak';

export interface TimerSettings {
  sessionDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  intervalsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  alarmSound: boolean;
}

export interface TimerProps {
  onTimerComplete: () => void;
  isPlaying?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export interface TimerControlsProps {
  isActive: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export interface TimerDurationControlProps {
  duration: number;
  onDurationChange: (value: number[]) => void;
  isActive: boolean;
  min: number;
  max: number;
  step: number;
}

export interface TimerTypeControlsProps {
  timerType: TimerType;
  isActive: boolean;
  setTimerType: Dispatch<SetStateAction<TimerType>>;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  sessionDuration: number;
  breakDuration: number;
  longBreakDuration: number;
}

export interface TimerSettingsTabProps {
  settings: TimerSettings;
  setAutoStartBreaks: Dispatch<SetStateAction<boolean>>;
  setAutoStartPomodoros: Dispatch<SetStateAction<boolean>>;
  setAlarmSound: Dispatch<SetStateAction<boolean>>;
  setIntervalsBeforeLongBreak: (value: number) => void;
  isActive: boolean;
}
