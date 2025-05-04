
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AdminUsers = () => {
  return (
    <>
      <Helmet>
        <title>Admin Users | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Admin Users Management</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Admin Users Management content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AdminUsers;
