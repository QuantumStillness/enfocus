
import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { EventsMap } from '../types';

interface WeeklyViewProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  events: EventsMap;
  onDayClick: (day: Date) => void;
  quarterStartDate: Date;
  goalMarkers: {[week: number]: string};
  onAddGoalMarker: (weekNumber: number, goal: string) => void;
  onOpenNotes?: (weekNumber: number) => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({
  currentDate,
  onPrevWeek,
  onNextWeek,
  events,
  onDayClick,
  quarterStartDate,
  goalMarkers,
  onAddGoalMarker,
  onOpenNotes
}) => {
  const startWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: startWeek, end: endWeek });
  
  // Calculate the current week number relative to the quarter start
  const weekStart = startOfWeek(quarterStartDate, { weekStartsOn: 1 });
  const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const diffTime = Math.abs(currentWeekStart.getTime() - weekStart.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;
  
  const getEventsForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle>Week {weekNumber} • {format(startWeek, 'MMMM d')} - {format(endWeek, 'MMMM d, yyyy')}</CardTitle>
            {onOpenNotes && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onOpenNotes(weekNumber)}
                className="flex items-center gap-1 border-amber-200 text-amber-700 ml-2"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="text-xs">Notes</span>
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onPrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-sm font-medium">{format(day, 'EEE')}</div>
              <div 
                className={`cursor-pointer border rounded-lg p-2 mt-1 min-h-[100px] ${
                  isToday(day)
                    ? 'bg-amber-50 border-amber-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onDayClick(day)}
              >
                <div className="text-right text-sm text-gray-500">{format(day, 'd')}</div>
                <div className="mt-2">
                  {getEventsForDay(day).map((event, index) => (
                    <div key={index} className="text-xs bg-amber-50 p-1 mb-1 rounded truncate">
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Week Goal Input */}
        <div className="mt-4 p-3 border border-dashed border-amber-200 rounded-md bg-amber-50/30">
          <div className="flex items-center mb-2">
            <h4 className="text-sm font-medium text-amber-800">Week {weekNumber} Focus</h4>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your focus for this week..."
              value={goalMarkers[weekNumber] || ''}
              onChange={(e) => onAddGoalMarker(weekNumber, e.target.value)}
              className="flex-1 p-2 text-sm border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyView;
