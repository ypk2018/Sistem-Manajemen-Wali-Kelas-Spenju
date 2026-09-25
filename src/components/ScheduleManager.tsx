import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, User, Plus, BookOpen } from 'lucide-react';
import { ScheduleItem, Subject } from '../types';

interface ScheduleManagerProps {
  schedule: ScheduleItem[];
  subjects: Subject[];
  onAddScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
}

export function ScheduleManager({
  schedule,
  subjects,
  onAddScheduleItem,
}: ScheduleManagerProps) {
  const [activeDay, setActiveDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    day: 'Senin' as const,
    timeSlot: '07:15 - 08:00',
    subjectId: subjects[0]?.id || '',
    teacher: 'Dra. Martha Ohee, M.Pd',
    room: 'Ruang Kelas 8.1',
  });

  const days: Array<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'> = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
  ];

  const filteredSchedule = schedule.filter((s) => s.day === activeDay);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddScheduleItem(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-800 mb-1">
            <CalendarDays className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Jadwal Pelajaran Kurikulum Merdeka</h2>
          </div>
          <p className="text-xs text-slate-500">
            SMP Negeri 7 Sentani - Jadwal Kegiatan Belajar Mengajar Kelas 8.1
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal</span>
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto space-x-2">
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all text-center ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Schedule Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((item) => {
          const subject = subjects.find((s) => s.id === item.subjectId);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.timeSlot}</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {subject?.code || 'MP'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {subject?.name || 'Mata Pelajaran Kurikulum Merdeka'}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.teacher}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.room}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSchedule.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 font-medium">Tidak ada jadwal pelajaran untuk hari {activeDay}.</p>
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tambah Jadwal Pelajaran</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hari</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jam Pelajaran</label>
                  <input
                    type="text"
                    required
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    placeholder="07:15 - 08:00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mata Pelajaran</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => {
                    const sId = e.target.value;
                    const sub = subjects.find((s) => s.id === sId);
                    setFormData({
                      ...formData,
                      subjectId: sId,
                      teacher: sub?.teacher || formData.teacher,
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Guru Pengampu</label>
                <input
                  type="text"
                  required
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ruangan / Tempat</label>
                <input
                  type="text"
                  required
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-sm"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
