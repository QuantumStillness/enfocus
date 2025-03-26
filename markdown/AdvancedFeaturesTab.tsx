
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';
import BestPracticeItem from './BestPracticeItem';

const AdvancedFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Advanced Markdown Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BestPracticeItem title="Internal Links" bgColor="bg-indigo-50">
          <p className="mb-2">Link between notes to build a connected knowledge system:</p>
          <CodeBlock language="markdown">
{`Link to [[another note]]
Link with [[note|custom text]]`}
          </CodeBlock>
        </BestPracticeItem>
        
        <BestPracticeItem title="Embeds" bgColor="bg-indigo-50">
          <p className="mb-2">Embed content from other notes:</p>
          <CodeBlock language="markdown">
{`![[note]]
![[note#section]]
![[image.png]]`}
          </CodeBlock>
        </BestPracticeItem>
      </div>
      
      <BestPracticeItem title="Dataview Queries" bgColor="bg-purple-50">
        <p className="mb-2">With the Dataview plugin, create dynamic content:</p>
        <CodeBlock language="dataview">
{`TABLE 
  file.cday as "Created",
  emotion as "Emotion"
FROM "Journal/Daily"
WHERE contains(tags, "meditation")
SORT file.cday DESC
LIMIT 5`}
        </CodeBlock>
      </BestPracticeItem>
      
      <h3 className="text-lg font-semibold mt-6">Integration with 12-Week Year</h3>
      <p className="mb-4">Track your 12-Week progress in Obsidian:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BestPracticeItem title="Weekly Scorecard" bgColor="bg-green-50">
          <CodeBlock language="markdown">
{`# Week {{week_number}} Scorecard

## Lead Measures
- [ ] Meditation: 7/7 days
- [ ] Writing: 5/7 days
- [ ] Project X: 3 focused hours

## Results
- Meditation Score: 0%
- Writing Score: 0%
- Project Score: 0%

## Weekly Average: 0%`}
          </CodeBlock>
        </BestPracticeItem>
        
        <BestPracticeItem title="Quarterly Review" bgColor="bg-green-50">
          <CodeBlock language="markdown">
{`# 12-Week Year Review

## Goals & Results
1. Goal: {{goal_1}}
   - Result: {{result_1}}
   - Success rate: {{rate_1}}%

2. Goal: {{goal_2}}
   - Result: {{result_2}}
   - Success rate: {{rate_2}}%

## Learning & Insights
- What worked:
- What didn't:
- Adjustments for next period:`}
          </CodeBlock>
        </BestPracticeItem>
      </div>
    </div>
  );
};

export default AdvancedFeaturesTab;
