
import { useState, useRef, useEffect } from 'react';
import { WhiteNoiseType } from './types';

export const soundFiles = {
  rain: '/sounds/rain.mp3',
  ocean: '/sounds/ocean.mp3',
  forest: '/sounds/forest.mp3',
  whitenoise: '/sounds/whitenoise.mp3',
  none: ''
};

export const useWhiteNoise = ({ isPlaying, soundType }: { isPlaying: boolean; soundType: WhiteNoiseType }) => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element if it doesn't exist
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle play/pause based on isPlaying prop
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying && soundType !== 'none') {
      const soundFile = soundFiles[soundType];
      
      // Only set src if it's different to avoid restarting the same sound
      if (audioRef.current.src !== new URL(soundFile, window.location.href).href) {
        audioRef.current.src = soundFile;
      }
      
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      
      // Use play promise to handle autoplay restrictions
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing audio:", error);
        });
      }
    } else {
      // Pause audio when not playing or no sound type selected
      audioRef.current.pause();
    }
  }, [isPlaying, soundType, isMuted, volume]);
  
  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return {
    volume,
    setVolume,
    isMuted,
    toggleMute
  };
};

