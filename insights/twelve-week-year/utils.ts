
import { startOfWeek, endOfWeek, addWeeks, differenceInDays, format, eachDayOfInterval, addDays } from 'date-fns';
import { WeekInfo, Event, EventsMap } from './types';

// Generate the start and end dates for each week in the 12-week quarter
export const generateWeeksInQuarter = (startDate: Date = new Date()): WeekInfo[] => {
  const firstDayOfQuarter = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
  
  return Array.from({ length: 12 }, (_, i) => {
    const weekStart = addWeeks(firstDayOfQuarter, i);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    
    return {
      weekNumber: i + 1,
      startDate: weekStart,
      endDate: weekEnd,
      formattedDate: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`
    };
  });
};

// Get days of the week for a given date
export const getDaysOfWeek = (date: Date): Date[] => {
  const startDay = startOfWeek(date, { weekStartsOn: 1 });
  const endDay = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start: startDay, end: endDay });
};

// Get events for a specific day
export const getEventsForDay = (day: Date, events: EventsMap): Event[] => {
  const dateKey = format(day, 'yyyy-MM-dd');
  return events[dateKey] || [];
};

// Calculate progress through the 12-week period
export const calculateProgress = (startDate: Date = new Date()) => {
  const firstDayOfQuarter = startOfWeek(startDate, { weekStartsOn: 1 });
  const lastDayOfQuarter = endOfWeek(addWeeks(firstDayOfQuarter, 11), { weekStartsOn: 1 });
  
  const totalDays = differenceInDays(lastDayOfQuarter, firstDayOfQuarter) + 1;
  const today = new Date();
  
  let daysElapsed = differenceInDays(today, firstDayOfQuarter);
  daysElapsed = Math.max(0, Math.min(daysElapsed, totalDays));
  
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progressPercentage = Math.min(100, Math.round((daysElapsed / totalDays) * 100));
  
  return {
    daysElapsed,
    daysRemaining,
    progressPercentage,
    totalDays
  };
};

// Format date for weekly view
export const formatWeekViewDates = (date: Date): string => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  
  return `${format(weekStart, 'MMMM d')} - ${format(weekEnd, 'MMMM d, yyyy')}`;
};

// Get the current week number within the 12-week year
export const getCurrentWeekNumber = (startDate: Date = new Date(), currentDate: Date = new Date()): number => {
  const firstDayOfQuarter = startOfWeek(startDate, { weekStartsOn: 1 });
  const diffInDays = differenceInDays(currentDate, firstDayOfQuarter);
  
  const weekNumber = Math.floor(diffInDays / 7) + 1;
  return Math.max(1, Math.min(weekNumber, 12));
};

// Determine if a date is within the 12-week period
export const isDateInQuarter = (date: Date, startDate: Date = new Date()): boolean => {
  const firstDayOfQuarter = startOfWeek(startDate, { weekStartsOn: 1 });
  const lastDayOfQuarter = endOfWeek(addWeeks(firstDayOfQuarter, 11), { weekStartsOn: 1 });
  
  return date >= firstDayOfQuarter && date <= lastDayOfQuarter;
};
