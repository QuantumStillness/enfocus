
export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface TemplateCategories {
  [key: string]: Template[];
}

export const templates: TemplateCategories = {
  mindfulness: [
    {
      id: 'mindful-morning',
      title: 'Mindful Morning',
      description: 'Start your day with intention and awareness',
      content: `# Mindful Morning Routine

## Intentions
- Today I will focus on: 
- I am grateful for:
- My positive affirmation:

## Morning Practice
1. 5 minutes of mindful breathing
2. Body scan meditation
3. Setting intentions for the day

## Notes
- How does my body feel this morning?
- What thoughts are present?
- What am I looking forward to today?

## 12-Week Focus
- How does this morning connect to my quarterly goals?
- What small step can I take today towards my most important goal?

*Remember to be gentle with yourself and start your day with compassion.*`
    },
    {
      id: 'emotional-check-in',
      title: 'Emotional Check-in',
      description: 'Processing and understanding your emotions',
      content: `# Emotional Check-in

## Current Emotional State
- Primary emotion I'm feeling:
- Secondary emotions:
- Physical sensations:

## Reflection
- What triggered these emotions?
- Are these emotions serving me?
- What do these emotions tell me about my needs?

## Response
- How can I respond to these emotions with compassion?
- What actions might help address the underlying needs?

## 12-Week Integration
- How do these emotions relate to my quarterly goals?
- What adjustments might I need to make to my 12-week plan?

*Your emotions are valid messengers, not permanent states.*`
    }
  ],
  workoutGoals: [
    {
      id: 'strength-training',
      title: 'Strength Training Plan',
      description: 'Track and plan your strength progress',
      content: `# 12-Week Strength Training Plan

## Current Stats
- Date: {{date}}
- Weight:
- Main lifts (current 1RM):
  - Squat:
  - Bench:
  - Deadlift:
  - Overhead Press:

## 12-Week Goals
- Target weight:
- Target lifts:
  - Squat:
  - Bench:
  - Deadlift:
  - Overhead Press:

## Weekly Schedule
- Monday:
- Tuesday:
- Wednesday:
- Thursday:
- Friday:
- Saturday:
- Sunday:

## Progress Metrics
- Weekly check-ins
- Monthly measurements
- Progress photos

## Notes
- Recovery strategies:
- Nutrition focus:
- Adjustments needed:

*Consistency over intensity. Focus on the process, not just the outcome.*`
    },
    {
      id: 'cardio-endurance',
      title: 'Cardio Endurance Program',
      description: 'Build your cardiovascular fitness',
      content: `# 12-Week Cardio Endurance Program

## Current Stats
- Resting heart rate:
- 1-mile time:
- Max sustained pace:
- Recovery time:

## 12-Week Goals
- Target heart rate:
- Target 1-mile time:
- Target sustained pace:
- Target recovery time:

## Weekly Plan
- Low intensity days:
- Medium intensity days:
- High intensity/interval days:
- Recovery days:

## Progress Tracking
- Heart rate changes:
- Perceived exertion:
- Distance/time improvements:

## Notes
- Hydration strategy:
- Nutrition notes:
- Recovery protocols:

*Focus on Zone 2 training for base building. Add intervals strategically.*`
    }
  ],
  mindfulEating: [
    {
      id: 'meal-mindfulness',
      title: 'Mindful Meal Practice',
      description: 'Bring awareness to your eating habits',
      content: `# Mindful Eating Practice

## Pre-Meal Awareness
- Current hunger level (1-10):
- Emotions before eating:
- Physical sensations:
- Environment:

## The Meal
- Foods chosen:
- Colors, textures, aromas:
- Flavors and taste notes:
- Pace of eating:

## Post-Meal Reflection
- Satisfaction level (1-10):
- Fullness level (1-10):
- Energy level:
- Emotions after eating:

## 12-Week Nutritional Focus
- How does this meal support my quarterly goals?
- Alignment with my nutritional intentions:
- Adjustments for next time:

*Eating mindfully isn't about perfect nutrition, but about awareness and connection to your food.*`
    },
    {
      id: 'weekly-meal-plan',
      title: '12-Week Meal Planning',
      description: 'Strategic approach to nourishment',
      content: `# 12-Week Meal Planning Framework

## Nutritional Goals
- Macronutrient targets:
- Micronutrient focus:
- Hydration plan:
- Special dietary considerations:

## Weekly Template
- Monday:
- Tuesday:
- Wednesday:
- Thursday:
- Friday:
- Saturday:
- Sunday:

## Meal Prep Strategy
- Batch cooking items:
- Pre-chopped vegetables:
- Portable snacks:
- Emergency meal options:

## Integration with 12-Week Goals
- Energy needs for training:
- Recovery nutrition:
- Performance-supporting foods:
- Mindful indulgences:

*Plan for flexibility. The best meal plan is one you can actually follow.*`
    }
  ],
  twelveWeekYear: [
    {
      id: 'goal-setting',
      title: '12-Week Year Goal Setting',
      description: 'Strategic goal planning framework',
      content: `# 12-Week Year Goal Setting

## Vision
What does success look like at the end of 12 weeks?

## Strategic Goals (1-3 goals maximum)
1. **Goal 1**: 
   - Lead Measure 1:
   - Lead Measure 2:
   - Success Criteria:

2. **Goal 2**: 
   - Lead Measure 1:
   - Lead Measure 2:
   - Success Criteria:

3. **Goal 3**: 
   - Lead Measure 1:
   - Lead Measure 2:
   - Success Criteria:

## Weekly Execution Plan
- Monday:
- Tuesday:
- Wednesday:
- Thursday:
- Friday:
- Saturday:
- Sunday:

## Scoring System
- How will I track my lead measures?
- What's my minimum success threshold?
- Weekly scoring template:

## Strategic Buffer
- Obstacles I might face:
- Contingency plans:
- Support systems:

*Remember: Execution > Planning. 12 weeks is long enough to achieve significant results but short enough to maintain urgency.*`
    },
    {
      id: 'weekly-scorecard',
      title: '12-Week Year Scorecard',
      description: 'Weekly tracking of lead measures',
      content: `# Weekly Scorecard - Week {{week}} of 12

## Lead Measures Tracking
1. **Goal 1 Lead Measures**:
   - Measure 1: ___ / ___ days (___%)
   - Measure 2: ___ / ___ days (___%)

2. **Goal 2 Lead Measures**:
   - Measure 1: ___ / ___ days (___%)
   - Measure 2: ___ / ___ days (___%)

3. **Goal 3 Lead Measures**:
   - Measure 1: ___ / ___ days (___%)
   - Measure 2: ___ / ___ days (___%)

## Weekly Execution Score: ____%

## Reflection
- What went well this week?
- Where did I fall short?
- What adjustments are needed?
- What support do I need?

## Next Week Focus
- Most important tasks:
- Process improvements:
- Potential obstacles:

*The score is not about judgment but about awareness and adjustment.*`
    }
  ]
};
