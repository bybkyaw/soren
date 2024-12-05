'use client';

import React from 'react';
import { useCart } from './CartContext';

interface BookCardProps {
  imageUrl: string;
  title: string;
  author: string;
  price: string;
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  imageUrl,
  title,
  author,
  price,
  id,
}) => {
  const { addToCart } = useCart(); // Access the addToCart function from the CartContext

  return (
    <div className="book-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 w-56 h-96">
      {/* Book Image */}
      <div className="w-full h-40 flex justify-center items-center mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600">No Image Available</span>
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="text-center flex flex-col justify-between flex-grow w-full">
        <div>
          <h3
            className="text-lg font-semibold text-accent-black_olive mb-1 truncate"
            title={title}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-700 font-medium mb-1 truncate"
            title={author}
          >
            by {author}
          </p>
        </div>
        <p className="text-xl text-amber-500 font-semibold mb-4">{price}</p>
        <button
          onClick={() =>
            addToCart({
              id,
              title,
              price: parseFloat(price),
              quantity: 1,
            })
          }
          className="w-full bg-accent-moonstone text-white py-2 px-4 rounded-lg hover:bg-accent-minBlue transition"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
};

export default BookCard;


// 'use client';

// import React from 'react';
// import { useCart } from './CartContext';

// interface BookCardProps {
//   imageUrl: string;
//   title: string;
//   author: string;
//   price: string;
//   id: string;
// }

// const BookCard: React.FC<BookCardProps> = ({
//   imageUrl,
//   title,
//   author,
//   price,
//   id,
// }) => {
//   const { addToCart } = useCart(); // Access the addToCart function from the CartContext

//   return (
//     <div className="book-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 w-48">
//       {/* Book Image */}
//       <div className="w-full h-60 flex justify-center items-center mb-4">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={`Cover of ${title}`}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <span className="text-sm text-gray-600">No Image Available</span>
//           </div>
//         )}
//       </div>

//       {/* Book Details */}
//       <div className="text-center">
//         <h3
//           className="text-lg font-semibold text-accent-black_olive mb-2 truncate"
//           title={title}
//         >
//           {title}
//         </h3>
//         <p
//           className="text-sm text-gray-700 font-medium mb-2 truncate"
//           title={author}
//         >
//           by {author}
//         </p>
//         <p className="text-xl text-amber-500 font-semibold mb-4">{price}</p>
//         <button
//           onClick={() =>
//             addToCart({
//               id,
//               title,
//               price: parseFloat(price),
//               quantity: 1,
//             })
//           }
//           className="w-full bg-accent-moonstone text-white py-2 px-4 rounded-lg hover:bg-accent-minBlue transition"
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;


