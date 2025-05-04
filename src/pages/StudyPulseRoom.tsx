
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const StudyPulseRoom = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Study Pulse Room | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Study Pulse Room {id}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Study Pulse Room content will appear here.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default StudyPulseRoom;
