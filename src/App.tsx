
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/ai-answers" element={<AIAnswers />} />
          <Route path="/upload-notes" element={<UploadNotes />} />
          <Route path="/find-notes" element={<FindNotes />} />
          <Route path="/view-notes/:noteId" element={<ViewNotes />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/study-analytics" element={<StudyAnalytics />} />
          
          {/* Placeholder routes for the new pages - these will redirect to dashboard for now */}
          <Route path="/study-room/:id" element={<Dashboard />} />
          <Route path="/study-room/:id/chat" element={<Dashboard />} />
          <Route path="/team" element={<Dashboard />} />
          <Route path="/ai-study-tips" element={<Dashboard />} />
          <Route path="/subscription" element={<Dashboard />} />
          <Route path="/ai-insights" element={<Dashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
