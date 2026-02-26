"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, X, MessageCircle, Minimize2, Loader2, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Halo! 👋 Saya Simpul AI. Ada yang bisa saya bantu terkait event, startup, atau program inovasi hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Kirim ke API Route kita
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg.content,
          history: messages.slice(-6) // Kirim 6 pesan terakhir sebagai konteks
        }),
      });

      const data = await res.json();
      
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: data.reply || "Maaf, terjadi kesalahan koneksi." 
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: "err", role: "ai", content: "Maaf, saya tidak dapat terhubung ke server saat ini." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans selection:bg-primary-500 selection:text-white">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className="mb-6 w-[350px] md:w-[400px] h-[550px] glass-panel bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="bg-white/60 p-5 flex justify-between items-center text-slate-900 relative z-10 border-b border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Bot size={22} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Simpul AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Online & Siap</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 transition-colors shadow-sm"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-5 custom-scrollbar relative z-10">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm font-medium ${
                      msg.role === "user"
                        ? "bg-primary-600 text-white rounded-2xl rounded-tr-sm shadow-primary-500/20"
                        : "bg-white text-slate-700 border border-slate-200/80 rounded-2xl rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-200/80 flex items-center gap-3 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-primary-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Menganalisis...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 border-t border-slate-200/60 relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <form onSubmit={handleSend} className="relative flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="pr-14 py-6 rounded-2xl bg-white border-slate-200 focus:ring-primary-500/30 text-sm shadow-inner text-slate-800"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-xl bg-primary-600 hover:bg-primary-500 shadow-md transition-transform active:scale-95 disabled:bg-slate-200 disabled:border-slate-300"
                >
                  <Send size={16} className={input.trim() && !isLoading ? "text-white" : "text-slate-400"} />
                </Button>
              </form>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-500 font-medium">
                <Sparkles size={12} className="text-accent-500" />
                AI dapat membuat kesalahan. Cek kembali informasi penting.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-xl shadow-primary-500/30 flex items-center justify-center text-white border border-primary-400/50 relative z-50 group transition-shadow"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <MessageCircle size={32} className="fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Dot (jika belum dibuka) */}
        {!isOpen && messages.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-md animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}