
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import TagManager from '../journal/TagManager';
import ChakraSelector from '../journal/ChakraSelector';

interface TagAndChakraSectionProps {
  tags: string[];
  chakras: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onToggleChakra: (chakra: string) => void;
}

const TagAndChakraSection: React.FC<TagAndChakraSectionProps> = ({
  tags,
  chakras,
  onAddTag,
  onRemoveTag,
  onToggleChakra
}) => {
  return (
    <AnimatedTransition delay={150}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TagManager 
          tags={tags}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />
        
        <ChakraSelector
          selectedChakras={chakras}
          onToggleChakra={onToggleChakra}
        />
      </div>
    </AnimatedTransition>
  );
};

export default TagAndChakraSection;
