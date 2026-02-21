import { 
  collection, 
  getDocs,
  getDoc,
  doc,
  addDoc, 
  query, 
  orderBy, 
  where,
  increment,
  runTransaction,
  deleteDoc, // Tambahan untuk Admin
  updateDoc, // Tambahan untuk Admin
  setDoc,    // Tambahan untuk Admin
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Event } from "@/types";

// Nama koleksi di Firestore
const EVENTS_COLLECTION = "events";
const REGISTRATIONS_COLLECTION = "registrations"; // Koleksi baru untuk menyimpan data pendaftar

// --- FUNGSI PUBLIK (USER) ---

export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(
      collection(db, EVENTS_COLLECTION), 
      orderBy("date", "asc")
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// 1. Ambil Single Event berdasarkan ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const docRef = doc(db, EVENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Event;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting event:", error);
    return null;
  }
};

// 2. Cek apakah user sudah terdaftar di event ini
export const checkRegistrationStatus = async (eventId: string, userId: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("eventId", "==", eventId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty; // True jika sudah ada data
  } catch (error) {
    console.error("Error checking registration:", error);
    return false;
  }
};

// 3. Fungsi Registrasi Event (Transactional)
export const registerEvent = async (eventId: string, userId: string, userEmail: string) => {
  try {
    await runTransaction(db, async (transaction) => {
      // a. Ambil data event terbaru untuk cek kuota real-time
      const eventRef = doc(db, EVENTS_COLLECTION, eventId);
      const eventDoc = await transaction.get(eventRef);

      if (!eventDoc.exists()) {
        throw "Event tidak ditemukan!";
      }

      const eventData = eventDoc.data() as Event;
      
      // b. Validasi Kuota
      if (eventData.registered >= eventData.quota) {
        throw "Kuota Penuh!";
      }

      // d. Buat data registrasi baru
      const newRegistrationRef = doc(collection(db, REGISTRATIONS_COLLECTION));
      transaction.set(newRegistrationRef, {
        eventId,
        userId,
        userEmail,
        registeredAt: Timestamp.now(),
        status: "confirmed"
      });

      // e. Update counter registered di event (+1)
      transaction.update(eventRef, {
        registered: increment(1)
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// 4. Ambil Daftar Event milik User (My Tickets)
export const getUserRegistrations = async (userId: string) => {
  try {
    // Ambil data registrasi user
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("registeredAt", "desc")
    );
    const regSnapshot = await getDocs(q);
    
    // Ambil detail event untuk setiap registrasi
    const promises = regSnapshot.docs.map(async (regDoc) => {
      const regData = regDoc.data();
      const eventData = await getEventById(regData.eventId);
      return {
        registrationId: regDoc.id,
        ...regData,
        event: eventData
      };
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    return [];
  }
};

// --- FUNGSI ADMIN CRUD (BARU) ---

// 5. Tambah Event Baru
export const createEvent = async (data: Partial<Event>) => {
  try {
    // Bersihkan data undefined
    const cleanData = JSON.parse(JSON.stringify(data));
    
    // Tambah dokumen baru
    await addDoc(collection(db, EVENTS_COLLECTION), {
      ...cleanData,
      registered: 0, // Default 0 pendaftar
      createdAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// 6. Update Event
export const updateEvent = async (id: string, data: Partial<Event>) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(eventRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// 7. Hapus Event
export const deleteEvent = async (id: string) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await deleteDoc(eventRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// --- HELPER SEEDING ---

export const seedEvents = async () => {
  const dummyEvents: Omit<Event, "id">[] = [
    {
      title: "Workshop UI/UX Design Modern",
      description: "Belajar prinsip dasar desain antarmuka modern menggunakan Figma dan implementasi ke kode.",
      date: Timestamp.fromDate(new Date("2025-10-15T09:00:00")),
      location: "Gedung Kuliah Umum (GKU) Prof. Sardjito",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      quota: 50,
      registered: 12,
      category: "Workshop",
      status: "open",
      price: 50000
    },
    // ... data dummy lainnya bisa ditambahkan ...
  ];

  for (const event of dummyEvents) {
    await addDoc(collection(db, EVENTS_COLLECTION), event);
  }
};