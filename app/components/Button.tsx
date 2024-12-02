'use client';

import React from 'react';

interface ButtonProps {
  href: string;
  label: string;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ href, label, className }) => {
  return (
    <a
      href={href}

      className={`
        inline-block
        items-center 
        justify-center 
        px-6 
        py-2 
        bg-accent-moonstone 
        text-accent-af_white 
        font-medium 
        rounded 
        hover:bg-accent-minBlue 
        transition-colors 
        ${className || ''} // Append any additional class names
        no-underline
      `}
    >
      {label}
    </a>
  );
};

export default Button;







