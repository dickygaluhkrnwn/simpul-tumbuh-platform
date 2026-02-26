"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEventById, updateEvent } from "@/lib/firestore/events";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TiptapEditor } from "@/components/ui/TiptapEditor"; // <-- Import Tiptap Editor
import { ArrowLeft, Save, Calendar, MapPin, DollarSign, Image as ImageIcon, AlignLeft, Users, Settings } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Workshop",
    description: "",
    date: "",
    time: "",
    location: "",
    quota: 0,
    price: 0,
    image: "",
    status: "open"
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getEventById(params.id as string);
      if (data) {
        const dateObj = data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date);
        const dateStr = dateObj.toISOString().split('T')[0];
        const timeStr = dateObj.toTimeString().split(' ')[0].substring(0, 5);

        setFormData({
          title: data.title,
          category: data.category,
          description: data.description,
          date: dateStr,
          time: timeStr,
          location: data.location,
          quota: data.quota,
          price: data.price,
          image: data.image,
          status: data.status
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [params.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (html: string) => {
    setFormData(prev => ({ ...prev, description: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dateString = `${formData.date}T${formData.time}`;
      const eventDate = new Date(dateString);

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        date: Timestamp.fromDate(eventDate),
        location: formData.location,
        quota: Number(formData.quota),
        price: Number(formData.price),
        image: formData.image,
        status: formData.status as any
      };

      await updateEvent(params.id as string, payload);
      alert("Event berhasil diperbarui!");
      router.push("/admin/events");
    } catch (error) {
      console.error(error);
      alert("Gagal update event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Memuat Data Event...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6 pb-20 font-sans selection:bg-primary-500 selection:text-white"
    >
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <button onClick={() => router.back()} className="relative z-10 p-3 bg-white hover:bg-primary-50 text-slate-600 hover:text-primary-600 border border-slate-200 rounded-xl shadow-sm transition-all w-max">
          <ArrowLeft size={20} />
        </button>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-uii tracking-tight">Edit Event</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Perbarui detail dan jadwal kegiatan untuk event ini.</p>
        </div>
      </div>

      {/* FORM KESELURUHAN (Grid Layout) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Konten Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel bg-white/70 p-6 md:p-10 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-200/80 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                <AlignLeft size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Deskripsi Event</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Judul Event</label>
                <Input required name="title" value={formData.title} onChange={handleChange} className="h-14 text-lg font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Deskripsi Lengkap (Rich Text)</label>
                {/* MENGGUNAKAN TIPTAP EDITOR */}
                <TiptapEditor 
                  content={formData.description} 
                  onChange={handleDescriptionChange} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Sidebar Pengaturan */}
        <div className="space-y-6">
          <div className="glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-8 sticky top-24">
            
            {/* Setting Event */}
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-100 text-accent-600 flex items-center justify-center shadow-sm">
                <Settings size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pengaturan Event</h3>
            </div>

            <div className="space-y-6">
              {/* Kategori & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Kategori</label>
                  <select 
                    name="category" 
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm font-semibold cursor-pointer"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    name="status" 
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm font-semibold cursor-pointer"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="open">Dibuka</option>
                    <option value="closed">Ditutup</option>
                    <option value="ongoing">Berjalan</option>
                  </select>
                </div>
              </div>

              {/* Waktu */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Calendar size={14} /> Tanggal & Jam
                </label>
                <div className="flex gap-2">
                  <Input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-2/3" />
                  <Input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-1/3" />
                </div>
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <MapPin size={14} /> Lokasi
                </label>
                <Input required name="location" value={formData.location} onChange={handleChange} />
              </div>

              {/* Pendaftaran */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <Users size={14} /> Kuota
                  </label>
                  <Input required type="number" name="quota" value={formData.quota} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <DollarSign size={14} /> Harga
                  </label>
                  <Input required type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
              </div>

              {/* URL Gambar */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <ImageIcon size={14} /> Link Poster
                </label>
                <Input name="image" value={formData.image} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80">
              <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold gap-2 shadow-lg shadow-primary-500/20" isLoading={saving}>
                <Save size={20} /> Simpan Perubahan
              </Button>
            </div>

          </div>
        </div>

      </form>
    </motion.div>
  );
}