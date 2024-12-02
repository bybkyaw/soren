'use client';

import React from 'react';
import BookCard from '../components/BookCards'; // Adjust the path as necessary

// Fiction Books
export const FictionBooks = [
  {
    book_id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '9780743273565',
    publication_date: '1925-04-10',
    price: 10.99,
    stock: 120,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.5,
  },
  {
    book_id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '9780061120084',
    publication_date: '1960-07-11',
    price: 7.99,
    stock: 85,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.8,
  },
  {
    book_id: 3,
    title: '1984',
    author: 'George Orwell',
    genre: 'Fiction',
    isbn: '9780451524935',
    publication_date: '1949-06-08',
    price: 8.99,
    stock: 60,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.6,
  },
  {
    book_id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Fiction',
    isbn: '9781503290563',
    publication_date: '1813-01-28',
    price: 5.99,
    stock: 75,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.3,
  },
  {
    book_id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    isbn: '9780316769488',
    publication_date: '1951-07-16',
    price: 9.99,
    stock: 100,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.2,
  },
  {
    book_id: 6,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fiction',
    isbn: '9780547928227',
    publication_date: '1937-09-21',
    price: 10.99,
    stock: 70,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.8,
  },
  {
    book_id: 7,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    genre: 'Fiction',
    isbn: '9781451673319',
    publication_date: '1953-10-19',
    price: 8.99,
    stock: 40,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.1,
  },
  {
    book_id: 8,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Fiction',
    isbn: '9780060850524',
    publication_date: '1932-08-30',
    price: 12.99,
    stock: 50,
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    rating: 4.4,
  },
];

export async function getStaticProps() {
  return {
    props: {
      books: FictionBooks,
    },
  };
}

const BooksSection: React.FC<{ books: typeof FictionBooks }> = ({ books }) => {
  return (
    <section className="mb-64">
      <h2 className="
                      text-2xl 
                      font-bold 
                      mb-4">
      Fiction Books
      </h2>
      <div className="
                      grid 
                      grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-4 
                      gap-4
                     ">
        {books.map((book) => (
          <BookCard
            key={book.book_id}
            imageUrl={book.imageUrl}
            title={book.title}
            author={book.author}
            price={`$${book.price.toFixed(2)}`}
            rating={book.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default BooksSection;