
import { useState, useEffect } from 'react';
import { visualizationExercises } from './visualizationData';

interface SavedVisualization {
  exerciseId: number;
  notes: string;
  lastPracticed: string;
}

export const useSavedVisualization = () => {
  const [activeExercise, setActiveExercise] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [savedExercises, setSavedExercises] = useState<SavedVisualization[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Load saved visualizations on component mount
  useEffect(() => {
    const saved = localStorage.getItem('visualization-exercises');
    if (saved) {
      try {
        setSavedExercises(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved visualizations:', error);
      }
    }
  }, []);
  
  // Load notes when changing active exercise
  useEffect(() => {
    if (activeExercise) {
      const saved = savedExercises.find(s => s.exerciseId === activeExercise.id);
      if (saved) {
        setNotes(saved.notes);
      } else {
        setNotes('');
      }
    }
  }, [activeExercise, savedExercises]);
  
  const saveExercise = (exerciseId: number, exerciseNotes: string) => {
    const now = new Date().toISOString();
    const updatedExercises = [...savedExercises];
    
    const existingIndex = updatedExercises.findIndex(s => s.exerciseId === exerciseId);
    
    if (existingIndex >= 0) {
      updatedExercises[existingIndex] = {
        ...updatedExercises[existingIndex],
        notes: exerciseNotes,
        lastPracticed: now
      };
    } else {
      updatedExercises.push({
        exerciseId,
        notes: exerciseNotes,
        lastPracticed: now
      });
    }
    
    setSavedExercises(updatedExercises);
    localStorage.setItem('visualization-exercises', JSON.stringify(updatedExercises));
  };
  
  return {
    activeExercise,
    setActiveExercise,
    notes,
    setNotes,
    savedExercises,
    saveExercise,
    isPlaying,
    setIsPlaying
  };
};
