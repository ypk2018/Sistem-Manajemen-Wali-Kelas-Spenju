import React, { useState } from 'react';
import { BookOpen, Sparkles, Search, Edit, Save, Award } from 'lucide-react';
import { Student, Subject, GradeRecord } from '../types';

interface GradeManagerProps {
  students: Student[];
  subjects: Subject[];
  grades: GradeRecord[];
  onUpdateGrade: (updatedGrade: GradeRecord) => void;
  onOpenAiReport: (student: Student) => void;
}

export function GradeManager({
  students,
  subjects,
  grades,
  onUpdateGrade,
  onOpenAiReport,
}: GradeManagerProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  // Filter students by search
  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nisn.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-800 mb-1">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Nilai Akademik & Rapor Kurikulum Merdeka</h2>
          </div>
          <p className="text-xs text-slate-500">
            SMP Negeri 7 Sentani - Penilaian Formatif, Sumatif, dan Tujuan Pembelajaran (TP)
          </p>
        </div>

        {currentStudent && (
          <button
            onClick={() => onOpenAiReport(currentStudent)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buat Rapor Naratif AI ({currentStudent.name})</span>
          </button>
        )}
      </div>

      {/* Main Layout: Left Student selector, Right Grades Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student Sidebar List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 lg:col-span-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {filteredStudents.map((st) => {
              const isSelected = selectedStudentId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStudentId(st.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{st.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {st.nisn.substring(st.nisn.length - 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content: Grades Table for Selected Student */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm lg:col-span-3 space-y-6">
          {currentStudent && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{currentStudent.name}</h3>
                <p className="text-xs text-slate-500">
                  NISN: {currentStudent.nisn} | Kelas: 8.1 | Tempat/Tgl Lahir: {currentStudent.placeOfBirth}, {currentStudent.dateOfBirth}
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-800">
                Kurikulum Merdeka 2025/2026
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Mata Pelajaran</th>
                  <th className="py-3 px-4 font-bold text-center">Formatif</th>
                  <th className="py-3 px-4 font-bold text-center">Sumatif</th>
                  <th className="py-3 px-4 font-bold text-center">Rata-rata</th>
                  <th className="py-3 px-4 font-bold text-center">Predikat</th>
                  <th className="py-3 px-4 font-bold">Deskripsi TP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub) => {
                  const gradeRecord = grades.find(
                    (g) => g.studentId === selectedStudentId && g.subjectId === sub.id
                  ) || {
                    id: `g-temp-${sub.id}`,
                    studentId: selectedStudentId,
                    subjectId: sub.id,
                    formatif: 82,
                    sumatif: 85,
                    tpDescription: 'Menunjukkan pemahaman yang baik pada capaian pembelajaran.',
                    predicate: 'B' as const,
                  };

                  const avg = Math.round((gradeRecord.formatif + gradeRecord.sumatif) / 2);
                  const pred: 'A' | 'B' | 'C' | 'D' = avg >= 88 ? 'A' : avg >= 78 ? 'B' : avg >= 70 ? 'C' : 'D';

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-800 text-xs">
                        {sub.name}
                        <div className="text-[10px] text-slate-400 font-normal">{sub.teacher}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={gradeRecord.formatif}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            onUpdateGrade({
                              ...gradeRecord,
                              formatif: val,
                            });
                          }}
                          className="w-16 text-center py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={gradeRecord.sumatif}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            onUpdateGrade({
                              ...gradeRecord,
                              sumatif: val,
                            });
                          }}
                          className="w-16 text-center py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900 text-xs">
                        {avg}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            pred === 'A'
                              ? 'bg-emerald-100 text-emerald-800'
                              : pred === 'B'
                              ? 'bg-blue-100 text-blue-800'
                              : pred === 'C'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {pred}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                        <input
                          type="text"
                          value={gradeRecord.tpDescription}
                          onChange={(e) => {
                            onUpdateGrade({
                              ...gradeRecord,
                              tpDescription: e.target.value,
                            });
                          }}
                          className="w-full bg-transparent border-b border-dashed border-slate-300 focus:border-indigo-600 focus:outline-none py-0.5 text-xs text-slate-700"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
