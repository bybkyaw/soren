'use client';

import React from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

const MiniCart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  // Don't render the MiniCart if there are no items
  if (cartItems.length === 0) {
    return null;
  }

  const calculateTotal = (): number =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
                  ${(item.price * item.quantity).toFixed(2)}
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
            onClick={() => router.push('/checkout')}
            className="mt-4 w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCart;


