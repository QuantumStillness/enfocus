
import { TemplateItem } from './types';

export const templates: TemplateItem[] = [
  {
    id: 'weekly-reflection',
    title: 'Weekly Reflection',
    description: 'Review your progress and set intentions for the coming week',
    content: `# Weekly Reflection - Week ${new Date().getDate() <= 7 ? 1 : Math.ceil(new Date().getDate() / 7)}

## Progress Review

### What I accomplished this week:
* 
* 
* 

### Challenges I faced:
* 
* 

### What I learned:
* 
* 

## Planning Ahead

### My focus for next week:
* 
* 

### Key actions to take:
1. 
2. 
3. 

### Habits to maintain or build:
* 
* 

## Personal Reflection

### How am I feeling about my progress?

### What do I need to adjust?

### What am I grateful for this week?
* 
* 
`,
    tags: ['reflection', 'weekly', 'planning']
  },
  {
    id: 'daily-intention',
    title: 'Daily Intention Setting',
    description: 'Start your day with clear intentions aligned with your 12-week goals',
    content: `# Daily Intentions - ${new Date().toLocaleDateString()}

## Morning Reflection

### How am I feeling today? (1-10)

### My top 3 priorities today:
1. 
2. 
3. 

### How these connect to my 12-week goals:
* 

## Intention Setting

### Today I will focus on:

### One small step I can take today:

### I will know today was successful if:

## Evening Check-in

### What went well today?
* 
* 

### What could have gone better?
* 

### Tomorrow I will:
* 
`,
    tags: ['daily', 'intentions', 'focus']
  },
  {
    id: 'milestone-planning',
    title: 'Milestone Planning',
    description: 'Break down your 12-week goals into achievable milestones',
    content: `# 12-Week Milestone Planning

## My 12-Week Vision

### Where I want to be at the end of 12 weeks:

### Why this matters to me:

## Key Focus Areas

### Area 1:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

### Area 2:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

### Area 3:
**Goal:**
**Why it matters:**
**Milestones:**
- Week 4: 
- Week 8: 
- Week 12: 

## Resources Needed

### Skills to develop:
* 
* 

### Support to gather:
* 
* 

### Potential obstacles and solutions:
* 
* 

## Accountability System

### How I'll track progress:

### Who I'll share my journey with:

### How I'll celebrate milestones:
`,
    tags: ['planning', 'milestones', 'goals']
  },
  {
    id: 'quarterly-review',
    title: 'Quarterly Review',
    description: 'Comprehensive review at the end of your 12-week year',
    content: `# 12-Week Year Review

## Achievements

### Goals I accomplished:
* 
* 

### Unexpected wins:
* 
* 

## Learning and Growth

### What I learned about myself:

### New skills developed:
* 
* 

### Habits I built:
* 
* 

## Challenges

### Obstacles I faced:
* 
* 

### How I overcame them:
* 
* 

### What I would do differently:
* 
* 

## Looking Forward

### What to carry forward:
* 
* 

### What to leave behind:
* 
* 

### Initial thoughts for next 12-week cycle:
* 
* 

## Celebration

### How I'll celebrate this completion:

### People to acknowledge:
* 
* 

### Personal acknowledgment (what I'm proud of):
`,
    tags: ['review', 'reflection', 'quarterly']
  }
];
