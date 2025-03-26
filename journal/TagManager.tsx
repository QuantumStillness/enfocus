
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface TagManagerProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagManager: React.FC<TagManagerProps> = ({ 
  tags, 
  onAddTag, 
  onRemoveTag 
}) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onAddTag(tagInput.trim());
      setTagInput('');
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-sm">
            <span>{tag}</span>
            <button 
              onClick={() => onRemoveTag(tag)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add a tag..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button 
          onClick={handleAddTag}
          variant="outline"
          size="sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagManager;
