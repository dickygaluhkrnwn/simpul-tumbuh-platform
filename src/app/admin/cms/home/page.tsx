"use client";

import { useEffect, useState } from "react";
import { getHomepageContent, updateHomepageContent, HomepageContent, defaultHomepageContent, Section } from "@/lib/firestore/content";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, LayoutTemplate, ArrowUp, ArrowDown, Trash2, Edit, Eye, EyeOff } from "lucide-react";

export default function CMSHomePage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHomepageContent();
      setContent(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Fungsi Pindah Posisi (Swap)
  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...content.sections];
    if (direction === "up" && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === "down" && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setContent({ ...content, sections: newSections });
  };

  // Fungsi Edit Data
  const updateSectionData = (index: number, field: string, value: any) => {
    const newSections = [...content.sections];
    newSections[index] = {
      ...newSections[index],
      data: {
        ...newSections[index].data,
        [field]: value,
      },
    } as Section;
    setContent({ ...content, sections: newSections });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomepageContent(content);
      alert("Layout Beranda berhasil disimpan!");
    } catch (error) {
      alert("Gagal menyimpan: " + error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat konfigurasi...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-uii flex items-center gap-3">
            <LayoutTemplate className="text-rose-600" />
            Page Builder Beranda
          </h1>
          <p className="text-slate-500">Atur urutan dan isi konten halaman utama.</p>
        </div>
        <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700 gap-2" isLoading={saving}>
          <Save size={18} /> Simpan Layout
        </Button>
      </div>

      <div className="space-y-4">
        {content.sections.map((section, index) => (
          <div key={section.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Section Header Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase">
                  {section.type}
                </span>
                <span className="font-semibold text-slate-700">Section {index + 1}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0}
                  className="p-2 hover:bg-slate-200 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => moveSection(index, "down")}
                  disabled={index === content.sections.length - 1}
                  className="p-2 hover:bg-slate-200 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <ArrowDown size={16} />
                </button>
                <button 
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50 text-slate-700"
                >
                  <Edit size={14} /> {expandedSection === section.id ? "Tutup" : "Edit Konten"}
                </button>
              </div>
            </div>

            {/* Editor Form (Expanded) */}
            {expandedSection === section.id && (
              <div className="p-6 bg-white animate-in slide-in-from-top-2">
                
                {/* Form HERO */}
                {section.type === "hero" && (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Judul Utama</label>
                      <textarea 
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        value={section.data.title}
                        onChange={(e) => updateSectionData(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Sub Judul</label>
                      <textarea 
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        value={section.data.subtitle}
                        onChange={(e) => updateSectionData(index, "subtitle", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Form STATS */}
                {section.type === "stats" && (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Label Section</label>
                      <Input 
                        value={section.data.label}
                        onChange={(e) => updateSectionData(index, "label", e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-slate-400 italic">Edit item statistik belum tersedia di versi cepat ini.</p>
                  </div>
                )}

                {/* Form FEATURES */}
                {section.type === "features" && (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Judul Features</label>
                      <Input 
                        value={section.data.title}
                        onChange={(e) => updateSectionData(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi</label>
                      <Input 
                        value={section.data.description}
                        onChange={(e) => updateSectionData(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}