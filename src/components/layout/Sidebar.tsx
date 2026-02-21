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
    <aside className="fixed left-0 top-0 h-screen w-64 glass-dark border-r border-white/10 hidden md:flex flex-col z-40">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-uii-blue-500 to-uii-blue-700 rounded-lg shadow-lg shadow-uii-blue-500/30">
            <Zap className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="font-uii font-bold text-lg text-white tracking-tight">
            Simpul Tumbuh
          </span>
        </Link>
      </div>

      {/* User Info (Mini) */}
      <div className="px-6 py-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-uii-blue-200 uppercase tracking-wider mb-1">Login Sebagai</p>
          <p className="text-sm font-bold text-white truncate w-full" title={user?.email || ""}>
            {user?.email || "User"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-uii-blue-600 text-white shadow-lg shadow-uii-blue-600/20" 
                  : "text-uii-blue-200 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}