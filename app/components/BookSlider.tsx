'use client';

import React from 'react';
import Slider from 'react-slick';
import BookCard from './BookCards';
import '../Styles/BookSlider.css';

interface Book {
  book_id: number;
  title: string;
  author: string;
  price: number;
  image: string | null; // Base64-encoded string or null
}

interface BookSliderProps {
  books: Book[]; // Array of books to display
}

const BookSlider: React.FC<BookSliderProps> = ({ books }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="next-arrow">&gt;</div>,
    prevArrow: <div className="prev-arrow">&lt;</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // If there are 4 or fewer books, display them as plain BookCards aligned left
  if (books.length <= 4) {
    return (
      <div className="flex gap-4">
        {books.map((book) => (
          <BookCard
            key={book.book_id}
            imageUrl={book.image ? `data:image/jpeg;base64,${book.image}` : '/placeholder.jpg'}
            title={book.title}
            author={book.author}
            price={`$${book.price.toFixed(2)}`}
            rating={0} // Placeholder rating
          />
        ))}
      </div>
    );
  }

  // If there are more than 4 books, use the slider
  return (
    <section className="mb-24 relative">
      <Slider {...settings} className="relative">
        {books.map((book) => (
          <div key={book.book_id} className="px-4">
            <BookCard
              imageUrl={book.image ? `data:image/jpeg;base64,${book.image}` : '/placeholder.jpg'}
              title={book.title}
              author={book.author}
              price={`$${book.price.toFixed(2)}`}
              rating={0} // Placeholder rating
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BookSlider;


