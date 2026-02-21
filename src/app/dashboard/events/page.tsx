"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link yang sebelumnya kurang
import { getEvents } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Filter } from "lucide-react";
import { Timestamp } from "firebase/firestore";

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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-uii">Jelajah Event</h1>
          <p className="text-slate-500 mt-1">Temukan kegiatan yang sesuai dengan minat dan pengembangan karirmu.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} /> Filter Kategori
        </Button>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500">Belum ada event yang tersedia.</p>
          <p className="text-xs text-slate-400 mt-2">(Coba klik 'Generate Dummy Data' di Dashboard Home)</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-uii-blue-600 shadow-sm">
                  {event.category}
                </div>
                {/* Fallback image if URL error (simplification) */}
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-uii-blue-600 transition-colors">
                    {event.title}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={16} className="text-uii-yellow-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="text-uii-yellow-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users size={16} className="text-uii-yellow-500" />
                    <span>Sisa Kuota: <span className="font-semibold text-slate-700">{event.quota - event.registered}</span></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-slate-400 block">Harga Tiket</span>
                    <span className="font-bold text-lg text-uii-blue-700">
                      {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                  {/* UPDATE: Tombol Detail dibungkus Link */}
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button size="sm" className="bg-uii-blue-600 hover:bg-uii-blue-700">
                      Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}