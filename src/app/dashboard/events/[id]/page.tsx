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
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft, 
  Clock, 
  Tag, 
  Share2,
  CheckCircle 
} from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Ambil data event & status registrasi
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
      
      // Update data event lokal (kurangi kuota visual)
      setEvent(prev => prev ? ({...prev, registered: prev.registered + 1}) : null);
      
      // Redirect ke halaman tiket saya
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
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  };

  const formatTime = (date: Timestamp | Date) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(d) + " WIB";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uii-blue-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-700">Event tidak ditemukan</h2>
        <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
      </div>
    );
  }

  const isFull = event.registered >= event.quota;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-slate-500 hover:text-uii-blue-600 transition-colors"
      >
        <ArrowLeft size={18} />
        Kembali ke Jelajah Event
      </button>

      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg group">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
          <span className="inline-block px-3 py-1 bg-uii-yellow-500 text-uii-blue-950 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            {event.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-uii leading-tight mb-2">
            {event.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-200 text-sm md:text-base">
            <span className="flex items-center gap-2">
              <MapPin size={18} /> {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang Event</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Schedule Info */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Jadwal Pelaksanaan</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-uii-blue-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Tanggal</p>
                  <p className="text-slate-900 font-semibold">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-uii-blue-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Waktu</p>
                  <p className="text-slate-900 font-semibold">{formatTime(event.date)} - Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 text-sm">Harga Tiket</span>
              <span className="text-2xl font-bold text-uii-blue-600">
                {event.price === 0 ? "GRATIS" : `Rp ${event.price.toLocaleString("id-ID")}`}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Sisa Kuota</span>
                <span className="font-semibold text-slate-900">{event.quota - event.registered} Kursi</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-uii-yellow-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(event.registered / event.quota) * 100}%` }}
                />
              </div>
            </div>

            {isRegistered ? (
              <Button disabled className="w-full bg-green-600 text-white border-none cursor-default gap-2">
                <CheckCircle size={18} />
                Anda Sudah Terdaftar
              </Button>
            ) : isFull ? (
              <Button disabled className="w-full bg-slate-300 text-slate-500 border-none cursor-not-allowed">
                Kuota Penuh
              </Button>
            ) : (
              <Button 
                onClick={handleRegister} 
                className="w-full h-12 bg-uii-blue-600 hover:bg-uii-blue-700 font-bold shadow-lg shadow-uii-blue-600/20"
                isLoading={registering}
              >
                Daftar Sekarang
              </Button>
            )}

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <button className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-uii-blue-600 w-full transition-colors">
                <Share2 size={16} /> Bagikan Event Ini
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}