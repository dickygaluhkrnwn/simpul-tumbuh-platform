"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/auth/login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
        router.push("/dashboard");
      } finally {
        setCheckingRole(false);
      }
    };

    checkAdminRole();
  }, [user, authLoading, router]);

  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-primary-100 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-slate-600 text-sm animate-pulse font-bold tracking-[0.2em] uppercase">Memverifikasi Otoritas Master...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans transition-colors duration-300 relative selection:bg-primary-500 selection:text-white">
      {/* Background Orbs Global Admin */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-multiply" />
      
      {/* 1. Sidebar sekarang berada di dalam alur flexbox */}
      <AdminSidebar />
      
      {/* 2. Main Content Area (dihapus ml-64 nya, ditambah min-w-0 agar tidak merusak flex layout) */}
      <main className="flex-1 min-w-0 min-h-screen transition-all duration-300 relative z-10">
        <div className="p-4 md:p-6 lg:p-10 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}