// components/NavbarCustomer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import LoginRegister from './Auth/LoginRegister';
import UserProfileCustomer from './UserProfileCustomer';  // Import UserProfileCustomer
import BookSearch from './BookSearch';  // Import the BookSearch component

const NavbarCustomer: React.FC = () => {
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

  const toggleLoginRegisterModal = () => {
    setIsLoginRegisterOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-navbar text-white p-6 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold flex items-center space-x-2">
          <img src="/logo/soren_dk.png" alt="Logo" className="w-16 h-16" />
        </Link>

        {/* Search Bar Section */}
        <div className="flex items-center space-x-2">
          <BookSearch />  {/* Use the BookSearch component here */}
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


// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { MdShoppingCart } from 'react-icons/md';
// import { FaUser } from 'react-icons/fa';
// import LoginRegister from './Auth/LoginRegister';
// import UserProfileCustomer from './UserProfileCustomer';  // Import UserProfileCustomer

// const NavbarCustomer: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState<string | null>(null);
//   const [userInitial, setUserInitial] = useState<string | null>(null);
//   const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);

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
//             <UserProfileCustomer userInitial={userInitial!} /> 
//           )}

//           <Link href="/cart" aria-label="Shopping Cart">
//             <MdShoppingCart className="h-6 w-6 text-accent-minBlue hover:text-accent-moonstone" />
//           </Link>
//         </div>
//       </nav>

//       {isLoginRegisterOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg min-w-min">
//             <button onClick={toggleLoginRegisterModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
//             <LoginRegister />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavbarCustomer;


