
import React from 'react';
import BasicsTab from './BasicsTab';
import ObsidianIntegrationInfo from './ObsidianIntegrationInfo';
import ExamplesTab from './ExamplesTab';

export {
  BasicsTab,
  ObsidianIntegrationInfo,
  ExamplesTab,
};

interface MarkdownInfoProps {
  activeTab?: 'basics' | 'obsidian' | 'examples';
}

const MarkdownInfo: React.FC<MarkdownInfoProps> = ({ activeTab = 'basics' }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'basics':
        return <BasicsTab />;
      case 'obsidian':
        return <ObsidianIntegrationInfo />;
      case 'examples':
        return <ExamplesTab />;
      default:
        return <BasicsTab />;
    }
  };

  return (
    <div className="markdown-info">
      {renderContent()}
    </div>
  );
};

export default MarkdownInfo;
