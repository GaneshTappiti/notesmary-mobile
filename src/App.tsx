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
import { CollegeAdminLayout } from "@/components/college-admin/CollegeAdminLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";

// Import Authentication page directly without lazy loading to avoid issues
import Authentication from "@/pages/Authentication";

// Directly import Dashboard to avoid loading issues
import Dashboard from "@/pages/Dashboard";
// Import NotFound page
import NotFound from "@/pages/NotFound";

// Enhanced lazy loading with error boundaries
const createLazyComponent = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return lazy(() => 
    importFunc().catch(() => ({
      default: () => (
        <div className="h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading Error</h2>
            <p className="text-gray-600 mb-4">Failed to load this page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }))
  );
};

// Lazy load all other page components with enhanced error handling
const Index = createLazyComponent(() => import("@/pages/Index"));
const MyNotes = createLazyComponent(() => import("@/pages/MyNotes"));
const UploadNotes = createLazyComponent(() => import("@/pages/UploadNotes"));
const FindNotes = createLazyComponent(() => import("@/pages/FindNotes"));
const ViewNotes = createLazyComponent(() => import("@/pages/ViewNotes"));
const AIAnswers = createLazyComponent(() => import("@/pages/AIAnswers"));
const AIMarkAnswers = createLazyComponent(() => import("@/pages/AIMarkAnswers"));
const StudyRooms = createLazyComponent(() => import("@/pages/StudyRooms"));
const StudyRoom = createLazyComponent(() => import("@/pages/StudyRoom"));
const StudyAnalytics = createLazyComponent(() => import("@/pages/StudyAnalytics"));
const Notifications = createLazyComponent(() => import("@/pages/Notifications"));
const Features = createLazyComponent(() => import("@/pages/Features"));
const Pricing = createLazyComponent(() => import("@/pages/Pricing"));
const Settings = createLazyComponent(() => import("@/pages/Settings"));
const Subscription = createLazyComponent(() => import("@/pages/Subscription"));

// Admin dashboard pages
const AdminDashboard = createLazyComponent(() => import("@/pages/AdminDashboard"));
const AdminUsers = createLazyComponent(() => import("@/pages/AdminUsers"));
const AdminEvents = createLazyComponent(() => import("@/pages/AdminEvents"));
const AdminAnalytics = createLazyComponent(() => import("@/pages/AdminAnalytics"));
const AdminAuditLogs = createLazyComponent(() => import("@/pages/AdminAuditLogs"));
const AdminEventsAnnouncements = createLazyComponent(() => import("@/pages/AdminEventsAnnouncements"));
const AdminCollegeChat = createLazyComponent(() => import("@/pages/AdminCollegeChat"));

// New College Management pages
const AdminColleges = createLazyComponent(() => import("@/pages/AdminColleges"));
const AdminCollegeDetails = createLazyComponent(() => import("@/pages/AdminCollegeDetails"));

// College Admin dashboard pages
const CollegeAdminDashboard = createLazyComponent(() => import("@/pages/college-admin/CollegeAdminDashboard"));
const NotesApproval = createLazyComponent(() => import("@/pages/college-admin/NotesApproval"));
const UserManagement = createLazyComponent(() => import("@/pages/college-admin/UserManagement"));
const StudyRoomsMonitor = createLazyComponent(() => import("@/pages/college-admin/StudyRoomsMonitor"));
const CollegeAdminSettings = createLazyComponent(() => import("@/pages/college-admin/CollegeAdminSettings"));
const EventsAnnouncements = createLazyComponent(() => import("@/pages/college-admin/EventsAnnouncements"));
const Analytics = createLazyComponent(() => import("@/pages/college-admin/Analytics"));

// Add StudyPulse imports
const StudyPulse = createLazyComponent(() => import("@/pages/StudyPulse"));
const StudyPulseRoom = createLazyComponent(() => import("@/pages/StudyPulseRoom"));

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

// Enhanced loading component
const Loading = () => (
  <div className="h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white">
    <div className="w-full max-w-md space-y-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3 mx-auto" />
      <p className="text-center text-sm text-gray-500 mt-4">Loading application...</p>
    </div>
  </div>
);

// Enhanced Suspense wrapper with better error handling
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Add the lazy import at the top with other lazy imports
const ForgotPassword = createLazyComponent(() => import("@/pages/ForgotPassword"));

// Add the ErrorScreen lazy import with other imports
const ErrorScreen = createLazyComponent(() => import("@/pages/ErrorScreen"));

// Add the ProfileScreen lazy import with other imports
const ProfileScreen = createLazyComponent(() => import("@/pages/ProfileScreen"));

// Add the OnboardingScreen lazy import with other imports
const OnboardingScreen = createLazyComponent(() => import("@/pages/OnboardingScreen"));

