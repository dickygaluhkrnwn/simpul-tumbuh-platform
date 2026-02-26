"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Tambahkan Footer Global
import { motion } from "framer-motion";
import { Hammer, ArrowLeft, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ErasmusBuildPage() {
  return (
    <main className="min-h-screen relative font-sans transition-colors duration-400 flex flex-col selection:bg-amber-500 selection:text-slate-900">
      <Header />

      {/* Konten Utama - Full Screen Centered */}
      <section className="relative flex-grow flex items-center justify-center pt-36 pb-20 overflow-hidden bg-slate-950 text-white">
        
        {/* Dekorasi Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-amber-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-orange-500/10 rounded-full blur-[100px] animate-float" />
        </div>

        <div className="container-tech relative z-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full max-w-3xl"
          >
            {/* Glassmorphism Card */}
            <div className="relative glass-dark border border-white/10 p-10 md:p-20 rounded-[3rem] shadow-2xl text-center overflow-hidden group">
              
              {/* Efek kilauan di sudut kartu */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/30 rounded-full blur-2xl group-hover:bg-amber-500/40 transition-colors duration-500 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Ikon Animasi */}
              <div className="relative mb-10 inline-flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 text-amber-500/20 blur-[2px]"
                >
                  <Settings size={120} />
                </motion.div>
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/50 relative z-10">
                  <Hammer size={40} className="text-white" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute -top-3 -right-3 text-yellow-300 z-20"
                >
                  <Sparkles size={28} />
                </motion.div>
              </div>

              {/* Teks Konten Sesuai Web Asli */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-uii mb-6 text-white drop-shadow-md tracking-tight leading-tight">
                Halaman Sedang <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Dikembangkan</span>
              </h1>
              
              <h2 className="text-lg md:text-2xl font-medium text-slate-300 mb-8 tracking-wide">
                Kami sedang bekerja keras untuk memberikan pengalaman terbaik.
              </h2>
              
              <p className="text-slate-400 font-medium leading-relaxed mb-12 max-w-xl mx-auto text-base md:text-lg">
                Tim pengembangan kami sedang membangun fitur-fitur baru yang menakjubkan. Halaman ini akan segera hadir dengan tampilan dan fungsionalitas yang lebih baik. Terima kasih atas kesabaran Anda!
              </p>

              {/* Tombol Kembali */}
              <Link href="/">
                <Button size="lg" className="h-14 px-8 text-base font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 border-none shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all rounded-full">
                  <ArrowLeft size={20} className="mr-2 text-slate-900" />
                  Kembali ke Beranda
                </Button>
              </Link>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Tambahkan Footer Global */}
      <Footer />
    </main>
  );
}