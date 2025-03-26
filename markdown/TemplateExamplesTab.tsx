
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";

const TemplateExamplesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Syntax Guide</CardTitle>
        <CardDescription>
          How to create and use templates for journaling and planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3">12-Week Year Templates</h3>
              <p className="mb-3">
                Templates for 12-Week Year planning help you structure your goals and track progress consistently.
              </p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Example 12-Week Plan Template</h4>
                <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {`# 12-Week Plan: [Title]

**Start Date:** [Date]
**End Date:** [Date]

## Vision
[Your compelling vision for this 12-week period]

## Goals
1. [Goal 1]
   - Measurement: [How you'll measure success]
   - Actions: [Key actions needed]

2. [Goal 2]
   - Measurement: [How you'll measure success]
   - Actions: [Key actions needed]

## Weekly Plan

### Week 1: [Date Range]
- [ ] Action 1
- [ ] Action 2

### Week 2: [Date Range]
- [ ] Action 1
- [ ] Action 2`}
                </pre>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Daily Journal Templates</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Morning Reflection Template</h4>
                <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {`# Morning Reflection - {{date}}

## Intention for the Day
[What is your primary intention today?]

## Gratitude
1. 
2. 
3. 

## Today's Focus Areas
- [ ] Priority 1: 
- [ ] Priority 2: 
- [ ] Priority 3: 

## Energy Check-in
- Physical: [1-10]
- Mental: [1-10]
- Emotional: [1-10]
- Spiritual: [1-10]`}
                </pre>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Evening Reflection Template</h4>
                <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {`# Evening Reflection - {{date}}

## Today's Wins
1. 
2. 
3. 

## Challenges & Lessons
[What challenges did you face and what did you learn?]

## Gratitude
1. 
2. 
3. 

## Tomorrow's Intention
[What is your intention for tomorrow?]`}
                </pre>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Meditation Journal Templates</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Meditation Session Template</h4>
                <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {`# Meditation: {{meditation_type}}

**Date:** {{date}}
**Duration:** {{duration}} minutes
**Type:** {{meditation_type}}

## Pre-Meditation
- Physical state: 
- Mental state: 
- Intention: 

## Experience
[Notes about your meditation experience]

## Insights
- 
- 

## Post-Meditation
- Physical state: 
- Mental state: 
- Emotions:`}
                </pre>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Creating Your Own Templates</h3>
              <p>
                You can create and save your own templates in our application and export them to Obsidian.
                Use the variables in double curly braces to insert dynamic content.
              </p>
              
              <div className="border rounded p-4 bg-yellow-50 mt-3">
                <h4 className="font-medium mb-2">Available Template Variables</h4>
                <ul className="list-disc pl-5">
                  <li><code>{"{{date}}"}</code> - Current date</li>
                  <li><code>{"{{time}}"}</code> - Current time</li>
                  <li><code>{"{{week_number}}"}</code> - Current week number</li>
                  <li><code>{"{{year}}"}</code> - Current year</li>
                  <li><code>{"{{meditation_type}}"}</code> - Type of meditation</li>
                  <li><code>{"{{duration}}"}</code> - Duration of session</li>
                </ul>
              </div>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TemplateExamplesTab;
