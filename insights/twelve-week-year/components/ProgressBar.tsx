
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProgressBarProps {
  daysElapsed: number;
  daysRemaining: number;
  progressPercentage: number;
  onOpenIntentions: () => void;
  goalMarkers?: {[week: number]: string};
  startDate: Date;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  daysElapsed,
  daysRemaining,
  progressPercentage,
  onOpenIntentions,
  goalMarkers = {},
  startDate
}) => {
  // Calculate positions for goal markers (convert from week number to percentage)
  const markerPositions = Object.entries(goalMarkers).map(([week, goal]) => ({
    week: parseInt(week),
    goal,
    position: (parseInt(week) / 12) * 100
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>12-Week Progress</CardTitle>
            <CardDescription>
              {daysElapsed} days elapsed, {daysRemaining} days remaining
              {startDate && (
                <span className="ml-2">
                  (Started: {format(startDate, 'MMM d, yyyy')})
                </span>
              )}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onOpenIntentions}
            className="flex items-center gap-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>Intentions</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Progress value={progressPercentage} className="h-3 mb-2" />
          
          {/* Goal markers */}
          <TooltipProvider>
            {markerPositions.map((marker, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="absolute top-0 mt-0.5 cursor-pointer"
                    style={{ 
                      left: `${marker.position}%`, 
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <Flag className="h-2.5 w-2.5 text-amber-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">Week {marker.week} Goal</p>
                  <p className="text-xs">{marker.goal}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Week 1</span>
          <span>Week 6</span>
          <span>Week 12</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
