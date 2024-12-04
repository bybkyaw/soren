'use client';

import React, { useState } from 'react';
import UpdateBook from './UpdateBook';
import ConfirmModal from '@/app/components/ModalConfirm';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stock: number;
  image?: string; // Base64 image string
}

interface ViewBookRightProps {
  selectedBook: Book | null;
  onUpdateBook: (updatedBook: Book) => Promise<void>;
}

const ViewBookRight: React.FC<ViewBookRightProps> = ({
  selectedBook,
  onUpdateBook,
}) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  const handleUpdate = () => {
    if (!selectedBook) return;
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => setIsUpdateModalVisible(false);

  const handleBookUpdate = async (book: Book) => {
    setUpdatedBook(book);
    setIsUpdateModalVisible(false);
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = async () => {
    if (updatedBook) {
      await onUpdateBook(updatedBook);
    }
    setIsConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setUpdatedBook(null);
    setIsConfirmModalVisible(false);
  };

  return (
    <div className="p-4 bg-transparent h-full flex flex-col items-center min-w-[250px] max-w-[250px] ml-16">
      <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Preview</h3>

      <div className="w-[200px] h-[300px] bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
        {selectedBook?.image ? (
          <img
            src={selectedBook.image}
            alt={selectedBook.title || 'Book Image'}
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <p className="text-gray-500">Select a book to preview</p>
        )}
      </div>

      <div className="mt-4 text-center w-full">
        {selectedBook ? (
          <>
            <p className="text-accent-af_white font-bold">{selectedBook.title}</p>
            <br />
            <p className="text-accent-af_white text-sm text-left">Author: {selectedBook.author}</p>
            <p className="text-accent-af_white text-sm text-left">Genre: {selectedBook.genre || 'Unknown Genre'}</p>
            <p className="text-accent-af_white text-sm text-left">Price: ${selectedBook.price.toFixed(2)}</p>
            <p className="text-accent-af_white text-sm text-left">Stock: {selectedBook.stock}</p>
          </>
        ) : (
          <p className="text-gray-500">No book selected</p>
        )}
      </div>

      <button
        onClick={handleUpdate}
        disabled={!selectedBook}
        className={`mt-6 py-2 px-4 rounded-lg transition w-full ${
          selectedBook
            ? 'bg-accent-moonstone text-white hover:bg-accent-minBlue'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Update
      </button>

      {selectedBook && (
        <UpdateBook
          book={selectedBook}
          isVisible={isUpdateModalVisible}
          onClose={handleUpdateModalClose}
          onUpdate={handleBookUpdate}
        />
      )}

      <ConfirmModal
        isVisible={isConfirmModalVisible}
        message="Are you sure you want to update this book?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ViewBookRight;


// 'use client';

// import React, { useState } from 'react';
// import UpdateBook from './UpdateBook';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   image?: string; // Base64 image string
// }

// interface ViewBookRightProps {
//   selectedBook: Book | null;
//   onUpdateBook: (updatedBook: Book) => Promise<void>;
// }

// const ViewBookRight: React.FC<ViewBookRightProps> = ({
//   selectedBook,
//   onUpdateBook,
// }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleUpdate = () => {
//     if (!selectedBook) return;
//     setIsModalVisible(true);
//   };

//   const handleModalClose = () => setIsModalVisible(false);

//   return (
//     <div className="p-4 bg-transparent h-full flex flex-col items-center min-w-[250px] max-w-[250px] ml-16">
//       <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Preview</h3>

//       <div className="w-[200px] h-[300px] bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
//         {selectedBook?.image ? (
//           <img
//             src={selectedBook.image}
//             alt={selectedBook.title || 'Book Image'}
//             className="w-full h-full object-contain rounded-lg"
//           />
//         ) : (
//           <p className="text-gray-500">Select a book to preview</p>
//         )}
//       </div>

//       <div className="mt-4 text-center w-full">
//         {selectedBook ? (
//           <>
//             <p className="text-accent-af_white font-bold">{selectedBook.title}</p>
//             <br />
//             <p className="text-accent-af_white text-sm text-left">Author: {selectedBook.author}</p>
//             <p className="text-accent-af_white text-sm text-left">Genre: {selectedBook.genre || 'Unknown Genre'}</p>
//             <p className="text-accent-af_white text-sm text-left">Price: ${selectedBook.price.toFixed(2)}</p>
//             <p className="text-accent-af_white text-sm text-left">Stock: {selectedBook.stock}</p>
//           </>
//         ) : (
//           <p className="text-gray-500">No book selected</p>
//         )}
//       </div>

//       <button
//         onClick={handleUpdate}
//         disabled={!selectedBook}
//         className={`mt-6 py-2 px-4 rounded-lg transition w-full ${
//           selectedBook
//             ? 'bg-accent-moonstone text-white hover:bg-accent-minBlue'
//             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         }`}
//       >
//         Update
//       </button>

//       {selectedBook && (
//         <UpdateBook
//           book={selectedBook}
//           isVisible={isModalVisible}
//           onClose={handleModalClose}
//           onUpdate={onUpdateBook}
//         />
//       )}
//     </div>
//   );
// };

// export default ViewBookRight;


// 'use client';

// import React, { useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   image?: string; // Base64 image string
// }

// interface ViewBookRightProps {
//   selectedBook: Book | null;
// }

// const ViewBookRight: React.FC<ViewBookRightProps> = ({ selectedBook }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpdate = () => {
//     if (!selectedBook) return;

//     setIsLoading(true);
//     console.log(`Updating book: ${selectedBook.title}`);
//     setTimeout(() => {
//       alert(`Book "${selectedBook.title}" updated successfully!`);
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="p-4 bg-transparent h-full flex flex-col items-center min-w-[250px] max-w-[250px] ml-16">
//       <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Preview</h3>

//       <div className="w-[200px] h-[300px] bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
//         {selectedBook?.image ? (
//           <img
//             src={selectedBook.image}
//             alt={selectedBook.title || 'Book Image'}
//             className="w-full h-full object-contain rounded-lg"
//           />
//         ) : (
//           <p className="text-gray-500">Select a book to preview</p>
//         )}
//       </div>

//       <div className="mt-4 text-center w-full">
//         {selectedBook ? (
//           <>
//             <p className="text-accent-af_white font-bold">{selectedBook.title}</p>
//             <br />
//             <p className="text-accent-af_white text-sm text-left">Author: {selectedBook.author}</p>
//             <p className="text-accent-af_white text-sm text-left">Genre: {selectedBook.genre || 'Unknown Genre'}</p>
//             <p className="text-accent-af_white text-sm text-left">Price: ${selectedBook.price.toFixed(2)}</p>
//             <p className="text-accent-af_white text-sm text-left">Stock: {selectedBook.stock}</p>
//           </>
//         ) : (
//           <p className="text-gray-500">No book selected</p>
//         )}
//       </div>

//       <button
//         onClick={handleUpdate}
//         disabled={!selectedBook || isLoading}
//         className={`mt-6 py-2 px-4 rounded-lg transition w-full ${
//           selectedBook && !isLoading
//             ? 'bg-accent-moonstone text-white hover:bg-accent-minBlue'
//             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         }`}
//       >
//         {isLoading ? 'Updating...' : 'Update'}
//       </button>
//     </div>
//   );
// };

// export default ViewBookRight;


// 'use client';

// import React, { useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
//   imageUrl?: string;
// }

// interface ViewBookRightProps {
//   selectedBook: Book | null;
// }

// const ViewBookRight: React.FC<ViewBookRightProps> = ({ selectedBook }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpdate = () => {
//     if (!selectedBook) return;

//     setIsLoading(true);
//     console.log(`Updating book: ${selectedBook.title}`);
//     // Simulate an async operation or navigation
//     setTimeout(() => {
//       alert(`Book "${selectedBook.title}" updated successfully!`);
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="p-4 bg-transparent h-full flex flex-col items-center min-w-[250px] max-w-[250px] ml-16">
//       <h3 className="text-lg font-semibold text-accent-moonstone mb-4 ">Preview</h3>

//       {/* Book Image Placeholder */}
//       <div className="w-[200px] h-[300px] bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
//         {selectedBook ? (
//           <img
//             src={selectedBook.imageUrl || '/default-book-image.jpg'}
//             alt={selectedBook.title}
//             className="w-full h-full object-contain rounded-lg"
//           />
//         ) : (
//           <p className="text-gray-500">Select a book to preview</p>
//         )}
//       </div>

//       {/* Book Title */}
//       <div className="mt-4 text-center w-full">
//         {selectedBook ? (
//           <p className="text-accent-raisin_black font-bold">{selectedBook.title}</p>
//         ) : (
//           <p className="text-gray-500">No book selected</p>
//         )}
//       </div>

//       {/* Book Details */}
//       <div className="mt-2 text-center w-full">
//         {selectedBook && (
//           <>
//             <p className="text-accent-af_white font-bold text-left">{selectedBook.title}</p><br/>
//             <p className="text-accent-af_white text-sm text-left">Author: {selectedBook.author}</p>
//             <p className="text-accent-af_white text-sm text-left">Genre: {selectedBook.genre || 'Unknown Genre'}</p>
//             <p className="text-accent-af_white text-sm text-left">Price: ${selectedBook.price.toFixed(2)}</p>
//             <p className="text-accent-af_white text-sm text-left">Stock: {selectedBook.stock}</p>
//           </>
//         )}
//       </div>

//       {/* Update Button */}
//       <button
//         onClick={handleUpdate}
//         disabled={!selectedBook || isLoading}
//         className={`mt-6 py-2 px-4 rounded-lg transition w-full ${
//           selectedBook && !isLoading
//             ? 'bg-accent-moonstone text-white hover:bg-accent-minBlue'
//             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         }`}
//       >
//         {isLoading ? 'Updating...' : 'Update'}
//       </button>
//     </div>
//   );
// };

// export default ViewBookRight;


