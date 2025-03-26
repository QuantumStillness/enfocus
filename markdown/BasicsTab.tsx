
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";

const BasicsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Markdown Syntax Guide</CardTitle>
        <CardDescription>
          Essential markdown syntax for your journal entries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3">Links and Images</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <CodeBlock>
                    {`[Link text](https://example.com)

![Alt text](image-url.jpg)

<a href="https://example.com">HTML Link</a>
<img src="image-url.jpg" alt="HTML Image" />`}
                  </CodeBlock>
                </div>
                <div className="border p-3 rounded">
                  <p><a href="#" className="text-blue-500 hover:underline">Link text</a></p>
                  <p className="mt-3">Image: <span className="text-gray-500">[image would display here]</span></p>
                  <p className="mt-3">HTML Link and Image examples</p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Blockquotes and Code</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <pre className="bg-gray-100 p-2 rounded font-mono text-sm">
                    {`> This is a blockquote
> Multiple lines

\`Inline code\`

\`\`\`
Code block
with multiple lines
\`\`\``}
                  </pre>
                </div>
                <div className="border p-3 rounded">
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-3">
                    This is a blockquote<br />
                    Multiple lines
                  </blockquote>
                  
                  <p>This has <code className="bg-gray-100 p-1 rounded">inline code</code></p>
                  
                  <pre className="bg-gray-100 p-2 rounded font-mono text-sm mt-3">
                    Code block
                    with multiple lines
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BasicsTab;
