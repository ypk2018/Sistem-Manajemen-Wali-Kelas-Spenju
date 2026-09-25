import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { Student, Subject, GradeRecord } from '../../types';

interface AcademicFollowupProps {
  students: Student[];
  subjects: Subject[];
  grades: GradeRecord[];
  onOpenAiReport: (student: Student) => void;
  activeSubTab: string;
}

export function AcademicFollowupView({
  students,
  subjects,
  grades,
  onOpenAiReport,
  activeSubTab,
}: AcademicFollowupProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const currentStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-700" />
            <span>Langkah Tindak Lanjut: Ulangan, Legger, & Kenaikan Kelas</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Memerhatikan hasil ulangan formatif-sumatif, rekapitulasi legger, dan keberhasilan kenaikan kelas peserta didik kelas 8.1.
          </p>
        </div>
      </div>

      {activeSubTab === 'followup-grades' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Evaluasi Nilai Ulangan & Capaian TP</h3>
          <p className="text-xs text-slate-600">
            Berikut adalah rekap pencapaian nilai ulangan harian dan sumatif seluruh siswa dalam Kurikulum Merdeka. Anda dapat mengelola nilai secara detail pada menu Akademik di bilah navigasi utama.
          </p>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-900 block">Rata-rata Kelas 8.1</span>
              <span className="text-2xl font-extrabold text-indigo-700">84.5 (Predikat B+)</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-indigo-800 block">Ketuntasan Belajar</span>
              <span className="text-2xl font-extrabold text-emerald-700">93.7% Tuntas</span>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'followup-legger' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Daftar Kumpulan Nilai (Legger Kelas 8.1)</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
              Resmi Kurikulum Merdeka
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border border-slate-300">
                  <th className="py-2.5 px-3 border border-slate-300 font-bold">No</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold">Nama Peserta Didik</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">PAI</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">PPKn</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">B.Ind</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">MTK</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">IPA</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">IPS</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">B.Ing</th>
                  <th className="py-2.5 px-3 border border-slate-300 font-bold text-center">Rata-Rata</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st, idx) => {
                  return (
                    <tr key={st.id} className="border border-slate-300 hover:bg-slate-50">
                      <td className="py-2 px-3 border border-slate-300 text-center">{idx + 1}</td>
                      <td className="py-2 px-3 border border-slate-300 font-semibold">{st.name}</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">85</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">88</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">82</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">80</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">86</td>
                      <td className="py-2 px-3 border border-slate-300 text-center">84</td>
                      <td className="py-2 px-3 border border-slate-300 font-bold text-center">85</td>
                      <td className="py-2 px-3 border border-slate-300 font-extrabold text-emerald-800 text-center">84.2</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'followup-promotion' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Analisis Keberhasilan & Kenaikan Kelas</h3>
          <p className="text-xs text-slate-600">
            Berdasarkan kriteria kenaikan kelas Kurikulum Merdeka SMP Negeri 7 Sentani, seluruh 16 peserta didik menunjukkan progress positif dan siap melanjutkan ke tingkat berikutnya.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs text-emerald-800 font-semibold block">Prediksi Naik Kelas</span>
              <span className="text-2xl font-extrabold text-emerald-900">100% (16 Siswa)</span>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
              <span className="text-xs text-teal-800 font-semibold block">Status Pembinaan Karakter</span>
              <span className="text-2xl font-extrabold text-teal-900">Tuntas & Terarah</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
