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
    <aside className="sticky top-0 left-0 h-screen w-64 shrink-0 glass-panel bg-white/80 border-r border-slate-200/80 hidden md:flex flex-col z-40 text-slate-700 transition-colors duration-300 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl pointer-events-none" />

      {/* Admin Sidebar Header */}
      <div className="p-6 border-b border-slate-200/80 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 border border-primary-200 rounded-xl shadow-lg text-white shrink-0">
          <ShieldCheck size={20} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-bold text-lg text-slate-900 tracking-tight leading-none truncate">
            Admin Panel
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-600 mt-1 truncate">
            Simpul Tumbuh
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
              {group.category}
              <span className="h-px flex-grow bg-slate-200" />
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
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group border",
                      isActive 
                        ? "bg-primary-600 text-white border-primary-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                        : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-primary-600"
                    )}
                  >
                    <item.icon 
                      size={18} 
                      className={cn(
                        "transition-transform duration-300 shrink-0",
                        isActive ? "text-white" : "text-slate-400 group-hover:text-primary-500"
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200/80 relative z-10 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent transition-all duration-300"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="truncate">Akhiri Sesi</span>
        </button>
      </div>
    </aside>
  );
}