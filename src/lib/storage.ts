import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Fungsi Upload Gambar (Saat ini Mode Simulasi)
export const uploadImage = async (file: File, path: string): Promise<string> => {
  console.log(`[SIMULATION] Uploading ${file.name} to ${path}...`);

  // --- OPSI 1: MODE SIMULASI (AKTIF) ---
  // Kita pura-pura loading 1 detik, lalu return URL gambar placeholder
  // Ini menghemat kuota Firebase Storage saat development
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return placeholder image yang ukurannya mirip
      resolve(`https://placehold.co/800x400/20649b/ffffff?text=${encodeURIComponent(file.name)}`);
    }, 1500);
  });

  // --- OPSI 2: MODE REAL FIREBASE STORAGE (NANTI DIAKTIFKAN) ---
  /*
  try {
    // Buat referensi file di storage bucket
    // Contoh path: "events/poster-event-1.jpg"
    const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Ambil URL publik
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
  */
};