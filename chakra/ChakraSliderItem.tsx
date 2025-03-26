
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { ChakraData } from './types';

interface ChakraSliderItemProps {
  chakra: ChakraData;
  value: number[];
  onChange: (name: string, value: number[]) => void;
}

const ChakraSliderItem: React.FC<ChakraSliderItemProps> = ({ 
  chakra, 
  value, 
  onChange 
}) => {
  const getChakraColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'red': 'bg-red-500',
      'orange': 'bg-orange-500',
      'yellow': 'bg-yellow-500',
      'green': 'bg-green-500',
      'blue': 'bg-blue-500',
      'indigo': 'bg-indigo-500',
      'purple': 'bg-purple-500',
      'violet': 'bg-violet-500',
    };
    
    return colorMap[color.split('-')[1]] || 'bg-gray-500';
  };
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: `var(--${chakra.color})` }}
          />
          <h3 className="font-medium text-sm">{chakra.name}</h3>
        </div>
        <span className="text-xs text-gray-500 font-medium">{value[0]}%</span>
      </div>
      
      <div className="px-1">
        <Slider
          className="chakra-slider"
          onValueChange={(newValue) => onChange(chakra.name, newValue)}
          defaultValue={[50]}
          max={100}
          step={1}
          value={value}
          thumbClassName={getChakraColor(chakra.color)}
          trackClassName={`h-1.5 bg-gray-100 before:${getChakraColor(chakra.color)} before:opacity-30`}
        />
      </div>
      
      <p className="text-xs text-gray-500 hidden md:block">{chakra.description}</p>
    </div>
  );
};

export default ChakraSliderItem;
