"use client";

import { 
  Mail, Phone, MapPin, ChevronRight, Globe, Newspaper
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const infoPenting = [
    { name: "Universitas", href: "https://www.uii.ac.id" },
    { name: "Kemitraan", href: "#" },
    { name: "Kemahasiswaan", href: "#" },
    { name: "Lembaga Sertifikasi Profesi", href: "/unit-fungsional/lsp" },
    { name: "Kantor Urusan International", href: "#" },
    { name: "REPESEA Erasmus+", href: "#" },
    { name: "Erasmus+ GITA", href: "/kolaborasi/erasmus-gita" },
  ];

  const beritaTerbaru = [
    { 
      title: "Asdep Inkubasi dan Digitalisasi Wirausaha Kementerian UMKM dan Inkubator IBISMA UII Mendukung Inkubator...", 
      date: "Sept 2, 2025" 
    },
    { 
      title: "KemenUMKM RI Buka Seleksi Nasional “Startup Acceleration Program 2025”: Lintas-Sektor, Siap Investasi...", 
      date: "Sept 1, 2025" 
    },
    { 
      title: "Universitas Islam Indonesia dan Asosiasi Inkubator Bisnis Indonesia Dukung Penuh Rangkaian “Startup Acceleration...", 
      date: "Sept 1, 2025" 
    },
    { 
      title: "ANGEL INNOVATION HACKATHON 2024, The Inaugural Event of the PEIAB ANGEL UII Flagship Program", 
      date: "Dec 6, 2024" 
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Glow background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-tech relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
          
          {/* Kolom 1: Hubungi Kami */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/20">
                <Globe className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-uii font-bold text-2xl text-white leading-none">Simpul Tumbuh</span>
                <span className="text-[10px] font-bold text-primary-500 tracking-[0.2em] uppercase mt-1">UII Ecosystem</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs border-l-2 border-primary-500 pl-3">Alamat Kantor</h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-white">Direktorat Pembinaan & Pengembangan Kewirausahaan</strong><br />
                  Gedung Growth Hub (Bookstore) Lt.3, Kampus Terpadu UII, Boulevard UII, Jalan Kaliurang km. 14,5 Sleman - DIY : 55584
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <a href="tel:+62274898444" className="flex items-center gap-4 text-sm hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-primary-500/50 group-hover:bg-primary-500/10 transition-all">
                    <Phone size={16} className="text-primary-500" />
                  </div>
                  <span>+62 274 898444 Ext 1064</span>
                </a>
                <a href="mailto:simpultumbuh@uii.ac.id" className="flex items-center gap-4 text-sm hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-primary-500/50 group-hover:bg-primary-500/10 transition-all">
                    <Mail size={16} className="text-primary-500" />
                  </div>
                  <span>simpultumbuh@uii.ac.id</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom 2: Informasi Penting */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs border-l-2 border-primary-500 pl-3">Informasi Penting</h4>
            <ul className="grid grid-cols-1 gap-y-4">
              {infoPenting.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-white transition-all flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-primary-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Berita Terbaru */}
          <div className="lg:col-span-5 space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs border-l-2 border-primary-500 pl-3 flex items-center gap-2">
              <Newspaper size={14} className="text-primary-500" /> Kabar Terbaru
            </h4>
            <div className="grid grid-cols-1 gap-6">
              {beritaTerbaru.map((news, idx) => (
                <Link key={idx} href="#" className="group block space-y-2 pb-5 border-b border-slate-900 last:border-0 last:pb-0">
                  <h5 className="text-sm font-semibold text-slate-200 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                    {news.title}
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{news.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="text-[10px] font-bold text-primary-600 uppercase">Read More</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-10 border-t border-slate-900 flex flex-col lg:flex-row justify-between items-center gap-8">
          <p className="text-[11px] font-medium text-slate-600 text-center lg:text-left tracking-wide">
            © {currentYear} DIREKTORAT PEMBINAAN & PENGEMBANGAN KEWIRAUSAHAAN/SIMPUL TUMBUH UII. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#" className="text-[11px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Pengelolaan Situs</Link>
            <Link href="#" className="text-[11px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Sangkalan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}