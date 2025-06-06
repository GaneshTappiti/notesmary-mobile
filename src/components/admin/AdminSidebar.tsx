
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  School,
  Calendar,
  Activity,
  ChevronRight,
  X,
  Search,
  MessageCircle,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isNew?: boolean;
  collapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isNew, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center justify-between px-3 py-2 rounded-lg transition-colors group relative",
        isActive 
          ? "bg-pink-50 text-pink-700 font-medium"
          : "text-gray-700 hover:bg-gray-100",
        collapsed && "justify-center"
      )}
      title={collapsed ? label : undefined}
    >
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <div className={cn("p-1", isActive ? "text-pink-600" : "text-gray-600")}>
          {icon}
        </div>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && (
        <div className="flex items-center gap-1">
          {isNew && <Badge className="bg-pink-500 text-white text-xs px-2 py-0.5">New</Badge>}
          <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </NavLink>
  );
};

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebarLinks = [
    {
      to: "/admin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard Overview",
      isNew: true
    },
    {
      to: "/admin/colleges",
      icon: <School size={20} />,
      label: "College List"
    },
    {
      to: "/admin/events-announcements",
      icon: <Calendar size={20} />,
      label: "Events & Announcements"
    },
    {
      to: "/admin/college-chat",
      icon: <MessageCircle size={20} />,
      label: "College Admin Chat",
      isNew: true
    },
    {
      to: "/admin/audit-logs",
      icon: <Activity size={20} />,
      label: "Audit Logs"
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className={cn("flex items-center h-16 px-4 border-b border-gray-200", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SA</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Super Admin</div>
                  <div className="text-xs text-gray-500">Control Panel</div>
                </div>
              </div>
            )}
            
            {collapsed && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SA</span>
              </div>
            )}

            {/* Desktop toggle button */}
            <div className="hidden lg:flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="h-8 w-8"
              >
                {collapsed ? <Menu size={16} /> : <X size={16} />}
              </Button>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          {!collapsed && (
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          )}

          {/* Sidebar content */}
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="mb-6">
              {!collapsed && (
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Super Admin Menu
                </h3>
              )}
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <SidebarLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                    isNew={link.isNew}
                    collapsed={collapsed}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
