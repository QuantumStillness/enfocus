
import React from 'react';
import { format, isToday, isWithinInterval, addDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventsMap, WeekInfo } from '../types';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuarterlyViewProps {
  weeksInQuarter: WeekInfo[];
  events: EventsMap;
  onWeekClick: (date: Date) => void;
  currentDate: Date;
  goalMarkers: {[week: number]: string};
  onAddGoalMarker: (weekNumber: number, goal: string) => void;
  onOpenNotes?: (weekNumber: number) => void;
}

const QuarterlyView: React.FC<QuarterlyViewProps> = ({
  weeksInQuarter,
  events,
  onWeekClick,
  currentDate,
  goalMarkers,
  onAddGoalMarker,
  onOpenNotes
}) => {
  const isCurrentWeek = (week: WeekInfo) => {
    return isWithinInterval(currentDate, {
      start: week.startDate,
      end: addDays(week.endDate, 1) // Add 1 day to include the end date
    });
  };
  
  const getEventsForWeek = (week: WeekInfo) => {
    let totalEvents = 0;
    for (let i = 0; i < 7; i++) {
      const day = addDays(week.startDate, i);
      const dateKey = format(day, 'yyyy-MM-dd');
      totalEvents += (events[dateKey]?.length || 0);
    }
    return totalEvents;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">12-Week Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weeksInQuarter.map((week, index) => (
          <Card 
            key={index} 
            className={`hover:border-amber-300 transition-colors cursor-pointer ${
              isCurrentWeek(week)
                ? 'border-amber-300 bg-amber-50'
                : ''
            }`}
            onClick={() => onWeekClick(week.startDate)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Week {week.weekNumber}</CardTitle>
                {onOpenNotes && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenNotes(week.weekNumber);
                    }}
                    className="h-8 w-8 p-0 text-amber-700"
                  >
                    <BookOpen className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {format(week.startDate, 'MMM d')} - {format(week.endDate, 'MMM d, yyyy')}
              </p>
              
              {goalMarkers[week.weekNumber] ? (
                <div className="mt-2 text-sm bg-amber-50 border border-amber-100 p-2 rounded-md">
                  <span className="font-medium">Focus:</span> {goalMarkers[week.weekNumber]}
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 p-2 rounded-md flex items-center justify-center">
                  Set focus for Week {week.weekNumber}
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                {getEventsForWeek(week) > 0 ? (
                  <span>{getEventsForWeek(week)} {getEventsForWeek(week) === 1 ? 'event' : 'events'} scheduled</span>
                ) : (
                  <span>No events scheduled</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuarterlyView;
