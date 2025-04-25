
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
