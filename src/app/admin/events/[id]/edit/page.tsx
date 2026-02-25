"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEventById, updateEvent } from "@/lib/firestore/events";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Save, Calendar, MapPin, DollarSign, Image as ImageIcon, AlignLeft, Users } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Data Event...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6 pb-20 font-sans"
    >
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <button onClick={() => router.back()} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all w-max">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii">Edit Event</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Perbarui detail kegiatan untuk event ini.</p>
        </div>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
        
        {/* Informasi Dasar */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
              <AlignLeft size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Informasi Dasar</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Judul Event</label>
              <Input required name="title" value={formData.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kategori</label>
              <select 
                name="category" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
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
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</label>
              <select 
                name="status" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Buka Pendaftaran</option>
                <option value="closed">Tutup</option>
                <option value="ongoing">Sedang Berlangsung</option>
              </select>
            </div>
          </div>
        </div>

        {/* Waktu & Lokasi */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Waktu & Tempat</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Tanggal</label>
              <Input required type="date" name="date" value={formData.date} onChange={handleChange} className="dark:[color-scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Jam Mulai</label>
              <Input required type="time" name="time" value={formData.time} onChange={handleChange} className="dark:[color-scheme:dark]" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Lokasi</label>
              <Input required name="location" value={formData.location} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Detail Pendaftaran */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Detail Pendaftaran</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Kuota Peserta</label>
              <Input required type="number" name="quota" value={formData.quota} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Harga Tiket (0 = Gratis)</label>
              <Input required type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">URL Gambar / Poster</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <ImageIcon size={18} />
                </div>
                <Input name="image" value={formData.image} onChange={handleChange} className="pl-12" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Deskripsi Lengkap</label>
              <textarea 
                name="description" 
                required
                rows={6}
                className="w-full p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all shadow-sm"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
          <Button type="submit" variant="primary" className="h-12 px-8 gap-2 w-full sm:w-auto" isLoading={saving}>
            <Save size={18} /> Update Event
          </Button>
        </div>

      </form>
    </motion.div>
  );
}