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
      <div className="min-h-screen bg-uii-blue-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uii-yellow-500" />
      </div>
    );
  }

  if (!user) {
    return null; // Akan redirect oleh useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
        {/* Mobile Header Spacer (Nanti kita buat Mobile Header khusus Dashboard) */}
        <div className="md:hidden h-16 bg-uii-blue-900 w-full flex items-center px-4 text-white">
          Simpul Tumbuh Mobile (Menu WIP)
        </div>
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}