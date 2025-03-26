
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import MarkdownPreview from '../editor/MarkdownPreview';
import { Save, Trash2, Download, FileText, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface MarkdownNotesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialWeek?: number;
}

const MarkdownNotes: React.FC<MarkdownNotesProps> = ({
  open,
  onOpenChange,
  initialWeek
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [currentTab, setCurrentTab] = useState<'view' | 'edit'>('view');
  
  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('markdownNotes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        
        // If initialWeek is provided, try to find a note for that week
        if (initialWeek && parsedNotes.length > 0) {
          const weekNote = parsedNotes.find((note: Note) => 
            note.title.includes(`Week ${initialWeek}`)
          );
          if (weekNote) {
            setActiveNote(weekNote);
          } else {
            setActiveNote(parsedNotes[0]);
          }
        } else if (parsedNotes.length > 0) {
          setActiveNote(parsedNotes[0]);
        }
      } catch (error) {
        console.error("Failed to parse saved notes:", error);
        setNotes([]);
      }
    }
  }, [initialWeek]);
  
  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('markdownNotes', JSON.stringify(notes));
    }
  }, [notes]);
  
  const handleCreateNote = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a title for your note");
      return;
    }
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    setNewTitle('');
    setNewContent('');
    setCurrentTab('view');
    
    toast.success("Note created successfully");
  };
  
  const handleUpdateNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? { ...note, content: activeNote.content, updatedAt: new Date().toISOString() } 
        : note
    );
    
    setNotes(updatedNotes);
    toast.success("Note updated successfully");
  };
  
  const handleDeleteNote = () => {
    if (!activeNote) return;
    
    if (window.confirm(`Are you sure you want to delete "${activeNote.title}"?`)) {
      const filteredNotes = notes.filter(note => note.id !== activeNote.id);
      setNotes(filteredNotes);
      setActiveNote(filteredNotes.length > 0 ? filteredNotes[0] : null);
      toast.info("Note deleted");
    }
  };
  
  const handleExportMarkdown = () => {
    if (!activeNote) return;
    
    const blob = new Blob([activeNote.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Note exported as Markdown");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Markdown Notes</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 h-[60vh] overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-amber-100 overflow-y-auto pr-2">
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-1 border-amber-200 text-amber-700"
                onClick={() => {
                  setCurrentTab('edit');
                  setActiveNote(null);
                  setNewTitle('');
                  setNewContent('');
                }}
              >
                <Plus className="h-4 w-4" />
                <span>New Note</span>
              </Button>
            </div>
            
            <div className="space-y-1">
              {notes.map(note => (
                <div 
                  key={note.id}
                  className={`p-2 rounded-md cursor-pointer ${
                    activeNote?.id === note.id 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-amber-50'
                  }`}
                  onClick={() => {
                    setActiveNote(note);
                    setCurrentTab('view');
                  }}
                >
                  <div className="font-medium truncate">{note.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as 'view' | 'edit')} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <TabsList className="bg-amber-50">
                  <TabsTrigger value="view" disabled={!activeNote && !newTitle}>View</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  {activeNote && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDeleteNote}
                        className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleExportMarkdown}
                        className="flex items-center gap-1 border-amber-200 text-amber-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <TabsContent value="view" className="flex-1 overflow-auto border rounded-md p-4">
                {activeNote ? (
                  <MarkdownPreview content={activeNote.content} />
                ) : newTitle ? (
                  <MarkdownPreview content={newContent} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Select a note or create a new one</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="edit" className="flex-1 overflow-hidden flex flex-col">
                {!activeNote && (
                  <div className="mb-2">
                    <Input
                      placeholder="Note title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                )}
                
                <Textarea
                  placeholder="Write your note in Markdown format..."
                  value={activeNote ? activeNote.content : newContent}
                  onChange={(e) => activeNote 
                    ? setActiveNote({...activeNote, content: e.target.value})
                    : setNewContent(e.target.value)
                  }
                  className="flex-1 min-h-[300px] font-mono"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-amber-200 text-amber-700">
            Close
          </Button>
          
          {currentTab === 'edit' && (
            <Button 
              onClick={activeNote ? handleUpdateNote : handleCreateNote}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {activeNote ? 'Update Note' : 'Create Note'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkdownNotes;
