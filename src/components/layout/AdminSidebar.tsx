"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Newspaper, 
  Rocket,
  LogOut, 
  ShieldCheck,
  LayoutTemplate,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const menuItems = [
    { 
      category: "Utama",
      items: [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
      ]
    },
    {
      category: "Manajemen Program",
      items: [
        { name: "Kelola Event", href: "/admin/events", icon: Calendar },
        { name: "Data Tenant", href: "/admin/tenants", icon: Rocket }, 
        { name: "Peserta", href: "/admin/users", icon: Users },
      ]
    },
    {
      category: "Sistem & Konten",
      items: [
        { name: "Edit Beranda", href: "/admin/cms/home", icon: LayoutTemplate },
        { name: "Berita & Artikel", href: "/admin/news", icon: Newspaper },
        { name: "Pengaturan", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col z-50 text-slate-300 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl pointer-events-none" />

      {/* Admin Sidebar Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-lg text-white">
          <ShieldCheck size={20} className="text-primary-500" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white tracking-tight leading-none">
            Admin Panel
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">
            Simpul Tumbuh
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-2">
              {group.category}
              <span className="h-px flex-grow bg-slate-800" />
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => {
                // Precise active matching for main routes, and partial for sub-routes
                const isActive = item.href === '/admin' 
                  ? pathname === '/admin' 
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group border",
                      isActive 
                        ? "bg-primary-600 text-white border-primary-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                        : "border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    )}
                  >
                    <item.icon 
                      size={18} 
                      className={cn(
                        "transition-transform duration-300",
                        isActive ? "text-white" : "text-slate-500 group-hover:text-slate-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 relative z-10 bg-slate-950">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 border border-transparent transition-all duration-300"
        >
          <LogOut size={18} />
          Akhiri Sesi
        </button>
      </div>
    </aside>
  );
}