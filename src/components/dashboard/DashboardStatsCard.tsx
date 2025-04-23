
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface DashboardStatsCardProps {
  value: string;
  label: string;
  trend?: string;
  icon?: ReactNode;
}

const DashboardStatsCard = ({ value, label, trend, icon }: DashboardStatsCardProps) => {
  return (
    <div className="flex items-center gap-4">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
        {trend && (
          <span className="text-xs text-green-600">{trend}</span>
        )}
      </div>
    </div>
  );
};

export default DashboardStatsCard;
