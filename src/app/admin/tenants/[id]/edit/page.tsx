"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTenantById, updateTenant } from "@/lib/firestore/tenants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save, Building2, Settings, User, Globe, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function EditTenantPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Teknologi",
    logo: "",
    founder: "",
    batch: "",
    status: "Inkubasi",
    website: "",
    instagram: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTenantById(params.id as string);
      if (data) {
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          logo: data.logo,
          founder: data.founder,
          batch: data.batch,
          status: data.status,
          website: data.website || "",
          instagram: data.instagram || ""
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
    setFormData(prev => ({ ...prev, logo: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTenant(params.id as string, formData as any);
      alert("Data startup berhasil diperbarui!");
      router.push("/admin/tenants");
    } catch (error) {
      alert("Gagal update data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Memuat Data Startup...</p>
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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-uii tracking-tight">Edit Startup Binaan</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Perbarui profil dan progres perkembangan startup.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel bg-white/70 p-6 md:p-10 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-8">
            
            <div className="flex items-center gap-4 border-b border-slate-200/80 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Profil Startup</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nama Startup</label>
                <Input required name="name" value={formData.name} onChange={handleChange} className="h-14 text-lg font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4} 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm resize-none" 
                  value={formData.description} 
                  onChange={handleChange} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <User size={14} /> Nama Founder
                  </label>
                  <Input required name="founder" value={formData.founder} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <Globe size={14} /> Website (Opsional)
                  </label>
                  <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <Instagram size={14} /> Instagram (Opsional)
                  </label>
                  <Input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@username" />
                </div>
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
              label="Logo Startup" 
              folder="tenants" 
              onImageUploaded={handleImageUploaded} 
              currentImage={formData.logo} 
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Kategori Bidang</label>
              <select 
                name="category" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm font-semibold cursor-pointer" 
                value={formData.category} 
                onChange={handleChange}
              >
                <option value="Teknologi">Teknologi</option>
                <option value="F&B">F&B (Makanan)</option>
                <option value="Jasa">Jasa</option>
                <option value="Kreatif">Kreatif</option>
                <option value="Agro">Agro</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Batch / Angkatan</label>
              <Input required name="batch" value={formData.batch} onChange={handleChange} placeholder="Contoh: Batch 5 - 2025" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status Inkubasi</label>
              <select 
                name="status" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm font-semibold cursor-pointer" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="Pra-Inkubasi">Pra-Inkubasi</option>
                <option value="Inkubasi">Inkubasi (Active)</option>
                <option value="Lulus (Alumni)">Lulus (Alumni)</option>
              </select>
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