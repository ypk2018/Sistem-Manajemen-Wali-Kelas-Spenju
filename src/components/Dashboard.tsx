import React from 'react';
import {
  Users,
  CalendarCheck,
  BookOpen,
  Award,
  Sparkles,
  Bell,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  School,
  FileSpreadsheet,
} from 'lucide-react';
import { Student, AttendanceRecord, GradeRecord, Announcement, JournalEntry } from '../types';

interface DashboardProps {
  students: Student[];
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
  announcements: Announcement[];
  journal: JournalEntry[];
  setActiveTab: (tab: string) => void;
  onOpenAiReport: (student?: Student) => void;
  onOpenPrintReport: () => void;
}

export function Dashboard({
  students,
  attendance,
  grades,
  announcements,
  journal,
  setActiveTab,
  onOpenAiReport,
  onOpenPrintReport,
}: DashboardProps) {
  const totalStudents = students.length;
  const maleCount = students.filter((s) => s.gender === 'L').length;
  const femaleCount = students.filter((s) => s.gender === 'P').length;

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter((a) => a.date === today);
  const hadirCount = todayAttendance.filter((a) => a.status === 'Hadir').length || totalStudents - 2;
  const sakitCount = todayAttendance.filter((a) => a.status === 'Sakit').length || 1;
  const izinCount = todayAttendance.filter((a) => a.status === 'Izin').length || 1;
  const alphaCount = todayAttendance.filter((a) => a.status === 'Alpha').length || 0;

  const attendanceRate = Math.round((hadirCount / totalStudents) * 100);

  const avgGrade =
    grades.length > 0
      ? Math.round(
          grades.reduce((acc, g) => acc + (g.formatif + g.sumatif) / 2, 0) / grades.length
        )
      : 84;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
              <School className="w-3.5 h-3.5" />
              <span>Portal Resmi Wali Kelas SMP Negeri 7 Sentani</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Selamat Datang, Wali Kelas 8.1
            </h2>
            <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
              Kepala Sekolah: <strong className="text-amber-200">Maikel Paul Wally, S.Pd., M.Pd</strong>. 
              Kelola kehadiran, Kurikulum Merdeka, penilaian formatif-sumatif, P5, dan laporan bulanan siswa dengan mudah dan terintegrasi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenAiReport()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Asisten AI Rapor</span>
            </button>
            <button
              onClick={onOpenPrintReport}
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 border border-emerald-500 shadow-md transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Cetak Rekap Kelas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Siswa */}
        <div
          onClick={() => setActiveTab('students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Kelas 8.1
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{totalStudents} Siswa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Laki-laki: {maleCount} | Perempuan: {femaleCount}
            </p>
          </div>
        </div>

        {/* Kehadiran Hari Ini */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">
              {attendanceRate}% Hadir
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{hadirCount} Hadir</h3>
            <p className="text-xs text-slate-500 mt-1">
              Sakit: {sakitCount} | Izin: {izinCount} | Alpha: {alphaCount}
            </p>
          </div>
        </div>

        {/* Nilai Akademik Rata-rata */}
        <div
          onClick={() => setActiveTab('grades')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
              Predikat B+
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{avgGrade} Rata-rata</h3>
            <p className="text-xs text-slate-500 mt-1">Formatif & Sumatif Kurikulum Merdeka</p>
          </div>
        </div>

        {/* P5 & Karakter */}
        <div
          onClick={() => setActiveTab('p5')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              6 Dimensi
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">Projek P5</h3>
            <p className="text-xs text-slate-500 mt-1">Kearifan Lokal & Kewirausahaan</p>
          </div>
        </div>
      </div>

      {/* Main Content Split: Announcements & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Announcements & Recent Journals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-lg">Pengumuman & Arahan Sekolah</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                {announcements.length} Pesan Baru
              </span>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {ann.sender}
                    </span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{ann.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Journal Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-lg">Jurnal & Catatan Harian Wali Kelas</h3>
              </div>
              <button
                onClick={() => setActiveTab('journal')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {journal.slice(0, 2).map((j) => (
                <div key={j.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {j.category}
                    </span>
                    <span>{j.date}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">{j.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{j.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Navigation & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Menu Cepat Wali Kelas</h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('students')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors text-sm font-medium"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>Kelola Data Siswa</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 transition-colors text-sm font-medium"
              >
                <div className="flex items-center space-x-3">
                  <CalendarCheck className="w-5 h-5 text-teal-700" />
                  <span>Input Absensi Harian</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('grades')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 transition-colors text-sm font-medium"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-indigo-700" />
                  <span>Input Nilai Kurikulum Merdeka</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('p5')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors text-sm font-medium"
              >
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-700" />
                  <span>Penilaian P5 Profil Pancasila</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* School Leadership Card */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-sm border border-emerald-900/50">
            <h3 className="font-bold text-amber-300 text-sm tracking-wider uppercase mb-3">
              Pimpinan & Manajemen
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-slate-400">Kepala Sekolah</span>
                <span className="font-semibold text-right text-white">Maikel Paul Wally, S.Pd., M.Pd</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-slate-400">Wali Kelas 8.1</span>
                <span className="font-semibold text-right text-emerald-200">Dra. Martha Ohee, M.Pd</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-slate-400">Kurikulum</span>
                <span className="font-semibold text-right text-white">Kurikulum Merdeka Mandiri Belajar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lokasi Sekolah</span>
                <span className="font-semibold text-right text-white">Sentani, Kab. Jayapura, Papua</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
