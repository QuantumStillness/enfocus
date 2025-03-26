
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, FileText, CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  handleSetQuarterStartDate: (date: Date | undefined) => void;
  quarterStartDate: Date;
  handleExportObsidian: () => void;
  viewType: 'calendar' | 'templates';
  setViewType: (type: 'calendar' | 'templates') => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  datePickerOpen,
  setDatePickerOpen,
  handleSetQuarterStartDate,
  quarterStartDate,
  handleExportObsidian,
  viewType,
  setViewType
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div>
        <h2 className="text-xl font-medium">12-Week Year Calendar</h2>
        <p className="text-sm text-gray-500">Plan your goals and track your progress</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Set Start Date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={quarterStartDate}
              onSelect={handleSetQuarterStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportObsidian}
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          <span>Export to Obsidian</span>
        </Button>
        
        <Tabs 
          defaultValue="calendar" 
          value={viewType} 
          onValueChange={(value) => setViewType(value as 'calendar' | 'templates')} 
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarHeader;
