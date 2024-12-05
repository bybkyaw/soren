'use client';

import React, { useEffect, useState } from 'react';
import BookCard from './BookCards';
import { useCart } from './CartContext';

interface Book {
  book_id: number;
  title: string;
  author: string;
  price: string; // Ensure price is a string, consistent with the API
  genre: string;
  stock: number;
  image: string | null;
}

interface BookSectionProps {
  genre: string;
}

const BookSection: React.FC<BookSectionProps> = ({ genre }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/book?genre=${genre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setBooks(data.books || []);
        } else {
          setError(data.message || 'Failed to fetch books.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

  const handleQuickAdd = (book: Book) => {
    addToCart({
      id: book.book_id.toString(),
      title: book.title,
      price: parseFloat(book.price), // Parse price from string
      quantity: 1,
    });
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="mb-64">
      <h2 className="text-2xl font-bold mb-4">{genre} Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
        <BookCard
        key={book.book_id} // This is for React's unique key
        imageUrl={book.image ? `data:image/jpeg;base64,${book.image}` : '/placeholder.png'}
        title={book.title}
        author={book.author}
        price={book.price} // Ensure price matches the string type
        onQuickAdd={() => handleQuickAdd(book)} // Pass the required props only
      />
      
        ))}
      </div>
    </section>
  );
};

export default BookSection;





// 'use client';

// import React, { useEffect, useState } from 'react';
// import BookCard from '../components/BookCards';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   price: number;
//   stock: number;
//   image: string; // Base64-encoded string for Blob image
//   rating: number;
// }

// interface BookSectionProps {
//   genre: string; // Genre to filter books
// }

// const BookSection: React.FC<BookSectionProps> = ({ genre }) => {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     // Fetch books by genre from API or database
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch(`/api/books?genre=${genre}`);
//         const data = await response.json();
//         setBooks(data.books);
//       } catch (error) {
//         console.error('Failed to fetch books:', error);
//       }
//     };

//     fetchBooks();
//   }, [genre]);

//   return (
//     <section className="mb-64">
//       <h2 className="text-2xl font-bold mb-4">{genre} Books</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {books.map((book) => (
//           <BookCard
//             key={book.book_id}
//             bookId={book.book_id.toString()} // Pass book_id as bookId (string)
//             imageUrl={`data:image/jpeg;base64,${book.image}`} // Convert Blob to base64 URL
//             title={book.title}
//             author={book.author}
//             price={book.price} // Pass price as a number
//             rating={book.rating || 0} // Fallback if rating is not present
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BookSection;


