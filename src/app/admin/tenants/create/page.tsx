"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTenant } from "@/lib/firestore/tenants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateTenantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Teknologi",
    logo: "",
    founder: "",
    batch: "Batch 1 - 2024",
    status: "Inkubasi",
    website: "",
    instagram: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, logo: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTenant(formData as any);
      alert("Startup berhasil ditambahkan!");
      router.push("/admin/tenants");
    } catch (error) {
      alert("Gagal menambah data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 font-uii">Tambah Startup Binaan</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
             <ImageUpload label="Logo Startup" folder="tenants" onImageUploaded={handleImageUploaded} currentImage={formData.logo} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Startup</label>
            <Input required name="name" value={formData.name} onChange={handleChange} placeholder="Contoh: GoJek KW" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Kategori</label>
            <select name="category" className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={formData.category} onChange={handleChange}>
              <option value="Teknologi">Teknologi</option>
              <option value="F&B">F&B (Makanan)</option>
              <option value="Jasa">Jasa</option>
              <option value="Kreatif">Kreatif</option>
              <option value="Agro">Agro</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-700">Deskripsi Singkat</label>
            <textarea name="description" required rows={3} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Solusi apa yang ditawarkan?" value={formData.description} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Founder</label>
            <Input required name="founder" value={formData.founder} onChange={handleChange} placeholder="Nama Ketua Tim" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Batch / Angkatan</label>
            <Input required name="batch" value={formData.batch} onChange={handleChange} placeholder="Batch 5 - 2025" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Status Inkubasi</label>
            <select name="status" className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={formData.status} onChange={handleChange}>
              <option value="Pra-Inkubasi">Pra-Inkubasi</option>
              <option value="Inkubasi">Inkubasi (Active)</option>
              <option value="Lulus (Alumni)">Lulus (Alumni)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Website (Opsional)</label>
            <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto gap-2" isLoading={loading}>
            <Save size={18} /> Simpan Data
          </Button>
        </div>

      </form>
    </div>
  );
}