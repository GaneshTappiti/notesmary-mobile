
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import AppLayout from '@/components/AppLayout';
import { PublicRoute } from '@/components/PublicRoute';
import { PrivateRoute } from '@/components/PrivateRoute';

// Page imports - only import what actually exists in the project
import StudyPulse from '@/pages/StudyPulse';
import StudyRoom from '@/pages/StudyRoom';
import Features from '@/pages/Features';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(
              <AppLayout>
                <Outlet />
              </AppLayout>
            )}>
              {/* Public Routes */}
              <Route index element={<Index />} />
              <Route path="features" element={<Features />} />
              
              {/* Private Routes */}
              <Route path="dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              {/* Study Rooms / Study Pulse Routes */}
              <Route path="study-pulse" element={
                <PrivateRoute>
                  <StudyPulse />
                </PrivateRoute>
              } />
              <Route path="study-rooms" element={<Navigate to="/study-pulse" replace />} /> 
              <Route path="study-room/:id/*" element={
                <PrivateRoute>
                  <StudyRoom />
                </PrivateRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
