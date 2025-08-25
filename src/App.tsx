import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ICPProvider } from "@/contexts/ICPContext";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Create from "./pages/Create";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <ICPProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/create" element={<Create />} />
              </Routes>
            </Router>
            <Toaster />
          </ICPProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
