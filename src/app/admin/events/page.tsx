"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, deleteEvent } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus event "${title}"? Data tidak bisa dikembalikan.`)) {
      await deleteEvent(id);
      fetchEvents(); // Refresh data
    }
  };

  // Helper Format Tanggal
  const formatDate = (date: any) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-uii">Manajemen Event</h1>
          <p className="text-slate-500">Kelola jadwal, kuota, dan detail kegiatan Simpul Tumbuh.</p>
        </div>
        <Link href="/admin/events/create">
          <Button className="bg-uii-blue-600 hover:bg-uii-blue-700 gap-2">
            <Plus size={18} /> Tambah Event
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Nama Event</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Jadwal & Lokasi</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-center">Kuota</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Memuat data event...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Belum ada event. Silakan tambah baru.</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <img src={event.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{event.title}</p>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider mt-1">
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-uii-yellow-500" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-uii-yellow-500" />
                          <span className="line-clamp-1 max-w-[150px]">{event.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-slate-900">{event.registered} / {event.quota}</span>
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-uii-blue-500 rounded-full" 
                            style={{ width: `${Math.min((event.registered / event.quota) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        event.status === 'open' ? 'bg-green-100 text-green-700' :
                        event.status === 'closed' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <button className="p-2 text-slate-500 hover:text-uii-blue-600 hover:bg-uii-blue-50 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(event.id!, event.title)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}