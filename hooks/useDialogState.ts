
import { useState } from 'react';

export function useDialogState() {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);
  
  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  };
}
