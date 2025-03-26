
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMeditationDialog } from '@/hooks/useMeditationDialog';

interface MeditationTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMeditationSelect?: (meditation: any) => void;
  onTemplateSelect?: (template: any) => void;  // Add this prop to fix the error
}

const MeditationTemplatesDialog: React.FC<MeditationTemplatesDialogProps> = ({
  open,
  onOpenChange,
  onMeditationSelect,
  onTemplateSelect
}) => {
  const dialog = useMeditationDialog(onMeditationSelect);
  
  // Sync with parent component's open state
  React.useEffect(() => {
    dialog.setIsOpen(open);
  }, [open, dialog.setIsOpen]);

  // Sync parent component with our open state
  React.useEffect(() => {
    if (dialog.isOpen !== open) {
      onOpenChange(dialog.isOpen);
    }
  }, [dialog.isOpen, onOpenChange, open]);

  // Add handler for template selection if provided
  const handleTemplateSelect = (template: any) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Meditation Templates</DialogTitle>
          <DialogDescription>
            Select a meditation template to add to your journal entry
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={dialog.activeTab} onValueChange={dialog.setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="templates">Templates Gallery</TabsTrigger>
            <TabsTrigger value="customize" disabled={!dialog.selectedMeditation}>Customize Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="w-full">
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {dialog.meditationGuides.map((meditation) => (
                  <Card key={meditation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{meditation.title}</CardTitle>
                      <CardDescription>{meditation.type} · {meditation.duration} min</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm pb-2">
                      <p className="line-clamp-2">{meditation.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => {
                          dialog.handleSelectMeditation(meditation);
                          if (onTemplateSelect) handleTemplateSelect(meditation);
                        }}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Select
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="customize" className="w-full">
            {dialog.selectedMeditation && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">{dialog.selectedMeditation.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dialog.selectedMeditation.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{dialog.selectedMeditation.type}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{dialog.selectedMeditation.duration} minutes</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Add Custom Notes (Optional)</h3>
                  <Textarea 
                    placeholder="Add any personal notes or intentions for this meditation session..."
                    value={dialog.customNotes}
                    onChange={(e) => dialog.setCustomNotes(e.target.value)}
                    rows={5}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={dialog.handleCancel}>
            Cancel
          </Button>
          
          {dialog.activeTab === 'customize' && dialog.selectedMeditation && (
            <Button onClick={() => {
              dialog.handleAddToJournal();
              if (onTemplateSelect) handleTemplateSelect({
                ...dialog.selectedMeditation,
                customNotes: dialog.customNotes
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Journal
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeditationTemplatesDialog;
