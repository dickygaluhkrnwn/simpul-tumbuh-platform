"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, Award, Users, BookOpen, 
  MapPin, Newspaper, ArrowRight, Menu, X, 
  FileText, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer"; // <-- Import Footer Global

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// --- HEADER KHUSUS LSP UII (MICRO-SITE HEADER) ---
const lspNavLinks = [
  { name: "Beranda", href: "/unit-fungsional/lsp" },
  { name: "Sertifikasi", href: "#sertifikasi" },
  { name: "Pelatihan", href: "#pelatihan" },
  { name: "Profil", href: "#" },
  { name: "Unduh File", href: "#" },
];

function LspHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-lg border-b border-slate-800/50 shadow-xl"
          : "bg-transparent py-2"
      )}
    >
      <div className="container-tech py-3 md:py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo LSP */}
          <Link href="/unit-fungsional/lsp" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
              <ShieldCheck className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-uii font-bold text-xl leading-none tracking-tight text-white">
                LSP UII
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-cyan-400">
                Sertifikasi Profesi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {lspNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-300 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
            >
              ← Portal Utama
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-6 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
          {lspNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-200 font-bold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500/20 bg-cyan-500/10">
                ← Portal Utama UII
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function LspPage() {
  const stats = [
    { value: "19", label: "Jumlah Skema", icon: FileText },
    { value: "36", label: "Asesor Aktif", icon: Users },
    { value: "681", label: "Lulusan Tersertifikasi", icon: Award },
  ];

  const news = [
    { title: "Refreshing Materi Uji Kompetensi (MUK)", category: "Artikel, LSP", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop" },
    { title: "Pelatihan dan Sertifikasi TRIZ", category: "Artikel, LSP, Uncategorized", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop" },
    { title: "Pelatihan Offline Program PSKK", category: "Artikel, Berita, LSP", img: "https://images.unsplash.com/photo-1542744094-24638ea0b3b3?q=80&w=600&auto=format&fit=crop" },
  ];

  const sertifikasi = [
    { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop" },
    { title: "Validasi Metode Spektrometri", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" },
    { title: "Ahli K3 Umum", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop" }
  ];
  
  const pelatihan = [
    { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop" },
    { title: "TRIZ", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" },
    { title: "K3 Umum", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" }
  ];

  return (
    <main className="min-h-screen relative selection:bg-cyan-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Cyan Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      
      <LspHeader />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop" 
            alt="LSP Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          {/* Overlay Gelap Super Pekat untuk kontras */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-transparent to-transparent" />
          
          {/* Efek Glow Cyan */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-cyan-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
              <ShieldCheck size={16} className="animate-pulse" /> Sertifikasi Profesi
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Lembaga Sertifikasi Profesi <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Universitas Islam Indonesia</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl font-medium drop-shadow-xl leading-relaxed text-justify">
              LSP UII merupakan lembaga yang memberikan jaminan pelayanan Sertifikasi Kompetensi yang mengutamakan mutu dan kepuasan pelanggan serta menjamin bahwa proses sertifikasi dilaksanakan dengan jujur, cepat, tepat, akurat dan efektif. Selain itu LSP UII mendorong tersedianya tenaga kerja yang kompeten, profesional dan kompetitif bagi mahasiswa UII, Non UII dan Umum. LSP UII selalu mengembangkan Standardisasi Kompetensi yang mengikuti perkembangan dan kebutuhan industri.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" className="h-14 px-8 text-lg font-bold bg-cyan-600 hover:bg-cyan-500 border-none shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-transform hover:scale-105 text-white">
                Daftar Sertifikasi <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Floating over Hero) */}
      <section className="relative z-20 -mt-16 mb-20 px-4">
        <div className="container-tech">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-panel bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-2xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-cyan-50/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={32} className="text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii tracking-tight">{stat.value}</h3>
                    <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PROGRAM SERTIFIKASI & PELATIHAN (Dengan Gambar Cards Besar) */}
      <section id="sertifikasi" className="py-20 relative">
        <div className="container-tech relative z-10">
          
          {/* --- Program Sertifikasi --- */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-200/60">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii flex items-center gap-3">
                <ShieldCheck className="text-cyan-600" /> Program Sertifikasi
              </h2>
              <Link href="#" className="text-sm font-bold text-cyan-600 hover:underline mb-2">Lihat Semua</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sertifikasi.map((item, idx) => (
                <Link key={idx} href="#">
                  <div className="group glass-panel bg-white/70 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
                    <div className="h-48 md:h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex items-center justify-between flex-grow">
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-cyan-600 transition-colors leading-snug pr-4">{item.title}</h3>
                      <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* --- Program Pelatihan --- */}
          <motion.div id="pelatihan" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-200/60">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii flex items-center gap-3">
                <BookOpen className="text-blue-500" /> Program Pelatihan
              </h2>
              <Link href="#" className="text-sm font-bold text-blue-600 hover:underline mb-2">Lihat Semua</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pelatihan.map((item, idx) => (
                <Link key={idx} href="#">
                  <div className="group glass-panel bg-white/70 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
                    <div className="h-48 md:h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex items-center justify-between flex-grow">
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors leading-snug pr-4">{item.title}</h3>
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. PROGRAM PSKK (Revised - Elegant Dark Glass) */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-tech relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-white relative overflow-hidden border border-slate-800"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl glass-dark text-cyan-400 mb-6 border border-white/10 shadow-lg">
                <Award size={28} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-uii mb-6 tracking-tight">Program PSKK</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                Program Sertifikasi Kompetensi Kerja (PSKK) adalah program dengan anggaran stimulus oleh Badan Nasional Sertifikasi Profesi (BNSP) kepada LSP Terlisensi dengan melibatkan dunia usaha/industri terutama pada sektor industri. Melalui program ini, pemerintah membantu untuk mempercepat pengakuan sertifikasi kompetensi bagi tenaga kerja. LSP UII sebagai lembaga sertifikasi terlisensi oleh BNSP selalu mendapat bantuan PSKK setiap tahunnya.
              </p>
            </div>

            {/* List Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto relative z-10">
              <div className="flex justify-between items-center glass-dark p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors shadow-sm">
                <span className="font-bold text-slate-200 text-sm md:text-base">Daftar Peserta PSKK</span>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/20">Lihat</Button>
              </div>
              
              <div className="flex justify-between items-center glass-dark p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors shadow-sm">
                <span className="font-bold text-slate-200 text-sm md:text-base">Jadwal PSKK</span>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/20">Lihat</Button>
              </div>
              
              <div className="flex justify-between items-center glass-dark p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors shadow-sm">
                <span className="font-bold text-slate-200 text-sm md:text-base pr-4">Registrasi Ulang Spektrometri</span>
                <Button variant="primary" size="sm" className="bg-cyan-600 hover:bg-cyan-500 border-none shrink-0 shadow-lg">Registrasi Ulang</Button>
              </div>
              
              <div className="flex justify-between items-center glass-dark p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors shadow-sm">
                <span className="font-bold text-slate-200 text-sm md:text-base pr-4">Registrasi Ulang Analisis Dasar Kimia</span>
                <Button variant="primary" size="sm" className="bg-cyan-600 hover:bg-cyan-500 border-none shrink-0 shadow-lg">Registrasi Ulang</Button>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 5. KABAR TERBARU LSP */}
      <section className="py-20 relative">
        <div className="container-tech relative z-10">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii flex items-center gap-3">
              <Newspaper className="text-cyan-600" /> Kabar Terbaru LSP
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="group glass-panel bg-white/70 border border-slate-200/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs font-bold text-cyan-600 mb-3 tracking-widest uppercase">{item.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-cyan-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-200/60">
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-cyan-600 flex items-center gap-2 transition-colors">
                      Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEMPAT UJI KOMPETENSI */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-tech relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-uii mb-4 tracking-tight">Tempat Uji Kompetensi</h2>
            <p className="text-cyan-100 text-lg font-medium">Fasilitas yang disediakan untuk mendukung proses sertifikasi.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* TUK 1 */}
            <div className="flex flex-col glass-dark border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-full h-64 bg-slate-800 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x2e7a5edadfa9e1ab%3A0xc3b7ea672df0ea4!2sUniversitas%20Islam%20Indonesia!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map Ruang Training Center Simpul Tumbuh UII"
                />
              </div>
              <div className="p-8 flex gap-5">
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Ruang Training Center Simpul Tumbuh UII</h3>
                  <p className="text-slate-300 leading-relaxed text-sm font-medium">
                    Gedung Growth Hub (Bookstore) Lt.3, Kampus Terpadu UII<br/>
                    Boulevard UII, Jalan Kaliurang km. 14,5 Sleman – DIY : 55584
                  </p>
                </div>
              </div>
            </div>

            {/* TUK 2 */}
            <div className="flex flex-col glass-dark border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300">
              <div className="w-full h-64 bg-slate-800 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x2e7a5edadfa9e1ab%3A0xc3b7ea672df0ea4!2sUniversitas%20Islam%20Indonesia!5e0!3m2!1sen!2sid!4v1700000000001!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map Laboratorium Analis Kimia"
                />
              </div>
              <div className="p-8 flex gap-5">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Laboratorium Analis Kimia</h3>
                  <p className="text-slate-300 leading-relaxed text-sm font-medium">
                    Laboratorium Terpadu UII<br/>
                    Jalan Kaliurang km. 14,5 Sleman – DIY : 55584
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}