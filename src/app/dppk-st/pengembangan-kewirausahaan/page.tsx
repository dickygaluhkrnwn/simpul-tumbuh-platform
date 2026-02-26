"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; 
import { motion, Variants } from "framer-motion";
import { Lightbulb, Target, Rocket, TrendingUp, Users, Layers, Zap } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function PengembanganKewirausahaanPage() {
  const misiList = [
    {
      title: "Ekosistem Inovasi",
      text: "Membangun ekosistem yang kondusif untuk pengembangan inovasi dan kewirausahaan.",
      icon: Layers
    },
    {
      title: "Wirausahawan Berdampak",
      text: "Mendorong lahirnya inovator dan wirausahawan muda berdampak.",
      icon: Users
    },
    {
      title: "Inkubasi & Akselerasi",
      text: "Menyelenggarakan program inkubasi dan akselerasi bisnis yang kolaboratif dan berkelanjutan.",
      icon: Zap
    }
  ];

  return (
    <main className="min-h-screen relative selection:bg-accent-500 selection:text-slate-900 font-sans transition-colors duration-400 overflow-hidden">
      <Header />

      {/* Elemen Dekorasi Latar Belakang Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/4 left-[-10%] w-[40vw] h-[40vw] bg-accent-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-slate-900 border-b border-slate-200/50 mt-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-accent-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>

        <div className="container-tech relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl glass-dark text-accent-400 mb-6 border border-white/10 shadow-lg">
              <Lightbulb size={28} />
            </div>
            <h1 className="font-uii text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              Divisi Pengembangan <br className="hidden md:block"/> Kewirausahaan
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
              Membangun ekosistem inovasi dan kewirausahaan di lingkungan Universitas Islam Indonesia melalui pendekatan <span className="font-bold text-accent-400">enterprise creation</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-16 md:gap-24 max-w-6xl mx-auto"
          >
            {/* 1. Pengantar */}
            <motion.div variants={fadeUpVariant} className="text-center md:text-left max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium text-justify">
                Divisi Pengembangan Kewirausahaan (DPPK/ST) Universitas Islam Indonesia merupakan bagian dari The Growth Hub. Kami mendorong tumbuhnya startup berbasis teknologi, penguatan UMKM, serta hilirisasi hasil riset dan invensi sivitas akademika untuk menciptakan wirausahawan muda yang tangguh, berdampak, dan berkelanjutan.
              </p>
            </motion.div>

            {/* 2. Dua Entitas Utama (Bento Grid) */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-3xl font-bold font-uii text-slate-900 mb-10 text-center">
                Entitas Utama Divisi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Entitas 1: IBISMA */}
                <div className="group relative glass-panel bg-white/70 border border-slate-200/80 p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors" />
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-8 relative z-10 border border-rose-100 group-hover:scale-110 transition-transform">
                    <Rocket size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 relative z-10">IBISMA UII</h4>
                  <p className="text-sm font-bold text-rose-600 mb-6 uppercase tracking-wider relative z-10">Inkubator Bisnis & Inovasi Bersama</p>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                    Menjalankan beragam program inkubasi startup dan wirausaha pemula untuk memastikan pondasi bisnis yang kuat, tervalidasi, dan siap bersaing di pasar.
                  </p>
                </div>

                {/* Entitas 2: PEIAB */}
                <div className="group relative glass-panel bg-white/70 border border-slate-200/80 p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors" />
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-8 relative z-10 border border-primary-100 group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 relative z-10">PEIAB - ANGEL</h4>
                  <p className="text-sm font-bold text-primary-600 mb-6 uppercase tracking-wider relative z-10">Pusat Ekosistem Inovasi & Akselerasi Bisnis</p>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                    Berfokus pada program akselerasi bisnis serta kolaborasi lintas sektor guna menumbuhkan ekosistem wirausaha yang memberikan dampak nyata.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3. Visi Section (Lebar Penuh agar menjadi pemisah visual yang kuat) */}
            <motion.div variants={fadeUpVariant} className="relative glass-panel bg-white/70 border border-slate-200/80 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center shadow-lg overflow-hidden">
              {/* Efek Ambient Glow */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-accent-500/10 to-primary-500/10 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <Target size={56} className="mx-auto text-accent-500 mb-8" />
                <h3 className="text-sm font-bold text-primary-600 tracking-[0.2em] uppercase mb-6">Visi Kami</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 leading-relaxed max-w-4xl mx-auto font-uii text-justify md:text-center">
                  "Menjadi inkubator teknologi dan bisnis yang unggul dalam mendukung inovasi dan kewirausahaan berkelanjutan di Indonesia."
                </p>
              </div>
            </motion.div>

            {/* 4. Misi Section (3 Kolom Card) */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-3xl font-bold font-uii text-slate-900 mb-12 text-center">
                Misi Kami
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {misiList.map((misi, index) => {
                  const Icon = misi.icon; 
                  return (
                    <div key={index} className="glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute -right-6 -top-6 w-32 h-32 bg-slate-100 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0 opacity-50" />
                      <div className="w-14 h-14 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={28} className="text-accent-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{misi.title}</h4>
                      <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                        {misi.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- Menambahkan Footer Global di sini --- */}
      <Footer />
    </main>
  );
}