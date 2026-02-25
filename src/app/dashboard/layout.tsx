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

  // Tampilan Loading ala Tech Platform (Sama dengan Admin)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-primary-500/20 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm animate-pulse font-bold tracking-[0.2em] uppercase">Memuat Sesi Pengguna...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Akan di-redirect oleh useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-300">
      {/* Nanti kita pastikan Sidebar User juga memiliki desain dark mode & modern */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300 relative">
        {/* Decorative Background untuk seluruh area dashboard */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
        
        {/* Mobile Header Spacer */}
        <div className="md:hidden h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 w-full flex items-center px-6 sticky top-0 z-20 shadow-sm">
          <span className="font-uii font-bold text-slate-900 dark:text-white">Simpul Tumbuh</span>
        </div>
        
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}