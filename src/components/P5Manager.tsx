import React, { useState } from 'react';
import { Award, Sparkles, Search, CheckCircle2 } from 'lucide-react';
import { Student, P5Record, P5Dimension, P5Achievement } from '../types';

interface P5ManagerProps {
  students: Student[];
  p5Records: P5Record[];
  onUpdateP5: (record: P5Record) => void;
}

export function P5Manager({ students, p5Records, onUpdateP5 }: P5ManagerProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  const dimensions: P5Dimension[] = [
    'Beriman dan Bertakwa',
    'Berkebinekaan Global',
    'Gotong Royong',
    'Mandiri',
    'Bernalar Kritis',
    'Kreatif',
  ];

  const achievements: Array<{ code: P5Achievement; label: string; desc: string }> = [
    { code: 'MB', label: 'MB', desc: 'Mulai Berkembang' },
    { code: 'SB', label: 'SB', desc: 'Sedang Berkembang' },
    { code: 'BSH', label: 'BSH', desc: 'Berkembang Sesuai Harapan' },
    { code: 'SHB', label: 'SHB', desc: 'Sangat Berkembang' },
  ];

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nisn.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-700 mb-1">
            <Award className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Penilaian P5 (Profil Pelajar Pancasila)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Projek Tema: "Kearifan Lokal dan Kewirausahaan Khas Danau Sentani" - SMP Negeri 7 Sentani
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 lg:col-span-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{st.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {st.nisn.substring(st.nisn.length - 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* P5 Dimensions Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm lg:col-span-3 space-y-6">
          {currentStudent && (
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">{currentStudent.name}</h3>
              <p className="text-xs text-slate-500">
                Penilaian Perkembangan Enam Dimensi Profil Pelajar Pancasila
              </p>
            </div>
          )}

          <div className="space-y-4">
            {dimensions.map((dim) => {
              const existingRec = p5Records.find(
                (p) => p.studentId === selectedStudentId && p.dimension === dim
              ) || {
                id: `p5-${selectedStudentId}-${dim}`,
                studentId: selectedStudentId,
                dimension: dim,
                achievement: 'BSH' as const,
                note: 'Menunjukkan partisipasi dan perkembangan yang baik pada dimensi ini.',
              };

              return (
                <div
                  key={dim}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>{dim}</span>
                    </h4>

                    {/* Achievement Buttons */}
                    <div className="flex items-center space-x-1.5">
                      {achievements.map((ach) => {
                        const isSelected = existingRec.achievement === ach.code;
                        return (
                          <button
                            key={ach.code}
                            onClick={() =>
                              onUpdateP5({
                                ...existingRec,
                                achievement: ach.code,
                              })
                            }
                            title={ach.desc}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 shadow-sm'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {ach.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={existingRec.note}
                      onChange={(e) =>
                        onUpdateP5({
                          ...existingRec,
                          note: e.target.value,
                        })
                      }
                      placeholder="Catatan perkembangan khusus siswa pada dimensi ini..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
