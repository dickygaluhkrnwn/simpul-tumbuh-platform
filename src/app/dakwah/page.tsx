"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Tambah import Footer
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop" 
            alt="Dakwah Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          
          {/* Emerald Green Glow for Islamic Vibe */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10 text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <MoonStar size={16} /> Inspirasi Islami
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Konten Dakwah <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Simpul Tumbuh</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
              Mengintegrasikan nilai-nilai spiritual ke dalam semangat kewirausahaan. Temukan inspirasi, motivasi, dan panduan bisnis berlandaskan nilai-nilai Islam.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ARTICLES GRID SECTION */}
      <section className="py-20 md:py-32 relative bg-slate-50 dark:bg-slate-950">
        <div className="container-tech">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii mb-3 flex items-center gap-3">
                <BookHeart className="text-emerald-500" /> Artikel Terbaru
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Kumpulan tulisan untuk membekali perjalanan wirausaha Anda.</p>
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
                className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1.5">
                    <Calendar size={12} className="text-emerald-500" /> {article.date}
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                  <div className="absolute top-0 right-6 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg z-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles size={18} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-4 mb-8 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <Link href="#" className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-emerald-600 dark:text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    Read more
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tambahkan Footer di sini */}
      <Footer />

    </main>
  );
}