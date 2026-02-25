"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNews } from "@/lib/firestore/news";
import { Article } from "@/types";
import { Newspaper, Calendar, Search, ArrowRight, Tag } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { Input } from "@/components/ui/Input";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function NewsListPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNews();
      const published = data.filter(item => item.isPublished);
      setNews(published);
      setFilteredNews(published);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNews(results);
  }, [search, news]);

  const formatDate = (date: any) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] bg-primary-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-slate-950)_100%)]" />
        </div>

        <div className="container-tech relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-xs font-bold text-primary-400 tracking-widest uppercase mb-6 border border-white/10">
              <Newspaper size={14} /> Information Hub
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold font-uii text-white mb-6 tracking-tight">
              Berita & <span className="text-gradient-primary">Artikel</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Informasi terkini seputar inovasi, prestasi, dan kegiatan di lingkungan Simpul Tumbuh Universitas Islam Indonesia.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & CONTENT SECTION */}
      <section className="py-20 relative bg-slate-50 dark:bg-slate-950">
        <div className="container-tech">
          {/* Futuristic Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mb-20 relative group"
          >
            <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Input 
                placeholder="Cari berita atau kategori..." 
                className="pl-14 h-14 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-500" size={24} />
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Menyelaraskan Data...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20 glass-panel max-w-lg mx-auto">
              <p className="text-slate-500 font-medium italic">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredNews.map((item) => (
                <motion.article 
                  key={item.id} 
                  variants={fadeUp}
                  className="group flex flex-col h-full glass-panel overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                >
                  <div className="h-60 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 glass-dark px-3 py-1.5 rounded-xl text-[10px] font-bold text-primary-400 border border-primary-500/20 backdrop-blur-md uppercase tracking-widest">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                      <Calendar size={14} className="text-primary-500" />
                      {formatDate(item.publishedAt)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                      {item.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                      <span className="inline-flex items-center text-sm font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform">
                        Selengkapnya <ArrowRight size={16} className="ml-2" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}