'use client';

import React from 'react';
import Button from './Button';

interface BookCardProps {
  imageUrl: string; // URL for the book cover image
  title: string;    // Title of the book
  author: string;   // Author of the book
  price: string;    // Price of the book
  rating: number;   // Rating of the book (out of 5, allowing halves)
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, title, author, price, rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="
                    bg-primary 
                    shadow-md 
                    rounded-lg 
                    overflow-hidden
                    w-48
                   "
    >
      <img src={imageUrl} alt={`Cover of ${title} by ${author}`} className="w-full h-60 object-cover" />

      
      <div className="p-2">
        <h3 className="text-sm font-bold mb-1">{title}</h3>
        <p className="text-xs text-accent-black_olive mb-1">by {author}</p>
        <p className="text-lg font-semibold mb-1">{price}</p>
        
        <div className="flex items-center mb-2">
          
          {/* Full stars */}
          {[...Array(fullStars)].map((_, index) => (
            <span key={index} className="text-yellow-500">
              ★
            </span>
          ))}

          {/* Half star (CSS-masked half) */}
          {hasHalfStar && (
            <span className="text-yellow-500 relative">
              ★
              <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-gray-300">
                ★
              </span>
            </span>
          )}

          {/* Empty stars */}
          {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
            <span key={index} className="text-gray-300">
              ★
            </span>
          ))}
        </div>
        
        <Button href="#" label="Quick Add" />
      </div>
    </div>
  );
};

export default BookCard;



