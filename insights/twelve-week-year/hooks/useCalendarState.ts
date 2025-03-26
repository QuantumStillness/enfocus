
import { useState, useEffect } from 'react';
import { Event, EventsMap, WeekInfo } from '../types';
import { format, startOfWeek, addDays, addWeeks, isSameDay, subWeeks, isWithinInterval } from 'date-fns';
import { generateWeeksInQuarter, isDateInQuarter } from '../utils';

export const useCalendarState = () => {
  // Date states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [quarterStartDate, setQuarterStartDate] = useState(new Date());
  
  // UI states
  const [viewType, setViewType] = useState<'calendar' | 'templates'>('calendar');
  const [showIntentionsDialog, setShowIntentionsDialog] = useState(false);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  // Data states
  const [events, setEvents] = useState<EventsMap>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateContent, setTemplateContent] = useState('');
  const [templatePreview, setTemplatePreview] = useState(false);
  const [intentions, setIntentions] = useState('');
  const [goalMarkers, setGoalMarkers] = useState<{[week: number]: string}>({});
  const [weeksInQuarter, setWeeksInQuarter] = useState<WeekInfo[]>(() => 
    generateWeeksInQuarter(quarterStartDate)
  );
  
  // Generate weeks when quarter start date changes
  useEffect(() => {
    setWeeksInQuarter(generateWeeksInQuarter(quarterStartDate));
  }, [quarterStartDate]);

  // Check if a date is in the current quarter
  const isInCurrentQuarter = (date: Date) => {
    return isDateInQuarter(date, quarterStartDate);
  };

  // Handle adding a new event
  const handleAddEvent = (title: string, description: string) => {
    const dateKey = format(selectedDay, 'yyyy-MM-dd');
    const newEvent = { title, description };
    
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent]
    }));
    
    setShowAddEventDialog(false);
  };

  // Handle setting a goal marker
  const handleAddGoalMarker = (weekNumber: number, goal: string) => {
    setGoalMarkers(prev => ({
      ...prev,
      [weekNumber]: goal
    }));
  };

  // Handle selecting a template and opening the template dialog
  const handleTemplateSelect = (templateId: string, content: string) => {
    setSelectedTemplate(templateId);
    setTemplateContent(content);
    setShowTemplateDialog(true);
  };

  // Toggle template preview
  const handleTogglePreview = () => {
    setTemplatePreview(!templatePreview);
  };

  // Save template (would typically save to database)
  const handleSaveTemplate = () => {
    console.log('Template saved:', { templateId: selectedTemplate, content: templateContent });
    setShowTemplateDialog(false);
  };

  // Save intentions (would typically save to database)
  const handleSaveIntentions = () => {
    console.log('Intentions saved:', intentions);
    setShowIntentionsDialog(false);
  };

  return {
    // Date states
    currentDate,
    setCurrentDate,
    selectedDay, 
    setSelectedDay,
    quarterStartDate,
    setQuarterStartDate,
    
    // UI states
    viewType,
    setViewType,
    showIntentionsDialog,
    setShowIntentionsDialog,
    showAddEventDialog,
    setShowAddEventDialog,
    showTemplateDialog,
    setShowTemplateDialog,
    datePickerOpen,
    setDatePickerOpen,
    
    // Data states
    events,
    setEvents,
    selectedTemplate,
    setSelectedTemplate,
    templateContent,
    setTemplateContent,
    templatePreview,
    setTemplatePreview,
    intentions,
    setIntentions,
    goalMarkers,
    setGoalMarkers,
    weeksInQuarter,
    
    // Handlers
    handleAddEvent,
    handleAddGoalMarker,
    handleTemplateSelect,
    handleTogglePreview,
    handleSaveTemplate,
    handleSaveIntentions,
    isInCurrentQuarter
  };
};

export default useCalendarState;
