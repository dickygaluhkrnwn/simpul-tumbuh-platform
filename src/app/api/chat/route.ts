import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, getDocs, query, where, limit } from "firebase/firestore";

// Fungsi untuk mengambil Data Konteks (RAG Sederhana)
async function getSystemContext() {
  let contextText = "Kamu adalah 'Simpul AI', asisten virtual cerdas untuk Simpul Tumbuh Universitas Islam Indonesia (UII). Karaktermu: Ramah, Profesional, Inovatif, dan selalu membantu. Gunakan Bahasa Indonesia yang natural.\n\n";

  try {
    // 1. Ambil Event Aktif (Open)
    const eventsRef = collection(db, "events");
    const qEvents = query(eventsRef, where("status", "==", "open"), limit(5));
    const eventsSnap = await getDocs(qEvents);
    
    if (!eventsSnap.empty) {
      contextText += "Daftar Event yang Sedang Dibuka Pendaftarannya:\n";
      eventsSnap.forEach(doc => {
        const d = doc.data();
        let dateStr = "Segera";
        if (d.date && typeof d.date.toDate === 'function') {
            dateStr = d.date.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
        } else if (d.date) {
            dateStr = new Date(d.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
        }

        contextText += `- ${d.title} (Kategori: ${d.category}): Tanggal ${dateStr}, Lokasi di ${d.location}. Kuota sisa: ${d.quota - d.registered}.\n`;
      });
    } else {
      contextText += "Saat ini belum ada event yang dibuka pendaftarannya.\n";
    }

    contextText += "\n";

    // 2. Ambil Data Tenant/Startup (Contoh 5 terbaru)
    const tenantsRef = collection(db, "tenants");
    const qTenants = query(tenantsRef, limit(5)); 
    const tenantsSnap = await getDocs(qTenants);

    if (!tenantsSnap.empty) {
      contextText += "Contoh Startup/Tenant Binaan Kami:\n";
      tenantsSnap.forEach(doc => {
        const d = doc.data();
        contextText += `- ${d.name} (${d.category}): ${d.description}\n`;
      });
    }

    // 3. Info Umum (Hardcoded Knowledge)
    contextText += "\nInfo Umum:\n";
    contextText += "- Lokasi Kantor: Gedung Growth Hub (Bookstore UII) Lt.3, Kampus Terpadu UII, Jalan Kaliurang km. 14,5.\n";
    contextText += "- Email: simpultumbuh@uii.ac.id\n";
    contextText += "- Program Utama: IBISMA (Inkubasi), PEIAB (Akselerasi), LSP (Sertifikasi), SPMKB (Kebencanaan).\n";
    
  } catch (error) {
    console.error("Error fetching context:", error);
  }

  return contextText;
}

// Fungsi Helper untuk Request ke Gemini dengan Retry Model
async function fetchGemini(apiKey: string, body: any, model = "gemini-1.5-flash") {
  console.log(`[Simpul AI] Trying model: ${model}...`);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );
  return response;
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Maaf, API Key belum dikonfigurasi di server." }, { status: 500 });
    }

    const systemInstructionText = await getSystemContext();

    const requestBody = {
      contents: [
        ...(history || []).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemInstructionText }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };

    // --- STRATEGI FALLBACK MODEL ---
    // 1. Coba gemini-1.5-flash (Paling baru/standar)
    let response = await fetchGemini(apiKey, requestBody, "gemini-1.5-flash");

    // 2. Jika 404 (Model not found), coba gemini-1.5-flash-latest
    if (!response.ok && response.status === 404) {
       console.warn("[Simpul AI] 1.5-flash failed (404), retrying with gemini-1.5-flash-latest...");
       response = await fetchGemini(apiKey, requestBody, "gemini-1.5-flash-latest");
    }

    // 3. Jika masih 404, coba gemini-pro (Paling aman/legacy)
    if (!response.ok && response.status === 404) {
       console.warn("[Simpul AI] 1.5-flash-latest failed (404), retrying with gemini-pro...");
       // gemini-pro kadang tidak support systemInstruction di v1beta via REST tertentu,
       // jadi kita gabung ke prompt user jika perlu, tapi coba standar dulu.
       response = await fetchGemini(apiKey, requestBody, "gemini-pro");
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Final Error:", data);
      throw new Error(data.error?.message || "Gagal menghubungi Gemini API (Semua Model)");
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Format respons Gemini tidak dikenali.");
    }

    return NextResponse.json({ reply: resultText });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ reply: "Maaf, sistem AI sedang sibuk. Coba lagi nanti." });
  }
}