'use client';

import React, { useState } from 'react';
import ViewBookLeft from './ViewBookLeft';
import ViewBookRight from './ViewBookRight';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stock: number;
  imageUrl?: string; // URL of the book image
}

const ViewBook: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="flex h-full">
    {/* Left Section: View Books */}
    <div className="w-[75%] pr-4 border-r border-accent-minBlue">
      <ViewBookLeft selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
    </div>
  
    {/* Right Section: Preview */}
    <div className="w-[25%] pl-2">
      <ViewBookRight selectedBook={selectedBook} />
    </div>
  </div>
  
  );
};

export default ViewBook;


