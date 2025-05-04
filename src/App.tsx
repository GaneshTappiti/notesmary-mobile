
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Public Routes */}
              <Route index element={<Navigate to="/study-pulse" replace />} />
              
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
              <Route path="*" element={<Navigate to="/study-pulse" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
