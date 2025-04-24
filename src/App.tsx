
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all page components
const Index = lazy(() => import("@/pages/Index"));
const Authentication = lazy(() => import("@/pages/Authentication"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AIAnswers = lazy(() => import("@/pages/AIAnswers"));
const AIMarkAnswers = lazy(() => import("@/pages/AIMarkAnswers"));
const UploadNotes = lazy(() => import("@/pages/UploadNotes"));
const FindNotes = lazy(() => import("@/pages/FindNotes"));
const ViewNotes = lazy(() => import("@/pages/ViewNotes"));
const MyNotes = lazy(() => import("@/pages/MyNotes"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const StudyAnalytics = lazy(() => import("@/pages/StudyAnalytics"));
const StudyRooms = lazy(() => import("@/pages/StudyRooms"));
const StudyRoom = lazy(() => import("@/pages/StudyRoom"));
const StudyRoomInfo = lazy(() => import("@/pages/StudyRoomInfo"));
const StudyRoomChat = lazy(() => import("@/pages/StudyRoomChat"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <Index />
          </Suspense>
        </PublicRoute>
      } />
      
      <Route path="/authentication" element={
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <Authentication />
          </Suspense>
        </PublicRoute>
      } />
      
      {/* Protected routes with AppLayout */}
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
        path="/ai-mark-answers" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <AIMarkAnswers />
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
        path="/view-notes/:noteId" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <ViewNotes />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/view-notes" 
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
      <Route 
        path="/notifications" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <Notifications />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/study-analytics" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <StudyAnalytics />
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
        path="/study-room/:id" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <StudyRoom />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/study-room/:id/info" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <StudyRoomInfo />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/study-room/:id/chat" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <StudyRoomChat />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subscription" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <Subscription />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <PrivateRoute>
            <AppLayout>
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            </AppLayout>
          </PrivateRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={
        <Suspense fallback={<Loading />}>
          <Navigate to="/" replace />
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
