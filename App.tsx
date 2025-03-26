
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Meditations from "./pages/Meditations";
import Archive from "./pages/Archive";
import Insights from "./pages/Insights";
import Auth from "./pages/Auth";
import Wiki from "./pages/Wiki";
import Dashboard from "./pages/Dashboard";
import TwelveWeek from "./pages/TwelveWeek";
import NotFound from "./pages/NotFound";
import TimerOverlay from "./components/TimerOverlay";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";

// Create the query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/twelve-week" element={<TwelveWeek />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/meditations" element={
            <ProtectedRoute>
              <Meditations />
            </ProtectedRoute>
          } />
          <Route path="/archive" element={
            <ProtectedRoute>
              <Archive />
            </ProtectedRoute>
          } />
          <Route path="/insights" element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TimerOverlay />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
