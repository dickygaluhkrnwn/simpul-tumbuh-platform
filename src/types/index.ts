import { Timestamp } from "firebase/firestore";

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Timestamp | Date;
  location: string;
  image: string;
  quota: number;
  registered: number;
  category: "Workshop" | "Seminar" | "Bootcamp" | "Competition";
  status: "open" | "closed" | "ongoing";
  price: number;
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Berita" | "Artikel" | "Pengumuman" | "Prestasi";
  author: string;
  publishedAt: Timestamp | Date;
  image: string;
  isPublished: boolean;
}

// --- TAMBAHAN BARU: DATA TENANT / STARTUP ---
export interface Tenant {
  id?: string;
  name: string;
  slug: string; // url-friendly-name
  logo: string;
  description: string;
  category: "Teknologi" | "F&B" | "Jasa" | "Kreatif" | "Agro" | "Lainnya";
  founder: string;
  batch: string; // Contoh: "Batch 5 - 2024"
  status: "Pra-Inkubasi" | "Inkubasi" | "Lulus (Alumni)";
  website?: string;
  instagram?: string;
  createdAt: Timestamp | Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName?: string;
  nim?: string;
  phone?: string;
  role: "user" | "admin";
}