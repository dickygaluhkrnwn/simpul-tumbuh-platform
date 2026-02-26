"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Phone, BookOpen, Save, UserCircle, Settings, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface UserProfileData {
  fullName: string;
  nim: string;
  faculty: string;
  phone: string;
  bio: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState<UserProfileData>({
    fullName: "",
    nim: "",
    faculty: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as UserProfileData);
        } else {
          setFormData(prev => ({
            ...prev,
            fullName: user.displayName || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: user.email,
        updatedAt: new Date(),
      }, { merge: true });
      
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Gagal menyimpan profil.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Memuat Data Profil...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-20 font-sans w-full"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2 glass-panel bg-white/70 p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-primary-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <UserCircle size={16} /> Account Settings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-uii tracking-tight mb-3">Profil Saya</h1>
          <p className="text-slate-600 font-medium text-lg">Lengkapi data diri Anda untuk kemudahan pendaftaran event dan manajemen inkubasi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent h-1/2 pointer-events-none" />
            
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border-4 border-slate-50 shadow-xl relative z-10 group cursor-pointer hover:border-primary-200 transition-colors">
              <User size={56} className="text-slate-300 group-hover:text-primary-400 transition-colors" />
              <div className="absolute inset-0 bg-slate-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Ubah Foto</span>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-1 font-uii leading-tight">{formData.fullName || "Pengguna Baru"}</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">{user?.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-sm">
                <ShieldCheck size={16} className="text-primary-500" />
                Mahasiswa / Umum
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-200/80 pb-6 mb-8 relative z-10">
              <div className="p-3 bg-primary-50 text-primary-600 border border-primary-100 rounded-xl shadow-sm">
                <Settings size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Edit Informasi Personal</h3>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" size={18} />
                    <Input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Anda"
                      className="pl-12 bg-white/80 h-12"
                    />
                  </div>
                </div>

                {/* NIM / Identitas */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">No. Identitas / NIM</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" size={18} />
                    <Input 
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      placeholder="Contoh: 18523xxx"
                      className="pl-12 bg-white/80 h-12"
                    />
                  </div>
                </div>

                {/* Fakultas / Institusi */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Fakultas / Instansi</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" size={18} />
                    <Input 
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      placeholder="Contoh: FTI, FH, atau Umum"
                      className="pl-12 bg-white/80 h-12"
                    />
                  </div>
                </div>

                {/* No WhatsApp */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" size={18} />
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="pl-12 bg-white/80 h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Singkat */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Bio Singkat (Minat & Skill)</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Ceritakan sedikit tentang keahlian, minat startup, atau teknologi yang Anda kuasai..."
                  rows={5}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none shadow-sm"
                />
              </div>

              <div className="flex justify-end pt-8 border-t border-slate-200/80">
                <Button 
                  type="submit" 
                  variant="primary"
                  className="w-full sm:w-auto h-14 px-10 gap-2 shadow-lg shadow-primary-500/20 font-bold text-lg"
                  isLoading={isLoading}
                >
                  <Save size={20} /> Simpan Perubahan
                </Button>
              </div>

            </form>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}