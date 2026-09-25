import React, { useState } from 'react';
import { FileText, Plus, Sparkles, Calendar, User, CheckCircle2 } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalManagerProps {
  journal: JournalEntry[];
  onAddJournal: (entry: Omit<JournalEntry, 'id'>) => void;
}

export function JournalManager({ journal, onAddJournal }: JournalManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Kegiatan Kelas' as const,
    title: '',
    description: '',
    reportedBy: 'Dra. Martha Ohee, M.Pd (Wali Kelas)',
  });

  const categories = ['Akademik', 'Kedisiplinan', 'Bimbingan', 'Kegiatan Kelas', 'Orang Tua'] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onAddJournal(formData);
    setIsModalOpen(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'Kegiatan Kelas',
      title: '',
      description: '',
      reportedBy: 'Dra. Martha Ohee, M.Pd (Wali Kelas)',
    });
  };

  const handleFetchAiAdvice = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/teacher-journal-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          journalEntries: journal,
          classStats: { totalStudents: 16, school: 'SMP Negeri 7 Sentani', principal: 'Maikel Paul Wally, S.Pd., M.Pd' },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiAdvice(data.advice);
      } else {
        alert('Gagal mengambil analisis AI: ' + data.error);
      }
    } catch (e: any) {
      alert('Terjadi kesalahan koneksi AI.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-800 mb-1">
            <FileText className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Jurnal Harian Wali Kelas & AI Advisor</h2>
          </div>
          <p className="text-xs text-slate-500">
            SMP Negeri 7 Sentani - Catatan Kegiatan, Bimbingan, dan Analisis Profesional
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleFetchAiAdvice}
            disabled={loadingAi}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loadingAi ? 'Menganalisis...' : 'Analisis AI Kelas'}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Catatan</span>
          </button>
        </div>
      </div>

      {/* AI Advice Box */}
      {aiAdvice && (
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-2xl shadow-lg border border-emerald-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <Sparkles className="w-5 h-5" />
              <span>Rekomendasi AI Advisor untuk Wali Kelas</span>
            </div>
            <button
              onClick={() => setAiAdvice(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
          <div className="text-xs text-emerald-100 whitespace-pre-wrap leading-relaxed bg-emerald-950/60 p-4 rounded-xl border border-emerald-900">
            {aiAdvice}
          </div>
        </div>
      )}

      {/* Journal List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journal.map((j) => (
          <div
            key={j.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-full">
                  {j.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{j.date}</span>
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">{j.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{j.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{j.reportedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Journal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tambah Jurnal Harian Wali Kelas</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul / Topik</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Pembinaan Kedisiplinan Siswa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Kegiatan / Kejadian</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Rincian kegiatan atau catatan bimbingan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-700 text-white rounded-xl font-medium shadow-sm"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
