"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/firestore/events";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
// FIX: Menambahkan Users ke import
import { ArrowLeft, Save, Calendar, MapPin, DollarSign, Image as ImageIcon, AlignLeft, Users } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        image: formData.image || "[https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop](https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop)",
        status: formData.status as any
      };

      await createEvent(payload);
      alert("Event berhasil dibuat!");
      router.push("/admin/events");
    } catch (error) {
      console.error(error);
      alert("Gagal membuat event.");
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
          <h1 className="text-2xl font-bold text-slate-900 font-uii">Buat Event Baru</h1>
          <p className="text-slate-500 text-sm">Isi formulir di bawah untuk menambahkan kegiatan.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Informasi Dasar */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Informasi Dasar</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Judul Event</label>
              <Input required name="title" placeholder="Contoh: Workshop Design Thinking" value={formData.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select 
                name="category" 
                className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-uii-blue-500 outline-none"
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
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select 
                name="status" 
                className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-uii-blue-500 outline-none"
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
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Waktu & Tempat</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Calendar size={14}/> Tanggal</label>
              <Input required type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Calendar size={14}/> Jam Mulai</label>
              <Input required type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><MapPin size={14}/> Lokasi</label>
              <Input required name="location" placeholder="Nama Gedung / Link Zoom" value={formData.location} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Detail & Harga */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Detail Pendaftaran</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Users size={14}/> Kuota Peserta</label>
              <Input required type="number" name="quota" placeholder="50" value={formData.quota} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><DollarSign size={14}/> Harga Tiket (0 = Gratis)</label>
              <Input required type="number" name="price" placeholder="0" value={formData.price} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><ImageIcon size={14}/> URL Gambar / Poster</label>
              <Input name="image" placeholder="https://..." value={formData.image} onChange={handleChange} />
              <p className="text-xs text-slate-400">Masukkan link gambar langsung. Fitur upload akan ditambahkan nanti.</p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><AlignLeft size={14}/> Deskripsi Lengkap</label>
              <textarea 
                name="description" 
                required
                rows={6}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-uii-blue-500 outline-none text-sm"
                placeholder="Jelaskan detail acara, pemateri, dan benefit..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-uii-blue-600 hover:bg-uii-blue-700 h-12 px-8 gap-2" isLoading={loading}>
            <Save size={18} /> Simpan Event
          </Button>
        </div>

      </form>
    </div>
  );
}