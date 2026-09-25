import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Award,
  AlertTriangle,
  BookOpen,
  FolderKanban,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronRight,
  School,
  CheckSquare,
  ClipboardList,
  UserCheck,
  CalendarCheck,
  HeartHandshake,
  Printer,
  Grid,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  subItems?: Array<{ id: string; label: string }>;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Beranda / Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'tupoksi-1',
    title: '1. Pengelolaan & Keadaan Siswa',
    icon: Users,
    subItems: [
      { id: 'students-list', label: 'Data Identitas & Jumlah (L/P)' },
      { id: 'students-attendance', label: 'Kehadiran Harian Peserta Didik' },
      { id: 'students-issues', label: 'Analisis Masalah (Sosial/Ekonomi)' },
    ],
  },
  {
    id: 'tupoksi-2',
    title: '2. Penilaian & Karakter',
    icon: Award,
    subItems: [
      { id: 'behavior-attitude', label: 'Sikap & Tingkah Laku Sehari-hari' },
      { id: 'behavior-diligence', label: 'Kerajinan, Ketekunan & Kesantunan' },
      { id: 'behavior-rules', label: 'Kepribadian & Tata Tertib' },
    ],
  },
  {
    id: 'tupoksi-3',
    title: '3. Tindakan & Pembinaan',
    icon: AlertTriangle,
    subItems: [
      { id: 'action-guidance', label: 'Pemberitahuan & Pembinaan' },
      { id: 'action-oral', label: 'Peringatan Secara Lisan' },
      { id: 'action-special', label: 'Peringatan Khusus (BK / Kepsek)' },
    ],
  },
  {
    id: 'tupoksi-4',
    title: '4. Langkah Tindak Lanjut',
    icon: BookOpen,
    subItems: [
      { id: 'followup-grades', label: 'Hasil Nilai Ulangan & Capaian TP' },
      { id: 'followup-legger', label: 'Daftar Kumpulan Nilai (Legger)' },
      { id: 'followup-promotion', label: 'Keberhasilan & Kenaikan Kelas' },
    ],
  },
  {
    id: 'tupoksi-5',
    title: '5. Administrasi Kelas',
    icon: FolderKanban,
    subItems: [
      { id: 'admin-seating', label: 'Denah Tempat Duduk & Peta Kelas' },
      { id: 'admin-schedule', label: 'Jadwal Pelajaran & Daftar Piket' },
      { id: 'admin-journal', label: 'Buku Daftar Hadir & Jurnal Kelas' },
    ],
  },
  {
    id: 'tupoksi-6',
    title: '6. Hubungan & Laporan',
    icon: FileText,
    subItems: [
      { id: 'report-parents', label: 'Komunikasi dengan Orang Tua / Wali' },
      { id: 'report-card', label: 'Buku Laporan Pendidikan (Rapor)' },
      { id: 'report-print', label: 'Cetak Dokumen Resmi & Rapor' },
    ],
  },
  {
    id: 'tupoksi-7',
    title: '7. Asisten AI Wali Kelas',
    icon: Sparkles,
    subItems: [
      { id: 'ai-narrative', label: 'Generator Narasi Rapor AI' },
      { id: 'ai-advisor', label: 'AI Advisor Tupoksi Kelas' },
    ],
  },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // Open categories that contain the activeTab
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'tupoksi-1': true,
    'tupoksi-2': true,
    'tupoksi-3': true,
    'tupoksi-4': true,
    'tupoksi-5': true,
    'tupoksi-6': true,
    'tupoksi-7': true,
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-72 bg-emerald-950 text-emerald-100 flex flex-col h-screen sticky top-0 shadow-xl border-r border-emerald-900 select-none">
      {/* School Branding Header */}
      <div className="p-5 border-b border-emerald-900 bg-emerald-900/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 border border-amber-400 flex items-center justify-center text-amber-300 shadow-inner">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-amber-200">
              SMP NEGERI 7 SENTANI
            </h1>
            <p className="text-[11px] text-emerald-300">SIFAK - Manajemen Wali Kelas</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-800/80 text-[11px] text-emerald-300">
          <p className="font-medium text-white">Kepala Sekolah:</p>
          <p className="text-amber-300 font-semibold">Maikel Paul Wally, S.Pd., M.Pd</p>
        </div>
      </div>

      {/* Navigation List with Dropdown / Submenus */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-emerald-800">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const hasSub = item.subItems && item.subItems.length > 0;
          const isOpen = openDropdowns[item.id];
          const isParentActive = item.subItems?.some((sub) => sub.id === activeTab);
          const isDirectActive = activeTab === item.id;

          if (!hasSub) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isDirectActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            );
          }

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => toggleDropdown(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isParentActive
                    ? 'bg-emerald-900/90 text-white border-l-4 border-amber-400'
                    : 'text-emerald-200 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className="w-4 h-4 shrink-0 text-amber-300" />
                  <span className="truncate text-left">{item.title}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0 text-emerald-400" />
                )}
              </button>

              {isOpen && item.subItems && (
                <div className="pl-9 pr-2 space-y-1 py-1 border-l-2 border-emerald-800/60 ml-4">
                  {item.subItems.map((sub) => {
                    const isSubActive = activeTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveTab(sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center space-x-2 ${
                          isSubActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-emerald-300 hover:bg-emerald-900/70 hover:text-white'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="truncate">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-emerald-900 bg-emerald-950 text-[11px] text-emerald-400 text-center">
        Wali Kelas 8.1 | Kurikulum Merdeka
      </div>
    </aside>
  );
}
