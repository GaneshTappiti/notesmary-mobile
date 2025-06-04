
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  Video, 
  Settings, 
  Menu, 
  X,
  School,
  BookOpen,
  FileText,
  GraduationCap,
  Calendar,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive 
          ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className={cn("p-1", isActive ? "text-blue-600" : "text-gray-600")}>
        {icon}
      </div>
      <span>{label}</span>
    </NavLink>
  );
};

export const CollegeAdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarLinks = [
    {
      to: "/college-admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard"
    },
    {
      to: "/college-admin/notes-approval",
      icon: <FileCheck size={20} />,
      label: "Notes Approval"
    },
    {
      to: "/college-admin/user-management",
      icon: <Users size={20} />,
      label: "User Management"
    },
    {
      to: "/college-admin/events-announcements",
      icon: <Calendar size={20} />,
      label: "Events & Announcements"
    },
    {
      to: "/college-admin/analytics",
      icon: <BarChart3 size={20} />,
      label: "Analytics"
    },
    {
      to: "/college-admin/studyrooms",
      icon: <Users size={20} />,
      label: "Study Rooms"
    },
    {
      to: "/college-admin/settings",
      icon: <Settings size={20} />,
      label: "Settings"
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200 text-gray-600"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <School size={18} />
              </div>
              <span className="text-lg font-semibold text-gray-900">College Admin</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </nav>

            {/* Education section */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Learning Resources
              </h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <div className="p-1 text-gray-600">
                    <FileText size={20} />
                  </div>
                  <span>Admin Guide</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <div className="p-1 text-gray-600">
                    <BookOpen size={20} />
                  </div>
                  <span>Documentation</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <div className="p-1 text-gray-600">
                    <GraduationCap size={20} />
                  </div>
                  <span>Training Videos</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="text-xs text-gray-500">
                <span className="block">College Admin Portal</span>
                <span className="block mt-0.5">Version 1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
