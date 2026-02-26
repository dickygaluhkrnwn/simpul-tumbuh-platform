"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; 
import { motion, Variants } from "framer-motion";
import { 
  Leaf, Target, Users, FlaskConical, 
  ArrowRight, Globe2
} from "lucide-react";
import Link from "next/link";

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

export default function PeiabAngelPage() {
  const misiList = [
    {
      title: "Ekosistem Hijau",
      text: "Menciptakan atmosfir, ekosistem inovasi dan kewirausahaan hijau yang kondusif Indonesia.",
      icon: Leaf
    },
    {
      title: "Wirausaha Berdampak",
      text: "Mendorong tumbuhnya inovator dan wirausaha muda yang mampu memberikan dampak berkelanjutan bagi masyarakat Indonesia.",
      icon: Users
    },
    {
      title: "Hilirisasi Riset",
      text: "Mendorong proses hilirisasi riset & Komersialisasi invensi dari civitas akademika UII yang berbasis teknologi dan berkelanjutan.",
      icon: FlaskConical
    }
  ];

  // Ditambahkan Gambar (Image) untuk masing-masing program
  const programs = [
    { 
      title: "Innovation Hackathon", 
      desc: "Startup/Innovation Hackathon and Post-Incubation Program", 
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
    },
    { 
      title: "Innovation Festival", 
      desc: "Innovation Startup Expo, Coaching Clinic, Business Matching & Investment Pitching", 
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
    },
    { 
      title: "Talent Hub", 
      desc: "Talent Management: Innovator Talents, Mentor Talents & Professional talents", 
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600&auto=format&fit=crop"
    },
    { 
      title: "ANGEL Academy", 
      desc: "Intensive Business Acceleration Programs", 
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
    },
    { 
      title: "ANGEL Fund", 
      desc: "Pre-Seed Funding to Accelerate Innovations", 
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=600&auto=format&fit=crop"
    },
    { 
      title: "Innovation Labs", 
      desc: "Coordinating Innovation Labs, Research Centers", 
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
    },
  ];

  // Susunan Tim disesuaikan persis dengan web asli
  const team = [
    {
      name: "Bagus Panuntun, S.E., M.B.A.",
      role: "Kepala ANGEL UII",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Febrianti Nurul Hidayah, S.T., B.Sc., M.Sc.",
      role: "Wakil Kepala Akselerasi Bisnis",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Nita Sugiara Wijaya, S.E.",
      role: "Sekretaris, Keuangan & Admin 1",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Arsyil Yasari, A.Md.",
      role: "Sekretaris, Keuangan & Admin 2",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Andika Wahyu Wardana, S.Farm.",
      role: "Program Akselerasi Bisnis",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen relative selection:bg-emerald-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Emerald/Teal Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      <Header />

      {/* 1. HERO & INTRO SECTION (SPLIT SCREEN DENGAN LOGOS) */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="PEIAB Background" 
            className="w-full h-full object-cover opacity-10 brightness-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        </div>

        <div className="container-tech relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Kiri: Teks Intro (4 Paragraf) */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:col-span-7"
            >
              <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
                <Globe2 size={16} className="animate-pulse" /> Global Network
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl font-bold font-uii leading-tight mb-4 drop-shadow-2xl">
                PEIAB-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">ANGEL</span>
              </motion.h1>
              
              <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-emerald-400 mb-10 font-bold tracking-tight">
                Pusat Ekosistem Inovasi & Akselerasi Bisnis
              </motion.p>

              <motion.div variants={fadeUpVariant} className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed text-justify font-medium">
                <p>
                  <strong className="text-white">Pusat Ekosistem Inovasi & Akselerasi Bisnis (PEIAB)</strong> adalah innovation ecosystem builder dan business accelerator yang didirikan untuk mendukung proses penguatan ekosistem inovasi, hilirisasi riset dan komersialisasi invensi serta mengakselerasi inovasi ataupun invensi yang telah di hasilkan oleh para Civitas Akademika UII agar grow dan sustain di pasar industry.
                </p>
                <p>
                  PEIAB didirikan sebagai salah satu tindak lanjut Hibah Uni Eropa Erasmus+ CBHE ANGEL (ASEAN Networks for Green Entrepreneurship & Leadership) yang mendorong berdirinya ANGEL Innovate Unit di negara-negara ASEAN anggota Konsorsium sebagai Simpul Pengembangan Kewirausahaan Hijau di negara masing-masing sejak tahun 2021-2024.
                </p>
                <p>
                  Akhirnya PEIAB-ANGEL resmi berdiri pada 15 November 2024 berdasarkan SK Rektor Nomor 1029/SK-REK/SP/XI/2024, dan berada dibawah Koordinasi dari Wakil Rektor Bidang Kemitraan & Kewirausahaan (WR-IV) dan Direktorat Pembinaan & Pengembangan Kewirausahaan/Simpul Tumbuh (DPPK/ST), dan dibawah supervisi dari Divisi Pengembangan Kewirausahaan.
                </p>
                <p>
                  PEIAB-ANGEL juga telah bergabung didalam Asosiasi Akselerator Kewirausahaan Indonesia (AKSELWIRA), sehingga dapat semakin menguatkan Langkah nya untuk memberikan dampak bagi UII dan Masyarakat Indonesia.
                </p>
              </motion.div>
            </motion.div>

            {/* Kanan: Logo Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="glass-dark border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10 backdrop-blur-xl text-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Didukung Oleh</h3>
                
                {/* 2 Logo Besar */}
                <div className="flex justify-center gap-6 mb-10 border-b border-white/10 pb-10">
                  <div className="w-32 h-16 bg-white/10 rounded-xl flex items-center justify-center p-3 border border-white/20">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="EU" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-32 h-16 bg-white/10 rounded-xl flex items-center justify-center p-3 border border-white/20">
                     <img src={`https://ui-avatars.com/api/?name=ANGEL&background=ffffff&color=047857&font-size=0.3`} alt="ANGEL" className="w-full h-full object-contain rounded" />
                  </div>
                </div>

                {/* 16 Logo Kecil */}
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Konsorsium & Mitra</h3>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors p-2">
                       <img src={`https://ui-avatars.com/api/?name=P${i+1}&background=f1f5f9&color=0f172a&font-size=0.4`} alt={`Partner ${i+1}`} className="w-full h-full object-contain rounded opacity-80" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. PENGELOLA PEIAB-ANGEL SECTION (Moved Up) */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">
              Pengelola PEIAB-ANGEL
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-12 max-w-5xl mx-auto"
          >
            {/* KEPALA (Top Center) */}
            {team[0] && (
              <motion.div variants={fadeUpVariant} className="flex justify-center">
                <div className="group relative w-full max-w-sm glass-panel bg-white/70 border border-slate-200/80 rounded-3xl shadow-lg overflow-hidden text-center hover:shadow-xl hover:shadow-emerald-500/10 transition-shadow duration-300">
                  <div className="h-64 bg-emerald-50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                    <img src={team[0].image} alt={team[0].name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 relative z-20 bg-white/60 backdrop-blur-md border-t border-white/50">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{team[0].name}</h3>
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mt-2">{team[0].role}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TEAM MEMBER LAINNYA (Grid 4 Kolom) */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.slice(1).map((member, idx) => (
                <div key={idx} className="group glass-panel bg-white/60 border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden text-center hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="h-56 bg-slate-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5 relative z-20">
                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{member.name}</h4>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wide">{member.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISI & MISI SECTION */}
      <section className="py-20 md:py-32 relative border-y border-slate-200/50 bg-slate-50/50">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto space-y-20"
          >
            <div className="text-center mb-8">
               <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii tracking-tight">Visi & Misi PEIAB-ANGEL</h2>
            </div>

            {/* Visi */}
            <motion.div variants={fadeUpVariant} className="relative glass-panel bg-white/80 border border-emerald-100/50 rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-emerald-600 tracking-[0.2em] uppercase mb-6 flex justify-center items-center gap-2">
                  <Target size={18} /> Visi
                </h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 leading-relaxed max-w-4xl mx-auto font-uii text-center italic">
                  "Menjadi akselerator inovasi & bisnis yang berperan aktif dan unggul dalam membantu para inovator dan pendiri usaha rintisan melalui penguatan inovasi dan akselerasi kewirausahaan yang berdampak"
                </p>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-sm font-bold text-emerald-600 tracking-[0.2em] uppercase mb-8 text-center flex justify-center items-center gap-2">
                <Leaf size={18} /> Misi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {misiList.map((misi, index) => {
                  return (
                    <div key={index} className="glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group text-center md:text-left">
                      <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0 opacity-50" />
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 relative z-10 font-bold text-xl shadow-sm mx-auto md:mx-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed relative z-10 text-justify md:text-left">
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

      {/* 4. PROGRAMS SECTION DENGAN GAMBAR */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight leading-tight">
              Program Innovation & <br/> Business Acceleration
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((prog, idx) => {
              return (
                <Link key={idx} href="#">
                  <motion.div variants={fadeUpVariant} className="group glass-panel bg-white/70 border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer">
                    <div className="h-56 overflow-hidden relative">
                       <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                       <img src={prog.image} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{prog.title}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed flex-grow">{prog.desc}</p>
                      
                      <div className="mt-6 flex items-center text-sm font-bold text-emerald-600">
                        Lihat Program <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tambahkan Footer */}
      <Footer />
    </main>
  );
}