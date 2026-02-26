"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; 
import { motion, Variants } from "framer-motion";
import { 
  BookHeart, Calendar, ArrowRight, 
  Sparkles, MoonStar
} from "lucide-react";
import Link from "next/link";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function DakwahPage() {
  const dakwahArticles = [
    {
      title: "Jangan Overthinking, Mulai Bergerak! Kunci Sukses Wirausaha Muda Muslim",
      date: "May 16, 2025",
      excerpt: "Terkadang keraguan adalah musuh terbesar seorang pengusaha. Dalam pandangan Islam, tawakkal harus diiringi dengan ikhtiar yang maksimal. Temukan kunci sukses memulai bisnis tanpa harus terjebak dalam overthinking.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Strategi menuju Kampus Wirausaha Islami",
      date: "May 14, 2025",
      excerpt: "Membangun ekosistem kampus yang tidak hanya berfokus pada keilmuan duniawi, tetapi juga mengintegrasikan nilai-nilai kewirausahaan yang berlandaskan syariat Islam untuk mencetak generasi Rabbani yang mandiri.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen relative selection:bg-emerald-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Emerald/Teal Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop" 
            alt="Dakwah Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
          
          {/* Emerald Green Glow for Islamic Vibe */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10 text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
              <MoonStar size={16} className="animate-pulse" /> Inspirasi Islami
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Konten Dakwah <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Simpul Tumbuh</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-md">
              Mengintegrasikan nilai-nilai spiritual ke dalam semangat kewirausahaan. Temukan inspirasi, motivasi, dan panduan bisnis berlandaskan nilai-nilai Islam.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ARTICLES GRID SECTION */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-4 flex items-center gap-3 tracking-tight">
                <BookHeart className="text-emerald-500" size={36} /> Artikel Terbaru
              </h2>
              <p className="text-slate-600 font-medium text-lg">Kumpulan tulisan untuk membekali perjalanan wirausaha Anda.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dakwahArticles.map((article, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col h-full glass-panel bg-white/70 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 w-full overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent z-10 transition-colors" />
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 border border-white">
                    <Calendar size={12} className="text-emerald-500" /> {article.date}
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                  {/* Floating Icon Icon */}
                  <div className="absolute top-0 right-6 -translate-y-1/2 w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg z-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles size={20} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-3 mt-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 mb-8 flex-grow font-medium">
                    {article.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center justify-between w-full pt-5 border-t border-slate-200/60 text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    Baca Selengkapnya
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Empty State Card (Optional/Decorative) to fill the 3rd column neatly */}
            {dakwahArticles.length === 2 && (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="hidden lg:flex flex-col h-full glass-panel bg-slate-50/50 border border-dashed border-slate-300 rounded-3xl overflow-hidden items-center justify-center text-center p-8 opacity-70"
               >
                 <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4">
                   <MoonStar size={32} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-500 mb-2">Nantikan Artikel Berikutnya</h3>
                 <p className="text-sm font-medium text-slate-400">Kami sedang menyiapkan inspirasi dan materi dakwah terbaru untuk Anda.</p>
               </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* Tambahkan Footer di sini */}
      <Footer />

    </main>
  );
}