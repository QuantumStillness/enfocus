
import React from 'react';
import { JournalEntry } from './types';
import { getFormattedDate, getChakraColor } from './utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JournalEntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{entry.title}</CardTitle>
        <p className="text-sm text-gray-500">{getFormattedDate(entry.date)}</p>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-3 text-gray-700 mb-3">
          {entry.content.split('\n\n')[0]}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {entry.tags && entry.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {entry.chakras && entry.chakras.map((chakra) => (
            <span 
              key={chakra} 
              className={`px-2 py-1 text-xs rounded-full ${getChakraColor(chakra)}`}
            >
              {chakra}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalEntryCard;
