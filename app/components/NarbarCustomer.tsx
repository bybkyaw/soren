'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import LoginRegister from './Auth/LoginRegister';
import UserProfileCustomer from './UserProfileCustomer';  // Import UserProfileCustomer

const NavbarCustomer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    if (storedUsername) {
      setUserInitial(storedUsername.charAt(0).toUpperCase());  // Set initial of the username
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleLoginRegisterModal = () => {
    setIsLoginRegisterOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-navbar text-white p-6 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold flex items-center space-x-2">
          <img src="/logo/soren_dk.png" alt="Logo" className="w-16 h-16" />
        </Link>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-80 px-2 py-1 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-accent-moonstone text-white px-4 py-2 rounded-md hover:bg-accent-moonstone-dark transition"
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {!username ? (
            <button onClick={toggleLoginRegisterModal} aria-label="Login or Register">
              <FaUser className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
            </button>
          ) : (
            <UserProfileCustomer userInitial={userInitial!} /> 
          )}

          <Link href="/cart" aria-label="Shopping Cart">
            <MdShoppingCart className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
          </Link>
        </div>
      </nav>

      {isLoginRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={toggleLoginRegisterModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <LoginRegister />
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarCustomer;


// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { MdShoppingCart } from 'react-icons/md';
// import { FaUser } from 'react-icons/fa';
// import LoginRegister from './Auth/LoginRegister';

// const NavbarCustomer: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState<string | null>(null);
//   const [userInitial, setUserInitial] = useState<string | null>(null);
//   const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     setUsername(storedUsername);
//     if (storedUsername) {
//       setUserInitial(storedUsername.charAt(0).toUpperCase());  // Set initial of the username
//     }
//   }, []);

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       console.log('Search query:', searchQuery);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const toggleLoginRegisterModal = () => {
//     setIsLoginRegisterOpen((prev) => !prev);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     localStorage.removeItem('user_type');
//     setUsername(null);
//     setUserInitial(null);
//     setDropdownOpen(false);
//   };

//   useEffect(() => {
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
//     <>
//       <nav className="bg-navbar text-white p-6 flex items-center justify-between">
//         <Link href="/" className="text-lg font-bold flex items-center space-x-2">
//           <img src="/logo/soren_dk.png" alt="Logo" className="w-16 h-16" />
//         </Link>

//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="w-80 px-2 py-1 border rounded-md"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-accent-moonstone text-white px-4 py-2 rounded-md hover:bg-accent-moonstone-dark transition"
//           >
//             Search
//           </button>
//         </div>

//         <div className="flex items-center space-x-4">
//           {!username ? (
//             <button onClick={toggleLoginRegisterModal} aria-label="Login or Register">
//               <FaUser className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
//             </button>
//           ) : (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={toggleDropdown}
//                 className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
//               >
//                 {userInitial}  {/* Show username initial */}
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Profile
//                   </Link>
//                   <Link
//                     href="/account-settings"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Account Settings
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           <Link href="/cart" aria-label="Shopping Cart">
//             <MdShoppingCart className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
//           </Link>
//         </div>
//       </nav>

//       {isLoginRegisterOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
//             <button onClick={toggleLoginRegisterModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavbarCustomer;







// Working code
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { MdShoppingCart } from 'react-icons/md';
// import { FaUser } from 'react-icons/fa';
// import UserProfileCustomer from './UserProfileCustomer';
// import LoginRegister from './Auth/LoginRegister';

// const NavbarCustomer: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState<string | null>(null);
//   const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     setUsername(storedUsername);
//   }, []);

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       console.log('Search query:', searchQuery);
//       // Implement search functionality here
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const toggleLoginRegisterModal = () => {
//     setIsLoginRegisterOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className="bg-navbar text-white p-6 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-lg font-bold flex items-center space-x-2">
//           <img src="/logo/soren_dk.png" alt="Logo" className='w-16 h-16' /> 
          
//         </Link>

//         {/* Search Bar */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="w-80 px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-moonstone"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-accent-moonstone text-white px-4 py-2 rounded-md hover:bg-accent-moonstone-dark transition"
//           >
//             Search
//           </button>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">
//           {!username ? (
//             <button onClick={toggleLoginRegisterModal} aria-label="Login or Register">
//               <FaUser className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" /> {/* Explicit color for visibility */}
//             </button>
//           ) : (
//             <UserProfileCustomer />
//           )}

//           <Link href="/cart" aria-label="Shopping Cart">
//             <MdShoppingCart className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
//           </Link>
//         </div>
//       </nav>

//       {/* Login/Register Modal */}
//       {isLoginRegisterOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               onClick={toggleLoginRegisterModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavbarCustomer;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { MdShoppingCart } from 'react-icons/md';
// import { FaUser } from 'react-icons/fa';
// import UserProfileCustomer from './UserProfileCustomer';
// import LoginRegister from './Auth/LoginRegister';

// const NavbarCustomer: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState<string | null>(null);
//   const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     setUsername(storedUsername);
//   }, []);

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       console.log('Search query:', searchQuery);
//       // Implement search functionality here
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const toggleLoginRegisterModal = () => {
//     setIsLoginRegisterOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className="bg-navbar text-white p-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-lg font-bold flex items-center space-x-2">
//           <img src="/soren_dk.png" alt="Logo" className="h-auto w-auto" />
//           <span>BookStore</span>
//         </Link>

//         {/* Search Bar */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="w-80 px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-moonstone"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-accent-moonstone text-white px-4 py-2 rounded-md hover:bg-accent-moonstone-dark transition"
//           >
//             Search
//           </button>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">
//           {!username ? (
//             <button onClick={toggleLoginRegisterModal} aria-label="Login or Register">
//               <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//             </button>
//           ) : (
//             <UserProfileCustomer />
//           )}

//           <Link href="/cart" aria-label="Shopping Cart">
//             <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//           </Link>
//         </div>
//       </nav>

//       {/* Login/Register Modal */}
//       {isLoginRegisterOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
//             <button
//               onClick={toggleLoginRegisterModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavbarCustomer;




// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { MdShoppingCart } from 'react-icons/md';
// import { IoHomeOutline } from 'react-icons/io5';
// import { FaUser } from 'react-icons/fa';
// import UserProfileIcon from '../components/UserProfileIcon';
// import MiniCart from '../components/MiniCart';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import LoginRegister from './Auth/LoginRegister';

// const Navbar = () => {
//   const [isModalOpen, setModalOpen] = useState(false); // For Login/Register Modal
//   const [isCartOpen, setCartOpen] = useState(false); // For Mini Cart
//   const [cartItems, setCartItems] = useState([]); // Cart items (replace with your cart data logic)
//   const [username, setUsername] = useState<string | null>(null); // Logged-in username
//   const [role, setRole] = useState<'Admin' | 'Customer'>('Customer'); // User role (Admin or Customer)

//   // Load user and role from local storage on mount
//   useEffect(() => {
//     const savedUsername = localStorage.getItem('username');
//     const savedRole = localStorage.getItem('user_role') || 'Customer'; // Default to Customer if not set

//     if (savedUsername) {
//       setUsername(savedUsername);
//       setRole(savedRole === 'Admin' ? 'Admin' : 'Customer'); // Ensure valid role
//     }

//     // Load cart data (from localStorage or API)
//     const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     setCartItems(initialCart);
//   }, []);

//   // Logout logic
//   const handleLogout = async () => {
//     try {
//       // Call backend logout endpoint
//       await fetch('/api/logout', { method: 'POST', credentials: 'include' });
//       setUsername(null); // Clear username
//       localStorage.removeItem('username'); // Clear username from local storage
//       localStorage.removeItem('user_role'); // Clear role from local storage

//       // Show logout confirmation
//       Swal.fire({
//         title: 'You are logged out',
//         text: 'Hope to see you again soon!',
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//       Swal.fire({
//         title: 'Error',
//         text: 'An error occurred while logging out. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   // Toggle Mini Cart visibility
//   const handleCartToggle = () => setCartOpen((prev) => !prev);

//   return (
//     <nav className="bg-accent-oxford_blue text-accent-minBlue p-7 flex items-center justify-between relative">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4">
//         <Link
//           href="/"
//           aria-label="Home"
//           className="text-lg hover:text-accent-black_olive transition-colors duration-300 flex items-center space-x-1"
//         >
//           <IoHomeOutline className="h-6 w-6" aria-hidden="true" />
//           <span>Love is ... when .. </span>
//         </Link>
//       </div>

//       {/* Logo Section */}
//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <Image
//           src="/logo/soren_dk.png"
//           alt="Book Store Logo"
//           width={100}
//           height={100}
//           className="object-contain"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="hidden md:flex items-center space-x-4">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="w-80 px-2 py-1 border rounded-md border-navbar focus:outline-none focus:ring-2 focus:ring-accent-moonstone"
//           aria-label="Search books"
//         />

//         {/* User Profile or Login/Register */}
//         {username ? (
//           <UserProfileIcon username={username} role={role} onLogout={handleLogout} />
//         ) : (
//           <button
//             onClick={() => setModalOpen(true)}
//             aria-label="Open Login/Register Modal"
//           >
//             <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//           </button>
//         )}

//         {/* Cart Icon */}
//         <button onClick={handleCartToggle} aria-label="Open Mini Cart">
//           <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div className="flex md:hidden items-center space-x-4">
//         <button onClick={handleCartToggle} aria-label="Open Mini Cart">
//           <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//         </button>
//         <button onClick={() => setModalOpen(true)} aria-label="Login/Register">
//           <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//         </button>
//       </div>

//       {/* Mini Cart */}
//       {isCartOpen && (
//         <MiniCart cartItems={cartItems} onClose={() => setCartOpen(false)} />
//       )}

//       {/* Modal for Login/Register */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 modal-enter-active"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="bg-white p-4 rounded shadow-lg relative animate-modal">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-2 right-2 text-lg"
//               aria-label="Close Login/Register Modal"
//               tabIndex={0}
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { MdShoppingCart } from 'react-icons/md';
// import { IoHomeOutline } from 'react-icons/io5';
// import { FaUser } from 'react-icons/fa';
// import UserProfileIcon from '../components/UserProfileIcon';
// import MiniCart from '../components/MiniCart';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import LoginRegister from './Auth/LoginRegister';

// const Navbar = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     const savedUsername = localStorage.getItem('username');
//     if (savedUsername) {
//       setUsername(savedUsername);
//     }

//     // Load initial cart data (this could come from localStorage, an API, etc.)
//     const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     setCartItems(initialCart);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('/api/logout', { method: 'POST', credentials: 'include' });
//       setUsername(null);
//       localStorage.removeItem('username');

//       Swal.fire({
//         title: 'You are logged out',
//         text: 'Hope to see you again soon!',
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//       Swal.fire({
//         title: 'Error',
//         text: 'An error occurred while logging out. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <nav className="bg-navbar text-accent-minBlue p-9 flex items-center justify-between relative">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4">
//         <Link
//           href="/"
//           aria-label="Home"
//           className="text-lg hover:text-accent-black_olive transition-colors duration-300 flex items-center space-x-1"
//         >
//           <IoHomeOutline className="h-6 w-6" />
//           <span>Love is ... when .. </span>
//         </Link>
//       </div>

//       {/* Logo Section */}
//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <Image
//           src="/logo/soren_dk.png"
//           alt="Book Store Logo"
//           width={100}
//           height={100}
//           className="object-contain"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="w-80 px-2 py-1 border rounded-md border-navbar focus:outline-none focus:ring-2 focus:ring-accent-moonstone"
//           aria-label="Search books"
//         />

//         {/* User Profile or Login/Register */}
//         {username ? (
//           <UserProfileIcon username={username} onLogout={handleLogout} />
//         ) : (
//           <button
//             onClick={() => setModalOpen(true)}
//             aria-label="Open Login/Register Modal"
//           >
//             <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//           </button>
//         )}

//         {/* Cart Icon */}
//         <button
//           onClick={() => setCartOpen((prev) => !prev)}
//           aria-label="Open Mini Cart"
//         >
//           <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//         </button>
//       </div>

//       {/* Mini Cart */}
//       {isCartOpen && (
//         <MiniCart cartItems={cartItems} onClose={() => setCartOpen(false)} />
//       )}

//       {/* Modal for Login/Register */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="bg-white p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-2 right-2 text-lg"
//               aria-label="Close Login/Register Modal"
//               tabIndex={0}
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { MdShoppingCart } from 'react-icons/md';
// import { IoHomeOutline } from 'react-icons/io5';
// import { FaUser } from 'react-icons/fa';
// import UserProfileIcon from '../components/UserProfileIcon';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import LoginRegister from './Auth/LoginRegister';

// const Navbar = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const savedUsername = localStorage.getItem('username');
//     if (savedUsername) {
//       setUsername(savedUsername);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('/api/logout', { method: 'POST', credentials: 'include' });
//       setUsername(null);
//       localStorage.removeItem('username');

//       Swal.fire({
//         title: 'You are logged out',
//         text: 'Hope to see you again soon!',
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//       Swal.fire({
//         title: 'Error',
//         text: 'An error occurred while logging out. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       console.log(`Searching for: ${searchQuery}`);
//       // Implement search logic, e.g., navigating to a search results page
//     }
//   };

//   return (
//     <nav className="bg-navbar text-accent-minBlue p-9 flex items-center justify-between relative">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4">
//         <Link
//           href="/"
//           aria-label="Home"
//           className="text-lg hover:text-accent-black_olive transition-colors duration-300 flex items-center space-x-1"
//         >
//           <IoHomeOutline className="h-6 w-6" />
//           <span>Love is ... when .. </span>
//         </Link>
//       </div>

//       {/* Logo Section */}
//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <Image
//           src="/logo/soren_dk.png"
//           alt="Book Store Logo"
//           width={100}
//           height={100}
//           className="object-contain"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         {/* Search Bar */}
//         <div className="flex items-center">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-80 px-2 py-1 border rounded-md border-navbar focus:outline-none focus:ring-2 focus:ring-accent-moonstone"
//             aria-label="Search books"
//           />
//           <button
//             onClick={handleSearch}
//             className="ml-2 px-3 py-1 text-sm bg-accent-moonstone text-white rounded hover:bg-accent-minBlue"
//           >
//             Search
//           </button>
//         </div>

//         {/* User Profile or Login/Register */}
//         {username ? (
//           <UserProfileIcon username={username} onLogout={handleLogout} />
//         ) : (
//           <button
//             onClick={() => setModalOpen(true)}
//             aria-label="Open Login/Register Modal"
//           >
//             <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//           </button>
//         )}

//         {/* Cart Icon */}
//         <Link href="/cart" aria-label="Cart">
//           <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//         </Link>
//       </div>

//       {/* Modal for Login/Register */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="bg-white p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-2 right-2 text-lg"
//               aria-label="Close Login/Register Modal"
//               tabIndex={0}
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { MdShoppingCart } from 'react-icons/md';
// import { IoHomeOutline } from 'react-icons/io5';
// import { FaUser } from 'react-icons/fa';
// import UserProfileIcon from '../components/UserProfileIcon';
// import Swal from 'sweetalert2'; 
// import 'sweetalert2/dist/sweetalert2.min.css'; 
// import LoginRegister from './Auth/LoginRegister';

// const Navbar = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     const savedUsername = localStorage.getItem('username');
//     if (savedUsername) {
//       setUsername(savedUsername);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('/api/logout', { method: 'POST', credentials: 'include' });
//       setUsername(null);
//       localStorage.removeItem('username');

//       Swal.fire({
//         title: 'You are logged out',
//         text: 'Hope to see you again soon!',
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//       Swal.fire({
//         title: 'Error',
//         text: 'An error occurred while logging out. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <nav className="bg-navbar text-accent-minBlue p-9 flex items-center justify-between">
//       <div className="flex items-center space-x-4">
//         <Link href="/" aria-label="Home" className="text-lg hover:text-accent-black_olive transition-colors duration-300 flex items-center space-x-1">
//           <IoHomeOutline className="h-6 w-6" />
//           <span>Love is ... when .. </span>
//         </Link>
//       </div>

//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <Image src= "/logo/soren_dk.png" alt="Book Store Logo" width={100} height={100} className="object-contain" />
//       </div>

//       <div className="flex items-center space-x-4">
//         <input 
//           type="text" 
//           placeholder="Search books..." 
//           className="w-80 px-2 py-1 border rounded-md border-navbar focus:outline-none focus:ring-2 focus:ring-accent-moonstone" 
//           aria-label="Search books" 
//         />

//         {username ? (
//           <UserProfileIcon username={username} onLogout={handleLogout} />
//         ) : (
//           <button onClick={() => setModalOpen(true)} aria-label="Open Login/Register Modal">
//             <FaUser className="h-6 w-6 hover:text-accent-moonstone" />
//           </button>
//         )}

//         <Link href="/cart" aria-label="Cart">
//           <MdShoppingCart className="h-6 w-6 hover:text-accent-moonstone" />
//         </Link>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
//           <div className="bg-white p-4 rounded shadow-lg relative">
//             <button 
//               onClick={() => setModalOpen(false)} 
//               className="absolute top-2 right-2 text-lg" 
//               aria-label="Close Login/Register Modal" 
//               tabIndex={0}
//             >
//               &times;
//             </button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




