"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/firestore/news";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload"; 
import { ArrowLeft, Save, AlignLeft, Settings } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Berita",
    image: "",
    isPublished: true,
    author: "Admin"
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createArticle({
        ...formData,
        category: formData.category as any,
        publishedAt: Timestamp.now(), // Set waktu saat ini
      });
      alert("Artikel berhasil diterbitkan!");
      router.push("/admin/news");
    } catch (error) {
      console.error(error);
      alert("Gagal membuat artikel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6 pb-20 font-sans"
    >
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <button onClick={() => router.back()} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all w-max">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii">Tulis Artikel Baru</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Bagikan kabar terbaru dan wawasan kepada publik.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <AlignLeft size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Konten Utama</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Judul Artikel</label>
                <Input required name="title" placeholder="Judul yang menarik..." value={formData.title} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ringkasan (Excerpt)</label>
                <textarea 
                  name="excerpt" 
                  rows={3}
                  className="w-full p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
                  placeholder="Penjelasan singkat untuk preview..."
                  value={formData.excerpt}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Isi Konten</label>
                <textarea 
                  name="content" 
                  required
                  rows={15}
                  className="w-full p-5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm font-mono leading-relaxed"
                  placeholder="Tulis isi artikel di sini..."
                  value={formData.content}
                  onChange={handleChange}
                />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tips: Gunakan enter untuk paragraf baru.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Kolom Kanan: Sidebar Form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 sticky top-24">
            
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center">
                <Settings size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Pengaturan</h3>
            </div>

            <ImageUpload 
              label="Gambar Sampul"
              folder="news"
              onImageUploaded={handleImageUploaded}
              currentImage={formData.image}
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kategori</label>
              <select 
                name="category" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Berita">Berita</option>
                <option value="Artikel">Artikel</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status Publikasi</label>
              <select 
                className="w-full h-11 px-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
                value={formData.isPublished ? "true" : "false"}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === "true" }))}
              >
                <option value="true">Terbitkan</option>
                <option value="false">Simpan sebagai Draft</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="submit" variant="primary" className="w-full h-12 gap-2 shadow-lg" isLoading={loading}>
                <Save size={18} /> Terbitkan Artikel
              </Button>
            </div>

          </div>
        </div>

      </form>
    </motion.div>
  );
}