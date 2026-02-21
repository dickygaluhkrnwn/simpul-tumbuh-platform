"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Program", href: "/programs" },
    { name: "Event", href: "/events" },
    { name: "Tenant", href: "/startups" },
    { name: "Berita", href: "/news" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "py-3 glass-dark shadow-2xl shadow-uii-blue-900/20"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-uii-blue-500 to-uii-blue-700 rounded-xl shadow-lg shadow-uii-blue-500/30 group-hover:shadow-uii-blue-400/50 transition-all duration-300">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-uii font-bold text-xl leading-none text-white tracking-tight">
                Simpul Tumbuh
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-uii-blue-200 mt-1">
                UII Innovation Lab
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium px-4 py-2 rounded-full text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login">
              <Button 
                variant="primary" 
                size="sm" 
                className="bg-uii-yellow-500 hover:bg-uii-yellow-400 text-uii-blue-950 font-bold border-none shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]"
              >
                Masuk Area
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Glass Style) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-200 font-medium py-3 px-4 rounded-lg hover:bg-white/5 hover:text-uii-yellow-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full bg-uii-yellow-500 text-uii-blue-950 font-bold">Masuk Area</Button>
          </Link>
        </div>
      )}
    </header>
  );
}