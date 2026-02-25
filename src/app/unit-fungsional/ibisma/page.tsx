"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  Rocket, Users, CircleDollarSign, Award, 
  BookOpen, Store, Mic, Tent, FlaskConical, 
  CalendarDays, ArrowRight, Quote, Menu, X 
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

// --- HEADER KHUSUS IBISMA (MICRO-SITE HEADER) ---
const ibismaNavLinks = [
  { name: "Beranda", href: "/unit-fungsional/ibisma" },
  { name: "Profil", href: "#" },
  { name: "Program", href: "#" },
  { name: "Ideas Bank", href: "#" },
  { name: "Talent Hub", href: "#" },
  { name: "Tenant", href: "#" },
  { name: "Berita", href: "#" },
];

function IbismaHeader() {
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
          
          {/* Logo IBISMA */}
          <Link href="/unit-fungsional/ibisma" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 transition-all duration-300">
              <Rocket className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-uii font-bold text-xl leading-none tracking-tight text-white">
                IBISMA UII
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-rose-400">
                Inkubator Bisnis
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {ibismaNavLinks.map((link) => (
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
            <Link href="#apply">
              <Button variant="primary" size="sm" className="bg-rose-600 hover:bg-rose-500 border-none shadow-[0_0_15px_rgba(225,29,72,0.4)] text-white font-bold">
                Apply Now
              </Button>
            </Link>
            
            {/* Tombol Kembali ke Portal Utama ditaruh paling kanan */}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all duration-300 border border-rose-500/30 bg-rose-500/10 backdrop-blur-sm"
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
          {ibismaNavLinks.map((link) => (
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
            <Link href="#apply" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full bg-rose-600 hover:bg-rose-500 border-none">Apply Now</Button>
            </Link>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-rose-500/30 text-rose-400 hover:text-white hover:bg-rose-500/20 bg-rose-500/10">
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
export default function IbismaPage() {
  const stats = [
    { value: "360+", label: "Total Tenant", icon: Users },
    { value: "Rp 7M+", label: "Raihan Pendanaan", icon: CircleDollarSign },
    { value: "A", label: "Akreditasi Nasional", icon: Award },
  ];

  const programs = [
    { title: "Growth Academy", desc: "Comprehensive Incubation Program", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Market Festival", desc: "Small Medium Enterprise Market Day", icon: Store, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Growth Festival", desc: "Startup Expo, Demo Day & Business Matching", icon: Rocket, color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Growth Talk", desc: "Startup Workshop & Business Sharing Sessions", icon: Mic, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Growth Camp", desc: "Startup/Innovation Hackathon & Pre-Incubation", icon: Tent, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Growth Labs", desc: "Coordinating Entrepreneurship Labs for Pre-Incubation", icon: FlaskConical, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  const testimonials = [
    {
      name: "Witianty Putri Aprilia",
      role: "Owner & CEO Sustainable Space Indonesia",
      text: "Terimakasih kepada IBISMA UII terutama dari adanya program UBIC.9 ini kami dapat melakukan pengembangan startup kami dengan diberikannya pendanaan yang vital sehingga startup ini bukan menjadi sebuah mimpi tetapi dapat terealisasi. Banyak ilmu bisnis yang kami dapatkan dari Growth Academy.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Roaida Yanti",
      role: "CEO Juana Fishchips (JOEFI)",
      text: "IBISMA UII merupakan keluarga yang sangat supportive, selalu mendengar keluh kesah kami selaku pelaku UMKM yang masih perlu banyak bimbingan. Bersama IBISMA, kami merasa mendapatkan previlege untuk bisa akselerasi bisnis kami. Terima kasih mentor-mentor hebat!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const events = [
    {
      title: "ASEAN ENTREPRENEURSHIP HACKATHON",
      date: "Coming Soon",
      desc: "Kabar baik bagi para mahasiswa yang ingin Berprestasi di Level Internasional (ASEAN & Global).",
      status: "Daftar Sekarang"
    },
    {
      title: "Innovation Coach: 1 Session",
      date: "22 Januari 2024",
      desc: "Ruang Training, Growth Hub Universitas Islam Indonesia Lt. 3",
      status: "Event Selesai"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Menggunakan Header Khusus IBISMA */}
      <IbismaHeader />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 bg-slate-950">
          {/* Gambar aslinya langsung dibuat redup ekstrim (opacity 20% & filter gelap) */}
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop" 
            alt="IBISMA Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[50%]"
          />
          
          {/* Gradient untuk memastikan sisi kiri tempat teks berada adalah hitam pekat */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Efek Glow diturunkan drastis agar tidak memantulkan cahaya menyilaukan ke teks */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Rocket size={16} /> Inkubator Bisnis UII
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              Mulailah rintis startup Anda <br className="hidden md:block"/> bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">mentor digital</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-slate-100 mb-10 max-w-2xl font-medium drop-shadow-xl">
              Inkubasi Bisnis & Inovasi Bersama Universitas Islam Indonesia. Wujudkan ide brilian Anda menjadi bisnis yang berdampak dan berkelanjutan.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" className="h-14 px-8 text-lg font-bold bg-rose-600 hover:bg-rose-500 border-none shadow-[0_0_20px_rgba(225,29,72,0.5)]">
                Gabung Sekarang <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl">
                Pelajari Program
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Floating over Hero) */}
      <section className="relative z-20 -mt-12 mb-20 px-4">
        <div className="container-tech">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0">
                    <Icon size={32} className="text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-uii">{stat.value}</h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PROGRAMS SECTION */}
      <section className="py-16 md:py-24 relative">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Looking to transform your business?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Optimize with us and transform your business today! Temukan program yang paling sesuai dengan tahap perkembangan startup atau UMKM Anda.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl ${prog.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} className={prog.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{prog.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">{prog.desc}</p>
                  <Link href="#" className={`inline-flex items-center text-sm font-bold ${prog.color} hover:underline`}>
                    Selengkapnya <ArrowRight size={16} className="ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. WHAT'S NEXT (Events) & NEWS (Dummy Layout) */}
      <section className="py-16 md:py-24 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          {/* Menggunakan items-stretch agar tinggi kolom sejajar persis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
            
            {/* Events Column */}
            <div className="lg:col-span-5 flex flex-col">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-uii mb-10 flex items-center gap-3 shrink-0">
                <CalendarDays className="text-rose-500" /> What's Next?
              </h2>
              <div className="space-y-8 flex-grow flex flex-col justify-between">
                {events.map((ev, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-rose-500 transition-all duration-300 h-full flex flex-col justify-center">
                    <div>
                      <span className={`text-xs font-bold px-4 py-1.5 rounded-full mb-5 inline-block ${ev.status === 'Daftar Sekarang' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                        {ev.status}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">{ev.title}</h3>
                      <p className="text-sm text-rose-600 dark:text-rose-400 font-bold mb-4">{ev.date}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dummy News Highlight */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex justify-between items-end mb-10 shrink-0">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-uii">Kabar Terbaru</h2>
                <Link href="#" className="text-sm font-bold text-rose-600 hover:underline">Lihat Semua</Link>
              </div>
              <div className="relative flex-grow rounded-3xl overflow-hidden group cursor-pointer shadow-xl min-h-[350px]">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-10">
                  <span className="bg-rose-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 inline-block shadow-lg">Berita Utama</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                    UII Bersinergi Dengan 7 Perguruan Tinggi Dukung Program Wirausaha Belia
                  </h3>
                  <p className="text-slate-300 line-clamp-3 text-lg leading-relaxed">Pada hari Kamis, 28 Desember 2023, bertempat di Kantor Pusat Bank BPD DIY dilaksanakan Penandatanganan Perjanjian Kerja Sama Pengembangan Usaha dan Pendampingan Kewirausahaan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-tech">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-4">What our tenant say</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Kisah sukses dari mereka yang telah bertumbuh bersama IBISMA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-xl relative">
                <Quote size={60} className="absolute top-6 right-6 text-slate-100 dark:text-slate-800" />
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-8 relative z-10 italic">
                  "{testi.text}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <img src={testi.image} alt={testi.name} className="w-14 h-14 rounded-full object-cover border-2 border-rose-100 dark:border-rose-900" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="container-tech relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-uii mb-6">Empowering for Tomorrow</h2>
          <p className="text-xl text-rose-100 mb-10 max-w-2xl mx-auto">Join us as our 360+ tenant and collaborate with a diverse network of partners.</p>
          {/* MENGGUNAKAN VARIANT GHOST: Agar kelas bg-white & text-rose-700 tidak tertimpa default primary */}
          <Button size="lg" variant="ghost" className="bg-white text-rose-700 hover:bg-slate-100 hover:text-rose-800 font-bold h-14 px-10 text-lg shadow-xl border border-white/20">
            Gabung Komunitas IBISMA
          </Button>
        </div>
      </section>

    </main>
  );
}