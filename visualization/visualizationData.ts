
export interface VisualizationExercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  steps: string[];
  stepDescriptions?: string[]; // optional detailed descriptions for each step
}

export const visualizationExercises: VisualizationExercise[] = [
  {
    id: 1,
    title: "Safe Space Visualization",
    description: "Create a detailed mental sanctuary where you feel completely safe and at peace.",
    difficulty: "Beginner",
    duration: 10,
    steps: [
      "Find a comfortable position and close your eyes",
      "Take several deep breaths to relax your body",
      "Begin to imagine a place where you feel completely safe",
      "Notice the visual details of this safe space",
      "Add sounds to your visualization",
      "Now add scents and smells",
      "Feel the textures and temperature in this space",
      "Experience the emotional feeling of complete safety",
      "Establish a quick way to return to this space",
      "Slowly return your awareness to the present moment"
    ],
    stepDescriptions: [
      "Sit or lie down in a comfortable position where you won't be disturbed. Gently close your eyes.",
      "Breathe in through your nose for a count of 4, hold for 2, and exhale through your mouth for 6. Repeat several times.",
      "This could be a real place you've visited, a combination of places, or somewhere entirely imaginary. The only requirement is that it feels completely safe to you.",
      "What do you see? Notice colors, shapes, light, and objects. Is it daytime or nighttime? Look in all directions.",
      "What sounds are present in your safe space? Perhaps gentle waves, rustling leaves, soft music, or perfect silence.",
      "What smells do you notice? Fresh flowers, ocean air, baking bread, or other comforting scents.",
      "How does this place feel physically? Is it warm or cool? Are you touching something soft, sturdy, smooth?",
      "Allow yourself to fully experience the feeling of being completely safe, secure, and at peace in this space.",
      "Create a mental shortcut—a word, gesture, or breath pattern that will quickly bring this space to mind when needed.",
      "Wiggle your fingers and toes, become aware of your physical body, and when ready, open your eyes."
    ]
  },
  {
    id: 2,
    title: "Future Self Visualization",
    description: "Connect with your future self who has already achieved your goals.",
    difficulty: "Intermediate",
    duration: 15,
    steps: [
      "Settle into a comfortable position",
      "Take deep breaths and set your intention",
      "Visualize yourself 5 years from now, having achieved your goals",
      "Notice your future self's appearance and demeanor",
      "Observe your future self's environment",
      "Imagine a conversation with your future self",
      "Ask your future self for advice",
      "Feel gratitude for this vision",
      "Commit to one action your future self recommends",
      "Return to the present moment while maintaining connection"
    ],
    stepDescriptions: [
      "Find a quiet place where you won't be disturbed. Sit or lie down comfortably.",
      "Breathe deeply and set a clear intention to connect with your wisest future self who has already achieved what you're working toward.",
      "Imagine meeting yourself 5 years in the future. This future self has accomplished the goals you're currently working on.",
      "How does your future self look? Notice posture, expression, clothing, and overall energy. What has changed?",
      "Where does your future self live or work? Take in the details of the environment that your future self has created.",
      "Imagine sitting down with your future self and having a conversation. What does your voice sound like? What topics come up?",
      "Ask your future self: 'What was the most important thing you did to get where you are now? What advice do you have for me?'",
      "Feel appreciation for this glimpse of your potential future and the wisdom shared.",
      "From all the advice given, choose one specific action you can take starting today.",
      "Gently return your awareness to the present, knowing you can reconnect with your future self anytime you need guidance."
    ]
  },
  {
    id: 3,
    title: "Energy Center Cleansing",
    description: "Visualize clearing and balancing your body's energy centers.",
    difficulty: "Intermediate",
    duration: 20,
    steps: [
      "Find a quiet space and comfortable position",
      "Begin with grounding breaths",
      "Focus on your root center at the base of your spine",
      "Move to your sacral center below your navel",
      "Focus on your solar plexus center",
      "Bring awareness to your heart center",
      "Move to your throat center",
      "Focus on your third eye center",
      "Bring awareness to your crown center",
      "Visualize all centers in perfect harmony",
      "Slowly return to normal awareness"
    ],
    stepDescriptions: [
      "Find somewhere quiet where you won't be disturbed. Sit comfortably with your spine straight.",
      "Take deep breaths, imagining roots growing from your body into the earth, anchoring and stabilizing you.",
      "Visualize a vibrant red sphere of energy at the base of your spine. See it glowing brightly, clearing any blockages.",
      "Move your awareness to just below your navel. Visualize an orange sphere of energy, flowing smoothly like water.",
      "Focus on the area around your stomach. See a bright yellow sphere of energy, empowering your confidence and will.",
      "Bring your attention to your chest. Visualize a green or pink sphere of energy, opening and balancing your capacity for compassion.",
      "Focus on your throat area. See a blue sphere of energy, clearing any blocks to authentic expression.",
      "Bring awareness to the center of your forehead. Visualize an indigo sphere of energy, enhancing your intuition and insight.",
      "Focus on the top of your head. See a violet or white sphere of energy, connecting you to higher awareness.",
      "Now visualize all seven energy centers aligned and spinning in perfect harmony, creating a column of rainbow light through your body.",
      "Take a few deep breaths, gently wiggle your fingers and toes, and slowly open your eyes."
    ]
  },
  {
    id: 4,
    title: "Goal Achievement Visualization",
    description: "Mentally rehearse the successful completion of your goal with all senses engaged.",
    difficulty: "Beginner",
    duration: 12,
    steps: [
      "Get comfortable and center yourself",
      "Set a clear intention for your goal",
      "Visualize yourself taking the first step toward your goal",
      "See yourself overcoming obstacles",
      "Visualize the moment of achieving your goal",
      "Experience the feelings of accomplishment",
      "Notice the reactions of others",
      "Observe how achieving this goal impacts other areas of your life",
      "Anchor this success to a physical gesture",
      "Return to the present with confidence"
    ]
  },
  {
    id: 5,
    title: "Healing Light Visualization",
    description: "Visualize healing energy flowing through your body to promote wellness.",
    difficulty: "Beginner",
    duration: 15,
    steps: [
      "Find a comfortable, quiet space",
      "Focus on your breathing to relax your body",
      "Visualize a source of healing light above you",
      "Allow this light to enter through the top of your head",
      "Guide the healing light to any areas of tension or discomfort",
      "See the light dissolving any pain or blockages",
      "Feel the healing energy spreading throughout your body",
      "Visualize your entire body filled with healing light",
      "Set an intention for continued healing",
      "Slowly return to regular awareness"
    ]
  },
  {
    id: 6,
    title: "Mountain Visualization for Stability",
    description: "Embody the qualities of a mountain to develop inner stability and strength.",
    difficulty: "Advanced",
    duration: 18,
    steps: [
      "Begin in a seated meditation posture",
      "Establish a stable, rhythmic breath",
      "Visualize a majestic mountain in great detail",
      "Feel your body becoming as solid as the mountain",
      "Imagine the mountain through changing seasons",
      "Experience the mountain through storms",
      "See the mountain under clear, sunny skies",
      "Recognize that like the mountain, your essence remains unchanged",
      "Absorb the mountain's qualities of stability and endurance",
      "Carry the mountain's strength as you return to awareness"
    ]
  },
  {
    id: 7,
    title: "Forgiveness Visualization",
    description: "Release emotional burdens through a powerful forgiveness practice.",
    difficulty: "Advanced",
    duration: 20,
    steps: [
      "Create a safe, comfortable environment",
      "Set an intention for healing and release",
      "Visualize the person you need to forgive (including yourself)",
      "Notice your feelings without judgment",
      "Imagine a conversation with this person",
      "Express your feelings openly in this visualization",
      "Listen to their response in your visualization",
      "Visualize releasing the emotional burden",
      "Send compassion to yourself and the other person",
      "Feel the lightness that comes from forgiveness",
      "Return to present awareness with this new freedom"
    ]
  },
  {
    id: 8,
    title: "Confidence Building Visualization",
    description: "Strengthen your self-confidence through powerful mental imagery.",
    difficulty: "Intermediate",
    duration: 12,
    steps: [
      "Find a quiet place and comfortable position",
      "Take several deep breaths to center yourself",
      "Recall a time when you felt completely confident",
      "Re-experience that confidence in your body",
      "Visualize yourself in an upcoming situation",
      "See yourself handling the situation with perfect confidence",
      "Notice the positive responses from others",
      "Feel the satisfaction of this confident performance",
      "Create a mental trigger for this confident state",
      "Return to present awareness carrying this confidence"
    ]
  }
];
