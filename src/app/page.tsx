"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { getHomepageContent, defaultHomepageContent, HomepageContent, Section } from "@/lib/firestore/content";
import HeroRender from "@/components/sections/HeroRender";
import StatsRender from "@/components/sections/StatsRender";
import FeaturesRender from "@/components/sections/FeaturesRender";
// Tambahan Import
import { getNews } from "@/lib/firestore/news"; // Import service berita
import { Article } from "@/types";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

export default function Home() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [news, setNews] = useState<Article[]>([]); // State untuk berita
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, newsData] = await Promise.all([
          getHomepageContent(),
          getNews() // Ambil berita terbaru
        ]);
        setContent(homeData);
        setNews(newsData.slice(0, 3)); // Ambil 3 berita terbaru saja
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
      case "stats": return <StatsRender key={section.id} data={section.data} />;
      case "features": return <FeaturesRender key={section.id} data={section.data} />;
      default: return null;
    }
  };

  // Helper date format
  const formatDate = (date: any) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-uii-yellow-500 selection:text-uii-blue-950 font-sans">
      <Header />
      
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-uii-blue-600 border-t-white" />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Render Sections Dinamis */}
          {content.sections.map((section) => renderSection(section))}

          {/* --- SECTION BERITA TERBARU (DINAMIS) --- */}
          <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-uii-yellow-600 font-bold mb-2">
                    <Newspaper size={20} />
                    <span className="uppercase tracking-widest text-xs">Kabar Terbaru</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii">
                    Sorotan Simpul Tumbuh
                  </h2>
                </div>
                <Link href="/news">
                  <Button variant="outline" className="gap-2 hidden md:flex">
                    Lihat Semua Berita <ArrowRight size={16}/>
                  </Button>
                </Link>
              </div>

              {news.length === 0 ? (
                <div className="text-center py-10 text-slate-500">Belum ada berita terbaru.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {news.map((item) => (
                    <article key={item.id} className="flex flex-col group cursor-pointer h-full">
                      <div className="relative h-60 w-full overflow-hidden rounded-2xl mb-5 bg-slate-200">
                        <div className="absolute inset-0 bg-uii-blue-900/10 group-hover:bg-transparent transition-colors z-10" />
                        <img 
                          src={item.image || "/images/placeholder-news.jpg"} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-uii-blue-900 shadow-sm">
                          {item.category}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-slate-500 text-xs mb-3">
                        <Calendar size={14} className="text-uii-yellow-600" />
                        <span className="font-semibold">{formatDate(item.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-uii-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {item.excerpt}
                      </p>
                      <span className="inline-flex items-center text-sm font-semibold text-slate-400 group-hover:text-uii-blue-600 transition-colors mt-auto">
                        Baca Selengkapnya <ArrowRight size={14} className="ml-1" />
                      </span>
                    </article>
                  ))}
                </div>
              )}
              
              <div className="mt-10 md:hidden">
                <Link href="/news">
                  <Button variant="outline" className="w-full justify-center">Lihat Semua Berita</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}