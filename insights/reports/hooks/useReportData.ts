
import { useState, useEffect } from 'react';
import { generateTwelveWeekData, chakraData, meditationData } from '../reportUtils';

export function useReportData() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [twelveWeekData, setTwelveWeekData] = useState(() => generateTwelveWeekData());
  
  // Regenerate data when component mounts
  useEffect(() => {
    setTwelveWeekData(generateTwelveWeekData());
  }, []);

  return {
    timeframe,
    setTimeframe,
    twelveWeekData,
    chakraData,
    meditationData,
  };
}
