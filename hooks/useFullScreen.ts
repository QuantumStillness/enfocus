
import { useState, useCallback } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const enterFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, []);
  
  const exitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, []);
  
  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev);
  }, []);
  
  return {
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    toggleFullScreen
  };
};
