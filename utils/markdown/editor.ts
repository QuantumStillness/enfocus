
export const insertMarkdown = (content: string, markdownType: string, selectionStart: number, selectionEnd: number): { newContent: string; newPosition: number } => {
  const selectedText = content.substring(selectionStart, selectionEnd) || 'text';
  
  let newText = '';
  let cursorOffset = 0;
  
  switch (markdownType) {
    case 'bold':
      newText = `**${selectedText}**`;
      cursorOffset = 2;
      break;
    case 'italic':
      newText = `*${selectedText}*`;
      cursorOffset = 1;
      break;
    case 'h1':
      newText = `# ${selectedText}`;
      cursorOffset = 2;
      break;
    case 'h2':
      newText = `## ${selectedText}`;
      cursorOffset = 3;
      break;
    case 'h3':
      newText = `### ${selectedText}`;
      cursorOffset = 4;
      break;
    case 'list':
      newText = `* ${selectedText}`;
      cursorOffset = 2;
      break;
    case 'link':
      newText = `[${selectedText}](url)`;
      cursorOffset = 1;
      break;
    default:
      return { newContent: content, newPosition: selectionEnd };
  }
  
  const newContent = content.substring(0, selectionStart) + newText + content.substring(selectionEnd);
  const newPosition = selectionStart + newText.length - cursorOffset;
  
  return { newContent, newPosition };
};

export const insertPrompt = (content: string, prompt: string): string => {
  return content ? `${content}\n\n**Prompt:** ${prompt}\n\n` : `**Prompt:** ${prompt}\n\n`;
};

// Load saved meditation notes from localStorage
export const getMeditationNotes = (meditationId: number): string => {
  const key = `meditation-notes-${meditationId}`;
  return localStorage.getItem(key) || '';
};

// Save meditation notes to localStorage
export const saveMeditationNotes = (meditationId: number, notes: string): void => {
  const key = `meditation-notes-${meditationId}`;
  localStorage.setItem(key, notes);
};

// Generate audio from text using NotebookLM API
export interface GenerateAudioOptions {
  text: string;
  voice?: string;
}

