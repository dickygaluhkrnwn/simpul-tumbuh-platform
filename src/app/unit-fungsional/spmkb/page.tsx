"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ShieldAlert, Users, Globe, Target, 
  Activity, ArrowRight, Menu, X, 
  BookOpen, Rocket, GraduationCap, Map
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

// --- HEADER KHUSUS SPMKB (MICRO-SITE HEADER) ---
const spmkbNavLinks = [
  { name: "Beranda", href: "/unit-fungsional/spmkb" },
  { name: "Pusat Studi", href: "#" },
  { name: "Berita", href: "#" },
  { name: "Artikel", href: "#" },
  { name: "Kemitraan", href: "#" },
];

function SpmkbHeader() {
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
          
          {/* Logo SPMKB */}
          <Link href="/unit-fungsional/spmkb" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <ShieldAlert className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-uii font-bold text-xl leading-none tracking-tight text-white">
                SPMKB/BUiLD
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-amber-400">
                Ketangguhan Bencana
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {spmkbNavLinks.map((link) => (
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-amber-400 hover:text-white hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm"
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
          {spmkbNavLinks.map((link) => (
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
              <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:text-white hover:bg-amber-500/20 bg-amber-500/10">
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
export default function SpmkbPage() {
  const misiList = [
    { text: "Menjadi center of excellence (simpul) bagi kegiatan-kegiatan bertema kebencanaan di Universitas Islam Indonesia.", icon: Target },
    { text: "Menjadi pusat IPTEKS yang berbasis pada keunggulan UII sebagai pusat pengembangan ilmu pengetahuan serta sumber daya manusia.", icon: BookOpen },
    { text: "Menguatkan kolaborasi penelitian dan diseminasi antar pusat studi kebencanaan untuk menjulang kebermanfaatan yang lebih luas kepada masyarakat.", icon: Users },
    { text: "Mencapai rekognisi ilmiah kelas dunia di bidang kebencanaan, serta menghasilkan produk baik ilmu pengetahuan, teknologi, maupun produk inovasi yang berbasis demand.", icon: Globe }
  ];

  // Data dengan tambahan foto placeholder
  const dewanPengarah = [
    { name: "Prof. Fathul Wahid., S.T., M.Sc., Ph.D.", role: "Rektor", dept: "Informatika", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Drs. Imam Djati Widodo., M.Eng. Sc.", role: "Wakil Rektor Bidang I", dept: "Teknik Industri", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Zaenal Arifin., M.Si.", role: "Wakil Rektor Bidang II", dept: "Manajemen", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Drs. Rohidin., M.Ag.", role: "Wakil Rektor Bidang III", dept: "Hukum", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { name: "Ir. Wiryono Raharjo., M.Arch., Ph.D.", role: "Wakil Rektor Bidang IV", dept: "Arsitektur", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Ir. Arif Wismadi., M.Sc.", role: "Direktur DPPK", dept: "Arsitektur", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop" },
  ];

  const pimpinan = [
    { name: "Dr. Ir. Dwi Handayani., S.T., M.Sc., IPM.", role: "Ketua PUI-PT", dept: "Teknik Industri", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
    { name: "M. Nurul Ikhsan Saleh, S.Pd.I., M.Ed.", role: "Wakil Ketua", dept: "Pendidikan Agama Islam", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  ];

  const anggota = [
    { name: "Prof. Ir. Widodo, MCSE., Ph.D.", dept: "Teknik Sipil", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop" },
    { name: "Prof. Ir. H. Sarwidi, MSCE, Ph.D., AU.", dept: "Teknik Sipil", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Sus Budiharto., S.Psi., M.Psi., Psikolog.", dept: "Psikologi", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Yulianto P Prihatmaji., IPM., IAI.", dept: "Arsitektur", image: "https://images.unsplash.com/photo-1583195764036-6b11453e0eb6?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Phil. Dra. Emi Zulaifah, M.Sc.", dept: "Psikologi", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
    { name: "Dr. Phil. Qurotul Uyun, S.Psi., M.Si., Psikolog.", dept: "Psikologi", image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=200&auto=format&fit=crop" },
    { name: "Setya Winarno, ST., MT., Ph.D.", dept: "Teknik Sipil", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop" },
    { name: "Azham Umar Abidin, SKM., MPH", dept: "Teknik Lingkungan", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
    { name: "Ir. Ruzardi, MS.", dept: "Teknik Sipil", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { name: "Ata Muftihah, S.S., S.Pd", dept: "Staff", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
    { name: "Indah Kurniasari., SP.", dept: "Staff", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
    { name: "Deni Astuti, S.Pd.", dept: "Staff", image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=200&auto=format&fit=crop" },
    { name: "Aprilia Putri Lestari, S.T.", dept: "Staff", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" }
  ];

  const roadmap = [
    {
      year: "2021-2022",
      title: "R and D",
      subtitle: "Capacity Building:",
      desc: "FGD Road Map Riset, Workshop, Pengelolaan Fasilitas dan Tata Kelola Organisasi, dan Pengembangan Website.",
      icon: Users
    },
    {
      year: "2023-2024",
      title: "Perencanaan Model",
      subtitle: "Academic Excellence:",
      desc: "Pembuatan Jurnal, Simposium, Seminar, FGD, Bantuan Riset, Magang dan Publikasi.",
      icon: GraduationCap
    },
    {
      year: "2025",
      title: "Evaluasi Model",
      subtitle: "Komersialisasi dan Pemanfaatan Riset:",
      desc: "Penyusunan model, Pameran, diseminasi, Jejaring, Workshop, Public Expose, Pendampingan, Sertifikasi.",
      icon: Rocket
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <SpmkbHeader />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop" 
            alt="SPMKB Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[20%]"
          />
          {/* Overlay Gelap Super Pekat */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Efek Glow Amber */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Activity size={16} /> Research & Excellence Center
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Simpul Pemberdayaan Masyarakat untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Ketangguhan Bencana</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl font-medium drop-shadow-xl leading-relaxed">
              Hadir untuk meningkatkan dan menguatkan kolaborasi penelitian di bidang kebencanaan dengan melibatkan sivitas akademika UII dan masyarakat pada level nasional hingga internasional.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. TENTANG SPMKB */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUpVariant} className="prose prose-lg dark:prose-invert text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-none text-justify">
              <p>
                Simpul Pemberdayaan Masyarakat untuk Ketangguhan Bencana, Universitas Islam Indonesia (SPMKB – UII) hadir dengan tujuan meningkatkan dan menguatkan kolaborasi penelitian di bidang kebencanaan dengan melibatkan seluruh sivitas akademika UII dan masyarakat sekitar, bukan hanya pada level nasional, tapi juga internasional, agar hasilnya bisa dirasakan oleh masyarakat lebih luas. 
              </p>
              <p>
                Lebih spesifik lagi, SPMKB diharapkan menjadi simpul penghubung dan pusat koordinasi bersama antar unit atau pusat studi kebencanaan di UII agar lebih masif kontribusi yang diberikan dan bisa mengoptimalkan langkah-langkah diseminasi. 
              </p>
              <p>
                Harapannya SPMKB bisa menjadi <strong>Pusat Unggulan Ipteks Perguruan Tinggi (PUI-PT)</strong> dengan sumbangan besar yang bisa berdampak pada peningkatan peringkat universitas dan rekognisi di dunia seperti dalam pemeringkatan World University Ranking. Proposal ini memiliki fokus pada penelitian bidang ketangguhan bencana yang diharapkan bisa meningkatkan inovasi dan peran serta dalam memecahkan permasalahan kebencanaan sehingga tercipta masyarakat Indonesia yang siap sedia menghadapi bencana.
              </p>
              <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 mt-8 rounded-r-2xl">
                <p className="m-0 text-amber-900 dark:text-amber-100 font-semibold">
                  Dengan pengalaman yang panjang dalam penelitian kebencanaan dan kolaborasi internasional, SPMKB mengembangkan kegiatan berpusat pada tiga ranah: <span className="text-amber-600 dark:text-amber-400">Academic Excellence</span>, <span className="text-amber-600 dark:text-amber-400">Komersialisasi & Pemanfaatan Riset</span>, dan <span className="text-amber-600 dark:text-amber-400">Capacity Building</span>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto space-y-16"
          >
            {/* Visi */}
            <motion.div variants={fadeUpVariant} className="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/20 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <Target size={56} className="mx-auto text-amber-500 mb-8" />
                <h3 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase mb-6">Visi Kami</h3>
                <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed max-w-4xl mx-auto font-uii italic">
                  "Menjadi simpul pemberdayaan masyarakat untuk mencapai ketangguhan bencana yang berakar kuat (values), menjulang tinggi (innovation), berbuah lebat (benefits) dan diakui secara nasional maupun internasional (recognition)."
                </p>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center uppercase tracking-widest text-sm text-amber-600 dark:text-amber-500">
                Misi Kami
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {misiList.map((misi, index) => {
                  const Icon = misi.icon;
                  return (
                    <div key={index} className="flex gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon size={28} />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {misi.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. STRUKTUR ORGANISASI (REVISED - POHON HIERARKI) */}
      <section className="py-20 md:py-32 relative bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Struktur Organisasi
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Hierarki kepengurusan Simpul Pemberdayaan Masyarakat untuk Ketangguhan Bencana UII.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="relative w-full max-w-6xl mx-auto flex flex-col items-center"
          >
            {/* Garis Vertikal Utama (Trunk) - Disembunyikan di mobile agar tidak berantakan */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-amber-200 dark:bg-amber-800/50 z-0" />

            {/* LEVEL 1: Dewan Pengarah */}
            <motion.div variants={fadeUpVariant} className="relative z-10 w-full mb-16 md:mb-24 flex flex-col items-center">
              <div className="bg-amber-500 text-white px-8 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm mb-10 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                Dewan Pengarah
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {dewanPengarah.map((person, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <img src={person.image} alt={person.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-50 dark:border-slate-800" />
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 mb-1 uppercase tracking-wider">{person.role}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-snug">{person.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{person.dept}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LEVEL 2: Pimpinan */}
            <motion.div variants={fadeUpVariant} className="relative z-10 w-full mb-16 md:mb-24 flex flex-col items-center">
              <div className="bg-amber-500 text-white px-8 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm mb-10 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                Pimpinan
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 w-full max-w-3xl relative">
                {/* Garis horizontal bercabang untuk Pimpinan di Desktop */}
                <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-amber-200 dark:bg-amber-800/50 -z-10" />

                {pimpinan.map((person, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border-2 border-amber-400/50 dark:border-amber-600/50 p-6 rounded-3xl shadow-lg flex flex-col items-center text-center w-full md:w-72 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-amber-100 dark:border-slate-800 shadow-inner" />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-500 mb-2 uppercase tracking-widest">{person.role}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug">{person.name}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{person.dept}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LEVEL 3: Anggota */}
            <motion.div variants={fadeUpVariant} className="relative z-10 w-full flex flex-col items-center">
              <div className="bg-slate-800 text-white px-8 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm mb-10 shadow-md">
                Anggota
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
                {anggota.map((person, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center text-center hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all duration-300">
                    <img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-slate-100 dark:border-slate-800" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1 leading-tight">{person.name}</h4>
                    <p className="text-[10px] font-medium text-amber-600 dark:text-amber-500">{person.dept}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 5. ROADMAP */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Roadmap
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Peta jalan pengembangan riset dan kegiatan SPMKB UII.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Connecting Line untuk Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
              {roadmap.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div key={idx} variants={fadeUpVariant} className="relative z-10 flex flex-col items-center text-center group">
                    <div className="mb-6 flex flex-col items-center">
                      <div className="w-20 h-20 bg-white dark:bg-slate-900 border-4 border-amber-500 rounded-full flex items-center justify-center text-amber-500 shadow-xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 z-10">
                        <Icon size={32} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-lg w-full h-full hover:-translate-y-2 transition-transform duration-300 relative">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500 rounded-t-3xl" />
                      <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold tracking-widest mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase">{item.subtitle}</p>
                      <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}