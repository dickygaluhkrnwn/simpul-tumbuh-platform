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
    { label: "Total Pengguna", value: stats.totalUsers, icon: Users, color: "text-primary-500", bg: "bg-primary-500/10 border-primary-500/20" },
    { label: "Event Aktif", value: stats.activeEvents, icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Tenant Binaan", value: stats.totalTenants, icon: Rocket, color: "text-accent-500", bg: "bg-accent-500/10 border-accent-500/20" },
    { label: "Berita Terbit", value: stats.totalNews, icon: Newspaper, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 font-sans pb-20"
    >
      <motion.div variants={fadeUpVariant} className="flex flex-col gap-2 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii relative z-10">Admin Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium relative z-10">Pantau kinerja ekosistem Simpul Tumbuh secara real-time.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUpVariant}
            className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-colors ${stat.bg.split(' ')[0]}`} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${stat.bg}`}>
                <stat.icon size={26} className={stat.color} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                +12% <ArrowUpRight size={14} className="ml-1" />
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {loading ? (
                  <span className="inline-block w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
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
        <motion.div variants={fadeUpVariant} className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl flex items-center justify-center mb-6 text-primary-500 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
            <TrendingUp size={36} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Analitik Pertumbuhan</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm relative z-10">Grafik pendaftaran event, tren pengguna baru, dan statistik inkubasi akan divisualisasikan di sini pada pembaruan mendatang.</p>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUpVariant} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
              <Activity size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aktivitas Terbaru</h3>
          </div>
          
          <div className="space-y-6 relative z-10">
            {/* Connecting Line */}
            <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-5 group cursor-default">
                <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-primary-100 dark:border-primary-900/50 flex items-center justify-center flex-shrink-0 group-hover:border-primary-500 transition-colors">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold mb-0.5">User baru mendaftar di sistem</p>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{i * 2} jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
}