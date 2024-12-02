"use client";

import React from "react";
import Image from "next/image";
import Button from "../../components/Button";
interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn: string;
  price: string;
  stock: number;
  image?: string; // Base64 image
}

interface Layout1Props {
  books: Book[];
}

const Layout1: React.FC<Layout1Props> = ({ books }) => {
  return (
    <div className="space-y-16">
      {books.map((book) => (
        <div key={book.book_id} className="book-item flex flex-col lg:flex-row items-center">

{/* Book Image */}
          <div className="w-full lg:w-1/3 flex justify-center mb-6 lg:mb-0">
            {book.image ? (
              <Image
                src={`data:image/png;base64,${book.image}`}
                alt={book.title}
                width={250}
                height={350}
                className="shadow-lg rounded-lg"
              />
            ) : (
              <div className="w-64 h-96 bg-gray-200 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
          </div>

{/* Book Details */}
          <div className="w-full lg:w-2/3 lg:pl-8 lg:text-left">
            <h3 className="text-2xl font-semibold mb-2 text-accent-black_olive">
              {book.title}
            </h3>
            <p className="text-lg font-medium text-gray-700 mb-1">by {book.author}</p>
            <p className="text-xl text-amber-500 font-semibold mb-4">${book.price}</p>
            {book.genre && (
              <p className="text-sm font-medium text-gray-600 mb-2">Genre: {book.genre}</p>
            )}
            <p className="text-md text-gray-500 mb-6">ISBN: {book.isbn}</p>
            <Button href="#" label="Quick Add" className="no-underline" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layout1;
