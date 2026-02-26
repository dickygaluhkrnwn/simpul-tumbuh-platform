"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; 
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
      desc: "Creation of an online guide that will offer practical, personalized information for building and leading a green enterprise; a targeted training programme which will be complemented with personal coaching and will support the creation of start-ups.",
      icon: Compass,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      glow: "group-hover:shadow-emerald-500/10",
      border: "hover:border-emerald-200"
    },
    {
      title: "Engagement",
      desc: "Build a university network that will reach and mobilize both internal and external stakeholders through its ANGEL- Innovate Unit. Internal stakeholders will include faculty members, administrative staff, researchers, students and relevant external partners who will be social entrepreneurs, start-ups and government agencies that relate to green entrepreneurship.",
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50",
      glow: "group-hover:shadow-teal-500/10",
      border: "hover:border-teal-200"
    },
    {
      title: "Exchanges & Sharing",
      desc: "The ANGEL-Hub will be a centre for the development of early-stage start-ups in green technologies, energy and sustainable development.",
      icon: RefreshCw,
      color: "text-green-600",
      bg: "bg-green-50",
      glow: "group-hover:shadow-green-500/10",
      border: "hover:border-green-200"
    },
    {
      title: "Support",
      desc: "The ANGEL-Enterprise team will have the mission to support and advance ANGEL in the long term through the development of expertise in the commercialization of Universities’ knowledge and technology, and partnership-building with the external regional/national/international entrepreneurial ecosystem.",
      icon: LifeBuoy,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      glow: "group-hover:shadow-emerald-500/10",
      border: "hover:border-emerald-200"
    }
  ];

  const managers = [
    {
      name: "Dr. Arif Wismadi",
      title: "Senior Lecturer, Dept. of Architecture, UII",
      bio: "Dr. Arif Wismadi is a senior lecturer in the Department of Architecture, Faculty of Civil Engineering and Planning, Universitas Islam Indonesia (UII). He studied Geo-Information Management at ITC, University of Twente, the Netherland. He obtained an M.Sc degree with a specialization in Urban Information Management and a Doctoral Degree in Urban and Regional Planning in Infrastructure and Community Development. Since 2018, he has been appointed as the Director of the UII’s Growth Hub (Simpul Tumbuh) to develop a business incubator (IBISMA) dan Professional Certification Institution in UII. Also, he is a Certified Business Coach for a start-up in a technology-based business. He also holds Level 3 TRIZ (Theory for Inventive-Problem Solving) Practitioner from MyTRIZ Malaysia.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Dr. Arif Rahman",
      title: "Assistant Professor, Accounting Dept., UII",
      bio: "Dr. Arif Rahman is an assistant professor in the Accounting Department, Faculty of Business and Economics, UII. His research interest is in public sector accounting and information systems. He pursued his master’s degree in Master of Commerce in Accounting from the University of New South Wales, Australia, and his Ph.D. was from Curtin University, Australia. In 2018 – 2022, he was appointed as the Vice Dean of Resource Management at the Faculty of Business and Economics, UII.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Hangga Fathana",
      title: "Head of Dept. of International Relations, UII",
      bio: "Hangga Fathana currently serves as Head of Department at the Department of International Relations, Universitas Islam Indonesia. He researches and teaches on significant issues associated with the global political economy, trade politics, and capitalism. He also has a strong research interest in Australia’s relations with the wider Asia Pacific region. He spent nine years in various university administrative positions: academic programs, public relations, internationalization, strategic partnership, student admission, and alumni retention.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Nihlah Ilhami",
      title: "Head of International Mobility, UII",
      bio: "Nihlah Ilhami has been working in the internationalization-related field for more than 15 years. She is now the Head of International Mobility, Directorate of Partnership/ International Affairs, UII, responsible for coordinating the international inbound and outbound mobility activities for students and staff.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const news = [
    {
      title: "ANGEL INNOVATION HACKATHON 2024, The Inaugural Event of the PEIAB ANGEL UII Flagship Program",
      excerpt: "In order to realize the vision of an Entrepreneurial University, the ANGEL Innovation and Business Acceleration Ecosystem Center (PEIAB) under the auspices of DPPK/UII Growth Hub opens opportunities for all levels of society who have an…",
      date: "December 6, 2024",
      tags: "Artikel, Berita, ERASMUS+ ANGEL, PEIAB-ANGEL UII",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "ANGEL INNOVATION HACKATHON 2024, Gelaran Perdana Program Unggulan PEIAB ANGEL UII",
      excerpt: "Dalam rangka mewujudkan visi Entrepreneurial University, Pusat Ekosistem Inovasi dan Akselerasi Bisnis (PEIAB) ANGEL di bawah naungan DPPK/Simpul Tumbuh UII membuka kesempatan bagi seluruh lapisan masyarakat yang memiliki ketertarikan dan…",
      date: "December 6, 2024",
      tags: "Artikel, Berita, ERASMUS+ ANGEL, PEIAB-ANGEL UII",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "“Innovation Festival 2024”, Hilirisasi Invensi dan Green Entrepreneurship Untuk Mendorong Kemandirian Kesehatan dan Energi Bagi Bangsa.",
      excerpt: "Innovation Festival 2024 (InnoFest) adalah kegiatan akbar rutin berskala Nasional yang di selenggarakan oleh Universitas Islam Indonesia (UII) dengan menggandeng mitra dunia usaha dunia industri (DUDI) strategis dalam semangat kolaboratif…",
      date: "January 18, 2024",
      tags: "ERASMUS+ ANGEL",
      image: "https://images.unsplash.com/photo-1542744094-24638ea0b3b3?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen relative selection:bg-emerald-500 selection:text-white font-sans transition-colors duration-400 overflow-hidden">
      
      {/* Background Orbs Global (Emerald/Teal Tint) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-1/3 left-[-10%] w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white border-b border-slate-200/50">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="ANGEL Project Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-transparent to-transparent" />
          
          {/* Emerald Green Glow */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
              <Leaf size={16} className="animate-pulse" /> Erasmus+ Programme
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              ANGEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Project</span>
            </motion.h1>
            
            <motion.h2 variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-8 font-medium drop-shadow-xl leading-relaxed tracking-tight">
              ASEAN Network for Green Entrepreneurship and Leadership
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-lg text-slate-300 mb-10 max-w-3xl font-medium leading-relaxed border-l-4 border-emerald-500 pl-6">
              Co-funded by the ERASMUS+ programme of the European Union, supporting graduates and disadvantaged groups to attain decent income through <strong className="text-white">green entrepreneurship</strong> and <strong className="text-white">leadership skills</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT & TARGET SECTION */}
      <section className="py-20 md:py-32 relative">
        <div className="container-tech relative z-10">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16"
          >
            {/* Kiri: Teks About */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-7 prose prose-lg max-w-none text-slate-700 text-justify font-medium leading-relaxed">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-8 tracking-tight">About</h2>
              <p>
                The ASEAN Network for Green Entrepreneurship and Leadership (ANGEL) is co-funded with the ERASMUS+ programme of the European Union (Capacity Building in the field of Higher Education). ANGEL project is a convergence of ASEAN partner institutions’ responses to the strong need for capacity-building while confronting challenges of environmental degradation.
              </p>
              <p>
                In addition, ANGEL aims to support graduates as well as disadvantaged groups to attain a decent income which is derived from quality employment, and enhanced with entrepreneurial-leadership skills. Another goal is to help improve inclusiveness, because gender and other demographic divides exist and derail wealth creation across the ASEAN nations.
              </p>
              <p>
                The mission of ANGEL is to engender impact and transformation for two major target stakeholders of each partner institution in Cambodia, Indonesia, Lao PDR, Vietnam and Malaysia.
              </p>
              <div className="p-6 bg-slate-100/50 border-l-4 border-slate-400 rounded-r-2xl mt-8">
                <p className="font-bold text-slate-800 m-0">
                  The Asian partners are supported by universities and institutions from Greece and Cyprus.
                </p>
              </div>
            </motion.div>

            {/* Kanan: Target Stakeholders (Glass Panels) */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5 flex flex-col gap-6 pt-2 md:pt-16">
              <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest text-emerald-600 flex items-center gap-3">
                <Target className="text-emerald-500" /> Target Stakeholders
              </h3>
              
              {/* Card 1 */}
              <div className="glass-panel bg-white/70 border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Building2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Internal Stakeholders</h4>
                </div>
                <p className="text-slate-600 font-medium text-sm leading-relaxed text-justify">
                  The first target group is the internal stakeholders, namely students, academic and non-academic staff, and top management. Within the context of Southeast Asian institutions, the green entrepreneurial mindset and transformational leadership skills and competencies are still new concepts and less implemented.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-panel bg-white/70 border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-teal-500/10 transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Globe2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Disadvantaged Groups</h4>
                </div>
                <p className="text-slate-600 font-medium text-sm leading-relaxed text-justify">
                  The second target group of ANGEL are the disadvantaged groups within societies in Cambodia, Indonesia, Lao PDR, Vietnam and Malaysia. This includes women and minorities, poor income groups in both urban and rural communities as well as people with disabilities (PWD).
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 3. OBJECTIVES (BENTO GRID) */}
      <section className="py-20 md:py-32 relative border-y border-slate-200/50 bg-slate-50/50">
        <div className="container-tech relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-8 tracking-tight">
              Objectives
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed text-justify md:text-center mx-auto space-y-4">
              <p>
                ANGEL aims to build the necessary capacity in eleven ASEAN Universities for balancing the high potential economic growth and innovation in the partner countries with their lack of capacities in green entrepreneurship as well as resolving entrenched issues and challenges of poverty, low-quality jobs in the informal sector, the digital divide and filling leadership gaps.
              </p>
              <p>
                Its objectives are to address green entrepreneurship and transformational leadership and social innovation challenges, and to build a high calibre network of future green entrepreneurial leaders with effective and efficient styles of management, who will uphold ethics and good governance while being able to connect with the local/regional and international market ecosystem while producing a multiplier effect in the ASEAN region.
              </p>
              <p className="font-bold text-slate-800 pt-4">
                With the above general aims of ANGEL, the project specifically undertakes the following objectives in the hope to develop an innovative green entrepreneurial-leadership ecosystem that will foster:
              </p>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {objectives.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} className={`glass-panel bg-white/80 border border-slate-200/80 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group ${obj.glow} ${obj.border}`}>
                  <div className={`w-16 h-16 rounded-2xl ${obj.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/50`}>
                    <Icon size={32} className={obj.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{obj.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-justify">
                    {obj.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECT MANAGERS */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-6 tracking-tight">
              Project Managers
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-8 max-w-5xl mx-auto"
          >
            {managers.map((manager, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="flex flex-col md:flex-row gap-6 md:gap-10 glass-panel bg-white/60 border border-slate-200/80 p-6 md:p-10 rounded-3xl hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm mx-auto md:mx-0">
                  <img 
                    src={manager.image} 
                    alt={manager.name} 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center flex-grow text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{manager.name}</h3>
                  <p className="text-sm font-bold text-emerald-600 mb-6 uppercase tracking-wider">{manager.title}</p>
                  <p className="text-slate-600 text-base leading-relaxed font-medium text-justify">
                    {manager.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. LATEST NEWS */}
      <section className="py-20 md:py-32 relative border-y border-slate-200/50 bg-slate-50/50">
        <div className="container-tech relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii mb-3 flex items-center gap-3 tracking-tight">
                <Target className="text-emerald-500" /> News
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <Link href="#" key={idx} className="group flex flex-col glass-panel bg-white/80 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-52 overflow-hidden relative bg-slate-200">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar size={14} className="text-emerald-500" /> {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-200/60 text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-relaxed">
                    {item.tags}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNERS (LOGO GRID 4x4) */}
      <section className="py-20 relative">
        <div className="container-tech relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii mb-12 tracking-tight">Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-center items-center opacity-70 hover:opacity-100 transition-opacity duration-500 max-w-5xl mx-auto">
            {/* 16 Logo Grid menggunakan UI Avatars sebagai Placeholder */}
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-[3/2] glass-panel bg-white/40 border border-slate-200/60 rounded-2xl flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md cursor-pointer">
                <img src={`https://ui-avatars.com/api/?name=Partner+${i+1}&background=f1f5f9&color=047857&font-size=0.25`} alt={`Partner ${i+1}`} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Global */}
      <Footer />
    </main>
  );
}