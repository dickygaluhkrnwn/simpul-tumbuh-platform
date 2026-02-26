"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/firestore/news";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload"; 
import { TiptapEditor } from "@/components/ui/TiptapEditor"; // <-- Import Tiptap Editor
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

  const handleContentChange = (html: string) => {
    setFormData(prev => ({ ...prev, content: html }));
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
        publishedAt: Timestamp.now(),
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
      className="max-w-6xl mx-auto space-y-6 pb-20 font-sans"
    >
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <button onClick={() => router.back()} className="relative z-10 p-3 bg-white hover:bg-primary-50 text-slate-600 hover:text-primary-600 border border-slate-200 rounded-xl shadow-sm transition-all w-max">
          <ArrowLeft size={20} />
        </button>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-uii tracking-tight">Tulis Artikel Baru</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Bagikan kabar terbaru dan wawasan kepada publik.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel bg-white/70 p-6 md:p-10 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-8">
            
            <div className="flex items-center gap-4 border-b border-slate-200/80 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                <AlignLeft size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Konten Utama</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Judul Artikel</label>
                <Input required name="title" placeholder="Judul yang menarik..." value={formData.title} onChange={handleChange} className="h-14 text-lg font-medium" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Ringkasan (Excerpt)</label>
                <textarea 
                  name="excerpt" 
                  rows={3}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm resize-none"
                  placeholder="Penjelasan singkat untuk preview..."
                  value={formData.excerpt}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Isi Konten (Rich Text)</label>
                {/* MENGGUNAKAN TIPTAP EDITOR */}
                <TiptapEditor 
                  content={formData.content} 
                  onChange={handleContentChange} 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Kolom Kanan: Sidebar Form */}
        <div className="space-y-6">
          <div className="glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-8 sticky top-24">
            
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-100 text-accent-600 flex items-center justify-center shadow-sm">
                <Settings size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pengaturan</h3>
            </div>

            <ImageUpload 
              label="Gambar Sampul"
              folder="news"
              onImageUploaded={handleImageUploaded}
              currentImage={formData.image}
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Kategori</label>
              <select 
                name="category" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm font-semibold cursor-pointer"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Berita">Berita</option>
                <option value="Artikel">Artikel</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Dakwah">Dakwah</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status Publikasi</label>
              <select 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm font-semibold cursor-pointer"
                value={formData.isPublished ? "true" : "false"}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === "true" }))}
              >
                <option value="true">Terbitkan Langsung</option>
                <option value="false">Simpan sebagai Draft</option>
              </select>
            </div>

            <div className="pt-6 border-t border-slate-200/80">
              <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold gap-2 shadow-lg shadow-primary-500/20" isLoading={loading}>
                <Save size={20} /> Terbitkan Artikel
              </Button>
            </div>

          </div>
        </div>

      </form>
    </motion.div>
  );
}