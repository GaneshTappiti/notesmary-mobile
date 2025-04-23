
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Import pages with lazy loading to improve initial load time
const Index = lazy(() => import("@/pages/Index"));
const Authentication = lazy(() => import("@/pages/Authentication"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AIAnswers = lazy(() => import("@/pages/AIAnswers"));
const UploadNotes = lazy(() => import("@/pages/UploadNotes"));
const FindNotes = lazy(() => import("@/pages/FindNotes"));
const ViewNotes = lazy(() => import("@/pages/ViewNotes"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const StudyAnalytics = lazy(() => import("@/pages/StudyAnalytics"));
const StudyRooms = lazy(() => import("@/pages/StudyRooms"));
const StudyRoom = lazy(() => import("@/pages/StudyRoom"));
const StudyRoomChat = lazy(() => import("@/pages/StudyRoomChat"));
const Settings = lazy(() => import("@/pages/Settings"));
const Todos = lazy(() => import("@/pages/Todos"));
const MyNotes = lazy(() => import("@/pages/MyNotes"));

// Create a single query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30 * 1000, // 30 seconds default stale time
      cacheTime: 5 * 60 * 1000, // 5 minutes cache time
    },
  },
});

// Loading component to display while pages are loading
const Loading = () => (
  <div className="h-screen flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex space-x-2 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

// Authentication guard component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/authentication" />;
};

// Redirect to Dashboard if logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <Suspense fallback={<Loading />}>
          <Index />
        </Suspense>
      } />
      <Route path="/authentication" element={
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <Authentication />
          </Suspense>
        </PublicRoute>
      } />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      
      {/* All other routes - follow the same pattern */}
      <Route 
        path="/upload-notes" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <UploadNotes />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/find-notes" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <FindNotes />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/todos" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <Todos />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/ai-answers" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <AIAnswers />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/study-rooms" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <StudyRooms />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route
        path="/my-notes"
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <MyNotes />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        }
      />
      
      {/* Catch-all route */}
      <Route path="*" element={
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
