"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserRegistrations } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, MapPin, Clock, Ticket, 
  Download, QrCode, ArrowRight, Sparkles 
} from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { motion, Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

interface TicketData {
  registrationId: string;
  eventId: string;
  userId: string;
  registeredAt: Timestamp;
  status: string;
  event: Event | null;
}

export default function MyTicketsPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      const data = await getUserRegistrations(user.uid);
      // @ts-ignore
      setTickets(data);
      setLoading(false);
    };

    fetchTickets();
  }, [user]);

  const formatDate = (date: Timestamp | Date | undefined) => {
    if (!date) return "-";
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    }).format(d);
  };

  const formatTime = (date: Timestamp | Date | undefined) => {
    if (!date) return "-";
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit", minute: "2-digit",
    }).format(d);
  };

  return (
    <div className="space-y-8 pb-20 font-sans">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Ticket size={14} /> My Bookings
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-uii tracking-tight mb-2">Tiket Saya</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Daftar event yang akan Anda ikuti. Tunjukkan e-tiket saat registrasi ulang.</p>
        </div>
      </motion.div>

      {/* CONTENT SECTION */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Mempersiapkan Tiket...</p>
        </div>
      ) : tickets.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-700 shadow-sm relative overflow-hidden"
        >
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 shadow-inner">
            <Ticket size={36} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-uii">Belum Ada Tiket</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Anda belum terdaftar pada event apapun. Mari mulai jelajahi kegiatan menarik di ekosistem kami.</p>
          <Link href="/dashboard/events">
            <Button variant="primary" className="gap-2 shadow-lg">
              Cari Event Sekarang <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          {tickets.map((ticket) => (
            <motion.div 
              key={ticket.registrationId} 
              variants={fadeUpVariant}
              className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
            >
              {/* Event Image (Left/Top) */}
              <div className="w-full md:w-72 h-48 md:h-auto relative bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border-r border-slate-200 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-50 group-hover:opacity-80 transition-opacity" />
                {ticket.event?.image ? (
                  <img 
                    src={ticket.event.image} 
                    alt={ticket.event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image Available</div>
                )}
                <div className="absolute top-4 left-4 z-20 glass-dark px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 backdrop-blur-md">
                  {ticket.event?.category}
                </div>
              </div>

              {/* Ticket Details (Middle) */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center border-b md:border-b-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                    ticket.status === 'confirmed' 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' 
                      : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                  }`}>
                    {ticket.status === 'confirmed' ? 'Terkonfirmasi' : 'Menunggu'}
                  </span>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                    ID: {ticket.registrationId.substring(0, 8).toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 line-clamp-2 leading-tight">
                  {ticket.event?.title || "Event Tidak Ditemukan"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <Calendar size={16} className="text-primary-500" />
                    <span>{formatDate(ticket.event?.date as Timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <Clock size={16} className="text-accent-500" />
                    <span>{formatTime(ticket.event?.date as Timestamp)} WIB</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium sm:col-span-2 mt-1">
                    <MapPin size={16} className="text-rose-500" />
                    <span className="truncate">{ticket.event?.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Area (Right/Bottom) */}
              <div className="p-6 md:p-8 w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-center gap-3 border-l border-slate-200 dark:border-slate-800 shrink-0 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-8 bg-white dark:bg-slate-900 rounded-r-full border-r border-y border-slate-200 dark:border-slate-800 -ml-[1px] hidden md:block" />
                
                <Button variant="outline" className="w-full justify-start gap-3 bg-white dark:bg-slate-900 shadow-sm">
                  <Download size={18} className="text-slate-500" />
                  <span className="font-bold">Unduh E-Tiket</span>
                </Button>
                <Button variant="primary" className="w-full justify-start gap-3 shadow-md">
                  <QrCode size={18} />
                  <span className="font-bold">Lihat QR Code</span>
                </Button>
                {ticket.event && (
                  <Link href={`/dashboard/events/${ticket.event.id}`} className="w-full mt-3">
                    <button className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary-500 text-center w-full transition-colors">
                      Lihat Detail Event
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}