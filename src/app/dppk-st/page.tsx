"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Building2, BookOpen, Rocket, PlayCircle } from "lucide-react";

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

// Placeholder gambar untuk banner (Nanti bisa diganti dengan path gambar asli, misal: "/images/banner-1.jpg")
const bannerImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop", // Kampus / Institusi
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop", // Kolaborasi Tim
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"  // Teknologi / Inovasi
];

export default function DppkStPage() {
  const [currentImage, setCurrentImage] = useState(0);

  // Efek Auto-Slide Banner setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />

      {/* Hero Banner Bergulir (Carousel) */}
      <section className="relative pt-24 md:pt-32 pb-10 bg-slate-50 dark:bg-slate-950">
        <div className="container-tech relative z-10">
          <div className="relative w-full h-[40vh] min-h-[400px] md:h-[60vh] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 group">
            
            {/* Image Slider */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={bannerImages[currentImage]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Simpul Tumbuh Banner ${currentImage + 1}`}
              />
            </AnimatePresence>

            {/* Gradient Overlay agar elemen di atasnya tetap terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

            {/* Teks Identitas Singkat (Opsional, agar Hero tidak kosong melompong) */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold text-white font-uii mb-2 drop-shadow-md">
                  Direktorat Simpul Tumbuh
                </h1>
                <p className="text-primary-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
                  UII Innovation Lab
                </p>
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
              {bannerImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                    idx === currentImage 
                      ? "w-8 bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                      : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] translate-x-1/3 pointer-events-none" />

        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto space-y-24"
          >
            {/* Bagian 1: Tentang Simpul Tumbuh */}
            <motion.div variants={fadeUpVariant} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <Building2 size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii tracking-tight">
                  Tentang Simpul Tumbuh <br/><span className="text-primary-600 dark:text-primary-400 text-2xl md:text-3xl">(The Growth Hub)</span>
                </h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 font-medium">
                <p>
                  Simpul Tumbuh atau Growth Hub merupakan wujud nyata dari implementasi hibah Erasmus+ GITA (Growing Indonesia: a Triangular Approach) yang didapatkan oleh UII. Pengelolaan Simpul Tumbuh dilaksanakan oleh Direktorat Pembinaan dan Pengembangan Kewirausahaan. Program ini dilaksanakan sebagai bagian dari komitmen UII bersama mitra perguruan tinggi di Indonesia dan Eropa untuk mewujudkan sinergi pengembangan kewirausahaan dalam semangat <strong>"Toward Entrepreneurial University"</strong>.
                </p>
                <p>
                  Direktorat Pengembangan dan Pembinaan Kewirausahaan/Simpul Tumbuh merancang ruang tumbuh bersama (co-growing space) yang dapat menghubungkan talenta dan ide bisnis untuk dapat berkembang bersama. Simpul Tumbuh UII juga mengembangkan pembelajaran dan praktik kewirausahaan bagi mahasiswa melalui IBISMA (Inkubator Bisnis & Inovasi Bersama).
                </p>
                <p>
                  Selain itu, Simpul Tumbuh UII berperan sebagai penghubung antara sumber daya manusia, sarana prasarana, serta produk intelektual lainnya yang dimiliki UII dan sumber daya IPTEKS yang dimiliki oleh kalangan Industri (swasta, pemerintah, komunitas, dan alumni).
                </p>
                <div className="p-6 bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500 rounded-r-2xl mt-8">
                  <p className="text-primary-900 dark:text-primary-100 font-semibold m-0">
                    Project ini bertujuan untuk meningkatkan hubungan serta kerjasama antara Universitas dengan Stakeholder-nya, meningkatkan kapasitas kewirausahaan Universitas serta mahasiswa dan lulusannya.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bagian 2: Keluaran Spesifik (Cards) */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center uppercase tracking-widest text-sm text-primary-600 dark:text-primary-400">
                Keluaran Spesifik dari Project Ini
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors" />
                  <Building2 size={36} className="text-primary-500 mb-6 relative z-10" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">The Growth Hub</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">
                    Merupakan tempat fisik dimana akademisi, mahasiswa, lulusan, startups & perusahaan (bisnis/industri) berbagi ide secara bersama.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-colors" />
                  <BookOpen size={36} className="text-accent-500 mb-6 relative z-10" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">The Curriculum</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">
                    Dimana kewirausahaan masuk sebagai kurikulum mata kuliah yang berisi program pengembangan, kesempatan pembelajaran inovatif.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors" />
                  <Rocket size={36} className="text-rose-500 mb-6 relative z-10" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">The Incubator</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">
                    Yang memungkinkan mahasiswa serta tim & stakeholder untuk mengembangkan dan eksekusi ide dan jaringan di lingkungan yang aman.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bagian 3: Video Links */}
            <motion.div variants={fadeUpVariant} className="flex flex-wrap justify-center gap-4 pt-10 border-t border-slate-200 dark:border-slate-800">
               <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors">
                  <PlayCircle size={20} className="text-primary-500" />
                  Video Profil Simpul Tumbuh
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors">
                  <PlayCircle size={20} className="text-accent-500" />
                  Profil Ibisma
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors">
                  <PlayCircle size={20} className="text-cyan-500" />
                  Profil LSP
               </button>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}