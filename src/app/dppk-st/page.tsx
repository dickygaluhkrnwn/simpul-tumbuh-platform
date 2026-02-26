"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Import Footer ditambahkan di sini
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Building2, BookOpen, Rocket, Target, ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

const bannerImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop", // Kampus / Institusi
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop", // Kolaborasi Tim
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"  // Teknologi / Inovasi
];

export default function DppkStPage() {
  const [currentImage, setCurrentImage] = useState(0);

  // Efek Auto-Slide Banner setiap 6 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen relative selection:bg-accent-500 selection:text-slate-900 font-sans transition-colors duration-400 overflow-hidden">
      <Header />

      {/* Elemen Dekorasi Latar Belakang Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/4 left-[-10%] w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      {/* --- FULL-WIDTH HERO BANNER --- */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden bg-slate-900 border-b border-slate-200/50 mt-20">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={bannerImages[currentImage]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`Banner DPPK ST ${currentImage + 1}`}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="absolute bottom-12 md:bottom-20 left-0 w-full z-10">
          <div className="container-tech">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-xs md:text-sm font-bold text-white tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
                <Target size={16} className="text-accent-400" /> Profil Direktorat
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-uii tracking-tight mb-4 drop-shadow-lg leading-tight">
                Direktorat Pembinaan & Pengembangan Kewirausahaan
              </h1>
              <p className="text-lg md:text-2xl text-slate-200 font-medium drop-shadow-md">
                (Simpul Tumbuh UII / The Growth Hub)
              </p>
            </motion.div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-500 shadow-sm",
                idx === currentImage ? "w-8 bg-primary-500" : "w-2 bg-white/50 hover:bg-white"
              )}
            />
          ))}
        </div>
      </section>

      {/* --- KONTEN UTAMA --- */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto space-y-24"
          >
            
            {/* Bagian 1: Pengantar & Video (Split Screen Layout) */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Kiri: Teks & Logo */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                  {/* Logo Placeholder (Persegi Panjang) */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200/80 inline-block shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" 
                      alt="European Commission" 
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-uii tracking-tight">
                    Erasmus+ GITA Project
                  </h2>
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8 text-justify">
                  <strong className="text-slate-900">Simpul Tumbuh (The Growth Hub)</strong> merupakan wujud nyata implementasi dari Hibah ERASMUS+ GITA Project (Growing Indonesia a Triangular Approach) yang didapatkan oleh Universitas Islam Indonesia dengan Konsep <em>Toward Entrepreneurial University</em>.
                </p>

                {/* Quick Links / Sub-Unit Profiles */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/unit-fungsional/ibisma">
                    <Button variant="primary" className="gap-2 shadow-[0_0_15px_var(--theme-glow-blue)] rounded-full">
                      Profil IBISMA <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="/unit-fungsional/lsp">
                    <Button variant="outline" className="gap-2 bg-white/50 border-slate-300 hover:text-primary-600 rounded-full">
                      Profil LSP <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Kanan: YouTube Video Embed */}
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-video rounded-[2rem] p-2 glass-panel border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-500/10 blur-3xl rounded-[2rem] pointer-events-none transition-all group-hover:bg-primary-500/20" />
                  
                  {/* Badge Label Video */}
                  <div className="absolute -top-4 -right-4 z-20 bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-primary-400">
                    <Video size={14} className="animate-pulse" /> Video Profil
                  </div>

                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/ScPK80SDBu4?rel=0&showinfo=0" 
                    title="Profil Simpul Tumbuh UII" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="relative z-10 w-full h-full rounded-2xl bg-slate-900 object-cover"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Bagian 2: Tentang Simpul Tumbuh (Detail) */}
            <motion.div variants={fadeUpVariant} className="glass-panel bg-white/60 border border-slate-200/60 p-8 md:p-12 lg:p-16 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-10 relative z-10">
                <div className="md:w-1/3">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center mb-6 shadow-sm">
                    <Building2 size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii tracking-tight mb-2">
                    Tentang <br /> Simpul Tumbuh
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
                </div>
                
                <div className="md:w-2/3 space-y-6 text-slate-700 text-lg leading-relaxed font-medium text-justify">
                  <p>
                    Simpul Tumbuh atau Growth Hub merupakan wujud nyata dari implementasi hibah Erasmus+ GITA (Growing Indonesia: a Triangular Approach) yang didapatkan oleh UII. Pengelolaan Simpul Tumbuh dilaksanakan oleh Direktorat Pembinaan dan Pengembangan Kewirausahaan. Program ini dilaksanakan sebagai bagian dari komitmen UII bersama mitra perguruan tinggi di Indonesia dan Eropa untuk mewujudkan sinergi pengembangan kewirausahaan dalam semangat <strong>"Toward Entrepreneurial University"</strong>.
                  </p>
                  <p>
                    Direktorat Pengembangan dan Pembinaan Kewirausahaan/Simpul Tumbuh merancang ruang tumbuh bersama (co-growing space) yang dapat menghubungkan talenta dan ide bisnis untuk dapat berkembang bersama. Simpul Tumbuh UII juga mengembangkan pembelajaran dan praktik kewirausahaan bagi mahasiswa melalui IBISMA (Inkubator Bisnis & Inovasi Bersama). Selain itu, Simpul Tumbuh UII berperan sebagai penghubung antara sumber daya manusia, sarana prasarana, serta produk intelektual lainnya yang dimiliki UII dan sumber daya IPTEKS yang dimiliki oleh kalangan Industri (swasta, pemerintah, komunitas, dan alumni).
                  </p>
                  
                  <div className="p-6 bg-white/80 border border-slate-200 shadow-sm rounded-2xl mt-8 flex gap-4 items-start text-left">
                    <Target size={24} className="text-accent-500 shrink-0 mt-1" />
                    <p className="text-slate-800 font-bold m-0 text-base leading-snug">
                      Project ini bertujuan untuk meningkatkan hubungan serta kerjasama antara Universitas dengan Stakeholder-nya, meningkatkan kapasitas kewirausahaan Universitas serta mahasiswa dan lulusannya.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bagian 3: Keluaran Spesifik (Cards) */}
            <motion.div variants={fadeUpVariant} className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-900 font-uii mb-12 text-center">
                Keluaran Spesifik dari Project Ini
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors" />
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-6 relative z-10 border border-primary-100 group-hover:scale-110 transition-transform">
                    <Building2 size={28} className="text-primary-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">The Growth Hub</h4>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                    Merupakan tempat fisik dimana akademisi, mahasiswa, lulusan, startups & perusahaan (bisnis/industri) berbagi ide secara bersama.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-500/10 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-colors" />
                  <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mb-6 relative z-10 border border-accent-100 group-hover:scale-110 transition-transform">
                    <BookOpen size={28} className="text-accent-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">The Curriculum</h4>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                    Dimana kewirausahaan masuk sebagai kurikulum mata kuliah yang berisi program pengembangan, kesempatan pembelajaran inovatif.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors" />
                  <div className="w-14 h-14 rounded-xl bg-rose-50 flex items-center justify-center mb-6 relative z-10 border border-rose-100 group-hover:scale-110 transition-transform">
                    <Rocket size={28} className="text-rose-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">The Incubator</h4>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-justify">
                    Yang memungkinkan mahasiswa serta tim & stakeholder untuk mengembangkan dan eksekusi ide dan jaringan di lingkungan yang aman.
                  </p>
                </div>
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