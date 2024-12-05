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
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedOption === 'categories') {
      fetchGenres();
    } else if (selectedOption === 'bestSelling') {
      fetchBestSellingBooks();
    }
  }, [selectedOption]);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/genres');
      const data = await response.json();
      if (data.success) {
        setGenres(data.genres || []);
      } else {
        console.error('Error fetching genres:', data.message);
        setGenres([]);
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

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
          {/* Radio Buttons */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="manageOption"
                value="bestSelling"
                checked={selectedOption === 'bestSelling'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span className="text-accent-moonstone">Best Selling Books</span>
            </label>
            <label className="flex items-center space-x-3 mt-2">
              <input
                type="radio"
                name="manageOption"
                value="categories"
                checked={selectedOption === 'categories'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-accent-vista"
              />
              <span className="text-accent-moonstone">Categories</span>
            </label>
          </div>

          {/* Best Selling Books Table */}
          {selectedOption === 'bestSelling' && (
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
          )}

          {/* Dropdown for Categories */}
          {selectedOption === 'categories' && (
            <div>
              <label className="block text-gray-700 mb-2">Select Genre</label>
              {loading ? (
                <p className="text-gray-500">Loading genres...</p>
              ) : (
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a genre
                  </option>
                  {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-accent-minBlue text-accent-af_white rounded hover:bg-accent-moonstone mr-2"
          >
            Close
          </button>
          <button
            onClick={() => alert('Changes saved!')} // Save logic here
            className="py-2 px-4 bg-accent-minBlue text-accent-af_white rounded hover:bg-accent-moonstone"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBook;


// 'use client';

// import React, { useEffect, useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   review?: number; // Assuming review is stored as a number (e.g., average rating)
//   image?: string; // Base64 image string
// }

// interface ManageBookProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

// const ManageBook: React.FC<ManageBookProps> = ({ isVisible, onClose }) => {
//   const [selectedOption, setSelectedOption] = useState<string>('');
//   const [genres, setGenres] = useState<string[]>([]);
//   const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
//   const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedOption === 'categories') {
//       fetchGenres();
//     } else if (selectedOption === 'bestSelling') {
//       fetchBestSellingBooks();
//     }
//   }, [selectedOption]);

//   const fetchGenres = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/genres');
//       const data = await response.json();
//       if (data.success) {
//         setGenres(data.genres || []);
//       } else {
//         console.error('Error fetching genres:', data.message);
//         setGenres([]);
//       }
//     } catch (error) {
//       console.error('Error fetching genres:', error);
//       setGenres([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBestSellingBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/bestSellingBooks');
//       const data = await response.json();
//       if (data.success) {
//         setBestSellingBooks(data.books.slice(0, 5) || []); // Display only top 5 books
//         fetchAvailableBooks(); // Fetch all books for adding
//       } else {
//         console.error('Error fetching best-selling books:', data.message);
//         setBestSellingBooks([]);
//       }
//     } catch (error) {
//       console.error('Error fetching best-selling books:', error);
//       setBestSellingBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableBooks = async () => {
//     try {
//       const response = await fetch('/api/books'); // Fetch all books for adding
//       const data = await response.json();
//       if (data.success) {
//         setAvailableBooks(data.books || []);
//       }
//     } catch (error) {
//       console.error('Error fetching available books:', error);
//     }
//   };

//   const handleAddBook = async (bookId: number) => {
//     try {
//       const response = await fetch('/api/addToBestSelling', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         const bookToAdd = availableBooks.find((book) => book.book_id === bookId);
//         if (bookToAdd) {
//           setBestSellingBooks((prev) => [...prev, bookToAdd].slice(0, 5)); // Ensure no more than 5 books
//         }
//       } else {
//         console.error('Failed to add book to best selling:', data.message);
//       }
//     } catch (error) {
//       console.error('Error adding book to best selling:', error);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
//         <h3 className="text-lg font-bold mb-4">Manage Books</h3>

//         <div className="space-y-4">
//           {/* Radio Buttons */}
//           <div>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="manageOption"
//                 value="bestSelling"
//                 checked={selectedOption === 'bestSelling'}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="form-radio text-blue-500"
//               />
//               <span className="text-gray-800">Best Selling Books</span>
//             </label>
//             <label className="flex items-center space-x-3 mt-2">
//               <input
//                 type="radio"
//                 name="manageOption"
//                 value="categories"
//                 checked={selectedOption === 'categories'}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="form-radio text-blue-500"
//               />
//               <span className="text-gray-800">Categories</span>
//             </label>
//           </div>

//           {/* Best Selling Books Table */}
//           {selectedOption === 'bestSelling' && (
//             <div>
//               <h4 className="text-md font-semibold text-gray-700 mb-2">Best Selling Books</h4>
//               {loading ? (
//                 <p className="text-gray-500">Loading best-selling books...</p>
//               ) : bestSellingBooks.length > 0 ? (
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border border-gray-300 p-2 text-left">ID</th>
//                       <th className="border border-gray-300 p-2 text-left">Title</th>
//                       <th className="border border-gray-300 p-2 text-left">Author</th>
//                       <th className="border border-gray-300 p-2 text-left">Stock</th>
//                       <th className="border border-gray-300 p-2 text-left">Review</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bestSellingBooks.map((book) => (
//                       <tr key={book.book_id} className="hover:bg-gray-100">
//                         <td className="border border-gray-300 p-2">{book.book_id}</td>
//                         <td className="border border-gray-300 p-2">{book.title}</td>
//                         <td className="border border-gray-300 p-2">{book.author}</td>
//                         <td className="border border-gray-300 p-2">{book.stock}</td>
//                         <td className="border border-gray-300 p-2">{book.review || 'N/A'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="text-gray-500">No best-selling books found.</p>
//               )}

//               {/* Add Books */}
//               <div className="mt-6">
//                 <h4 className="text-md font-semibold text-gray-700 mb-2">Add Book to Best Selling</h4>
//                 <select
//                   onChange={(e) => handleAddBook(Number(e.target.value))}
//                   className="w-full border border-gray-300 rounded p-2"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select a book to add
//                   </option>
//                   {availableBooks.map((book) => (
//                     <option key={book.book_id} value={book.book_id}>
//                       {book.title} by {book.author}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Dropdown for Categories */}
//           {selectedOption === 'categories' && (
//             <div>
//               <label className="block text-gray-700 mb-2">Select Genre</label>
//               {loading ? (
//                 <p className="text-gray-500">Loading genres...</p>
//               ) : (
//                 <select
//                   className="w-full border border-gray-300 rounded p-2"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Choose a genre
//                   </option>
//                   {genres.map((genre, index) => (
//                     <option key={index} value={genre}>
//                       {genre}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
//           >
//             Close
//           </button>
//           <button
//             onClick={() => alert('Changes saved!')} // Save logic here
//             className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageBook;


// 'use client';

// import React, { useEffect, useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   image?: string; // Base64 image string
// }

// interface ManageBookProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

// const ManageBook: React.FC<ManageBookProps> = ({ isVisible, onClose }) => {
//   const [selectedOption, setSelectedOption] = useState<string>('');
//   const [genres, setGenres] = useState<string[]>([]);
//   const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
//   const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedOption === 'categories') {
//       fetchGenres();
//     } else if (selectedOption === 'bestSelling') {
//       fetchBestSellingBooks();
//     }
//   }, [selectedOption]);

//   const fetchGenres = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/genres');
//       const data = await response.json();
//       if (data.success) {
//         setGenres(data.genres || []);
//       } else {
//         console.error('Error fetching genres:', data.message);
//         setGenres([]);
//       }
//     } catch (error) {
//       console.error('Error fetching genres:', error);
//       setGenres([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBestSellingBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/bestSellingBooks');
//       const data = await response.json();
//       if (data.success) {
//         setBestSellingBooks(data.books.slice(0, 5) || []); // Display only top 5 books
//         fetchAvailableBooks(); // Fetch all books for adding
//       } else {
//         console.error('Error fetching best-selling books:', data.message);
//         setBestSellingBooks([]);
//       }
//     } catch (error) {
//       console.error('Error fetching best-selling books:', error);
//       setBestSellingBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableBooks = async () => {
//     try {
//       const response = await fetch('/api/books'); // Fetch all books for adding
//       const data = await response.json();
//       if (data.success) {
//         setAvailableBooks(data.books || []);
//       }
//     } catch (error) {
//       console.error('Error fetching available books:', error);
//     }
//   };

//   const handleRemoveBook = async (bookId: number) => {
//     try {
//       const response = await fetch('/api/removeBestSelling', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBestSellingBooks((prev) => prev.filter((book) => book.book_id !== bookId));
//       } else {
//         console.error('Failed to remove book from best selling:', data.message);
//       }
//     } catch (error) {
//       console.error('Error removing book from best selling:', error);
//     }
//   };

//   const handleAddBook = async (bookId: number) => {
//     try {
//       const response = await fetch('/api/addToBestSelling', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         const bookToAdd = availableBooks.find((book) => book.book_id === bookId);
//         if (bookToAdd) {
//           setBestSellingBooks((prev) => [...prev, bookToAdd].slice(0, 5)); // Ensure no more than 5 books
//         }
//       } else {
//         console.error('Failed to add book to best selling:', data.message);
//       }
//     } catch (error) {
//       console.error('Error adding book to best selling:', error);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
//         <h3 className="text-lg font-bold mb-4">Manage Books</h3>

//         <div className="space-y-4">
//           {/* Radio Buttons */}
//           <div>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="manageOption"
//                 value="bestSelling"
//                 checked={selectedOption === 'bestSelling'}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="form-radio text-blue-500"
//               />
//               <span className="text-gray-800">Best Selling Books</span>
//             </label>
//             <label className="flex items-center space-x-3 mt-2">
//               <input
//                 type="radio"
//                 name="manageOption"
//                 value="categories"
//                 checked={selectedOption === 'categories'}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="form-radio text-blue-500"
//               />
//               <span className="text-gray-800">Categories</span>
//             </label>
//           </div>

//           {/* Best Selling Books Table */}
//           {selectedOption === 'bestSelling' && (
//             <div>
//               <h4 className="text-md font-semibold text-gray-700 mb-2">Best Selling Books</h4>
//               {loading ? (
//                 <p className="text-gray-500">Loading best-selling books...</p>
//               ) : bestSellingBooks.length > 0 ? (
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border border-gray-300 p-2 text-left">ID</th>
//                       <th className="border border-gray-300 p-2 text-left">Title</th>
//                       <th className="border border-gray-300 p-2 text-left">Author</th>
//                       <th className="border border-gray-300 p-2 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bestSellingBooks.map((book) => (
//                       <tr key={book.book_id} className="hover:bg-gray-100">
//                         <td className="border border-gray-300 p-2">{book.book_id}</td>
//                         <td className="border border-gray-300 p-2">{book.title}</td>
//                         <td className="border border-gray-300 p-2">{book.author}</td>
//                         <td className="border border-gray-300 p-2">
//                           <button
//                             onClick={() => handleRemoveBook(book.book_id)}
//                             className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="text-gray-500">No best-selling books found.</p>
//               )}

//               {/* Add Books */}
//               <div className="mt-6">
//                 <h4 className="text-md font-semibold text-gray-700 mb-2">Add Book to Best Selling</h4>
//                 <select
//                   onChange={(e) => handleAddBook(Number(e.target.value))}
//                   className="w-full border border-gray-300 rounded p-2"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select a book to add
//                   </option>
//                   {availableBooks.map((book) => (
//                     <option key={book.book_id} value={book.book_id}>
//                       {book.title} by {book.author}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Dropdown for Categories */}
//           {selectedOption === 'categories' && (
//             <div>
//               <label className="block text-gray-700 mb-2">Select Genre</label>
//               {loading ? (
//                 <p className="text-gray-500">Loading genres...</p>
//               ) : (
//                 <select
//                   className="w-full border border-gray-300 rounded p-2"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Choose a genre
//                   </option>
//                   {genres.map((genre, index) => (
//                     <option key={index} value={genre}>
//                       {genre}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
//           >
//             Close
//           </button>
//           <button
//             onClick={() => alert('Changes saved!')} // Save logic here
//             className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageBook;


