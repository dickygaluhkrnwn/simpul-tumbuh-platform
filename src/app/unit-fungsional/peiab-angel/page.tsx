"use client";

import Header from "@/components/layout/Header";
import { motion, Variants } from "framer-motion";
import { 
  Leaf, Target, Rocket, Users, FlaskConical, 
  CircleDollarSign, GraduationCap, Code, 
  CalendarDays, CheckCircle2, Globe2, Network
} from "lucide-react";

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
      text: "Menciptakan atmosfir, ekosistem inovasi dan kewirausahaan hijau yang kondusif di Indonesia.",
      icon: Leaf
    },
    {
      title: "Wirausaha Berdampak",
      text: "Mendorong tumbuhnya inovator dan wirausaha muda yang mampu memberikan dampak berkelanjutan bagi masyarakat.",
      icon: Users
    },
    {
      title: "Hilirisasi Riset",
      text: "Mendorong proses hilirisasi riset & Komersialisasi invensi dari civitas akademika UII yang berbasis teknologi.",
      icon: FlaskConical
    }
  ];

  const programs = [
    { title: "Innovation Hackathon", desc: "Startup/Innovation Hackathon and Post-Incubation Program", icon: Code, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Innovation Festival", desc: "Innovation Startup Expo, Coaching Clinic, Business Matching & Investment Pitching", icon: CalendarDays, color: "text-teal-500", bg: "bg-teal-500/10" },
    { title: "Talent Hub", desc: "Talent Management: Innovator Talents, Mentor Talents & Professional talents", icon: Users, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { title: "ANGEL Academy", desc: "Intensive Business Acceleration Programs", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { title: "ANGEL Fund", desc: "Pre-Seed Funding to Accelerate Innovations", icon: CircleDollarSign, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Innovation Labs", desc: "Coordinating Innovation Labs, Research Centers", icon: Network, color: "text-teal-600", bg: "bg-teal-600/10" },
  ];

  const team = [
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="PEIAB Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          {/* Overlay gelap pekat dari kiri */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Efek Glow Emerald */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Leaf size={16} /> Ecosystem Builder
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              PEIAB <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">ANGEL</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-6 font-bold drop-shadow-xl">
              Pusat Ekosistem Inovasi & Akselerasi Bisnis
            </motion.p>

            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light drop-shadow-md leading-relaxed">
              Mendukung penguatan ekosistem inovasi, hilirisasi riset, dan mengakselerasi penemuan civitas akademika UII agar tumbuh dan bertahan di industri.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. TENTANG PEIAB SECTION */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUpVariant} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii leading-tight">
                Lahir dari Kolaborasi <br/>
                <span className="text-emerald-600 dark:text-emerald-400">Global & Visi Hijau</span>
              </h2>
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  PEIAB didirikan sebagai tindak lanjut Hibah Uni Eropa <strong>Erasmus+ CBHE ANGEL</strong> (ASEAN Networks for Green Entrepreneurship & Leadership). Program ini mendorong berdirinya ANGEL Innovate Unit sebagai Simpul Pengembangan Kewirausahaan Hijau di negara anggota konsorsium (2021-2024).
                </p>
                <p>
                  Resmi berdiri pada 15 November 2024, PEIAB-ANGEL berada di bawah koordinasi Wakil Rektor Bidang Kemitraan & Kewirausahaan (WR-IV) dan DPPK/ST UII.
                </p>
                <div className="flex items-center gap-4 mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <Globe2 className="w-12 h-12 text-emerald-500 shrink-0" />
                  <p className="m-0 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
                    Tergabung dalam <strong>AKSELWIRA</strong> (Asosiasi Akselerator Kewirausahaan Indonesia) untuk memperkuat langkah dan memberikan dampak nyata bagi masyarakat.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ilustrasi Card Info */}
            <motion.div variants={fadeUpVariant} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
              <div className="relative bg-slate-950 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full" />
                <Rocket size={48} className="text-emerald-400 mb-8" />
                <h3 className="text-2xl font-bold text-white mb-4">Innovation Ecosystem Builder</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-8">
                  Kami tidak hanya menginkubasi, tetapi mengakselerasi bisnis agar siap bersaing dan *sustain* di pasar industri yang sesungguhnya.
                </p>
                <ul className="space-y-4">
                  {['Hilirisasi Riset', 'Komersialisasi Invensi', 'Akselerasi Bisnis', 'Kewirausahaan Hijau'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-semibold">
                      <CheckCircle2 size={20} className="text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISI & MISI SECTION */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container-tech relative z-10">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto space-y-16"
          >
            {/* Visi */}
            <motion.div variants={fadeUpVariant} className="relative bg-emerald-950 dark:bg-emerald-900/40 border border-emerald-800/50 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/20 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <Target size={56} className="mx-auto text-emerald-400 mb-8" />
                <h3 className="text-sm font-bold text-emerald-500 tracking-[0.2em] uppercase mb-6">Visi Kami</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-relaxed max-w-4xl mx-auto font-uii italic">
                  "Menjadi akselerator inovasi & bisnis yang berperan aktif dan unggul dalam membantu para inovator dan pendiri usaha rintisan melalui penguatan inovasi dan akselerasi kewirausahaan yang berdampak."
                </p>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center uppercase tracking-widest text-sm text-emerald-600 dark:text-emerald-400">
                Misi Kami
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {misiList.map((misi, index) => {
                  const Icon = misi.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0" />
                      <Icon size={36} className="text-emerald-500 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{misi.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">
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

      {/* 4. PROGRAMS SECTION */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Program Acceleration
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Rangkaian program komprehensif dari PEIAB-ANGEL untuk mendorong talenta, inovasi, dan pendanaan bagi startup Anda.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className="group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl ${prog.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} className={prog.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{prog.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{prog.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. TEAM / PENGELOLA SECTION */}
      <section className="py-20 md:py-32 relative bg-slate-50 dark:bg-slate-950">
        <div className="container-tech">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Pengelola PEIAB-ANGEL
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Tim berdedikasi di balik ekosistem inovasi dan akselerasi bisnis UII.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-12 max-w-5xl mx-auto"
          >
            {/* KEPALA (Top Center) */}
            <motion.div variants={fadeUpVariant} className="flex justify-center">
              <div className="group relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden text-center">
                <div className="h-48 bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Bagus Panuntun" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 relative z-20 -mt-12">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">Bagus Panuntun, S.E., M.B.A.</h3>
                  <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider mt-2">Kepala ANGEL UII</p>
                </div>
              </div>
            </motion.div>

            {/* TEAM MEMBER (Grid 4 Kolom di Desktop, 2 di Tablet) */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg overflow-hidden text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="h-56 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">{member.name}</h4>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">{member.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

    </main>
  );
}