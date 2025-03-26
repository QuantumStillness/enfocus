
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ClipboardCheck, Target, Book } from 'lucide-react';

const TwelveWeekWiki: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">12-Week Year System Wiki</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is the 12-Week Year?</CardTitle>
              <CardDescription>
                An introduction to the 12-Week Year productivity system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-medium mb-3">Core Concept</h3>
                    <p className="mb-3">
                      The 12-Week Year is a productivity system created by Brian P. Moran and Michael Lennington that redefines a year as being 12 weeks, not 12 months. By shortening your execution cycle from a year to 12 weeks, you create a sense of urgency that increases focus and productivity.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <h4 className="font-medium flex items-center mb-2">
                          <Target className="h-4 w-4 mr-2 text-blue-600" />
                          Traditional Annual Planning
                        </h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>12-month execution cycle</li>
                          <li>Goals often abandoned by Q2</li>
                          <li>End-of-year cramming</li>
                          <li>Long feedback loops</li>
                          <li>Annual goals feel distant</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-green-50">
                        <h4 className="font-medium flex items-center mb-2">
                          <Target className="h-4 w-4 mr-2 text-green-600" />
                          12-Week Year Approach
                        </h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>12-week execution cycle</li>
                          <li>Greater sense of urgency</li>
                          <li>Consistent effort throughout</li>
                          <li>Rapid feedback loops</li>
                          <li>Goals feel immediate and actionable</li>
                        </ul>
                      </div>
                    </div>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                      "A 12-week year creates a new end game date – the point at which you assess your success. It narrows your focus to a shorter time frame, which creates a heightened sense of urgency and eliminates the illusion of having 'plenty of time' to accomplish your goals."
                    </blockquote>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Key Principles</h3>
                    
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">1. Vision</h4>
                        <p className="text-sm">
                          Start with a compelling, long-term vision that guides your 12-week goals. This vision provides direction and motivation.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">2. 12-Week Goals</h4>
                        <p className="text-sm">
                          Set ambitious but achievable goals for the 12-week period, aligned with your vision.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">3. Weekly Plans</h4>
                        <p className="text-sm">
                          Break your 12-week goals into weekly action plans with specific, measurable tasks.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">4. Daily Actions</h4>
                        <p className="text-sm">
                          Execute your weekly plan with daily actions and tasks.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">5. Scorekeeping</h4>
                        <p className="text-sm">
                          Track your progress with weekly measurements to maintain accountability.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">6. Weekly Reviews</h4>
                        <p className="text-sm">
                          Conduct honest reviews of your performance each week to learn and adjust.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Benefits of the 12-Week Year</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Increased Focus</h4>
                        <p className="text-sm flex-1">
                          A shorter timeframe naturally increases focus and reduces procrastination.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Greater Urgency</h4>
                        <p className="text-sm flex-1">
                          With only 12 weeks, there's no time to waste, creating productive urgency.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Faster Feedback</h4>
                        <p className="text-sm flex-1">
                          Regular weekly reviews provide quicker feedback for adjustments.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Better Predictability</h4>
                        <p className="text-sm flex-1">
                          Easier to predict and plan for a 12-week period than 12 months.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Increased Achievement</h4>
                        <p className="text-sm flex-1">
                          Most users report accomplishing more in 12 weeks than in an entire year with traditional planning.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4 flex flex-col">
                        <h4 className="font-medium mb-2">Predictable Success</h4>
                        <p className="text-sm flex-1">
                          The system creates predictable execution and results.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Implement the 12-Week Year</CardTitle>
              <CardDescription>
                A practical guide to setting up and managing your 12-Week Year system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-medium mb-3">Step 1: Create Your Vision</h3>
                    <p className="mb-3">
                      Start by defining a compelling, long-term vision that excites and inspires you. This vision will guide your 12-week goals and provide motivation during challenging periods.
                    </p>
                    
                    <div className="border rounded p-4 bg-purple-50 mb-4">
                      <h4 className="font-medium mb-2">Vision Example</h4>
                      <blockquote className="italic">
                        "To become a published author with a book that helps thousands of people improve their lives, while maintaining a healthy work-life balance that allows me to spend quality time with my family and maintain excellent physical health."
                      </blockquote>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Your vision should be specific enough to guide your actions but broad enough to inspire you. Write it down and keep it visible.
                    </p>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Step 2: Set 12-Week Goals</h3>
                    <p className="mb-3">
                      Identify 1-3 key goals for your 12-week period. These goals should be:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Specific and measurable</li>
                      <li>Aligned with your vision</li>
                      <li>Ambitious but achievable in 12 weeks</li>
                      <li>Written with clear success criteria</li>
                    </ul>
                    
                    <div className="border rounded p-4 bg-blue-50 mb-4">
                      <h4 className="font-medium mb-2">Goal Format Example</h4>
                      <p className="mb-2"><strong>Goal:</strong> Complete the first draft of my book (60,000 words)</p>
                      <p className="mb-2"><strong>Success Criteria:</strong> Full manuscript draft of 60,000 words with all chapters outlined and written.</p>
                      <p><strong>Significance:</strong> This is the first major milestone toward becoming a published author and will allow me to begin the editing and publication process.</p>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Step 3: Create a Tactical Plan</h3>
                    <p className="mb-3">
                      Break down each goal into specific actions that need to be completed within the 12-week period.
                    </p>
                    
                    <div className="border rounded p-4 mb-4">
                      <h4 className="font-medium mb-2">Example Tactical Plan for Book Writing Goal</h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Complete detailed chapter outline (Week 1)</li>
                        <li>Research key topics and gather sources (Week 2)</li>
                        <li>Write intro chapter (Week 3)</li>
                        <li>Write chapters 1-2 (Weeks 4-5)</li>
                        <li>Write chapters 3-4 (Weeks 6-7)</li>
                        <li>Write chapters 5-6 (Weeks 8-9)</li>
                        <li>Write chapters 7-8 (Weeks 10-11)</li>
                        <li>Write conclusion and review full manuscript (Week 12)</li>
                      </ol>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Your tactical plan should be specific about what needs to be done and when, creating clear weekly milestones.
                    </p>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Step 4: Create Weekly Plans</h3>
                    <p className="mb-3">
                      At the beginning of each week, create a detailed plan of exactly what you will accomplish that week based on your tactical plan.
                    </p>
                    
                    <div className="border rounded p-4 bg-green-50 mb-4">
                      <h4 className="font-medium mb-2">Example Weekly Plan (Week 3)</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Monday: Outline introduction chapter (2 hours)</li>
                        <li>Tuesday: Write first draft of introduction pages 1-5 (3 hours)</li>
                        <li>Wednesday: Write first draft of introduction pages 6-10 (3 hours)</li>
                        <li>Thursday: Complete first draft of introduction (2 hours)</li>
                        <li>Friday: Review and revise introduction draft (2 hours)</li>
                        <li>Saturday: Finalize introduction chapter (2 hours)</li>
                        <li>Sunday: Weekly review and plan next week (1 hour)</li>
                      </ul>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Weekly plans should be specific about what you'll do each day, including time blocks if possible.
                    </p>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Step 5: Track Progress and Review</h3>
                    <p className="mb-4">
                      Track your execution and results on a weekly basis. Schedule a consistent time each week to review your progress and plan the next week.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Weekly Review Process</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm">
                          <li>Calculate your execution score (% of planned actions completed)</li>
                          <li>Review progress toward your 12-week goals</li>
                          <li>Identify what went well</li>
                          <li>Identify challenges or obstacles</li>
                          <li>Record lessons learned</li>
                          <li>Adjust your plan for the coming week</li>
                        </ol>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Execution Score Example</h4>
                        <p className="text-sm mb-2">
                          If you planned 10 key actions for the week and completed 8, your execution score is 80%.
                        </p>
                        <p className="text-sm mb-2">
                          <strong>Target:</strong> 85%+ execution consistently
                        </p>
                        <p className="text-sm">
                          This score gives you an objective measure of your follow-through, regardless of results.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>12-Week Year Examples</CardTitle>
              <CardDescription>
                Sample plans and templates for different types of goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-medium mb-3">Example 1: Fitness Transformation</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Vision</h4>
                      <p className="italic border-l-4 border-gray-300 pl-4">
                        "To develop a strong, healthy body that gives me energy and confidence in all areas of my life."
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">12-Week Goals</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Lose 15 pounds of body fat</li>
                        <li>Increase strength (bench press from 150 to 185, squat from 200 to 250)</li>
                        <li>Establish consistent workout habit (4x per week minimum)</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Weekly Plan Example (Week 4)</h4>
                      <div className="border rounded p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Workouts</h5>
                            <ul className="list-disc pl-6 text-sm space-y-1">
                              <li>Monday: Upper Body Strength</li>
                              <li>Tuesday: HIIT Cardio (20 min)</li>
                              <li>Wednesday: Rest</li>
                              <li>Thursday: Lower Body Strength</li>
                              <li>Friday: Full Body Circuit</li>
                              <li>Saturday: Active Recovery (walk/hike)</li>
                              <li>Sunday: Rest</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm mb-2">Nutrition</h5>
                            <ul className="list-disc pl-6 text-sm space-y-1">
                              <li>Meal prep on Sunday for M-W</li>
                              <li>Meal prep on Wednesday for Th-Sat</li>
                              <li>Track all food in app</li>
                              <li>1,800 calories daily goal</li>
                              <li>Protein goal: 150g daily</li>
                              <li>Water goal: 3L daily</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="font-medium text-sm mb-2">Tracking</h5>
                          <ul className="list-disc pl-6 text-sm">
                            <li>Weigh in Monday morning</li>
                            <li>Take progress photos on Sunday</li>
                            <li>Record all workout weights/reps</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Example 2: Business Growth</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Vision</h4>
                      <p className="italic border-l-4 border-gray-300 pl-4">
                        "To build a thriving consulting business that helps small businesses increase their revenue while providing me with financial freedom and work flexibility."
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">12-Week Goals</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Acquire 5 new clients ($5,000+ monthly revenue)</li>
                        <li>Create and launch signature service package</li>
                        <li>Develop systems for client onboarding and delivery</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Lead Indicators (Weekly Metrics)</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>15 prospecting calls/emails per week</li>
                        <li>5 discovery calls per week</li>
                        <li>2 proposal presentations per week</li>
                        <li>3 hours of service development per week</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Weekly Scoreboard</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2">Metric</th>
                              <th className="border border-gray-300 px-4 py-2">Goal</th>
                              <th className="border border-gray-300 px-4 py-2">Actual</th>
                              <th className="border border-gray-300 px-4 py-2">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">Prospecting Calls/Emails</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">15</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">12</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">80%</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">Discovery Calls</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">80%</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">Proposals Presented</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">100%</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">Service Development</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">3 hrs</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">2.5 hrs</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">83%</td>
                            </tr>
                            <tr className="bg-gray-100">
                              <td className="border border-gray-300 px-4 py-2 font-medium">Overall Execution</td>
                              <td className="border border-gray-300 px-4 py-2"></td>
                              <td className="border border-gray-300 px-4 py-2"></td>
                              <td className="border border-gray-300 px-4 py-2 text-center font-medium">86%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>12-Week Year Resources</CardTitle>
              <CardDescription>
                Helpful tools and additional resources for implementing your 12-Week Year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-medium mb-3">Templates and Downloads</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded p-4">
                        <div className="flex items-center mb-3">
                          <Book className="h-5 w-5 mr-2 text-blue-600" />
                          <h4 className="font-medium">12-Week Planning Template</h4>
                        </div>
                        <p className="text-sm mb-3">
                          A comprehensive planning template for your 12-Week Year, including vision, goals, tactical plans, and weekly planning sections.
                        </p>
                        <Button variant="outline" className="w-full flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Template
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4">
                        <div className="flex items-center mb-3">
                          <ClipboardCheck className="h-5 w-5 mr-2 text-green-600" />
                          <h4 className="font-medium">Weekly Review Worksheet</h4>
                        </div>
                        <p className="text-sm mb-3">
                          A structured worksheet for conducting effective weekly reviews and planning your next week.
                        </p>
                        <Button variant="outline" className="w-full flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Worksheet
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4">
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                          <h4 className="font-medium">12-Week Calendar</h4>
                        </div>
                        <p className="text-sm mb-3">
                          A visual calendar for tracking your 12-week period with built-in progress tracking.
                        </p>
                        <Button variant="outline" className="w-full flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Calendar
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4">
                        <div className="flex items-center mb-3">
                          <Target className="h-5 w-5 mr-2 text-red-600" />
                          <h4 className="font-medium">Goal Tracking Spreadsheet</h4>
                        </div>
                        <p className="text-sm mb-3">
                          A detailed spreadsheet for tracking multiple goals, lead indicators, and execution scores.
                        </p>
                        <Button variant="outline" className="w-full flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Spreadsheet
                        </Button>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Recommended Reading</h3>
                    
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">The 12 Week Year</h4>
                        <p className="text-sm text-gray-600 mb-1">by Brian P. Moran & Michael Lennington</p>
                        <p className="text-sm">
                          The original book that explains the complete system in detail, with examples and implementation guides.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">Atomic Habits</h4>
                        <p className="text-sm text-gray-600 mb-1">by James Clear</p>
                        <p className="text-sm">
                          A complementary book that helps establish the daily habits needed to execute your 12-Week plan consistently.
                        </p>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-1">The 4 Disciplines of Execution</h4>
                        <p className="text-sm text-gray-600 mb-1">by Chris McChesney, Sean Covey, and Jim Huling</p>
                        <p className="text-sm">
                          A framework for executing your most important goals that pairs well with the 12-Week Year approach.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h3 className="text-lg font-medium mb-3">Implementation Tips</h3>
                    
                    <div className="space-y-3">
                      <div className="border rounded p-3 bg-yellow-50">
                        <h4 className="font-medium mb-1">Start Small</h4>
                        <p className="text-sm">
                          If you're new to the system, start with just 1-2 key goals for your first 12-week period. You can add more complexity later.
                        </p>
                      </div>
                      
                      <div className="border rounded p-3 bg-yellow-50">
                        <h4 className="font-medium mb-1">Protect Your Time Blocks</h4>
                        <p className="text-sm">
                          Schedule specific time blocks for your most important actions and treat them as non-negotiable appointments.
                        </p>
                      </div>
                      
                      <div className="border rounded p-3 bg-yellow-50">
                        <h4 className="font-medium mb-1">Weekly Reviews Are Essential</h4>
                        <p className="text-sm">
                          Don't skip your weekly reviews. They're crucial for maintaining momentum and making adjustments.
                        </p>
                      </div>
                      
                      <div className="border rounded p-3 bg-yellow-50">
                        <h4 className="font-medium mb-1">Include a "Buffer Week"</h4>
                        <p className="text-sm">
                          Consider planning for 11 weeks of execution and leaving the 12th week as a buffer for completing any unfinished tasks.
                        </p>
                      </div>
                      
                      <div className="border rounded p-3 bg-yellow-50">
                        <h4 className="font-medium mb-1">Celebrate Completion</h4>
                        <p className="text-sm">
                          Plan a meaningful reward for the end of your 12-week period to celebrate your achievements before starting the next cycle.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TwelveWeekWiki;
