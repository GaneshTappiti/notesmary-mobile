
import React from 'react';
import ReactDOM from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
import MobileDetection from './components/MobileDetection';
import './index.css';

// Define custom elements for mobile-friendly features
defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MobileDetection />
  </React.StrictMode>
);
