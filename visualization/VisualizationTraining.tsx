
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Target, EyeOff, Eye, Save, Download, Clock, Settings } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';
import { useSavedVisualization } from './useVisualization';
import VisualizationPlayer from './VisualizationPlayer';
import { visualizationExercises } from './visualizationData';

const VisualizationTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exercises');
  const {
    activeExercise,
    setActiveExercise,
    notes,
    setNotes,
    savedExercises,
    saveExercise,
    isPlaying,
    setIsPlaying
  } = useSavedVisualization();
  
  const handleExerciseSelect = (exercise: any) => {
    setActiveExercise(exercise);
    setActiveTab('practice');
  };
  
  const handleSaveNotes = () => {
    if (activeExercise) {
      saveExercise(activeExercise.id, notes);
    }
  };
  
  const handleDownloadNotes = () => {
    if (!activeExercise) return;
    
    const content = `# Visualization Exercise: ${activeExercise.title}
Date: ${new Date().toLocaleDateString()}

## Exercise Description
${activeExercise.description}

## My Notes
${notes}
`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visualization-${activeExercise.id}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-3">
          <TabsTrigger value="exercises" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Exercises</span>
          </TabsTrigger>
          {activeExercise && (
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Practice</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Saved</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="exercises" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visualizationExercises.map((exercise) => (
              <AnimatedTransition key={exercise.id} delay={exercise.id * 100}>
                <Card className="h-full flex flex-col hover:shadow-md transition-all cursor-pointer" 
                      onClick={() => handleExerciseSelect(exercise)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <CardDescription>
                      {exercise.difficulty} · {exercise.duration} minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Begin Exercise
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedTransition>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-0">
          {activeExercise && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium">{activeExercise.title}</h2>
                  <p className="text-gray-500">{activeExercise.difficulty} · {activeExercise.duration} minutes</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('exercises')}
                  >
                    Back to Exercises
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Visualization Exercise</CardTitle>
                  <CardDescription>Follow the guided steps below</CardDescription>
                </CardHeader>
                <CardContent>
                  <VisualizationPlayer 
                    exercise={activeExercise}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>Record your experience with this visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your observations, insights, and experiences here..."
                    className="min-h-[200px]"
                  />
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleDownloadNotes}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={handleSaveNotes}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          {savedExercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedExercises.map((saved) => {
                const exercise = visualizationExercises.find(e => e.id === saved.exerciseId);
                if (!exercise) return null;
                
                return (
                  <Card key={saved.exerciseId} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription>
                        Last practiced: {new Date(saved.lastPracticed).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <p className="text-sm text-gray-600 line-clamp-3">{saved.notes}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="sm"
                        onClick={() => {
                          setActiveExercise(exercise);
                          setNotes(saved.notes);
                          setActiveTab('practice');
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Continue Practice
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <EyeOff className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No saved visualizations</h3>
              <p className="text-gray-500 mt-2">
                Your saved visualization practices will appear here
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab('exercises')}
              >
                Start a Visualization Exercise
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisualizationTraining;
