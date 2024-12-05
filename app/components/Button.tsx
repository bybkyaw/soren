'use client';

import React from 'react';

interface ButtonProps {
  href?: string; // Optional for buttons that are links
  label: string;
  onClick?: () => void; // Optional for buttons with actions
  className?: string; // Additional class names
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({ href, label, onClick, className, disabled }) => {
  const buttonClasses = `
    inline-block
    items-center 
    justify-center 
    px-6 
    py-2 
    font-medium 
    rounded 
    transition-colors 
    no-underline
    ${disabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-accent-moonstone text-accent-af_white hover:bg-accent-minBlue'}
    ${className || ''}
  `;

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={buttonClasses}
        aria-disabled={disabled} // Indicate accessibility for disabled links
        onClick={(e) => disabled && e.preventDefault()} // Prevent action if disabled
      >
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick} // Disable onClick if disabled
      className={buttonClasses}
      disabled={disabled} // Disable button element
    >
      {label}
    </button>
  );
};

export default Button;


