
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';
import BestPracticeItem from './BestPracticeItem';

const VaultStructureTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Obsidian Vault Structure</h2>
      <p className="text-gray-700">
        Organizing your Obsidian vault helps you maintain and navigate your personal knowledge system.
        Here's a recommended structure that works well with content from this app:
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <CodeBlock language="markdown">
{`YourVault/
├── Journal/
│   ├── Daily/
│   └── Templates/
├── Meditation/
│   ├── Notes/
│   └── Templates/
├── Insights/
│   ├── Habits/
│   ├── 12-Week-Plans/
│   └── Reports/
└── Templates/`}
        </CodeBlock>
      </div>
      
      <h3 className="text-lg font-semibold mt-4">Frontmatter & Metadata</h3>
      <p className="mb-4">
        Obsidian uses YAML frontmatter for metadata. Our exports automatically include this:
      </p>
      
      <CodeBlock language="yaml">
{`---
date: 2023-08-15
tags: [journal, mindfulness, emotion/calm]
emotion: calm
energy: 
  root: 70
  sacral: 65
  solar: 80
  heart: 85
  throat: 75
  third-eye: 60
  crown: 55
---`}
      </CodeBlock>
      
      <h3 className="text-lg font-semibold mt-6">Template Examples with Obsidian Syntax</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <BestPracticeItem title="Weekly Review Template" bgColor="bg-blue-50">
          <CodeBlock language="markdown">
{`---
date: {{date}}
time: {{time}}
week_number: {{week_number}}
year: {{year}}
meditation_type: reflection
duration: 15
---

# Weekly Review - Week {{week_number}}

## Progress Review
- Highlights:
- Challenges:

## Habit Tracker
- Meditation: ⬜⬜⬜⬜⬜⬜⬜
- Journaling: ⬜⬜⬜⬜⬜⬜⬜
- Exercise:   ⬜⬜⬜⬜⬜⬜⬜

## Next Week Planning
![[Weekly-Goals-Template]]`}
          </CodeBlock>
        </BestPracticeItem>
        
        <BestPracticeItem title="Plugin Recommendations" bgColor="bg-yellow-50">
          <ul className="list-disc pl-5">
            <li><strong>Dataview</strong> - Query and filter your notes</li>
            <li><strong>Calendar</strong> - Visualize entries by date</li>
            <li><strong>Templater</strong> - Advanced templates</li>
            <li><strong>Kanban</strong> - Visual task boards</li>
            <li><strong>Periodic Notes</strong> - Daily, weekly notes</li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border border-yellow-200">
            <p className="text-sm"><strong>Tip:</strong> Use Dataview to create dashboards that automatically show recent journal entries, upcoming tasks, and insights.</p>
          </div>
        </BestPracticeItem>
      </div>
    </div>
  );
};

export default VaultStructureTab;
