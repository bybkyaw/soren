'use client';

import React, { useState } from 'react';

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stock: number;
}

interface UpdateBookProps {
  book: Book | null;
  isVisible: boolean;
  onClose: () => void;
  onSave: (updatedBook: Book) => void;
}

const UpdateBook: React.FC<UpdateBookProps> = ({ book, isVisible, onClose, onSave }) => {
  const [formData, setFormData] = useState<Book | null>(book);

  if (!isVisible || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => prevData && { ...prevData, [name]: value });
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Update Book</h3>
        <div className="flex flex-col gap-4">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              value={formData.genre || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 rounded bg-accent-moonstone text-white hover:bg-accent-minBlue"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;




// 'use client';

// import React, { useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
// }

// interface UpdateBookProps {
//   book: Book;
//   isVisible: boolean;
//   onClose: () => void;
//   onSave: (updatedBook: Book) => void;
// }

// const UpdateBook: React.FC<UpdateBookProps> = ({ book, isVisible, onClose, onSave }) => {
//   const [formData, setFormData] = useState<Book>(book);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`/api/updateBook/${formData.book_id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         const updatedBook = await response.json();
//         onSave(updatedBook); // Update the book in the parent component
//         onClose(); // Close the modal
//       } else {
//         console.error('Failed to update the book.');
//       }
//     } catch (error) {
//       console.error('Error updating book:', error);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//         <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Update Book</h3>
//         <div className="flex flex-col gap-4">
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Author:
//             <input
//               type="text"
//               name="author"
//               value={formData.author}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Genre:
//             <input
//               type="text"
//               name="genre"
//               value={formData.genre || ''}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Price:
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Stock:
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//         </div>
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="py-2 px-4 rounded bg-accent-moonstone text-white hover:bg-accent-minBlue"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBook;


// 'use client';

// import React, { useState } from 'react';

// interface Book {
//   book_id: number;
//   title: string;
//   author: string;
//   genre?: string;
//   price: number;
//   stock: number;
// }

// interface UpdateBookProps {
//   book: Book | null;
//   isVisible: boolean;
//   onClose: () => void;
//   onSave: (updatedBook: Book) => void;
// }

// const UpdateBook: React.FC<UpdateBookProps> = ({ book, isVisible, onClose, onSave }) => {
//   const [formData, setFormData] = useState<Book | null>(book);

//   if (!isVisible || !formData) return null;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => prevData && { ...prevData, [name]: value });
//   };

//   const handleSave = () => {
//     if (formData) {
//       onSave(formData);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//         <h3 className="text-lg font-semibold text-accent-moonstone mb-4">Update Book</h3>
//         <div className="flex flex-col gap-4">
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Author:
//             <input
//               type="text"
//               name="author"
//               value={formData.author}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Genre:
//             <input
//               type="text"
//               name="genre"
//               value={formData.genre || ''}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Price:
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//           <label>
//             Stock:
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </label>
//         </div>
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="py-2 px-4 rounded bg-accent-moonstone text-white hover:bg-accent-minBlue"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBook;
