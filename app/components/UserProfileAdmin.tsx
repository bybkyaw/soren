'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


const UserProfileAdmin: React.FC<{ userInitial: string }> = ({ userInitial }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    // Clear session data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('user_type');

    // Redirect to the login page
    router.push('/logout');
  };

  useEffect(() => {
    // Close the dropdown if the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setDropdownOpen(true);  // Show dropdown on hover
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);  // Hide dropdown when hover leaves
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}  // Show dropdown on hover
      onMouseLeave={handleMouseLeave}  // Hide dropdown when hover leaves
    >
      {/* Profile icon with hover to show dropdown */}
      <button
        className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-controls="user-profile-dropdown"
      >
        {userInitial}
      </button>

      {/* Logout button next to the profile icon */}
      {dropdownOpen && (
        
        <button
          onClick={handleLogout}
          className="ml-4 h-8 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      )}

      {/* Dropdown menu */}
      
    </div>
  );
};

export default UserProfileAdmin;





