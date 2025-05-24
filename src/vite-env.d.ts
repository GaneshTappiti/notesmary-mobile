
/// <reference types="vite/client" />

// Extend the Window interface to include Capacitor
declare global {
  interface Window {
    Capacitor?: any;
  }
}

export {};
