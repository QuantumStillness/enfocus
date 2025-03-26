
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Card, CardContent } from "@/components/ui/card";
import JournalEntryCard from "@/components/archive/JournalEntryCard";
import SearchAndFilter from "@/components/archive/SearchAndFilter";
import EntryDetailDialog from "@/components/archive/EntryDetailDialog";
import { JournalEntry } from "@/components/archive/types";
import { sampleEntries } from "@/components/archive/sampleData";

const Archive = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we're using sample data
    setEntries(sampleEntries);
    setFilteredEntries(sampleEntries);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    const filtered = entries.filter((entry) => {
      const matchesQuery = query === "" || (
        entry.title.toLowerCase().includes(query.toLowerCase()) || 
        entry.content.toLowerCase().includes(query.toLowerCase())
      );
      
      const matchesTag = !selectedTag || (entry.tags && entry.tags.includes(selectedTag));
      
      return matchesQuery && matchesTag;
    });
    
    setFilteredEntries(filtered);
  };
  
  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    
    if (!tag) {
      handleSearch(searchQuery); // Reset to just search filter
      return;
    }
    
    const filtered = entries.filter((entry) => {
      const matchesQuery = searchQuery === "" || (
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesTag = entry.tags && entry.tags.includes(tag);
      
      return matchesQuery && matchesTag;
    });
    
    setFilteredEntries(filtered);
  };
  
  const handleEntryClick = (entryId: number) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setSelectedEntry(entry);
      setIsDialogOpen(true);
    }
  };
  
  // Get all unique tags from all entries
  const allTags = Array.from(new Set(
    entries.flatMap((entry) => entry.tags || [])
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="journal-container max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <AnimatedTransition>
              <h1 className="text-3xl font-light text-gray-800 mb-1">Journal Archive</h1>
            </AnimatedTransition>
            <AnimatedTransition delay={100}>
              <p className="text-gray-500">Review your past journal entries and insights</p>
            </AnimatedTransition>
          </div>
          
          <div className="mb-6">
            <SearchAndFilter 
              searchTerm={searchQuery}
              onSearchChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <AnimatedTransition delay={200}>
            <Card>
              <CardContent className="p-6">
                {filteredEntries.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredEntries.map((entry) => (
                      <JournalEntryCard 
                        key={entry.id} 
                        entry={entry}
                        onClick={() => handleEntryClick(entry.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No journal entries found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedTransition>
        </div>
      </main>
      
      {selectedEntry && (
        <EntryDetailDialog
          entry={selectedEntry}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onEntryClick={(entryId) => {
            const linkedEntry = entries.find((e) => e.id === entryId);
            if (linkedEntry) {
              setSelectedEntry(linkedEntry);
            }
          }}
        />
      )}
    </div>
  );
};

export default Archive;
