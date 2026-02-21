"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap, ArrowLeft, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // State form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Buat User di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // 2. Update Profile (Nama Lengkap) di Auth
      await updateProfile(user, {
        displayName: formData.fullName
      });

      // 3. Simpan Data User ke Firestore (PENTING untuk Role)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: formData.fullName,
        role: "user", // Default role
        createdAt: new Date(),
        nim: "",     // Kosongkan dulu
        faculty: "", // Kosongkan dulu
        phone: ""    // Kosongkan dulu
      });

      setSuccess(true);
      
      // Redirect ke Dashboard setelah 2 detik
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      console.error("Register Error:", err);
      // Mapping Error Firebase ke Bahasa Indonesia
      if (err.code === 'auth/email-already-in-use') {
        setError("Email sudah terdaftar. Silakan login.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Format email tidak valid.");
      } else if (err.code === 'auth/weak-password') {
        setError("Kata sandi terlalu lemah.");
      } else {
        setError("Gagal mendaftar. Coba lagi nanti.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-uii-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-uii-blue-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-uii-blue-200 hover:text-white transition-colors z-20 font-medium"
      >
        <ArrowLeft size={20} />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md relative z-10 my-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-uii-blue-500 to-uii-blue-700 rounded-xl shadow-lg shadow-uii-blue-500/30 mb-4">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <h1 className="text-3xl font-bold text-white font-uii mb-2">Buat Akun Baru</h1>
          <p className="text-uii-blue-200">Bergabunglah dengan ekosistem inovasi UII.</p>
        </div>

        {/* Register Card */}
        <div className="glass-dark border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-uii-blue-200">Mengalihkan ke dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Error Alert */}
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Nama Lengkap */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-uii-blue-100 ml-1">Nama Lengkap</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Anda"
                      className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-uii-blue-100 ml-1">Email</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@uii.ac.id"
                      className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-uii-blue-100 ml-1">Kata Sandi</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimal 6 karakter"
                      className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-uii-blue-100 ml-1">Konfirmasi Kata Sandi</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Ulangi kata sandi"
                      className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-uii-yellow-500 hover:bg-uii-yellow-400 text-uii-blue-950 font-bold text-base shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]"
                  isLoading={isLoading}
                >
                  Daftar Sekarang
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-uii-blue-200 text-sm">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-uii-yellow-400 hover:text-uii-yellow-300 font-bold transition-colors">
                Masuk Disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}