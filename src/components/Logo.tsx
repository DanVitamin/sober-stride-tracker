
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Define size dimensions
  const dimensions = {
    sm: { fontSize: 'text-lg' },
    md: { fontSize: 'text-xl' },
    lg: { fontSize: 'text-2xl' },
  };

  const { fontSize } = dimensions[size];

  return (
    <span className={`font-bold ${fontSize} ${className}`}>
      zero
    </span>
  );
};

export default Logo;
