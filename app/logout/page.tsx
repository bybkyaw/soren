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


