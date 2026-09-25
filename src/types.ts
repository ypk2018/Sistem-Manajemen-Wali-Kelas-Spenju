export interface Student {
  id: string;
  nisn: string;
  name: string;
  gender: 'L' | 'P';
  placeOfBirth: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  notes?: string;
  avatarColor: string;
  socialEconomicStatus?: string;
  academicStanding?: string;
}

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
}

export interface StudentIssue {
  id: string;
  studentId: string;
  date: string;
  category: 'Akademik' | 'Sosial/Ekonomi' | 'Kedisiplinan' | 'Kesehatan';
  description: string;
  actionTaken: string;
  status: 'Dalam Pembinaan' | 'Selesai' | 'Rujukan BK';
}

export interface BehaviorAssessment {
  id: string;
  studentId: string;
  sikap: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
  kerajinan: 'Sangat Rajin' | 'Rajin' | 'Cukup' | 'Kurang';
  kesantunan: 'Sangat Santun' | 'Santun' | 'Cukup';
  tataTertib: 'Disiplin' | 'Pernah Teguran' | 'Perlu Perhatian';
  catatanGuru: string;
}

export interface StudentWarning {
  id: string;
  studentId: string;
  date: string;
  type: 'Pemberitahuan & Pembinaan' | 'Peringatan Lisan' | 'Peringatan Khusus (BK/Kepala Sekolah)';
  violation: string;
  sanction: string;
  notifiedParent: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  hours: number;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  subjectId: string;
  formatif: number;
  sumatif: number;
  tpDescription: string;
  predicate: 'A' | 'B' | 'C' | 'D';
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  timeSlot: string;
  subjectId: string;
  teacher: string;
  room: string;
}

export interface CleaningDuty {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  studentIds: string[];
}

export interface SeatMapItem {
  id: string;
  benchNumber: number; // 1 to 16
  row: number;
  col: number;
  student1Id?: string;
  student2Id?: string;
}

export interface ParentCommunication {
  id: string;
  studentId: string;
  date: string;
  method: 'Kunjungan Rumah' | 'Panggilan ke Sekolah' | 'Telepon / WhatsApp' | 'Penerimaan Rapor';
  topic: string;
  result: string;
  pic: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  category: 'Administrasi' | 'Kegiatan Kelas' | 'Bimbingan Siswa' | 'Hubungan Orang Tua';
  title: string;
  description: string;
  reportedBy: string;
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
  sender: string;
  priority: 'Normal' | 'Penting' | 'Segera';
}
