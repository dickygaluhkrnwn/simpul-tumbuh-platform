import { Globe, Building2, Users, Zap } from "lucide-react";
import { StatsSection } from "@/lib/firestore/content";

const iconMap: any = { Globe, Building2, Users, Zap };

export default function StatsRender({ data }: { data: StatsSection['data'] }) {
  return (
    <div className="border-y border-uii-blue-100 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm font-semibold text-slate-400 tracking-widest uppercase mb-6">
          {data.label}
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {data.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <div key={idx} className="flex items-center gap-2 font-bold text-slate-600 text-xl">
                <Icon size={24} /> {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}