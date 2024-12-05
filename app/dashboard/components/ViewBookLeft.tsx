'use client';

import React, { useState } from 'react';
import AlertModal from '@/app/components/ModalAlert';
import Loading from '../../components/Loading';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn: string;
  price: number;
  stock: number;
  isBestSelling?: boolean;
  imageUrl?: string; // URL of the book image
}

interface RequestBody {
  filter: 'all' | 'author' | 'title' | 'genre' | 'stock';
  value?: string | number;
  operator?: 'less' | 'greater' | 'equal';
}

interface ViewBookLeftProps {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}

const ViewBookLeft: React.FC<ViewBookLeftProps> = ({
  selectedBook,
  setSelectedBook,
}) => {
  const [viewOption, setViewOption] = useState<RequestBody['filter']>('all');
  const [queryValue, setQueryValue] = useState('');
  const [stockFilter, setStockFilter] = useState<RequestBody['operator']>('greater');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleView = async () => {
    setLoading(true);
    try {
      const body: RequestBody = {
        filter: viewOption,
        ...(viewOption === 'stock'
          ? { value: parseInt(queryValue, 10), operator: stockFilter }
          : viewOption !== 'all'
          ? { value: queryValue.trim() }
          : {}),
      };

      if (viewOption === 'stock' && isNaN(Number(queryValue))) {
        setAlertMessage('Please enter a valid number for stock.');
        setIsAlertVisible(true);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/viewBooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok || result.books.length === 0) {
        setAlertMessage(result.message || 'No books found.');
        setIsAlertVisible(true);
      } else {
        setBooks(result.books);
        setQueryValue('');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setAlertMessage('An unexpected error occurred.');
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleView();
  };

  const handleRowClick = async (book: Book) => {
    try {
      const response = await fetch(`/api/getBook/${book.book_id}`);
      const data = await response.json();

      if (!response.ok) {
        alert('Failed to fetch book details');
        return;
      }

      setSelectedBook(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
      alert('An error occurred while fetching book details.');
    }
  };

  const handleCheckboxChange = async (book: Book, isChecked: boolean) => {
    try {
      const payload = {
        bookId: book.book_id,
        isBestSelling: isChecked,
      };

      console.log("Payload being sent:", payload); // Debugging

      const response = await fetch('/api/bestSellingBooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Error from server:", result.message);
        setAlertMessage(result.message || 'Failed to update Best Selling Book status.');
        setIsAlertVisible(true);
      } else {
        console.log("Book updated successfully:", result.book);
        setBooks((prevBooks) =>
          prevBooks.map((b) =>
            b.book_id === book.book_id ? { ...b, isBestSelling: isChecked } : b
          )
        );
      }
    } catch (error) {
      console.error("Error updating Best Selling Book status:", error);
      setAlertMessage('An unexpected error occurred.');
      setIsAlertVisible(true);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full min-w-[900px] max-w-[900px]">
      <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Manage Books</h3>

      {/* View Options */}
      <div className="flex gap-4 mb-4 mr-11 justify-center">
        {['all', 'title', 'author', 'genre', 'stock'].map((option) => (
          <button
            key={option}
            className={`py-2 px-4 rounded font-semibold ${
              viewOption === option
                ? 'bg-accent-moonstone text-white'
                : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
            }`}
            onClick={() => setViewOption(option as RequestBody['filter'])}
          >
            {`By ${option.charAt(0).toUpperCase() + option.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Input for Specific Query */}
      {viewOption !== 'all' && (
        <div className="flex flex-col gap-4 mb-4">
          {viewOption === 'stock' && (
            <div className="flex gap-4">
              {['less', 'greater', 'equal'].map((operator) => (
                <label key={operator} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stockFilter"
                    value={operator}
                    checked={stockFilter === operator}
                    onChange={() => setStockFilter(operator as RequestBody['operator'])}
                  />
                  <span className="text-accent-moonstone">
                    {operator.charAt(0).toUpperCase() + operator.slice(1)} than
                  </span>
                </label>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder={`Enter ${viewOption}`}
            className="p-2 border border-gray-300 text-accent-raisin_black rounded w-full"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      )}

      {/* View Button */}
      <button
        className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded mr-11 font-semibold bg-transparent hover:border hover:text-accent-mindaro transition"
        onClick={handleView}
      >
        View
      </button>

      {loading && <Loading message="Fetching books..." />}

      {/* Books Display */}
      <div className="mt-6 h-[400px] overflow-y-auto border border-gray-300 rounded-lg mr-11">
        {books.length > 0 && (
          <table className="table-auto w-full border-collapse border border-gray-300 text-accent-moonstone">
            <thead className="sticky top-0 bg-accent-minBlue text-accent-af_white z-10">
              <tr>
                <th className="border border-gray-300 p-2 w-[80px]">ID</th>
                <th className="border border-gray-300 p-2 w-[250px]">Title</th>
                <th className="border border-gray-300 p-2 w-[200px]">Author</th>
                <th className="border border-gray-300 p-2 w-[200px]">ISBN</th>
                <th className="border border-gray-300 p-2 w-[150px]">Genre</th>
                <th className="border border-gray-300 p-2 w-[100px]">Price</th>
                <th className="border border-gray-300 p-2 w-[100px]">Stock</th>
                <th className="border border-gray-300 p-2 w-[50px]">BSB</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.book_id}
                  className={`cursor-pointer ${
                    selectedBook?.book_id === book.book_id
                      ? 'bg-accent-minBlue border-l-4 border-blue-500'
                      : 'hover:bg-accent-oxford_blue'
                  }`}
                  onClick={() => handleRowClick(book)}
                  style={{ height: '40px' }}
                >
                  <td className="border border-gray-300 p-2 text-left">{book.book_id}</td>
                  <td className="border border-gray-300 p-2 text-left">{book.title}</td>
                  <td className="border border-gray-300 p-2 text-left">{book.author}</td>
                  <td className="border border-gray-300 p-2 text-left">{book.isbn}</td>
                  <td className="border border-gray-300 p-2 text-left">{book.genre || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-left">${book.price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">{book.stock}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={book.isBestSelling || false}
                      onChange={(e) => handleCheckboxChange(book, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AlertModal
        isVisible={isAlertVisible}
        message={alertMessage}
        onClose={() => setIsAlertVisible(false)}
      />
    </div>
  );
};

export default ViewBookLeft;

