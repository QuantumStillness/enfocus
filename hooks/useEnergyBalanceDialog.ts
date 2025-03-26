
import { useDialogState } from './useDialogState';
import { useChakraEnergy } from '@/components/chakra/useChakraEnergy';

export function useEnergyBalanceDialog(
  onEnergySet?: (chakras: Record<string, number[]>) => void
) {
  const { isOpen, setIsOpen } = useDialogState();
  const { energyLevels, handleSliderChange, resetToDefault } = useChakraEnergy();
  
  const handleApply = () => {
    if (onEnergySet) {
      onEnergySet(energyLevels);
    }
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    energyLevels,
    handleSliderChange,
    resetToDefault,
    handleApply
  };
}
