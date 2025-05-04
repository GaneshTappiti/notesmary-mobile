
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AdminMessages = () => {
  return (
    <>
      <Helmet>
        <title>Admin Messages | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Admin Messages</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Admin Messages content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AdminMessages;
