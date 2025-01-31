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
  image?: string; // Base64 image string
}

const ViewBook: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const response = await fetch(`/api/updateBook/${updatedBook.book_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        alert('Book updated successfully!');
        setSelectedBook(updatedBook);
      } else {
        alert('Failed to update book. Please try again.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      alert('An error occurred while updating the book.');
    }
  };

  return (
    <div className="flex h-full">
      <ViewBookLeft selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
      <ViewBookRight selectedBook={selectedBook} onUpdateBook={handleUpdateBook} />
    </div>
  );
};

export default ViewBook;


