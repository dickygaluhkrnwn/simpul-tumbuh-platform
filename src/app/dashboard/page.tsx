"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Calendar, Trophy, Zap, Database, Search, ArrowRight } from "lucide-react";
import { seedEvents } from "@/lib/firestore/events";
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

export default function DashboardPage() {
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    if (confirm("Apakah Anda yakin ingin mengisi database dengan Data Dummy?")) {
      await seedEvents();
      alert("Database berhasil diisi! Silakan cek menu Jelajah Event.");
    }
    setIsSeeding(false);
  };

  const stats = [
    { label: "Event Diikuti", value: "0", icon: Calendar, color: "text-primary-500", bg: "bg-primary-500/10 border-primary-500/20" },
    { label: "Sertifikat", value: "0", icon: Trophy, color: "text-accent-500", bg: "bg-accent-500/10 border-accent-500/20" },
    { label: "Poin Keaktifan", value: "0", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 pb-20"
    >
      {/* 1. WELCOME BANNER */}
      <motion.div variants={fadeUpVariant} className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 md:p-12 lg:p-16 text-white shadow-2xl border border-slate-800">
        {/* Glow & Grid Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sesi Aktif
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-uii mb-4 tracking-tight leading-tight">
            Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              {user?.displayName || user?.email?.split('@')[0]}
            </span>! 👋
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed font-light max-w-xl">
            Selamat datang di portal ekosistem <strong className="text-white">Simpul Tumbuh UII</strong>. Mulai jelajahi event inovatif, tingkatkan skill, dan kembangkan ide bisnis Anda dari sini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Search size={18} />
              Jelajah Event Baru
            </Button>
            
            {/* Tombol Seeding Sementara - Dibuat tidak terlalu mencolok (Outline) */}
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2 backdrop-blur-sm"
              onClick={handleSeed}
              isLoading={isSeeding}
            >
              <Database size={18} />
              Generate Data Dummy
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 2. QUICK STATS GRID */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUpVariant}
            className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-colors ${stat.bg.split(' ')[0]}`} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${stat.bg}`}>
                <stat.icon size={26} className={stat.color} />
              </div>
              <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                Bulan Ini
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. RECENT ACTIVITY (Placeholder) */}
      <motion.div variants={fadeUpVariant} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-uii">Aktivitas Terkini</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ringkasan kegiatan Anda di ekosistem IBISMA & Simpul Tumbuh.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Lihat Riwayat <ArrowRight size={16} />
          </Button>
        </div>

        <div className="text-center py-10">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
            <Calendar size={32} />
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Belum ada aktivitas yang tercatat.</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Mulai dengan mendaftar event pertama Anda!</p>
        </div>
      </motion.div>

    </motion.div>
  );
}