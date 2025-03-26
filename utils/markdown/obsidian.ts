
/**
 * Utilities for Obsidian integration
 */

/**
 * Format markdown content to be Obsidian-compatible
 * - Adds YAML frontmatter with metadata
 * - Formats internal links in a way Obsidian can understand
 */
export const formatForObsidian = (
  content: string,
  metadata: Record<string, any> = {}
): string => {
  // Create YAML frontmatter
  const frontmatter = [
    '---',
    ...Object.entries(metadata).map(([key, value]) => {
      // Handle arrays in frontmatter
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      // Handle strings with special characters
      else if (typeof value === 'string' && (value.includes(':') || value.includes('"'))) {
        return `${key}: "${value.replace(/"/g, '\\"')}"`;
      } 
      // Handle dates
      else if (value instanceof Date) {
        return `${key}: ${value.toISOString()}`;
      }
      // Default case
      else {
        return `${key}: ${value}`;
      }
    }),
    '---',
    ''
  ].join('\n');

  // Process content for Obsidian compatibility
  // Convert entry:// links to [[link]] format
  const processedContent = content.replace(/\[([^\]]+)\]\(entry:\/\/([^)]+)\)/g, '[[$2|$1]]');

  return `${frontmatter}${processedContent}`;
};

/**
 * Create an Obsidian-compatible vault folder structure
 * This generates the folder structure information to guide users
 */
export const getObsidianVaultStructure = (): string => {
  return `
# Recommended Obsidian Vault Structure

For the best experience with your exported content, consider the following folder structure in your Obsidian vault:

\`\`\`
YourVault/
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
└── Templates/
\`\`\`

## Tips for Using in Obsidian

1. Enable the "Templates" core plugin in Obsidian settings
2. Set your template folder location
3. Use the Daily Notes plugin for regular journaling
4. Use dataview plugin to query your journal entries by tags, emotions, or chakras
5. Use the Calendar plugin to view entries by date
6. Create a Dashboard note with links to your most important areas
`;
};

/**
 * Generate Obsidian-compatible filename
 * Follows Obsidian conventions for filenames
 */
export const generateObsidianFilename = (
  title: string,
  date = new Date(),
  type = 'journal'
): string => {
  // Format date as YYYY-MM-DD
  const dateStr = date.toISOString().split('T')[0];
  
  // Process title to be filename-friendly
  const safeTitle = title
    ? title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)
    : '';
  
  // Create filename based on type and if title exists
  if (type === 'journal') {
    return safeTitle 
      ? `${dateStr} ${safeTitle}.md`
      : `${dateStr} journal entry.md`;
  } else if (type === 'meditation') {
    return safeTitle
      ? `meditation - ${safeTitle}.md`
      : `meditation - ${dateStr}.md`;
  } else if (type === 'template') {
    return safeTitle
      ? `template - ${safeTitle}.md`
      : `template - ${dateStr}.md`;
  } else if (type === 'tracker') {
    return safeTitle
      ? `tracker - ${safeTitle}.md`
      : `tracker - ${dateStr}.md`;
  } else if (type === 'plan') {
    return safeTitle
      ? `plan - ${safeTitle}.md`
      : `plan - ${dateStr}.md`;
  } else {
    return safeTitle
      ? `${type} - ${safeTitle}.md`
      : `${type} - ${dateStr}.md`;
  }
};

/**
 * Create an Obsidian-compatible link between notes
 */
export const createObsidianLink = (
  targetFile: string,
  displayText?: string
): string => {
  if (displayText) {
    return `[[${targetFile}|${displayText}]]`;
  }
  return `[[${targetFile}]]`;
};

/**
 * Format date for Obsidian-compatible dates in frontmatter
 */
export const formatObsidianDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Create daily note format for Obsidian
 */
export const createDailyNote = (
  content: string = '',
  date: Date = new Date(),
  tags: string[] = []
): string => {
  const metadata = {
    date: date.toISOString(),
    tags: [...tags, 'daily-note'],
    type: 'daily'
  };
  
  return formatForObsidian(content, metadata);
};
