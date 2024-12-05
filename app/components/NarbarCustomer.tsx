'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { useCart } from './CartContext'; // Import CartContext
import LoginRegister from './Auth/LoginRegister';
import UserProfileCustomer from './UserProfileCustomer'; // Import UserProfileCustomer
import BookSearch from './BookSearch'; // Import the BookSearch component
import MiniCart from './MiniCart'; // Import MiniCart component

const NavbarCustomer: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false); // State for MiniCart visibility

  const { cartItems } = useCart(); // Get cart items from CartContext

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    if (storedUsername) {
      setUserInitial(storedUsername.charAt(0).toUpperCase()); // Set initial of the username
    }
  }, []);

  const toggleLoginRegisterModal = () => {
    setIsLoginRegisterOpen((prev) => !prev);
  };

  const toggleMiniCart = () => {
    setIsMiniCartOpen((prev) => !prev); // Toggle MiniCart visibility
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

  return (
    <>
      <nav className="bg-navbar text-white p-6 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold flex items-center space-x-2">
          <img src="/logo/soren_dk.png" alt="Logo" className="w-16 h-16" />
        </Link>

        {/* Search Bar Section */}
        <div className="flex items-center space-x-2">
          <BookSearch /> {/* Use the BookSearch component here */}
        </div>

        <div className="relative flex items-center space-x-4">
          {!username ? (
            <button onClick={toggleLoginRegisterModal} aria-label="Login or Register">
              <FaUser className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
            </button>
          ) : (
            <UserProfileCustomer userInitial={userInitial!} />
          )}

          {/* Shopping Cart */}
          <button
            onClick={toggleMiniCart}
            aria-label="Shopping Cart"
            className="relative"
          >
            <MdShoppingCart className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
              >
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Dropdown MiniCart */}
          {isMiniCartOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-72 z-50">
              <MiniCart />
            </div>
          )}
        </div>
      </nav>

      {/* Login/Register Modal */}
      {isLoginRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg min-w-min">
            <button
              onClick={toggleLoginRegisterModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <LoginRegister />
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarCustomer;


