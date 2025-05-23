
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0a5de03e2b1e49e9b07287f882898e12',
  appName: 'notesmarty-pod-83',
  webDir: 'dist',
  server: {
    url: 'https://0a5de03e-2b1e-49e9-b072-87f882898e12.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      splashImmersive: true,
      androidSplashResourceName: "splash"
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#FFFFFF"
    }
  }
};

export default config;
