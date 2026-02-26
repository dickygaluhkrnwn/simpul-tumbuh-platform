import { Globe, Building2, Users, Zap } from "lucide-react";
import { StatsSection } from "@/lib/firestore/content";
import { motion } from "framer-motion";

const iconMap: any = { Globe, Building2, Users, Zap };

export default function StatsRender({ data }: { data: StatsSection['data'] }) {
  return (
    // Menggunakan background semi-transparan (glass) yang akan menyatu dengan background body
    <div className="border-y border-slate-200/50 bg-white/40 backdrop-blur-xl relative overflow-hidden z-20">
      <div className="container-tech py-12">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-bold text-primary-600 tracking-[0.2em] uppercase mb-10"
        >
          {data.label}
        </motion.p>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-wrap justify-center gap-10 md:gap-20"
        >
          {data.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring" } }
                }}
                className="group flex flex-col items-center gap-4 text-slate-600 transition-all duration-300 hover:text-primary-600 cursor-default"
              >
                <div className="relative p-5 rounded-2xl bg-white/60 border border-slate-200/50 group-hover:bg-primary-50 group-hover:border-primary-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  {/* Efek Glow di belakang icon saat di-hover menyesuaikan tema */}
                  <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon size={32} className="relative z-10" />
                </div>
                <span className="font-bold text-xl md:text-2xl text-slate-900 tracking-tight">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}