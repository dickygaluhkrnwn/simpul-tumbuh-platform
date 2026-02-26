"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Rocket, Users, CircleDollarSign, Award, 
  BookOpen, Store, Mic, Tent, FlaskConical, 
  CalendarDays, ArrowRight, Quote, Menu, X, ChevronLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer"; 

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
          ? "bg-slate-900/90 backdrop-blur-lg border-b border-slate-800/50 shadow-xl"
          : "bg-transparent py-2"
      )}
    >
      <div className="container-tech py-3 md:py-4">
        <div className="flex items-center justify-between">
          
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

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link href="#apply">
              <Button variant="primary" size="sm" className="bg-rose-600 hover:bg-rose-500 border-none shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] text-white font-bold transition-all">
                Apply Now
              </Button>
            </Link>
            
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all duration-300 border border-rose-500/30 bg-rose-500/10 backdrop-blur-sm"
            >
              ← Portal Utama
            </Link>
          </div>

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

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-6 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
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
              <Button variant="primary" className="w-full bg-rose-600 hover:bg-rose-500 border-none shadow-[0_0_15px_rgba(225,29,72,0.4)]">Apply Now</Button>
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
    { value: "Rp7.000.000.000,00", label: "Raihan Pendanaan", icon: CircleDollarSign },
    { value: "A", label: "Akreditasi Nasional", icon: Award },
  ];

  const programs = [
    { title: "Growth Academy", desc: "Comprehensive Incubation Program", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Market Festival", desc: "Small Medium Enterprise Market Day", icon: Store, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Growth Festival", desc: "Startup Expo, Demo Day, Business Matching & Investment Pitching", icon: Rocket, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Growth Talk", desc: "Startup Workshop & Business Sharing Sessions", icon: Mic, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Growth Camp", desc: "Startup/Innovation Hackathon and Pre-Incubation Program", icon: Tent, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Growth Labs", desc: "Coordinating Entrepreneurship Labs (inn Faculty/Study Program) for Pre-Incubation Stage", icon: FlaskConical, color: "text-cyan-600", bg: "bg-cyan-50" },
  ];

  const testimonials = [
    {
      name: "Witianty Putri Aprilia",
      role: "Owner & CEO Sustainable Space Indonesia",
      text: "Assalamualaikum wr.wb, izinkan saya Witianty Putri Aprilia selaku Owner & CEO dari Sustainable Space Indonesia mengucapkan banyak terimakasih kepada IBISMA UII terutama dari ada nya program UBIC.9 ini kami dapat melakukan pengembangan startup kami dengan diberikanya pendanaan yang vital sehingga startup ini bukan menjadi sebuah mimpi tetapi dapat terealisasi. Selain itu, kami sebagai pelaku bisnis mendapatkan banyak ilmu yang sebelumnya kami tidak ketahui menjadi paham melalui program pelatihan dalam ibisma growth academy. Semoga kedepannya IBISMA UII semakin sukses dan jaya",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Roaida Yanti",
      role: "CEO Juana Fishchips (JOEFI)",
      text: "IBISMA UII merupakan keluarga yang sangat supportive, selalu mendengar keluh kesah kami selaku pelaku UMKM yang masih perlu banyak bimbingan. Bersama IBISMA, kami merasa mendapatkan previllage untuk bisa akselerasi bisnis kami. Terima kasih untuk IBISMA dan mentor-mentor hebat yang sudah mendampingi kami. Semoga kedepannya IBISMA bisa lebih keren lagi dan bisa membantu lebih banyak UMKM untuk berkembang",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const events = [
    {
      title: "ASEAN ENTREPRENEURSHIP HACKATHON",
      date: "Coming Soon",
      desc: "Halo !! Kabar baik bagi para mahasiswa yang ingin Berprestasi di Level Internasional (ASEAN & Global) pada bi..",
      status: "Daftar Sekarang"
    },
    {
      title: "Innovation Coach: 1 Session",
      date: "22 Januari 2024",
      desc: "Ruang Training, Growth Hub Universitas Islam Indonesia Lt. 3",
      status: "Event Selesai"
    },
    {
      title: "Innovation Coach: 2 Session",
      date: "26 Januari 2024",
      desc: "Ruang Training, Growth Hub Universitas Islam Indonesia Lt. 3",
      status: "Event Selesai"
    }
  ];

  const newsData = [
    { title: "UII Bersinergi Dengan 7 Perguruan Tinggi Dukung Program Wirausaha Belia", desc: "Pada hari Kamis, 28 Desember 2023, bertempat di Kantor Pusat Bank BPD DIY dilaksanakan Penandatanganan Perjanjian Kerja Sama Pengembangan Usaha dan Pendampingan Kewirausahaan bagi Wirausaha Belia." },
    { title: "UII Bersinergi Dengan 7 Perguruan Tinggi Dukung Program Wirausaha Belia", desc: "Pada hari Kamis, 28 Desember 2023, bertempat di Kantor Pusat Bank BPD DIY dilaksanakan Penandatanganan Perjanjian Kerja Sama Pengembangan Usaha dan Pendampingan Kewirausahaan bagi Wirausaha Belia." },
    { title: "UII Bersinergi Dengan 7 Perguruan Tinggi Dukung Program Wirausaha Belia", desc: "Pada hari Kamis, 28 Desember 2023, bertempat di Kantor Pusat Bank BPD DIY dilaksanakan Penandatanganan Perjanjian Kerja Sama Pengembangan Usaha dan Pendampingan Kewirausahaan bagi Wirausaha Belia." },
  ];

  const [currentNews, setCurrentNews] = useState(0);
  const [currentTesti, setCurrentTesti] = useState(0);

  // Auto slide untuk berita (Hero)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTesti = () => setCurrentTesti((prev) => (prev + 1) % testimonials.length);
  const prevTesti = () => setCurrentTesti((prev) => (prev - 1 + testimonials.length) % testimonials.length);


  return (
    <main className="min-h-screen relative selection:bg-rose-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Rose Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      
      <IbismaHeader />

      {/* 1. HERO SECTION DENGAN SLIDER BERITA */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop" 
            alt="IBISMA Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
        </div>

        <div className="container-tech relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Teks Intro */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
              <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-rose-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
                <Rocket size={16} className="animate-bounce" /> Inkubator Bisnis UII
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
                Mulailah rintis startup Anda bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">mentor digital</span>
              </motion.h1>
              
              <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-200 mb-10 font-medium drop-shadow-xl leading-relaxed">
                Inkubasi Bisnis & Inovasi Bersama Universitas Islam Indonesia. Wujudkan ide brilian Anda menjadi bisnis yang berdampak dan berkelanjutan.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
                <Button size="lg" variant="primary" className="h-14 px-8 text-lg font-bold bg-rose-600 hover:bg-rose-500 border-none shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-transform hover:scale-105">
                  Apply Now <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Slider Berita Asli */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="relative w-full h-[400px] rounded-3xl overflow-hidden glass-dark border border-white/10 p-8 flex flex-col justify-end group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNews}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-20"
                >
                  <h3 className="text-2xl font-bold text-white mb-3 leading-snug drop-shadow-md">
                    {newsData[currentNews].title}
                  </h3>
                  <p className="text-slate-300 line-clamp-3 text-sm leading-relaxed mb-6">
                    {newsData[currentNews].desc}
                  </p>
                  <Link href="#" className="inline-flex items-center text-sm font-bold text-rose-400 hover:text-rose-300">
                    Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                <button onClick={() => setCurrentNews(prev => (prev - 1 + newsData.length) % newsData.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"><ChevronLeft size={20}/></button>
                <button onClick={() => setCurrentNews(prev => (prev + 1) % newsData.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"><ChevronRight size={20}/></button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-20 -mt-12 mb-20 px-4">
        <div className="container-tech">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-panel bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-2xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-rose-50/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={32} className="text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-slate-900 font-uii tracking-tight">{stat.value}</h3>
                    <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">
              Looking to transform your business?
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Optimize with us and transform your business today!
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className="group glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${prog.bg} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl ${prog.bg} border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                    <Icon size={28} className={prog.color} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{prog.title}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 relative z-10">{prog.desc}</p>
                  <Link href="#" className={`inline-flex items-center text-sm font-bold ${prog.color} group-hover:translate-x-2 transition-transform relative z-10`}>
                    Selengkapnya <ArrowRight size={16} className="ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. WHAT'S NEXT (Events) */}
      <section className="py-16 md:py-24 relative overflow-hidden border-y border-slate-200/50 bg-slate-50/50">
        <div className="container-tech relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-uii flex items-center justify-center gap-3">
              <CalendarDays className="text-rose-500" /> What's Next?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev, idx) => (
              <div key={idx} className="glass-panel bg-white/80 border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col">
                <span className={`text-xs font-bold px-4 py-1.5 rounded-full mb-5 self-start ${ev.status === 'Daftar Sekarang' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  {ev.status}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{ev.title}</h3>
                <p className="text-sm text-rose-600 font-bold mb-4">{ev.date}</p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mt-auto">{ev.desc}</p>
                {ev.status === 'Daftar Sekarang' && (
                  <Button variant="outline" className="mt-6 w-full text-rose-600 border-rose-200 hover:bg-rose-50">Daftar Sekarang</Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (Slider Layout) */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white border-y border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-tech relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-uii mb-4 tracking-tight">What our tenant say</h2>
          <p className="text-lg text-slate-400 font-medium mb-16">Kisah sukses dari mereka yang telah bertumbuh bersama IBISMA.</p>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTesti}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-dark border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative"
              >
                <Quote size={80} className="absolute top-10 left-10 text-white/5" />
                <p className="text-slate-300 font-medium leading-relaxed mb-10 text-lg md:text-xl italic relative z-10">
                  "{testimonials[currentTesti].text}"
                </p>
                <div className="flex flex-col items-center gap-4 relative z-10 pt-8 border-t border-white/10">
                  <img src={testimonials[currentTesti].image} alt={testimonials[currentTesti].name} className="w-20 h-20 rounded-full object-cover border-4 border-rose-500 shadow-lg" />
                  <div>
                    <h4 className="font-bold text-white text-xl">{testimonials[currentTesti].name}</h4>
                    <p className="text-sm font-bold text-rose-400 tracking-wider mt-1">{testimonials[currentTesti].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-10">
              <button onClick={prevTesti} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"><ChevronLeft size={24}/></button>
              <span className="flex items-center text-sm font-bold text-slate-400">{currentTesti + 1} / {testimonials.length}</span>
              <button onClick={nextTesti} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"><ChevronRight size={24}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA & PARTNERS */}
      <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-tech relative z-10 mb-20">
          <h3 className="text-sm font-bold text-rose-200 tracking-[0.2em] uppercase mb-8">
            Collaborate with a diverse network of partners.
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {/* 6 Logo Partners */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-24 h-12 md:w-32 md:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 p-2">
                 <img src={`https://ui-avatars.com/api/?name=Partner+${i}&background=ffffff&color=e11d48&font-size=0.3`} alt={`Partner ${i}`} className="w-full h-full object-contain opacity-80" />
              </div>
            ))}
          </div>
        </div>

        <div className="container-tech relative z-10 border-t border-white/20 pt-20">
          <h2 className="text-4xl md:text-6xl font-bold font-uii mb-6 drop-shadow-md">Join us as our 360+ tenant!</h2>
          <Button size="lg" className="bg-white text-rose-700 hover:bg-slate-50 border-none shadow-2xl transition-transform hover:scale-105 font-bold h-14 px-10 text-lg rounded-full mb-16">
            Gabung Komunitas
          </Button>

          {/* 9 Logo Startups - Scrolling Marquee */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-rose-700 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-rose-800 to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex gap-4 md:gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, idx) => (
                <div key={idx} className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center p-4 shadow-lg shrink-0">
                  <img src={`https://ui-avatars.com/api/?name=Startup+${i}&background=f1f5f9&color=e11d48&font-size=0.25`} alt={`Startup ${i}`} className="w-full h-full object-contain rounded-xl" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}