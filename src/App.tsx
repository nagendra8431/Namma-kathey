import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import District from "./pages/District.tsx";
import Hero from "./pages/Hero.tsx";
import Story from "./pages/Story.tsx";
import Quiz from "./pages/Quiz.tsx";
import Memorial from "./pages/Memorial.tsx";
import Badges from "./pages/Badges.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/district/:districtId" element={<District />} />
          <Route path="/hero/:heroId" element={<Hero />} />
          <Route path="/hero/:heroId/story" element={<Story />} />
          <Route path="/hero/:heroId/quiz" element={<Quiz />} />
          <Route path="/hero/:heroId/memorial" element={<Memorial />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
