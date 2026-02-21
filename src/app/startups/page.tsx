"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { getTenants } from "@/lib/firestore/tenants";
import { Tenant } from "@/types";
import { Search, Rocket, Globe } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function StartupShowcasePage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTenants();
      setTenants(data);
      setFilteredTenants(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = tenants.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTenants(results);
  }, [search, tenants]);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header />
      
      <div className="pt-32 pb-12 bg-uii-blue-950 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white font-uii mb-4">Etalase Startup</h1>
          <p className="text-uii-blue-200 max-w-2xl mx-auto">
            Inovasi dan karya nyata dari mahasiswa dan alumni Universitas Islam Indonesia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Input 
            placeholder="Cari startup atau kategori..." 
            className="pl-12 h-12 rounded-full shadow-sm border-slate-200 focus:border-uii-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        {loading ? (
          <div className="text-center py-20">Memuat data...</div>
        ) : filteredTenants.length === 0 ? (
          <div className="text-center py-20 text-slate-500">Belum ada startup ditemukan.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTenants.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 mb-4 overflow-hidden border border-slate-100">
                  <img src={item.logo || "/images/placeholder-avatar.png"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase mb-4">
                  {item.category}
                </span>
                
                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="w-full pt-4 border-t border-slate-100 flex justify-center gap-4">
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-uii-blue-600 transition-colors" title="Website">
                      <Globe size={18} />
                    </a>
                  )}
                  <span className="text-xs text-slate-400 font-medium py-1">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}