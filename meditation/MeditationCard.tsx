
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import AnimatedTransition from "@/components/AnimatedTransition";
import { FileText, Download } from 'lucide-react';
import { MeditationGuide } from "@/types/meditation";
import MeditationPlayer from './MeditationPlayer';
import MeditationNotes from './MeditationNotes';
import { meditationToMarkdown, formatForObsidian, generateObsidianFilename } from '@/utils/markdown';
import { useToast } from "@/hooks/use-toast";
import { MeditationCardProps } from './types';

const MeditationCard = ({ meditation, index, onSelectMeditation, selectedMeditation }: MeditationCardProps) => {
  const [showNotes, setShowNotes] = useState(false);
  const { toast } = useToast();

  const handleDownload = (obsidianFormat = false) => {
    // Create markdown content
    let markdownContent = meditationToMarkdown(meditation);
    
    // If Obsidian format is requested, add frontmatter
    if (obsidianFormat) {
      const metadata = {
        title: meditation.title,
        type: meditation.type,
        duration: meditation.duration,
        date: new Date().toISOString(),
        tags: ["meditation", meditation.type.toLowerCase()],
      };
      
      markdownContent = formatForObsidian(markdownContent, metadata);
    }
    
    // Create file name
    const fileName = obsidianFormat
      ? generateObsidianFilename(meditation.title, new Date(), 'meditation')
      : `${meditation.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    
    // Create a blob with the content
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    
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

    toast({
      title: obsidianFormat ? "Exported to Obsidian" : "Template Downloaded",
      description: `${meditation.title} has been downloaded as a ${obsidianFormat ? "Obsidian-compatible" : "markdown"} file.`
    });
  };

  return (
    <AnimatedTransition key={meditation.id} delay={200 + index * 100}>
      <Card className="h-full card-hover">
        <CardHeader>
          <CardTitle>{meditation.title}</CardTitle>
          <CardDescription>{meditation.type} • {meditation.duration} minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{meditation.description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="flex-1"
                onClick={() => onSelectMeditation(meditation)}
              >
                Begin Practice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Guided Meditation</DialogTitle>
                <DialogDescription>
                  Follow the instructions at your own pace
                </DialogDescription>
              </DialogHeader>
              {selectedMeditation && (
                <MeditationPlayer 
                  meditation={selectedMeditation} 
                  onClose={() => onSelectMeditation(null)} 
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                onClick={() => setShowNotes(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Notes
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] h-[80vh]">
              <DialogHeader>
                <DialogTitle>Meditation Notes - {meditation.title}</DialogTitle>
                <DialogDescription>
                  Take notes about your experience with this meditation
                </DialogDescription>
              </DialogHeader>
              <MeditationNotes meditation={meditation} />
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownload(false)}>
                Download as Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload(true)}>
                Export to Obsidian
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default MeditationCard;
