import React from 'react';
import { Printer, X, School } from 'lucide-react';
import { Student, AttendanceRecord, GradeRecord } from '../types';

interface PrintReportModalProps {
  onClose: () => void;
  students: Student[];
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
}

export function PrintReportModal({ onClose, students, attendance, grades }: PrintReportModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <h3 className="text-lg font-bold text-slate-900">Pratinjau Cetak Rekap Resmi Kelas 8.1</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl text-xs flex items-center space-x-1"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Letterhead Document */}
        <div className="bg-white p-8 text-slate-900 space-y-6 border border-slate-200 shadow-sm print:border-none print:shadow-none">
          {/* School Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Pemerintah Kabupaten Jayapura
            </h2>
            <h1 className="text-xl font-extrabold uppercase tracking-wide text-emerald-900">
              SMP NEGERI 7 SENTANI
            </h1>
            <p className="text-xs text-slate-600">
              Jl. Raya Sentani - Depapre, Sentani, Kabupaten Jayapura, Papua 99352
            </p>
            <p className="text-xs text-slate-500 italic">
              NPSN: 60300124 | Email: smpn7sentani@belajar.id
            </p>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-bold text-base uppercase">REKAPITULASI KEMAJUAN BELAJAR SISWA KELAS 8.1</h3>
            <p className="text-xs text-slate-600">Tahun Ajaran 2025/2026 - Semester Genap</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border border-slate-300">
                  <th className="py-2 px-3 border border-slate-300 font-bold">No</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold">NISN</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold">Nama Siswa</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold text-center">L/P</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold text-center">Hadir</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold text-center">Rata-rata Nilai</th>
                  <th className="py-2 px-3 border border-slate-300 font-bold text-center">Predikat</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st, idx) => {
                  const stGrades = grades.filter((g) => g.studentId === st.id);
                  const avg =
                    stGrades.length > 0
                      ? Math.round(
                          stGrades.reduce((acc, g) => acc + (g.formatif + g.sumatif) / 2, 0) /
                            stGrades.length
                        )
                      : 82;
                  const pred = avg >= 88 ? 'A' : avg >= 78 ? 'B' : avg >= 70 ? 'C' : 'D';

                  return (
                    <tr key={st.id} className="border border-slate-300">
                      <td className="py-2 px-3 border border-slate-300 text-center">{idx + 1}</td>
                      <td className="py-2 px-3 border border-slate-300">{st.nisn}</td>
                      <td className="py-2 px-3 border border-slate-300 font-semibold">{st.name}</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">{st.gender}</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">28</td>
                      <td className="py-2 px-3 border border-slate-300 text-center font-bold">{avg}</td>
                      <td className="py-2 px-3 border border-slate-300 text-center font-bold">{pred}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 text-xs">
            <div className="space-y-16">
              <p>Mengetahui,<br />Kepala SMP Negeri 7 Sentani</p>
              <div>
                <strong className="underline font-bold text-slate-900">Maikel Paul Wally, S.Pd., M.Pd</strong>
                <p className="text-slate-600">NIP. 197412151998031005</p>
              </div>
            </div>
            <div className="space-y-16 text-right">
              <p>Sentani, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Wali Kelas 8.1</p>
              <div>
                <strong className="underline font-bold text-slate-900">Dra. Martha Ohee, M.Pd</strong>
                <p className="text-slate-600">NIP. 198205102008012012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
