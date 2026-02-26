"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Import Footer Global
import { motion, Variants } from "framer-motion";
import { 
  Globe2, Building2, Users, GraduationCap, 
  CheckCircle2, ShieldCheck, Network, ArrowRight, 
  Lightbulb, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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

export default function ErasmusGitaPage() {
  const stakeholders = [
    { title: "Kementerian Terkait", desc: "The Ministry of Research, Technology and Higher Education & Ministry of Trade.", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Universitas", desc: "Universities in Indonesia as the center of education.", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Akademisi & Mahasiswa", desc: "Students and academics driving the innovation.", icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
    { title: "Perusahaan Lokal", desc: "Local enterprises as industry partners.", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Komunitas Lokal", desc: "Local communities benefitting from the ecosystem.", icon: Globe2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const stages = [
    {
      step: "Stage 1",
      title: "Self-Assessment",
      desc: "This stage involves a self-assessment exercise of each participating University aimed at establishing the extent to which entrepreneurial capacity building is institutionally embedded using the HEInnovate self-assessment tool.",
    },
    {
      step: "Stage 2",
      title: "Curriculum Review",
      desc: "Review of current programmes to assess how far they encourage entrepreneurial capacity. Culminates in embedding interactive entrepreneurial learning outcomes (ELO).",
    },
    {
      step: "Stage 3",
      title: "Programme Design",
      desc: "Focuses on the design of a multi-level learning outcome programme plans to embed sustainable state-of-the-art and targeted entrepreneurial learning pedagogies.",
    },
    {
      step: "Stage 4",
      title: "Staff Development",
      desc: "Training and development of University staff in relation to the knowledge, skills and competences required to design and establish an Enterprise Incubation Unit.",
    },
    {
      step: "Stage 5",
      title: "Growth Hub & Network",
      desc: "Concentrates on the development of physical Growth Hub space and creation of the digital infrastructure for the GITA Learning Network portal.",
    }
  ];

  return (
    <main className="min-h-screen relative selection:bg-primary-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Blue/Gold Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
      
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop" 
            alt="GITA Project Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-transparent to-transparent" />
          
          {/* EU Colors Glow (Blue & Gold) */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-accent-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
              <Globe2 size={16} className="animate-pulse" /> Erasmus+ Programme
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-8xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              GITA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Project</span>
            </motion.h1>
            
            <motion.h2 variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-8 font-medium drop-shadow-xl leading-relaxed tracking-tight">
              Growing Indonesia – a Triangular Approach
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-lg text-slate-300 mb-10 max-w-2xl font-light leading-relaxed border-l-4 border-accent-500 pl-6">
              Integrates <strong className="text-white">business – university collaboration</strong>, <strong className="text-white">graduate entrepreneurship</strong>, and <strong className="text-white">enterprise creation</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE CONTEXT & WHY EU SUPPORT */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16"
          >
            <motion.div variants={fadeUpVariant} className="lg:col-span-7 prose prose-lg max-w-none text-slate-700 text-justify font-medium leading-relaxed">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">The Challenge & Our Goal</h2>
              <p>
                With a population of over 260 million, Indonesia is Southeast Asia’s largest economy and the world’s fourth most populous nation. Current support for start-ups is fragmented and there is a need for a more coordinated approach by educational institutions, government bodies and industry in building Indonesia’s entrepreneurial capacity and in reducing reliance on foreign labour as well as outward economic migration.
              </p>
              <p>
                Our work is aimed at embedding entrepreneurship education into University curricula and at creating Growth Hubs across Indonesia. 
              </p>
              <p>
                These hubs are physical spaces with an incubation facility for cultivating innovation and exploiting new ideas applied to the local and regional economies.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="lg:col-span-5 flex flex-col justify-center">
              <div className="glass-panel bg-white/70 border border-slate-200/80 p-8 md:p-12 rounded-[2rem] shadow-lg hover:shadow-xl hover:shadow-primary-500/10 transition-shadow">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Why does the EU support this?</h3>
                <p className="text-slate-600 font-medium leading-relaxed text-justify">
                  EU funding through the capacity building programme offers a unique opportunity to strengthen higher education ties between Europe and Indonesia. Funding within Indonesia does not currently exist which would allow for Universities to capitalise on this innovative step change in activity.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. STAKEHOLDERS */}
      <section className="py-20 md:py-32 relative border-y border-slate-200/50 bg-slate-50/50">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">
              Who are the stakeholders?
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              The project operates at a national, regional, local, institutional and programme level.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {stakeholders.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className="glass-panel bg-white/80 border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary-300 transition-all flex items-start gap-4 cursor-default group">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} border border-slate-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className={item.color} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. IMPLEMENTATION STAGES (TIMELINE) */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">
              How will the project be implemented?
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              The project started in October 2017 and will run until October 2020. It is implemented in five stages.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2" />

            <div className="space-y-12">
              {stages.map((stage, idx) => {
                const isEven = idx % 2 !== 0;
                return (
                  <motion.div key={idx} variants={fadeUpVariant} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Circle Node */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white md:-translate-x-1/2 z-10 shadow-lg" />
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className={`glass-panel bg-white/70 border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                        <div className={`absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-accent-400 ${isEven ? 'right-0' : 'left-0'}`} />
                        <span className="inline-block px-3 py-1 bg-accent-50 text-accent-700 border border-accent-100 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                          {stage.step}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{stage.title}</h3>
                        <p className="text-slate-600 leading-relaxed font-medium text-justify md:text-left">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. GITA LEARNING NETWORK (DARK SECTION) */}
      <section className="py-20 md:py-32 relative bg-slate-900 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(ellipse_at_center,var(--color-primary-900)_0%,transparent_70%)] opacity-40 pointer-events-none" />

        <div className="container-tech relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Kiri: Judul & Tombol CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-5 text-center md:text-left"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary-500/20 mx-auto md:mx-0">
                <Network size={40} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-uii mb-6 leading-tight drop-shadow-md">GITA Learning Network</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
                Dedicated to promoting entrepreneurial capacity building in Indonesia’s higher education sector to extend and maximise the impact of the project within the ASEAN region.
              </p>
              <Button size="lg" className="bg-accent-500 hover:bg-accent-400 text-slate-900 border-none shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] font-bold transition-all hover:scale-105 rounded-full">
                Visit Web Portal <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>

            {/* Kanan: Fitur/Aktivitas GITA Network (Glass Dark Cards) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-dark border border-white/10 p-8 rounded-3xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 shadow-xl group">
                  <Lightbulb className="text-accent-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-white">Activities & Services</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    Ranging from networking, training, consulting services, career planning, fundraising for start-ups, to informing policy-making.
                  </p>
                </div>
                
                <div className="glass-dark border border-white/10 p-8 rounded-3xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 shadow-xl group">
                  <Building2 className="text-primary-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-white">Local Growth Hubs</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    Aligned to specific local needs, financially self-sustaining, ensuring ongoing access to funding via public-private collaborations.
                  </p>
                </div>
                
                <div className="glass-dark border border-white/10 p-8 rounded-3xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 shadow-xl md:col-span-2 group">
                  <ShieldCheck className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-white">Quality & Impact Management</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    Oversees implementation, dissemination, and long-term impacts to ensure activities remain relevant and impactful. Advisory groups and external evaluators ensure project quality meets Erasmus+ standards.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer Global */}
      <Footer />
    </main>
  );
}