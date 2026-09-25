import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/views/StudentManagement';
import { BehaviorAssessmentView } from './components/views/BehaviorAssessmentView';
import { ActionGuidanceView } from './components/views/ActionGuidanceView';
import { AcademicFollowupView } from './components/views/AcademicFollowupView';
import { ClassAdminView } from './components/views/ClassAdminView';
import { ParentCommunicationView } from './components/views/ParentCommunicationView';

import { AttendanceManager } from './components/AttendanceManager';
import { ScheduleManager } from './components/ScheduleManager';
import { GradeManager } from './components/GradeManager';
import { P5Manager } from './components/P5Manager';
import { JournalManager } from './components/JournalManager';

import { AiReportModal } from './components/AiReportModal';
import { PrintReportModal } from './components/PrintReportModal';

import {
  INITIAL_STUDENTS,
  INITIAL_SUBJECTS,
  INITIAL_SCHEDULE,
  INITIAL_ATTENDANCE,
  INITIAL_GRADES,
  INITIAL_P5,
  INITIAL_JOURNAL,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ISSUES,
  INITIAL_BEHAVIORS,
  INITIAL_WARNINGS,
  INITIAL_CLEANING,
  INITIAL_SEAT_MAP,
  INITIAL_PARENT_COMMS,
} from './data/mockData';

