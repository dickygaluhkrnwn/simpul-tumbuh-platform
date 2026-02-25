import { AboutSection } from "@/lib/firestore/content";
import { motion, Variants } from "framer-motion";
import { Landmark, Globe2, Info } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutRender({ data }: { data: AboutSection['data'] }) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-500/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="container-tech relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Bagian 1: Profil Direktorat */}
          <motion.div variants={fadeUpVariant} className="text-center mb-20 md:mb-28">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-6 shadow-sm">
              <Landmark size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-8 tracking-tight leading-tight">
              {data.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
              {data.description}
            </p>
          </motion.div>

          {/* Bagian 2: GITA Partners - CLASS DIPERBAIKI */}
          <motion.div 
            variants={fadeUpVariant} 
            // Menggunakan background solid (bg-white / bg-slate-900) agar teks dijamin terbaca
            className="p-8 md:p-12 lg:p-16 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl relative overflow-hidden"
          >
            {/* Dekorasi Background */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-500/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-500/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-5 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 inline-block">
                  <Globe2 size={36} className="text-accent-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {data.gitaTitle}
                </h3>
              </div>
              
              {/* Teks diubah warnanya agar kontras tinggi: text-slate-800 di light mode, text-slate-200 di dark mode */}
              <div className="space-y-6 text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed columns-1 md:columns-2 gap-10 font-medium">
                {data.gitaDescription.map((paragraph, index) => (
                  <p key={index} className="break-inside-avoid-column mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bagian 3: Disclaimer */}
          <motion.div variants={fadeUpVariant} className="mt-12">
            <div className="flex gap-4 p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
              <Info size={24} className="shrink-0 text-primary-500" />
              <p className="text-xs md:text-sm font-medium leading-relaxed">
                {data.disclaimer}
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}