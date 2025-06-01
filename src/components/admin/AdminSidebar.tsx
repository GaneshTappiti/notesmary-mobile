
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  School,
  BarChart3,
  Calendar,
  Settings,
  ChevronRight,
  X,
  Search,
  Menu,
  Layers,
  FileStack,
  PieChart,
  Grid3X3,
  Palette,
  UserCheck,
  AlertCircle,
  BookOpen
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
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isNew }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center justify-between px-3 py-2 rounded-lg transition-colors group",
        isActive 
          ? "bg-pink-50 text-pink-700 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-1", isActive ? "text-pink-600" : "text-gray-600")}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {isNew && <Badge className="bg-pink-500 text-white text-xs px-2 py-0.5">New</Badge>}
        <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </NavLink>
  );
};

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
  const sidebarLinks = [
    {
      to: "/admin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      isNew: true
    },
    {
      to: "/admin/notes",
      icon: <FileText size={20} />,
      label: "Uploaded Notes"
    },
    {
      to: "/admin/messages",
      icon: <MessageSquare size={20} />,
      label: "Messages"
    },
    {
      to: "/admin/users",
      icon: <Users size={20} />,
      label: "Users Management"
    },
    {
      to: "/admin/colleges",
      icon: <School size={20} />,
      label: "Colleges"
    },
    {
      to: "/admin/analytics",
      icon: <BarChart3 size={20} />,
      label: "Analytics"
    }
  ];

  const uiElements = [
    { label: "UI Elements", icon: <Layers size={18} /> },
    { label: "Form elements", icon: <FileStack size={18} /> },
    { label: "Charts", icon: <PieChart size={18} /> },
    { label: "Tables", icon: <Grid3X3 size={18} /> },
    { label: "Icons", icon: <Palette size={18} /> },
    { label: "User Pages", icon: <UserCheck size={18} /> },
    { label: "Error pages", icon: <AlertCircle size={18} /> },
    { label: "Documentation", icon: <BookOpen size={18} /> }
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700 font-semibold text-sm">KO</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Kenneth Osborne</div>
                <div className="text-xs text-gray-500">Welcome</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Type to search..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 px-4 overflow-y-auto">
            {/* Dash menu */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Dash menu
              </h3>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <SidebarLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                    isNew={link.isNew}
                  />
                ))}
              </nav>
            </div>

            {/* UI Elements */}
            <div className="mb-6">
              <nav className="space-y-1">
                {uiElements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 text-gray-600">
                        {item.icon}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </nav>
            </div>

            {/* Category */}
            <div>
              <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Category
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span className="text-sm text-gray-700">#Sales</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">#Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
