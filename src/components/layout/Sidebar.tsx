"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  User, 
  LogOut, 
  Zap,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Jelajah Event", href: "/dashboard/events", icon: Calendar },
    { name: "Tiket Saya", href: "/dashboard/my-tickets", icon: Ticket },
    { name: "Materi & Modul", href: "/dashboard/resources", icon: BookOpen },
    { name: "Profil", href: "/dashboard/profile", icon: User },
  ];

  return (
    // PERBAIKAN: Menghapus class 'relative' agar 'fixed' bekerja dengan sempurna di sisi kiri
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel bg-white/80 border-r border-slate-200/80 hidden md:flex flex-col z-50 transition-colors duration-300 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-primary-500/10 blur-3xl pointer-events-none" />

      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200/80 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-uii font-bold text-lg text-slate-900 tracking-tight leading-none truncate">
              Simpul Tumbuh
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-1 text-primary-600 truncate">
              User Portal
            </span>
          </div>
        </Link>
      </div>

      {/* User Info (Mini) */}
      <div className="px-5 py-6 relative z-10">
        <div className="bg-white/80 rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shrink-0">
            <User size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Sesi Aktif</p>
            <p className="text-sm font-bold text-slate-800 truncate w-full" title={user?.email || ""}>
              {user?.displayName || user?.email?.split('@')[0] || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((item) => {
          // Logic agar menu utama tidak tumpang tindih status aktifnya dengan sub-menu
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group border",
                isActive 
                  ? "bg-primary-50 text-primary-700 border-primary-200 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-primary-600 border-transparent"
              )}
            >
              <item.icon 
                size={18} 
                className={cn(
                  "transition-transform duration-300 shrink-0",
                  isActive ? "text-primary-600" : "text-slate-400 group-hover:text-primary-500"
                )} 
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200/80 relative z-10 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent transition-all duration-300"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="truncate">Keluar Sistem</span>
        </button>
      </div>
    </aside>
  );
}