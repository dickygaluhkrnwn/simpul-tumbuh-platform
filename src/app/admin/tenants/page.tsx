"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTenants, deleteTenant } from "@/lib/firestore/tenants";
import { Tenant } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit, Trash2, Rocket, Search, Building2, ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AdminTenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTenants = async () => {
    setLoading(true);
    const data = await getTenants();
    setTenants(data);
    setFilteredTenants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // Filter pencarian
  useEffect(() => {
    const results = tenants.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.batch?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTenants(results);
  }, [search, tenants]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Hapus startup "${name}"? Data tidak bisa dikembalikan.`)) {
      await deleteTenant(id);
      fetchTenants();
    }
  };

  return (
    <div className="space-y-8 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-uii mb-2">Data Tenant & Startup</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Kelola profil startup dan mitra binaan ekosistem UII.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Cari startup atau batch..." 
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <Link href="/admin/tenants/create" className="shrink-0">
            <Button variant="primary" className="gap-2 h-11 w-full sm:w-auto shadow-md">
              <Plus size={18} /> Tambah Startup
            </Button>
          </Link>
        </div>
      </div>

      {/* GRID SECTION */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Database...</p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 py-20 text-center">
          <Building2 size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">
            {search ? "Startup yang dicari tidak ditemukan." : "Belum ada data tenant. Silakan tambah baru."}
          </p>
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredTenants.map((item) => (
            <motion.div 
              key={item.id} 
              variants={fadeUpVariant}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/10 transition-colors" />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-700 p-1 group-hover:scale-105 transition-transform">
                    <img 
                      src={item.logo || `https://ui-avatars.com/api/?name=${item.name}&background=random`} 
                      alt={item.name} 
                      className="w-full h-full object-contain rounded-xl bg-white" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 leading-tight">{item.name}</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
              </div>
              
              {/* Badge Status */}
              <div className="mb-4">
                <span className={`inline-block text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${
                  item.status === 'Inkubasi' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800/50' : 
                  item.status === 'Lulus (Alumni)' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' : 
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 flex-grow">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <Rocket size={14} className="text-slate-400" />
                  {item.batch || "No Batch"}
                </div>
                
                <div className="flex gap-1.5">
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      <button className="p-2 text-slate-400 hover:text-accent-500 bg-slate-50 hover:bg-accent-50 dark:bg-slate-800 dark:hover:bg-accent-900/30 rounded-xl transition-colors" title="Buka Website">
                        <ExternalLink size={16} />
                      </button>
                    </a>
                  )}
                  <Link href={`/admin/tenants/${item.id}/edit`}>
                    <button className="p-2 text-slate-400 hover:text-primary-500 bg-slate-50 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-primary-900/30 rounded-xl transition-colors" title="Edit Startup">
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id!, item.name)}
                    className="p-2 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-xl transition-colors"
                    title="Hapus Startup"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}