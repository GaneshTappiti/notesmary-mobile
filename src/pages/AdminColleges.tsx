
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import { CollegeList } from '@/components/admin/colleges/CollegeList';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddEditCollegeModal } from '@/components/admin/colleges/AddEditCollegeModal';

const AdminColleges = () => {
  const { toast } = useToast();
  const [isAddCollegeModalOpen, setIsAddCollegeModalOpen] = useState(false);

  const handleAddCollege = () => {
    setIsAddCollegeModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>College Management | Notex Admin</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">College Management</h1>
                <p className="text-muted-foreground">Manage all colleges in the system</p>
              </div>
              <Button onClick={handleAddCollege}>
                <Plus className="mr-2 h-4 w-4" />
                Add College
              </Button>
            </div>
            
            <CollegeList />
            
            <AddEditCollegeModal 
              isOpen={isAddCollegeModalOpen}
              onClose={() => setIsAddCollegeModalOpen(false)}
            />
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminColleges;
