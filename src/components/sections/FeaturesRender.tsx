import { ArrowRight, Rocket, Zap, ShieldCheck, Globe } from "lucide-react";
import { FeaturesSection } from "@/lib/firestore/content";

export default function FeaturesRender({ data }: { data: FeaturesSection['data'] }) {
  // Sementara hardcode item features-nya, tapi text judul/desc dinamis
  // Nanti bisa dibuat dinamis total jika mau
  const functionalUnits = [
    {
      title: "IBISMA",
      subtitle: "Inkubasi Bisnis",
      desc: "Hilirisasi riset & pengembangan startup.",
      icon: Rocket, color: "text-rose-400", gradient: "from-rose-500/20 to-purple-500/5"
    },
    {
      title: "PEIAB",
      subtitle: "Akselerasi",
      desc: "Innovation ecosystem builder.",
      icon: Zap, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/5"
    },
    {
      title: "LSP UII",
      subtitle: "Sertifikasi",
      desc: "Jaminan mutu kompetensi profesi.",
      icon: ShieldCheck, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/5"
    },
    {
      title: "SPMKB",
      subtitle: "Ketangguhan",
      desc: "Pemberdayaan masyarakat & riset bencana.",
      icon: Globe, color: "text-emerald-400", gradient: "from-emerald-500/20 to-teal-500/5"
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii mb-4">
            {data.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {functionalUnits.map((unit, index) => (
            <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${unit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center ${unit.color}`}>
                    <unit.icon size={28} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{unit.title}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4 uppercase">{unit.subtitle}</p>
                <p className="text-slate-600 mb-6">{unit.desc}</p>
                <button className="flex items-center text-sm font-bold text-uii-blue-600 gap-2">
                  Pelajari <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}