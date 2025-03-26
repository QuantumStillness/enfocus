
import { formatForObsidian } from '@/utils/markdown';

interface Template {
  id: string;
  title: string;
  content: string;
  category: 'journal' | 'meditation' | '12week' | 'other';
  createdAt: Date;
}

export const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'journal':
      return 'bg-blue-100 text-blue-800';
    case 'meditation':
      return 'bg-purple-100 text-purple-800';
    case '12week':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const downloadTemplate = (template: Template) => {
  const metadata = {
    title: template.title,
    type: 'template',
    category: template.category,
    created: template.createdAt,
    tags: ['template', template.category]
  };
  
  const formattedContent = formatForObsidian(template.content, metadata);
  const fileName = `template-${template.title.toLowerCase().replace(/\s+/g, '-')}.md`;
  
  // Create a blob with the content
  const blob = new Blob([formattedContent], { type: 'text/markdown' });
  
  // Create download link and trigger click
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
