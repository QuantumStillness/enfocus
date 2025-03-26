
// Simple Markdown renderer
import { extractMarkdownInsights } from './insights';

export const renderMarkdown = (text: string, extractInsights: boolean = false): string => {
  // Handle headings
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Handle bold and italic
  text = text.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  text = text.replace(/\*(.*)\*/gim, '<em>$1</em>');
  
  // Handle lists
  text = text.replace(/^\* (.*$)/gim, '<li>$1</li>');
  text = text.replace(/<\/li>\n<li>/g, '</li><li>');
  text = text.replace(/<li>(.*)<\/li>/gim, '<ul><li>$1</li></ul>');
  text = text.replace(/<\/ul>\n<ul>/g, '');
  
  // Handle numbered lists
  text = text.replace(/^\d\. (.*$)/gim, '<li>$1</li>');
  text = text.replace(/<\/li>\n<li>/g, '</li><li>');
  text = text.replace(/<li>(.*)<\/li>/gim, '<ol><li>$1</li></ol>');
  text = text.replace(/<\/ol>\n<ol>/g, '');
  
  // Handle links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
  
  // Handle paragraphs
  text = text.replace(/\n/gim, '<br>');
  
  // Extract and highlight insights if requested
  if (extractInsights) {
    const insightsHTML = extractMarkdownInsights(text);
    if (insightsHTML) {
      text += insightsHTML;
    }
  }
  
  return text;
};
