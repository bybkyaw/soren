'use client';

import React, { useState, useEffect } from 'react';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn?: string;
  price: number;
  stock: number;
  image?: string; // Base64 image string
}

interface UpdateBookProps {
  book: Book;
  isVisible: boolean;
  onClose: () => void;
  onUpdate: (updatedBook: Book) => void;
}

const UpdateBook: React.FC<UpdateBookProps> = ({
  book,
  isVisible,
  onClose,
  onUpdate,
}) => {
  const [updatedBook, setUpdatedBook] = useState<Book>(book);
  const [previewImage, setPreviewImage] = useState<string | undefined>(book.image);

  useEffect(() => {
    setUpdatedBook(book);
    setPreviewImage(book.image);
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setUpdatedBook((prev) => ({
          ...prev,
          image: reader.result as string, // Store Base64 string in the state
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate(updatedBook);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Update Book</h3>
        <form className="space-y-4">
          <input
            type="text"
            name="title"
            value={updatedBook.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Title"
          />
          <input
            type="text"
            name="author"
            value={updatedBook.author}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Author"
          />
          <input
            type="text"
            name="genre"
            value={updatedBook.genre || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Genre"
          />
          <input
            type="number"
            name="price"
            value={updatedBook.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Price"
          />
          <input
            type="number"
            name="stock"
            value={updatedBook.stock}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Stock"
          />
          <div>
            <label className="block text-sm mb-2">Book Cover Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded p-2"
            />
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Book Cover Preview"
                  className="w-full h-40 object-contain border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;


// 'use client';

// import React, { useState, useEffect } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   isbn?: string;
//   price: number;
//   stock: number;
//   image?: string; // Base64 image string
// }

// interface UpdateBookProps {
//   book: Book;
//   isVisible: boolean;
//   onClose: () => void;
//   onUpdate: (updatedBook: Book) => void;
// }

// const UpdateBook: React.FC<UpdateBookProps> = ({
//   book,
//   isVisible,
//   onClose,
//   onUpdate,
// }) => {
//   const [updatedBook, setUpdatedBook] = useState<Book>(book);

//   useEffect(() => {
//     setUpdatedBook(book);
//   }, [book]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUpdatedBook((prev) => ({
//       ...prev,
//       [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
//     }));
//   };

//   const handleSubmit = () => {
//     onUpdate(updatedBook);
//     onClose();
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//         <h3 className="text-lg font-semibold mb-4">Update Book</h3>
//         <form className="space-y-4">
//           <input
//             type="text"
//             name="title"
//             value={updatedBook.title}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Title"
//           />
//           <input
//             type="text"
//             name="author"
//             value={updatedBook.author}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Author"
//           />
//           <input
//             type="text"
//             name="genre"
//             value={updatedBook.genre || ''}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Genre"
//           />
//           <input
//             type="number"
//             name="price"
//             value={updatedBook.price}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Price"
//           />
//           <input
//             type="number"
//             name="stock"
//             value={updatedBook.stock}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Stock"
//           />
//         </form>
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBook;
