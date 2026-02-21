"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input"; // Komponen Input yang baru dibuat
import { User, Phone, BookOpen, Save, UserCircle } from "lucide-react";

// Tipe Data Profil User
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

  // Fetch Data Profil saat Load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as UserProfileData);
        } else {
          // Jika belum ada data di Firestore, isi default dari Auth (jika ada)
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
      // Simpan ke Firestore (merge: true agar tidak menimpa field lain jika ada)
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: user.email, // Pastikan email selalu tersimpan
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
    return <div className="p-8 text-center">Memuat data profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-uii flex items-center gap-3">
          <UserCircle className="text-uii-yellow-500" size={32} />
          Profil Saya
        </h1>
        <p className="text-slate-500 mt-2">
          Lengkapi data diri Anda untuk kemudahan pendaftaran event dan sertifikat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-24 h-24 bg-uii-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-uii-blue-600">
              <User size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{formData.fullName || "User"}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-uii-blue-50 text-uii-blue-700 text-xs font-bold uppercase tracking-wider">
              Mahasiswa / Umum
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Edit Informasi
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Anda"
                      className="pl-10" // Padding kiri untuk icon
                    />
                  </div>
                </div>

                {/* NIM / Identitas */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">NIM / No. Identitas</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      placeholder="Contoh: 18523xxx"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Fakultas / Institusi */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Fakultas / Institusi</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      placeholder="Contoh: FTI, FH, atau Umum"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* No WhatsApp */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">No. WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Singkat */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bio Singkat (Minat & Skill)</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Ceritakan sedikit tentang minat startup atau teknologi Anda..."
                  rows={4}
                  className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-uii-blue-500 focus:border-uii-blue-500 outline-none transition-all resize-none text-sm"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="bg-uii-blue-600 hover:bg-uii-blue-700 gap-2"
                  isLoading={isLoading}
                >
                  <Save size={18} /> Simpan Perubahan
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}