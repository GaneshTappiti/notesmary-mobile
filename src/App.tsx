
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";
import AIAnswers from "./pages/AIAnswers";
import UploadNotes from "./pages/UploadNotes";
import FindNotes from "./pages/FindNotes";
import ViewNotes from "./pages/ViewNotes";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import StudyAnalytics from "./pages/StudyAnalytics";
import StudyRooms from "./pages/StudyRooms";
import StudyRoom from "./pages/StudyRoom";
import StudyRoomChat from "./pages/StudyRoomChat";
import StudyRoomInfo from "./pages/StudyRoomInfo";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import MyNotes from "./pages/MyNotes";
import AIMarkAnswers from "./pages/AIMarkAnswers";

const queryClient = new QueryClient();

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

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Navigate to="/authentication" />} />
        <Route path="/authentication" element={<Authentication />} />
        
        {/* Protected routes with AppLayout */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ai-answers" 
          element={
            <PrivateRoute>
              <AppLayout>
                <AIAnswers />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ai-mark-answers" 
          element={
            <PrivateRoute>
              <AppLayout>
                <AIMarkAnswers />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/upload-notes" 
          element={
            <PrivateRoute>
              <AppLayout>
                <UploadNotes />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/find-notes" 
          element={
            <PrivateRoute>
              <AppLayout>
                <FindNotes />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-notes/:noteId" 
          element={
            <PrivateRoute>
              <AppLayout>
                <ViewNotes />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-notes" 
          element={
            <PrivateRoute>
              <AppLayout>
                <MyNotes />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <PrivateRoute>
              <AppLayout>
                <Notifications />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/study-analytics" 
          element={
            <PrivateRoute>
              <AppLayout>
                <StudyAnalytics />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/study-rooms" 
          element={
            <PrivateRoute>
              <AppLayout>
                <StudyRooms />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/study-room/:id" 
          element={
            <PrivateRoute>
              <AppLayout>
                <StudyRoom />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/study-room/:id/info" 
          element={
            <PrivateRoute>
              <AppLayout>
                <StudyRoomInfo />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/study-room/:id/chat" 
          element={
            <PrivateRoute>
              <AppLayout>
                <StudyRoomChat />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/subscription" 
          element={
            <PrivateRoute>
              <AppLayout>
                <Subscription />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
