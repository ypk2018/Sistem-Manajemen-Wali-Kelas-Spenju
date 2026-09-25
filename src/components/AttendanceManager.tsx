import React, { useState } from 'react';
import {
  CalendarCheck,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Save,
  FileSpreadsheet,
} from 'lucide-react';
import { Student, AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceManagerProps {
  students: Student[];
  attendance: AttendanceRecord[];
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
}

export function AttendanceManager({
  students,
  attendance,
  onUpdateAttendance,
}: AttendanceManagerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [savedNotice, setSavedNotice] = useState(false);

  // Get or create attendance state for selected date
  const [currentRecords, setCurrentRecords] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      const existing = attendance.find(
        (a) => a.studentId === s.id && a.date === selectedDate
      );
      map[s.id] = existing ? existing.status : 'Hadir';
    });
    return map;
  });

  // Update records when date changes
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const map: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      const existing = attendance.find(
        (a) => a.studentId === s.id && a.date === date
      );
      map[s.id] = existing ? existing.status : 'Hadir';
    });
    setCurrentRecords(map);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setCurrentRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSave = () => {
    const updated: AttendanceRecord[] = students.map((s) => {
      const existing = attendance.find(
        (a) => a.studentId === s.id && a.date === selectedDate
      );
      return {
        id: existing ? existing.id : `att-${s.id}-${selectedDate}`,
        studentId: s.id,
        date: selectedDate,
        status: currentRecords[s.id] || 'Hadir',
      };
    });
    onUpdateAttendance(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const markAll = (status: AttendanceStatus) => {
    const map: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      map[s.id] = status;
    });
    setCurrentRecords(map);
  };

  const hadirCount = Object.values(currentRecords).filter((s) => s === 'Hadir').length;
  const sakitCount = Object.values(currentRecords).filter((s) => s === 'Sakit').length;
  const izinCount = Object.values(currentRecords).filter((s) => s === 'Izin').length;
  const alphaCount = Object.values(currentRecords).filter((s) => s === 'Alpha').length;

  return (
    <div className="space-y-6">
      {/* Header & Date Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-800 mb-1">
            <CalendarCheck className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Absensi Harian Kelas 8.1</h2>
          </div>
          <p className="text-xs text-slate-500">
            SMP Negeri 7 Sentani - Pencatatan Kehadiran Siswa
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Calendar className="w-4 h-4 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Absensi</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Data absensi tanggal {selectedDate} berhasil disimpan!</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Hadir</p>
            <h3 className="text-2xl font-bold text-emerald-700 mt-1">{hadirCount}</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Sakit</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{sakitCount}</h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Izin</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">{izinCount}</h3>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Alpha (Tanpa Keterangan)</p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{alphaCount}</h3>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-medium text-slate-600">Pintasan Kehadiran Massal:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => markAll('Hadir')}
            className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Semua Hadir
          </button>
          <button
            onClick={() => markAll('Sakit')}
            className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Semua Sakit
          </button>
          <button
            onClick={() => markAll('Izin')}
            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Semua Izin
          </button>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">No</th>
                <th className="py-3 px-4 font-bold">NISN & Nama Siswa</th>
                <th className="py-3 px-4 font-bold">Gender</th>
                <th className="py-3 px-4 font-bold text-center">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st, index) => {
                const status = currentRecords[st.id] || 'Hadir';
                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-500">{index + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-xs text-slate-500">NISN: {st.nisn}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold ${
                          st.gender === 'L'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-teal-50 text-teal-700'
                        }`}
                      >
                        {st.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        {(['Hadir', 'Sakit', 'Izin', 'Alpha'] as AttendanceStatus[]).map((stOpt) => {
                          const isSelected = status === stOpt;
                          let activeColor = '';
                          if (stOpt === 'Hadir')
                            activeColor = isSelected ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50';
                          if (stOpt === 'Sakit')
                            activeColor = isSelected ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-amber-50';
                          if (stOpt === 'Izin')
                            activeColor = isSelected ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-blue-50';
                          if (stOpt === 'Alpha')
                            activeColor = isSelected ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-rose-50';

                          return (
                            <button
                              key={stOpt}
                              onClick={() => handleStatusChange(st.id, stOpt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeColor}`}
                            >
                              {stOpt}
                            </button>
                          );
                        })}
                      </div>
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
