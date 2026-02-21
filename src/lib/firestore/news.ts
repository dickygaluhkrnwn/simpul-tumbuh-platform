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
  where,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/types";

const NEWS_COLLECTION = "news";

// 1. Get All News (Admin List)
export const getNews = async (): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION), 
      orderBy("publishedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Article));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// 2. Get Single Article
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Article;
    return null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

// 3. Create Article
export const createArticle = async (data: Partial<Article>) => {
  try {
    await addDoc(collection(db, NEWS_COLLECTION), {
      ...data,
      slug: createSlug(data.title || ""), // Auto-generate slug
      publishedAt: data.publishedAt || Timestamp.now(),
      createdAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// 4. Update Article
export const updateArticle = async (id: string, data: Partial<Article>) => {
  try {
    await updateDoc(doc(db, NEWS_COLLECTION, id), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// 5. Delete Article
export const deleteArticle = async (id: string) => {
  try {
    await deleteDoc(doc(db, NEWS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

// Helper: Buat Slug URL Friendly
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};