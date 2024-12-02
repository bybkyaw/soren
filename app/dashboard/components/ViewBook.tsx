'use client';

import React, { useState } from 'react';
import AlertModal from '@/app/components/ModalAlert';
import Loading from '../../components/Loading';
import Image from 'next/image';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stock: number;
  coverImage?: string; // Base64 string or URL of the book cover
}

interface RequestBody {
  filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
  value?: string | number;
}

const ViewBook: React.FC = () => {
  const [viewOption, setViewOption] = useState<RequestBody['filter']>('all');
  const [queryValue, setQueryValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleView = async () => {
    setLoading(true);
    try {
      const body: RequestBody = {
        filter: viewOption,
      };

      if (viewOption !== 'all') {
        body.value = queryValue.trim();
      }

      const response = await fetch('/api/viewBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        setAlertMessage(result.message || 'Failed to retrieve books.');
        setIsAlertVisible(true);
        return;
      }

      if (result.books.length === 0) {
        setAlertMessage('No books found for the given query.');
        setIsAlertVisible(true);
        return;
      }

      setBooks(result.books);
      setQueryValue('');
    } catch (error) {
      console.error('Error fetching books:', error);
      setAlertMessage('An unexpected error occurred while fetching books.');
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleView();
    }
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-accent-moonstone mb-4">View Books</h3>

      {/* View Options */}
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 rounded font-semibold ${
            viewOption === 'all' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
          }`}
          onClick={() => setViewOption('all')}
        >
          View All
        </button>
        <button
          className={`py-2 px-4 rounded font-semibold ${
            viewOption === 'author' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
          }`}
          onClick={() => setViewOption('author')}
        >
          By Author
        </button>
        <button
          className={`py-2 px-4 rounded font-semibold ${
            viewOption === 'title' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
          }`}
          onClick={() => setViewOption('title')}
        >
          By Title
        </button>
        <button
          className={`py-2 px-4 rounded font-semibold ${
            viewOption === 'genre' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
          }`}
          onClick={() => setViewOption('genre')}
        >
          By Genre
        </button>
      </div>

      {/* Input and Search Button */}
      {viewOption !== 'all' && (
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder={`Enter ${viewOption}`}
            className="p-2 border border-gray-300 text-accent-raisin_black rounded flex-grow"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:text-accent-mindaro transition"
            onClick={handleView}
          >
            Search
          </button>
        </div>
      )}

      {loading && <Loading message="Fetching books..." />}

      {/* Layout for Table and Image Preview */}
      <div className="flex mt-6 space-x-4">
        {/* Books Table: 3/4 of space */}
        <div className="w-3/4 max-h-[400px] overflow-y-auto">
          {books.length > 0 && (
            <table className="table-auto w-full border-collapse border border-gray-300 text-accent-moonstone">
              <thead>
                <tr className="bg-accent-moonstone text-accent-af_white">
                  <th className="border border-gray-300 p-2 text-left">ID</th>
                  <th className="border border-gray-300 p-2 text-left">Title</th>
                  <th className="border border-gray-300 p-2 text-left">Author</th>
                  <th className="border border-gray-300 p-2 text-left">Genre</th>
                  <th className="border border-gray-300 p-2 text-left">Price</th>
                  <th className="border border-gray-300 p-2 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr
                    key={book.book_id}
                    className={`cursor-pointer ${selectedBook?.book_id === book.book_id ? 'bg-blue-200' : ''}`}
                    onClick={() => handleRowClick(book)}
                  >
                    <td className="border border-gray-300 p-2 text-left">{book.book_id}</td>
                    <td className="border border-gray-300 p-2 text-left">{book.title}</td>
                    <td className="border border-gray-300 p-2 text-left">{book.author}</td>
                    <td className="border border-gray-300 p-2 text-left">{book.genre || 'N/A'}</td>
                    <td className="border border-gray-300 p-2 text-left">${book.price}</td>
                    <td className="border border-gray-300 p-2 text-left">{book.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Preview Section: 1/4 of space */}
        <div className="w-1/4 p-4 border border-gray-300 rounded-lg bg-white h-[400px] overflow-y-auto">
          <h3 className="text-lg font-bold text-accent-moonstone text-center mb-4">Preview</h3>
          {selectedBook ? (
            <div>
              <p className="text-md text-accent-moonstone">
                <strong>Title:</strong> {selectedBook.title}
              </p>
              <p className="text-md text-accent-moonstone">
                <strong>Author:</strong> {selectedBook.author}
              </p>
              {selectedBook.genre && (
                <p className="text-md text-accent-moonstone">
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
              )}
              <p className="text-md text-accent-moonstone">
                <strong>Price:</strong> ${selectedBook.price}
              </p>
              <p className="text-md text-accent-moonstone">
                <strong>Stock:</strong> {selectedBook.stock}
              </p>
              {selectedBook.coverImage && (
                <Image
                  src={`data:image/jpeg;base64,${selectedBook.coverImage}`}
                  alt="Book Cover"
                  width={300}
                  height={300}
                  className="mt-4 object-contain border border-gray-300 rounded"
                />
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Select a book to see the preview</p>
          )}
        </div>
      </div>

      <AlertModal
        isVisible={isAlertVisible}
        message={alertMessage}
        onClose={() => setIsAlertVisible(false)}
      />
    </div>
  );
};

export default ViewBook;



// 'use client';

// import React, { useState } from 'react';
// import AlertModal from '@/app/components/ModalAlert';
// import Loading from '../../components/Loading';
// import Image from 'next/image';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   coverImage?: string; // Base64 string or URL of the book cover
// }

// interface RequestBody {
//   filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
//   value?: string | number;
//   operator?: 'less' | 'greater' | 'equal';
// }

// const ViewBook: React.FC = () => {
//   const [viewOption, setViewOption] = useState<RequestBody['filter']>('all');
//   const [queryValue, setQueryValue] = useState('');
//   const [stockFilter, setStockFilter] = useState<RequestBody['operator']>('greater');
//   const [loading, setLoading] = useState(false);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);

//   const handleView = async () => {
//     setLoading(true);
//     try {
//       const body: RequestBody = {
//         filter: viewOption,
//       };

//       if (viewOption === 'stock') {
//         body.operator = stockFilter;
//         body.value = parseInt(queryValue, 10);
//       } else if (viewOption !== 'all') {
//         body.value = queryValue.trim();
//       }

//       const response = await fetch('/api/viewBooks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         setAlertMessage(result.message || 'Failed to retrieve books.');
//         setIsAlertVisible(true);
//         return;
//       }

//       if (result.books.length === 0) {
//         setAlertMessage('No books found for the given query.');
//         setIsAlertVisible(true);
//         return;
//       }

//       // Handle books with images
//       const booksWithImages = result.books.map((book: Book & { coverImage?: string }) => ({
//         ...book,
//         coverImage: book.coverImage ? `data:image/jpeg;base64,${book.coverImage}` : null,
//       }));

//       setBooks(booksWithImages);
//       setQueryValue('');
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       setAlertMessage('An unexpected error occurred while fetching books.');
//       setIsAlertVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRowClick = (book: Book) => {
//     setSelectedBook(book);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleView();
//     }
//   };

//   return (
//     <div className="p-6 flex flex-col h-full">
//       <h3 className="text-lg font-semibold text-accent-moonstone mb-4">View Books</h3>

//       {/* View Options */}
//       <div className="flex gap-4 mb-4">
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'all' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('all')}
//         >
//           View All
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'author' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('author')}
//         >
//           By Author
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'title' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('title')}
//         >
//           By Title
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'genre' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('genre')}
//         >
//           By Genre
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'price' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('price')}
//         >
//           By Price
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'stock' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('stock')}
//         >
//           By Stock
//         </button>
//       </div>

//       {/* Input and Search Button */}
//       {viewOption !== 'all' && (
//         <div className="flex items-center gap-4 mb-4">
//           {viewOption === 'stock' && (
//             <div className="flex gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="less"
//                   checked={stockFilter === 'less'}
//                   onChange={() => setStockFilter('less')}
//                 />
//                 <span className="text-accent-moonstone">Less than</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="greater"
//                   checked={stockFilter === 'greater'}
//                   onChange={() => setStockFilter('greater')}
//                 />
//                 <span className="text-accent-moonstone">Greater than</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="equal"
//                   checked={stockFilter === 'equal'}
//                   onChange={() => setStockFilter('equal')}
//                 />
//                 <span className="text-accent-moonstone">Equal to</span>
//               </label>
//             </div>
//           )}
//           <input
//             type="text"
//             placeholder={`Enter ${viewOption}`}
//             className="p-2 border border-gray-300 text-accent-raisin_black rounded flex-grow"
//             value={queryValue}
//             onChange={(e) => setQueryValue(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:text-accent-mindaro transition"
//             onClick={handleView}
//           >
//             Search
//           </button>
//         </div>
//       )}

//       {loading && <Loading message="Fetching books..." />}

//       {/* Layout for Table and Image Preview */}
//       <div className="flex mt-6 space-x-4">
//         {/* Books Table: 3/4 of space */}
//         <div className="w-3/4 max-h-[400px] overflow-y-auto">
//           {books.length > 0 && (
//             <table className="table-auto w-full border-collapse border border-gray-300 text-accent-moonstone">
//               <thead>
//                 <tr className="bg-accent-moonstone text-accent-af_white">
//                   <th className="border border-gray-300 p-2 text-left">ID</th>
//                   <th className="border border-gray-300 p-2 text-left">Title</th>
//                   <th className="border border-gray-300 p-2 text-left">Author</th>
//                   <th className="border border-gray-300 p-2 text-left">Genre</th>
//                   <th className="border border-gray-300 p-2 text-left">Price</th>
//                   <th className="border border-gray-300 p-2 text-left">Stock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book) => (
//                   <tr
//                     key={book.book_id}
//                     className={`cursor-pointer ${selectedBook?.book_id === book.book_id ? 'bg-blue-200' : ''}`}
//                     onClick={() => handleRowClick(book)}
//                   >
//                     <td className="border border-gray-300 p-2 text-left">{book.book_id}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.title}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.author}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.genre || 'N/A'}</td>
//                     <td className="border border-gray-300 p-2 text-left">${book.price}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.stock}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Preview Section: 1/4 of space */}
//         <div className="w-1/4 p-4 border border-gray-300 rounded-lg bg-white h-[400px] overflow-y-auto">
//           <h3 className="text-lg font-bold text-accent-moonstone text-center mb-4">Preview</h3>
//           {selectedBook ? (
//             <div>
//               <p className="text-md text-accent-moonstone">
//                 <strong>Title:</strong> {selectedBook.title}
//               </p>
//               <p className="text-md text-accent-moonstone">
//                 <strong>Author:</strong> {selectedBook.author}
//               </p>
//               {selectedBook.genre && (
//                 <p className="text-md text-accent-moonstone">
//                   <strong>Genre:</strong> {selectedBook.genre}
//                 </p>
//               )}
//               <p className="text-md text-accent-moonstone">
//                 <strong>Price:</strong> ${selectedBook.price}
//               </p>
//               <p className="text-md text-accent-moonstone">
//                 <strong>Stock:</strong> {selectedBook.stock}
//               </p>
//               {selectedBook.coverImage && (
//                 <Image
//                   src={selectedBook.coverImage}
//                   alt="Book Cover"
//                   width={300}
//                   height={300}
//                   className="mt-4 object-contain border border-gray-300 rounded"
//                 />
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center">Select a book to see the preview</p>
//           )}
//         </div>
//       </div>

//       <AlertModal
//         isVisible={isAlertVisible}
//         message={alertMessage}
//         onClose={() => setIsAlertVisible(false)}
//       />
//     </div>
//   );
// };

// export default ViewBook;





//Latest working code
// 'use client';

// import React, { useState } from 'react';
// import AlertModal from '@/app/components/ModalAlert';
// import Loading from '../../components/Loading';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   imageUrl?: string; // URL of the book image
// }

// interface RequestBody {
//   filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
//   value?: string | number;
//   operator?: 'less' | 'greater' | 'equal';
// }

// const ViewBook: React.FC = () => {
//   const [viewOption, setViewOption] = useState<RequestBody['filter']>('all');
//   const [queryValue, setQueryValue] = useState('');
//   const [stockFilter, setStockFilter] = useState<RequestBody['operator']>('greater');
//   const [loading, setLoading] = useState(false);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);

//   const handleView = async () => {
//     setLoading(true);
//     try {
//       const body: RequestBody = {
//         filter: viewOption,
//       };

//       if (viewOption === 'stock') {
//         body.operator = stockFilter;
//         body.value = parseInt(queryValue, 10);
//       } else if (viewOption !== 'all') {
//         body.value = queryValue.trim();
//       }

//       const response = await fetch('/api/viewBooks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         setAlertMessage(result.message || 'Failed to retrieve books.');
//         setIsAlertVisible(true);
//         return;
//       }

//       if (result.books.length === 0) {
//         setAlertMessage('No books found for the given query.');
//         setIsAlertVisible(true);
//         return;
//       }

//       setBooks(result.books);
//       setQueryValue('');
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       setAlertMessage('An unexpected error occurred while fetching books.');
//       setIsAlertVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRowClick = (book: Book) => {
//     setSelectedBook(book);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleView();
//     }
//   };

//   return (
//     <div className="p-6 flex flex-col h-full">
//       <h3 className="text-lg font-semibold text-accent-moonstone mb-4">View Books</h3>

//       {/* View Options */}
//       <div className="flex gap-4 mb-4">
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'all' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('all')}
//         >
//           View All
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'author' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('author')}
//         >
//           By Author
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'title' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('title')}
//         >
//           By Title
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'genre' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('genre')}
//         >
//           By Genre
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'price' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('price')}
//         >
//           By Price
//         </button>
//         <button
//           className={`py-2 px-4 rounded font-semibold ${
//             viewOption === 'stock' ? 'bg-accent-moonstone text-white' : 'bg-transparent border border-accent-moonstone text-accent-moonstone'
//           }`}
//           onClick={() => setViewOption('stock')}
//         >
//           By Stock
//         </button>
//       </div>

//       {/* Input and Search Button */}
//       {viewOption !== 'all' && (
//         <div className="flex items-center gap-4 mb-4">
//           {viewOption === 'stock' && (
//             <div className="flex gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="less"
//                   checked={stockFilter === 'less'}
//                   onChange={() => setStockFilter('less')}
//                 />
//                 <span className="text-accent-moonstone">Less than</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="greater"
//                   checked={stockFilter === 'greater'}
//                   onChange={() => setStockFilter('greater')}
//                 />
//                 <span className="text-accent-moonstone">Greater than</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="stockFilter"
//                   value="equal"
//                   checked={stockFilter === 'equal'}
//                   onChange={() => setStockFilter('equal')}
//                 />
//                 <span className="text-accent-moonstone">Equal to</span>
//               </label>
//             </div>
//           )}
//           <input
//             type="text"
//             placeholder={`Enter ${viewOption}`}
//             className="p-2 border border-gray-300 text-accent-raisin_black rounded flex-grow"
//             value={queryValue}
//             onChange={(e) => setQueryValue(e.target.value)}
//             onKeyDown={handleKeyDown} // Search on Enter key
//           />
//           <button
//             className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:text-accent-mindaro transition"
//             onClick={handleView}
//           >
//             Search
//           </button>
//         </div>
//       )}

//       {loading && <Loading message="Fetching books..." />}

//       {/* Layout for Table and Image Preview */}
//       <div className="flex mt-6 space-x-4">
//         {/* Books Table: 3/4 of space */}
//         <div className="w-3/4 max-h-[400px] overflow-y-auto">
//           {books.length > 0 && (
//             <table className="table-auto w-full border-collapse border border-gray-300 text-accent-moonstone">
//               <thead>
//                 <tr className="bg-accent-moonstone text-accent-af_white">
//                   <th className="border border-gray-300 p-2 text-left">ID</th>
//                   <th className="border border-gray-300 p-2 text-left">Title</th>
//                   <th className="border border-gray-300 p-2 text-left">Author</th>
//                   <th className="border border-gray-300 p-2 text-left">Genre</th>
//                   <th className="border border-gray-300 p-2 text-left">Price</th>
//                   <th className="border border-gray-300 p-2 text-left">Stock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book) => (
//                   <tr
//                     key={book.book_id}
//                     className={`cursor-pointer ${selectedBook?.book_id === book.book_id ? 'bg-blue-200' : ''}`}
//                     onClick={() => handleRowClick(book)}
//                   >
//                     <td className="border border-gray-300 p-2 text-left">{book.book_id}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.title}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.author}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.genre || 'N/A'}</td>
//                     <td className="border border-gray-300 p-2 text-left">${book.price}</td>
//                     <td className="border border-gray-300 p-2 text-left">{book.stock}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Image Preview: 1/4 of space */}
//         <div className="w-1/4 p-4 border border-gray-300 rounded-lg bg-white h-[400px] flex flex-col items-center justify-center">
//           {selectedBook && selectedBook.imageUrl ? (
//             <>
//               <img
//                 src={selectedBook.imageUrl}
//                 alt={`Preview of ${selectedBook.title}`}
//                 className="w-full h-auto rounded-lg"
//               />
//               <p className="mt-2 text-accent-raisin_black text-center">{selectedBook.title}</p>
//               <p className="text-sm text-gray-500 text-center">{selectedBook.author}</p>
//             </>
//           ) : (
//             <p className="text-gray-500 text-center">Select a book to see the preview</p>
//           )}
//         </div>
//       </div>

//       <AlertModal
//         isVisible={isAlertVisible}
//         message={alertMessage}
//         onClose={() => setIsAlertVisible(false)}
//       />
//     </div>
//   );
// };

// export default ViewBook;


