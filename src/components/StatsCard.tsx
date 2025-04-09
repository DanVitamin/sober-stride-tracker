
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, icon, description }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary bg-opacity-10 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-center">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{unit}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
