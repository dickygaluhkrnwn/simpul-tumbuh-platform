"use client";

import Header from "@/components/layout/Header";
import { motion, Variants } from "framer-motion";
import { 
  Calendar, Share2, Facebook, Twitter, Linkedin, 
  ArrowRight, Newspaper, Building2 
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
    transition: { staggerChildren: 0.1 }
  }
};

export default function KolaborasiPage() {
  // Berita terbaru sudah dikurangi menjadi 6 dan ditambahkan placeholder gambar
  const beritaTerbaru = [
    { title: "Asdep Inkubasi dan Digitalisasi Wirausaha Kementerian UMKM dan Inkubator IBISMA UII Mendukung Inkubator UMKM Makassar menjadi Entrepreneur Hub se-Indonesia Timur", date: "September 2, 2025", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop" },
    { title: "KemenUMKM RI Buka Seleksi Nasional “Startup Acceleration Program 2025”: Lintas-Sektor, Siap Investasi, Terhubung Industri, dan Berdampak", date: "September 1, 2025", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop" },
    { title: "Universitas Islam Indonesia dan Asosiasi Inkubator Bisnis Indonesia Dukung Penuh Rangkaian “Startup Acceleration Program 2025” Kementerian UMKM RI", date: "September 1, 2025", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" },
    { title: "ANGEL INNOVATION HACKATHON 2024, The Inaugural Event of the PEIAB ANGEL UII Flagship Program", date: "December 6, 2024", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop" },
    { title: "IBISMA UII Dalam Mendorong Akselerasi Bisnis Startup Mitra, Workshop dan FGD Sebagai Upaya Kolaboratif Bersama FEB UNS", date: "December 5, 2024", img: "https://images.unsplash.com/photo-1542744094-24638ea0b3b3?q=80&w=600&auto=format&fit=crop" },
    { title: "Kembangkan Potensi UMKM, Program Inkubator Bisnis UKM Naik Kelas Tahap 2 Digelar", date: "June 25, 2024", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Header />

      {/* Main Content Layout */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 relative">
        <div className="container-tech">
          
          {/* Header Artikel (Judul & Meta Data) */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto mb-10"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              <Building2 size={14} /> Berita Kolaborasi
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-3xl md:text-5xl lg:text-6xl font-bold font-uii text-slate-900 dark:text-white leading-tight mb-6">
              Kolaborasi IBISMA & Dinkop UKM DIY untuk Inkubasi Bisnis UKM DIY
            </motion.h1>

            <motion.div variants={fadeUpVariant} className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-primary-500" />
                <span>June 8, 2021</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Oleh: Humas Simpul Tumbuh</span>
            </motion.div>
          </motion.div>

          {/* ARTICLE BODY & INTERACTIONS (Tengah) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Gambar Artikel (Featured Image) */}
            <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-3xl overflow-hidden mb-10 shadow-lg border border-slate-200 dark:border-slate-800 relative group">
               <img 
                 src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
                 alt="Kolaborasi IBISMA dan Dinkop UKM DIY" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            </div>

            <article className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium leading-loose text-justify">
              <p className="text-xl md:text-2xl text-slate-900 dark:text-white font-semibold leading-relaxed mb-8">
                Inkubator Bisnis dan Inovasi Bersama (IBISMA) UII menjalin partnership dengan Dinas Koperasi dan Usaha Kecil Menengah (Dinkop-UKM) DIY untuk mewujudkan UKM naik kelas yang terbungkus pada agenda yang bertajuk <strong className="text-primary-600 dark:text-primary-400">Pelatihan Bisnis</strong>.
              </p>

              <p>
                Direktur Simpul Tumbuh UII, Arif Wismadi dalam sambutanya menyampaikan apabila UII dalam beberapa tahun ini fokus dalam konsep Enterpreneur University. Hal ini melengkapi visi UII sebelumnya sebagai Research University. Senada dengan gerakan Dinkop-UKM DIY, UII juga berupaya menaikkan kelas universitas dengan perbanyak pengusaha, khususnya bagi mahasiswa.
              </p>

              <blockquote className="border-l-4 border-primary-500 pl-6 my-8 italic text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/50 p-6 rounded-r-2xl">
                “Bisnis yang dibangun harus benar-benar mengakar pada permasalahan umat. Selain berorientasikan untuk selesaikan masalah umat, bisnis di Jogja juga perlu memperhatikan sosial budaya masyarakatnya. Hal ini agar produk barang atau jasa bisa diterima dan berkembang di masyarakat. Contoh baik bisa dilihat pada UKM di Jogja. Meski berpengaruh pada pola dan pendapatan, pelaku UKM ternyata bisa melihat peluang dan bertahan di masa pandemi."
              </blockquote>

              <p>
                Dengan kerja sama ini, UII semoga mampu memberikan kotribusi nyata pada pengembangan UKM di DIY agar naik kelas melalui program dan kurikulum yang telah didesain oleh tim IBISMA dan Dinkop DIY. Kedepan melalui program-program yang serupa UII melalui IBISMA akan memberikan kotribusi untuk meng-inkubasi bisnis-bisnis secara luas. Baik melalui Kerjasama sinergitas dengan Dinkop DIY maupun yang lain.
              </p>

              <p>
                Kepala Dinkop-UKM DIY, Ir. Srie Nurkyatsiwi, M.M.A, pada sambutanya menyampaikan Dinkop & UKM DIY berupaya mendesain program untuk memberikan fasilitasi kepada UKM di DIY agar naik kelas. ini merupakan salah satu komintmen pemerintah dalam meningkatkan kualitas, kapabilitas, omzet, daya saing, dan daya tahan UKM di DIY.
              </p>

              <p>
                Seiring dengan itu, beliau melihat UII melalui Direktorat Pembinaan dan Pengembangan Kewirausahaan (DPPK – Simpul Tumbuh) memiiki visi yang sama dalam pengembangan konsep bisnis. Sehingga beliau menggandeng DPPK melalui IBISMA memberikan kepercayaan dalam berkolaborasi dalam mendesain dan melaksanakan inkubasi bisnis UKM di DIY.
              </p>

              <p>
                Agenda bertajuk Pelatihan Bisnis dengan tema UKM Naik Kelas ini terbagi menjadi 2 tahap, dengan masing-masing tahap merekrut 50 UKM di seluruh wilayah DIY. Tahap 1 telah dilaksanakan pada tanggal 7-10 Juni 2021 dan tahap kedua akan dilaksanakan pada 14-18 Juni 2021.
              </p>

              <p>
                100 UKM yang terpilih akan diberikan berbagai pelatihan selama 4 hari. Seluruh peserta, akan mendapatkan materi dan pendampingan dari mentor dalam hal <em>busines check up, business model canvas, branding, pembuatan profil usaha, optimalisasi digital marketing, pengelolaan finansial dan tip-tip usaha</em>.
              </p>

              <p>
                Dari 100 UKM akan disaring menjadi 20 terbaik yang akan mendapatkan failitas pendampingan lebih lanjut dan mendapatkan peluang berbagai hibah untuk scale up UKM dari IBISMA UII.
              </p>

              <p>
                Selain untuk meningkatkan kelas, inkubator bisnis juga bisa menjadi ajang kolaborasi antarpelaku usaha. Melalui kolaborasi, maka kekuatan kecil yang tersebar ini bisa menjadi satu kekuatan besar yang saling menguatkan. Keunikan usaha dan pasar masing-masing bisa saling mengisi satu sama lain.
              </p>
            </article>

            {/* Share Entry Section */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Share2 className="text-slate-500" size={20} />
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm">Share this entry</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-600">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-700 hover:border-blue-700">
                  <Linkedin size={18} />
                </Button>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-uii mb-6">Tinggalkan Komentar</h3>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400" 
                  />
                  <input 
                    type="email" 
                    placeholder="Alamat Email" 
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400" 
                  />
                </div>
                <textarea 
                  rows={5} 
                  placeholder="Tulis komentar Anda di sini..." 
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400"
                ></textarea>
                <Button variant="primary" className="self-start px-8">Kirim Komentar</Button>
              </form>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* BERITA TERBARU (Bottom Cards Grid) */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container-tech">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii mb-3 flex items-center gap-3">
                <Newspaper className="text-primary-500" /> Berita Terbaru
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Jangan lewatkan informasi dan kolaborasi terbaru lainnya.</p>
            </div>
            <Link href="#" className="hidden md:flex text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline items-center gap-2">
              Lihat Semua Berita <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTerbaru.map((berita, idx) => (
              <Link href="#" key={idx} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-52 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={berita.img} alt={berita.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                    {berita.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug line-clamp-3">
                    {berita.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-semibold text-primary-600 dark:text-primary-500 group-hover:translate-x-2 transition-transform">
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tombol Lihat Semua untuk Mobile */}
          <div className="mt-10 flex md:hidden justify-center">
            <Button variant="outline" className="w-full gap-2">
              Lihat Semua Berita <ArrowRight size={16} />
            </Button>
          </div>

        </div>
      </section>
      
    </main>
  );
}