"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNews, deleteArticle } from "@/lib/firestore/news";
import { Article } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit, Trash2, Calendar, Search } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function AdminNewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    const data = await getNews();
    setNews(data);
    setFilteredNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter pencarian
  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNews(results);
  }, [search, news]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Hapus artikel "${title}"? Data tidak bisa dikembalikan.`)) {
      await deleteArticle(id);
      fetchNews();
    }
  };

  // Helper Format Tanggal
  const formatDate = (date: any) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-8 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii mb-2 tracking-tight">Berita & Artikel</h1>
          <p className="text-slate-600 font-medium">Kelola publikasi, konten dakwah, dan artikel Simpul Tumbuh.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Cari judul / kategori..." 
              className="pl-10 h-12 bg-white/80 border-slate-200 rounded-xl shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <Link href="/admin/news/create" className="shrink-0">
            <Button variant="primary" className="gap-2 h-12 w-full sm:w-auto shadow-md shadow-primary-500/20">
              <Plus size={18} /> Tulis Artikel
            </Button>
          </Link>
        </div>
      </div>

      {/* TABLE SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel bg-white/70 rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-100/50 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-5 font-bold text-slate-700 uppercase tracking-wider text-xs">Artikel</th>
                <th className="px-6 py-5 font-bold text-slate-700 uppercase tracking-wider text-xs">Kategori</th>
                <th className="px-6 py-5 font-bold text-slate-700 uppercase tracking-wider text-xs">Tanggal</th>
                <th className="px-6 py-5 font-bold text-slate-700 uppercase tracking-wider text-xs text-center">Status</th>
                <th className="px-6 py-5 font-bold text-slate-700 uppercase tracking-wider text-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Memuat Artikel...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500 font-medium italic">
                    {search ? "Artikel yang dicari tidak ditemukan." : "Belum ada artikel. Silakan tulis baru."}
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-white transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                          <img src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=200&auto=format&fit=crop"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <p className="font-bold text-slate-900 text-sm max-w-[300px] truncate" title={item.title}>{item.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <Calendar size={14} className="text-primary-500" />
                        {formatDate(item.publishedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        item.isPublished 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {item.isPublished ? 'Terbit' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/news/${item.id}/edit`}>
                          <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-transparent hover:border-primary-100" title="Edit Artikel">
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id!, item.title)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                          title="Hapus Artikel"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}