
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChakraSliders from './ChakraSliders';
import { useIsMobile } from "@/hooks/use-mobile";
import { useEnergyBalanceDialog } from '@/hooks/useEnergyBalanceDialog';

interface EnergyBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnergySet?: (chakras: Record<string, number[]>) => void;
}

const EnergyBalanceDialog: React.FC<EnergyBalanceDialogProps> = ({
  open,
  onOpenChange,
  onEnergySet
}) => {
  const dialog = useEnergyBalanceDialog(onEnergySet);
  const isMobile = useIsMobile();
  
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] p-4' : 'sm:max-w-[500px]'}`}>
        <DialogHeader>
          <DialogTitle>Energy Balance</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <ChakraSliders />
        </div>
        
        <DialogFooter className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between'}`}>
          <div className={`flex gap-2 ${isMobile ? 'w-full justify-between' : ''}`}>
            <Button variant="outline" size="sm" onClick={dialog.resetToDefault}>Reset</Button>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
          <Button onClick={dialog.handleApply} className={isMobile ? 'w-full mt-2' : ''}>Apply to Journal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnergyBalanceDialog;