// Main App component with enhanced error handling
const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <ErrorBoundary>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <PublicRoute>
                  <SuspenseWrapper>
                    <Index />
                  </SuspenseWrapper>
                </PublicRoute>
              } />
              
              {/* New routes for Features and Pricing */}
              <Route path="/features" element={
                <SuspenseWrapper>
                  <Features />
                </SuspenseWrapper>
              } />
              
              <Route path="/pricing" element={
                <SuspenseWrapper>
                  <Pricing />
                </SuspenseWrapper>
              } />
              
              {/* Authentication route */}
              <Route path="/authentication" element={
                <PublicRoute>
                  <Authentication />
                </PublicRoute>
              } />

              {/* Forgot Password route */}
              <Route path="/forgot-password" element={
                <PublicRoute>
                  <SuspenseWrapper>
                    <ForgotPassword />
                  </SuspenseWrapper>
                </PublicRoute>
              } />

              {/* Onboarding route */}
              <Route path="/onboarding" element={
                <PrivateRoute>
                  <SuspenseWrapper>
                    <OnboardingScreen />
                  </SuspenseWrapper>
                </PrivateRoute>
              } />

              {/* Error Screen route */}
              <Route path="/error" element={
                <SuspenseWrapper>
                  <ErrorScreen />
                </SuspenseWrapper>
              } />

              {/* Protected dashboard route - Using direct import for Dashboard */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              {/* New routes for Settings and Subscription */}
              <Route path="/settings" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <Settings />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              {/* Add Profile route */}
              <Route path="/profile" element={
                <PrivateRoute>
                  <SuspenseWrapper>
                    <ProfileScreen />
                  </SuspenseWrapper>
                </PrivateRoute>
              } />
              
              <Route path="/subscription" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <Subscription />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              {/* ... keep existing code (all user routes) */}
              <Route path="/my-notes" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <MyNotes />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/upload-notes" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <UploadNotes />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/find-notes" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <FindNotes />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/view-notes/:noteId" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <ViewNotes />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/ai-answers" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <AIAnswers />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/ai-mark-answers" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <AIMarkAnswers />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/notifications" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <Notifications />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-rooms" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyRooms />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-room/:roomId" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyRoom />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-rooms/create" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyRooms />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-pulse" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyPulse />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-pulse/:roomId" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyPulseRoom />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />
              
              <Route path="/study-analytics" element={
                <PrivateRoute>
                  <AppLayout>
                    <SuspenseWrapper>
                      <StudyAnalytics />
                    </SuspenseWrapper>
                  </AppLayout>
                </PrivateRoute>
              } />

              {/* College Admin Routes */}
              <Route path="/college-admin" element={
                <PrivateRoute>
                  <SuspenseWrapper>
                    <CollegeAdminLayout />
                  </SuspenseWrapper>
                </PrivateRoute>
              }>
                <Route path="dashboard" element={
                  <SuspenseWrapper>
                    <CollegeAdminDashboard />
                  </SuspenseWrapper>
                } />
                <Route path="notes-approval" element={
                  <SuspenseWrapper>
                    <NotesApproval />
                  </SuspenseWrapper>
                } />
                <Route path="user-management" element={
                  <SuspenseWrapper>
                    <UserManagement />
                  </SuspenseWrapper>
                } />
                <Route path="studyrooms" element={
                  <SuspenseWrapper>
                    <StudyRoomsMonitor />
                  </SuspenseWrapper>
                } />
                <Route path="settings" element={
                  <SuspenseWrapper>
                    <CollegeAdminSettings />
                  </SuspenseWrapper>
                } />
                <Route path="events-announcements" element={
                  <SuspenseWrapper>
                    <EventsAnnouncements />
                  </SuspenseWrapper>
                } />
                <Route path="analytics" element={
                  <SuspenseWrapper>
                    <Analytics />
                  </SuspenseWrapper>
                } />
                <Route index element={<Navigate to="/college-admin/dashboard" replace />} />
              </Route>
              
              {/* Admin routes - properly structured with proper paths */}
              <Route path="/admin" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminDashboard />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              <Route path="/admin/colleges" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminColleges />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              <Route path="/admin/colleges/:id" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminCollegeDetails />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              <Route path="/admin/users" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminUsers />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              <Route path="/admin/events" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminEvents />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              <Route path="/admin/analytics" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminAnalytics />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />

              <Route path="/admin/events-announcements" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminEventsAnnouncements />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />

              <Route path="/admin/college-chat" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminCollegeChat />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />

              <Route path="/admin/audit-logs" element={
                <PrivateRoute adminOnly={true}>
                  <AdminLayout>
                    <SuspenseWrapper>
                      <AdminAuditLogs />
                    </SuspenseWrapper>
                  </AdminLayout>
                </PrivateRoute>
              } />
              
              {/* NotFound route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
