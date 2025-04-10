
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Define size dimensions with consistent values for all screen sizes
  const dimensions = {
    sm: { fontSize: 'text-xl' },
    md: { fontSize: 'text-2xl' },
    lg: { fontSize: 'text-3xl' },
  };

  const { fontSize } = dimensions[size];

  return (
    <span className={`font-bold ${fontSize} ${className}`}>
      zero
    </span>
  );
};

export default Logo;
