'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa'; 
import UserProfileAdmin from './UserProfileAdmin';

const NavbarAdmin: React.FC = () => {
  const [userInitial, setUserInitial] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUserInitial(username.charAt(0).toUpperCase()); // Set the first letter of the username
    }
  }, []);

  return (
    <nav className="bg-navbar text-white p-4 flex items-center justify-between">

{/* Logo */}
      <Link href="/dashboard" className="text-lg font-bold flex items-center space-x-2">
        <img src="/soren_dk.png" alt="Logo" className="h-8 w-8" />
        <span>Admin Panel</span>
      </Link>

{/* Right Section: Admin User Profile */}
      <div>
        {userInitial ? (
          <UserProfileAdmin userInitial={userInitial} />
        ) : (
          <FaUser className="text-accent-af_white" /> // Display FaUser icon if username is not available
        )}
      </div>
    </nav>
  );
};

export default NavbarAdmin;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import UserProfileAdmin from './UserProfileAdmin';

// const NavbarAdmin: React.FC = () => {
//   const [username, setUsername] = useState<string | null>(null);
//   const [userInitial, setUserInitial] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     setUsername(storedUsername);
//     if (storedUsername) {
//       setUserInitial(storedUsername.charAt(0).toUpperCase());  // Set initial of the username
//     }
//   }, []);

//   return (
//     <nav className="bg-navbar text-white p-4 flex items-center justify-between">
//       <Link href="/dashboard" className="text-lg font-bold flex items-center space-x-2">
//         <img src="/soren_dk.png" alt="Logo" className="h-8 w-8" />
//         <span>Admin Panel</span>
//       </Link>

//       <div>
//         {/* Check if username exists and pass the initial dynamically */}
//         {!username ? (
//           <UserProfileAdmin userInitial="A" />  
//         ) : (
//           <UserProfileAdmin userInitial={userInitial!} />  
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavbarAdmin;




// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import UserProfileAdmin from './UserProfileAdmin';

// const NavbarAdmin: React.FC = () => {
//   return (
//     <nav className="bg-navbar text-white p-4 flex items-center justify-between">
//       <Link href="/dashboard" className="text-lg font-bold flex items-center space-x-2">
//         <img src="/soren_dk.png" alt="Logo" className="h-8 w-8" />
//         <span>Admin Panel</span>
//       </Link>

//       <div>
//         <UserProfileAdmin />  {/* Display Admin Profile */}
//       </div>
//     </nav>
//   );
// };

// export default NavbarAdmin;



// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import UserProfileAdmin from './UserProfileAdmin';

// const NavbarAdmin: React.FC = () => {
//   return (
//     <nav className="bg-navbar text-white p-4 flex items-center justify-between">
//       {/* Logo */}
//       <Link href="/dashboard" className="text-lg font-bold flex items-center space-x-2">
//         <img src="/soren_dk.png" alt="Logo" className="h-8 w-8" />
//         <span>Admin Panel</span>
//       </Link>

//       {/* Right Section: Admin User Profile */}
//       <div>
//         <UserProfileAdmin />
//       </div>
//     </nav>
//   );
// };

// export default NavbarAdmin;

