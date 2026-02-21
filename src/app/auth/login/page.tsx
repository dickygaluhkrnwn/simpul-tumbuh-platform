"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Zap, ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore
import { auth, db } from "@/lib/firebase"; // Import db

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Login Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Cek & Buat Dokumen User di Firestore jika belum ada
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Logika "Admin Pertama": Jika email ini adalah email spesifik Anda, jadikan admin
        // Ganti 'email_anda@gmail.com' dengan email asli yang Anda pakai untuk login
        const isAdmin = email === "admin@uii.ac.id"; // Contoh hardcode sementara untuk inisialisasi

        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          role: isAdmin ? "admin" : "user", // Auto-assign role
          createdAt: new Date(),
          fullName: "", // Nanti diisi di profil
          nim: ""
        });
        console.log("User document created!");
      }

      // 3. Redirect sesuai Role
      // Kita ambil data terbaru (karena barusan mungkin baru dibuat)
      const finalUserDoc = await getDoc(userDocRef);
      const role = finalUserDoc.data()?.role;

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/invalid-credential') {
        setError("Email atau kata sandi salah.");
      } else if (err.code === 'auth/user-not-found') {
        setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Kata sandi salah.");
      } else {
        setError("Terjadi kesalahan sistem. Coba lagi nanti.");
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

      <div className="w-full max-w-md relative z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-uii-blue-500 to-uii-blue-700 rounded-xl shadow-lg shadow-uii-blue-500/30 mb-4">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <h1 className="text-3xl font-bold text-white font-uii mb-2">Selamat Datang</h1>
          <p className="text-uii-blue-200">Masuk untuk mengelola event & inkubasi.</p>
        </div>

        {/* Login Card */}
        <div className="glass-dark border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Alert */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-uii-blue-100 ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@uii.ac.id"
                    className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-uii-blue-100">Password</label>
                  <Link href="#" className="text-xs text-uii-yellow-500 hover:text-uii-yellow-400">
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-uii-blue-300 group-focus-within:text-uii-yellow-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-uii-blue-900/50 border border-uii-blue-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-uii-blue-400/50 focus:outline-none focus:ring-2 focus:ring-uii-yellow-500/50 focus:border-uii-yellow-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-uii-yellow-500 hover:bg-uii-yellow-400 text-uii-blue-950 font-bold text-base shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]"
              isLoading={isLoading}
            >
              Masuk ke Akun
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-uii-blue-200 text-sm">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-uii-yellow-400 hover:text-uii-yellow-300 font-bold transition-colors">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}