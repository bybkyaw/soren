'use client';

import React from 'react';
import { useCart } from './CartContext';

const MiniCart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Ensure price and quantity are treated as numbers
  const calculateTotal = (): number =>
    cartItems.reduce((total, item) => {
      const itemPrice = Number(item.price); // Ensure price is a number
      const itemQuantity = Number(item.quantity); // Ensure quantity is a number
      return total + itemPrice * itemQuantity;
    }, 0);

  const handleCheckout = () => {
    alert('Proceeding to Checkout');
    clearCart(); // Clear cart after checkout
  };

  return (
    <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 w-72 z-50">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-accent-raisin_black">{item.title}</p>
                <p className="text-sm text-accent-raisin_black">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-700">
                  ${Number(item.price).toFixed(2)} {/* Ensure price is formatted */}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 flex justify-between">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCart;


// // 'use client';

// // import React from 'react';
// // import { useCart } from './CartContext';

// // const MiniCart: React.FC = () => {
// //   const { cartItems, removeFromCart} = useCart();

// //   const calculateTotal = (): number =>
// //     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

// //   const formatPrice = (price: number) =>
// //     new Intl.NumberFormat('en-US', {
// //       style: 'currency',
// //       currency: 'USD',
// //     }).format(price);

// //   return (
// //     <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 w-72 z-50">
// //       <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h3>
// //       {cartItems.length === 0 ? (
// //         <p className="text-gray-500">Cart is empty.</p>
// //       ) : (
// //         <ul className="space-y-4">
// //           {cartItems.map((item) => (
// //             <li key={item.id} className="flex justify-between items-center">
// //               <div>
// //                 <p className="text-sm font-semibold text-gray-700">{item.title}</p>
// //                 <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
// //               </div>
// //               <div className="flex items-center">
// //                 <span className="text-sm font-semibold text-gray-700">{formatPrice(item.price)}</span>
// //                 <button
// //                   onClick={() => removeFromCart(item.id)}
// //                   className="ml-4 text-red-500 hover:text-red-700 text-xs"
// //                 >
// //                   Remove
// //                 </button>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       )}

// //       {cartItems.length > 0 && (
// //         <div className="mt-4 border-t pt-4">
// //           <p className="text-sm font-semibold text-gray-700 flex justify-between">
// //             <span>Total:</span>
// //             <span>{formatPrice(calculateTotal())}</span>
// //           </p>
// //           <button
// //             onClick={() => alert('Proceeding to checkout')}
// //             className="mt-4 w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue"
// //           >
// //             Checkout
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MiniCart;



// 'use client';

// import React from 'react';
// import { useCart } from './CartContext';

// const MiniCart: React.FC = () => {
//   const { cartItems, removeFromCart, clearCart } = useCart();

//   // Add explicit types for total and item
//   const calculateTotal = (): number =>
//     cartItems.reduce((total: number, item: { price: number; quantity: number }) => {
//       return total + item.price * item.quantity;
//     }, 0);

//   const handleCheckout = () => {
//     alert('Proceeding to Checkout');
//     clearCart(); // Clear cart after checkout
//   };

//   return (
//     <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 w-72 z-50">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h3>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Cart is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {cartItems.map((item) => (
//             <li key={item.id} className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-semibold text-accent-raisin_black">{item.title}</p>

//                 <p className="text-sm text-accent-raisin_black">Quantity: {item.quantity}</p>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-sm font-semibold text-gray-700">
//                   {item.price}
//                 </span>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="ml-4 text-red-500 hover:text-red-700 text-xs"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-4 border-t pt-4">
//           <p className="text-sm font-semibold text-gray-700 flex justify-between">
//             <span>Total:</span>
//             <span>${calculateTotal().toFixed(2)}</span>
//           </p>
//           <button
//             onClick={handleCheckout}
//             className="mt-4 w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue"
//           >
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MiniCart;



// 'use client';

// import React from 'react';

// interface CartItem {
//   id: string;
//   title: string;
//   quantity: number;
//   price: number;
// }

// interface MiniCartProps {
//   cartItems: CartItem[];
//   onClose: () => void;
// }

// const MiniCart: React.FC<MiniCartProps> = ({ cartItems, onClose }) => {
//   const calculateTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 w-72 z-50">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-lg text-gray-500 hover:text-red-500"
//         aria-label="Close Mini Cart"
//       >
//         &times;
//       </button>
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h3>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Cart is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {cartItems.map((item) => (
//             <li key={item.id} className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-semibold text-gray-700">{item.title}</p>
//                 <p className="text-sm text-gray-500">
//                   Quantity: {item.quantity}
//                 </p>
//               </div>
//               <div className="text-sm font-semibold text-gray-700">
//                 ${item.price.toFixed(2)}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-4 border-t pt-4">
//           <p className="text-sm font-semibold text-gray-700 flex justify-between">
//             <span>Total:</span>
//             <span>${calculateTotal().toFixed(2)}</span>
//           </p>
//           <button className="mt-4 w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue">
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MiniCart;
