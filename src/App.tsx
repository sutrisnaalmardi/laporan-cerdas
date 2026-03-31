import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import SiswaPage from "@/pages/SiswaPage";
import GuruPage from "@/pages/GuruPage";
import MapelPage from "@/pages/MapelPage";
import KelasPage from "@/pages/KelasPage";
import NilaiPage from "@/pages/NilaiPage";
import RekapPage from "@/pages/RekapPage";
import CetakPage from "@/pages/CetakPage";
import PengaturanPage from "@/pages/PengaturanPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/siswa" element={<SiswaPage />} />
            <Route path="/guru" element={<GuruPage />} />
            <Route path="/mapel" element={<MapelPage />} />
            <Route path="/kelas" element={<KelasPage />} />
            <Route path="/nilai" element={<NilaiPage />} />
            <Route path="/rekap" element={<RekapPage />} />
            <Route path="/cetak" element={<CetakPage />} />
            <Route path="/pengaturan" element={<PengaturanPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
