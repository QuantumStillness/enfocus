import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, addWeeks, differenceInDays, differenceInWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar, Target, TrendingUp } from 'lucide-react';

interface TwelveWeekCounterProps {
  startDate?: Date;
  className?: string;
}

const TwelveWeekCounter: React.FC<TwelveWeekCounterProps> = ({ 
  startDate: propStartDate,
  className = "" 
}) => {
  const [startDate, setStartDate] = useState<Date>(() => {
    // Try to load from localStorage first
    const savedStart = localStorage.getItem('twelve-week-start-date');
    if (savedStart) {
      return new Date(savedStart);
    }
    // Otherwise use prop or today
    return propStartDate || new Date();
  });
  
  const [progress, setProgress] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [daysLeft, setDaysLeft] = useState(0);
  
  // Initialize or update from props
  useEffect(() => {
    if (propStartDate) {
      setStartDate(propStartDate);
      localStorage.setItem('twelve-week-start-date', propStartDate.toISOString());
    }
  }, [propStartDate]);
  
  // Calculate stats based on start date
  useEffect(() => {
    const now = new Date();
    const endDate = addWeeks(startDate, 12);
    
    // If we're past the end date, reset to 100% complete
    if (now > endDate) {
      setProgress(100);
      setCurrentWeek(13); // Past the 12 weeks
      setDaysLeft(0);
      return;
    }
    
    // If we haven't started yet
    if (now < startDate) {
      setProgress(0);
      setCurrentWeek(0); // Not started yet
      setDaysLeft(differenceInDays(startDate, now));
      return;
    }
    
    // We're in the middle of the cycle
    const totalDays = differenceInDays(endDate, startDate);
    const daysElapsed = differenceInDays(now, startDate);
    const calculatedProgress = Math.min(100, Math.round((daysElapsed / totalDays) * 100));
    
    // Calculate current week (1-indexed)
    const weeksElapsed = Math.min(12, differenceInWeeks(now, startDate) + 1);
    
    // Calculate days left
    const daysRemaining = differenceInDays(endDate, now);
    
    setProgress(calculatedProgress);
    setCurrentWeek(weeksElapsed);
    setDaysLeft(daysRemaining);
  }, [startDate]);
  
  const endDate = addWeeks(startDate, 12);
  const weekStart = format(startOfWeek(addWeeks(startDate, currentWeek - 1)), 'MMM d');
  const weekEnd = format(endOfWeek(addWeeks(startDate, currentWeek - 1)), 'MMM d');
  
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            12-Week Year Progress
          </h3>
          
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex-grow">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="ml-2 text-sm font-medium">{progress}%</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Current Week</h4>
              <p className="font-medium">
                {currentWeek > 0 && currentWeek <= 12 ? (
                  <>Week {currentWeek} ({weekStart} - {weekEnd})</>
                ) : currentWeek > 12 ? (
                  <>Completed</>
                ) : (
                  <>Not Started</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600 mr-3">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Days Remaining</h4>
              <p className="font-medium">
                {daysLeft > 0 ? (
                  <>{daysLeft} days</>
                ) : (
                  <>Completed</>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwelveWeekCounter;
