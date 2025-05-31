
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './mobile.css';
import { ThemeProvider } from '@/components/ThemeProvider';

// Safely handle Capacitor environment check
const initializePWAElements = async () => {
  try {
    if (typeof window !== 'undefined' && window.Capacitor) {
      const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
      defineCustomElements(window);
    }
  } catch (err) {
    console.warn('PWA elements not available:', err);
  }
};

// Initialize PWA elements if needed
initializePWAElements();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

// Enhanced error boundary for the entire app
const AppWithErrorBoundary = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(root).render(<AppWithErrorBoundary />);
