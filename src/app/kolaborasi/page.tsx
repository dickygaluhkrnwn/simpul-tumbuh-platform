"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion, Variants } from "framer-motion";
import { 
  Calendar, Share2, Facebook, Twitter, Linkedin, 
  Building2, Search, ArrowRight, Clock, Newspaper 
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

// Mendefinisikan tipe data untuk array Berita agar TypeScript tidak error
type BeritaItem = {
  title: string;
  date: string;
  img?: string; // img bersifat opsional
};

export default function KolaborasiPage() {
  // Data 10 berita terbaru sesuai web asli dengan tipe BeritaItem[]
  const beritaTerbaru: BeritaItem[] = [
    { title: "Asdep Inkubasi dan Digitalisasi Wirausaha Kementerian UMKM dan Inkubator IBISMA UII Mendukung Inkubator UMKM Makassar menjadi Entrepreneur Hub se-Indonesia Timur", date: "September 2, 2025 - 3:16 am" },
    { title: "KemenUMKM RI Buka Seleksi Nasional “Startup Acceleration Program 2025”: Lintas-Sektor, Siap Investasi, Terhubung Industri, dan Berdampak", date: "September 1, 2025 - 6:33 am" },
    { title: "Universitas Islam Indonesia dan Asosiasi Inkubator Bisnis Indonesia Dukung Penuh Rangkaian “Startup Acceleration Program 2025” Kementerian UMKM RI", date: "September 1, 2025 - 6:23 am" },
    { title: "ANGEL INNOVATION HACKATHON 2024, The Inaugural Event of the PEIAB ANGEL UII Flagship Program", date: "December 6, 2024 - 6:23 am" },
    { title: "ANGEL INNOVATION HACKATHON 2024, Gelaran Perdana Program Unggulan PEIAB ANGEL UII", date: "December 6, 2024 - 3:35 am" },
    { title: "IBISMA UII Dalam Mendorong Akselerasi Bisnis Startup Mitra, Workshop dan FGD Sebagai Upaya Kolaboratif Bersama FEB UNS", date: "December 5, 2024 - 2:37 am" },
    { title: "Kembangkan Potensi UMKM, Program Inkubator Bisnis UKM Naik Kelas Tahap 2 Digelar", date: "June 25, 2024 - 2:25 am" },
    { title: "Melalui PINOTI, POPTIKJI Perkuat Pondasi Industri Kecil dan Menengah (IKM)", date: "May 21, 2024 - 8:10 am" },
    { title: "Tumbuhkan Inovasi: Kemenkop UKM Gelar FGD untuk Dorong Pengembangan Usaha Kecil Menengah", date: "May 20, 2024 - 4:26 am" },
    { title: "Entrepreneur Hub Hadir di Yogyakarta, Harapkan Wirausaha Semakin Sukses!", date: "May 20, 2024 - 3:55 am" },
  ];

  return (
    <main className="min-h-screen relative font-sans transition-colors duration-400 overflow-hidden selection:bg-primary-500 selection:text-white">
      
      {/* Background Orbs Global */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-20" />
      <div className="fixed top-0 left-[-10%] w-[40vw] h-[40vw] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="fixed bottom-1/4 right-[-10%] w-[30vw] h-[30vw] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      <Header />

      {/* Main Content Layout (Article + Sidebar) */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="container-tech">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* KIRI: ARTIKEL UTAMA (8 Kolom) */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:col-span-8"
            >
              {/* Header Artikel */}
              <motion.div variants={fadeUpVariant} className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold font-uii text-slate-900 leading-tight mb-6 tracking-tight">
                  Kolaborasi IBISMA & Dinkop UKM DIY untuk Inkubasi Bisnis UKM DIY
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-600 text-sm font-medium">
                  {/* Tag Kategori Berita Kolaborasi */}
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm text-primary-700 font-bold uppercase tracking-wider text-xs">
                    <Building2 size={16} className="text-primary-500" />
                    <span>Berita Kolaborasi</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
                    <Calendar size={16} className="text-primary-500" />
                    <span>June 8, 2021</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-[10px] text-white font-bold">ST</div>
                    <span>Oleh: Humas Simpul Tumbuh</span>
                  </div>
                </div>
              </motion.div>

              {/* Gambar Artikel (Featured Image) */}
              <motion.div variants={fadeUpVariant} className="w-full h-[250px] sm:h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden mb-12 shadow-xl border border-white/50 relative group">
                 <img 
                   src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
                   alt="Kolaborasi IBISMA dan Dinkop UKM DIY" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Isi Artikel (Tanpa Card) */}
              <motion.article variants={fadeUpVariant} className="prose prose-lg max-w-none text-slate-700 font-medium leading-relaxed text-justify space-y-6">
                <p className="text-xl md:text-2xl text-slate-900 font-semibold leading-relaxed mb-8">
                  Inkubator Bisnis dan Inovasi Bersama (IBISMA) UII menjalin partnership dengan Dinas Koperasi dan Usaha Kecil Menengah (Dinkop-UKM) DIY untuk mewujudkan UKM naik kelas yang terbungkus pada agenda yang bertajuk <strong className="text-primary-600">Pelatihan Bisnis</strong>.
                </p>

                <p>
                  Direktur Simpul Tumbuh UII, Arif Wismadi dalam sambutanya menyampaikan apabila UII dalam beberapa tahun ini fokus dalam konsep Enterpreneur University. Hal ini melengkapi visi UII sebelumnya sebagai Research University. Senada dengan gerakan Dinkop-UKM DIY, UII juga berupaya menaikkan kelas universitas dengan perbanyak pengusaha, khususnya bagi mahasiswa.
                </p>

                <p>
                  Semangat ini perlu diimplementasikan melalui konsep, narasi, dan tindakan yang baik. “Bisnis yang dibangun harus benar-benar mengakar pada permasalahan umat. Selain berorientasikan untuk selesaikan masalah umat, bisnis di Jogja juga perlu memperhatikan sosial budaya masyarakatnya. Hal ini agar produk barang atau jasa bisa diterima dan berkembang di masyarakat. Contoh baik bisa dilihat pada UKM di Jogja. Meski berpengaruh pada pola dan pendapatan, pelaku UKM ternyata bisa melihat peluang dan bertahan di masa pandemi.”
                </p>

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
                  100 UKM yang terpilih akan diberikan berbagai pelatihan selama 4 hari. Seluruh peserta, akan mendapatkan materi dan pendampingan dari mentor dalam hal busines check up, business model canvas, branding, pembuatan profil usaha, optimalisasi digital marketing, pengelolaan finansial dan tip-tip usaha.
                </p>

                <p>
                  Dari 100 UKM akan disaring menjadi 20 terbaik yang akan mendapatkan failitas pendampingan lebih lanjut dan mendapatkan peluang berbagai hibah untuk scale up UKM dari IBISMA UII.
                </p>

                <p>
                  Selain untuk meningkatkan kelas, inkubator bisnis juga bisa menjadi ajang kolaborasi antarpelaku usaha. Melalui kolaborasi, maka kekuatan kecil yang tersebar ini bisa menjadi satu kekuatan besar yang saling menguatkan. Keunikan usaha dan pasar masing-masing bisa saling mengisi satu sama lain.
                </p>
              </motion.article>

              {/* Share Entry Section */}
              <motion.div variants={fadeUpVariant} className="mt-16 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <Share2 className="text-primary-500" size={24} />
                  <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">Bagikan Artikel Ini</span>
                </div>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all group">
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-300 hover:shadow-md transition-all group">
                    <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-700 hover:border-blue-400 hover:shadow-md transition-all group">
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Comment Section */}
              <motion.div variants={fadeUpVariant} className="mt-16 glass-panel bg-white/70 border border-slate-200/80 p-8 md:p-10 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 font-uii mb-6">Tinggalkan Komentar</h3>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      placeholder="Nama Lengkap" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                    />
                    <input 
                      type="email" 
                      placeholder="Alamat Email" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>
                  <textarea 
                    rows={5} 
                    placeholder="Tulis komentar Anda di sini..." 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-sm resize-none"
                  ></textarea>
                  <Button variant="primary" className="self-start px-8 h-12 text-base font-bold mt-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    Kirim Komentar
                  </Button>
                </form>
              </motion.div>
            </motion.div>

            {/* KANAN: SIDEBAR WIDGETS (4 Kolom) */}
            <motion.aside 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-4 space-y-10"
            >
              <div className="sticky top-32 space-y-10">
                
                {/* Widget: Pencarian */}
                <div className="glass-panel bg-white/70 border border-slate-200/80 p-6 rounded-3xl shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 font-uii mb-4">Pencarian</h3>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Cari berita..." 
                      className="w-full pl-5 pr-14 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-50 hover:bg-primary-100 text-primary-600 flex items-center justify-center rounded-lg transition-colors">
                      <Search size={20} />
                    </button>
                  </div>
                </div>

                {/* Widget: Berita Terbaru */}
                <div className="glass-panel bg-white/70 border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 font-uii mb-6 pb-4 border-b border-slate-200 flex items-center gap-3">
                    <Calendar className="text-primary-500" /> Berita Terbaru
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    {beritaTerbaru.map((berita, idx) => (
                      <Link href="#" key={idx} className="group flex flex-col gap-2 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors leading-snug line-clamp-3">
                          {berita.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <Clock size={12} className="text-primary-400" />
                          {berita.date}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-8 border-slate-300 text-slate-700 hover:text-primary-600 font-bold group">
                    Lihat Indeks Berita <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

              </div>
            </motion.aside>

          </div>
        </div>
      </section>
      
      {/* BERITA TERKAIT (Bottom Cards Grid) */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200/60 relative">
        <div className="container-tech relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-uii mb-3 flex items-center gap-3">
                <Newspaper className="text-primary-500" /> Berita Terkait
              </h2>
              <p className="text-slate-600 font-medium">Jangan lewatkan informasi dan kolaborasi terbaru lainnya.</p>
            </div>
            <Link href="#" className="hidden md:flex text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline items-center gap-2 transition-colors">
              Lihat Semua Berita <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTerbaru.slice(0, 3).map((berita, idx) => (
              <Link href="#" key={idx} className="group flex flex-col glass-panel bg-white/80 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300">
                <div className="h-52 overflow-hidden relative bg-slate-200">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={berita.img || "https://images.unsplash.com/photo-1542744094-24638ea0b3b3?q=80&w=600&auto=format&fit=crop"} alt={berita.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-white">
                    {berita.date.split('-')[0]}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors leading-snug line-clamp-3">
                    {berita.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tombol Lihat Semua untuk Mobile */}
          <div className="mt-10 flex md:hidden justify-center">
            <Button variant="outline" className="w-full gap-2 border-slate-300 text-slate-700 font-bold">
              Lihat Semua Berita <ArrowRight size={16} />
            </Button>
          </div>

        </div>
      </section>

      {/* Footer Global */}
      <Footer />
    </main>
  );
}