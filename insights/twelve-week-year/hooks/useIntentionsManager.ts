
import { useState, useEffect } from 'react';

export const useIntentionsManager = () => {
  const [intentions, setIntentions] = useState("");
  const [showIntentionsDialog, setShowIntentionsDialog] = useState(false);

  // Load intentions from localStorage
  useEffect(() => {
    const savedIntentions = localStorage.getItem('12-week-year-intentions');
    if (savedIntentions) {
      setIntentions(savedIntentions);
    }
  }, []);

  // Save intentions to localStorage
  useEffect(() => {
    localStorage.setItem('12-week-year-intentions', intentions);
  }, [intentions]);

  const handleUpdateIntentions = () => {
    setShowIntentionsDialog(false);
  };

  return {
    intentions,
    setIntentions,
    showIntentionsDialog,
    setShowIntentionsDialog,
    handleUpdateIntentions
  };
};
