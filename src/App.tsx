import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute } from '@/components/PrivateRoute';
import { PublicRoute } from '@/components/PublicRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages
import Index from '@/pages/Index';
import Authentication from '@/pages/Authentication';
import Dashboard from '@/pages/Dashboard';
import UserProfile from '@/pages/UserProfile';
import MyNotes from '@/pages/MyNotes';
import UploadNotes from '@/pages/UploadNotes';
import FindNotes from '@/pages/FindNotes';
import StudyRooms from '@/pages/StudyRooms';
import StudyRoom from '@/pages/StudyRoom';
import AIAnswers from '@/pages/AIAnswers';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import { passwordResetRoutes } from '@/routes/passwordResetRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route
                    path="/"
                    element={
                      <PublicRoute>
                        <Index />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/authentication"
                    element={
                      <PublicRoute>
                        <Authentication />
                      </PublicRoute>
                    }
                  />
                  
                  {/* Password Reset Routes */}
                  {passwordResetRoutes}
                  
                  {/* Private Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/my-notes"
                    element={
                      <PrivateRoute>
                        <MyNotes />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/upload-notes"
                    element={
                      <PrivateRoute>
                        <UploadNotes />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/find-notes"
                    element={
                      <PrivateRoute>
                        <FindNotes />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/study-rooms"
                    element={
                      <PrivateRoute>
                        <StudyRooms />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/study-room/:id"
                    element={
                      <PrivateRoute>
                        <StudyRoom />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/ai-answers"
                    element={
                      <PrivateRoute>
                        <AIAnswers />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <PrivateRoute>
                        <Settings />
                      </PrivateRoute>
                    }
                  />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
