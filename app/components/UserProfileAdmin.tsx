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





// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const UserProfileAdmin: React.FC<{ userInitial: string }> = ({ userInitial }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear the stored data and redirect to login page
//     localStorage.removeItem('username');
//     localStorage.removeItem('user_type');
//     router.push('/auth');
//   };

//   useEffect(() => {
//     // Close the dropdown if user clicks outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen((prev) => !prev)}
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
//         aria-expanded={dropdownOpen}
//         aria-haspopup="true"
//         aria-controls="user-profile-dropdown"
//       >
//         {userInitial}
//       </button>

//       {dropdownOpen && (
//         <div
//           ref={dropdownRef}
//           id="user-profile-dropdown"
//           className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
//         >
//           <Link
//             href="/dashboard"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/account-settings"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Account Settings
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileAdmin;


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const UserProfileAdmin: React.FC<{ userInitial: string }> = ({ userInitial }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem('username'); // Clear specific localStorage item
//     router.push('/auth'); // Redirect to login page
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen((prev) => !prev)}  // Toggle dropdown state
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
//         aria-expanded={dropdownOpen}
//         aria-controls="user-profile-dropdown"
//       >
//         {userInitial}  {/* Display Admin Initial dynamically */}
//       </button>

//       {dropdownOpen && (
//         <div
//           id="user-profile-dropdown"
//           className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
//         >
//           <Link
//             href="/dashboard"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/account-settings"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Account Settings
//           </Link>
//           <button
//             onClick={handleLogout}  // Log out the user
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileAdmin;



