
import { useState, useEffect, useRef } from 'react';
import { TimerType } from './types';

interface UseTimerProps {
  onTimerComplete: () => void;
  isPlaying?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const useTimer = ({ 
  onTimerComplete, 
  isPlaying: externalIsPlaying, 
  onPlayingChange 
}: UseTimerProps) => {
  const [internalIsActive, setInternalIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionDuration, setSessionDuration] = useState(25); // minutes
  const [breakDuration, setBreakDuration] = useState(5); // break duration in minutes
  const [longBreakDuration, setLongBreakDuration] = useState(15); // long break duration
  const [intervalsBeforeLongBreak, setIntervalsBeforeLongBreak] = useState(4); // sessions before long break
  const [currentInterval, setCurrentInterval] = useState(1);
  const [progress, setProgress] = useState(100);
  const [timerType, setTimerType] = useState<TimerType>('focus');
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [alarmSound, setAlarmSound] = useState(true);
  const timerRef = useRef<number | null>(null);
  
  // Determine if timer is active based on internal or external state
  const isActive = externalIsPlaying !== undefined ? externalIsPlaying : internalIsActive;

  // Handle timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            // Update internal state
            setInternalIsActive(false);
            // Update external state if provided
            if (onPlayingChange) {
              onPlayingChange(false);
            }
            onTimerComplete();
            
            // Handle next timer cycle based on current timer type
            if (timerType === 'focus') {
              // After focus session, determine if it should be regular break or long break
              if (currentInterval >= intervalsBeforeLongBreak) {
                setTimerType('longBreak');
                setTimeLeft(longBreakDuration * 60);
                setCurrentInterval(1); // Reset interval counter after long break
              } else {
                setTimerType('break');
                setTimeLeft(breakDuration * 60);
                setCurrentInterval(prev => prev + 1);
              }
              
              // Auto-start break if enabled
              if (autoStartBreaks) {
                setTimeout(() => {
                  setInternalIsActive(true);
                  if (onPlayingChange) onPlayingChange(true);
                }, 500);
              }
            } else {
              // After any break, go back to focus
              setTimerType('focus');
              setTimeLeft(sessionDuration * 60);
              
              // Auto-start next pomodoro if enabled
              if (autoStartPomodoros) {
                setTimeout(() => {
                  setInternalIsActive(true);
                  if (onPlayingChange) onPlayingChange(true);
                }, 500);
              }
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, timerType, onTimerComplete, onPlayingChange, sessionDuration, 
      breakDuration, longBreakDuration, currentInterval, intervalsBeforeLongBreak,
      autoStartBreaks, autoStartPomodoros]);
  
  // Update progress bar
  useEffect(() => {
    const total = timerType === 'focus' 
      ? sessionDuration * 60 
      : timerType === 'break' 
        ? breakDuration * 60 
        : longBreakDuration * 60;
        
    setProgress((timeLeft / total) * 100);
  }, [timeLeft, timerType, sessionDuration, breakDuration, longBreakDuration]);
  
  // Update timeLeft when timer type or durations change
  useEffect(() => {
    if (timerType === 'focus') {
      setTimeLeft(sessionDuration * 60);
    } else if (timerType === 'break') {
      setTimeLeft(breakDuration * 60);
    } else if (timerType === 'longBreak') {
      setTimeLeft(longBreakDuration * 60);
    }
  }, [timerType, sessionDuration, breakDuration, longBreakDuration]);

  const handleToggleTimer = () => {
    const newState = !isActive;
    // Update internal state
    setInternalIsActive(newState);
    // Update external state if provided
    if (onPlayingChange) {
      onPlayingChange(newState);
    }
  };
  
  const handleResetTimer = () => {
    // Update internal state
    setInternalIsActive(false);
    // Update external state if provided
    if (onPlayingChange) {
      onPlayingChange(false);
    }
    
    // Reset to the correct time based on the current timer type
    if (timerType === 'focus') {
      setTimeLeft(sessionDuration * 60);
    } else if (timerType === 'break') {
      setTimeLeft(breakDuration * 60);
    } else if (timerType === 'longBreak') {
      setTimeLeft(longBreakDuration * 60);
    }
    
    setProgress(100);
  };
  
  const handleSessionDurationChange = (value: number[]) => {
    if (!isActive && timerType === 'focus') {
      setSessionDuration(value[0]);
      setTimeLeft(value[0] * 60);
    }
  };
  
  const handleBreakDurationChange = (value: number[]) => {
    if (!isActive && timerType === 'break') {
      setBreakDuration(value[0]);
      setTimeLeft(value[0] * 60);
    }
  };
  
  const handleLongBreakDurationChange = (value: number[]) => {
    if (!isActive && timerType === 'longBreak') {
      setLongBreakDuration(value[0]);
      setTimeLeft(value[0] * 60);
    }
  };

  return {
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
  };
};
