import React, { useState } from 'react';
import { Users, Search, Plus, Phone, MapPin, Calendar, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Student, StudentIssue } from '../../types';

interface StudentManagementProps {
  students: Student[];
  issues: StudentIssue[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onUpdateStudent: (student: Student) => void;
  onAddIssue: (issue: Omit<StudentIssue, 'id'>) => void;
  activeSubTab: string;
}

export function StudentManagement({
  students,
  issues,
  onAddStudent,
  onUpdateStudent,
  onAddIssue,
  activeSubTab,
}: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nisn: '',
    name: '',
    gender: 'L' as 'L' | 'P',
    placeOfBirth: 'Sentani',
    dateOfBirth: '2012-01-01',
    address: '',
    parentName: '',
    parentPhone: '',
    socialEconomicStatus: 'Cukup',
    academicStanding: 'Baik',
    notes: '',
    avatarColor: 'bg-emerald-700',
  });

  const [issueData, setIssueData] = useState({
    studentId: students[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    category: 'Sosial/Ekonomi' as const,
    description: '',
    actionTaken: '',
    status: 'Dalam Pembinaan' as const,
  });

  const maleStudents = students.filter((s) => s.gender === 'L');
  const femaleStudents = students.filter((s) => s.gender === 'P');

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nisn.includes(searchTerm)
  );

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(formData);
    setIsAddModalOpen(false);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIssue(issueData);
    setIsIssueModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* SubTab 1: Data Identitas & Jumlah Siswa (L/P) */}
      {activeSubTab === 'students-list' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Users className="w-6 h-6 text-emerald-700" />
                <span>Keadaan Peserta Didik (Jumlah, Nama & Identitas)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Total Siswa: <strong className="text-slate-900">{students.length}</strong> | 
                Putra (L): <strong className="text-emerald-700">{maleStudents.length}</strong> | 
                Putri (P): <strong className="text-teal-700">{femaleStudents.length}</strong>
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Peserta Didik</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Cari nama atau NISN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">No</th>
                    <th className="py-3 px-4 font-bold">NISN & Nama Lengkap</th>
                    <th className="py-3 px-4 font-bold">L/P</th>
                    <th className="py-3 px-4 font-bold">Tempat/Tgl Lahir</th>
                    <th className="py-3 px-4 font-bold">Alamat</th>
                    <th className="py-3 px-4 font-bold">Orang Tua / Wali</th>
                    <th className="py-3 px-4 font-bold">Status Sosial/Ekonomi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredStudents.map((st, idx) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-sm">{st.name}</div>
                        <div className="text-slate-500">NISN: {st.nisn}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-semibold ${
                            st.gender === 'L' ? 'bg-emerald-50 text-emerald-700' : 'bg-teal-50 text-teal-700'
                          }`}
                        >
                          {st.gender}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {st.placeOfBirth}, {st.dateOfBirth}
                      </td>
                      <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{st.address}</td>
                      <td className="py-3 px-4 text-slate-700">
                        <div>{st.parentName}</div>
                        <div className="text-slate-400">{st.parentPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
                          {st.socialEconomicStatus || 'Cukup'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Keadaan Kehadiran Harian */}
      {activeSubTab === 'students-attendance' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-2">
              <Calendar className="w-6 h-6 text-teal-700" />
              <span>Kehadiran Peserta Didik Setiap Hari</span>
            </h2>
            <p className="text-xs text-slate-500">
              Rekapitulasi kehadiran harian kelas 8.1 sesuai Tupoksi Wali Kelas. Silakan buka menu Absensi pada menu utama untuk pengisian harian.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Statistik Kehadiran Bulan Ini</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-xs text-emerald-700 block font-semibold">Tingkat Kehadiran</span>
                <span className="text-2xl font-extrabold text-emerald-900">96.8%</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-xs text-amber-700 block font-semibold">Total Sakit</span>
                <span className="text-2xl font-extrabold text-amber-900">4 Kasus</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-xs text-blue-700 block font-semibold">Total Izin</span>
                <span className="text-2xl font-extrabold text-blue-900">3 Kasus</span>
              </div>
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                <span className="text-xs text-rose-700 block font-semibold">Tanpa Keterangan (Alpha)</span>
                <span className="text-2xl font-extrabold text-rose-900">0 Kasus</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Analisis Masalah Siswa (Pelajaran, Sosial/Ekonomi) */}
      {activeSubTab === 'students-issues' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <span>Mengetahui Masalah-Masalah yang Dihadapi Peserta Didik</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Catatan khusus hambatan belajar, status sosial/ekonomi, dan penanganan wali kelas.
              </p>
            </div>
            <button
              onClick={() => setIsIssueModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Masalah Siswa</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issues.map((iss) => {
              const st = students.find((s) => s.id === iss.studentId);
              return (
                <div key={iss.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                      {iss.category}
                    </span>
                    <span className="text-xs text-slate-400">{iss.date}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{st?.name || 'Siswa'}</h3>
                    <p className="text-xs text-slate-600 mt-1"><strong>Kendala:</strong> {iss.description}</p>
                    <p className="text-xs text-emerald-700 mt-1"><strong>Tindakan:</strong> {iss.actionTaken}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{iss.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
