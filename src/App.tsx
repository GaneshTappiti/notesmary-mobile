
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import AppLayout from '@/components/AppLayout';
import { PublicRoute } from '@/components/PublicRoute';
import { PrivateRoute } from '@/components/PrivateRoute';

// Main User Pages
import Index from '@/pages/Index';
import Features from '@/pages/Features';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import MyNotes from '@/pages/MyNotes';
import FindNotes from '@/pages/FindNotes';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import Pricing from '@/pages/Pricing';
import StudyAnalytics from '@/pages/StudyAnalytics';
import StudyPulse from '@/pages/StudyPulse';
import StudyRoom from '@/pages/StudyRoom';
import AIAnswers from '@/pages/AIAnswers';
import AIMarkAnswers from '@/pages/AIMarkAnswers';
import UploadNotes from '@/pages/UploadNotes';
import ViewNotes from '@/pages/ViewNotes';
import Subscription from '@/pages/Subscription';
import StudyPulseRoom from '@/pages/StudyPulseRoom';

// Admin Pages
import AdminDashboard from '@/pages/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminNotes from '@/pages/admin/AdminNotes';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminMessages from '@/pages/admin/AdminMessages';

// Auth Page
import Authentication from '@/pages/Authentication';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(
              <AppLayout>
                <Outlet />
              </AppLayout>
            )}>
              {/* Public Routes */}
              <Route index element={<Index />} />
              <Route path="features" element={<Features />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="authentication" element={
                <PublicRoute>
                  <Authentication />
                </PublicRoute>
              } />
              
              {/* Private Routes */}
              <Route path="dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="my-notes" element={
                <PrivateRoute>
                  <MyNotes />
                </PrivateRoute>
              } />
              <Route path="find-notes" element={
                <PrivateRoute>
                  <FindNotes />
                </PrivateRoute>
              } />
              <Route path="upload-notes" element={
                <PrivateRoute>
                  <UploadNotes />
                </PrivateRoute>
              } />
              <Route path="view-notes/:id" element={
                <PrivateRoute>
                  <ViewNotes />
                </PrivateRoute>
              } />
              <Route path="notifications" element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              } />
              <Route path="settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              <Route path="subscription" element={
                <PrivateRoute>
                  <Subscription />
                </PrivateRoute>
              } />
              <Route path="analytics" element={
                <PrivateRoute>
                  <StudyAnalytics />
                </PrivateRoute>
              } />
              <Route path="ai-answers" element={
                <PrivateRoute>
                  <AIAnswers />
                </PrivateRoute>
              } />
              <Route path="ai-mark-answers" element={
                <PrivateRoute>
                  <AIMarkAnswers />
                </PrivateRoute>
              } />
              
              {/* Study Rooms / Study Pulse Routes */}
              <Route path="study-pulse" element={
                <PrivateRoute>
                  <StudyPulse />
                </PrivateRoute>
              } />
              <Route path="study-pulse-room/:id" element={
                <PrivateRoute>
                  <StudyPulseRoom />
                </PrivateRoute>
              } />
              <Route path="study-rooms" element={<Navigate to="/study-pulse" replace />} /> 
              <Route path="study-room/:id/*" element={
                <PrivateRoute>
                  <StudyRoom />
                </PrivateRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="admin" element={
                <PrivateRoute adminOnly={true}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="admin/users" element={
                <PrivateRoute adminOnly={true}>
                  <AdminUsers />
                </PrivateRoute>
              } />
              <Route path="admin/notes" element={
                <PrivateRoute adminOnly={true}>
                  <AdminNotes />
                </PrivateRoute>
              } />
              <Route path="admin/analytics" element={
                <PrivateRoute adminOnly={true}>
                  <AdminAnalytics />
                </PrivateRoute>
              } />
              <Route path="admin/events" element={
                <PrivateRoute adminOnly={true}>
                  <AdminEvents />
                </PrivateRoute>
              } />
              <Route path="admin/messages" element={
                <PrivateRoute adminOnly={true}>
                  <AdminMessages />
                </PrivateRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
