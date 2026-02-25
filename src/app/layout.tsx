import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GeminiChat from "@/components/features/GeminiChat"; // Import Chat Widget

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontUII = localFont({
  src: "./fonts/UII-Font.ttf",
  variable: "--font-uii",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Simpul Tumbuh UII - Ecosystem of Innovation",
  description: "Platform ekosistem inovasi terpadu Universitas Islam Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tambahkan scroll-smooth agar navigasi anchor link (seperti href="#apply") mulus
    <html lang="id" className="scroll-smooth">
      <body 
        className={`${fontSans.variable} ${fontUII.variable} antialiased font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300`}
      >
        <AuthProvider>
          {children}
          <GeminiChat /> {/* Pasang widget di sini agar global */}
        </AuthProvider>
      </body>
    </html>
  );
}