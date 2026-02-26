"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Proteksi Rute: Jika tidak loading dan tidak ada user, tendang ke login
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-primary-100 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-slate-600 text-sm animate-pulse font-bold tracking-[0.2em] uppercase">Memuat Sesi Pengguna...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  // HAPUS `flex` DARI WRAPPER UTAMA AGAR TIDAK BENTROK DENGAN SIDEBAR FIXED
  return (
    <div className="min-h-screen bg-slate-50 font-sans transition-colors duration-300 selection:bg-primary-500 selection:text-white relative">
      {/* Decorative Background Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-multiply" />
      
      <Sidebar />
      
      {/* MENGGUNAKAN md:pl-64 (PADDING LEFT) UNTUK MEMBERI RUANG SIDEBAR */}
      <main className="md:pl-64 min-h-screen transition-all duration-300 relative z-10 flex flex-col">
        
        {/* Mobile Header Spacer */}
        <div className="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 w-full flex items-center px-6 sticky top-0 z-20 shadow-sm">
          <span className="font-uii font-bold text-slate-900 text-lg tracking-tight">Simpul Tumbuh</span>
        </div>
        
        {/* Kontainer Isi Halaman */}
        <div className="p-4 md:p-6 lg:p-10 w-full max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}