"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Tambahkan import Footer di sini
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getNews } from "@/lib/firestore/news";
import { Article } from "@/types";
import { 
  Newspaper, ArrowRight, Calendar, Activity, Rocket, 
  Zap, ShieldCheck, Globe, Info, MessageSquare, Send, Megaphone
} from "lucide-react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// --- STATIC DATA BERDASARKAN KONTEN SIMPUL TUMBUH ---
const bannerImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop", // Kampus
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop", // Kolaborasi
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop", // Tech
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop", // Diskusi
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop", // Inovasi
];

const unitNews = {
  ibisma: [
    { date: "September 2, 2025", title: "Asdep Inkubasi dan Digitalisasi Wirausaha Kementerian UMKM dan Inkubator IBISMA UII Mendukung Inkubator UMKM Makassar menjadi Entrepreneur Hub se-Indonesia Timur" },
    { date: "September 1, 2025", title: "KemenUMKM RI Buka Seleksi Nasional “Startup Acceleration Program 2025”: Lintas-Sektor, Siap Investasi, Terhubung Industri, dan Berdampak" },
    { date: "September 1, 2025", title: "Universitas Islam Indonesia dan Asosiasi Inkubator Bisnis Indonesia Dukung Penuh Rangkaian “Startup Acceleration Program 2025” Kementerian UMKM RI" }
  ],
  lsp: [
    { date: "October 1, 2021", title: "Refreshing Materi Uji Kompetensi (MUK)" },
    { date: "October 1, 2021", title: "Pelatihan dan Sertifikasi TRIZ" },
    { date: "September 28, 2021", title: "Pelatihan Offline Program PSKK" }
  ],
  spmkb: [
    { date: "May 9, 2023", title: "KOMPETISI SIAGA AWARDS 2022" },
    { date: "September 28, 2021", title: "Pelatihan Offline Program PSKK" },
    { date: "September 27, 2021", title: "FGD Action Plan CoE SPMKB-BUiLD" }
  ]
};

