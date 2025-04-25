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
import { HelmetProvider } from "react-helmet-async";

// Import Authentication page directly without lazy loading to avoid issues
import Authentication from "@/pages/Authentication";

// Lazy load all other page components
const Index = lazy(() => import("@/pages/Index"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MyNotes = lazy(() => import("@/pages/MyNotes"));
const UploadNotes = lazy(() => import("@/pages/UploadNotes"));
const FindNotes = lazy(() => import("@/pages/FindNotes"));
const ViewNotes = lazy(() => import("@/pages/ViewNotes"));
const AIAnswers = lazy(() => import("@/pages/AIAnswers"));
const StudyRooms = lazy(() => import("@/pages/StudyRooms"));
const StudyRoom = lazy(() => import("@/pages/StudyRoom"));
const StudyRoomChat = lazy(() => import("@/pages/StudyRoomChat"));
const StudyRoomInfo = lazy(() => import("@/pages/StudyRoomInfo"));
const StudyAnalytics = lazy(() => import("@/pages/StudyAnalytics"));

// Admin dashboard pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminNotes = lazy(() => import("@/pages/AdminNotes"));
const AdminMessages = lazy(() => import("@/pages/AdminMessages"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));

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
      
      {/* Authentication route */}
      <Route path="/authentication" element={
        <PublicRoute>
          <Authentication />
        </PublicRoute>
      } />

      {/* Protected dashboard route */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        </PrivateRoute>
      } />
      
      {/* Protected User routes */}
      <Route path="/my-notes" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <MyNotes />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/upload-notes" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <UploadNotes />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/find-notes" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <FindNotes />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/view-notes/:noteId" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <ViewNotes />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/ai-answers" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <AIAnswers />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/study-rooms" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <StudyRooms />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/study-room/:roomId" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <StudyRoom />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/study-room/:roomId/chat" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <StudyRoomChat />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/study-room/:roomId/info" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <StudyRoomInfo />
          </Suspense>
        </PrivateRoute>
      } />
      
      <Route path="/study-analytics" element={
        <PrivateRoute>
          <Suspense fallback={<Loading />}>
            <StudyAnalytics />
          </Suspense>
        </PrivateRoute>
      } />
      
      {/* Admin routes */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute adminOnly={true}>
            <Suspense fallback={<Loading />}>
              <AdminDashboard />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/admin/notes" 
        element={
          <PrivateRoute adminOnly={true}>
            <Suspense fallback={<Loading />}>
              <AdminNotes />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/admin/messages" 
        element={
          <PrivateRoute adminOnly={true}>
            <Suspense fallback={<Loading />}>
              <AdminMessages />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/admin/users" 
        element={
          <PrivateRoute adminOnly={true}>
            <Suspense fallback={<Loading />}>
              <AdminUsers />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
