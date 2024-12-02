'use client';

import React from 'react';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center space-y-4">

{/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-accent-moonstone border-opacity-75"></div>

{/* Message */}
        <p className="text-lg font-semibold text-accent-moonstone">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
