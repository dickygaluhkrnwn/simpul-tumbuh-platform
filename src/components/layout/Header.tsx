"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, Zap, Sun, Moon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- STRUKTUR NAVIGASI ASLI SIMPUL TUMBUH ---
const navLinks = [
  { name: "BERANDA", href: "/" },
  {
    name: "DPPK/ST",
    href: "/dppk-st", 
    subItems: [
      { name: "Profil Direktorat", href: "/dppk-st" }, 
      { name: "Pimpinan & Manajemen", href: "/dppk-st/pimpinan" },
      { name: "Divisi Pendidikan Lanjut", href: "#" },
      { name: "Divisi Pengembangan Kewirausahaan", href: "/dppk-st/pengembangan-kewirausahaan" },
    ],
  },
  {
    name: "UNIT FUNGSIONAL",
    href: "#", // Tetap ada href placeholder agar konsisten
    subItems: [
      { name: "Inkubator Bisnis - IBISMA UII", href: "/unit-fungsional/ibisma" },
      { name: "Akselerator Bisnis - PEIAB Angel", href: "/unit-fungsional/peiab-angel" },
      { name: "Sertifikasi Profesi - LSP UII", href: "/unit-fungsional/lsp" },
      { name: "Pusat Studi - SPMKB UII", href: "/unit-fungsional/spmkb" },
      { name: "Pemeriksa Halal - LPH UII", href: "/unit-fungsional/lph" },
      { name: "Pendamping Halal - LP3H UII", href: "/unit-fungsional/lp3h" },
    ],
  },
  {
    name: "KOLABORASI",
    href: "/kolaborasi",
    subItems: [
      { name: "Erasmus+ GITA", href: "/kolaborasi/erasmus-gita" },
      { name: "Erasmus+ ANGEL", href: "/kolaborasi/erasmus-angel" },
      { name: "Erasmus+ BUILD", href: "/kolaborasi/erasmus-build" },
      { name: "Eramus+ ENTEEF", href: "/kolaborasi/erasmus-enteef" },
    ],
  },
  { name: "DAKWAH", href: "/dakwah" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // State untuk melacak dropdown mana yang sedang terbuka di Mobile
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === name ? null : name);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container-tech">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className={cn(
                "font-uii font-bold text-xl leading-none tracking-tight transition-colors duration-300",
                isScrolled ? "text-slate-900 dark:text-white" : "text-white"
              )}>
                Simpul Tumbuh
              </span>
              <span className={cn(
                "text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors duration-300",
                isScrolled ? "text-primary-600 dark:text-primary-400" : "text-primary-300"
              )}>
                UII Innovation Lab
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl backdrop-blur-sm border transition-colors duration-300",
            isScrolled 
              ? "bg-slate-100/50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700" 
              : "bg-white/5 border-white/10"
          )}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subItems ? (
                  // Menu dengan Dropdown & bisa diklik (Link)
                  <Link 
                    href={link.href || "#"} 
                    className="flex items-center gap-1 cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-300 group-hover:text-white group-hover:bg-white/10 data-[scrolled=true]:text-slate-600 data-[scrolled=true]:group-hover:text-primary-600 data-[scrolled=true]:group-hover:bg-white dark:data-[scrolled=true]:text-slate-300 dark:data-[scrolled=true]:group-hover:text-white dark:data-[scrolled=true]:group-hover:bg-slate-700/50" data-scrolled={isScrolled}
                  >
                    {link.name}
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                ) : (
                  // Menu Biasa
                  <Link
                    href={link.href}
                    className="block px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-300 hover:text-white hover:bg-white/10 data-[scrolled=true]:text-slate-600 data-[scrolled=true]:hover:text-primary-600 data-[scrolled=true]:hover:bg-white dark:data-[scrolled=true]:text-slate-300 dark:data-[scrolled=true]:hover:text-white dark:data-[scrolled=true]:hover:bg-slate-700/50" data-scrolled={isScrolled}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Content (Desktop) */}
                {link.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-6 before:w-4 before:h-4 before:bg-white dark:before:bg-slate-900 before:border-l before:border-t before:border-slate-200 dark:before:border-slate-800 before:rotate-45">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="relative z-10 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-300 backdrop-blur-sm border",
                isScrolled
                  ? "bg-slate-100/50 hover:bg-slate-200/50 border-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
              )}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link href="/auth/login">
              <Button variant="primary" size="sm" className="hidden md:flex shadow-primary-500/30">
                Masuk Area
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/80 hover:text-white"
              )}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              className={cn(
                "p-2 transition-colors",
                isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/80 hover:text-white"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Accordion Style) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              {link.subItems ? (
                // Accordion Header (Teks jadi tautan, Tombol panah jadi pembuka Accordion)
                <div className="flex items-center justify-between rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Link
                    href={link.href || "#"}
                    className="text-slate-700 dark:text-slate-200 font-bold py-3 px-4 flex-grow"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  <button 
                    onClick={() => toggleMobileDropdown(link.name)}
                    className="p-3 mr-1"
                    aria-label={`Toggle ${link.name} submenu`}
                  >
                    <ChevronDown size={18} className={cn("transition-transform duration-300 text-slate-500 dark:text-slate-400", mobileDropdownOpen === link.name ? "rotate-180 text-primary-500 dark:text-primary-400" : "")} />
                  </button>
                </div>
              ) : (
                // Regular Link
                <Link
                  href={link.href}
                  className="text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}

              {/* Accordion Content */}
              {link.subItems && mobileDropdownOpen === link.name && (
                <div className="flex flex-col gap-1 pl-4 pr-2 py-2 mt-1 border-l-2 border-primary-100 dark:border-primary-900/50 ml-4 animate-in slide-in-from-top-1 fade-in">
                  {link.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Masuk Area</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}