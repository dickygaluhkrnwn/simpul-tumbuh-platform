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
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className="mb-6 w-[350px] md:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="bg-slate-950 p-5 flex justify-between items-center text-white relative z-10 border-b border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Simpul AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <span className="text-[10px] text-slate-300 font-medium uppercase tracking-widest">Online & Siap</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 space-y-5 custom-scrollbar relative z-10">
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
                        ? "bg-primary-600 text-white rounded-2xl rounded-tr-sm shadow-primary-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-primary-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Menganalisis...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative z-10">
              <form onSubmit={handleSend} className="relative flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="pr-14 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 text-sm shadow-inner"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-xl bg-primary-600 hover:bg-primary-500 shadow-md transition-transform active:scale-95 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                >
                  <Send size={16} className={input.trim() && !isLoading ? "text-white" : "text-slate-500"} />
                </Button>
              </form>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-400 font-medium">
                <Sparkles size={10} className="text-accent-500" />
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
        className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center text-white border border-white/20 relative z-50 group"
      >
        <div className="absolute inset-0 rounded-full bg-primary-400 opacity-0 group-hover:opacity-20 transition-opacity blur-md" />
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
          <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-md animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}