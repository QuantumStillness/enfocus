
import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search journal entries..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Calendar size={18} />
        <span>Date Range</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Filter size={18} />
        <span>Filters</span>
      </Button>
    </div>
  );
};

export default SearchAndFilter;
