
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Calendar, FileText, Download, Book, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import WeeklyCalendar from "@/components/insights/WeeklyCalendar";
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatForObsidian, generateObsidianFilename } from "@/utils/markdown/obsidian";
import { Link } from 'react-router-dom';

const TwelveWeek = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("planning");
  
  const handleExportVault = () => {
    // This would typically trigger the download of a prepared Obsidian vault
    toast({
      title: "Obsidian Vault Download Started",
      description: "Your 12-Week Year Obsidian vault is being downloaded.",
    });
    
    // In a real implementation, you would download an actual zip file here
    // This is just a placeholder to simulate the functionality
    window.open('/twelve-week-vault.zip', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <AnimatedTransition>
              <h1 className="text-3xl font-light text-gray-800 mb-1">12-Week Year Planning</h1>
            </AnimatedTransition>
            <AnimatedTransition delay={100}>
              <p className="text-gray-500">Focus on your most important goals with the 12-Week Year methodology</p>
            </AnimatedTransition>
          </div>
          
          {user && (
            <AnimatedTransition delay={150}>
              <Alert className="mb-6 border-green-200 bg-green-50">
                <Info className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Thank you for logging in!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Welcome to the 12-Week Year planning tool. We're excited to help you achieve your goals.
                </AlertDescription>
              </Alert>
            </AnimatedTransition>
          )}
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AnimatedTransition delay={200}>
              <Tabs defaultValue="planning" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-3">
                  <TabsTrigger value="planning" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Planning</span>
                  </TabsTrigger>
                  <TabsTrigger value="examples" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Examples</span>
                  </TabsTrigger>
                  <TabsTrigger value="obsidian" className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span>Obsidian Templates</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="planning">
                  <Card>
                    <CardHeader>
                      <CardTitle>12-Week Year Calendar</CardTitle>
                      <CardDescription>
                        Plan and track your 12-Week progress with this interactive calendar
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WeeklyCalendar />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="examples">
                  <Card>
                    <CardHeader>
                      <CardTitle>Example 12-Week Goals & Plans</CardTitle>
                      <CardDescription>
                        Sample 12-Week Year plans to inspire your own goal setting
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Personal Growth Plan</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-semibold mb-2">12-Week Goals:</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                              <li>Read 6 books (1 every 2 weeks)</li>
                              <li>Meditate 60 days out of 84</li>
                              <li>Complete online course</li>
                            </ul>
                            <h3 className="font-semibold mb-2">Weekly Actions:</h3>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Read 30 pages per day</li>
                              <li>Meditate 20 minutes each morning</li>
                              <li>Complete 2 course modules per week</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Fitness Transformation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-semibold mb-2">12-Week Goals:</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                              <li>Exercise 5 days per week</li>
                              <li>Lose 12 pounds</li>
                              <li>Run a 5K under 30 minutes</li>
                            </ul>
                            <h3 className="font-semibold mb-2">Weekly Actions:</h3>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>3 strength training sessions</li>
                              <li>2 cardio sessions</li>
                              <li>Track calories 6 days per week</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="obsidian">
                  <Card>
                    <CardHeader>
                      <CardTitle>Obsidian Integration</CardTitle>
                      <CardDescription>
                        Download templates and vault structure optimized for 12-Week Year planning
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <h3 className="text-lg font-medium mb-3">12-Week Year Obsidian Vault Structure</h3>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <pre className="text-sm">
{`YourVault/
├── 12-Week-Year/
│   ├── Current-Period/
│   │   ├── Goals.md
│   │   ├── Weekly-Scorecards/
│   │   │   ├── Week-1.md
│   │   │   ├── Week-2.md
│   │   │   └── ...
│   │   ├── Daily-Progress/
│   │   └── Review.md
│   ├── Past-Periods/
│   ├── Templates/
│   │   ├── Goal-Sheet.md
│   │   ├── Weekly-Scorecard.md
│   │   └── Daily-Progress.md
│   └── Dashboard.md
└── README.md`}
                          </pre>
                        </div>
                        
                        <Button 
                          onClick={handleExportVault}
                          className="flex items-center gap-2 mb-6"
                        >
                          <Download className="h-4 w-4" />
                          Download 12-Week Year Vault
                        </Button>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card className="shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Weekly Scorecard Template</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-auto">
{`---
week: {{week_number}}
period: {{period_name}}
start_date: {{start_date}}
end_date: {{end_date}}
---

# Week {{week_number}} Scorecard

## Lead Measures
- [ ] Measure 1: 0/7 days
- [ ] Measure 2: 0/5 days
- [ ] Measure 3: 0/3 sessions

## Weekly Results
- Measure 1 Score: 0%
- Measure 2 Score: 0%
- Measure 3 Score: 0%

## Average Weekly Score: 0%

## Insights & Adjustments
- What went well:
- What needs improvement:
- Adjustments for next week:`}
                              </pre>
                            </CardContent>
                          </Card>
                          
                          <Card className="shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Goal Setting Template</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-auto">
{`---
period: {{period_name}}
start_date: {{start_date}}
end_date: {{end_date}}
---

# 12-Week Goals

## Vision
What does success look like at the end of 12 weeks?

## Goals
1. **Goal 1**: [Description]
   - Lead Measure 1: [Daily/Weekly action]
   - Lead Measure 2: [Daily/Weekly action]
   - Success Criteria: [How you'll know you've achieved it]

2. **Goal 2**: [Description]
   - Lead Measure 1: [Daily/Weekly action]
   - Lead Measure 2: [Daily/Weekly action]
   - Success Criteria: [How you'll know you've achieved it]

3. **Goal 3**: [Description]
   - Lead Measure 1: [Daily/Weekly action]
   - Lead Measure 2: [Daily/Weekly action]
   - Success Criteria: [How you'll know you've achieved it]

## Weekly Rhythm
- Monday: [Regular activities]
- Tuesday: [Regular activities]
- Wednesday: [Regular activities]
- Thursday: [Regular activities]
- Friday: [Regular activities]
- Weekend: [Regular activities]`}
                              </pre>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="mb-4">Learn more about using Obsidian with the 12-Week Year methodology:</p>
                        <Link to="/wiki">
                          <Button variant="outline">
                            <Book className="mr-2 h-4 w-4" />
                            View Markdown & Obsidian Wiki
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TwelveWeek;
