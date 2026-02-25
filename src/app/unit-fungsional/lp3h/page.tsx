"use client";

import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { HardHat, ArrowLeft, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Lp3hPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 flex flex-col">
      <Header />

      {/* Konten Utama - Full Screen Centered */}
      <section className="relative flex-grow flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-950 text-white">
        
        {/* Dekorasi Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-fuchsia-500/10 rounded-full blur-[100px] animate-float" />
        </div>

        <div className="container-tech relative z-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full max-w-2xl"
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-10 md:p-16 rounded-[2.5rem] shadow-2xl text-center overflow-hidden group">
              
              {/* Efek kilauan di sudut kartu */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-colors duration-500" />
              
              {/* Ikon Animasi */}
              <div className="relative mb-8 inline-flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 text-purple-500/20 blur-sm"
                >
                  <Cpu size={100} />
                </motion.div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/50 relative z-10">
                  <HardHat size={40} className="text-white" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-2 -left-2 text-fuchsia-400 z-20"
                >
                  <Sparkles size={24} />
                </motion.div>
              </div>

              {/* Teks Konten */}
              <h1 className="text-3xl md:text-5xl font-bold font-uii mb-4 text-white drop-shadow-md">
                Halaman Sedang <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Dikembangkan</span>
              </h1>
              
              <h2 className="text-lg md:text-xl font-bold text-slate-300 mb-6 tracking-wide">
                Kami sedang bekerja keras untuk memberikan pengalaman terbaik
              </h2>
              
              <p className="text-slate-400 font-medium leading-relaxed mb-10 max-w-lg mx-auto">
                Tim pengembangan kami sedang membangun fitur-fitur baru yang menakjubkan. Halaman <strong className="text-slate-200">Lembaga Pendamping Proses Produk Halal (LP3H UII)</strong> ini akan segera hadir dengan tampilan dan fungsionalitas yang lebih baik. Terima kasih atas kesabaran Anda!
              </p>

              {/* Tombol Kembali */}
              <Link href="/">
                <Button size="lg" className="h-14 px-8 text-base font-bold bg-purple-600 hover:bg-purple-500 border-none text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-105 transition-transform">
                  <ArrowLeft size={20} className="mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}