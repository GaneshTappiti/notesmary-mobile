
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Public pages
import { AppLayout } from '@/components/AppLayout';
import { PublicRoute } from '@/components/PublicRoute';
import { PrivateRoute } from '@/components/PrivateRoute';

// Public Routes
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ResetPassword from '@/pages/ResetPassword';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';

// Private Routes
import Dashboard from '@/pages/Dashboard';
import Notes from '@/pages/Notes';
import Note from '@/pages/Note';
import Notebooks from '@/pages/Notebooks';
import Flashcards from '@/pages/Flashcards';
import FlashcardDetail from '@/pages/FlashcardDetail';
import StudyAnalytics from '@/pages/StudyAnalytics';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import AIExamQuestions from '@/pages/AIExamQuestions';
// import StudyRooms from '@/pages/StudyRooms'; // Renamed to StudyPulse
import StudyPulse from '@/pages/StudyPulse'; // New unified room discovery page
import StudyRoom from '@/pages/StudyRoom'; // Unified study room page

// Admin Routes
import AdminDashboard from '@/pages/admin/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Public Routes */}
              <Route index element={<PublicRoute component={Home} />} />
              <Route path="login" element={<PublicRoute component={Login} />} />
              <Route path="signup" element={<PublicRoute component={Signup} />} />
              <Route path="reset-password" element={<PublicRoute component={ResetPassword} />} />
              <Route path="features" element={<PublicRoute component={Features} />} />
              <Route path="pricing" element={<PublicRoute component={Pricing} />} />
              
              {/* Private Routes */}
              <Route path="dashboard" element={<PrivateRoute component={Dashboard} />} />
              <Route path="notes" element={<PrivateRoute component={Notes} />} />
              <Route path="note/:id" element={<PrivateRoute component={Note} />} />
              <Route path="notebooks" element={<PrivateRoute component={Notebooks} />} />
              <Route path="flashcards" element={<PrivateRoute component={Flashcards} />} />
              <Route path="flashcards/:id" element={<PrivateRoute component={FlashcardDetail} />} />
              <Route path="analytics" element={<PrivateRoute component={StudyAnalytics} />} />
              <Route path="settings" element={<PrivateRoute component={Settings} />} />
              <Route path="profile" element={<PrivateRoute component={Profile} />} />
              <Route path="ai-exam-questions" element={<PrivateRoute component={AIExamQuestions} />} />
              
              {/* Study Rooms / Study Pulse Routes */}
              <Route path="study-pulse" element={<PrivateRoute component={StudyPulse} />} />
              <Route path="study-rooms" element={<Navigate to="/study-pulse" replace />} /> {/* Redirect old route */}
              <Route path="study-room/:id/*" element={<PrivateRoute component={StudyRoom} />} />
              
              {/* Admin Routes */}
              <Route path="admin" element={<PrivateRoute component={AdminDashboard} admin={true} />} />
              
              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
