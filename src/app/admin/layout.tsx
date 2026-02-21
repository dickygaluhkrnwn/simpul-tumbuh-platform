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

  // Tampilan Loading saat verifikasi role
  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-rose-500" />
        <p className="text-slate-400 text-sm animate-pulse font-medium">Memverifikasi akses master...</p>
      </div>
    );
  }

  // Jika bukan admin, jangan render apa-apa (karena sudah di-redirect)
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}