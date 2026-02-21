"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEventById, updateEvent } from "@/lib/firestore/events";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
// FIX: Menambahkan Users ke import
import { ArrowLeft, Save, Calendar, MapPin, DollarSign, Image as ImageIcon, AlignLeft, Users } from "lucide-react";
import { Timestamp } from "firebase/firestore";

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

  if (loading) return <div className="p-10 text-center">Memuat data event...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-uii">Edit Event</h1>
          <p className="text-slate-500 text-sm">Perbarui detail kegiatan.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Informasi Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Judul Event</label>
              <Input required name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select name="category" className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-uii-blue-500 outline-none" value={formData.category} onChange={handleChange}>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Competition">Competition</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select name="status" className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-uii-blue-500 outline-none" value={formData.status} onChange={handleChange}>
                <option value="open">Buka Pendaftaran</option>
                <option value="closed">Tutup</option>
                <option value="ongoing">Sedang Berlangsung</option>
              </select>
            </div>
          </div>
        </div>

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
              <Input required name="location" value={formData.location} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Detail Pendaftaran</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Users size={14}/> Kuota Peserta</label>
              <Input required type="number" name="quota" value={formData.quota} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><DollarSign size={14}/> Harga Tiket</label>
              <Input required type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><ImageIcon size={14}/> URL Gambar / Poster</label>
              <Input name="image" value={formData.image} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><AlignLeft size={14}/> Deskripsi Lengkap</label>
              <textarea name="description" required rows={6} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-uii-blue-500 outline-none text-sm" value={formData.description} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-uii-blue-600 hover:bg-uii-blue-700 h-12 px-8 gap-2" isLoading={saving}>
            <Save size={18} /> Update Event
          </Button>
        </div>

      </form>
    </div>
  );
}