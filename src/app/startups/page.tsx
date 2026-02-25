"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTenants } from "@/lib/firestore/tenants";
import { Tenant } from "@/types";
import { Search, Rocket, Globe, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StartupShowcasePage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTenants();
      setTenants(data);
      setFilteredTenants(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = tenants.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTenants(results);
  }, [search, tenants]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] bg-accent-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-slate-950)_100%)]" />
        </div>

        <div className="container-tech relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-xs font-bold text-accent-400 tracking-widest uppercase mb-6 border border-white/10 shadow-lg">
              <Zap size={14} /> Ecosystem Showcase
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold font-uii text-white mb-6 tracking-tight">
              Etalase <span className="text-gradient-accent">Startup</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Karya nyata dan inovasi berdampak dari wirausahawan muda, mahasiswa, dan alumni binaan Simpul Tumbuh UII.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & GRID SECTION */}
      <section className="py-20 relative bg-slate-50 dark:bg-slate-950">
        <div className="container-tech">
          {/* Futuristic Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mb-20 relative group"
          >
            <div className="absolute inset-0 bg-accent-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Input 
                placeholder="Cari nama startup atau bidang usaha..." 
                className="pl-14 h-14 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-500" size={24} />
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Menganalisis Ekosistem...</p>
            </div>
          ) : filteredTenants.length === 0 ? (
            <div className="text-center py-20 glass-panel max-w-lg mx-auto">
              <p className="text-slate-500 font-medium italic">Startup yang Anda cari belum tersedia di daftar kami.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredTenants.map((item) => (
                <motion.div 
                  key={item.id} 
                  variants={fadeUp}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-accent-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                >
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent-500/10 transition-colors" />

                  {/* Logo Container */}
                  <div className="relative w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-800 p-1 mb-6 border border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={item.logo || "https://ui-avatars.com/api/?name=" + item.name + "&background=random"} 
                      alt={item.name} 
                      className="w-full h-full object-contain rounded-[1.25rem]" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent-500 text-slate-950 p-1.5 rounded-xl shadow-lg">
                      <Rocket size={14} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{item.name}</h3>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-950/30 text-accent-700 dark:text-accent-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-accent-100 dark:border-accent-900/50">
                    <ShieldCheck size={12} />
                    {item.category}
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow font-medium">
                    {item.description}
                  </p>

                  <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.status}</span>
                    {item.website && (
                      <a 
                        href={item.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/30 transition-all shadow-sm"
                        title="Kunjungi Website"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}