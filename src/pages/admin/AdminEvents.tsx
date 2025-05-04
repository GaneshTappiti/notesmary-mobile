
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AdminEvents = () => {
  return (
    <>
      <Helmet>
        <title>Admin Events | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Admin Events Management</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Admin Events Management content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AdminEvents;
