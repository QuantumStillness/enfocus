
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Event {
  title: string;
  description: string;
}

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<{[key: string]: Event[]}>({});
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('12-week-year-events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Failed to parse saved events:", error);
        setEvents({});
      }
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('12-week-year-events', JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setShowAddEventDialog(true);
  };

  const handleAddEvent = (title: string, description: string) => {
    if (!selectedDay) return;
    
    const dateKey = format(selectedDay, 'yyyy-MM-dd');
    const newEvent = { title, description };
    
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
  };

  const getEventsForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };

  return {
    events,
    setEvents,
    selectedDay,
    setSelectedDay,
    showAddEventDialog,
    setShowAddEventDialog,
    handleDayClick,
    handleAddEvent,
    getEventsForDay
  };
};
