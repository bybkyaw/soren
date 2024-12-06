'use client';

import React, { useEffect, useState } from 'react';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stock: number;
  review?: number; // Assuming review is stored as a number (e.g., average rating)
  image?: string; // Base64 image string
}

interface ManageBookProps {
  isVisible: boolean;
  onClose: () => void;
}

const ManageBook: React.FC<ManageBookProps> = ({ isVisible, onClose }) => {
  const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBestSellingBooks();
  }, []);

  const fetchBestSellingBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bestSellingBooks');
      const data = await response.json();
      if (data.success) {
        setBestSellingBooks(data.books || []);
      } else {
        console.error('Error fetching best-selling books:', data.message);
        setBestSellingBooks([]);
      }
    } catch (error) {
      console.error('Error fetching best-selling books:', error);
      setBestSellingBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-accent-raisin_black text-accent-af_white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Manage Books</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-accent-moonstone mb-2">Best Selling Books</h4>
            {loading ? (
              <p className="text-gray-500">Loading best-selling books...</p>
            ) : bestSellingBooks.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-accent-minBlue">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">ID</th>
                    <th className="border border-gray-300 p-2 text-left">Title</th>
                    <th className="border border-gray-300 p-2 text-left">Author</th>
                    <th className="border border-gray-300 p-2 text-left">Stock</th>
                    <th className="border border-gray-300 p-2 text-left">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellingBooks.map((book) => (
                    <tr key={book.book_id} className="hover:bg-accent-minBlue">
                      <td className="border border-gray-300 p-2">{book.book_id}</td>
                      <td className="border border-gray-300 p-2">{book.title}</td>
                      <td className="border border-gray-300 p-2">{book.author}</td>
                      <td className="border border-gray-300 p-2">{book.stock}</td>
                      <td className="border border-gray-300 p-2">{book.review || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No best-selling books found.</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-accent-minBlue text-accent-af_white rounded hover:bg-accent-moonstone mr-2"
          >
            Close
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ManageBook;



