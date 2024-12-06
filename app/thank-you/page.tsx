// /app/thank-you/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ThankYou: React.FC = () => {
  const router = useRouter();

  return (
    <div className="thank-you-page min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-accent-moonstone mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your order has been placed successfully. You will receive an email confirmation soon.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-accent-moonstone text-white py-2 px-4 rounded hover:bg-accent-minBlue transition"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ThankYou;
