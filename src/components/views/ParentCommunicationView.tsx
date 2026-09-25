import React, { useState } from 'react';
import { FileText, Phone, Printer, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import { Student, ParentCommunication } from '../../types';

interface ParentCommunicationProps {
  students: Student[];
  comms: ParentCommunication[];
  onAddComm: (comm: Omit<ParentCommunication, 'id'>) => void;
  onOpenAiReport: (student: Student) => void;
  onOpenPrintReport: () => void;
  activeSubTab: string;
}

export function ParentCommunicationView({
  students,
  comms,
  onAddComm,
  onOpenAiReport,
  onOpenPrintReport,
  activeSubTab,
}: ParentCommunicationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: students[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    method: 'Telepon / WhatsApp' as const,
    topic: '',
    result: '',
    pic: 'Dra. Martha Ohee, M.Pd',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComm(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-teal-700" />
            <span>Hubungan Orang Tua, Buku Laporan Pendidikan, & Rapor</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Menjalin komunikasi dengan orang tua/wali, mengisi legger nilai, buku laporan pendidikan (rapor), dan pembagian rapor semester.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenPrintReport}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rapor & Rekap</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'report-parents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Catatan Komunikasi dengan Orang Tua / Wali Siswa</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Catatan Komunikasi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comms.map((c) => {
              const st = students.find((s) => s.id === c.studentId);
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">
                      {c.method}
                    </span>
                    <span className="text-xs text-slate-400">{c.date}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{st?.name || 'Siswa'}</h4>
                    <p className="text-xs text-slate-600 mt-1"><strong>Topik:</strong> {c.topic}</p>
                    <p className="text-xs text-emerald-700 mt-1"><strong>Hasil:</strong> {c.result}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    Petugas: {c.pic}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'report-card' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base">Buku Laporan Pendidikan (Rapor) Kurikulum Merdeka</h3>
          <p className="text-xs text-slate-600">
            Pilih siswa di bawah ini untuk menghasilkan narasi rapor AI otomatis atau mencetak buku laporan pendidikan resmi SMP Negeri 7 Sentani.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {students.map((st) => (
              <div key={st.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{st.name}</h4>
                  <p className="text-xs text-slate-500">NISN: {st.nisn}</p>
                </div>
                <button
                  onClick={() => onOpenAiReport(st)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-1 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rapor AI</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'report-print' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-center py-12">
          <Printer className="w-12 h-12 text-emerald-700 mx-auto" />
          <h3 className="font-bold text-slate-900 text-lg">Cetak Dokumen Resmi & Rapor</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Gunakan tombol di bawah untuk membuka pratinjau cetak dokumen resmi berkop SMP Negeri 7 Sentani bertandatangan Kepala Sekolah Maikel Paul Wally, S.Pd., M.Pd.
          </p>
          <button
            onClick={onOpenPrintReport}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm inline-flex items-center space-x-2 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Buka Pratinjau Cetak Rapor & Rekap</span>
          </button>
        </div>
      )}

      {/* Modal Add Communication */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Catat Komunikasi Orang Tua / Wali</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Peserta Didik</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.nisn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Komunikasi</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Telepon / WhatsApp">Telepon / WhatsApp</option>
                  <option value="Panggilan ke Sekolah">Panggilan ke Sekolah</option>
                  <option value="Kunjungan Rumah">Kunjungan Rumah</option>
                  <option value="Penerimaan Rapor">Penerimaan Rapor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topik / Permasalahan</label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Contoh: Perkembangan nilai belajar..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hasil Kesepakatan / Tanggapan</label>
                <textarea
                  rows={2}
                  required
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  placeholder="Tanggapan orang tua..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
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
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
