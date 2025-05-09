import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { HelmetProvider } from "react-helmet-async";
import AppLayout from "@/components/AppLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Import Authentication page directly without lazy loading to avoid issues
import Authentication from "@/pages/Authentication";

// Directly import Dashboard and AdminMessages to avoid loading issues
import Dashboard from "@/pages/Dashboard";
import AdminMessages from "@/pages/AdminMessages";
// Import NotFound page
import NotFound from "@/pages/NotFound";

// Lazy load all other page components with proper error boundaries
const Index = lazy(() => import("@/pages/Index"));
const MyNotes = lazy(() => import("@/pages/MyNotes"));
const UploadNotes = lazy(() => import("@/pages/UploadNotes"));
const FindNotes = lazy(() => import("@/pages/FindNotes"));
const ViewNotes = lazy(() => import("@/pages/ViewNotes"));
const AIAnswers = lazy(() => import("@/pages/AIAnswers"));
const AIMarkAnswers = lazy(() => import("@/pages/AIMarkAnswers"));
const StudyRooms = lazy(() => import("@/pages/StudyRooms"));
const StudyRoom = lazy(() => import("@/pages/StudyRoom"));
const StudyAnalytics = lazy(() => import("@/pages/StudyAnalytics"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Features = lazy(() => import("@/pages/Features"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Settings = lazy(() => import("@/pages/Settings"));
const Subscription = lazy(() => import("@/pages/Subscription"));

// Admin dashboard pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminNotes = lazy(() => import("@/pages/AdminNotes"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminEvents = lazy(() => import("@/pages/AdminEvents"));
const AdminAnalytics = lazy(() => import("@/pages/AdminAnalytics"));

// Add StudyPulse imports
const StudyPulse = lazy(() => import("@/pages/StudyPulse"));
const StudyPulseRoom = lazy(() => import("@/pages/StudyPulseRoom"));

// Create a component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
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

// Put BrowserRouter outside of AuthProvider
const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <Index />
                </Suspense>
              </PublicRoute>
            } />
            
            {/* New routes for Features and Pricing */}
            <Route path="/features" element={
              <Suspense fallback={<Loading />}>
                <Features />
              </Suspense>
            } />
            
            <Route path="/pricing" element={
              <Suspense fallback={<Loading />}>
                <Pricing />
              </Suspense>
            } />
            
            {/* Authentication route */}
            <Route path="/authentication" element={
              <PublicRoute>
                <Authentication />
              </PublicRoute>
            } />

            {/* Protected dashboard route - Using direct import for Dashboard */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* New routes for Settings and Subscription */}
            <Route path="/settings" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <Settings />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/subscription" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <Subscription />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* Protected User routes */}
            <Route path="/my-notes" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <MyNotes />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/upload-notes" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <UploadNotes />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/find-notes" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <FindNotes />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/view-notes/:noteId" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <ViewNotes />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/ai-answers" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <AIAnswers />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/ai-mark-answers" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <AIMarkAnswers />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/notifications" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <Notifications />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/study-rooms" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <StudyRooms />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* Study room routes */}
            <Route path="/study-room/:roomId" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <StudyRoom />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* Add new route for create room */}
            <Route path="/study-rooms/create" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <StudyRooms />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* StudyPulse routes with proper navigation */}
            <Route path="/study-pulse" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <ErrorBoundary>
                      <StudyPulse />
                    </ErrorBoundary>
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/study-pulse/:roomId" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <ErrorBoundary>
                      <StudyPulseRoom />
                    </ErrorBoundary>
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/study-analytics" element={
              <PrivateRoute>
                <AppLayout>
                  <Suspense fallback={<Loading />}>
                    <StudyAnalytics />
                  </Suspense>
                </AppLayout>
              </PrivateRoute>
            } />
            
            {/* Admin routes - NOT wrapped in AppLayout */}
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
            
            {/* Direct import for AdminMessages page to fix loading issue */}
            <Route 
              path="/admin/messages" 
              element={
                <PrivateRoute adminOnly={true}>
                  <AdminMessages />
                </PrivateRoute>
              } 
            />
            
            {/* Remaining admin routes - with additional error handling */}
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
              path="/admin/users" 
              element={
                <PrivateRoute adminOnly={true}>
                  <Suspense fallback={<Loading />}>
                    <AdminUsers />
                  </Suspense>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/events" 
              element={
                <PrivateRoute adminOnly={true}>
                  <Suspense fallback={<Loading />}>
                    <AdminEvents />
                  </Suspense>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/analytics" 
              element={
                <PrivateRoute adminOnly={true}>
                  <Suspense fallback={<Loading />}>
                    <AdminAnalytics />
                  </Suspense>
                </PrivateRoute>
              } 
            />
            
            {/* NotFound route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
