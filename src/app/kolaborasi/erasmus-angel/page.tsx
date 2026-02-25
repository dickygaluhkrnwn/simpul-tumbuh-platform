"use client";

import Header from "@/components/layout/Header";
import { motion, Variants } from "framer-motion";
import { 
  Leaf, Target, Compass, Users, 
  RefreshCw, LifeBuoy, ArrowRight, Calendar, 
  Building2, Globe2
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

export default function ErasmusAngelPage() {
  const objectives = [
    {
      title: "Guidance",
      desc: "Creation of an online guide offering practical, personalized information for building and leading a green enterprise; a targeted training programme complemented with personal coaching.",
      icon: Compass,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Engagement",
      desc: "Build a university network that mobilizes internal (faculty, students) and external stakeholders (social entrepreneurs, start-ups, gov agencies) through the ANGEL-Innovate Unit.",
      icon: Users,
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    },
    {
      title: "Exchanges & Sharing",
      desc: "The ANGEL-Hub will be a centre for the development of early-stage start-ups in green technologies, energy, and sustainable development.",
      icon: RefreshCw,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Support",
      desc: "The ANGEL-Enterprise team supports and advances ANGEL in the long term through commercialization of Universities' knowledge and partnership-building with the entrepreneurial ecosystem.",
      icon: LifeBuoy,
      color: "text-emerald-600",
      bg: "bg-emerald-600/10"
    }
  ];

  const managers = [
    {
      name: "Dr. Arif Wismadi",
      title: "Senior Lecturer, Dept. of Architecture, UII",
      bio: "Studied Geo-Information Management at ITC, University of Twente, the Netherland. Director of the UII's Growth Hub (Simpul Tumbuh) since 2018. Certified Business Coach for technology-based business and holds Level 3 TRIZ Practitioner from MyTRIZ Malaysia.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Dr. Arif Rahman",
      title: "Assistant Professor, Accounting Dept., UII",
      bio: "Research interest in public sector accounting and information systems. Master of Commerce from UNSW Australia, Ph.D. from Curtin University. Vice Dean of Resource Management at the Faculty of Business and Economics, UII (2018–2022).",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Hangga Fathana",
      title: "Head of Dept. of International Relations, UII",
      bio: "Researches and teaches on global political economy, trade politics, and capitalism. Spent nine years in various university administrative positions including academic programs, public relations, internationalization, and strategic partnership.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Nihlah Ilhami",
      title: "Head of International Mobility, UII",
      bio: "Working in the internationalization-related field for more than 15 years. Responsible for coordinating the international inbound and outbound mobility activities for students and staff at the Directorate of Partnership/International Affairs.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const news = [
    {
      title: "ANGEL INNOVATION HACKATHON 2024, The Inaugural Event of the PEIAB ANGEL UII Flagship Program",
      excerpt: "In order to realize the vision of an Entrepreneurial University, the ANGEL Innovation and Business Acceleration Ecosystem Center (PEIAB)...",
      date: "December 6, 2024",
      tags: "Artikel, Berita, ERASMUS+ ANGEL",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "ANGEL INNOVATION HACKATHON 2024, Gelaran Perdana Program Unggulan PEIAB ANGEL UII",
      excerpt: "Dalam rangka mewujudkan visi Entrepreneurial University, Pusat Ekosistem Inovasi dan Akselerasi Bisnis (PEIAB) ANGEL di bawah naungan DPPK/Simpul Tumbuh...",
      date: "December 6, 2024",
      tags: "Artikel, Berita, PEIAB-ANGEL UII",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "“Innovation Festival 2024”, Hilirisasi Invensi dan Green Entrepreneurship Untuk Mendorong Kemandirian",
      excerpt: "Innovation Festival 2024 (InnoFest) adalah kegiatan akbar rutin berskala Nasional yang di selenggarakan oleh Universitas Islam Indonesia (UII)...",
      date: "January 18, 2024",
      tags: "ERASMUS+ ANGEL",
      image: "https://images.unsplash.com/photo-1542744094-24638ea0b3b3?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 overflow-hidden">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="ANGEL Project Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Emerald Green Glow */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Leaf size={16} /> Erasmus+ Programme
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              ANGEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Project</span>
            </motion.h1>
            
            <motion.h2 variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-8 font-medium drop-shadow-xl leading-relaxed">
              ASEAN Network for Green Entrepreneurship and Leadership
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-lg text-slate-300 mb-10 max-w-2xl font-light leading-relaxed border-l-4 border-emerald-500 pl-6">
              Co-funded by the ERASMUS+ programme of the European Union, supporting graduates and disadvantaged groups to attain decent income through <strong>green entrepreneurship</strong> and <strong>leadership skills</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT & MISSION SECTION */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16"
          >
            {/* Kiri: Teks About */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-7 prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 max-w-none text-justify">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii mb-6">About ANGEL</h2>
              <p>
                The ASEAN Network for Green Entrepreneurship and Leadership (ANGEL) is a convergence of ASEAN partner institutions’ responses to the strong need for capacity-building while confronting challenges of environmental degradation.
              </p>
              <p>
                In addition, ANGEL aims to support graduates as well as disadvantaged groups to attain a decent income which is derived from quality employment, and enhanced with entrepreneurial-leadership skills. Another goal is to help improve inclusiveness, because gender and other demographic divides exist and derail wealth creation across the ASEAN nations.
              </p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                The Asian partners are supported by universities and institutions from Greece and Cyprus.
              </p>
            </motion.div>

            {/* Kanan: Target Stakeholders */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Target Stakeholders
              </h3>
              
              {/* Card 1 */}
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 md:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Internal Stakeholders</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Students, academic and non-academic staff, and top management. Equipping them with green entrepreneurial mindset and transformational leadership skills.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-teal-50 dark:bg-teal-900/10 p-6 md:p-8 rounded-3xl border border-teal-100 dark:border-teal-800/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Globe2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Disadvantaged Groups</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Including women and minorities, poor income groups in both urban and rural communities as well as people with disabilities (PWD) in ASEAN nations.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 3. OBJECTIVES (BENTO GRID) */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Our Objectives
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Building capacity to balance economic growth with green entrepreneurship and transformational leadership.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {objectives.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-[2rem] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                  <div className={`w-16 h-16 rounded-2xl ${obj.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} className={obj.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{obj.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {obj.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECT MANAGERS */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Project Managers
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              The dedicated team driving the ANGEL Project at Universitas Islam Indonesia.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {managers.map((manager, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-3xl hover:border-emerald-500/50 transition-colors">
                <img 
                  src={manager.image} 
                  alt={manager.name} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-md shrink-0 object-top"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{manager.name}</h3>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-4 uppercase tracking-wider">{manager.title}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {manager.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. LATEST NEWS */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii mb-3 flex items-center gap-3">
                <Target className="text-emerald-500" /> ANGEL News
              </h2>
            </div>
            <Link href="#" className="hidden md:flex text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline items-center gap-2">
              View All News <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <Link href="#" key={idx} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-52 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Calendar size={14} /> {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                    {item.tags}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNERS (LOGO PLACEHOLDERS) */}
      <section className="py-20 bg-white dark:bg-slate-900 text-center">
        <div className="container-tech">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii mb-12">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder untuk logo-logo institusi */}
            {[1, 2, 3, 4, 5, 6].map((logo) => (
              <div key={logo} className="w-32 h-16 md:w-40 md:h-20 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-400 dark:text-slate-600">
                LOGO {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}