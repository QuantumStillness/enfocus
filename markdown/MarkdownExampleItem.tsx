
import React from 'react';

interface MarkdownExampleItemProps {
  title: string;
  code: string;
  render: React.ReactNode;
}

const MarkdownExampleItem: React.FC<MarkdownExampleItemProps> = ({ title, code, render }) => {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <pre className="bg-gray-100 p-2 rounded font-mono text-sm">
            {code}
          </pre>
        </div>
        <div className="border p-3 rounded">
          {render}
        </div>
      </div>
    </div>
  );
};

export default MarkdownExampleItem;
