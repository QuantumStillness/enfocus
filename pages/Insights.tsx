
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { PieChart, BarChart, Calendar, Target, TrendingUp, FileDown, Book } from 'lucide-react';
import HabitTracker from "@/components/insights/HabitTracker";
import WeeklyCalendar from "@/components/insights/WeeklyCalendar";
import ReportsSection from "@/components/insights/ReportsSection";
import ObsidianIntegrationInfo from "@/components/markdown/ObsidianIntegrationInfo";
import { Button } from "@/components/ui/button";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("tracking");
  const [showObsidianInfo, setShowObsidianInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="journal-container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <AnimatedTransition>
              <h1 className="text-3xl font-light text-gray-800 mb-1">Lightmind Insights</h1>
            </AnimatedTransition>
            <AnimatedTransition delay={100}>
              <p className="text-gray-500">Track your progress, view reports, and plan your 12-week year</p>
            </AnimatedTransition>
          </div>
          
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowObsidianInfo(!showObsidianInfo)}
              className="flex items-center gap-1"
            >
              <Book className="h-4 w-4" />
              <span>Obsidian Integration</span>
            </Button>
          </div>
          
          {showObsidianInfo && (
            <AnimatedTransition delay={150}>
              <div className="mb-6">
                <ObsidianIntegrationInfo />
              </div>
            </AnimatedTransition>
          )}
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AnimatedTransition delay={200}>
              <Tabs defaultValue="tracking" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-3">
                  <TabsTrigger value="tracking" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Habit Tracking</span>
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Reports</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>12-Week Year</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tracking" className="mt-0">
                  <HabitTracker />
                </TabsContent>
                
                <TabsContent value="reports" className="mt-0">
                  <ReportsSection />
                </TabsContent>
                
                <TabsContent value="calendar" className="mt-0">
                  <WeeklyCalendar />
                </TabsContent>
              </Tabs>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;
