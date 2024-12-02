// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// type UserProfileIconProps = {
//   username: string;
//   role: 'Admin' | 'Customer'; // Add the role property here
//   onLogout: () => void;
// };

// const UserProfileIcon: React.FC<UserProfileIconProps> = ({ username, role, onLogout }) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const initial = username.charAt(0).toUpperCase();

//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);

//   useEffect(() => {
//     const handleOutsideClick = (e: MouseEvent) => {
//       if ((e.target as HTMLElement).closest('.user-profile-dropdown')) return;
//       setDropdownOpen(false);
//     };

//     if (isDropdownOpen) {
//       document.addEventListener('click', handleOutsideClick);
//     } else {
//       document.removeEventListener('click', handleOutsideClick);
//     }

//     return () => document.removeEventListener('click', handleOutsideClick);
//   }, [isDropdownOpen]);

//   const handleLogout = () => {
//     onLogout();
//     router.push('/'); // Redirect to the Home page
//   };

//   return (
//     <div className="relative">
//       {/* User Profile Icon */}
//       <button
//         className="h-8 w-8 rounded-full bg-accent-moonstone flex items-center justify-center text-white font-bold focus:outline-none"
//         onClick={toggleDropdown}
//         aria-expanded={isDropdownOpen}
//         aria-haspopup="menu"
//         aria-label="User menu"
//       >
//         {initial}
//       </button>

//       {/* Dropdown Menu */}
//       {isDropdownOpen && (
//         <div
//           className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 user-profile-dropdown z-50"
//           role="menu"
//           aria-label="User actions menu"
//         >
//           {/* {role === 'Admin' && (
//             <Link
//               href="/dashboard"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               role="menuitem"
//               onClick={() => setDropdownOpen(false)}
//             >
//               Dashboard
//             </Link>
//           )} */}
           
//             <Link
//               href="/dashboard"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               role="menuitem"
//               onClick={() => setDropdownOpen(false)}
//             >
//               Dashboard
//             </Link>
          
//           <Link
//             href="/settings"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             role="menuitem"
//             onClick={() => setDropdownOpen(false)}
//           >
//             Settings
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             role="menuitem"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileIcon;






// // 'use client';

// // import React from 'react';

// // type UserProfileIconProps = {
// //   username: string;
// //   onLogout: () => void;
// // };

// // const UserProfileIcon: React.FC<UserProfileIconProps> = ({ username, onLogout }) => {
// //   const handleLogout = () => {
// //     onLogout(); // Call the passed logout function
// //     window.location.href = './'; // Redirect to the Home page
// //   };

// //   const initial = username.charAt(0).toUpperCase();

// //   return (
// //     <div className="flex items-center">
// //       <div className="h-6 w-6 rounded-full bg-accent-moonstone flex items-center justify-center text-white">
// //         {initial}
// //       </div>
// //       <button onClick={handleLogout} className="ml-2 text-sm">
// //         Logout
// //       </button>
// //     </div>
// //   );
// // };

// // export default UserProfileIcon;



