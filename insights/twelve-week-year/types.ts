
import { ReactNode } from "react";

// Core data types
export interface Event {
  title: string;
  description?: string;
}

export interface EventsMap {
  [date: string]: Event[];
}

export interface WeekInfo {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  formattedDate: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  icon?: ReactNode;
}

// Component Props Types
export interface ProgressBarProps {
  daysElapsed: number;
  daysRemaining: number;
  progressPercentage: number;
  onOpenIntentions: () => void;
  goalMarkers?: {[week: number]: string};
  startDate?: Date;
}

export interface WeeklyViewProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  events: EventsMap;
  onDayClick: (day: Date) => void;
  quarterStartDate?: Date;
  goalMarkers?: {[week: number]: string};
  onAddGoalMarker?: (weekNumber: number, goal: string) => void;
}

export interface QuarterlyViewProps {
  weeksInQuarter: WeekInfo[];
  events: EventsMap;
  onWeekClick: (date: Date) => void;
  currentDate: Date;
  goalMarkers?: {[week: number]: string};
  onAddGoalMarker?: (weekNumber: number, goal: string) => void;
}

export interface TemplatesViewProps {
  templates: TemplateItem[];
  onTemplateSelect: (template: TemplateItem) => void;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AddEventDialogProps extends DialogProps {
  selectedDay: Date | null;
  onAddEvent: (title: string, description: string) => void;
}

export interface TemplateDialogProps extends DialogProps {
  selectedTemplate: string | null;
  templateContent: string;
  onContentChange: (content: string) => void;
  onSaveTemplate: () => void;
  templatePreview: boolean;
  onTogglePreview: () => void;
}

export interface IntentionsDialogProps extends DialogProps {
  intentions: string;
  onIntentionsChange: (intentions: string) => void;
  onSave: () => void;
}
