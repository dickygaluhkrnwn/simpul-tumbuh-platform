"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/firestore/news";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload"; // Komponen baru
import { ArrowLeft, Save } from "lucide-react";
import { Timestamp } from "firebase/firestore";

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-uii">Tulis Artikel Baru</h1>
          <p className="text-slate-500 text-sm">Bagikan kabar terbaru kepada publik.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Judul Artikel</label>
              <Input required name="title" placeholder="Judul yang menarik..." value={formData.title} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Ringkasan (Excerpt)</label>
              <textarea 
                name="excerpt" 
                rows={3}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Penjelasan singkat untuk preview..."
                value={formData.excerpt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Isi Konten</label>
              <textarea 
                name="content" 
                required
                rows={15}
                className="w-full p-4 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none font-mono"
                placeholder="Tulis isi artikel di sini..."
                value={formData.content}
                onChange={handleChange}
              />
              <p className="text-xs text-slate-400">Tips: Gunakan enter untuk paragraf baru.</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Sidebar Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Image Upload Component */}
            <ImageUpload 
              label="Gambar Sampul"
              folder="news"
              onImageUploaded={handleImageUploaded}
              currentImage={formData.image}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select 
                name="category" 
                className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-500 outline-none"
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
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select 
                className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={formData.isPublished ? "true" : "false"}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === "true" }))}
              >
                <option value="true">Terbitkan</option>
                <option value="false">Simpan sebagai Draft</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 gap-2" isLoading={loading}>
              <Save size={18} /> Simpan Artikel
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}