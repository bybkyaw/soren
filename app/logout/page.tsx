'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  // Function to handle redirection to the home page and refresh
  const handleHomePageRedirect = () => {
    router.push('/');  // Navigate to the home page

    // Use setTimeout to add a small delay before reloading the page
    setTimeout(() => {
      window.location.reload(); // Refresh the page after navigation
    }, 100);  // Delay by 100ms to allow navigation to happen first
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-accent-raisin_black">
      <div className="bg-accent-oxford_blue p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-accent-af_white mb-4">
          You are successfully logged out
        </h1>
        <p className="text-accent-af_white mb-4">
          Thank you for expanding wisdom with Soren! Please click the link below to go back to the Home page.
        </p>
        <button
          onClick={handleHomePageRedirect}  // Navigate to home and reload with delay
          className="text-accent-moonstone hover:text-accent-minBlue font-semibold"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;


// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';


// const LogoutPage: React.FC = () => {
//   const router = useRouter();

//   // Function to handle redirection to the home page
//   const handleHomePageRedirect = () => {
//     router.push('/');  // Navigate to the home page
//   };

//   // Reload the page manually
//   const refreshPage = () => {
//     window.location.reload();
//   };

//   // Handle the onClick event to trigger both functions
//   const handleClick = () => {
//     handleHomePageRedirect();  // Navigate to the home page
//     refreshPage();             // Refresh the page
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-accent-raisin_black">
//       <div className="bg-accent-oxford_blue p-6 rounded-lg shadow-lg text-center">
//         <h1 className="text-2xl font-semibold text-accent-af_white mb-4">
//           You are successfully logged out
//         </h1>
//         <p className="text-accent-af_white mb-4">
//           Thank you for expanding wisdom with Soren! Please click the link below to go back to the Home page.
//         </p>
//         <button
//           onClick={handleClick}  // Use the custom handler for redirection and refresh
//           className="text-accent-moonstone hover:text-accent-minBlue font-semibold"
//         >
//           Go to Home Page
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LogoutPage;


// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';

// const LogoutPage: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname(); // This will give you the current path.

//   // Function to handle redirection to the home page and page refresh
//   const handleHomePageRedirect = () => {
//     router.push('/');  // Navigate to the home page
//   };

//   // Reload the page after the navigation completes
//   useEffect(() => {
//     if (pathname === '/') {
//       window.location.reload();  // Refresh the page after navigating
//     }
//   }, [pathname]); // This effect triggers when the pathname changes

//   const refreshPage = () => {
//     window.location.reload()
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-accent-raisin_black">
//       <div className="bg-accent-oxford_blue p-6 rounded-lg shadow-lg text-center">
//         <h1 className="text-2xl font-semibold text-accent-af_white mb-4">
//           You are successfully logged out
//         </h1>
//         <p className="text-accent-af_white mb-4">
//           Thank you for expanding wisdom with Soren! Please click the link below to go back to the Home page.
//         </p>
//         <button
//           onClick={handleHomePageRedirect {refreshPage}  // Use the custom handler for redirection
//           className="text-accent-moonstone hover:text-accent-minBlue font-semibold"
//         >
//           Go to Home Page
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LogoutPage;






// 'use client';

// import React from 'react';
// import Link from 'next/link';

// const LogoutPage: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-accent-raisin_black">
//       <div className="bg-accent-oxford_blue p-6 rounded-lg shadow-lg text-center">
//         <h1 className="text-2xl font-semibold text-accent-af_white mb-4">
//           You are successfully logged out
//         </h1>
//         <p className="text-accent-af_white mb-4">
//           Thank you for expanding wisdom with Soren! Please click the link below to go back to the Home page.
//         </p>
//         <Link
//           href="/"
//           className="text-accent-moonstone hover:text-accent-minBlue font-semibold"
//         >
//           Go to Home Page
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LogoutPage;
