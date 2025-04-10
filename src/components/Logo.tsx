
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Define size dimensions - increased by 20% from original values
  const dimensions = {
    sm: { fontSize: 'text-xl' },     // Was text-lg
    md: { fontSize: 'text-2xl' },    // Was text-xl
    lg: { fontSize: 'text-3xl' },    // Was text-2xl
  };

  const { fontSize } = dimensions[size];

  return (
    <span className={`font-bold ${fontSize} ${className}`}>
      zero
    </span>
  );
};

export default Logo;
