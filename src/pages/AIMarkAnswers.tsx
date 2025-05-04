
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';

const AIMarkAnswers = () => {
  return (
    <>
      <Helmet>
        <title>AI Mark Answers | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">AI Mark Answers</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Use AI to evaluate and mark your practice exam answers.</p>
        </div>
      </PageContainer>
    </>
  );
};

export default AIMarkAnswers;
