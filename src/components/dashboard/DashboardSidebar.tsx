
import { NavLink } from "react-router-dom";
import { 
  Home, LayoutDashboard, CheckSquare, Calendar, Bell, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Analytics', icon: LayoutDashboard, href: '/study-analytics' },
  { name: 'Tasks', icon: CheckSquare, href: '/dashboard#tasks' },
  { name: 'Calendar', icon: Calendar, href: '/dashboard#calendar' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export const DashboardSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex flex-col w-20 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-900 min-h-screen py-4 items-center">
      <div className="flex flex-col gap-3 flex-1 w-full mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-gray-400 hover:text-blue-600 justify-center p-0.5 transition group",
                isActive && "text-blue-600"
              )
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
