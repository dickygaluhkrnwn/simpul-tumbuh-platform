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
    { label: "Event Diikuti", value: "0", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { label: "Sertifikat", value: "0", icon: Trophy, color: "text-accent-600", bg: "bg-accent-50 border-accent-100" },
    { label: "Poin Keaktifan", value: "0", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 pb-20 w-full"
    >
      {/* 1. WELCOME BANNER (Light Glassmorphism) */}
      <motion.div variants={fadeUpVariant} className="relative overflow-hidden rounded-[2.5rem] glass-panel bg-white/70 p-8 md:p-12 lg:p-16 shadow-xl border border-slate-200/80 w-full">
        {/* Glow & Grid Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-bold tracking-widest uppercase mb-6 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            Sesi Aktif
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-uii mb-6 tracking-tight leading-tight text-slate-900">
            Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              {user?.displayName || user?.email?.split('@')[0]}
            </span>! 👋
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-medium">
            Selamat datang di portal ekosistem <strong className="text-slate-800">Simpul Tumbuh UII</strong>. Mulai jelajahi event inovatif, tingkatkan skill, dan kembangkan ide bisnis Anda dari sini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-primary-500/20 h-14 px-8 text-base">
              <Search size={18} />
              Jelajah Event Baru
            </Button>
            
            {/* Tombol Seeding Sementara */}
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/50 border-slate-200 text-slate-700 hover:text-primary-600 hover:bg-white hover:border-primary-200 gap-2 backdrop-blur-sm h-14 px-8 text-base shadow-sm"
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
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
        {stats.map((stat, idx) => (
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
              <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-widest border border-slate-200">
                Bulan Ini
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. RECENT ACTIVITY (Placeholder) */}
      <motion.div variants={fadeUpVariant} className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2rem] border border-slate-200/80 shadow-sm relative overflow-hidden w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-uii tracking-tight">Aktivitas Terkini</h3>
            <p className="text-slate-500 font-medium text-sm mt-1">Ringkasan kegiatan Anda di ekosistem IBISMA & Simpul Tumbuh.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 bg-white">
            Lihat Riwayat <ArrowRight size={16} />
          </Button>
        </div>

        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400 border border-slate-200 shadow-inner">
            <Calendar size={36} />
          </div>
          <p className="text-slate-600 font-bold text-lg">Belum ada aktivitas yang tercatat.</p>
          <p className="text-slate-500 font-medium mt-2">Mulai perjalanan Anda dengan mendaftar event pertama!</p>
        </div>
      </motion.div>

    </motion.div>
  );
}