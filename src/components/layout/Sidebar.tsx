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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col z-40 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-primary-500/5 blur-3xl pointer-events-none" />

      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-uii font-bold text-lg text-white tracking-tight leading-none">
              Simpul Tumbuh
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-1 text-primary-500">
              User Portal
            </span>
          </div>
        </Link>
      </div>

      {/* User Info (Mini) */}
      <div className="px-5 py-6 relative z-10">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
            <User size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Sesi Aktif</p>
            <p className="text-sm font-bold text-slate-200 truncate w-full" title={user?.email || ""}>
              {user?.displayName || user?.email?.split('@')[0] || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group",
                isActive 
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent"
              )}
            >
              <item.icon 
                size={18} 
                className={cn(
                  "transition-transform duration-300",
                  isActive ? "text-primary-500" : "text-slate-500 group-hover:text-slate-400"
                )} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 relative z-10 bg-slate-950">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 border border-transparent transition-all duration-300"
        >
          <LogOut size={18} />
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
}