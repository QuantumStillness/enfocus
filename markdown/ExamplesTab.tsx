
import React from 'react';
import MarkdownExampleItem from './MarkdownExampleItem';
import { CodeBlock } from '@/components/ui/code-block';
import PracticeItem from './PracticeItem';
import BestPracticeItem from './BestPracticeItem';

const ExamplesTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Markdown Examples</h2>
      
      <MarkdownExampleItem
        title="Headings"
        code={`# Heading 1\n## Heading 2\n### Heading 3`}
        render={
          <>
            <h1 className="text-2xl font-bold">Heading 1</h1>
            <h2 className="text-xl font-semibold">Heading 2</h2>
            <h3 className="text-lg font-medium">Heading 3</h3>
          </>
        }
      />
      
      <MarkdownExampleItem
        title="Text Formatting"
        code={`**Bold Text**\n*Italic Text*\n~~Strikethrough~~\n**Bold and _nested italic_**`}
        render={
          <>
            <p><strong>Bold Text</strong></p>
            <p><em>Italic Text</em></p>
            <p><del>Strikethrough</del></p>
            <p><strong>Bold and <em>nested italic</em></strong></p>
          </>
        }
      />
      
      <MarkdownExampleItem
        title="Lists"
        code={`- Unordered list item 1\n- Unordered list item 2\n  - Nested item\n\n1. Ordered list item 1\n2. Ordered list item 2\n   1. Nested ordered item`}
        render={
          <>
            <ul className="list-disc pl-5 mb-2">
              <li>Unordered list item 1</li>
              <li>Unordered list item 2
                <ul className="list-disc pl-5">
                  <li>Nested item</li>
                </ul>
              </li>
            </ul>
            
            <ol className="list-decimal pl-5">
              <li>Ordered list item 1</li>
              <li>Ordered list item 2
                <ol className="list-decimal pl-5">
                  <li>Nested ordered item</li>
                </ol>
              </li>
            </ol>
          </>
        }
      />
      
      <h3 className="text-lg font-semibold mt-8">Template Variables</h3>
      <p className="mb-4">Use these variables in your templates for dynamic content:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PracticeItem title="Date & Time Variables">
          <ul className="list-disc pl-5">
            <li><code>{'{{date}}'}</code> - Current date (YYYY-MM-DD)</li>
            <li><code>{'{{time}}'}</code> - Current time (HH:MM)</li>
            <li><code>{'{{day}}'}</code> - Day of week (Monday, Tuesday, etc.)</li>
            <li><code>{'{{week}}'}</code> - Week number of the year</li>
          </ul>
        </PracticeItem>
        
        <PracticeItem title="Journal Variables">
          <ul className="list-disc pl-5">
            <li><code>{'{{emotion}}'}</code> - Selected emotion</li>
            <li><code>{'{{intention}}'}</code> - Today's intention</li>
            <li><code>{'{{gratitude}}'}</code> - Gratitude items</li>
          </ul>
        </PracticeItem>
      </div>
      
      <BestPracticeItem 
        title="Template Example: Daily Journal" 
        bgColor="bg-green-50"
      >
        <CodeBlock language="markdown">
{`# Daily Journal - {{date}}

## Morning Intentions
**Emotion:** {{emotion}}
**Intention:** {{intention}}
**Gratitude:** {{gratitude}}

## Today's Focus
- [ ] Priority 1
- [ ] Priority 2
- [ ] Priority 3

## Evening Reflection
### Wins
### Insights
### Tomorrow`}
        </CodeBlock>
      </BestPracticeItem>
      
      <BestPracticeItem 
        title="Template Example: Meditation Notes" 
        bgColor="bg-purple-50"
      >
        <CodeBlock language="markdown">
{`# Meditation - {{date}}

**Type:** {{meditation_type}}
**Duration:** {{duration}} minutes
**Focus:** 

## Experience
- Physical sensations:
- Mental state:
- Insights:

## Follow-up
- [ ] Practice again tomorrow
- [ ] Incorporate insight into daily life`}
        </CodeBlock>
      </BestPracticeItem>
    </div>
  );
};

export default ExamplesTab;
