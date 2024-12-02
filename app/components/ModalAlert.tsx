
'use client';

import React from 'react';

interface AlertModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-accent-oxford_blue bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-accent-oxford_blue p-6 rounded-lg shadow-lg">
        <p className="text-lg text-accent-moonstone">{message}</p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-accent-moonstone text-accent-af_white py-2 px-4 rounded hover:bg-accent-minBlue"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;


