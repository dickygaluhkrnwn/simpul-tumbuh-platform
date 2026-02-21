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
        { name: "Data Tenant", href: "/admin/tenants", icon: Rocket }, // Startup/Inkubasi
        { name: "Peserta", href: "/admin/users", icon: Users },
      ]
    },
    {
      category: "Content Management (CMS)",
      items: [
        { name: "Edit Beranda", href: "/admin/cms/home", icon: LayoutTemplate },
        { name: "Berita & Artikel", href: "/admin/news", icon: Newspaper },
      ]
    },
    {
      category: "Sistem",
      items: [
        { name: "Pengaturan", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col z-50 text-slate-300">
      {/* Admin Sidebar Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-rose-600 rounded-xl shadow-lg shadow-rose-900/20 text-white">
          <ShieldCheck size={20} />
        </div>
        <div>
          <span className="font-bold text-base text-white tracking-tight block">
            Admin Panel
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
            Simpul Tumbuh
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="px-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
              {group.category}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-rose-600 text-white shadow-md shadow-rose-900/20" 
                        : "hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}