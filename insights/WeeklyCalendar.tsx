
import React, { useState, useEffect } from 'react';
import { format, addWeeks, startOfWeek, endOfWeek, eachDayOfInterval, addDays, differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, PlusCircle, FileText, BookOpen, Calendar, BarChart } from 'lucide-react';
import MarkdownPreview from '@/components/editor/MarkdownPreview';

interface Event {
  title: string;
  description: string;
}

interface WeeklyCalendarProps {}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState<{[key: string]: Event[]}>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<'calendar' | 'templates'>('calendar');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateContent, setTemplateContent] = useState("");
  const [templatePreview, setTemplatePreview] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [intentions, setIntentions] = useState("");
  const [intentionsDialogOpen, setIntentionsDialogOpen] = useState(false);
  
  // Load events and intentions from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('12-week-year-events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Failed to parse saved events:", error);
        // Reset to empty object if parsing fails
        setEvents({});
      }
    }
    
    const savedIntentions = localStorage.getItem('12-week-year-intentions');
    if (savedIntentions) {
      setIntentions(savedIntentions);
    }
  }, []);
  
  // Save events and intentions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('12-week-year-events', JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);
  
  useEffect(() => {
    localStorage.setItem('12-week-year-intentions', intentions);
  }, [intentions]);
  
  const startWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: startWeek, end: endWeek });
  
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(addWeeks(currentDate, -1));
  
  const handleAddEvent = () => {
    if (!selectedDay || !eventTitle) return;
    
    const dateKey = format(selectedDay, 'yyyy-MM-dd');
    const newEvent = { title: eventTitle, description: eventDescription };
    
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
    
    setEventTitle("");
    setEventDescription("");
    setDialogOpen(false);
  };
  
  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setDialogOpen(true);
  };
  
  const getEventsForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };
  
  // Calculate days elapsed and remaining in the 12-week period
  const startDateOfQuarter = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDateOfQuarter = addDays(addWeeks(startDateOfQuarter, 12), -1);
  const totalDays = 84; // 12 weeks * 7 days
  const daysElapsed = Math.min(differenceInDays(new Date(), startDateOfQuarter), totalDays);
  const daysRemaining = totalDays - daysElapsed;
  const progressPercentage = Math.max(0, Math.min(100, (daysElapsed / totalDays) * 100));
  
  // Generate the 12 weeks (3 months) view
  const weeksInQuarter = Array.from({ length: 12 }, (_, i) => {
    const weekStartDate = addWeeks(startDateOfQuarter, i);
    const weekEndDate = addDays(weekStartDate, 6);
    return {
      start: weekStartDate,
      end: weekEndDate,
      weekNumber: i + 1
    };
  });

  // Journal templates
  const templates = [
    {
      id: 'weekly-reflection',
      title: 'Weekly Reflection',
      description: 'Review your progress and set intentions for the coming week',
      content: `# Weekly Reflection - Week ${new Date().getDate() <= 7 ? 1 : Math.ceil(new Date().getDate() / 7)}

## Progress Review

### What I accomplished this week:
* 
* 
* 

### Challenges I faced:
* 
* 

### What I learned:
* 
* 

## Planning Ahead

### My focus for next week:
* 
* 

### Key actions to take:
1. 
2. 
3. 

### Habits to maintain or build:
* 
* 

## Personal Reflection

### How am I feeling about my progress?

### What do I need to adjust?

### What am I grateful for this week?
* 
* 
`
    },
    {
      id: 'daily-intention',
      title: 'Daily Intention Setting',
      description: 'Start your day with clear intentions aligned with your 12-week goals',
      content: `# Daily Intentions - ${format(new Date(), 'MMMM d, yyyy')}

## Morning Reflection

### How am I feeling today? (1-10)

### My top 3 priorities today:
1. 
2. 
3. 

### How these connect to my 12-week goals:
* 

## Intention Setting

### Today I will focus on:

### One small step I can take today:

### I will know today was successful if:

## Evening Check-in

### What went well today?
* 
* 

### What could have gone better?
* 

### Tomorrow I will:
* 
`
    },
    {
      id: 'milestone-planning',
      title: 'Milestone Planning',
      description: 'Break down your 12-week goals into achievable milestones',
      content: `# 12-Week Milestone Planning

## My 12-Week Vision

### Where I want to be at the end of 12 weeks:

### Why this matters to me:

## Key Focus Areas

### Area 1:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

### Area 2:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

### Area 3:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

## Resources Needed

### Skills to develop:
* 
* 

### Support to gather:
* 
* 

### Potential obstacles and solutions:
* 
* 

## Accountability System

### How I'll track progress:

### Who I'll share my journey with:

### How I'll celebrate milestones:
`
    },
    {
      id: 'quarterly-review',
      title: 'Quarterly Review',
      description: 'Comprehensive review at the end of your 12-week year',
      content: `# 12-Week Year Review

## Achievements

### Goals I accomplished:
* 
* 

### Unexpected wins:
* 
* 

## Learning and Growth

### What I learned about myself:

### New skills developed:
* 
* 

### Habits I built:
* 
* 

## Challenges

### Obstacles I faced:
* 
* 

### How I overcame them:
* 
* 

### What I would do differently:
* 
* 

## Looking Forward

### What to carry forward:
* 
* 

### What to leave behind:
* 
* 

### Initial thoughts for next 12-week cycle:
* 
* 

## Celebration

### How I'll celebrate this completion:

### People to acknowledge:
* 
* 

### Personal acknowledgment (what I'm proud of):
`
    }
  ];

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setTemplateContent(template.content);
    setTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    // Create a blob and download the markdown file
    const blob = new Blob([templateContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate || 'template'}-${format(new Date(), 'yyyy-MM-dd')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTemplateDialogOpen(false);
  };

  const handleUpdateIntentions = () => {
    setIntentionsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl font-medium">12-Week Year Calendar</h2>
          <p className="text-sm text-gray-500">Plan your goals and track your progress</p>
        </div>
        
        <Tabs defaultValue="calendar" onValueChange={(value) => setViewType(value as 'calendar' | 'templates')} className="w-full sm:w-auto">
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
      
      {/* Progress tracking */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>12-Week Progress</CardTitle>
              <CardDescription>
                {daysElapsed} days elapsed, {daysRemaining} days remaining
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIntentionsDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span>Intentions</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Week 1</span>
            <span>Week 6</span>
            <span>Week 12</span>
          </div>
        </CardContent>
      </Card>
      
      {viewType === 'calendar' ? (
        <div className="space-y-6">
          {/* Current Week View */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Week of {format(startWeek, 'MMMM d')} - {format(endWeek, 'MMMM d, yyyy')}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={prevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextWeek}>
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
                        format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                          ? 'bg-purple-50 border-purple-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      <div className="text-right text-sm text-gray-500">{format(day, 'd')}</div>
                      <div className="mt-2">
                        {getEventsForDay(day).map((event, index) => (
                          <div key={index} className="text-xs bg-purple-50 p-1 mb-1 rounded truncate">
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 12-Week Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeksInQuarter.map((week, index) => (
              <Card 
                key={index} 
                className={`hover:border-primary/20 transition-colors cursor-pointer ${
                  format(week.start, 'yyyy-MM-dd') <= format(new Date(), 'yyyy-MM-dd') && 
                  format(week.end, 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd')
                    ? 'border-purple-300 bg-purple-50'
                    : ''
                }`}
                onClick={() => setCurrentDate(week.start)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Week {week.weekNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {format(week.start, 'MMM d')} - {format(week.end, 'MMM d, yyyy')}
                  </p>
                  <div className="mt-2">
                    {/* Count events for this week */}
                    {Array.from({ length: 7 }, (_, i) => {
                      const day = addDays(week.start, i);
                      const dayEvents = getEventsForDay(day);
                      return dayEvents.length > 0 ? (
                        <div key={i} className="text-xs">
                          <span className="font-semibold">{format(day, 'EEE')}</span>: {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="hover:border-primary/20 transition-colors cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" variant="secondary" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDay && `Add Event for ${format(selectedDay, 'MMMM d, yyyy')}`}
            </DialogTitle>
            <DialogDescription>
              Create a new event or task for this day.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Event Title</label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                placeholder="Add details about this event"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {templates.find(t => t.id === selectedTemplate)?.title}
            </DialogTitle>
            <DialogDescription>
              Edit this template for your needs, then save it as a markdown file.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-end space-x-2 mb-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTemplatePreview(!templatePreview)}
              >
                {templatePreview ? 'Edit' : 'Preview'}
              </Button>
            </div>
            
            {templatePreview ? (
              <div className="border rounded-md p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                <MarkdownPreview content={templateContent} />
              </div>
            ) : (
              <Textarea
                className="min-h-[400px] font-mono"
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
              />
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              Download as Markdown
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Intentions Dialog */}
      <Dialog open={intentionsDialogOpen} onOpenChange={setIntentionsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              12-Week Year Intentions
            </DialogTitle>
            <DialogDescription>
              Set your intentions and capture your "why" for this 12-week period.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              className="min-h-[300px]"
              placeholder="Write your 12-week year intentions, goals, and vision here..."
              value={intentions}
              onChange={(e) => setIntentions(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIntentionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateIntentions}>
              Save Intentions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeeklyCalendar;
