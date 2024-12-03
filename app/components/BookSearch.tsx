// components/BookSearch.tsx
import React, { useState } from 'react';
import Loading from './Loading';  // Import the Loading component
import AlertModal from './ModalAlert';  // Import the AlertModal component

interface Book {
  book_id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

const BookSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);  // Loading state
  const [alertMessage, setAlertMessage] = useState<string>('');  // Alert message state
  const [showAlert, setShowAlert] = useState<boolean>(false);  // Show alert modal state

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);  // Show loading spinner
    setAlertMessage('');  // Reset alert message

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          criteria: 'title',
          value: searchQuery,
          multiple: true,
        }),
      });

      const data = await response.json();

      if (data.success && data.books) {
        setSearchResults(data.books);
        if (data.books.length === 0) {
          setAlertMessage('No books found. Please try a different search.');
          setShowAlert(true);
        }
      } else {
        setAlertMessage('An error occurred while fetching the books. Please try again later.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('An unexpected error occurred. Please try again later.');
      setShowAlert(true);
    }

    setLoading(false);  // Hide loading spinner
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <div className="relative flex items-center space-x-2 w-full">
      <input
        type="text"
        placeholder="Search books..."
        className="w-80 px-2 py-1 border rounded-md text-black"
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="bg-accent-moonstone text-white px-4 py-2 rounded-md hover:bg-accent-moonstone-dark transition"
      >
        Search
      </button>

      {/* Show Loading Component while fetching search results */}
      {loading ? (
        <Loading message="Searching for books..." />
      ) : (
        <div
          className={`absolute top-full mt-2 w-full max-h-96 overflow-auto bg-white shadow-lg border rounded-md z-50 ${
            searchQuery ? 'block' : 'hidden'
          }`}
        >
          {/* Display book results */}
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div key={book.book_id} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
                <div className="flex space-x-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-24 h-32 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-sm text-gray-700 mt-2">{book.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4">No results found</div>
          )}
        </div>
      )}

      {/* Show AlertModal for errors or empty results */}
      <AlertModal
        isVisible={showAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
};

export default BookSearch;