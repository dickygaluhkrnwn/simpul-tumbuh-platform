"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, Award, Users, BookOpen, 
  MapPin, Newspaper, ArrowRight, Menu, X, 
  FileText, Briefcase, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
          ? "bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 shadow-xl"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-t border-slate-800 p-6 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
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
    { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=400&auto=format&fit=crop" },
    { title: "Validasi Metode Spektrometri", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop" },
    { title: "Ahli K3 Umum", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop" }
  ];
  
  const pelatihan = [
    { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
    { title: "TRIZ", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" },
    { title: "K3 Umum", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <LspHeader />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop" 
            alt="LSP Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          {/* Overlay Gelap Super Pekat */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Efek Glow Cyan */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <ShieldCheck size={16} /> Sertifikasi Profesi
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Lembaga Sertifikasi Profesi <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Universitas Islam Indonesia</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl font-medium drop-shadow-xl leading-relaxed">
              LSP UII memberikan jaminan pelayanan Sertifikasi Kompetensi yang mengutamakan mutu, jujur, cepat, akurat, dan efektif. Kami mendorong tersedianya tenaga kerja yang kompeten, profesional, dan kompetitif bagi mahasiswa UII maupun Umum.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" className="h-14 px-8 text-lg font-bold bg-cyan-600 hover:bg-cyan-500 border-none shadow-[0_0_20px_rgba(6,182,212,0.5)] text-white">
                Daftar Sertifikasi <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-20 -mt-16 mb-20 px-4">
        <div className="container-tech">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center shrink-0">
                    <Icon size={32} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white font-uii">{stat.value}</h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PROGRAM SERTIFIKASI & PELATIHAN */}
      <section id="sertifikasi" className="py-20 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container-tech">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Sertifikasi */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-uii flex items-center gap-3">
                  <ShieldCheck className="text-cyan-600" /> Program Sertifikasi
                </h2>
                <Link href="#" className="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline">Lihat Semua</Link>
              </div>
              <div className="space-y-4">
                {sertifikasi.map((item, idx) => (
                  <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Foto */}
                      <img src={item.img} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all mr-2" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pelatihan */}
            <motion.div id="pelatihan" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-uii flex items-center gap-3">
                  <BookOpen className="text-blue-500" /> Program Pelatihan
                </h2>
                <Link href="#" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Lihat Semua</Link>
              </div>
              <div className="space-y-4">
                {pelatihan.map((item, idx) => (
                  <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Foto */}
                      <img src={item.img} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mr-2" />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM PSKK (Revised) */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="container-tech relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-slate-950 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-uii mb-6">Program PSKK</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Program Sertifikasi Kompetensi Kerja (PSKK) adalah program dengan anggaran stimulus oleh Badan Nasional Sertifikasi Profesi (BNSP) kepada LSP Terlisensi dengan melibatkan dunia usaha/industri terutama pada sektor industri. Melalui program ini, pemerintah membantu untuk mempercepat pengakuan sertifikasi kompetensi bagi tenaga kerja. LSP UII sebagai lembaga sertifikasi terlisensi oleh BNSP selalu mendapat bantuan PSKK setiap tahunnya.
              </p>
            </div>

            {/* List Action Buttons (Sesuai Web Asli) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto relative z-10">
              <div className="flex justify-between items-center bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <span className="font-bold text-slate-200 text-sm md:text-base">Daftar Peserta PSKK</span>
                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Lihat</Button>
              </div>
              
              <div className="flex justify-between items-center bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <span className="font-bold text-slate-200 text-sm md:text-base">Jadwal PSKK</span>
                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Lihat</Button>
              </div>
              
              <div className="flex justify-between items-center bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <span className="font-bold text-slate-200 text-sm md:text-base pr-4">Registrasi Ulang Spektrometri</span>
                <Button variant="primary" size="sm" className="bg-cyan-600 hover:bg-cyan-500 border-none shrink-0">Registrasi Ulang</Button>
              </div>
              
              <div className="flex justify-between items-center bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <span className="font-bold text-slate-200 text-sm md:text-base pr-4">Registrasi Ulang Analisis Dasar Kimia</span>
                <Button variant="primary" size="sm" className="bg-cyan-600 hover:bg-cyan-500 border-none shrink-0">Registrasi Ulang</Button>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 5. KABAR TERBARU LSP */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container-tech">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii flex items-center gap-3">
              <Newspaper className="text-cyan-600" /> Kabar Terbaru LSP
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-3">{item.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-cyan-600 flex items-center gap-2">
                      Baca Selengkapnya <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEMPAT UJI KOMPETENSI (Revised with Maps) */}
      <section className="py-24 bg-gradient-to-br from-cyan-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-tech relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-uii mb-4">Tempat Uji Kompetensi</h2>
            <p className="text-cyan-100 text-lg">Fasilitas yang disediakan untuk mendukung proses sertifikasi.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* TUK 1 */}
            <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-shadow duration-300">
              {/* Google Maps Iframe */}
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
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ruang Training Center Simpul Tumbuh UII</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Gedung Growth Hub (Bookstore) Lt.3, Kampus Terpadu UII<br/>
                    Boulevard UII, Jalan Kaliurang km. 14,5 Sleman – DIY : 55584
                  </p>
                </div>
              </div>
            </div>

            {/* TUK 2 */}
            <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow duration-300">
              {/* Google Maps Iframe */}
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
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Laboratorium Analis Kimia</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Laboratorium Terpadu UII<br/>
                    Jalan Kaliurang km. 14,5 Sleman – DIY : 55584
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}