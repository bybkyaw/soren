'use client';

import React, { useState } from 'react';
import AlertModal from '@/app/components/ModalAlert';
import ConfirmModal from '@/app/components/ModalConfirm';
import Loading from '../../components/Loading';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn: string;
  price: number;
  stock: number;
  image?: string;
}

const RemoveBookForm: React.FC = () => {
  const [searchOption, setSearchOption] = useState<'title' | 'author' | 'isbn' | 'book_id' | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  // Handle searching for a book
  const handleSearch = async () => {
    if (!searchOption || !searchValue.trim()) {
      setAlertMessage('Please select a search option and enter a value.');
      setIsAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/findBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          criteria: searchOption,
          value: searchValue,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setAlertMessage(result.message || 'Book not found.');
        setIsAlertVisible(true);
        return;
      }

      setBookDetails(result.book); // Populate book details
    } catch (error) {
      console.error('Error during search:', error);
      setAlertMessage('An unexpected error occurred while searching for the book.');
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting the book
  const handleDelete = async () => {
    if (!bookDetails) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/removeBook?book_id=${bookDetails.book_id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        setAlertMessage(result.message || 'Failed to delete the book.');
        setIsAlertVisible(true);
        return;
      }

      // Show success message
      setAlertMessage(`The book '${bookDetails.title}' has been removed.`);
      setIsAlertVisible(true);
      setBookDetails(null); // Clear book details
      setSearchValue(''); // Clear search input
    } catch (error) {
      console.error('Error deleting the book:', error);
      setAlertMessage('An unexpected error occurred while deleting the book.');
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Form Section */}
      <div className="w-2/3 p-6 border-r border-gray-300 flex flex-col justify-start items-center">
        <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Remove Book</h3>

        {/* Centered Search Options */}
        <div className="flex gap-4 mb-4">
          <button
            className={`py-2 px-4 rounded font-semibold ${
              searchOption === 'title'
                ? 'bg-accent-moonstone text-white'
                : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
            }`}
            onClick={() => setSearchOption('title')}
          >
            By Title
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold ${
              searchOption === 'author'
                ? 'bg-accent-moonstone text-white'
                : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
            }`}
            onClick={() => setSearchOption('author')}
          >
            By Author
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold ${
              searchOption === 'isbn'
                ? 'bg-accent-moonstone text-white'
                : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
            }`}
            onClick={() => setSearchOption('isbn')}
          >
            By ISBN
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold ${
              searchOption === 'book_id'
                ? 'bg-accent-moonstone text-white'
                : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
            }`}
            onClick={() => setSearchOption('book_id')}
          >
            By Book ID
          </button>
        </div>

        {/* Search Input */}
        {searchOption && (
          <input
            type="text"
            placeholder={`Enter ${searchOption}`}
            className="p-2 border border-gray-300 text-accent-raisin_black rounded w-full mb-4"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}

        {/* Search Button */}
        <button
          className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:text-accent-mindaro transition mt-4"
          onClick={handleSearch}
        >
          Search
        </button>

        {loading && <Loading message="Processing..." />}

        {/* Remove Button */}
        {bookDetails && (
          <button
            className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:text-accent-mindaro transition mt-4"
            onClick={() => setIsConfirmVisible(true)}
          >
            Remove Book
          </button>
        )}
      </div>

      {/* Preview Section */}
      <div className="w-2/5 p-6 flex flex-col items-start justify-start">
        <h3 className="text-xl font-bold text-accent-moonstone mb-4 w-full text-center">Preview</h3>
        {bookDetails ? (
          <div className="text-left">
            <p className="text-md text-accent-moonstone">
              <strong>Title:</strong> {bookDetails.title || 'Untitled'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Author:</strong> {bookDetails.author || 'Unknown Author'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>ISBN:</strong> {bookDetails.isbn || 'N/A'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Genre:</strong> {bookDetails.genre || 'N/A'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Price:</strong> ${bookDetails.price || 'N/A'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Stock:</strong> {bookDetails.stock || 'N/A'}
            </p>
          </div>
        ) : (
          <p className="text-accent-moonstone">Search for a book to preview details here.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isVisible={isConfirmVisible}
        message={`Are you sure you want to delete "${bookDetails?.title}"?`}
        onConfirm={() => {
          setIsConfirmVisible(false);
          handleDelete();
        }}
        onCancel={() => setIsConfirmVisible(false)}
      />

      {/* Alert Modal */}
      <AlertModal
        isVisible={isAlertVisible}
        message={alertMessage}
        onClose={() => setIsAlertVisible(false)}
      />
  </div>

  );
};

export default RemoveBookForm;



