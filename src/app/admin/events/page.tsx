"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, deleteEvent } from "@/lib/firestore/events";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Calendar, MapPin, Search } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setFilteredEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter pencarian sederhana
  useEffect(() => {
    const results = events.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(results);
  }, [search, events]);

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
    <div className="space-y-8 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii mb-2">Manajemen Event</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Kelola jadwal, kuota, dan detail kegiatan ekosistem.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Cari event..." 
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <Link href="/admin/events/create" className="shrink-0">
            <Button variant="primary" className="gap-2 h-11 w-full sm:w-auto shadow-md">
              <Plus size={18} /> Tambah Event
            </Button>
          </Link>
        </div>
      </div>

      {/* TABLE SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">Nama Event</th>
                <th className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">Jadwal & Lokasi</th>
                <th className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] text-center">Kuota</th>
                <th className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] text-center">Status</th>
                <th className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Memuat Data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500 dark:text-slate-400 font-medium italic">
                    {search ? "Event yang dicari tidak ditemukan." : "Belum ada event. Silakan tambah baru."}
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => {
                  const percentage = Math.min((event.registered / event.quota) * 100, 100);
                  
                  return (
                    <tr key={event.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                            <img src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=200&auto=format&fit=crop"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-base mb-1 max-w-[250px] truncate" title={event.title}>{event.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2 text-slate-600 dark:text-slate-400 font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-primary-500" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-rose-500" />
                            <span className="max-w-[180px] truncate" title={event.location}>{event.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center align-middle">
                        <div className="flex flex-col items-center justify-center">
                          <span className="font-bold text-slate-900 dark:text-white mb-1.5">{event.registered} <span className="text-slate-400 font-medium text-xs">/ {event.quota}</span></span>
                          <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${percentage >= 100 ? 'bg-rose-500' : 'bg-primary-500'}`} 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          event.status === 'open' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' :
                          event.status === 'closed' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}>
                          {event.status === 'open' ? 'Dibuka' : event.status === 'closed' ? 'Ditutup' : event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/events/${event.id}/edit`}>
                            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-xl transition-all" title="Edit Event">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(event.id!, event.title)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                            title="Hapus Event"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}