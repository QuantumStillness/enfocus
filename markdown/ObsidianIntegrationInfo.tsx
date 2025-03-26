
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ObsidianIntegrationInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Using Obsidian with Exported Files</CardTitle>
        <CardDescription>
          How to use your journal entries and templates with Obsidian
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3">Getting Started with Obsidian</h3>
              <p className="mb-3">
                Obsidian is a powerful knowledge base that works on top of a local folder of plain text Markdown files. It's perfect for journaling, planning, and organizing thoughts.
              </p>
              
              <div className="border rounded p-4 bg-blue-50 mb-4">
                <h4 className="font-medium mb-2">Setting Up Obsidian</h4>
                <ol className="list-decimal pl-5">
                  <li>Download and install Obsidian from <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">obsidian.md</a></li>
                  <li>Create a vault (a folder where your notes will be stored)</li>
                  <li>Place your exported journal entries and templates in this vault</li>
                </ol>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Obsidian-specific Features</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Internal Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <pre className="bg-gray-100 p-2 rounded font-mono text-sm">
                      {`[[Note Name]]
[[Note Name|Display Text]]`}
                    </pre>
                  </div>
                  <div className="border p-3 rounded">
                    <p>Link to note: <a href="#" className="text-blue-500 hover:underline">Note Name</a></p>
                    <p>Link with custom text: <a href="#" className="text-blue-500 hover:underline">Display Text</a></p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <pre className="bg-gray-100 p-2 rounded font-mono text-sm">
                      {`#tag
#nested/tag`}
                    </pre>
                  </div>
                  <div className="border p-3 rounded">
                    <p><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm">tag</span></p>
                    <p><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm">nested/tag</span></p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">YAML Frontmatter</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                  <pre>
                    {`---
title: Journal Entry
date: 2023-07-20
tags: [meditation, mindfulness]
chakras: [heart, crown]
emotion: peaceful
---`}
                  </pre>
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Frontmatter is used by Obsidian plugins to organize and filter your notes.
                </p>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-medium mb-3">Recommended Plugins</h3>
              <div className="space-y-3">
                <div className="border rounded p-3">
                  <h4 className="font-medium">Dataview</h4>
                  <p className="text-sm text-gray-600">Query and filter your journal entries by tags, emotions, or dates</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Calendar</h4>
                  <p className="text-sm text-gray-600">View your journal entries in a calendar interface</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Templates</h4>
                  <p className="text-sm text-gray-600">Insert templates into new notes for consistent journaling</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Kanban</h4>
                  <p className="text-sm text-gray-600">Create kanban boards for your 12-week planning</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ObsidianIntegrationInfo;
