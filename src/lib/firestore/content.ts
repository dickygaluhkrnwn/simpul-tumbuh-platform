import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// --- TIPE DATA SECTION (DINAMIS) ---

export type SectionType = "hero" | "stats" | "features" | "faq" | "cta";

export interface BaseSection {
  id: string;
  type: SectionType;
  isVisible: boolean;
}

export interface HeroSection extends BaseSection {
  type: "hero";
  data: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export interface StatsSection extends BaseSection {
  type: "stats";
  data: {
    label: string;
    items: Array<{ label: string; value: string; icon: string }>;
  };
}

export interface FeaturesSection extends BaseSection {
  type: "features";
  data: {
    title: string;
    description: string;
  };
}

export type Section = HeroSection | StatsSection | FeaturesSection;

export interface HomepageContent {
  sections: Section[];
}

// --- DATA DEFAULT (Initial State) ---
export const defaultHomepageContent: HomepageContent = {
  sections: [
    {
      id: "hero-1",
      type: "hero",
      isVisible: true,
      data: {
        badge: "Didukung oleh Erasmus+ GITA",
        title: "Simpul Tumbuh Ekosistem Inovasi UII",
        subtitle: "Direktorat Pembinaan & Pengembangan Kewirausahaan. Merancang ruang tumbuh bersama yang menghubungkan talenta, ide bisnis, dan industri.",
        ctaPrimary: "Jelajahi Program",
        ctaSecondary: "Lihat Berita",
      },
    },
    {
      id: "stats-1",
      type: "stats",
      isVisible: true,
      data: {
        label: "Kolaborasi Global & Jaringan Industri",
        items: [
          { label: "Erasmus+", value: "Partner Global", icon: "Globe" },
          { label: "Kemenkop", value: "Dukungan", icon: "Building2" },
          { label: "AIBI", value: "Jaringan", icon: "Users" },
          { label: "Startup", value: "Ekosistem", icon: "Zap" },
        ],
      },
    },
    {
      id: "features-1",
      type: "features",
      isVisible: true,
      data: {
        title: "Unit Fungsional",
        description: "Empat pilar utama yang menopang ekosistem inovasi di Universitas Islam Indonesia.",
      },
    },
  ],
};

// 1. Ambil Data Homepage
export const getHomepageContent = async (): Promise<HomepageContent> => {
  try {
    const docRef = doc(db, "content", "homepage_v2"); // Gunakan v2 agar tidak konflik dengan struktur lama
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HomepageContent;
    } else {
      // Jika belum ada, simpan default dulu
      await setDoc(docRef, defaultHomepageContent);
      return defaultHomepageContent;
    }
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return defaultHomepageContent;
  }
};

// 2. Update Data Homepage
export const updateHomepageContent = async (data: HomepageContent) => {
  try {
    await setDoc(doc(db, "content", "homepage_v2"), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};