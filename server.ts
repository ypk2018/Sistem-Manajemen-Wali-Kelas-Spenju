import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini AI on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.post("/api/ai/generate-report", async (req, res) => {
  try {
    const { studentName, nisn, attendanceSummary, gradesSummary, p5Summary } = req.body;

    const prompt = `
Bertindaklah sebagai Wali Kelas 8.1 di SMP Negeri 7 Sentani di bawah Kepala Sekolah Maikel Paul Wally, S.Pd., M.Pd.
Buatkan narasi Rapor Bulanan Kurikulum Merdeka yang sangat profesional, memotivasi, dan mendalam untuk siswa berikut:
Nama Siswa: ${studentName} (NISN: ${nisn})
Ringkasan Kehadiran: Hadir ${attendanceSummary?.hadir || 30}, Sakit ${attendanceSummary?.sakit || 0}, Izin ${attendanceSummary?.izin || 0}, Alpha ${attendanceSummary?.alpha || 0}
Ringkasan Nilai Akademik: ${JSON.stringify(gradesSummary || {})}
Catatan P5 (Projek Penguatan Profil Pelajar Pancasila): ${JSON.stringify(p5Summary || {})}

Berikan dalam bahasa Indonesia yang baku, formal, dan khas rapor sekolah menengah pertama (SMP) di Papua yang menekankan karakter, kedisiplinan, pencapaian kompetensi Kurikulum Merdeka, serta pesan penyemangat untuk siswa dan orang tua.
Format output dalam format JSON dengan struktur:
{
  "catatanWaliKelas": "...",
  "rekomendasiPengembangan": "...",
  "predikatSikap": "Sangat Baik / Baik",
  "kesimpulan": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Anda adalah sistem asisten Kurikulum Merdeka SMP Negeri 7 Sentani yang cerdas dan profesional.",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ success: false, error: error.message || "Gagal menghasilkan rapor AI" });
  }
});

app.post("/api/ai/teacher-journal-advice", async (req, res) => {
  try {
    const { journalEntries, classStats } = req.body;
    const prompt = `
Sebagai penasihat kurikulum SMP Negeri 7 Sentani, berikan analisis ringkas dan 3 rekomendasi strategis untuk Wali Kelas dalam menghadapi dinamika kelas 8.1 berdasarkan jurnal harian berikut:
${JSON.stringify(journalEntries)}
Statistik kelas: ${JSON.stringify(classStats)}
Berikan saran yang konstruktif dan solutif dalam bahasa Indonesia yang profesional.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ success: true, advice: response.text });
  } catch (error: any) {
    console.error("AI Journal Advice Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
