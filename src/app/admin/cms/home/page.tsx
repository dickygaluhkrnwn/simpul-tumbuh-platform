"use client";

import { useEffect, useState, useRef } from "react";
import { getHomepageContent, updateHomepageContent, HomepageContent, defaultHomepageContent, Section } from "@/lib/firestore/content";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TiptapEditor } from "@/components/ui/TiptapEditor"; 
import { Save, LayoutTemplate, ArrowUp, ArrowDown, Edit, ChevronDown, ChevronUp, AlignLeft, GripVertical, Monitor, RefreshCw, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CMSHomePage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // State untuk Live Preview
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      // Refresh iframe setelah berhasil simpan
      refreshPreview();
      alert("Layout Beranda berhasil disimpan! Preview telah diperbarui.");
    } catch (error) {
      alert("Gagal menyimpan: " + error);
    } finally {
      setSaving(false);
    }
  };

  const refreshPreview = () => {
    setIsRefreshing(true);
    if (iframeRef.current) {
      // Menambahkan parameter acak untuk memaksa iframe reload melewati cache
      const currentSrc = iframeRef.current.src.split('?')[0];
      iframeRef.current.src = `${currentSrc}?t=${new Date().getTime()}`;
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Memuat Konfigurasi...</p>
    </div>
  );

  return (
    <div className="w-full pb-20 font-sans selection:bg-primary-500 selection:text-white">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel bg-white/70 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-sm relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-uii flex items-center gap-3 mb-2 tracking-tight">
            <div className="p-2.5 bg-primary-50 border border-primary-100 text-primary-600 rounded-xl shadow-sm">
              <LayoutTemplate size={24} />
            </div>
            Page Builder Beranda
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium ml-1">
            Edit konten di sisi kiri, lalu lihat hasilnya secara langsung di sisi kanan.
          </p>
        </div>
        <Button onClick={handleSave} variant="primary" className="gap-2 shadow-lg shadow-primary-500/20 h-12 px-6 relative z-10 w-full md:w-auto" isLoading={saving}>
          <Save size={18} /> Simpan & Perbarui Preview
        </Button>
      </div>

      {/* SPLIT SCREEN LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* KIRI: EDITOR (5 Kolom di Layar Besar) */}
        <div className="xl:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex items-center gap-2">
            <Edit size={18} className="text-primary-400" />
            <h2 className="font-bold tracking-wide">Editor Konten</h2>
          </div>

          <AnimatePresence>
            {content.sections.map((section, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={section.id} 
                className="glass-panel bg-white/80 border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden group transition-all duration-300"
              >
                {/* Section Header Bar */}
                <div className="p-4 bg-slate-50/50 border-b border-slate-200/60 flex items-center justify-between hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 shadow-inner font-bold text-xs group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-200 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                        <GripVertical size={14} className="text-slate-400" /> {section.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 shadow-inner">
                      <button onClick={() => moveSection(index, "up")} disabled={index === 0} className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 text-slate-500 hover:text-primary-600 transition-all">
                        <ArrowUp size={14} />
                      </button>
                      <button onClick={() => moveSection(index, "down")} disabled={index === content.sections.length - 1} className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 text-slate-500 hover:text-primary-600 transition-all">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    
                    <Button variant="outline" size="sm" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} className={`gap-1.5 text-xs h-8 px-3 shadow-sm ${expandedSection === section.id ? "bg-primary-50 border-primary-200 text-primary-700" : "bg-white"}`}>
                      {expandedSection === section.id ? <ChevronUp size={14} /> : <Edit size={12} />}
                    </Button>
                  </div>
                </div>

                {/* Editor Form (Expanded) */}
                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100 bg-slate-50/30">
                      <div className="p-5">
                        
                        {/* Form HERO */}
                        {section.type === "hero" && (
                          <div className="grid gap-5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Badge Title</label>
                              <Input value={section.data.badge || ""} onChange={(e) => updateSectionData(index, "badge", e.target.value)} className="h-10 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Judul Utama</label>
                              <Input value={section.data.title} onChange={(e) => updateSectionData(index, "title", e.target.value)} className="h-12 font-bold" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Deskripsi (Rich Text)</label>
                              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                                <TiptapEditor content={section.data.subtitle || ""} onChange={(html) => updateSectionData(index, "subtitle", html)} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tombol 1</label>
                                <Input value={section.data.ctaPrimary || ""} onChange={(e) => updateSectionData(index, "ctaPrimary", e.target.value)} className="h-10 text-sm" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tombol 2</label>
                                <Input value={section.data.ctaSecondary || ""} onChange={(e) => updateSectionData(index, "ctaSecondary", e.target.value)} className="h-10 text-sm" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Form STATS */}
                        {section.type === "stats" && (
                          <div className="grid gap-5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Label Section</label>
                              <Input value={section.data.label} onChange={(e) => updateSectionData(index, "label", e.target.value)} className="h-10 text-sm font-bold text-primary-600" />
                            </div>
                          </div>
                        )}

                        {/* Form FEATURES */}
                        {section.type === "features" && (
                          <div className="grid gap-5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Judul Features</label>
                              <Input value={section.data.title} onChange={(e) => updateSectionData(index, "title", e.target.value)} className="h-10 text-sm font-bold" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Deskripsi (Rich Text)</label>
                              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                                <TiptapEditor content={section.data.description || ""} onChange={(html) => updateSectionData(index, "description", html)} />
                              </div>
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

        {/* KANAN: LIVE PREVIEW (7 Kolom di Layar Besar) */}
        <div className="xl:col-span-7 sticky top-24">
          <div className="bg-slate-200 border border-slate-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[calc(100vh-8rem)] min-h-[600px]">
            
            {/* Mockup Browser Header */}
            <div className="bg-slate-800 text-slate-300 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 max-w-sm mx-4 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-center font-mono truncate hidden sm:block">
                localhost:3000/
              </div>

              {/* Preview Controls */}
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-900/50 rounded-lg p-1">
                  <button 
                    onClick={() => setPreviewMode("desktop")}
                    className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Mode Desktop"
                  >
                    <Monitor size={14} />
                  </button>
                  <button 
                    onClick={() => setPreviewMode("mobile")}
                    className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Mode Mobile"
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
                <button onClick={refreshPreview} className={`p-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all ${isRefreshing ? 'animate-spin' : ''}`} title="Refresh Preview">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className={`flex-1 bg-slate-100 flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${previewMode === 'mobile' ? 'py-8' : ''}`}>
              <div className={`h-full bg-white transition-all duration-500 shadow-xl border-x border-slate-300 ${previewMode === 'mobile' ? 'w-[375px] rounded-[3rem] border-y border-[8px] border-slate-800' : 'w-full border-none'}`}>
                <iframe 
                  ref={iframeRef}
                  src="/" // URL Iframe mengarah ke Beranda Utama
                  className="w-full h-full border-none rounded-inherit"
                  title="Live Preview"
                />
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}