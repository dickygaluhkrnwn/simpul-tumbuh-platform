"use client";

import Header from "@/components/layout/Header";
import { motion, Variants } from "framer-motion";
import { 
  Globe2, Users, GraduationCap, 
  ExternalLink, Briefcase, Award
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

export default function ErasmusEnteefPage() {
  const teamMembers = [
    {
      name: "Mukhammad Andri Setiawan",
      role: "Associate Professor and Lecturer",
      dept: "Department of Informatics, Universitas Islam Indonesia",
      bio: "Holds a PhD from the University of Queensland, Australia. He is passionate about improving the internet in higher education networks. He actively is involved in IT communities at universities across Indonesia and the Asia Pacific. He is also the primary contact of eduroam in Indonesia (.id). His main research interests are Information Technology Adoption and Business Information Systems, which covers business process management and improvement, organizational change through the information system, IT governance, and information security.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop", // Placeholder
      icon: Globe2
    },
    {
      name: "Beni Suranto",
      role: "Lecturer and Researcher",
      dept: "Department of Informatics, Universitas Islam Indonesia",
      bio: "Serves as the secretary of the Undergraduate Program of Informatics (International Program). He is the coordinator of courses related to software engineering and business startups. His research interests are AI for software design, UI/UX creative processes, Agile software development, enterprise information systems, computer science education, business startups, and digital transformation. He has experience as the Director of Student Development at Universitas Islam Indonesia from 2014 to 2023. He also initiated the Students Business Incubation Program in 2015. Moreover, he actively joined the university-level teams for international collaboration projects.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop", // Placeholder
      icon: GraduationCap
    },
    {
      name: "Bagus Panuntun",
      role: "Director of IBISMA",
      dept: "Technology & Business Incubator, Universitas Islam Indonesia",
      bio: "MBA, CWM, CFP, CSA, CBC is a seasoned professional with over 16 years of experience in business development, financial management, and entrepreneurship education. Currently serving as the Director of IBISMA at Universitas Islam Indonesia, he has successfully spearheaded initiatives to support startup incubation and foster innovation. His expertise spans strategic planning, program management, and mentoring, particularly in nurturing both digital and non-digital startups. An MBA graduate in Finance and Wealth Management from UGM. Fluent in English and Indonesian, Bagus’s deep understanding of entrepreneurial ecosystems makes him an ideal key figure for the Erasmus+ ENTEEF initiative.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop", // Placeholder
      icon: Briefcase
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 overflow-hidden">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
            alt="ENTEEF Project Background" 
            className="w-full h-full object-cover opacity-20 brightness-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Indigo/Violet Glow */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container-tech relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              <Globe2 size={16} /> Erasmus+ Programme
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold font-uii leading-tight mb-6 drop-shadow-2xl">
              ENTEEF <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Initiative</span>
            </motion.h1>
            
            <motion.h2 variants={fadeUpVariant} className="text-xl md:text-3xl text-slate-100 mb-8 font-medium drop-shadow-xl leading-relaxed">
              Universitas Islam Indonesia Team
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-lg text-slate-300 mb-10 max-w-2xl font-light leading-relaxed border-l-4 border-indigo-500 pl-6">
              Promoting freelancing and entrepreneurial growth through international collaboration and educational innovation.
            </motion.p>
            
            <motion.div variants={fadeUpVariant}>
              <a 
                href="https://enteef.uek.krakow.pl/team-indonesia/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="h-14 px-8 text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Visit Official ENTEEF Portal <ExternalLink size={18} className="ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TEAM MEMBERS SECTION */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-tech relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm">
              <Users size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6">
              Team Members
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              The key figures representing Universitas Islam Indonesia in the Erasmus+ ENTEEF project.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-12 max-w-5xl mx-auto"
          >
            {teamMembers.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={fadeUpVariant} 
                  className="flex flex-col md:flex-row gap-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group"
                >
                  {/* Foto Profil */}
                  <div className="shrink-0 flex flex-col items-center md:w-64">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl mb-6 relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Detail Info */}
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h3>
                    <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{member.role}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{member.dept}</p>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-justify">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-tech relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-uii mb-6">Learn more about ENTEEF</h2>
          <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
            Discover the full scope of the project, partner institutions, and the impact of the Erasmus+ initiative on freelancing and entrepreneurship.
          </p>
          <a href="https://enteef.uek.krakow.pl/team-indonesia/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30 font-bold h-14 px-10 text-lg shadow-xl backdrop-blur-md">
              <ExternalLink size={20} className="mr-2" /> Explore ENTEEF Portal
            </Button>
          </a>
        </div>
      </section>

    </main>
  );
}