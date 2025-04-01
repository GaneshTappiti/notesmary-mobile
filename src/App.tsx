import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
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
import StudyRoom from "./pages/StudyRoom";
import StudyRoomChat from "./pages/StudyRoomChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<Authentication />} />
          
          {/* Routes with AppLayout */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/ai-answers" element={<AppLayout><AIAnswers /></AppLayout>} />
          <Route path="/upload-notes" element={<AppLayout><UploadNotes /></AppLayout>} />
          <Route path="/find-notes" element={<AppLayout><FindNotes /></AppLayout>} />
          <Route path="/view-notes/:noteId" element={<AppLayout><ViewNotes /></AppLayout>} />
          <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
          <Route path="/study-analytics" element={<AppLayout><StudyAnalytics /></AppLayout>} />
          
          {/* Implemented Pages */}
          <Route path="/study-room/:id" element={<AppLayout><StudyRoom /></AppLayout>} />
          <Route path="/study-room/:id/chat" element={<AppLayout><StudyRoomChat /></AppLayout>} />
          
          {/* Other pages (to be implemented in future iterations) */}
          <Route path="/team" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/ai-study-tips" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/subscription" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/ai-insights" element={<AppLayout><Dashboard /></AppLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
