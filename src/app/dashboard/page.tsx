"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Calendar, Trophy, Zap, Database } from "lucide-react";
import { seedEvents } from "@/lib/firestore/events"; // Import fungsi seeding

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

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-uii-blue-900 to-uii-blue-800 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-uii-yellow-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold font-uii mb-4">
            Halo, <span className="text-uii-yellow-400">{user?.email?.split('@')[0]}</span>! 👋
          </h1>
          <p className="text-uii-blue-100 text-lg mb-8 leading-relaxed">
            Selamat datang di Dashboard Simpul Tumbuh. Mulai jelajahi event inovatif atau kelola program inkubasi Anda dari sini.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-uii-yellow-500 text-uii-blue-950 font-bold hover:bg-uii-yellow-400 border-none">
              Cari Event Baru
            </Button>
            
            {/* Tombol Seeding Sementara */}
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 gap-2"
              onClick={handleSeed}
              isLoading={isSeeding}
            >
              <Database size={16} />
              Generate Dummy Data
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Event Diikuti", value: "0", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Sertifikat", value: "0", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Poin Keaktifan", value: "0", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                Bulan Ini
              </span>
            </div>
            <p className="text-slate-500 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}