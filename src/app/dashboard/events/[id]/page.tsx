"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  getEventById, 
  registerEvent, 
  checkRegistrationStatus 
} from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, MapPin, Users, ArrowLeft, 
  Clock, Share2, CheckCircle, Ticket, Tag 
} from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const initData = async () => {
      if (!params.id) return;
      
      const eventData = await getEventById(params.id as string);
      setEvent(eventData);

      if (user && eventData) {
        const registered = await checkRegistrationStatus(params.id as string, user.uid);
        setIsRegistered(registered);
      }
      
      setLoading(false);
    };

    initData();
  }, [params.id, user]);

  const handleRegister = async () => {
    if (!user || !event) return;
    
    if (!confirm(`Anda yakin ingin mendaftar ke event "${event.title}"?`)) return;

    setRegistering(true);
    try {
      await registerEvent(params.id as string, user.uid, user.email || "");
      alert("Pendaftaran Berhasil! Tiket telah ditambahkan ke akun Anda.");
      setIsRegistered(true);
      setEvent(prev => prev ? ({...prev, registered: prev.registered + 1}) : null);
      
      router.push("/dashboard/my-tickets");
    } catch (error) {
      alert("Gagal mendaftar: " + error);
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (date: Timestamp | Date) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).format(d);
  };

  const formatTime = (date: Timestamp | Date) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit", minute: "2-digit",
    }).format(d) + " WIB";
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 gap-4">
        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Mempersiapkan Event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-32 glass-panel bg-white/70 rounded-[2.5rem] border border-slate-200/80 shadow-sm w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-uii">Event tidak ditemukan</h2>
        <p className="text-slate-500 font-medium mb-8">Mungkin event telah dihapus atau link tidak valid.</p>
        <Button onClick={() => router.back()} variant="outline" className="bg-white">Kembali ke Daftar Event</Button>
      </div>
    );
  }

  const isFull = event.registered >= event.quota;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto w-full pb-20 font-sans selection:bg-primary-500 selection:text-white"
    >
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all shadow-sm"
      >
        <ArrowLeft size={16} />
        Kembali ke Jelajah
      </button>

      {/* Hero Image & Headline */}
      <div className="relative h-[350px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/50 group">
        <div className="absolute inset-0 bg-slate-900" />
        <img 
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 glass bg-white/20 border border-white/40 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Tag size={12} /> {event.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-uii text-white leading-tight mb-6 drop-shadow-xl max-w-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-100 text-sm md:text-base font-medium">
            <span className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <MapPin size={18} className="text-accent-400" /> {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-4">
        
        {/* Left Column: Description & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 font-uii flex items-center gap-3">
              <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                <Ticket size={24} />
              </div>
              Tentang Event
            </h3>
            
            {/* Karena di halaman admin kita sudah ganti Description menjadi Tiptap (Rich Text), 
               maka kita render sebagai HTML (dangerouslySetInnerHTML) agar format list/bold-nya muncul.
            */}
            <div 
              className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>

          {/* Schedule Info Card */}
          <div className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 font-uii">Jadwal Pelaksanaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary-200 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shrink-0 shadow-sm">
                  <Calendar size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tanggal</p>
                  <p className="text-slate-900 font-bold text-lg">{formatDate(event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-accent-200 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 shrink-0 shadow-sm">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Waktu</p>
                  <p className="text-slate-900 font-bold text-lg">{formatTime(event.date)}</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Registration Card */}
        <div className="lg:col-span-1">
          <div className="glass-panel bg-white/80 p-8 rounded-[2.5rem] border border-slate-200/80 shadow-xl sticky top-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="mb-8 border-b border-slate-200/80 pb-8 relative z-10">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Investasi</span>
              <span className="text-4xl font-bold text-primary-600 font-uii tracking-tight">
                {event.price === 0 ? "GRATIS" : `Rp ${event.price.toLocaleString("id-ID")}`}
              </span>
            </div>

            <div className="space-y-6 mb-10 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Users size={18} className="text-slate-400" /> Sisa Kuota
                </span>
                <span className="font-bold text-slate-900 text-lg bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 shadow-inner">
                  {event.quota - event.registered} <span className="text-xs font-medium text-slate-500">kursi</span>
                </span>
              </div>
              
              {/* Progress Bar Kuota */}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-200 shadow-inner">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isFull ? 'bg-rose-500' : 'bg-gradient-to-r from-primary-400 to-primary-600'}`} 
                  style={{ width: `${Math.min((event.registered / event.quota) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="relative z-10">
              {isRegistered ? (
                <Button disabled className="w-full h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default gap-2 font-bold text-base shadow-sm">
                  <CheckCircle size={20} />
                  Sudah Terdaftar
                </Button>
              ) : isFull ? (
                <Button disabled className="w-full h-14 bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed font-bold text-base shadow-sm">
                  Kuota Penuh
                </Button>
              ) : (
                <Button 
                  onClick={handleRegister} 
                  variant="primary"
                  className="w-full h-14 font-bold text-base shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  isLoading={registering}
                >
                  Amankan Tiket Sekarang
                </Button>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200/80 text-center relative z-10">
              <button className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm hover:border-primary-200 hover:bg-primary-50">
                <Share2 size={16} /> Bagikan Event Ini
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}