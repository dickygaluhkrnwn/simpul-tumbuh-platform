"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap, ArrowLeft, Mail, Lock, User, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.fullName
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: formData.fullName,
        role: "user",
        createdAt: new Date(),
        nim: "",
        faculty: "",
        phone: ""
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      console.error("Register Error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Email sudah terdaftar. Silakan login.");
      } else {
        setError("Gagal mendaftar. Coba lagi nanti.");
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
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
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

      {/* 3. REGISTER CARD CONTAINER */}
      <div className="w-full max-w-md relative z-10 my-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl shadow-primary-500/20 mb-6">
              <Zap className="w-8 h-8 text-white fill-current" />
              <div className="absolute -top-1 -right-1">
                <Sparkles size={20} className="text-accent-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white font-uii tracking-tight mb-2">Buat Akun</h1>
            <p className="text-slate-400 font-medium">Bergabunglah dengan ekosistem inovasi UII.</p>
          </div>

          {/* GLASS CARD */}
          <div className="glass-dark border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-slate-400 font-medium">Menyelaraskan data Anda. Mohon tunggu...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5 relative z-10">
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

                <div className="space-y-4">
                  {/* FULL NAME */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Nama Lengkap</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                        <User size={18} />
                      </div>
                      <Input 
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nama Lengkap Anda"
                        className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Institusi</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                        <Mail size={18} />
                      </div>
                      <Input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@uii.ac.id"
                        className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                      />
                    </div>
                  </div>

                  {/* PASSWORD GRID */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Kata Sandi</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                          <Lock size={18} />
                        </div>
                        <Input 
                          type="password"
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min. 6 karakter"
                          className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Konfirmasi</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors z-10">
                          <Lock size={18} />
                        </div>
                        <Input 
                          type="password"
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Ulangi sandi"
                          className="pl-12 h-14 bg-slate-900/50 border-white/5 focus:bg-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="secondary"
                    className="w-full h-14 text-lg font-bold shadow-[0_0_25px_rgba(234,179,8,0.3)]"
                    isLoading={isLoading}
                  >
                    Daftar Sekarang
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm font-medium">
                Sudah memiliki akun?{" "}
                <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-bold transition-all decoration-primary-400/30 underline-offset-4 hover:underline">
                  Masuk Disini
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}