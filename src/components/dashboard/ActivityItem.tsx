
import React from 'react';

interface ActivityItemProps {
  action: string;
  time: string;
  icon: React.ReactNode;
  iconBgClass: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  action,
  time,
  icon,
  iconBgClass
}) => {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className={`${iconBgClass} p-1.5 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
};
