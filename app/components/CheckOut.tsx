'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

const TAX_RATE = 0.1; // 10% tax rate

type AddressInfo = {
  name: string;
  address: string;
  email: string;
  phone_number: string;
};

type PaymentInfo = {
  card_number: string;
  expiry_date: string;
  cvv: string;
};

const CheckOut: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<AddressInfo>({
    name: '',
    address: '',
    email: '',
    phone_number: '',
  });
  const [billingInfo, setBillingInfo] = useState<AddressInfo>({
    name: '',
    address: '',
    email: '',
    phone_number: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    card_number: '',
    expiry_date: '',
    cvv: '',
  });
  const router = useRouter();

  const calculateSubtotal = (): number =>
    cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

  const calculateTax = (): number => calculateSubtotal() * TAX_RATE;

  const calculateTotal = (): number => calculateSubtotal() + calculateTax();

  const handleInputChange = <
   // T extends keyof AddressInfo | keyof PaymentInfo,
    F extends 'shipping' | 'billing' | 'payment'
  >(
    e: React.ChangeEvent<HTMLInputElement>,
    formType: F
  ) => {
    const { name, value } = e.target;
    if (formType === 'shipping') {
      setShippingInfo((prev) => ({ ...prev, [name as keyof AddressInfo]: value }));
    } else if (formType === 'billing') {
      setBillingInfo((prev) => ({ ...prev, [name as keyof AddressInfo]: value }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name as keyof PaymentInfo]: value }));
    }
  };

  const handleCheckboxChange = () => {
    setUseSameAddress(!useSameAddress);
    if (!useSameAddress) {
      setBillingInfo(shippingInfo); // Copy shipping info to billing info
    }
  };

  const validatePaymentInfo = (): boolean => {
    const { card_number, expiry_date, cvv } = paymentInfo;

    if (!/^\d{16}$/.test(card_number)) {
      alert('Please enter a valid 16-digit card number.');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry_date)) {
      alert('Please enter a valid expiry date in MM/YY format.');
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredShippingFields = ['name', 'address', 'email', 'phone_number'] as const;
    const missingShippingFields = requiredShippingFields.filter(
      (field) => !shippingInfo[field as keyof AddressInfo]
    );

    if (missingShippingFields.length > 0) {
      alert('Please fill in all required shipping fields.');
      return;
    }

    if (!validatePaymentInfo()) {
      return;
    }

    clearCart();
    router.push('/thank-you');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Shipping Information */}
      <h3 className="text-lg font-semibold">Shipping Information</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={shippingInfo.name}
          onChange={(e) => handleInputChange(e, 'shipping')}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingInfo.address}
          onChange={(e) => handleInputChange(e, 'shipping')}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={shippingInfo.email}
          onChange={(e) => handleInputChange(e, 'shipping')}
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
          value={shippingInfo.phone_number}
          onChange={(e) => handleInputChange(e, 'shipping')}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Payment Information */}
      <h3 className="text-lg font-semibold mt-6">Payment Information</h3>
      <div>
        <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="card_number"
          name="card_number"
          value={paymentInfo.card_number}
          onChange={(e) => handleInputChange(e, 'payment')}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
            Expiry Date (MM/YY)
          </label>
          <input
            type="text"
            id="expiry_date"
            name="expiry_date"
            value={paymentInfo.expiry_date}
            onChange={(e) => handleInputChange(e, 'payment')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={(e) => handleInputChange(e, 'payment')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {/* Billing Information */}
      <h3 className="text-lg font-semibold mt-6">Billing Information</h3>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="same_as_shipping"
          checked={useSameAddress}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="same_as_shipping" className="text-sm font-medium text-gray-700">
          Billing address is the same as shipping address
        </label>
      </div>
      {!useSameAddress && (
        <>
          <div>
            <label htmlFor="billing_name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="billing_name"
              name="name"
              value={billingInfo.name}
              onChange={(e) => handleInputChange(e, 'billing')}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="billing_address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="billing_address"
              name="address"
              value={billingInfo.address}
              onChange={(e) => handleInputChange(e, 'billing')}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </>
      )}

      {/* Order Summary */}
      <h3 className="text-lg font-semibold mt-6">Order Summary</h3>
      <p className="text-sm">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
      <p className="text-sm">Tax: ${calculateTax().toFixed(2)}</p>
      <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>

      {/* Place Order */}
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


