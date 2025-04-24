
import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col md:pl-64">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto pb-10">
          {children}
        </main>
      </div>
    </div>
  );
};
