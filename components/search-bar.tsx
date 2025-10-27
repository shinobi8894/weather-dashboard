'use client';

import { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function SearchBar({ onSearch, isLoading, placeholder = 'Search for a city...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('');
      e.currentTarget.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full px-5 py-4 pl-14 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-white/50 
                   text-gray-900 placeholder-gray-500 text-lg
                   focus:outline-none focus:border-white focus:bg-white focus:ring-4 focus:ring-white/20
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="City search"
          autoComplete="off"
        />
        <Search 
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" 
          size={20} 
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl
                   bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium
                   hover:from-blue-600 hover:to-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Search"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
