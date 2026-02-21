"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNews, deleteArticle } from "@/lib/firestore/news";
import { Article } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Calendar, Eye } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function AdminNewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const data = await getNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Hapus artikel "${title}"?`)) {
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-uii">Berita & Artikel</h1>
          <p className="text-slate-500">Kelola publikasi, pengumuman, dan artikel Simpul Tumbuh.</p>
        </div>
        <Link href="/admin/news/create">
          <Button className="bg-rose-600 hover:bg-rose-700 gap-2">
            <Plus size={18} /> Tulis Berita Baru
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Artikel</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Kategori</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Tanggal</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Memuat artikel...</td></tr>
            ) : news.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Belum ada artikel.</td></tr>
            ) : (
              news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-bold text-slate-900 line-clamp-2 max-w-xs">{item.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatDate(item.publishedAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.isPublished ? 'Terbit' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/news/${item.id}/edit`}>
                        <button className="p-2 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id!, item.title)}
                        className="p-2 text-slate-500 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}