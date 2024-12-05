'use client';

import React from 'react';
import { useCart } from './CartContext';

interface BookCardProps {
  imageUrl: string;
  title: string;
  author: string;
  price: string; // Price is received as a string
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  imageUrl,
  title,
  author,
  price,
  id,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 w-48">
      {/* Book Image */}
      <div className="w-full h-60 flex justify-center items-center mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600">No Image Available</span>
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="text-center">
        <h3
          className="text-lg font-semibold text-accent-black_olive mb-2 truncate"
          title={title}
        >
          {title}
        </h3>
        <p
          className="text-sm text-gray-700 font-medium mb-2 truncate"
          title={author}
        >
          by {author}
        </p>
        <p className="text-xl text-amber-500 font-semibold mb-4">{price}</p>
        <button
          onClick={() =>
            addToCart({
              id,
              title,
              price: parseFloat(price), // Convert price to number
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
//         <p className="text-xl text-amber-500 font-semibold mb-4">${price}</p>
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


// 'use client';

// import React from 'react';

// interface BookCardProps {
//   imageUrl: string;
//   title: string;
//   author: string;
//   price: string;
//   onQuickAdd: () => void;
// }

// const BookCard: React.FC<BookCardProps> = ({
//   imageUrl,
//   title,
//   author,
//   price,
//   onQuickAdd,
// }) => {
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
//         <p className="text-xl text-amber-500 font-semibold mb-4">
//           {price}
//         </p>
//         <button
//           onClick={onQuickAdd}
//           className="w-full bg-accent-moonstone text-white py-2 px-4 rounded-lg hover:bg-accent-minBlue transition"
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;



// 'use client';

// import React from 'react';

// interface BookCardProps {
//   imageUrl: string;
//   title: string;
//   author: string;
//   price: string;
//   onQuickAdd: () => void;
// }

// const BookCard: React.FC<BookCardProps> = ({
//   imageUrl,
//   title,
//   author,
//   price,
//   onQuickAdd,
// }) => {
//   const formattedPrice = parseFloat(price).toFixed(2);

//   return (
//     <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
//       {/* Image with fallback */}
//       <img
//         src={imageUrl || '/placeholder.png'} // Fallback to placeholder image if imageUrl is missing
//         alt={`Cover of ${title}`}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-2 bg-accent-af_white">
//         <h3 className="text-sm font-bold mb-1 truncate" title={title}>
//           {title}
//         </h3>
//         <p className="text-xs text-accent-moonstone mb-1 truncate" title={author}>
//           by {author}
//         </p>
//         <p className="text-lg font-semibold mb-1">
//           ${formattedPrice !== 'NaN' ? formattedPrice : 'Price Unavailable'}
//         </p>
//         <button
//           onClick={onQuickAdd}
//           className="w-full mt-2 bg-accent-moonstone text-white py-1 px-2 rounded hover:bg-accent-minBlue"
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;







// 'use client';

// import React from 'react';
// import { useCart } from './CartContext';
// import Button from './Button';

// interface BookCardProps {
//   bookId: string;
//   imageUrl?: string; // URL for the book cover image (optional)
//   title: string;     // Title of the book
//   author: string;    // Author of the book
//   price: number | null | undefined; // Allow null/undefined for safety
//   rating?: number;   // Rating of the book (optional, defaults to 0 if not provided)
// }

// const BookCard: React.FC<BookCardProps> = ({ bookId, imageUrl, title, author, price }) => {
//   const { addToCart } = useCart();

//   const handleQuickAdd = () => {
//     addToCart({
//       id: bookId,
//       title,
//       price: price || 0, // Default to 0 if price is invalid
//       quantity: 1,
//     });
//   };

  // return (
  //   <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
  //     {/* Image with fallback */}
  //     <img
  //       src={imageUrl || '/placeholder.png'} // Fallback to placeholder image if imageUrl is missing
  //       alt={`Cover of ${title}`}
  //       className="w-full h-60 object-cover"
  //     />
  //     <div className="p-2 bg-accent-af_white">
  //       <h3 className="text-sm font-bold mb-1">{title}</h3>
  //       <p className="text-xs text-accent-moonstone mb-1">by {author}</p>
  //       <p className="text-lg font-semibold mb-1">{price}</p>
        
  //       <Button
  //         onClick={handleQuickAdd}
  //         label="Quick Add"
  //         className="w-full mt-2"
  //       />
  //     </div>
  //   </div>
//   );
// };

// export default BookCard;


// 'use client';

// import React from 'react';
// import { useCart } from './CartContext';
// import Button from './Button';

// interface BookCardProps {
//   bookId: string;
//   imageUrl?: string; // URL for the book cover image (optional)
//   title: string;     // Title of the book
//   author: string;    // Author of the book
//   price: number | null | undefined; // Allow null/undefined for safety
//   rating?: number;   // Rating of the book (optional, defaults to 0 if not provided)
// }

// const BookCard: React.FC<BookCardProps> = ({ bookId, imageUrl, title, author, price, rating = 0 }) => {
//   const { addToCart } = useCart();

//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   const handleQuickAdd = () => {
//     addToCart({
//       id: bookId,
//       title,
//       price: price || 0, // Default to 0 if price is invalid
//       quantity: 1,
//     });
//   };

//   return (
//     <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
//       {/* Image with fallback */}
//       <img
//         src={imageUrl || '/placeholder.png'} // Fallback to placeholder image if imageUrl is missing
//         alt={`Cover of ${title}`}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-2 bg-accent-af_white">
//         <h3 className="text-sm font-bold mb-1">{title}</h3>
//         <p className="text-xs text-accent-moonstone mb-1">by {author}</p>
//         <p className="text-lg font-semibold mb-1">{price}</p>
        
//         <div className="flex items-center mb-2">
//           {[...Array(fullStars)].map((_, index) => (
//             <span key={index} className="text-yellow-500">★</span>
//           ))}
//           {hasHalfStar && (
//             <span className="text-yellow-500 relative">
//               ★
//               <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-gray-300">★</span>
//             </span>
//           )}
//           {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
//             <span key={index} className="text-gray-300">★</span>
//           ))}
//         </div>

//         <Button
//           onClick={handleQuickAdd}
//           label="Quick Add"
//           className="w-full mt-2"
//         />
//       </div>
//     </div>
//   );
// };

// export default BookCard;


// 'use client';

// import React from 'react';
// import { useCart } from './CartContext';

// interface BookCardProps {
//   bookId: string;
//   imageUrl?: string; // URL for the book cover image (optional)
//   title: string;     // Title of the book
//   author: string;    // Author of the book
//   price: number | null | undefined; // Allow null/undefined for safety
//   rating?: number;   // Rating of the book (optional, defaults to 0 if not provided)
// }

// const BookCard: React.FC<BookCardProps> = ({ bookId, imageUrl, title, author, price, rating = 0 }) => {
//   const { addToCart } = useCart();

//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   const handleQuickAdd = () => {
//     addToCart({
//       id: bookId,
//       title,
//       price: price || 0, // Default to 0 if price is invalid
//       quantity: 1,
//     });
//   };

//   return (
//     <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
//       {/* Image with fallback */}
//       <img
//         src={imageUrl || '/placeholder.png'} // Fallback to placeholder image if imageUrl is missing
//         alt={`Cover of ${title}`}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-2 bg-accent-af_white">
//         <h3 className="text-sm font-bold mb-1">{title}</h3>
//         <p className="text-xs text-accent-moonstone mb-1">by {author}</p>
//         <p className="text-lg font-semibold mb-1">{price}</p>
        
//         <div className="flex items-center mb-2">
//           {[...Array(fullStars)].map((_, index) => (
//             <span key={index} className="text-yellow-500">★</span>
//           ))}
//           {hasHalfStar && (
//             <span className="text-yellow-500 relative">
//               ★
//               <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-gray-300">★</span>
//             </span>
//           )}
//           {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
//             <span key={index} className="text-gray-300">★</span>
//           ))}
//         </div>

//         <button
//           onClick={handleQuickAdd}
//           className="
//             bg-accent-minBlue 
//             text-accent-af_white
//             text-sm 
//             font-semibold 
//             py-1 
//             px-4 
//             rounded 
//             hover:bg-accent-moonstone 
//             transition 
//             w-full 
//             mt-2
//           "
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;






// 'use client';

// import React from 'react';

// interface BookCardProps {
//   imageUrl: string; // URL for the book cover image
//   title: string;    // Title of the book
//   author: string;   // Author of the book
//   price: string;    // Price of the book
//   rating: number;   // Rating of the book (out of 5, allowing halves)
// }

// const BookCard: React.FC<BookCardProps> = ({ imageUrl, title, author, price, rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   const handleQuickAdd = () => {
//     alert(`Quick Add: "${title}" has been added to your cart!`);
//   };

//   return (
//     <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
//       <img src={imageUrl} alt={`Cover of ${title}`} className="w-full h-60 object-cover" />
//       <div className="p-2 bg-accent-af_white">
//         <h3 className="text-sm font-bold mb-1">{title}</h3>
//         <p className="text-xs text-accent-moonstone mb-1">by {author}</p>
//         <p className="text-lg font-semibold mb-1">{price}</p>
//         <div className="flex items-center mb-2">
//           {[...Array(fullStars)].map((_, index) => (
//             <span key={index} className="text-yellow-500">★</span>
//           ))}
//           {hasHalfStar && (
//             <span className="text-yellow-500 relative">
//               ★
//               <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-gray-300">★</span>
//             </span>
//           )}
//           {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
//             <span key={index} className="text-gray-300">★</span>
//           ))}
//         </div>

//         <button
//           onClick={handleQuickAdd}
//           className="
//             bg-accent-minBlue 
//             text-accent-af_white
//             text-sm 
//             font-semibold 
//             py-1 
//             px-4 
//             rounded 
//             hover:bg-accent-moonstone 
//             transition 
//             w-full 
//             mt-2
//           "
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;






// 'use client';

// import React from 'react';

// interface BookCardProps {
//   imageUrl: string; // URL for the book cover image
//   title: string;    // Title of the book
//   author: string;   // Author of the book
//   price: string;    // Price of the book
//   rating: number;   // Rating of the book (out of 5, allowing halves)
// }

// const BookCard: React.FC<BookCardProps> = ({ imageUrl, title, author, price, rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   const handleQuickAdd = () => {
//     alert(`Quick Add: "${title}" has been added to your cart!`);
//   };

//   return (
//     <div className="bg-accent-af_white shadow-md rounded-lg overflow-hidden w-48">
//       <img src={imageUrl} alt={`Cover of ${title}`} className="w-full h-60 object-cover" />
//       <div className="p-2 bg-accent-af_white">
//         <h3 className="text-sm font-bold mb-1">{title}</h3>
//         <p className="text-xs text-accent-moonstone mb-1">by {author}</p>
//         <p className="text-lg font-semibold mb-1">{price}</p>
//         <div className="flex items-center mb-2">
//           {[...Array(fullStars)].map((_, index) => (
//             <span key={index} className="text-yellow-500">★</span>
//           ))}
//           {hasHalfStar && (
//             <span className="text-yellow-500 relative">
//               ★
//               <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-gray-300">★</span>
//             </span>
//           )}
//           {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
//             <span key={index} className="text-gray-300">★</span>
//           ))}
//         </div>

//         <button
//           onClick={handleQuickAdd}
//           className="
//             bg-accent-minBlue 
//             text-accent-af_white
//             text-sm 
//             font-semibold 
//             py-1 
//             px-4 
//             rounded 
//             hover:bg-accent-moonstone 
//             transition 
//             w-full 
//             mt-2
//           "
//         >
//           Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;




