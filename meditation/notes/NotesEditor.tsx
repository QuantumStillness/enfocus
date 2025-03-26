
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Save, Download } from 'lucide-react';
import MarkdownToolbar from "@/components/editor/MarkdownToolbar";
import { insertMarkdown, formatForObsidian, generateObsidianFilename } from "@/utils/markdown";
import { useToast } from "@/hooks/use-toast";

interface NotesEditorProps {
  notes: string;
  onChange: (notes: string) => void;
  onSave: () => void;
  meditationId: number;
  meditationTitle: string;
}

const NotesEditor: React.FC<NotesEditorProps> = ({
  notes,
  onChange,
  onSave,
  meditationId,
  meditationTitle
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const handleInsertMarkdown = (markdownType: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    
    const { newContent, newPosition } = insertMarkdown(
      notes,
      markdownType,
      selectionStart,
      selectionEnd
    );
    
    onChange(newContent);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };
  
  const handleDownload = (obsidianFormat = false) => {
    // Prepare content
    let content = notes;
    let filename = '';
    
    if (obsidianFormat) {
      // Create frontmatter for Obsidian
      const metadata = {
        title: `${meditationTitle} - Meditation Notes`,
        created: new Date().toISOString(),
        meditation_id: meditationId,
        type: "meditation_notes",
        tags: ["meditation", "notes"]
      };
      
      content = formatForObsidian(notes, metadata);
      filename = generateObsidianFilename(meditationTitle, new Date(), 'meditation-notes');
    } else {
      filename = `${meditationTitle.toLowerCase().replace(/\s+/g, '-')}-notes.md`;
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Notes Downloaded",
      description: obsidianFormat 
        ? "Your notes have been downloaded in Obsidian format."
        : "Your notes have been downloaded as a markdown file."
    });
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <MarkdownToolbar onInsertMarkdown={handleInsertMarkdown} />
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload(false)}>
                Download as Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload(true)}>
                Export to Obsidian
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 h-full resize-none font-mono"
        placeholder="Write your meditation notes here..."
      />
    </>
  );
};

export default NotesEditor;
