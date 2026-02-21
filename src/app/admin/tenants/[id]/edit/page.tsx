"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTenantById, updateTenant } from "@/lib/firestore/tenants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save } from "lucide-react";

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
      alert("Data berhasil diperbarui!");
      router.push("/admin/tenants");
    } catch (error) {
      alert("Gagal update data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 font-uii">Edit Data Startup</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
             <ImageUpload label="Logo Startup" folder="tenants" onImageUploaded={handleImageUploaded} currentImage={formData.logo} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Startup</label>
            <Input required name="name" value={formData.name} onChange={handleChange} />
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
            <textarea name="description" required rows={3} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={formData.description} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Founder</label>
            <Input required name="founder" value={formData.founder} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Batch / Angkatan</label>
            <Input required name="batch" value={formData.batch} onChange={handleChange} />
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
            <label className="text-sm font-medium text-slate-700">Website</label>
            <Input name="website" value={formData.website} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto gap-2" isLoading={saving}>
            <Save size={18} /> Simpan Perubahan
          </Button>
        </div>

      </form>
    </div>
  );
}