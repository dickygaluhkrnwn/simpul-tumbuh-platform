"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserRegistrations } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Download, 
  QrCode,
  ArrowRight
} from "lucide-react";
import { Timestamp } from "firebase/firestore";

// Definisikan tipe gabungan untuk Ticket
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
      // @ts-ignore - Mengabaikan type checking sementara karena struktur return firestore dinamis
      setTickets(data);
      setLoading(false);
    };

    fetchTickets();
  }, [user]);

  // Helper format tanggal
  const formatDate = (date: Timestamp | Date | undefined) => {
    if (!date) return "-";
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const formatTime = (date: Timestamp | Date | undefined) => {
    if (!date) return "-";
    const d = date instanceof Timestamp ? date.toDate() : date;
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-uii flex items-center gap-3">
          <Ticket className="text-uii-yellow-500" size={32} />
          Tiket Saya
        </h1>
        <p className="text-slate-500 mt-2">
          Daftar event yang akan Anda ikuti. Tunjukkan tiket ini saat registrasi ulang di lokasi.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Ticket size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Belum ada tiket</h3>
          <p className="text-slate-500 mb-6">Anda belum mendaftar ke event apapun.</p>
          <Link href="/dashboard/events">
            <Button className="bg-uii-blue-600 hover:bg-uii-blue-700">
              Cari Event Sekarang <ArrowRight size={16} className="ml-2"/>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket) => (
            <div 
              key={ticket.registrationId} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row"
            >
              {/* Event Image (Left/Top) */}
              <div className="w-full md:w-64 h-40 md:h-auto relative bg-slate-100 flex-shrink-0">
                {ticket.event?.image ? (
                  <img 
                    src={ticket.event.image} 
                    alt={ticket.event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-uii-blue-600">
                  {ticket.event?.category}
                </div>
              </div>

              {/* Ticket Details (Middle) */}
              <div className="p-6 flex-grow flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    ticket.status === 'confirmed' 
                      ? 'bg-green-50 text-green-600 border-green-200' 
                      : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                  }`}>
                    {ticket.status === 'confirmed' ? 'Terkonfirmasi' : 'Menunggu'}
                  </span>
                  <span className="text-xs text-slate-400">
                    ID: {ticket.registrationId.substring(0, 8).toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">
                  {ticket.event?.title || "Event Tidak Ditemukan"}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} className="text-uii-yellow-500" />
                    <span>{formatDate(ticket.event?.date as Timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-uii-yellow-500" />
                    <span>{formatTime(ticket.event?.date as Timestamp)} WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 col-span-2">
                    <MapPin size={16} className="text-uii-yellow-500" />
                    <span className="truncate">{ticket.event?.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Area (Right/Bottom) */}
              <div className="p-6 w-full md:w-64 bg-slate-50 flex flex-col justify-center gap-3">
                <Button variant="outline" className="w-full bg-white border-slate-200 hover:bg-slate-50 text-slate-700 justify-start gap-3">
                  <Download size={18} />
                  <span>Unduh E-Tiket</span>
                </Button>
                <Button className="w-full bg-uii-blue-600 hover:bg-uii-blue-700 text-white justify-start gap-3">
                  <QrCode size={18} />
                  <span>Lihat QR Code</span>
                </Button>
                {ticket.event && (
                  <Link href={`/dashboard/events/${ticket.event.id}`} className="w-full">
                    <button className="text-xs text-slate-500 hover:text-uii-blue-600 text-center w-full mt-2 transition-colors">
                      Lihat Detail Event
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}