import {
  Student,
  AttendanceRecord,
  GradeRecord,
  P5Record,
  ScheduleItem,
  JournalEntry,
  StudentIssue,
  BehaviorAssessment,
  StudentWarning,
  CleaningDuty,
  SeatMapItem,
  ParentCommunication,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [subjects] = useState(INITIAL_SUBJECTS);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [grades, setGrades] = useState<GradeRecord[]>(INITIAL_GRADES);
  const [p5, setP5] = useState<P5Record[]>(INITIAL_P5);
  const [journal, setJournal] = useState<JournalEntry[]>(INITIAL_JOURNAL);
  const [announcements] = useState(INITIAL_ANNOUNCEMENTS);

  const [issues, setIssues] = useState<StudentIssue[]>(INITIAL_ISSUES);
  const [behaviors, setBehaviors] = useState<BehaviorAssessment[]>(INITIAL_BEHAVIORS);
  const [warnings, setWarnings] = useState<StudentWarning[]>(INITIAL_WARNINGS);
  const [cleaning] = useState<CleaningDuty[]>(INITIAL_CLEANING);
  const [seatMap] = useState<SeatMapItem[]>(INITIAL_SEAT_MAP);
  const [comms, setComms] = useState<ParentCommunication[]>(INITIAL_PARENT_COMMS);

  // Modals
  const [aiReportStudent, setAiReportStudent] = useState<Student | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Handlers
  const handleAddStudent = (newStData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...newStData,
      id: `s-${Date.now()}`,
    };
    setStudents([newStudent, ...students]);
  };

  const handleUpdateStudent = (updatedSt: Student) => {
    setStudents(students.map((s) => (s.id === updatedSt.id ? updatedSt : s)));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdateAttendance = (newRecords: AttendanceRecord[]) => {
    const updated = [...attendance];
    newRecords.forEach((nr) => {
      const idx = updated.findIndex((a) => a.studentId === nr.studentId && a.date === nr.date);
      if (idx >= 0) {
        updated[idx] = nr;
      } else {
        updated.push(nr);
      }
    });
    setAttendance(updated);
  };

  const handleUpdateGrade = (updatedGrade: GradeRecord) => {
    const idx = grades.findIndex((g) => g.id === updatedGrade.id);
    if (idx >= 0) {
      const copy = [...grades];
      copy[idx] = updatedGrade;
      setGrades(copy);
    } else {
      setGrades([...grades, updatedGrade]);
    }
  };

  const handleUpdateP5 = (updatedP5: P5Record) => {
    const idx = p5.findIndex((p) => p.id === updatedP5.id);
    if (idx >= 0) {
      const copy = [...p5];
      copy[idx] = updatedP5;
      setP5(copy);
    } else {
      setP5([...p5, updatedP5]);
    }
  };

  const handleAddScheduleItem = (itemData: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...itemData,
      id: `sch-${Date.now()}`,
    };
    setSchedule([...schedule, newItem]);
  };

  const handleAddJournal = (entryData: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: `j-${Date.now()}`,
    };
    setJournal([newEntry, ...journal]);
  };

  const handleAddIssue = (issueData: Omit<StudentIssue, 'id'>) => {
    const newIssue: StudentIssue = {
      ...issueData,
      id: `iss-${Date.now()}`,
    };
    setIssues([newIssue, ...issues]);
  };

  const handleUpdateBehavior = (updated: BehaviorAssessment) => {
    const idx = behaviors.findIndex((b) => b.id === updated.id);
    if (idx >= 0) {
      const copy = [...behaviors];
      copy[idx] = updated;
      setBehaviors(copy);
    } else {
      setBehaviors([...behaviors, updated]);
    }
  };

  const handleAddWarning = (warnData: Omit<StudentWarning, 'id'>) => {
    const newWarn: StudentWarning = {
      ...warnData,
      id: `warn-${Date.now()}`,
    };
    setWarnings([newWarn, ...warnings]);
  };

  const handleAddComm = (commData: Omit<ParentCommunication, 'id'>) => {
    const newComm: ParentCommunication = {
      ...commData,
      id: `pc-${Date.now()}`,
    };
    setComms([newComm, ...comms]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Left Sidebar with Dropdown / Submenus */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-20 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Sistem Informasi Wali Kelas (SIFAK)
            </h2>
            <p className="text-xs text-slate-500">
              SMP Negeri 7 Sentani — Kepala Sekolah: <strong className="text-emerald-800">Maikel Paul Wally, S.Pd., M.Pd</strong>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right text-xs">
              <p className="font-bold text-slate-800">Dra. Martha Ohee, M.Pd</p>
              <p className="text-emerald-700 font-medium">Wali Kelas 8.1</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-sm shadow">
              MO
            </div>
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              students={students}
              attendance={attendance}
              grades={grades}
              announcements={announcements}
              journal={journal}
              setActiveTab={setActiveTab}
              onOpenAiReport={(st) => setAiReportStudent(st || students[0])}
              onOpenPrintReport={() => setIsPrintModalOpen(true)}
            />
          )}

          {/* Tupoksi 1: Pengelolaan & Keadaan Peserta Didik */}
          {(activeTab === 'students-list' ||
            activeTab === 'students-attendance' ||
            activeTab === 'students-issues') && (
            <StudentManagement
              students={students}
              issues={issues}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onAddIssue={handleAddIssue}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 2: Penilaian & Karakter */}
          {(activeTab === 'behavior-attitude' ||
            activeTab === 'behavior-diligence' ||
            activeTab === 'behavior-rules') && (
            <BehaviorAssessmentView
              students={students}
              behaviors={behaviors}
              onUpdateBehavior={handleUpdateBehavior}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 3: Tindakan & Pembinaan */}
          {(activeTab === 'action-guidance' ||
            activeTab === 'action-oral' ||
            activeTab === 'action-special') && (
            <ActionGuidanceView
              students={students}
              warnings={warnings}
              onAddWarning={handleAddWarning}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 4: Langkah Tindak Lanjut */}
          {(activeTab === 'followup-grades' ||
            activeTab === 'followup-legger' ||
            activeTab === 'followup-promotion') && (
            <AcademicFollowupView
              students={students}
              subjects={subjects}
              grades={grades}
              onOpenAiReport={(st) => setAiReportStudent(st)}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 5: Administrasi Kelas */}
          {(activeTab === 'admin-seating' ||
            activeTab === 'admin-schedule' ||
            activeTab === 'admin-journal') && (
            <ClassAdminView
              students={students}
              schedule={schedule}
              cleaning={cleaning}
              seatMap={seatMap}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 6: Hubungan & Laporan */}
          {(activeTab === 'report-parents' ||
            activeTab === 'report-card' ||
            activeTab === 'report-print') && (
            <ParentCommunicationView
              students={students}
              comms={comms}
              onAddComm={handleAddComm}
              onOpenAiReport={(st) => setAiReportStudent(st)}
              onOpenPrintReport={() => setIsPrintModalOpen(true)}
              activeSubTab={activeTab}
            />
          )}

          {/* Tupoksi 7: Asisten AI Wali Kelas */}
          {activeTab === 'ai-narrative' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Generator Narasi Rapor AI Kurikulum Merdeka</span>
              </h3>
              <p className="text-xs text-slate-600">
                Pilih siswa pada menu Hubungan & Laporan atau Data Siswa untuk menghasilkan rapor naratif berbasis AI secara instan.
              </p>
            </div>
          )}

          {activeTab === 'ai-advisor' && (
            <JournalManager journal={journal} onAddJournal={handleAddJournal} />
          )}

          {/* Additional general tabs if accessed */}
          {activeTab === 'attendance-legacy' && (
            <AttendanceManager
              students={students}
              attendance={attendance}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}
        </main>
      </div>

      {/* AI Report Modal */}
      {aiReportStudent && (
        <AiReportModal
          student={aiReportStudent}
          onClose={() => setAiReportStudent(null)}
          attendance={attendance}
          grades={grades}
          p5={p5}
        />
      )}

      {/* Print Official Report Modal */}
      {isPrintModalOpen && (
        <PrintReportModal
          onClose={() => setIsPrintModalOpen(false)}
          students={students}
          attendance={attendance}
          grades={grades}
        />
      )}
    </div>
  );
}