const announcements = [
  { date: "September 2, 2025", title: "Asdep Inkubasi dan Digitalisasi Wirausaha Kementerian UMKM dan Inkubator IBISMA UII Mendukung Inkubator UMKM Makassar menjadi Entrepreneur Hub se-Indonesia Timur" },
  { date: "September 1, 2025", title: "KemenUMKM RI Buka Seleksi Nasional “Startup Acceleration Program 2025”: Lintas-Sektor, Siap Investasi, Terhubung Industri, dan Berdampak" },
  { date: "September 1, 2025", title: "Universitas Islam Indonesia dan Asosiasi Inkubator Bisnis Indonesia Dukung Penuh Rangkaian “Startup Acceleration Program 2025” Kementerian UMKM RI" },
  { date: "June 25, 2024", title: "Kembangkan Potensi UMKM, Program Inkubator Bisnis UKM Naik Kelas Tahap 2 Digelar" },
  { date: "May 21, 2024", title: "Melalui PINOTI, POPTIKJI Perkuat Pondasi Industri Kecil dan Menengah (IKM)" },
  { date: "May 20, 2024", title: "Tumbuhkan Inovasi: Kemenkop UKM Gelar FGD untuk Dorong Pengembangan Usaha Kecil Menengah" }
];

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNews();
        setNews(newsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto Slider Banner Timer
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 6000); // Ganti gambar setiap 6 detik
    return () => clearInterval(bannerTimer);
  }, []);

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="min-h-screen relative selection:bg-accent-500 selection:text-slate-900 font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-[100] shadow-[0_0_15px_var(--theme-glow-blue)]" 
        style={{ scaleX }} 
      />

      <Header />
      
      {/* Background Orbs & Grids Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/4 left-[-10%] w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center relative">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-500/20 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0" />
            <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500 animate-pulse" size={24} />
          </div>
          <p className="mt-6 text-primary-600 font-bold tracking-[0.3em] text-xs uppercase animate-pulse">Inisialisasi Sistem...</p>
        </div>
      ) : (
        <div className="flex flex-col relative pt-20">
          
          {/* --- FULL-WIDTH SLIDER BANNER TOP --- */}
          <div className="relative w-full h-[35vh] md:h-[45vh] lg:h-[55vh] overflow-hidden bg-slate-900 z-10 border-b border-slate-200/50">
            {bannerImages.map((img, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  x: i === currentBanner ? "0%" : i < currentBanner ? "-100%" : "100%",
                  opacity: i === currentBanner ? 1 : 0.3
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Simpul Tumbuh Banner ${i + 1}`} />
                {/* Gradient overlay agar menyatu dengan konten di bawahnya */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-900/30" />
              </motion.div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {bannerImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 shadow-sm",
                    i === currentBanner ? "w-8 bg-primary-600" : "w-2 bg-white/60 hover:bg-white"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* --- HERO SECTION WITH SPLIT SCREEN (VIDEO & TEXT) --- */}
          <section className="relative pt-12 pb-24 md:pb-32 overflow-hidden flex items-center">
            <div className="container-tech relative z-10 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Left Column: Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-xs md:text-sm font-bold text-primary-600 tracking-widest uppercase mb-6 shadow-sm">
                    <Activity size={16} className="animate-pulse" /> Co-Growing Space
                  </div>
                  
                  {/* FONT UKURAN DIPERKECIL & LINE BREAK MANUAL DIHAPUS */}
                  <h1 className="font-uii text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug mb-6">
                    Direktorat Pembinaan & Pengembangan Kewirausahaan
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                      {" "} / Simpul Tumbuh
                    </span>
                  </h1>
                  
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium mb-10 max-w-xl">
                    Merancang ruang tumbuh bersama yang menghubungkan talenta dan ide bisnis. Kami mengembangkan pembelajaran dan praktik kewirausahaan mahasiswa melalui IBISMA, serta berperan sebagai <strong>penghubung antara sumber daya manusia UII dengan IPTEKS kalangan Industri</strong>.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" className="gap-2 shadow-[0_0_20px_var(--theme-glow-blue)] rounded-full px-8">
                      Jelajahi Ekosistem <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>

                {/* Right Column: YouTube Video iframe */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative w-full aspect-video rounded-[2rem] p-2 glass-panel border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] group"
                >
                  {/* Decorative glowing orb behind the video frame */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-500/10 blur-3xl rounded-[2rem] pointer-events-none transition-all group-hover:bg-primary-500/20" />
                  
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/UV5vZ9pqMD8?rel=0&showinfo=0" 
                    title="Profil Simpul Tumbuh UII" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="relative z-10 w-full h-full rounded-2xl bg-slate-900 object-cover"
                  ></iframe>
                </motion.div>

              </div>
            </div>
          </section>

          {/* --- ERASMUS+ GITA SECTION --- */}
          <section className="py-20 relative">
            <div className="container-tech">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass-panel p-8 md:p-12 lg:p-16 border border-slate-200/60 bg-white/60 relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[60px] pointer-events-none" />
                
                {/* GITA Content */}
                <div className="flex flex-col lg:flex-row gap-12 relative z-10 mb-16">
                  <div className="lg:w-1/3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 mb-6 text-primary-600">
                      <Globe size={32} />
                    </div>

                    {/* Gambar Logo EU Flag Placeholder (di atas disclaimer) */}
                    <div className="mb-4">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" 
                        alt="European Commission Logo" 
                        className="h-10 object-contain shadow-sm border border-slate-200 rounded"
                      />
                    </div>

                    <div className="p-4 bg-primary-50/50 rounded-xl border border-primary-100 text-xs text-slate-600 leading-relaxed font-medium">
                      <Info size={16} className="text-primary-500 mb-2 inline-block mr-2" />
                      <strong>Disclaimer:</strong> This Growth Hub has been funded with support from the European Commission. This website reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein.
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3 space-y-6 text-slate-700 leading-relaxed font-medium">
                    <p>
                      <strong>Growing Indonesia – a Triangular Approach (GITA)</strong> integrates business – university collaboration, graduate entrepreneurship and enterprise creation. With a population of over 260 million, Indonesia is Southeast Asia’s largest economy. Current support for start-ups is fragmented and there is a need for a more coordinated approach.
                    </p>
                    <p>
                      Simpul Tumbuh is one of the first of a growing network of <strong>Growth Hubs</strong> across Indonesia aimed at embedding entrepreneurship education into University curricula. These hubs are physical spaces with an incubation facility for cultivating innovation.
                    </p>
                    <p>
                      The creation of Growth Hubs is the central and outward facing component of the innovative GITA that integrates business-university collaboration in a strategic way.
                    </p>
                    <Link href="http://www.growingindonesia.eu" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="mt-4 gap-2 bg-white/50 hover:bg-white hover:text-primary-600 border-slate-300">
                        Visit GITA Official Website <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* --- LOGO PARTNERS GRID --- */}
                <div className="relative z-10 pt-10 border-t border-slate-200/60">
                  <h3 className="text-center text-2xl font-bold font-uii text-slate-900 mb-8">
                    Erasmus+ GITA Partners
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {/* Render 10 placeholder logo untuk Partner GITA */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                      <div 
                        key={item} 
                        className="w-24 h-16 md:w-32 md:h-20 bg-white/50 border border-slate-200/50 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden p-3 group"
                        title={`Partner ${item}`}
                      >
                        <img 
                          src={`https://ui-avatars.com/api/?name=Partner+${item}&background=f8fafc&color=0f172a&font-size=0.3`} 
                          alt={`Logo Partner ${item}`} 
                          className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          </section>

          {/* --- LEMBAGA FUNGSIONAL SHOWCASE (ZIG-ZAG LAYOUT WITH NEWS) --- */}
          <section className="py-24 relative">
            <div className="container-tech">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold font-uii text-slate-900 mb-4">Lembaga Fungsional</h2>
                <p className="text-slate-600 max-w-2xl mx-auto font-medium">Ekosistem pendorong inovasi dan hilirisasi riset di lingkungan Universitas Islam Indonesia.</p>
              </div>

              <div className="space-y-32">
                {/* 1. IBISMA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-sm">
                      <Rocket size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">Inkubasi Bisnis & Inovasi Bersama (IBISMA)</h3>
                    <p className="text-slate-700 leading-relaxed font-medium text-lg">
                      IBISMA merupakan divisi khusus yang didirikan untuk mendorong pemanfaatan hasil penelitian perguruan tinggi untuk menyelesaikan persoalan bangsa melalui inovasi. Kami berupaya melakukan pengembangan kewirausahaan dan membangun ekosistem inovasi.
                    </p>
                    <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50">Ikuti Sosial Media IBISMA UII</Button>
                  </div>
                  <div className="lg:w-1/2 w-full glass-panel bg-white/60 p-6 md:p-8 border border-slate-200/60 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Newspaper size={18} className="text-rose-500"/> Berita Terkini IBISMA
                    </h4>
                    <div className="space-y-4">
                      {unitNews.ibisma.map((news, i) => (
                        <div key={i} className="group cursor-pointer border-b border-slate-200/50 pb-4 last:border-0 last:pb-0">
                          <p className="text-xs text-rose-600 font-bold mb-1">{news.date}</p>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2">{news.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 2. PEIAB */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                  <div className="lg:w-1/2 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-sm">
                      <Zap size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">Pusat Ekonomi Inovasi & Akselerasi Bisnis (PEIAB)</h3>
                    <p className="text-slate-700 leading-relaxed font-medium text-lg">
                      PEIAB adalah innovation ecosystem builder dan business accelerator yang didirikan untuk mendukung proses penguatan ekosistem inovasi, hilirisasi riset, dan komersialisasi invensi Civitas Akademika UII agar grow dan sustain di pasar industri.
                    </p>
                    <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">Ikuti Sosial Media PEIAB UII</Button>
                  </div>
                  <div className="lg:w-1/2 w-full glass-panel bg-white/60 p-6 md:p-8 border border-slate-200/60 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Newspaper size={18} className="text-amber-500"/> Berita Terkini PEIAB
                    </h4>
                    <div className="flex items-center justify-center h-32 text-slate-500 text-sm italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      Belum ada berita terbaru dari PEIAB saat ini.
                    </div>
                  </div>
                </motion.div>

                {/* 3. LSP */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shadow-sm">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">Lembaga Sertifikasi Profesi (LSP)</h3>
                    <p className="text-slate-700 leading-relaxed font-medium text-lg">
                      LSP merupakan lembaga yang memberikan jaminan pelayanan Sertifikasi Kompetensi yang mengutamakan mutu dan menjamin proses sertifikasi dilaksanakan dengan jujur, cepat, akurat dan efektif untuk tenaga kerja profesional dan kompetitif.
                    </p>
                    <Button variant="outline" className="text-cyan-600 border-cyan-200 hover:bg-cyan-50">Ikuti Sosial Media LSP UII</Button>
                  </div>
                  <div className="lg:w-1/2 w-full glass-panel bg-white/60 p-6 md:p-8 border border-slate-200/60 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Newspaper size={18} className="text-cyan-500"/> Berita Terkini LSP UII
                    </h4>
                    <div className="space-y-4">
                      {unitNews.lsp.map((news, i) => (
                        <div key={i} className="group cursor-pointer border-b border-slate-200/50 pb-4 last:border-0 last:pb-0">
                          <p className="text-xs text-cyan-600 font-bold mb-1">{news.date}</p>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2">{news.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 4. SPMKB */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                  <div className="lg:w-1/2 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-sm">
                      <Globe size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">SPMKB / BUiLD</h3>
                    <p className="text-slate-700 leading-relaxed font-medium text-lg">
                      Simpul Pemberdayaan Masyarakat untuk Ketangguhan Bencana (SPMKB – UII) hadir untuk meningkatkan kolaborasi penelitian kebencanaan yang melibatkan sivitas akademika UII dan masyarakat pada level nasional hingga internasional.
                    </p>
                    <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">Kenali Lebih Dekat</Button>
                  </div>
                  <div className="lg:w-1/2 w-full glass-panel bg-white/60 p-6 md:p-8 border border-slate-200/60 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Newspaper size={18} className="text-emerald-500"/> Artikel SPMKB/BUiLD
                    </h4>
                    <div className="space-y-4">
                      {unitNews.spmkb.map((news, i) => (
                        <div key={i} className="group cursor-pointer border-b border-slate-200/50 pb-4 last:border-0 last:pb-0">
                          <p className="text-xs text-emerald-600 font-bold mb-1">{news.date}</p>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2">{news.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* --- KABAR TERBARU (GENERAL NEWS) --- */}
          <section className="relative py-24 border-t border-slate-200/50 bg-white/40 backdrop-blur-md">
            <div className="container-tech relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-bold font-uii text-slate-900 mb-2">Kabar Terbaru</h2>
                  <p className="text-slate-600">Berita terbaru dari Direktorat Pengembangan dan Pembinaan Kewirausahaan.</p>
                </div>
                <Link href="/news">
                  <Button variant="outline" className="gap-2 bg-white/50 hover:text-primary-600 border-slate-300">
                    Berita Lainnya <ArrowRight size={16}/>
                  </Button>
                </Link>
              </div>

              {news.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mock Berita untuk Layout Tech */}
                  {unitNews.ibisma.map((item, index) => (
                    <div key={index} className="glass-panel p-6 bg-white/70 border border-slate-200/60 hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt=""/>
                      </div>
                      <p className="text-xs font-bold text-primary-600 mb-2">{item.date}</p>
                      <h3 className="font-bold text-slate-900 group-hover:text-primary-600 line-clamp-3 leading-snug">{item.title}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {news.map((item, index) => (
                    <article key={item.id} className="glass-panel p-6 bg-white/70 border border-slate-200/60 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                      <div className="h-48 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
                        <img src={item.image || "/images/placeholder-news.jpg"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary-700 shadow-sm uppercase">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 font-medium">
                        <Calendar size={14} className="text-primary-500" /> <span>{formatDate(item.publishedAt)}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3 group-hover:text-primary-600 line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.excerpt}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* --- BOTTOM SECTION: KRITIK & SARAN + PENGUMUMAN --- */}
          <section className="py-24 border-t border-slate-200/50 relative bg-slate-50/50">
            <div className="container-tech relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* KOLOM KIRI: Kritik & Saran */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5">
                  <div className="glass-panel bg-white p-8 border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-uii text-slate-900">Kritik & Saran</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Sampaikan masukan Anda kepada kami.</p>
                      </div>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Nama *</label>
                        <Input placeholder="Masukkan nama lengkap Anda" className="bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">E-Mail *</label>
                        <Input type="email" placeholder="contoh@domain.com" className="bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Perihal *</label>
                        <Input placeholder="Subjek pesan" className="bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Kritik & Saran *</label>
                        <textarea 
                          className="flex w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 min-h-[120px] resize-y"
                          placeholder="Tuliskan pesan Anda di sini..."
                        ></textarea>
                      </div>
                      <Button type="submit" className="w-full gap-2 mt-4 shadow-[0_0_15px_var(--theme-glow-blue)]">
                        Kirim Pesan <Send size={16} />
                      </Button>
                    </form>
                  </div>
                </motion.div>

                {/* KOLOM KANAN: Pengumuman */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                        <Megaphone size={20} />
                      </div>
                      <h2 className="text-3xl font-bold font-uii text-slate-900">Pengumuman</h2>
                    </div>
                    <Button variant="ghost" className="text-sm text-primary-600 font-bold hover:bg-primary-50">Lihat Semua</Button>
                  </div>

                  <div className="space-y-4 pr-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {announcements.map((item, i) => (
                      <div key={i} className="group glass-panel bg-white/60 p-5 border border-slate-200/60 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer flex gap-5 items-start">
                        <div className="shrink-0 w-16 h-16 rounded-xl bg-slate-100 group-hover:bg-primary-50 border border-slate-200 flex flex-col items-center justify-center transition-colors">
                          <span className="text-xs font-bold text-slate-500 group-hover:text-primary-500 uppercase">{item.date.split(' ')[0].substring(0,3)}</span>
                          <span className="text-xl font-bold text-slate-900 group-hover:text-primary-600">{item.date.split(' ')[1].replace(',','')}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2 mb-2">{item.title}</h3>
                          <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-primary-400">
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> Baca Selengkapnya
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

        </div>
      )}

      {/* --- Menambahkan Footer Global di sini --- */}
      <Footer />
    </main>
  );
}