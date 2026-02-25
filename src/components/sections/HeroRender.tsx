"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSection } from "@/lib/firestore/content";
import { motion, Variants, AnimatePresence } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  }
};

// Daftar gambar banner bergilir (Silakan ganti URL dengan gambar asli UII nanti)
const bannerImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop", // Kampus / Mahasiswa
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop", // Kolaborasi / Startup
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"  // Tech / Inovasi
];

export default function HeroRender({ data }: { data: HeroSection['data'] }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Efek Auto-Slide Banner setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-950 flex items-center min-h-[90vh]">
      
      {/* High-Tech Background Elements & Carousel */}
      <div className="absolute inset-0 z-0">
        
        {/* Image Slider dengan Animasi Crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={bannerImages[currentImage]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }} // Opacity 0.3 agar teks tetap terbaca jelas
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover brightness-75 grayscale-[30%]"
            alt={`Banner Simpul Tumbuh ${currentImage + 1}`}
          />
        </AnimatePresence>

        {/* Jaring-jaring AI (Grid Pattern) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
        
        {/* Gradient Overlay untuk meredupkan gambar dan menyatukan dengan tema gelap */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-slate-950)_100%)]" />

        {/* Glowing Orbs */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-primary-600/30 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      </div>

      <div className="container-tech relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Futuristic Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/20 text-xs md:text-sm font-medium shadow-lg">
            <Sparkles size={16} className="text-accent-400 animate-pulse" />
            <span className="text-slate-200">{data.badge}</span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="font-uii text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] whitespace-pre-line drop-shadow-2xl">
            {data.title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            {data.subtitle}
          </motion.p>
          
          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 pt-8 w-full sm:w-auto">
            <Link href="/unit-fungsional/ibisma" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto gap-3 text-base shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                {data.ctaPrimary} <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/news" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-3 text-base border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                {data.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Dots untuk Carousel */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              idx === currentImage 
                ? "w-10 bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
      
    </section>
  );
}