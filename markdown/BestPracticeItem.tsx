
import React from 'react';

interface BestPracticeItemProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

const BestPracticeItem: React.FC<BestPracticeItemProps> = ({ 
  title, 
  children, 
  bgColor = "bg-blue-50" 
}) => {
  return (
    <div className={`border rounded p-4 ${bgColor} mb-4`}>
      <h4 className="font-medium mb-2">{title}</h4>
      {children}
    </div>
  );
};

export default BestPracticeItem;
