
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './mobile.css';

// Only define custom elements if we're in a Capacitor environment
if (typeof window !== 'undefined' && window.Capacitor) {
  import('@ionic/pwa-elements/loader').then(({ defineCustomElements }) => {
    defineCustomElements(window);
  }).catch(err => {
    console.error('Failed to load PWA elements:', err);
  });
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

// Add error boundary for the entire app
const AppWithErrorBoundary = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(root).render(<AppWithErrorBoundary />);
