"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { getNews } from "@/lib/firestore/news";
import { Article } from "@/types";
import { Newspaper, Calendar, Search } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { Input } from "@/components/ui/Input";

export default function NewsListPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNews();
      // Filter hanya yang status Published
      const published = data.filter(item => item.isPublished);
      setNews(published);
      setFilteredNews(published);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter pencarian sederhana
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
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header />
      
      <div className="pt-32 pb-12 bg-uii-blue-950 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white font-uii mb-4">Berita & Artikel</h1>
          <p className="text-uii-blue-200 max-w-2xl mx-auto">
            Informasi terkini seputar inovasi, prestasi, dan kegiatan di lingkungan Simpul Tumbuh UII.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Input 
            placeholder="Cari berita..." 
            className="pl-12 h-12 rounded-full shadow-sm border-slate-200 focus:border-uii-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        {loading ? (
          <div className="text-center py-20">Memuat berita...</div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 text-slate-500">Tidak ada berita ditemukan.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.image || "/images/placeholder-news.jpg"} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-uii-blue-800 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Calendar size={14} />
                    {formatDate(item.publishedAt)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-uii-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  <button className="text-uii-blue-600 font-semibold text-sm hover:underline">
                    Baca Selengkapnya
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}