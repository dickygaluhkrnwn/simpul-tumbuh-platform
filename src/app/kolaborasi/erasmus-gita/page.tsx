"use client";

import Header from "@/components/layout/Header";
import { motion, Variants } from "framer-motion";
import { 
  Globe2, Building2, Users, GraduationCap, 
  Milestone, CheckCircle2, ShieldCheck, 
  Network, ArrowRight, Lightbulb, TrendingUp
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
    { title: "Kementerian Terkait", desc: "The Ministry of Research, Technology and Higher Education & Ministry of Trade.", icon: Building2 },
    { title: "Universitas", desc: "Universities in Indonesia as the center of education.", icon: GraduationCap },
    { title: "Akademisi & Mahasiswa", desc: "Students and academics driving the innovation.", icon: Users },
    { title: "Perusahaan Lokal", desc: "Local enterprises as industry partners.", icon: TrendingUp },
    { title: "Komunitas Lokal", desc: "Local communities benefitting from the ecosystem.", icon: Globe2 },
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 overflow-hidden">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop" 
            alt="GITA Project Background" 
            className="w-full h-full object-cover opacity-20 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* EU Colors Glow (Blue & Gold) */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Globe2 size={16} /> Erasmus+ Programme
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              GITA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Project</span>
            </motion.h1>
            
            <motion.h2 variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-8 font-medium drop-shadow-xl leading-relaxed">
              Growing Indonesia – a Triangular Approach
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-lg text-slate-300 mb-10 max-w-2xl font-light leading-relaxed border-l-4 border-accent-500 pl-6">
              Integrates <strong>business – university collaboration</strong>, <strong>graduate entrepreneurship</strong>, and <strong>enterprise creation</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE CONTEXT & WHY EU SUPPORT */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeUpVariant} className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-uii mb-6">The Challenge & Our Goal</h2>
              <p>
                With a population of over 260 million, Indonesia is Southeast Asia’s largest economy and the world’s fourth most populous nation. Current support for start-ups is fragmented and there is a need for a more coordinated approach by educational institutions, government bodies and industry in building Indonesia’s entrepreneurial capacity and in reducing reliance on foreign labour as well as outward economic migration.
              </p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Our work is aimed at embedding entrepreneurship education into University curricula and at creating Growth Hubs across Indonesia. 
              </p>
              <p>
                These hubs are physical spaces with an incubation facility for cultivating innovation and exploiting new ideas applied to the local and regional economies.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-slate-50 dark:bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why does the EU support this?</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                EU funding through the capacity building programme offers a unique opportunity to strengthen higher education ties between Europe and Indonesia. Funding within Indonesia does not currently exist which would allow for Universities to capitalise on this innovative step change in activity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. STAKEHOLDERS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Who are the stakeholders?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
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
                <motion.div key={idx} variants={fadeUpVariant} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-400 dark:hover:border-primary-500 transition-all flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-500 shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. IMPLEMENTATION STAGES (TIMELINE) */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              How will the project be implemented?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              The project started in October 2017 and will run until October 2020. It is implemented in five stages.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 md:-translate-x-1/2" />

            <div className="space-y-12">
              {stages.map((stage, idx) => {
                const isEven = idx % 2 !== 0;
                return (
                  <motion.div key={idx} variants={fadeUpVariant} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Circle Node */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-slate-900 md:-translate-x-1/2 z-10 shadow-lg" />
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className={`bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                        <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-primary-400 to-accent-400 ${isEven ? 'right-0' : 'left-0'}`} />
                        <span className="inline-block text-xs font-bold text-accent-600 dark:text-accent-400 tracking-widest uppercase mb-2">
                          {stage.step}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{stage.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
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

      {/* 5. GITA LEARNING NETWORK */}
      <section className="py-20 md:py-32 relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--color-primary-900)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container-tech relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary-500/20">
                <Network size={40} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-uii mb-6">GITA Learning Network</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Dedicated to promoting entrepreneurial capacity building in Indonesia’s higher education sector to extend and maximise the impact of the project within the ASEAN region.
              </p>
              <Button variant="primary" size="lg" className="bg-accent-500 hover:bg-accent-600 text-slate-900 border-none shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                Visit Web Portal <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/15 transition-colors">
                  <Lightbulb className="text-accent-400 mb-4" size={28} />
                  <h3 className="text-xl font-bold mb-3">Activities & Services</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Ranging from networking, training, consulting services, career planning, fundraising for start-ups, to informing policy-making.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/15 transition-colors">
                  <Building2 className="text-primary-400 mb-4" size={28} />
                  <h3 className="text-xl font-bold mb-3">Local Growth Hubs</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Aligned to specific local needs, financially self-sustaining, ensuring ongoing access to funding via public-private collaborations.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/15 transition-colors md:col-span-2">
                  <ShieldCheck className="text-emerald-400 mb-4" size={28} />
                  <h3 className="text-xl font-bold mb-3">Quality & Impact Management</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Oversees implementation, dissemination, and long-term impacts to ensure activities remain relevant and impactful. Advisory groups and external evaluators ensure project quality meets Erasmus+ standards.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}