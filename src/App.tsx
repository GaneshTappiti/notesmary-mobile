
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Import pages
const Index = React.lazy(() => import("@/pages/Index"));
const Login = React.lazy(() => import("@/pages/Login"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Authentication = React.lazy(() => import("@/pages/Authentication"));
const AIAnswers = React.lazy(() => import("@/pages/AIAnswers"));
const UploadNotes = React.lazy(() => import("@/pages/UploadNotes"));
const FindNotes = React.lazy(() => import("@/pages/FindNotes"));
const ViewNotes = React.lazy(() => import("@/pages/ViewNotes"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const Notifications = React.lazy(() => import("@/pages/Notifications"));
const StudyAnalytics = React.lazy(() => import("@/pages/StudyAnalytics"));
const StudyRooms = React.lazy(() => import("@/pages/StudyRooms"));
const StudyRoom = React.lazy(() => import("@/pages/StudyRoom"));
const StudyRoomChat = React.lazy(() => import("@/pages/StudyRoomChat"));
const Settings = React.lazy(() => import("@/pages/Settings"));
const Todos = React.lazy(() => import("@/pages/Todos"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
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
