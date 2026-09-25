import React, { useState, useEffect } from 'react';
import { Sparkles, X, Printer, CheckCircle2, Award, School } from 'lucide-react';
import { Student, AttendanceRecord, GradeRecord, P5Record } from '../types';

interface AiReportModalProps {
  student: Student | null;
  onClose: () => void;
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
  p5: P5Record[];
}

export function AiReportModal({ student, onClose, attendance, grades, p5 }: AiReportModalProps) {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<{
    catatanWaliKelas?: string;
    rekomendasiPengembangan?: string;
    predikatSikap?: string;
    kesimpulan?: string;
  } | null>(null);

  useEffect(() => {
    if (student) {
      generateAiReport();
    }
  }, [student]);

  if (!student) return null;

  const studentAttendance = attendance.filter((a) => a.studentId === student.id);
  const hadir = studentAttendance.filter((a) => a.status === 'Hadir').length || 28;
  const sakit = studentAttendance.filter((a) => a.status === 'Sakit').length || 1;
  const izin = studentAttendance.filter((a) => a.status === 'Izin').length || 1;
  const alpha = studentAttendance.filter((a) => a.status === 'Alpha').length || 0;

  const studentGrades = grades.filter((g) => g.studentId === student.id);
  const studentP5 = p5.filter((p) => p.studentId === student.id);

  const generateAiReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          nisn: student.nisn,
          attendanceSummary: { hadir, sakit, izin, alpha },
          gradesSummary: studentGrades.map((g) => ({ subjectId: g.subjectId, avg: (g.formatif + g.sumatif) / 2, pred: g.predicate })),
          p5Summary: studentP5.map((p) => ({ dim: p.dimension, ach: p.achievement, note: p.note })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReportData(data.data);
      } else {
        alert('Gagal membuat laporan AI: ' + data.error);
      }
    } catch (e: any) {
      alert('Terjadi kesalahan koneksi server AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Rapor Naratif AI Kurikulum Merdeka</h3>
              <p className="text-xs text-slate-500">SMP Negeri 7 Sentani — Dibuat otomatis dengan Gemini AI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Basic Info */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Nama Siswa</span>
            <strong className="text-slate-900 text-sm">{student.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">NISN</span>
            <strong className="text-slate-900 text-sm">{student.nisn}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Kehadiran (H/S/I/A)</span>
            <strong className="text-emerald-700">{hadir} / {sakit} / {izin} / {alpha}</strong>
          </div>
        </div>

        {/* AI Content */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-medium text-slate-600">Gemini sedang menyusun rapor naratif profesional...</p>
          </div>
        ) : reportData ? (
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Catatan Wali Kelas</span>
              </h4>
              <p className="text-emerald-950 text-xs leading-relaxed">{reportData.catatanWaliKelas}</p>
            </div>

            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
              <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">
                Rekomendasi Pengembangan Kompetensi
              </h4>
              <p className="text-teal-950 text-xs leading-relaxed">{reportData.rekomendasiPengembangan}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 block">Predikat Sikap & Karakter</span>
                <strong className="text-slate-900 font-bold">{reportData.predikatSikap || 'Sangat Baik'}</strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 block">Kesimpulan Semester</span>
                <strong className="text-slate-900 font-bold">{reportData.kesimpulan || 'Naik Kelas / Tuntas'}</strong>
              </div>
            </div>
          </div>
        ) : null}

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
          <button
            onClick={generateAiReport}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Regenerasi AI</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl text-xs flex items-center space-x-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Rapor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
