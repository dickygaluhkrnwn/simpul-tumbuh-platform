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
      // Tunggu auth loading selesai dulu
      if (authLoading) return;

      // Jika tidak ada user login, lempar ke login
      if (!user) {
        router.push("/auth/login");
        return;
      }

      try {
        // Cek dokumen user di Firestore untuk melihat role
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          // Jika bukan admin, tendang ke dashboard user biasa
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

  // Tampilan Loading saat verifikasi role (Futuristic Style)
  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-primary-500/20 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm animate-pulse font-bold tracking-[0.2em] uppercase">Memverifikasi Otoritas Master...</p>
        </div>
      </div>
    );
  }

  // Jika bukan admin, jangan render apa-apa (karena sudah di-redirect)
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-300">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300 relative">
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}