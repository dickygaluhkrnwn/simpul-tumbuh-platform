"use client";

import { useEffect, useState } from "react";
import { getCountFromServer, collection, query, where } from "firebase/firestore"; // Gunakan getCountFromServer untuk efisiensi
import { db } from "@/lib/firebase";
import { Users, Calendar, Rocket, Newspaper, TrendingUp, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    totalTenants: 0,
    totalNews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Menggunakan getCountFromServer (lebih hemat bandwidth & cepat daripada ambil semua docs)
        const usersColl = collection(db, "users");
        const eventsColl = collection(db, "events");
        
        // Contoh query sederhana
        const usersSnapshot = await getCountFromServer(usersColl);
        const eventsSnapshot = await getCountFromServer(query(eventsColl, where("status", "==", "open")));
        
        // Simulasikan data lain dulu jika koleksi belum ada
        setStats({
          totalUsers: usersSnapshot.data().count,
          activeEvents: eventsSnapshot.data().count,
          totalTenants: 12, // Dummy sementara
          totalNews: 5      // Dummy sementara
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Pengguna", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Event Aktif", value: stats.activeEvents, icon: Calendar, color: "text-green-600", bg: "bg-green-50" },
    { label: "Tenant Binaan", value: stats.totalTenants, icon: Rocket, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Berita Terbit", value: stats.totalNews, icon: Newspaper, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-uii">Admin Overview</h1>
        <p className="text-slate-500">Pantau kinerja ekosistem Simpul Tumbuh secara real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12% <ArrowUpRight size={12} className="ml-1" />
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {loading ? "..." : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
            <TrendingUp size={32} />
          </div>
          <h3 className="text-slate-900 font-bold mb-1">Analitik Pertumbuhan</h3>
          <p className="text-slate-400 text-sm">Grafik pendaftaran event & user baru akan muncul di sini.</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Aktivitas Terbaru</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-slate-300 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-800 font-medium">User baru mendaftar</p>
                  <p className="text-xs text-slate-400">2 menit yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}