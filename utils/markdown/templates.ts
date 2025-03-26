
// Convert meditation to markdown template
export const meditationToMarkdown = (meditation: any): string => {
  let markdown = `# ${meditation.title}\n\n`;
  markdown += `**Type:** ${meditation.type}  \n`;
  markdown += `**Duration:** ${meditation.duration} minutes\n\n`;
  markdown += `## Description\n\n${meditation.description}\n\n`;
  markdown += `## Practice Steps\n\n`;
  
  meditation.steps.forEach((step: string, index: number) => {
    markdown += `${index + 1}. ${step}\n`;
  });
  
  markdown += `\n## My Experience\n\n`;
  markdown += `*Date: ${new Date().toLocaleDateString()}*\n\n`;
  markdown += `<!-- Enter your notes about this meditation session below -->\n\n`;
  markdown += `### Insights\n\n`;
  markdown += `### Challenges\n\n`;
  markdown += `### Next Steps\n\n`;
  
  return markdown;
};

// Create journal entry markdown with intentions and energy balance
export const journalToMarkdown = (
  title: string, 
  content: string, 
  intentions?: { intention?: string, gratitude?: string, affirmation?: string },
  energyLevels?: Record<string, number[]>,
  emotion?: { emotion: string, intensity?: number } | null
): string => {
  let markdown = title ? `# ${title}\n\n` : `# Journal Entry - ${new Date().toLocaleDateString()}\n\n`;
  
  // Add date
  markdown += `*${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}*\n\n`;
  
  // Add emotion if available
  if (emotion) {
    markdown += `## Emotional State\n\n`;
    markdown += emotion.intensity 
      ? `**${emotion.emotion}** (Intensity: ${emotion.intensity}/10)\n\n`
      : `**${emotion.emotion}**\n\n`;
  }
  
  // Add intentions if provided
  if (intentions) {
    markdown += `## My Intentions\n\n`;
    
    if (intentions.intention) {
      markdown += `### Daily Intention\n${intentions.intention}\n\n`;
    }
    
    if (intentions.gratitude) {
      markdown += `### Gratitude\n${intentions.gratitude}\n\n`;
    }
    
    if (intentions.affirmation) {
      markdown += `### Affirmation\n${intentions.affirmation}\n\n`;
    }
  }
  
  // Add energy levels if provided
  if (energyLevels && Object.keys(energyLevels).length > 0) {
    markdown += `## Energy Balance\n\n`;
    
    for (const [chakra, level] of Object.entries(energyLevels)) {
      markdown += `- **${chakra}**: ${level[0]}%\n`;
    }
    
    markdown += '\n';
  }
  
  // Add the main journal content
  markdown += `## Journal\n\n${content}\n\n`;
  markdown += `*Written on ${new Date().toLocaleString()}*\n`;
  
  return markdown;
};
