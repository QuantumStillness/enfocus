
import { useState, useEffect } from 'react';
import { ChakraEnergyLevels } from './types';
import { chakras } from './chakraData';

const defaultEnergyLevels = Object.fromEntries(chakras.map(chakra => [chakra.name, [50]]));

export const useChakraEnergy = () => {
  const [energyLevels, setEnergyLevels] = useState<ChakraEnergyLevels>(
    { ...defaultEnergyLevels }
  );

  // Load saved energy levels when component mounts
  useEffect(() => {
    const savedLevels = localStorage.getItem('chakra-energy-levels');
    if (savedLevels) {
      try {
        const parsedLevels = JSON.parse(savedLevels);
        setEnergyLevels(parsedLevels);
      } catch (error) {
        console.error("Error parsing saved energy levels:", error);
      }
    }
  }, []);

  // Save energy levels to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chakra-energy-levels', JSON.stringify(energyLevels));
  }, [energyLevels]);

  const handleSliderChange = (name: string, value: number[]) => {
    setEnergyLevels(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetToDefault = () => {
    setEnergyLevels({ ...defaultEnergyLevels });
  };

  return {
    energyLevels,
    handleSliderChange,
    resetToDefault,
    chakraValues: energyLevels // Adding chakraValues as alias for energyLevels for compatibility
  };
};
