import { ArrowRight, Rocket, Zap, ShieldCheck, Globe } from "lucide-react";
import { FeaturesSection } from "@/lib/firestore/content";
import { motion, Variants } from "framer-motion";

export default function FeaturesRender({ data }: { data: FeaturesSection['data'] }) {
  const functionalUnits = [
    {
      title: "IBISMA",
      subtitle: "Inkubasi Bisnis & Inovasi",
      desc: "Mendorong pemanfaatan hasil penelitian perguruan tinggi untuk menyelesaikan persoalan bangsa melalui inovasi, program pengembangan kewirausahaan, dan membangun ekosistem inovasi.",
      icon: Rocket, 
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-500/20", 
      border: "border-rose-200 dark:border-rose-500/30",
      hoverGlow: "group-hover:shadow-[0_10px_40px_rgba(244,63,94,0.2)] dark:group-hover:shadow-[0_10px_40px_rgba(244,63,94,0.4)]"
    },
    {
      title: "PEIAB",
      subtitle: "Pusat Ekosistem & Akselerasi",
      desc: "Innovation ecosystem builder & business accelerator untuk mendukung penguatan ekosistem, hilirisasi riset, dan komersialisasi invensi Civitas Akademika UII agar sustain di pasar industri.",
      icon: Zap, 
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-500/20", 
      border: "border-amber-200 dark:border-amber-500/30",
      hoverGlow: "group-hover:shadow-[0_10px_40px_rgba(245,158,11,0.2)] dark:group-hover:shadow-[0_10px_40px_rgba(245,158,11,0.4)]"
    },
    {
      title: "LSP UII",
      subtitle: "Lembaga Sertifikasi Profesi",
      desc: "Memberikan jaminan pelayanan Sertifikasi Kompetensi yang mengutamakan mutu, jujur, cepat, akurat, dan efektif untuk mendorong tersedianya tenaga kerja profesional dan kompetitif.",
      icon: ShieldCheck, 
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-100 dark:bg-cyan-500/20", 
      border: "border-cyan-200 dark:border-cyan-500/30",
      hoverGlow: "group-hover:shadow-[0_10px_40px_rgba(6,182,212,0.2)] dark:group-hover:shadow-[0_10px_40px_rgba(6,182,212,0.4)]"
    },
    {
      title: "SPMKB",
      subtitle: "Ketangguhan Bencana",
      desc: "Meningkatkan dan menguatkan kolaborasi penelitian di bidang kebencanaan dengan melibatkan sivitas akademika UII dan masyarakat pada level nasional hingga internasional.",
      icon: Globe, 
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-500/20", 
      border: "border-emerald-200 dark:border-emerald-500/30",
      hoverGlow: "group-hover:shadow-[0_10px_40px_rgba(16,185,129,0.2)] dark:group-hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)]"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="container-tech relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-uii mb-6 tracking-tight">
            {data.title || "Lembaga Fungsional"}
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {data.description || "Mengenal lebih dekat unit-unit fungsional di bawah naungan Direktorat Simpul Tumbuh UII."}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {functionalUnits.map((unit, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
              }}
              // CLASS DIPERBAIKI: Menggunakan bg-white solid untuk light mode, bg-slate-900 solid untuk dark mode
              className={`group relative p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-3xl z-10 overflow-hidden ${unit.hoverGlow}`}
            >
              {/* Highlight gradient di atas card */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent opacity-50" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${unit.bg} ${unit.border} border group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm`}>
                  <unit.icon size={28} className={unit.color} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{unit.title}</h3>
                <p className={`text-[12px] font-bold ${unit.color} mb-4 uppercase tracking-wider`}>{unit.subtitle}</p>
                <p className="text-base text-slate-700 dark:text-slate-300 mb-8 flex-grow leading-relaxed font-medium">
                  {unit.desc}
                </p>
                
                <button className={`flex items-center text-sm font-bold ${unit.color} gap-2 group/btn mt-auto`}>
                  Pelajari Lebih Lanjut 
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}