
import React from 'react';
import BestPracticeItem from './BestPracticeItem';

const TipsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Markdown Best Practices</h2>
      
      <BestPracticeItem title="Consistent Formatting">
        <ul className="list-disc pl-5">
          <li>Use consistent heading levels</li>
          <li>Maintain a clear hierarchy</li>
          <li>Use whitespace to separate sections</li>
        </ul>
      </BestPracticeItem>
      
      <BestPracticeItem title="Combining with Templates" bgColor="bg-green-50">
        <p className="text-sm">
          Use templates as a starting point, but don't feel constrained by them.
          Customize them to fit your needs and writing style.
        </p>
      </BestPracticeItem>
      
      <BestPracticeItem title="Linking Between Notes" bgColor="bg-purple-50">
        <p className="text-sm">
          Create a web of knowledge by linking related concepts and entries.
          In Obsidian, use the [[double bracket]] syntax to create links.
        </p>
      </BestPracticeItem>
    </div>
  );
};

export default TipsTab;
