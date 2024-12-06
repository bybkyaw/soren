'use client';

import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { useCart } from './CartContext';

interface BookCardProps {
  imageUrl: string;
  title: string;
  author: string;
  price: string;
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  imageUrl,
  title,
  author,
  price,
  id,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 w-52">
      {/* Book Image */}
      <div className="w-full h-60 flex justify-center items-center mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Cover of ${title}`}
            width={150}
            height={240}
            className="object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-sm text-gray-600">No Image Available</span>
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="flex flex-col items-center flex-grow justify-between w-full">
        {/* Title and Author */}
        <div className="text-center">
          <h3
            className="text-base font-semibold text-accent-black_olive mb-1 truncate"
            title={title}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-700 font-medium mb-1 truncate"
            title={author}
          >
            by {author}
          </p>
        </div>

        {/* Price */}
        <p className="text-lg text-amber-500 font-semibold mb-4">{price}</p>
      </div>

      {/* Quick Add Button */}
      <div className="mt-auto w-full">
        <Button
          onClick={() =>
            addToCart({
              id,
              title,
              price: parseFloat(price),
              quantity: 1,
            })
          }
          label="Quick Add"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default BookCard;


