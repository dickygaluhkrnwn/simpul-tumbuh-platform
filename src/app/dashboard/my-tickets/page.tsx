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
    <div className="space-y-8 pb-20 font-sans w-full selection:bg-primary-500 selection:text-white">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 glass-panel bg-white/70 p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-accent-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Ticket size={16} /> My Bookings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii tracking-tight mb-3">Tiket Saya</h1>
          <p className="text-slate-600 font-medium text-lg">Daftar event yang akan Anda ikuti. Tunjukkan e-tiket saat registrasi ulang pada lokasi event.</p>
        </div>
      </motion.div>

      {/* CONTENT SECTION */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Mempersiapkan Tiket...</p>
        </div>
      ) : tickets.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32 glass-panel bg-white/60 rounded-[2.5rem] border border-dashed border-slate-300 shadow-sm relative overflow-hidden"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm border border-slate-100">
            <Ticket size={40} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-3 font-uii tracking-tight">Belum Ada Tiket</h3>
          <p className="text-slate-600 font-medium mb-10 max-w-md mx-auto text-lg leading-relaxed">Anda belum mendaftar pada event apapun. Mari mulai jelajahi kegiatan menarik di ekosistem kami.</p>
          <Link href="/dashboard/events">
            <Button variant="primary" className="gap-2 shadow-lg shadow-primary-500/20 h-14 px-8 text-lg font-bold">
              Cari Event Sekarang <ArrowRight size={20} />
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
              className="glass-panel bg-white/80 rounded-[2rem] border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col md:flex-row group"
            >
              {/* Event Image (Left/Top) */}
              <div className="w-full md:w-80 h-56 md:h-auto relative bg-slate-100 flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
                <div className="absolute inset-0 bg-slate-900/10 z-10 opacity-100 group-hover:opacity-0 transition-opacity" />
                {ticket.event?.image ? (
                  <img 
                    src={ticket.event.image} 
                    alt={ticket.event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-white">No Image Available</div>
                )}
                <div className="absolute top-4 left-4 z-20 bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-800 uppercase tracking-widest border border-white backdrop-blur-md shadow-sm">
                  {ticket.event?.category}
                </div>
              </div>

              {/* Ticket Details (Middle) */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center border-b md:border-b-0 border-slate-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                    ticket.status === 'confirmed' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {ticket.status === 'confirmed' ? 'Terkonfirmasi' : 'Menunggu'}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    ID: {ticket.registrationId.substring(0, 8).toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 line-clamp-2 leading-tight">
                  {ticket.event?.title || "Event Tidak Ditemukan"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                      <Calendar size={18} />
                    </div>
                    <span>{formatDate(ticket.event?.date as Timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-accent-50 text-accent-600 rounded-lg">
                      <Clock size={18} />
                    </div>
                    <span>{formatTime(ticket.event?.date as Timestamp)} WIB</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium sm:col-span-2 mt-1">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                      <MapPin size={18} />
                    </div>
                    <span className="truncate">{ticket.event?.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Area (Right/Bottom) - Ticket Stub Effect */}
              <div className="p-6 md:p-8 w-full md:w-72 bg-slate-50 flex flex-col justify-center gap-4 border-l-2 border-dashed border-slate-300 shrink-0 relative overflow-hidden">
                {/* Potongan Tiket Kiri (Cutout efek membulat di garis pemisah atas & bawah) */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 rounded-full hidden md:block" style={{ boxShadow: "inset 0px -4px 4px -4px rgba(0,0,0,0.1)" }} />
                <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-slate-50 rounded-full hidden md:block" style={{ boxShadow: "inset 0px 4px 4px -4px rgba(0,0,0,0.1)" }} />
                
                <Button variant="outline" className="w-full justify-start gap-3 bg-white hover:bg-primary-50 border-slate-200 text-slate-700 hover:text-primary-700 hover:border-primary-200 shadow-sm h-12">
                  <Download size={18} className="text-primary-500" />
                  <span className="font-bold">Unduh E-Tiket</span>
                </Button>
                
                <Button variant="primary" className="w-full justify-start gap-3 shadow-md h-12">
                  <QrCode size={18} />
                  <span className="font-bold">Lihat QR Code</span>
                </Button>
                
                {ticket.event && (
                  <Link href={`/dashboard/events/${ticket.event.id}`} className="w-full mt-4 flex justify-center">
                    <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary-600 text-center transition-colors pb-1 border-b border-transparent hover:border-primary-600">
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