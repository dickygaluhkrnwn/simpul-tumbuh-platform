"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTenants, deleteTenant } from "@/lib/firestore/tenants";
import { Tenant } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Rocket, Globe } from "lucide-react";

export default function AdminTenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    setLoading(true);
    const data = await getTenants();
    setTenants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Hapus startup "${name}"?`)) {
      await deleteTenant(id);
      fetchTenants();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-uii">Data Tenant & Startup</h1>
          <p className="text-slate-500">Kelola profil startup binaan IBISMA.</p>
        </div>
        <Link href="/admin/tenants/create">
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus size={18} /> Tambah Startup
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse" />)
        ) : tenants.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-dashed">
            Belum ada data tenant.
          </div>
        ) : (
          tenants.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <img src={item.logo || "/images/placeholder-avatar.png"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <span className="text-xs text-slate-500">{item.category}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  item.status === 'Inkubasi' ? 'bg-blue-100 text-blue-700' : 
                  item.status === 'Lulus (Alumni)' ? 'bg-green-100 text-green-700' : 
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <div className="text-xs text-slate-400 font-medium">
                  {item.batch}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/tenants/${item.id}/edit`}>
                    <button className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id!, item.name)}
                    className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}