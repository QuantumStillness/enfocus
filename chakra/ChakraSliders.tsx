
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import ChakraSliderItem from './ChakraSliderItem';
import { useChakraEnergy } from './useChakraEnergy';
import { chakras } from './chakraData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from "@/hooks/use-mobile";

const ChakraSliders = () => {
  const { energyLevels, handleSliderChange } = useChakraEnergy();
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <AnimatedTransition delay={0}>
        <h2 className="text-xl font-medium mb-4">Energy Balance</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Adjust sliders to reflect your current energy levels.
        </p>
      </AnimatedTransition>

      <ScrollArea className={`${isMobile ? 'h-[50vh]' : 'h-[300px]'} pr-4`}>
        <div className="space-y-6 pr-2">
          {chakras.map((chakra, index) => (
            <AnimatedTransition key={chakra.name} delay={index * 50}>
              <ChakraSliderItem
                chakra={chakra}
                value={energyLevels[chakra.name] || [50]}
                onChange={handleSliderChange}
              />
            </AnimatedTransition>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChakraSliders;
