import React, { useState } from 'react';
import { AlertTriangle, Plus, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Student, StudentWarning } from '../../types';

interface ActionGuidanceProps {
  students: Student[];
  warnings: StudentWarning[];
  onAddWarning: (warning: Omit<StudentWarning, 'id'>) => void;
  activeSubTab: string;
}

export function ActionGuidanceView({
  students,
  warnings,
  onAddWarning,
  activeSubTab,
}: ActionGuidanceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: students[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    type: 'Pemberitahuan & Pembinaan' as const,
    violation: '',
    sanction: '',
    notifiedParent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWarning(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <span>Mengambil Tindakan Bila Dianggap Perlu (Pembinaan & Peringatan)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pemberitahuan, pembinaan, peringatan lisan, hingga peringatan khusus berkoordinasi dengan BK & Kepala Sekolah (Maikel Paul Wally, S.Pd., M.Pd).
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-700 hover:bg-rose-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Catatan Tindakan / Peringatan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warnings.map((w) => {
          const st = students.find((s) => s.id === w.studentId);
          return (
            <div key={w.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full">
                  {w.type}
                </span>
                <span className="text-xs text-slate-400">{w.date}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{st?.name || 'Siswa'}</h3>
                <p className="text-xs text-slate-600 mt-1"><strong>Pelanggaran / Masalah:</strong> {w.violation}</p>
                <p className="text-xs text-emerald-700 mt-1"><strong>Tindakan Pembinaan:</strong> {w.sanction}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>Notifikasi Orang Tua:</span>
                <span className="font-semibold text-emerald-700">Sudah Dihubungi</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Warning */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Catat Tindakan & Pembinaan Siswa</h3>

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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Tindakan</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Pemberitahuan & Pembinaan">Pemberitahuan & Pembinaan</option>
                  <option value="Peringatan Lisan">Peringatan Lisan</option>
                  <option value="Peringatan Khusus (BK / Kepala Sekolah)">Peringatan Khusus (BK / Kepala Sekolah)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Uraian Masalah / Pelanggaran</label>
                <input
                  type="text"
                  required
                  value={formData.violation}
                  onChange={(e) => setFormData({ ...formData, violation: e.target.value })}
                  placeholder="Contoh: Keterlambatan berulang..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bentuk Sanksi / Solusi Pembinaan</label>
                <textarea
                  rows={2}
                  required
                  value={formData.sanction}
                  onChange={(e) => setFormData({ ...formData, sanction: e.target.value })}
                  placeholder="Pembinaan dan arahan wali kelas..."
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
                  className="px-4 py-2 bg-rose-700 text-white rounded-xl font-medium shadow-sm"
                >
                  Simpan Tindakan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
