"use client";

import { useEffect, useState } from "react";
import { getCountFromServer, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Calendar, Rocket, Newspaper, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

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
        const usersColl = collection(db, "users");
        const eventsColl = collection(db, "events");
        
        const usersSnapshot = await getCountFromServer(usersColl);
        const eventsSnapshot = await getCountFromServer(query(eventsColl, where("status", "==", "open")));
        
        setStats({
          totalUsers: usersSnapshot.data().count,
          activeEvents: eventsSnapshot.data().count,
          totalTenants: 12, // Dummy
          totalNews: 5      // Dummy
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
    { label: "Total Pengguna", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { label: "Event Aktif", value: stats.activeEvents, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    { label: "Tenant Binaan", value: stats.totalTenants, icon: Rocket, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    { label: "Berita Terbit", value: stats.totalNews, icon: Newspaper, color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 font-sans pb-20"
    >
      {/* Header Admin */}
      <motion.div variants={fadeUpVariant} className="flex flex-col gap-2 glass-panel bg-white/70 p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii relative z-10 tracking-tight">Admin Overview</h1>
        <p className="text-slate-600 font-medium relative z-10 text-lg">Pantau kinerja ekosistem Simpul Tumbuh secara real-time.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUpVariant}
            className="group glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-colors ${stat.bg.split(' ')[0]}`} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${stat.bg}`}>
                <stat.icon size={26} className={stat.color} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                +12% <ArrowUpRight size={14} className="ml-1" />
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {loading ? (
                  <span className="inline-block w-16 h-10 bg-slate-200 rounded-lg animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions & Charts Placeholder */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <motion.div variants={fadeUpVariant} className="lg:col-span-2 glass-panel bg-white/70 p-8 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="w-24 h-24 bg-primary-50 border border-primary-100 rounded-[2rem] flex items-center justify-center mb-6 text-primary-500 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
            <TrendingUp size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Analitik Pertumbuhan</h3>
          <p className="text-slate-600 font-medium max-w-sm relative z-10 leading-relaxed">Grafik pendaftaran event, tren pengguna baru, dan statistik inkubasi akan divisualisasikan di sini pada pembaruan mendatang.</p>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUpVariant} className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200/80">
            <div className="p-3 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl shadow-sm">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Aktivitas Terbaru</h3>
          </div>
          
          <div className="space-y-8 relative z-10">
            {/* Connecting Line */}
            <div className="absolute left-[15px] top-2 bottom-4 w-0.5 bg-slate-200 -z-10" />
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-6 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-primary-200 transition-colors shadow-sm">
                  <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-primary-500 transition-colors" />
                </div>
                <div>
                  <p className="text-base text-slate-800 font-bold mb-1">User baru mendaftar di sistem</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{i * 2} jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
}