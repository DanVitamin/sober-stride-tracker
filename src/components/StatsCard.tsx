
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  description?: string;
  size?: 'default' | 'large';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  description,
  size = 'default'
}) => {
  return (
    <Card className={`overflow-hidden ${size === 'large' ? 'col-span-2' : ''}`}>
      <CardHeader className={`bg-primary bg-opacity-10 pb-2 ${size === 'large' ? 'pb-3' : ''}`}>
        <CardTitle className={`
          flex items-center gap-2 text-primary
          ${size === 'large' ? 'text-base' : 'text-sm'} font-medium
        `}>
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-4 ${size === 'large' ? 'pt-6 pb-6' : ''}`}>
        <div className="text-center">
          <p className={`${size === 'large' ? 'text-6xl' : 'text-3xl'} font-bold`}>{value}</p>
          <p className={`${size === 'large' ? 'text-base mt-2' : 'text-sm'} text-muted-foreground`}>{unit}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
