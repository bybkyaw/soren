'use client';

import React from 'react';
import Slider from 'react-slick';
import BookCard from '../components/BookCards';
import { FictionBooks } from '../components/BookSection';
import '../Styles/BookSlider.css';

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="arrow right-arrow" onClick={onClick}>
    &gt;
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="arrow left-arrow" onClick={onClick}>
    &lt;
  </div>
);

const BookSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,          // Center the active slides
    centerPadding: '10px',     // Adjust padding between the centered items and arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="
                        mb-24 
                        relative
                       "
    >
      <h2 className="
                      text-2xl 
                      font-bold 
                      mb-4 
                      text-center
                    "
      >Fiction Books</h2>
      <div className="
                      flex 
                      justify-center
                     "
      >
        <Slider {...settings} className="w-[80%]">    {/* Center slider with custom width */}
          {FictionBooks.map((book) => (
            <div key={book.book_id} className="px-4"> {/* Increase padding */}
              <BookCard
                imageUrl={book.imageUrl}
                title={book.title}
                author={book.author}
                price={`$${book.price.toFixed(2)}`}
                rating={book.rating}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BookSlider;





