'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

const CheckOut: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({ address: '', phone_number: '' });
  const router = useRouter();

  const calculateTotal = (): number =>
    cartItems.reduce((total, item) => {
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);
      return total + itemPrice * itemQuantity;
    }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address || !/^\d+$/.test(formData.phone_number)) {
      alert('Please provide a valid address and phone number.');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: formData.address,
          phone_number: formData.phone_number,
          total: calculateTotal(),
          orderItems: cartItems.map((item) => ({
            book_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        router.push('/thank-you');
      } else {
        const error = await response.json();
        alert(`Failed to place the order: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting checkout:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <p className="text-lg font-medium">Total: ${calculateTotal().toFixed(2)}</p>

      <button
        type="submit"
        className="w-full bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue transition"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckOut;

