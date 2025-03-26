
export const journalPrompts = [
  "How am I feeling right now? What sensations am I experiencing in my body?",
  "What thoughts are occupying my mind today?",
  "What am I struggling with, and how can I approach it with compassion?",
  "What insights came up during my meditation practice?",
  "If I could give my younger self advice about today, what would it be?",
  "What inner conflicts am I experiencing, and how might I resolve them?",
  "How did I practice self-care today?",
  "What boundaries do I need to establish or maintain?",
  "What patterns am I noticing in my thoughts or behaviors?"
];

export type MindfulnessTutorial = {
  title: string;
  content: string;
};

// Mindfulness markdown tutorials
export const mindfulnessTutorials: MindfulnessTutorial[] = [
  {
    title: "Gratitude Practice",
    content: `# Daily Gratitude Practice

Begin by taking three deep breaths, connecting with the present moment.

## Today's Gratitudes

* **Morning Gratitude** - What brought you joy as you started your day?
* **Nature Gratitude** - What element of the natural world are you thankful for today?
* **Relationship Gratitude** - Who made a positive difference in your life recently?

## Reflection

How does focusing on gratitude shift your mental state? Notice any sensations in your body as you reflect on things you appreciate.

*Remember that gratitude is a practice that builds over time, gradually rewiring your brain to notice the positive.*`
  },
  {
    title: "Mindful Observation",
    content: `# Mindful Observation Practice

Take a moment to pause and choose an object in your environment.

## Observation Exercise

1. Look at your chosen object as if seeing it for the first time
2. Notice its colors, textures, patterns, and uniqueness
3. Consider its origin and purpose without judgment
4. Observe any thoughts or feelings that arise as you study it

## Integration

*How might bringing this same quality of attention to other areas of your life change your experience?*

**This practice helps develop concentration and present-moment awareness that can be applied to all experiences.**`
  },
  {
    title: "Body Scan Reflection",
    content: `# Mindful Body Scan Reflection

Begin by sitting comfortably and taking three deep breaths.

## Body Awareness Journey

* **Head & Face**: Notice any tension in your forehead, jaw, or around your eyes
* **Shoulders & Chest**: Observe sensation without trying to change anything
* **Abdomen & Back**: Feel the gentle movement of your breath
* **Arms & Hands**: Notice temperature, weight, contact with surfaces
* **Legs & Feet**: Connect with the support of the ground beneath you

## Insights

What are your areas of tension holding? What messages might your body be communicating?

*The body often holds wisdom that the thinking mind overlooks. Regular body scanning helps us reclaim this connection.*`
  },
  {
    title: "Mindful Emotions",
    content: `# Working With Difficult Emotions

Pause and create space to be with your current emotional state.

## Emotion Exploration

1. **Name it** - What emotion am I experiencing right now?
2. **Locate it** - Where do I feel this emotion in my body?
3. **Accept it** - This feeling is neither good nor bad, it simply is
4. **Investigate it** - What triggered this emotion? What does it need?

## Self-Compassion Statement

**Write a message to yourself that acknowledges this difficulty with kindness:**

*I'm feeling [emotion], and that's completely natural. I'm doing my best in this moment.*

Remember that emotions are like weather patterns - they pass through but do not define you.`
  }
];

// Available chakras
export const availableChakras = ["Root", "Sacral", "Solar", "Heart", "Throat", "Third Eye", "Crown"];

export const getChakraColor = (chakra: string): string => {
  const colors: Record<string, string> = {
    "Root": "bg-chakra-root text-white",
    "Sacral": "bg-chakra-sacral text-white",
    "Solar": "bg-chakra-solar text-black",
    "Heart": "bg-chakra-heart text-white",
    "Throat": "bg-chakra-throat text-white",
    "Third Eye": "bg-chakra-third text-white",
    "Crown": "bg-chakra-crown text-white"
  };
  
  return colors[chakra] || "bg-gray-200 text-gray-800";
};
