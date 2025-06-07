
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './mobile.css';
import { ThemeProvider } from '@/components/ThemeProvider';

// Optimized PWA elements initialization
const initializePWAElements = async () => {
  try {
    if (typeof window !== 'undefined' && window.Capacitor) {
      const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
      // Use requestIdleCallback for non-critical initialization
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => defineCustomElements(window));
      } else {
        setTimeout(() => defineCustomElements(window), 0);
      }
    }
  } catch (err) {
    console.warn('PWA elements not available:', err);
  }
};

// Initialize PWA elements if needed (non-blocking)
initializePWAElements();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

// Enhanced error boundary with performance optimizations
const AppWithErrorBoundary = React.memo(() => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
});

AppWithErrorBoundary.displayName = 'AppWithErrorBoundary';

// Use concurrent features for better performance
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<AppWithErrorBoundary />);
