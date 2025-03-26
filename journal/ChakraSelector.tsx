
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import { availableChakras, getChakraColor } from '@/data/journalData';

interface ChakraSelectorProps {
  selectedChakras: string[];
  onToggleChakra: (chakra: string) => void;
}

const ChakraSelector: React.FC<ChakraSelectorProps> = ({ 
  selectedChakras, 
  onToggleChakra 
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Chakras & Energy</h3>
      <div className="flex flex-wrap gap-2">
        {availableChakras.map((chakra) => (
          <button
            key={chakra}
            onClick={() => onToggleChakra(chakra)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              selectedChakras.includes(chakra) 
                ? getChakraColor(chakra)
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {chakra}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChakraSelector;
