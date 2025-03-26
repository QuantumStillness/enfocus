
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';
import BestPracticeItem from './BestPracticeItem';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const TwelveWeekYearTab: React.FC = () => {
  const handleExportVault = () => {
    toast({
      title: "Obsidian Vault Download Started",
      description: "Your 12-Week Year Obsidian vault is being downloaded.",
    });
    
    // In a real implementation, you would download an actual zip file here
    window.open('/twelve-week-vault.zip', '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">12-Week Year in Obsidian</h2>
      <p className="text-gray-700 mb-4">
        The 12-Week Year methodology helps you achieve your goals by working in focused 12-week "years" instead of traditional 12-month years. Here's how to set it up in Obsidian:
      </p>
      
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleExportVault}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download 12-Week Year Vault
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BestPracticeItem title="Vault Structure" bgColor="bg-blue-50">
          <CodeBlock language="markdown">
{`12-Week-Year/
├── Current-Period/
│   ├── Goals.md
│   ├── Weekly-Scorecards/
│   ├── Daily-Progress/
│   └── Review.md
├── Past-Periods/
├── Templates/
└── Dashboard.md`}
          </CodeBlock>
          <p className="mt-2 text-sm">This structure keeps your current 12-week period organized while preserving past periods for reference.</p>
        </BestPracticeItem>
        
        <BestPracticeItem title="Required Plugins" bgColor="bg-purple-50">
          <ul className="list-disc pl-5">
            <li><strong>Dataview</strong> - For creating dashboards and reports</li>
            <li><strong>Tasks</strong> - For tracking your lead measures</li>
            <li><strong>Calendar</strong> - For visualizing your progress</li>
            <li><strong>Templater</strong> - For using the templates efficiently</li>
          </ul>
        </BestPracticeItem>
      </div>
      
      <h3 className="text-lg font-semibold mt-6">Template Examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BestPracticeItem title="Goal Setting Template" bgColor="bg-indigo-50">
          <CodeBlock language="markdown">
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
   - Success Criteria: [How you'll know you've achieved it]`}
          </CodeBlock>
        </BestPracticeItem>
        
        <BestPracticeItem title="Weekly Scorecard Template" bgColor="bg-green-50">
          <CodeBlock language="markdown">
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
          </CodeBlock>
        </BestPracticeItem>
      </div>
      
      <h3 className="text-lg font-semibold mt-6">Dashboard Creation</h3>
      <BestPracticeItem title="Main Dashboard" bgColor="bg-yellow-50">
        <p className="mb-2">Create a dashboard with Dataview to track your progress:</p>
        <CodeBlock language="dataview">
{`# 12-Week Year Dashboard

## Current Progress
\`\`\`dataview
TABLE 
  week as "Week",
  round(average_score) + "%" as "Score"
FROM "12-Week-Year/Current-Period/Weekly-Scorecards"
SORT week ASC
\`\`\`

## Current Goals
\`\`\`dataview
LIST WITHOUT ID goal_desc
FROM "12-Week-Year/Current-Period/Goals"
FLATTEN goal_1, goal_2, goal_3
FLATTEN goal_1_desc as goal_desc
WHERE contains(file.name, "Goals")
\`\`\`

## This Week's Focus
![[12-Week-Year/Current-Period/Weekly-Scorecards/Week-{{current_week}}.md]]`}
        </CodeBlock>
      </BestPracticeItem>
      
      <div className="text-center mt-8">
        <p className="mb-4">See our dedicated 12-Week Year planning page for more examples and tools:</p>
        <Link to="/twelve-week">
          <Button>Visit 12-Week Year Planning Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default TwelveWeekYearTab;
