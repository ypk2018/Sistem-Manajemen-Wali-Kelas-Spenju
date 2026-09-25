import React, { useState } from 'react';
import { FolderKanban, Grid, CalendarDays, ClipboardList, CheckCircle2 } from 'lucide-react';
import { Student, ScheduleItem, CleaningDuty, SeatMapItem } from '../../types';

interface ClassAdminProps {
  students: Student[];
  schedule: ScheduleItem[];
  cleaning: CleaningDuty[];
  seatMap: SeatMapItem[];
  activeSubTab: string;
}

export function ClassAdminView({
  students,
  schedule,
  cleaning,
  seatMap,
  activeSubTab,
}: ClassAdminProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <FolderKanban className="w-6 h-6 text-emerald-700" />
            <span>Administrasi Kelas: Denah, Jadwal, Piket, & Jurnal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Penyelenggaraan kelengkapan administrasi kelas 8.1 SMPN 7 Sentani secara profesional dan terstruktur.
          </p>
        </div>
      </div>

      {/* SubTab 1: Denah Tempat Duduk & Peta Kelas */}
      {activeSubTab === 'admin-seating' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Denah Tempat Duduk Peserta Didik (Peta Kelas 8.1)</h3>
              <p className="text-xs text-slate-500">Susunan meja dan kursi menghadap ke papan tulis guru.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
              Meja Guru & Papan Tulis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {seatMap.map((bench) => {
              const st1 = students.find((s) => s.id === bench.student1Id);
              const st2 = students.find((s) => s.id === bench.student2Id);
              return (
                <div key={bench.id} className="p-4 rounded-xl border-2 border-slate-300 bg-slate-50 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    Bangku No. {bench.benchNumber} (Baris {bench.row})
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 font-semibold text-slate-800 shadow-sm truncate">
                      {st1?.name || 'Kosong'}
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 font-semibold text-slate-800 shadow-sm truncate">
                      {st2?.name || 'Kosong'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 2: Jadwal Pelajaran & Daftar Piket */}
      {activeSubTab === 'admin-schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Daftar Petugas Piket Harian Kebersihan Kelas 8.1</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {cleaning.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider">{c.day}</h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {c.studentIds.map((sId, i) => {
                      const st = students.find((s) => s.id === sId);
                      return (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          <span className="truncate">{st?.name || 'Siswa'}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Buku Daftar Hadir & Jurnal Kelas */}
      {activeSubTab === 'admin-journal' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Buku Daftar Hadir & Agenda Jurnal Kelas</h3>
          <p className="text-xs text-slate-600">
            Pencatatan administrasi kehadiran dan jurnal mengajar harian wali kelas dapat diakses langsung pada menu Absensi dan Jurnal Wali Kelas di bilah menu utama.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-emerald-900 text-xs font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Seluruh administrasi buku daftar hadir dan tata tertib kelas 8.1 telah diverifikasi oleh Kurikulum dan Kepala Sekolah (Maikel Paul Wally, S.Pd., M.Pd).</span>
          </div>
        </div>
      )}
    </div>
  );
}
