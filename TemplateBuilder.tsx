
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Save, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import MarkdownPreview from './editor/MarkdownPreview';

interface Template {
  id: string;
  title: string;
  content: string;
  category: 'journal' | 'meditation' | '12week';
  createdAt: string;
}

const TemplateBuilder: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const savedTemplates = localStorage.getItem('userTemplates');
    return savedTemplates ? JSON.parse(savedTemplates) : [];
  });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'journal' | 'meditation' | '12week'>('journal');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleSaveTemplate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your template");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Template content cannot be empty");
      return;
    }
    
    if (editingId) {
      // Update existing template
      const updatedTemplates = templates.map(template => 
        template.id === editingId 
          ? { ...template, title, content, category }
          : template
      );
      setTemplates(updatedTemplates);
      localStorage.setItem('userTemplates', JSON.stringify(updatedTemplates));
      toast.success("Template updated successfully");
    } else {
      // Create new template
      const newTemplate: Template = {
        id: Date.now().toString(),
        title,
        content,
        category,
        createdAt: new Date().toISOString()
      };
      const updatedTemplates = [...templates, newTemplate];
      setTemplates(updatedTemplates);
      localStorage.setItem('userTemplates', JSON.stringify(updatedTemplates));
      toast.success("Template created successfully");
    }
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('journal');
    setEditingId(null);
    setPreviewMode(false);
  };
  
  const handleEditTemplate = (template: Template) => {
    setTitle(template.title);
    setContent(template.content);
    setCategory(template.category);
    setEditingId(template.id);
    setPreviewMode(false);
  };
  
  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      const filteredTemplates = templates.filter(template => template.id !== id);
      setTemplates(filteredTemplates);
      localStorage.setItem('userTemplates', JSON.stringify(filteredTemplates));
      toast.info("Template deleted");
      
      if (editingId === id) {
        setTitle('');
        setContent('');
        setCategory('journal');
        setEditingId(null);
      }
    }
  };
  
  const handleExportTemplate = (template: Template) => {
    const blob = new Blob([template.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Template exported as Markdown");
  };
  
  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setCategory('journal');
    setEditingId(null);
    setPreviewMode(false);
  };
  
  const filteredTemplates = (cat: 'journal' | 'meditation' | '12week') => 
    templates.filter(template => template.category === cat);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2 text-amber-600" />
              {editingId ? 'Edit Template' : 'Create New Template'}
            </h3>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPreviewMode(!previewMode)}
                className="text-amber-700 border-amber-200 hover:bg-amber-50"
              >
                {previewMode ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    <span>Preview</span>
                  </>
                )}
              </Button>
              
              {editingId && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancelEdit}
                  className="text-amber-700 border-amber-200 hover:bg-amber-50"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Template Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={previewMode ? 'opacity-80' : ''}
                  disabled={previewMode}
                />
              </div>
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                disabled={previewMode}
              >
                <option value="journal">Journal</option>
                <option value="meditation">Meditation</option>
                <option value="12week">12-Week Year</option>
              </select>
            </div>
            
            {previewMode ? (
              <div className="border rounded-md p-4 min-h-[400px] overflow-y-auto">
                <MarkdownPreview content={content} />
              </div>
            ) : (
              <Textarea
                placeholder="Write your template in Markdown format..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] font-mono"
              />
            )}
            
            <Button 
              onClick={handleSaveTemplate}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingId ? 'Update Template' : 'Save Template'}
            </Button>
          </div>
        </div>
        
        {/* Template List Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <FileText className="h-5 w-5 mr-2 text-amber-600" />
            Your Templates
          </h3>
          
          <Tabs defaultValue="journal" className="w-full">
            <TabsList className="w-full bg-amber-50/50 border border-amber-100">
              <TabsTrigger value="journal" className="flex-1 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">Journal</TabsTrigger>
              <TabsTrigger value="meditation" className="flex-1 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">Meditation</TabsTrigger>
              <TabsTrigger value="12week" className="flex-1 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">12-Week</TabsTrigger>
            </TabsList>
            
            {(['journal', 'meditation', '12week'] as const).map((cat) => (
              <TabsContent key={cat} value={cat} className="space-y-2 mt-2">
                {filteredTemplates(cat).length > 0 ? (
                  filteredTemplates(cat).map(template => (
                    <div 
                      key={template.id} 
                      className="border border-amber-100 rounded-md p-3 hover:bg-amber-50 cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div 
                          className="flex-1 truncate"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <p className="font-medium truncate">{template.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(template.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleExportTemplate(template)}
                            className="h-8 w-8 p-0 text-amber-700"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p>No {cat === '12week' ? '12-Week' : cat} templates yet</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setCategory(cat);
                        setTitle('');
                        setContent('');
                        setEditingId(null);
                        setPreviewMode(false);
                      }}
                      className="mt-2 text-amber-600"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Create one now
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;
