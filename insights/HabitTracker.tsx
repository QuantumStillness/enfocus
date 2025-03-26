
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Plus, X, FileDown, Calendar } from 'lucide-react';
import { toast } from "sonner";
import { formatForObsidian, generateObsidianFilename } from '@/utils/markdown';
import { format } from 'date-fns';

// Initial example habits
const demoHabits = [
  { id: 1, name: "Morning Meditation", streak: 7 },
  { id: 2, name: "Journal Writing", streak: 12 },
  { id: 3, name: "Gratitude Practice", streak: 4 },
  { id: 4, name: "Evening Reflection", streak: 3 }
];

const HabitTracker = () => {
  const [habits, setHabits] = useState<Array<{id: number, name: string, streak: number}>>(() => {
    const savedHabits = localStorage.getItem('habit-tracker-data');
    return savedHabits ? JSON.parse(savedHabits) : demoHabits;
  });
  const [newHabit, setNewHabit] = useState("");
  const [habitHistory, setHabitHistory] = useState<Record<string, Record<string, boolean>>>(() => {
    const savedHistory = localStorage.getItem('habit-tracker-history');
    return savedHistory ? JSON.parse(savedHistory) : {};
  });

  // Save habits and history to localStorage
  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(habits));
  }, [habits]);
  
  useEffect(() => {
    localStorage.setItem('habit-tracker-history', JSON.stringify(habitHistory));
  }, [habitHistory]);

  const handleAddHabit = () => {
    if (!newHabit.trim()) {
      toast.error("Please enter a habit name");
      return;
    }
    
    const habit = {
      id: Date.now(),
      name: newHabit,
      streak: 0
    };
    
    setHabits([...habits, habit]);
    setNewHabit("");
    
    toast.success(`"${newHabit}" has been added to your tracking`);
  };

  const incrementStreak = (id: number) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const habit = habits.find(h => h.id === id);
    
    if (!habit) return;

    // Record the completion in history
    setHabitHistory(prev => ({
      ...prev,
      [habit.name]: {
        ...(prev[habit.name] || {}),
        [today]: true
      }
    }));
    
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, streak: habit.streak + 1 } : habit
    ));
    
    toast.success(`Completed "${habit.name}" today!`);
  };

  const resetStreak = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, streak: 0 } : habit
    ));
    
    toast.info("Your streak has been reset");
  };
  
  const handleExportToObsidian = () => {
    // Create markdown content
    let content = `# Habit Tracker\n\n`;
    content += `*Exported on ${format(new Date(), 'MMMM d, yyyy')}*\n\n`;
    content += `## Current Habits\n\n`;
    
    habits.forEach(habit => {
      content += `### ${habit.name}\n`;
      content += `- Current streak: ${habit.streak} days\n`;
      
      // Add history if available
      if (habitHistory[habit.name]) {
        content += `- Completion history:\n`;
        Object.entries(habitHistory[habit.name])
          .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
          .slice(0, 10) // Show only last 10 entries
          .forEach(([date, completed]) => {
            content += `  - ${format(new Date(date), 'MMM d, yyyy')}: ${completed ? '✅ Completed' : '❌ Missed'}\n`;
          });
      }
      
      content += '\n';
    });
    
    content += `## Weekly Summary\n\n`;
    content += `*Add your weekly reflection on habit progress here*\n\n`;
    
    // Format for Obsidian
    const metadata = {
      title: 'Habit Tracker',
      date: new Date().toISOString(),
      tags: ['habits', 'tracking', 'productivity'],
      habits: habits.map(h => h.name)
    };
    
    const obsidianContent = formatForObsidian(content, metadata);
    
    // Create a blob and download
    const blob = new Blob([obsidianContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = generateObsidianFilename('habit-tracker', new Date(), 'tracker');
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Habit tracker exported to Obsidian (${filename})`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium mb-2">Your Habits</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportToObsidian}
          className="flex items-center gap-1"
        >
          <FileDown className="h-4 w-4" />
          <span>Export to Obsidian</span>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Input 
          placeholder="Enter a new habit to track..." 
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
          className="sm:flex-1"
        />
        <Button onClick={handleAddHabit} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Habit</span>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map(habit => (
          <Card key={habit.id} className="group hover:border-primary/20 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{habit.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-semibold">{habit.streak}</span>
                  <span className="text-gray-500 ml-2 text-sm">day streak</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => incrementStreak(habit.id)}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => resetStreak(habit.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
