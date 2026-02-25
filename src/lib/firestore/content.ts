import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// --- TIPE DATA SECTION (DINAMIS) ---

// Menambahkan "about" untuk menampung teks panjang profil & GITA
export type SectionType = "hero" | "about" | "stats" | "features" | "faq" | "cta";

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

// SECTION BARU: Untuk Profil dan GITA Partners
export interface AboutSection extends BaseSection {
  type: "about";
  data: {
    title: string;
    description: string;
    disclaimer: string;
    gitaTitle: string;
    gitaDescription: string[];
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

export type Section = HeroSection | AboutSection | StatsSection | FeaturesSection;

export interface HomepageContent {
  sections: Section[];
}

// --- DATA DEFAULT (Sesuai Web Asli Simpul Tumbuh) ---
export const defaultHomepageContent: HomepageContent = {
  sections: [
    {
      id: "hero-1",
      type: "hero",
      isVisible: true,
      data: {
        badge: "Direktorat Pembinaan & Pengembangan Kewirausahaan",
        title: "Simpul Tumbuh\nUniversitas Islam Indonesia",
        subtitle: "Merancang ruang tumbuh bersama (co-growing space) yang menghubungkan talenta dan ide bisnis untuk berkembang bersama.",
        ctaPrimary: "Kenali Lebih Dekat",
        ctaSecondary: "Kabar Terbaru",
      },
    },
    {
      id: "about-1",
      type: "about",
      isVisible: true,
      data: {
        title: "Direktorat Pembinaan & Pengembangan Kewirausahaan",
        description: "Direktorat Pengembangan dan Pembinaan Kewirausahaan/Simpul Tumbuh merancang ruang tumbuh bersama (co-growing space) yang dapat menghubungkan talenta dan ide bisnis untuk dapat berkembang bersama. Simpul Tumbuh UII juga mengembangkan pembelajaran dan praktik kewirausahaan bagi mahasiswa melalui IBISMA (Inkubator Bisnis & Inovasi Bersama). Selain itu, Simpul Tumbuh UII berperan sebagai penghubung antara sumber daya manusia, sarana prasarana, serta produk intelektual lainnya yang dimiliki UII dan sumber daya IPTEKS yang dimiliki oleh kalangan Industri (swasta, pemerintah, komunitas, dan alumni).",
        disclaimer: "Disclaimer: \"This Growth Hub has been funded with support from the European Commission. This website reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein\"",
        gitaTitle: "Erasmus+ GITA Partners",
        gitaDescription: [
          "Growing Indonesia – a Triangular Approach (GITA) integrates business – university collaboration, graduate entrepreneurship and enterprise creation.",
          "With a population of over 260 million, Indonesia is Southeast Asia's largest economy and the world's fourth most populous nation. Current support for start-ups is fragmented and there is a need for a more coordinated approach by educational institutions, government bodies and industry in building Indonesia's entrepreneurial capacity and in reducing reliance on foreign labour as well as outward economic migration.",
          "Simpul Tumbuh is one of the first of a growing network of Growth Hubs across Indonesia aimed at embedding entrepreneurship education into University curricula and providing support services to local entrepreneurs and start-up businesses. These hubs are physical spaces with an incubation facility for cultivating innovation and exploiting new ideas applied to the local and regional economies.",
          "The creation of Growth Hubs is the central and outward facing component of the innovative Growing Indonesia Triangular Approach (GITA) that integrates business-university collaboration, graduate entrepreneurship and enterprise creation in a strategic way to embed entrepreneurial thinking and activity across all organisational levels.",
          "The network of the first Growth Hubs across Indonesia that have adopted the principles and methodologies of the Triangular Approach has been created with the assistance of the European Union Capacity Building in Higher Education Programme which offers a unique opportunity to strengthen higher education ties between Europe and Indonesia."
        ]
      }
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
        title: "Lembaga Fungsional",
        description: "Mengenal lebih dekat unit-unit fungsional di bawah naungan Direktorat Simpul Tumbuh UII.",
      },
    },
  ],
};

// 1. Ambil Data Homepage
export const getHomepageContent = async (): Promise<HomepageContent> => {
  try {
    // Diubah ke v3 agar mengambil struktur data yang baru ditambahkan (AboutSection)
    const docRef = doc(db, "content", "homepage_v3"); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HomepageContent;
    } else {
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
    await setDoc(doc(db, "content", "homepage_v3"), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};