
import React from 'react';

const TemplateTips: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Template Tips</h3>
      <div className="border rounded-md p-4 space-y-4">
        <div>
          <h4 className="font-medium">Variables</h4>
          <p className="text-sm text-gray-600 mb-2">
            Use these variables in your template to be replaced when used:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li><code>{"{{date}}"}</code> - Current date</li>
            <li><code>{"{{time}}"}</code> - Current time</li>
            <li><code>{"{{day}}"}</code> - Day of the week</li>
            <li><code>{"{{week}}"}</code> - Week number</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium">Markdown Reminders</h4>
          <ul className="list-disc pl-5 text-sm">
            <li><code># Heading 1</code> - Main title</li>
            <li><code>## Heading 2</code> - Section header</li>
            <li><code>- [ ]</code> - Checkbox item</li>
            <li><code>1.</code> - Numbered list</li>
            <li><code>*italic*</code> - Italic text</li>
            <li><code>**bold**</code> - Bold text</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium">Template Examples</h4>
          <div className="text-sm space-y-2">
            <div className="border-l-2 border-blue-500 pl-3 py-1">
              <p className="font-medium">Journal Template</p>
              <pre className="text-xs overflow-x-auto">
                {`# Journal Entry: {{date}}\n\n## Gratitude\n1. \n2. \n3. \n\n## Reflections\n\n## Intentions\n`}
              </pre>
            </div>
            
            <div className="border-l-2 border-purple-500 pl-3 py-1">
              <p className="font-medium">Meditation Template</p>
              <pre className="text-xs overflow-x-auto">
                {`# Meditation: {{date}}\n\n**Duration**: 15 minutes\n**Type**: Mindfulness\n\n## Before\n\n## Notes\n\n## After\n`}
              </pre>
            </div>
            
            <div className="border-l-2 border-green-500 pl-3 py-1">
              <p className="font-medium">Weekly Planning Template</p>
              <pre className="text-xs overflow-x-auto">
                {`# Week {{week}} Plan\n\n## Goals\n- [ ] Goal 1\n- [ ] Goal 2\n\n## Daily Tasks\n### Monday\n- [ ] \n### Tuesday\n- [ ] \n`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTips;
