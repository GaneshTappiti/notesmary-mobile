import React from 'react';
import { FeatureCard } from '@/components/FeatureCard';

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Notex?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock the full potential of your study notes with our AI-powered platform.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="AI-Powered Summaries"
            description="Get instant summaries of your notes, highlighting key concepts and ideas."
            icon="summarize"
          />
          <FeatureCard
            title="Smart Flashcards"
            description="Automatically generate flashcards from your notes for effective memorization."
            icon="flashcards"
          />
          <FeatureCard
            title="Custom Quizzes"
            description="Create quizzes tailored to your notes, reinforcing your understanding of the material."
            icon="quizzes"
          />
          <FeatureCard
            title="Note Organization"
            description="Effortlessly organize your notes into a structured digital format."
            icon="organize"
          />
          <FeatureCard
            title="Cross-Device Access"
            description="Access your notes and study materials from any device, anywhere."
            icon="devices"
          />
          <FeatureCard
            title="Collaborative Study"
            description="Share your notes with classmates and study together in real-time."
            icon="collaborate"
          />
        </div>
      </div>
    </section>
  );
};
