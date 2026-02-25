"use client";

import { useEffect, useState } from "react";
import { getHomepageContent, updateHomepageContent, HomepageContent, defaultHomepageContent, Section } from "@/lib/firestore/content";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, LayoutTemplate, ArrowUp, ArrowDown, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Konfigurasi...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 font-sans">
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
              <LayoutTemplate size={24} />
            </div>
            Page Builder Beranda
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
            Atur urutan dan isi konten halaman utama platform secara dinamis.
          </p>
        </div>
        <Button onClick={handleSave} variant="primary" className="gap-2 shadow-lg" isLoading={saving}>
          <Save size={18} /> Simpan Layout
        </Button>
      </div>

      {/* SECTIONS LIST */}
      <div className="space-y-4">
        <AnimatePresence>
          {content.sections.map((section, index) => (
            <motion.div 
              layout // Animasi saat berpindah posisi
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={section.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              {/* Section Header Bar */}
              <div className="p-4 md:p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm md:text-base">
                      {section.type.toUpperCase()} SECTION
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                      ID: {section.id}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1 mr-2">
                    <button 
                      onClick={() => moveSection(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 hover:bg-white dark:hover:bg-slate-600 rounded-md disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 dark:text-slate-300 transition-all"
                      title="Geser ke Atas"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button 
                      onClick={() => moveSection(index, "down")}
                      disabled={index === content.sections.length - 1}
                      className="p-1.5 hover:bg-white dark:hover:bg-slate-600 rounded-md disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 dark:text-slate-300 transition-all"
                      title="Geser ke Bawah"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="gap-2 text-xs md:text-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Edit size={14} /> 
                    <span className="hidden md:inline">{expandedSection === section.id ? "Tutup Editor" : "Edit Konten"}</span>
                    {expandedSection === section.id ? <ChevronUp size={14} className="md:hidden" /> : <ChevronDown size={14} className="md:hidden" />}
                  </Button>
                </div>
              </div>

              {/* Editor Form (Expanded) */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="p-6 md:p-8 bg-white dark:bg-slate-900">
                      
                      {/* Form HERO */}
                      {section.type === "hero" && (
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Judul Utama</label>
                            <textarea 
                              rows={2}
                              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                              value={section.data.title}
                              onChange={(e) => updateSectionData(index, "title", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sub Judul / Deskripsi</label>
                            <textarea 
                              rows={3}
                              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                              value={section.data.subtitle}
                              onChange={(e) => updateSectionData(index, "subtitle", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {/* Form STATS */}
                      {section.type === "stats" && (
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Label Section</label>
                            <Input 
                              value={section.data.label}
                              onChange={(e) => updateSectionData(index, "label", e.target.value)}
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white h-12"
                            />
                          </div>
                          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                              Fitur edit item statistik terperinci akan tersedia pada pembaruan CMS berikutnya.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Form FEATURES */}
                      {section.type === "features" && (
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Judul Features</label>
                            <Input 
                              value={section.data.title}
                              onChange={(e) => updateSectionData(index, "title", e.target.value)}
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deskripsi Singkat</label>
                            <textarea 
                              rows={2}
                              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                              value={section.data.description}
                              onChange={(e) => updateSectionData(index, "description", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}