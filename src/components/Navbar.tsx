import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  BookOpen,
  Award,
  FileText,
  Sparkles,
  Bell,
  School,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  announcementsCount: number;
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Beranda / Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Data Siswa (Kelas 8.1)', icon: Users },
  { id: 'attendance', label: 'Absensi Siswa', icon: CalendarCheck },
  { id: 'schedule', label: 'Jadwal Kurikulum Merdeka', icon: CalendarDays },
  { id: 'grades', label: 'Nilai Akademik & Rapor', icon: BookOpen },
  { id: 'p5', label: 'Penilaian P5', icon: Award },
  { id: 'journal', label: 'Jurnal Wali Kelas & AI', icon: FileText },
];

export function Navbar({ activeTab, setActiveTab, announcementsCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Top Header */}
      <header className="bg-emerald-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center border-2 border-amber-400 shadow-inner">
                <School className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-lg sm:text-xl tracking-wide text-amber-200">
                    SMP NEGERI 7 SENTANI
                  </h1>
                  <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
                    Kurikulum Merdeka
                  </span>
                </div>
                <p className="text-xs text-emerald-200">
                  Kepala Sekolah: <span className="text-white font-medium">Maikel Paul Wally, S.Pd., M.Pd</span> | Wali Kelas 8.1
                </p>
              </div>
            </div>

            {/* Right Header info */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-emerald-300">Tahun Ajaran 2025/2026</p>
                <p className="text-sm font-semibold text-white">Semester Genap</p>
              </div>
              <div className="h-8 w-px bg-emerald-700"></div>
              <div className="flex items-center space-x-2 bg-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-600">
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-bold text-slate-950 text-xs">
                  MO
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white">Dra. Martha Ohee</p>
                  <p className="text-emerald-300">Wali Kelas 8.1</p>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Sub-bar */}
        <div className="bg-emerald-950 border-t border-emerald-800 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                        : 'text-emerald-100 hover:bg-emerald-900 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
