
import React from 'react';
import { renderMarkdown } from '@/utils/markdown';

interface MarkdownPreviewProps {
  content: string;
  extractInsights?: boolean;
  onLinkClick?: (entryId: string) => void;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  content,
  extractInsights = false,
  onLinkClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onLinkClick) return;
    
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('entry://')) {
        e.preventDefault();
        const entryId = href.replace('entry://', '');
        onLinkClick(entryId);
      }
    }
  };

  return (
    <div 
      className="prose prose-sm max-w-none h-full"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content, extractInsights) }}
      onClick={handleClick}
    />
  );
};

export default MarkdownPreview;
