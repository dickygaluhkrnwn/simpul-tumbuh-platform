"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap, ArrowLeft, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { motion } from "framer-motion";

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const isAdmin = email === "admin@uii.ac.id";

        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          role: isAdmin ? "admin" : "user",
          createdAt: new Date(),
          fullName: user.displayName || "",
          nim: ""
        });
      }

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
      } else {
        setError("Terjadi kesalahan sistem. Coba lagi nanti.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* 2. BACK BUTTON */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
            <ArrowLeft size={16} />
          </div>
          Kembali ke Beranda
        </Link>
      </motion.div>

      {/* 3. LOGIN CARD CONTAINER */}
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          {/* LOGO HEADER */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl shadow-primary-500/20 mb-6">
              <Zap className="w-8 h-8 text-white fill-current" />
              <div className="absolute -top-1 -right-1">
                <Sparkles size={20} className="text-accent-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white font-uii tracking-tight mb-2">Selamat Datang</h1>
            <p className="text-slate-400 font-medium">Masuk untuk mengelola event & inkubasi.</p>
          </div>

          {/* GLASS CARD */}
          <div className="glass-dark border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl -mr-16 -mt-16" />
            
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              {/* ERROR ALERT */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-sm flex items-center gap-3 font-medium"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-5">
                {/* EMAIL INPUT */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                      <Mail size={18} />
                    </div>
                    <Input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@uii.ac.id"
                      className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kata Sandi</label>
                    <Link href="#" className="text-[11px] font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider">
                      Lupa Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                      <Lock size={18} />
                    </div>
                    <Input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <Button 
                type="submit" 
                variant="secondary"
                className="w-full h-14 text-lg font-bold shadow-[0_0_25px_rgba(234,179,8,0.3)] mt-4"
                isLoading={isLoading}
              >
                Masuk ke Platform
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm font-medium">
                Belum memiliki akun?{" "}
                <Link href="/auth/register" className="text-accent-400 hover:text-accent-300 font-bold transition-all decoration-accent-400/30 underline-offset-4 hover:underline">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}