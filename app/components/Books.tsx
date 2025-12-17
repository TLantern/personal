"use client";

import React, { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}

export function Books() {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
      const data = await response.json();
      
      if (data.items) {
        const books: Book[] = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title || 'Unknown Title',
          author: item.volumeInfo.authors?.[0] || 'Unknown Author',
          image: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || '',
        }));
        setSearchResults(books);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBookTitle(value);
    if (value.trim()) {
      searchBooks(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectBook = (book: Book) => {
    if (!recommendations.find(b => b.id === book.id)) {
      setRecommendations([...recommendations, book]);
    }
    setBookTitle('');
    setSearchResults([]);
    setShowInput(false);
  };

  const handleRemoveBook = (bookId: string) => {
    setRecommendations(recommendations.filter(book => book.id !== bookId));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-left mb-2 opacity-70 text-sm">Currently Reading</p>
      <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">Alexander the Great</h3>
          <p className="text-xs opacity-70">by Philip Freeman</p>
        </div>
        <img src="/alexander.jpg" alt="Alexander the Great" className="w-12 h-12 object-cover rounded" />
      </div>
      <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">Thinking in Systems</h3>
          <p className="text-xs opacity-70">by Donella Meadows</p>
        </div>
        <img src="/thinking_in_systems.jpg" alt="Thinking in Systems" className="w-12 h-12 object-cover rounded" />
      </div>
      {!showInput ? (
        <button 
          onClick={() => setShowInput(true)}
          className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-sm font-medium transition-colors"
        >
          Recommend +
        </button>
      ) : (
        <div className="relative mt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={bookTitle}
              onChange={handleInputChange}
              placeholder="Search for a book..."
              className="flex-1 px-3 py-2 bg-white/5 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40"
              autoFocus
            />
            <button
              onClick={() => {
                setShowInput(false);
                setBookTitle('');
                setSearchResults([]);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
          {isSearching && (
            <div className="mt-2 text-xs opacity-60">Searching...</div>
          )}
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-black/95 border border-white/20 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
              {searchResults.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 text-left border-b border-white/10 last:border-b-0"
                >
                  {book.image && (
                    <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{book.title}</div>
                    <div className="text-xs opacity-70 truncate">by {book.author}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {recommendations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2 opacity-80">Recommended</h4>
          <div className="flex flex-col gap-2">
            {recommendations.map((book) => (
              <div key={book.id} className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                {book.image && (
                  <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{book.title}</div>
                  <div className="text-xs opacity-70">by {book.author}</div>
                </div>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="ml-2 w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors flex-shrink-0"
                  aria-label="Remove book"
                >
                  <span className="text-white opacity-70">×</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
