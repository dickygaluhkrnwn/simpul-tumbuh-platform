import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/lib/firestore/content";

export default function HeroRender({ data }: { data: HeroSection['data'] }) {
  return (
    <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-uii-blue-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-uii-blue-600/20 rounded-[100%] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-uii-blue-800/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-dark border border-white/10 text-uii-blue-100 text-xs md:text-sm font-medium backdrop-blur-md">
            <span>{data.badge}</span>
          </div>
          
          <h1 className="font-uii text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] whitespace-pre-line">
            {data.title}
          </h1>
          
          <p className="text-base md:text-xl text-uii-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light">
            {data.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="/programs">
              <Button size="lg" className="w-full sm:w-auto gap-3 h-12 px-8 bg-uii-yellow-500 text-uii-blue-950 font-bold hover:bg-uii-yellow-400">
                {data.ctaPrimary} <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-uii-blue-700 text-uii-blue-100 hover:bg-uii-blue-800/50 hover:text-white backdrop-blur-sm">
                {data.ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}