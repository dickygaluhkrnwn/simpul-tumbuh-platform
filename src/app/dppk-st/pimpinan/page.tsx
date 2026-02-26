"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Import Footer
import { motion, Variants } from "framer-motion";
import { Mail, Briefcase, Award } from "lucide-react";

// Mendefinisikan tipe Variants secara eksplisit agar tidak error di TypeScript
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

const leaders = [
  {
    name: "Dr. Ir. Arif Wismadi, M.Sc.",
    role: "Direktur Pembinaan & Pengembangan Kewirausahaan / Simpul Tumbuh",
    email: "wismadi@uii.ac.id",
    // Placeholder gambar profesional pria (Direktur)
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    isDirector: true
  },
  {
    name: "Bagus Panuntun, S.E., MBA.",
    role: "Kepala Divisi Pengembangan Kewirausahaan / Inkubasi Bisnis & Inovasi Bersama (IBISMA)",
    email: "bagus.panuntun@uii.ac.id",
    // Placeholder gambar profesional pria (Kepala Divisi)
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    isDirector: false
  },
  {
    name: "Dr. Dwi Handayani, S.T., M.Sc.",
    role: "Kepala Divisi Pendidikan Lanjut / Lembaga Sertifikasi Profesi",
    email: "dwihandayani@uii.ac.id",
    // Placeholder gambar profesional wanita (Kepala Divisi)
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    isDirector: false
  }
];

export default function PimpinanPage() {
  const director = leaders.find(l => l.isDirector);
  const divisionHeads = leaders.filter(l => !l.isDirector);

  return (
    <main className="min-h-screen relative selection:bg-accent-500 selection:text-slate-900 font-sans transition-colors duration-400 overflow-hidden">
      <Header />

      {/* Elemen Dekorasi Latar Belakang Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/4 left-[-10%] w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-slate-900 border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-primary-600/20 rounded-full blur-[120px] animate-pulse-glow" />
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
              <Award size={28} />
            </div>
            <h1 className="font-uii text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
              Pejabat Struktural
            </h1>
            <p className="text-xl md:text-3xl text-primary-400 font-bold tracking-wide mb-6">
              Periode 2022 - 2026
            </p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
              Direktorat Pembinaan & Pengembangan Kewirausahaan / Simpul Tumbuh Universitas Islam Indonesia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profil Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-16 md:gap-24"
          >
            {/* DIREKTUR (Card Besar di Tengah) */}
            {director && (
              <motion.div variants={fadeUpVariant} className="flex justify-center">
                <div className="group relative w-full max-w-md glass-panel bg-white/70 border border-slate-200/80 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 z-20" />
                  
                  {/* Image Container */}
                  <div className="relative h-80 w-full overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-80" />
                    <img 
                      src={director.image} 
                      alt={director.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute bottom-4 left-6 right-6 z-20">
                      <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{director.name}</h2>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {director.role}
                      </p>
                    </div>
                    
                    <a 
                      href={`mailto:${director.email}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary-50 text-primary-700 font-bold hover:bg-primary-100 hover:text-primary-800 transition-colors border border-primary-100"
                    >
                      <Mail size={18} />
                      {director.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* KEPALA DIVISI (2 Card Berdampingan) */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
              {divisionHeads.map((head, index) => (
                <div key={index} className="group relative w-full glass-panel bg-white/70 border border-slate-200/80 rounded-3xl shadow-lg hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-accent-600 z-20" />
                  
                  {/* Image Container */}
                  <div className="relative h-72 w-full overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-80" />
                    <img 
                      src={head.image} 
                      alt={head.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute bottom-4 left-6 right-6 z-20">
                      <h2 className="text-xl font-bold text-white mb-1 drop-shadow-md">{head.name}</h2>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
                    <div className="flex items-start gap-3 flex-grow">
                      <Briefcase className="w-5 h-5 text-accent-500 shrink-0 mt-1" />
                      <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                        {head.role}
                      </p>
                    </div>
                    
                    <a 
                      href={`mailto:${head.email}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-accent-50 text-accent-700 font-bold hover:bg-accent-100 hover:text-accent-800 transition-colors border border-accent-100 mt-auto"
                    >
                      <Mail size={18} />
                      {head.email}
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Footer ditambahkan di sini */}
      <Footer />
    </main>
  );
}