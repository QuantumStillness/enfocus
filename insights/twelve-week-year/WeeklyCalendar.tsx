
import React from 'react';
import { generateWeeksInQuarter, calculateProgress } from './utils';
import AddEventDialog from './dialogs/AddEventDialog';
import TemplateDialog from './dialogs/TemplateDialog';
import IntentionsDialog from './dialogs/IntentionsDialog';
import ProgressBar from './components/ProgressBar';
import WeeklyView from './components/WeeklyView';
import QuarterlyView from './components/QuarterlyView';
import TemplatesView from './components/TemplatesView';
import CalendarHeader from './components/CalendarHeader';
import { useCalendarState } from './hooks/useCalendarState';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { useTemplateManager } from './hooks/useTemplateManager';
import { useIntentionsManager } from './hooks/useIntentionsManager';
import { Button } from '@/components/ui/button';
import { useMarkdownNotes } from '@/hooks/useMarkdownNotes';
import MarkdownNotes from '@/components/notes/MarkdownNotes';
import { BookOpen } from 'lucide-react';

const WeeklyCalendar: React.FC = () => {
  // Use our custom hooks for state management
  const state = useCalendarState();
  const eventsManager = useCalendarEvents();
  const templateManager = useTemplateManager();
  const intentionsManager = useIntentionsManager();
  const { notesOpen, openNotes, closeNotes, initialWeek } = useMarkdownNotes();
  
  // Calculated values
  const { daysElapsed, daysRemaining, progressPercentage } = calculateProgress(state.quarterStartDate);
  const weeksInQuarter = generateWeeksInQuarter(state.quarterStartDate);
  
  // Navigation actions
  const handleSetQuarterStartDate = (date: Date) => {
    state.setQuarterStartDate(date);
  };
  
  const handlePrevWeek = () => {
    const prevWeek = new Date(state.currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    state.setCurrentDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(state.currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    state.setCurrentDate(nextWeek);
  };

  const handleExportObsidian = () => {
    const eventsData = JSON.stringify(eventsManager.events, null, 2);
    const blob = new Blob([eventsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'twelve-week-year-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddGoalMarker = (weekNumber: number, goal: string) => {
    state.setGoalMarkers(prev => ({
      ...prev,
      [weekNumber]: goal
    }));
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <CalendarHeader 
            datePickerOpen={state.datePickerOpen}
            setDatePickerOpen={state.setDatePickerOpen}
            handleSetQuarterStartDate={handleSetQuarterStartDate}
            quarterStartDate={state.quarterStartDate}
            handleExportObsidian={handleExportObsidian}
            viewType={state.viewType}
            setViewType={state.setViewType as (type: 'calendar' | 'templates') => void}
          />
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => openNotes()}
            className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <BookOpen className="h-4 w-4" />
            <span>Markdown Notes</span>
          </Button>
        </div>
        
        {/* Progress tracking */}
        <ProgressBar 
          daysElapsed={daysElapsed}
          daysRemaining={daysRemaining}
          progressPercentage={progressPercentage}
          onOpenIntentions={() => intentionsManager.setShowIntentionsDialog(true)}
          goalMarkers={state.goalMarkers}
          startDate={state.quarterStartDate}
        />
        
        {state.viewType === 'calendar' ? (
          <div className="space-y-6">
            {/* Current Week View */}
            <WeeklyView 
              currentDate={state.currentDate}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              events={eventsManager.events}
              onDayClick={eventsManager.handleDayClick}
              quarterStartDate={state.quarterStartDate}
              goalMarkers={state.goalMarkers}
              onAddGoalMarker={handleAddGoalMarker}
              onOpenNotes={(weekNumber) => openNotes(weekNumber)}
            />
            
            {/* 12-Week Overview */}
            <QuarterlyView 
              weeksInQuarter={weeksInQuarter}
              events={eventsManager.events}
              onWeekClick={state.setCurrentDate}
              currentDate={state.currentDate}
              goalMarkers={state.goalMarkers}
              onAddGoalMarker={handleAddGoalMarker}
              onOpenNotes={(weekNumber) => openNotes(weekNumber)}
            />
          </div>
        ) : (
          <TemplatesView 
            templates={templateManager.templates}
            onTemplateSelect={templateManager.handleTemplateSelect}
          />
        )}
        
        {/* Dialogs */}
        <AddEventDialog 
          open={eventsManager.showAddEventDialog}
          onOpenChange={eventsManager.setShowAddEventDialog}
          selectedDay={eventsManager.selectedDay}
          onAddEvent={eventsManager.handleAddEvent}
        />
        
        <TemplateDialog 
          open={templateManager.showTemplateDialog}
          onOpenChange={templateManager.setShowTemplateDialog}
          selectedTemplate={templateManager.selectedTemplate}
          templateContent={templateManager.templateContent}
          onContentChange={templateManager.setTemplateContent}
          onSaveTemplate={templateManager.handleSaveTemplate}
          templatePreview={templateManager.templatePreview}
          onTogglePreview={() => templateManager.setTemplatePreview(!templateManager.templatePreview)}
        />
        
        <IntentionsDialog 
          open={intentionsManager.showIntentionsDialog}
          onOpenChange={intentionsManager.setShowIntentionsDialog}
          intentions={intentionsManager.intentions}
          onIntentionsChange={intentionsManager.setIntentions}
          onSave={intentionsManager.handleUpdateIntentions}
        />
      </div>
      
      <MarkdownNotes 
        open={notesOpen} 
        onOpenChange={closeNotes}
        initialWeek={initialWeek}
      />
    </>
  );
};

export default WeeklyCalendar;
