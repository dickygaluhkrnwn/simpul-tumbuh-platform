"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { getHomepageContent, defaultHomepageContent, HomepageContent, Section } from "@/lib/firestore/content";
import HeroRender from "@/components/sections/HeroRender";
import AboutRender from "@/components/sections/AboutRender";
import StatsRender from "@/components/sections/StatsRender";
import FeaturesRender from "@/components/sections/FeaturesRender";
import { getNews } from "@/lib/firestore/news";
import { Article } from "@/types";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Home() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, newsData] = await Promise.all([
          getHomepageContent(),
          getNews()
        ]);
        setContent(homeData);
        setNews(newsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSection = (section: Section) => {
    if (!section.isVisible) return null;
    switch (section.type) {
      case "hero": return <HeroRender key={section.id} data={section.data} />;
      case "about": return <AboutRender key={section.id} data={section.data as any} />;
      case "stats": return <StatsRender key={section.id} data={section.data} />;
      case "features": return <FeaturesRender key={section.id} data={section.data} />;
      default: return null;
    }
  };

  const formatDate = (date: any) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 relative selection:bg-accent-500 selection:text-slate-950 font-sans transition-colors duration-300">
      <Header />
      
      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          {/* Modern Loader ala Tech Platform */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-500/30 rounded-full" />
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="mt-4 text-primary-400 font-medium tracking-widest text-sm uppercase animate-pulse">Inisialisasi Sistem...</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Render Sections Dinamis (Hero, Stats, Features) */}
          {content.sections.map((section) => renderSection(section))}

          {/* --- SECTION BERITA TERBARU (REDESIGNED TECH VIBE) --- */}
          <section className="relative py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
            
            <div className="container-tech relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold mb-3">
                    <Newspaper size={20} />
                    <span className="uppercase tracking-widest text-xs font-semibold">Kabar Terbaru</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii tracking-tight">
                    Sorotan Simpul Tumbuh
                  </h2>
                </div>
                <Link href="/news">
                  <Button variant="outline" className="gap-2 hidden md:flex">
                    Lihat Semua Berita <ArrowRight size={16}/>
                  </Button>
                </Link>
              </motion.div>

              {news.length === 0 ? (
                <div className="text-center py-20 text-slate-500">Belum ada berita terbaru.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {news.map((item, index) => (
                    <motion.article 
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group flex flex-col h-full glass-panel overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300 rounded-2xl cursor-pointer"
                    >
                      {/* Image Container */}
                      <div className="relative h-56 w-full overflow-hidden mb-5 bg-slate-200 dark:bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <img 
                          src={item.image || "/images/placeholder-news.jpg"} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute top-4 left-4 z-20 glass-dark px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/10 backdrop-blur-md">
                          {item.category}
                        </div>
                      </div>
                      
                      {/* Content Container */}
                      <div className="p-6 pt-0 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs mb-3">
                          <Calendar size={14} className="text-accent-500" />
                          <span className="font-medium">{formatDate(item.publishedAt)}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                          {item.excerpt}
                        </p>
                        <span className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform mt-auto">
                          Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
              
              <div className="mt-10 md:hidden">
                <Link href="/news">
                  <Button variant="outline" className="w-full justify-center gap-2">
                    Lihat Semua Berita <ArrowRight size={16}/>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}