
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AdminNotes = () => {
  return (
    <>
      <Helmet>
        <title>Admin Notes | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Admin Notes Management</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Admin Notes Management content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AdminNotes;
