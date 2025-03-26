
import { generateWeeksInQuarter, calculateProgress } from '../twelve-week-year/utils';

// Generate 12-week year progress data
export const generateTwelveWeekData = () => {
  const weeksInQuarter = generateWeeksInQuarter();
  const { progressPercentage } = calculateProgress();
  
  // Create completed/remaining data for the progress donut chart
  const progressData = [
    { name: 'Completed', value: progressPercentage, color: '#4CAF50' },
    { name: 'Remaining', value: 100 - progressPercentage, color: '#E0E0E0' }
  ];
  
  // Create weekly data for the weekly progress chart
  const weeklyProgressData = weeksInQuarter.map((week, index) => {
    // Simulate progression - past weeks have actual values, future weeks are projected
    const currentWeek = Math.ceil(progressPercentage / (100/12));
    let completionRate;
    
    if (week.weekNumber < currentWeek) {
      // Past weeks - random but trending upward
      completionRate = Math.min(100, Math.round(60 + (week.weekNumber * 3) + (Math.random() * 10)));
    } else if (week.weekNumber === currentWeek) {
      // Current week - based on actual progress
      completionRate = Math.round((progressPercentage % (100/12)) / (100/12) * 100);
    } else {
      // Future weeks - projected
      completionRate = 0;
    }
    
    return {
      name: `Week ${week.weekNumber}`,
      completion: completionRate,
      target: 90
    };
  });
  
  // Create event distribution data based on days of week
  const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const eventDistributionData = weekdayNames.map(day => {
    return {
      name: day.substring(0, 3), // Short day name
      events: Math.floor(Math.random() * 5) + 1 // Random 1-5 events
    };
  });
  
  return {
    progressData,
    weeklyProgressData,
    eventDistributionData
  };
};

// Demo data for chakra energy balance report
export const chakraData = [
  { name: 'Root', value: 75, color: '#FF5252' },
  { name: 'Sacral', value: 60, color: '#FF9800' },
  { name: 'Solar Plexus', value: 85, color: '#FFEB3B' },
  { name: 'Heart', value: 90, color: '#4CAF50' },
  { name: 'Throat', value: 65, color: '#2196F3' },
  { name: 'Third Eye', value: 70, color: '#673AB7' },
  { name: 'Crown', value: 55, color: '#9C27B0' },
];

// Meditation minutes data
export const meditationData = [
  { name: 'Week 1', minutes: 45 },
  { name: 'Week 2', minutes: 60 },
  { name: 'Week 3', minutes: 75 },
  { name: 'Week 4', minutes: 50 },
  { name: 'Week 5', minutes: 90 },
  { name: 'Week 6', minutes: 70 },
  { name: 'Week 7', minutes: 85 },
  { name: 'Week 8', minutes: 100 },
];
