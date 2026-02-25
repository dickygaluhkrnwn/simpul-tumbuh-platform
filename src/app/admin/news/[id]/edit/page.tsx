"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getArticleById, updateArticle } from "@/lib/firestore/news";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save, AlignLeft, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Berita",
    image: "",
    isPublished: true,
    author: "Admin"
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticleById(params.id as string);
      if (data) {
        setFormData({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          image: data.image,
          isPublished: data.isPublished,
          author: data.author
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateArticle(params.id as string, {
        ...formData,
        category: formData.category as any,
      });
      alert("Artikel berhasil diperbarui!");
      router.push("/admin/news");
    } catch (error) {
      console.error(error);
      alert("Gagal update artikel.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Artikel...</p>
    </div>
  );

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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii">Edit Artikel</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Perbarui konten dan informasi artikel ini.</p>
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
                <Input required name="title" value={formData.title} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ringkasan (Excerpt)</label>
                <textarea 
                  name="excerpt" 
                  rows={3}
                  className="w-full p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
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
                  value={formData.content}
                  onChange={handleChange}
                />
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
              <Button type="submit" variant="primary" className="w-full h-12 gap-2 shadow-lg" isLoading={saving}>
                <Save size={18} /> Simpan Perubahan
              </Button>
            </div>

          </div>
        </div>

      </form>
    </motion.div>
  );
}