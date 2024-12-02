'use client';

import React, { useEffect, useState } from "react";

interface ParallaxEffectProps {
  children: React.ReactNode;
  index: number; // To determine the effect for each book
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({ children, index }) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${offsetY * (0.05 + index * 0.02)}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
