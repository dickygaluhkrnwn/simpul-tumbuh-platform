"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Filter, Sparkles } from "lucide-react";
import { Timestamp } from "firebase/firestore";
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

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

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
    <div className="space-y-8 pb-20">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles size={14} /> Direktori Kegiatan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii tracking-tight mb-2">Jelajah Event</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Temukan kegiatan yang sesuai dengan minat dan akselerasi bisnismu.</p>
        </div>
        
        <Button variant="outline" className="gap-2 relative z-10 shadow-sm dark:border-slate-700 dark:hover:bg-slate-800">
          <Filter size={16} /> Filter Kategori
        </Button>
      </motion.div>

      {/* EVENTS GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Event...</p>
        </div>
      ) : events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 shadow-sm"
        >
          <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada event yang tersedia saat ini.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">(Coba klik 'Generate Dummy Data' di Dashboard Home)</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {events.map((event) => (
            <motion.div 
              key={event.id} 
              variants={fadeUpVariant}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 z-20 glass-dark border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  {event.category}
                </div>
                <img 
                  src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {event.title}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <Calendar size={16} className="text-primary-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <MapPin size={16} className="text-accent-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <Users size={16} className="text-emerald-500" />
                    <span>Sisa Kuota: <span className="font-bold text-slate-900 dark:text-white">{event.quota - event.registered}</span></span>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Harga Tiket</span>
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                      {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button size="sm" variant="outline" className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 shadow-sm">
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