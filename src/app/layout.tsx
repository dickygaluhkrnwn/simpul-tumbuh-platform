import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GeminiChat from "@/components/features/GeminiChat";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontUII = localFont({
  src: "./fonts/UII-Font.TTF", // <-- Ekstensi diubah menjadi huruf besar (.TTF) menyesuaikan Vercel/GitHub
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
    <html lang="id" className="scroll-smooth">
      {/* Hapus hardcoded bg/text slate dan dark mode agar di-handle sepenuhnya oleh globals.css */}
      <body className={`${fontSans.variable} ${fontUII.variable} antialiased font-sans transition-colors duration-400`}>
        <AuthProvider>
          {children}
          <GeminiChat />
        </AuthProvider>
      </body>
    </html>
  );
}