'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserProfile: React.FC<{ userInitial: string }> = ({ userInitial }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user type from localStorage
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    router.push('/logout'); // Redirect to the logout confirmation page
  };

  const handleDashboard = () => {
    router.push('/dashboard'); // Redirect to the dashboard
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown state
        className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
      >
        {userInitial}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
          {userType === 'ADMIN' && (
            <button
              onClick={handleDashboard} // Redirect to dashboard
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={handleLogout} // Logout and redirect to logout page
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;


// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const UserProfileCustomer: React.FC<{ userInitial: string }> = ({ userInitial }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();  // Clear all localStorage data
//     router.push('/logout');  // Redirect to the logout confirmation page
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen((prev) => !prev)}  // Toggle dropdown state
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
//       >
//         {userInitial}  
//       </button>

//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
//           <button
//             onClick={handleLogout}  // Logout and redirect to logout page
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileCustomer;



// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Setting_Customer from './Setting_Customer';

// const UserProfileCustomer: React.FC<{ userInitial: string }> = ({ userInitial }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push('/auth');  // Redirect to login page after logout
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen((prev) => !prev)}  // Toggle dropdown state
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold"
//       >
//         {userInitial}  {/* Display Customer Initial */}
//       </button>

//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
//           <Link
//             href="/Setting_Customer"
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

// export default UserProfileCustomer;




// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const UserProfileCustomer: React.FC = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push('/auth');
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen((prev) => !prev)}
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold focus:outline-none"
//       >
//         C
//       </button>

//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
//           <Link
//             href="/settings"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Settings
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

// export default UserProfileCustomer;
