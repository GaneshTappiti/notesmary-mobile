
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AdminAnalytics = () => {
  return (
    <>
      <Helmet>
        <title>Admin Analytics | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Admin Analytics content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AdminAnalytics;
