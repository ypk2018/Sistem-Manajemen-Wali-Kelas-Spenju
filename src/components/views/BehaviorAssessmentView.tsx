import React, { useState } from 'react';
import { Award, Search, CheckCircle2 } from 'lucide-react';
import { Student, BehaviorAssessment } from '../../types';

interface BehaviorAssessmentProps {
  students: Student[];
  behaviors: BehaviorAssessment[];
  onUpdateBehavior: (behavior: BehaviorAssessment) => void;
  activeSubTab: string;
}

export function BehaviorAssessmentView({
  students,
  behaviors,
  onUpdateBehavior,
  activeSubTab,
}: BehaviorAssessmentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nisn.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-600" />
            <span>Melakukan Penilaian Sikap, Kerajinan, & Tata Tertib</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian harian tingkah laku, kerajinan, ketekunan, kesantunan, dan kepribadian peserta didik kelas 8.1 SMPN 7 Sentani.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Behavior Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">No</th>
                <th className="py-3 px-4 font-bold">Nama Peserta Didik</th>
                <th className="py-3 px-4 font-bold text-center">Sikap & Perilaku</th>
                <th className="py-3 px-4 font-bold text-center">Kerajinan</th>
                <th className="py-3 px-4 font-bold text-center">Kesantunan</th>
                <th className="py-3 px-4 font-bold text-center">Tata Tertib</th>
                <th className="py-3 px-4 font-bold">Catatan Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((st, idx) => {
                const beh = behaviors.find((b) => b.studentId === st.id) || {
                  id: `beh-${st.id}`,
                  studentId: st.id,
                  sikap: 'Baik' as const,
                  kerajinan: 'Rajin' as const,
                  kesantunan: 'Santun' as const,
                  tataTertib: 'Disiplin' as const,
                  catatanGuru: 'Siswa menunjukkan keaktifan dan sopan santun.',
                };

                return (
                  <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-500">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">{st.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={beh.sikap}
                        onChange={(e) =>
                          onUpdateBehavior({ ...beh, sikap: e.target.value as any })
                        }
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-800"
                      >
                        <option value="Sangat Baik">Sangat Baik</option>
                        <option value="Baik">Baik</option>
                        <option value="Cukup">Cukup</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={beh.kerajinan}
                        onChange={(e) =>
                          onUpdateBehavior({ ...beh, kerajinan: e.target.value as any })
                        }
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-teal-800"
                      >
                        <option value="Sangat Rajin">Sangat Rajin</option>
                        <option value="Rajin">Rajin</option>
                        <option value="Cukup">Cukup</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={beh.kesantunan}
                        onChange={(e) =>
                          onUpdateBehavior({ ...beh, kesantunan: e.target.value as any })
                        }
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-800"
                      >
                        <option value="Sangat Santun">Sangat Santun</option>
                        <option value="Santun">Santun</option>
                        <option value="Cukup">Cukup</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={beh.tataTertib}
                        onChange={(e) =>
                          onUpdateBehavior({ ...beh, tataTertib: e.target.value as any })
                        }
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-amber-800"
                      >
                        <option value="Disiplin">Disiplin</option>
                        <option value="Pernah Teguran">Pernah Teguran</option>
                        <option value="Perlu Perhatian">Perlu Perhatian</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={beh.catatanGuru}
                        onChange={(e) =>
                          onUpdateBehavior({ ...beh, catatanGuru: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-dashed border-slate-300 focus:border-amber-600 focus:outline-none py-1 text-xs text-slate-700"
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
  );
}
