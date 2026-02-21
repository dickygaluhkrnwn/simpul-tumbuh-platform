import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  addDoc, 
  updateDoc,
  deleteDoc,
  query, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tenant } from "@/types";

const TENANTS_COLLECTION = "tenants";

// 1. Get All Tenants
export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const q = query(
      collection(db, TENANTS_COLLECTION), 
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Tenant));
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};

// 2. Get Single Tenant
export const getTenantById = async (id: string): Promise<Tenant | null> => {
  try {
    const docRef = doc(db, TENANTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Tenant;
    return null;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
};

// 3. Create Tenant
export const createTenant = async (data: Partial<Tenant>) => {
  try {
    await addDoc(collection(db, TENANTS_COLLECTION), {
      ...data,
      slug: createSlug(data.name || ""),
      createdAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating tenant:", error);
    throw error;
  }
};

// 4. Update Tenant
export const updateTenant = async (id: string, data: Partial<Tenant>) => {
  try {
    await updateDoc(doc(db, TENANTS_COLLECTION, id), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating tenant:", error);
    throw error;
  }
};

// 5. Delete Tenant
export const deleteTenant = async (id: string) => {
  try {
    await deleteDoc(doc(db, TENANTS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting tenant:", error);
    throw error;
  }
};

// Helper Slug
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};