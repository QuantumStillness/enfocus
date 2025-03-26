
import React from 'react';

interface PracticeItemProps {
  title: string;
  children: React.ReactNode;
}

const PracticeItem: React.FC<PracticeItemProps> = ({ title, children }) => {
  return (
    <div className="border rounded p-3 mb-3">
      <h4 className="font-medium">{title}</h4>
      {children}
    </div>
  );
};

export default PracticeItem;
