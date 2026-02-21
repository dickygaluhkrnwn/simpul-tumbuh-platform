"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap, Send, X, MessageCircle, Minimize2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Halo! 👋 Saya Simpul AI. Ada yang bisa saya bantu terkait event, startup, atau program UII hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

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
          history: messages.slice(-6) // Kirim 6 pesan terakhir sebagai konteks percakapan
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-uii-blue-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-uii-blue-700 rounded-full flex items-center justify-center border border-white/20">
                  <Sparkles size={16} className="text-uii-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Simpul AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-uii-blue-200">Online & Siap</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors">
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-uii-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                    }`}
                  >
                    {/* Render newlines properly */}
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-uii-blue-600" />
                    <span className="text-xs text-slate-400">Sedang berpikir...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanya tentang event atau inkubasi..."
                  className="pr-12 py-3 rounded-xl border-slate-200 focus:ring-uii-blue-500 bg-slate-50"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 h-8 w-8 p-0 rounded-lg bg-uii-blue-600 hover:bg-uii-blue-700"
                >
                  <Send size={14} />
                </Button>
              </form>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                AI dapat membuat kesalahan. Cek kembali informasi penting.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-uii-blue-600 to-uii-blue-500 shadow-xl shadow-uii-blue-600/30 flex items-center justify-center text-white border-2 border-white/20 relative z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <MessageCircle size={28} className="fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Dot (jika belum dibuka) */}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}