"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Filter, Sparkles, Search } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { Input } from "@/components/ui/Input";
import { motion, Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      // Hanya tampilkan event yang statusnya open atau ongoing untuk user
      const visibleEvents = data.filter(e => e.status !== 'closed');
      setEvents(visibleEvents);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Filter pencarian
  const filteredEvents = events.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Helper untuk format tanggal dari Firestore Timestamp
  const formatDate = (date: Timestamp | Date) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  };

  return (
    <div className="space-y-8 pb-20 w-full selection:bg-primary-500 selection:text-white">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass-panel bg-white/70 p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles size={16} /> Direktori Kegiatan
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii tracking-tight mb-3">Jelajah Event</h1>
          <p className="text-slate-600 font-medium text-lg">Temukan kegiatan inkubasi, workshop, dan kompetisi yang sesuai dengan akselerasi bisnismu.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Cari event..." 
              className="pl-10 h-12 bg-white/80 border-slate-200 rounded-xl shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <Button variant="outline" className="gap-2 h-12 bg-white border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 shadow-sm shrink-0">
            <Filter size={18} /> Kategori
          </Button>
        </div>
      </motion.div>

      {/* EVENTS GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Memuat Event...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-32 glass-panel bg-white/60 rounded-[2.5rem] border border-dashed border-slate-300 shadow-sm"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400 border border-slate-200 shadow-sm">
            <Calendar size={36} />
          </div>
          <p className="text-slate-600 font-bold text-lg">Belum ada event yang sesuai.</p>
          <p className="text-sm text-slate-500 mt-2 font-medium">Silakan cek kembali secara berkala untuk update kegiatan terbaru.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div 
              key={event.id} 
              variants={fadeUpVariant}
              className="group glass-panel bg-white/80 rounded-[2rem] border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-default"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-800 uppercase tracking-widest shadow-sm border border-white">
                  {event.category}
                </div>
                <img 
                  src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="p-1.5 bg-primary-50 text-primary-600 rounded-lg">
                      <Calendar size={16} />
                    </div>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="p-1.5 bg-accent-50 text-accent-600 rounded-lg">
                      <MapPin size={16} />
                    </div>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                      <Users size={16} />
                    </div>
                    <span>Sisa Kuota: <span className="font-bold text-slate-900">{event.quota - event.registered}</span></span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Harga Tiket</span>
                    <span className="font-bold text-xl text-primary-600">
                      {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button size="sm" variant="outline" className="bg-white border-slate-200 text-slate-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 shadow-sm h-10 px-4">
                      Detail Event
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}