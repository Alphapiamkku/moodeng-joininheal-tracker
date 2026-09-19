import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Download, 
  Calendar, 
  Sparkles, 
  Smile, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  FileCheck, 
  Headphones, 
  BookHeart, 
  ClipboardList, 
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  ExternalLink,
  Star
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { Appointment } from '../types';

interface HistoryScreenProps {
  onOpenBooking: () => void;
  onOpenMoodDiary: () => void;
  onOpenAssessment: () => void;
  onOpenSOS: () => void;
  onOpenChatWithPsychologist: () => void;
  onDownloadReport: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onOpenBooking,
  onOpenMoodDiary,
  onOpenAssessment,
  onOpenSOS,
  onOpenChatWithPsychologist,
  onDownloadReport
}) => {
  const { appointments, activeFilter, setActiveFilter, updateAppointment } = useFirebase();

  // Audio player state for PMR exercise
  const [isPlayingPMR, setIsPlayingPMR] = useState<boolean>(false);
  const [pmrProgress, setPmrProgress] = useState<number>(35); // 35% elapsed

  // Toggle homework item completion
  const handleToggleHomework = async (aptId: string, hwId: string) => {
    const targetApt = appointments.find((a) => a.id === aptId);
    if (!targetApt || !targetApt.homework) return;

    const updatedHw = targetApt.homework.map((item) =>
      item.id === hwId ? { ...item, completed: !item.completed } : item
    );
    const completedCount = updatedHw.filter((i) => i.completed).length;
    const rate = Math.round((completedCount / updatedHw.length) * 100);

    await updateAppointment(aptId, {
      homework: updatedHw,
      homeworkCompletionRate: rate
    });
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (activeFilter === 'all') return true;
    return apt.status === activeFilter;
  });

  const totalCount = appointments.length;
  const upcomingCount = appointments.filter((a) => a.status === 'upcoming').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;

  return (
    <div className="flex-1 w-full bg-[#fdfbf7] p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Top Banner matching Image 3 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#fef5ed] border-l-4 border-[#e08d58] px-4 py-2.5 rounded-r-xl border-y border-r border-[#ebdccb]/60 text-xs text-[#57423b]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#c85a32] flex-shrink-0" />
          <span className="leading-snug">
            บันทึกทั้งหมดถูกจัดเก็บด้วยมาตรการรักษาความลับสูงสุดตาม พ.ร.บ. สุขภาพจิต และจรรยาบรรณวิชาชีพเฉพาะตัวคุณและผู้ให้คำปรึกษา
          </span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#716962]">
            <span className="w-2 h-2 rounded-full bg-[#65856c]"></span>
            <span>อัปเดตล่าสุด: 13 ต.ค. 2567 (10:15 น.)</span>
          </div>
          <button
            id="download-pdf-report"
            onClick={onDownloadReport}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#fffefb] hover:bg-[#faf2ec] border border-[#ebdccb] text-[#c85a32] rounded-lg text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ดาวน์โหลดรายงานสรุป (.PDF)</span>
          </button>
        </div>
      </div>

      {/* Header Title Section */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#c85a32] tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>เส้นทางการดูแลสุขภาวะทางจิต (WELLNESS JOURNEY)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#221e1a] tracking-tight mt-1">
          ประวัติการรับคำปรึกษาและบันทึกความก้าวหน้า
        </h1>
        <p className="text-sm text-[#716962] mt-1">
          ติดตามผลการฟื้นฟู สรุปแนวทางแบบฝึกหัด และการประเมินตนเองร่วมกับผู้เชี่ยวชาญ มหาวิทยาลัยขอนแก่น
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#ebdccb] pb-3">
        <button
          id="filter-all"
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#c85a32] text-white shadow-xs'
              : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
          }`}
        >
          ทั้งหมด ({totalCount})
        </button>
        <button
          id="filter-upcoming"
          onClick={() => setActiveFilter('upcoming')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === 'upcoming'
              ? 'bg-[#c85a32] text-white shadow-xs'
              : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
          }`}
        >
          นัดหมายที่กำลังจะมาถึง ({upcomingCount})
        </button>
        <button
          id="filter-completed"
          onClick={() => setActiveFilter('completed')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-[#c85a32] text-white shadow-xs'
              : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
          }`}
        >
          เสร็จสิ้นแล้ว ({completedCount})
        </button>
        <button
          id="filter-cancelled"
          onClick={() => setActiveFilter('cancelled')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === 'cancelled'
              ? 'bg-[#c85a32] text-white shadow-xs'
              : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
          }`}
        >
          ยกเลิก ({cancelledCount})
        </button>
      </div>

      {/* Three Metric Cards matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-[#fffefb] p-4 rounded-2xl border border-[#ebdccb] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[#716962] font-medium">บันทึกการพบนักจิตวิทยา</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#221e1a]">3</span>
              <span className="text-xs text-[#574e47]">ครั้ง (เสร็จสิ้น)</span>
            </div>
            <p className="text-[11px] text-[#c85a32] font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" /> มี 1 นัดหมายล่วงหน้าสัปดาห์นี้
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-[#c85a32]">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#fffefb] p-4 rounded-2xl border border-[#ebdccb] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[#716962] font-medium">ความต่อเนื่องการฝึกผ่อนคลายเครียด</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#221e1a]">85%</span>
              <span className="text-xs text-[#65856c] font-semibold">+12% จากเดือนก่อน</span>
            </div>
            <p className="text-[11px] text-[#716962]">
              ทำ PMR สม่ำเสมอ 6 จาก 7 วันล่าสุด
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-[#e08d58]">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#fffefb] p-4 rounded-2xl border border-[#ebdccb] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[#716962] font-medium">การประเมินตนเองล่าสุด (DASS-21)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#221e1a]">3 วัน</span>
              <span className="text-xs text-[#574e47]">ที่แล้ว</span>
            </div>
            <p className="text-[11px] text-[#65856c] font-medium flex items-center gap-1">
              <Smile className="w-3 h-3" /> อยู่ในเกณฑ์ 'วิตกกังวลระดับต่ำ'
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-[#c85a32]">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Layout: Left Column (Appointments) + Right Column (Trend & Tools) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Appointments (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#c85a32]" />
              <h2 className="text-base font-bold text-[#221e1a]">
                ประวัติการนัดหมายและการสนทนา
              </h2>
            </div>
            <span className="text-xs text-[#8c827a]">แสดงลำดับล่าสุดเป็นอันดับแรก</span>
          </div>

          {/* List of Appointment Cards */}
          <div className="space-y-4">
            {filteredAppointments.map((apt) => {
              if (apt.status === 'upcoming') {
                return (
                  /* Upcoming Appointment Card matching Image 3 */
                  <div
                    key={apt.id}
                    className="bg-[#fffefb] rounded-2xl border-2 border-[#fbd5b5] p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md"
                  >
                    {/* Top status header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdccb]/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c85a32] animate-ping"></span>
                        <span className="text-xs font-semibold text-[#c85a32]">
                          นัดหมายที่กำลังจะมาถึง
                        </span>
                        <span className="text-xs text-[#716962]">
                          รหัสนัด: {apt.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-[#221e1a] bg-[#fef5ed] px-2.5 py-1 rounded-md border border-[#fbd5b5]">
                        <Clock className="w-3.5 h-3.5 text-[#c85a32]" />
                        <span>อีก 4 วัน ({apt.date} | {apt.time})</span>
                      </div>
                    </div>

                    {/* Counselor Info */}
                    <div className="mt-4 flex items-start gap-3.5">
                      <img
                        src={apt.counselorAvatar}
                        alt={apt.counselorName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#fbd5b5] shadow-xs"
                      />
                      <div className="space-y-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-[#221e1a]">
                          {apt.counselorName}
                        </h3>
                        <p className="text-xs text-[#716962] flex flex-wrap items-center gap-1.5">
                          <span>{apt.counselorRole}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#c85a32]">
                            <MapPin className="w-3 h-3" />
                            {apt.type}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Next session goal */}
                    <div className="mt-3.5 p-3 rounded-xl bg-[#f6f1e8] text-xs text-[#3d3935] space-y-1">
                      <div className="font-semibold text-[#c85a32]">เป้าหมายการพูดคุยครั้งถัดไป:</div>
                      <p className="leading-relaxed">{apt.nextGoal}</p>
                    </div>

                    {/* Online room reminder */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#716962]">
                      <Video className="w-3.5 h-3.5 text-[#65856c]" />
                      <span>{apt.counselorNotes}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-[#ebdccb]/60 flex flex-wrap items-center justify-between gap-3">
                      <button
                        id="reschedule-button"
                        onClick={onOpenBooking}
                        className="px-4 py-2 text-xs font-medium text-[#574e47] hover:text-[#221e1a] bg-[#f6f1e8] hover:bg-[#ebdccb] rounded-xl transition-colors cursor-pointer"
                      >
                        เลื่อนนัดหมาย
                      </button>
                      <button
                        id="prepare-room-button"
                        onClick={onOpenChatWithPsychologist}
                        className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#c85a32] hover:bg-[#b34d28] rounded-xl shadow-xs transition-all cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>เตรียมความพร้อมเข้าห้องพบ</span>
                      </button>
                    </div>
                  </div>
                );
              }

              // Completed Session Cards
              return (
                <div
                  key={apt.id}
                  className="bg-[#fffefb] rounded-2xl border border-[#ebdccb] p-5 shadow-xs space-y-4 transition-all hover:shadow-md"
                >
                  {/* Status header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdccb]/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-medium text-[#2e5737] bg-[#eef4ef] px-2.5 py-0.5 rounded-full border border-[#cbe1d0]">
                        <CheckCircle2 className="w-3 h-3 text-[#65856c]" />
                        เสร็จสิ้นแล้ว
                      </span>
                      <span className="text-xs text-[#716962]">
                        {apt.isFirstIntake ? 'ครั้งที่ 1 (แรกรับ)' : `ครั้งที่ ${apt.sessionNumber}`} • {apt.date} | {apt.time}
                      </span>
                    </div>
                    <span className="text-xs text-[#8c827a] font-medium">
                      {apt.type}
                    </span>
                  </div>

                  {/* Topic & Counselor */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={apt.counselorAvatar}
                      alt={apt.counselorName}
                      className="w-11 h-11 rounded-full object-cover border border-[#ebdccb]"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#221e1a]">
                        {apt.topic}
                      </h3>
                      <p className="text-xs text-[#716962] mt-0.5">
                        ผู้ให้คำปรึกษา: <strong className="font-semibold text-[#3d3935]">{apt.counselorName}</strong> ({apt.counselorRole})
                      </p>
                    </div>
                  </div>

                  {/* Homework & Exercises Box (if present, like session 3) */}
                  {apt.homework && apt.homework.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#fef5ed] border border-[#fbd5b5] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#c85a32]">
                          <FileCheck className="w-4 h-4" />
                          <span>การติดตามผลและการบ้านเสริม (Homework & Exercises)</span>
                        </div>
                        <span className="text-xs font-semibold text-[#2e5737] bg-[#eef4ef] px-2 py-0.5 rounded-md border border-[#cbe1d0]">
                          เสร็จสิ้นแล้ว {apt.homeworkCompletionRate || 80}%
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {apt.homework.map((hw) => (
                          <div
                            key={hw.id}
                            onClick={() => handleToggleHomework(apt.id, hw.id)}
                            className="flex items-start gap-2.5 text-xs text-[#3d3935] cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <input
                              type="checkbox"
                              checked={hw.completed}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-[#c85a32] focus:ring-[#c85a32] cursor-pointer"
                            />
                            <div className="leading-snug">
                              <span className="font-semibold">{hw.title}:</span>{' '}
                              <span className="text-[#574e47]">{hw.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Materials (Session 2) */}
                  {apt.materials && apt.materials.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#f6f1e8] space-y-2">
                      <div className="text-xs font-bold text-[#3d3935]">เอกสารและสื่อเสริมการเรียนรู้:</div>
                      {apt.materials.map((mat, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-xs bg-[#fffefb] p-2.5 rounded-lg border border-[#ebdccb]">
                          <div className="flex items-center gap-2 text-[#3d3935]">
                            <span className="text-red-500 font-bold">PDF</span>
                            <span>{mat.title}</span>
                            <span className="text-[11px] text-[#8c827a]">• {mat.size}</span>
                          </div>
                          <button
                            onClick={() => alert(`ดาวน์โหลด ${mat.title}`)}
                            className="flex items-center gap-1 text-[#c85a32] hover:text-[#b34d28] font-medium cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ดาวน์โหลด</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Counselor Clinical Note */}
                  {apt.counselorNotes && (
                    <div className="p-3 rounded-xl bg-[#fff8f4] border-l-3 border-[#c85a32] text-xs text-[#57423b] italic leading-relaxed">
                      "{apt.counselorNotes}"
                    </div>
                  )}

                  {/* Intake details and scores (Session 1) */}
                  {apt.isFirstIntake && apt.stressScore && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-[#fff8f4] border border-[#fbd5b5] text-[#c85a32] font-medium">
                        คะแนนความเครียดแรกเข้า: {apt.stressScore}/10
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#eef4ef] text-[#2e5737] font-medium border border-[#cbe1d0]">
                        ส่งต่อเคสสมบูรณ์
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#f6f1e8] text-[#574e47]">
                        บันทึกการประเมินแรกรับ
                      </span>
                    </div>
                  )}

                  {/* Bottom Actions matching Image 3 */}
                  <div className="pt-3 border-t border-[#ebdccb]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      {apt.rating && (
                        <div className="flex items-center gap-1 text-[#e08d58] font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>ประเมินความพึงพอใจเรียบร้อย ({apt.rating}/5 ดาว)</span>
                        </div>
                      )}
                      <button
                        onClick={() => alert(`ดูสรุปประเมินการสนทนารอบ ${apt.date}`)}
                        className="text-[#c85a32] hover:underline font-medium cursor-pointer"
                      >
                        ดูบันทึกสรุปคำแนะนำฉบับเต็ม
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={onOpenAssessment}
                        className="px-3 py-1.5 rounded-lg border border-[#ebdccb] hover:bg-[#f6f1e8] text-[#574e47] font-medium cursor-pointer"
                      >
                        ทำแบบประเมินหลังรับบริการ
                      </button>
                      <button
                        onClick={onOpenBooking}
                        className="px-3 py-1.5 rounded-lg bg-[#c85a32] hover:bg-[#b34d28] text-white font-medium cursor-pointer"
                      >
                        + นัดติดตามผลต่อเนื่อง
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Empirical Trend & Personal Tools (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Empirical Trend Graph matching Image 3 */}
          <div className="bg-[#fffefb] rounded-2xl border border-[#ebdccb] p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#8c827a] uppercase tracking-wide">
                  การติดตามผลเชิงประจักษ์
                </span>
                <h3 className="text-base font-bold text-[#221e1a] flex items-center gap-1.5">
                  แนวโน้มระดับความเครียด & สุขภาวะ
                </h3>
              </div>
              <span className="text-xs font-bold text-[#65856c] bg-[#eef4ef] px-2 py-0.5 rounded-md border border-[#cbe1d0]">
                ลดลง 43%
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] text-[#716962] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c85a32]"></span>
                <span>ระดับความเครียด (คะแนนเต็ม 10)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65856c]"></span>
                <span>ความสามารถในการจัดการอารมณ์</span>
              </div>
            </div>

            {/* SVG Trend Graph matching Screenshot */}
            <div className="w-full h-44 relative bg-[#fdfbf7] rounded-xl p-3 border border-[#ebdccb]/60 flex flex-col justify-between">
              {/* Y Axis Guide Lines */}
              <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-dashed border-[#8a726a] w-full"></div>
                <div className="border-b border-dashed border-[#8a726a] w-full"></div>
                <div className="border-b border-dashed border-[#8a726a] w-full"></div>
              </div>

              {/* Dynamic SVG Curves */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                {/* Area Fill for Stress */}
                <path
                  d="M 30,30 L 150,55 L 270,85 L 270,110 L 30,110 Z"
                  fill="url(#stressGrad)"
                  opacity="0.15"
                />
                {/* Area Fill for Emotional Management */}
                <path
                  d="M 30,80 L 150,50 L 270,25 L 270,110 L 30,110 Z"
                  fill="url(#sageGrad)"
                  opacity="0.1"
                />

                <defs>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c85a32" />
                    <stop offset="100%" stopColor="#fff8f4" />
                  </linearGradient>
                  <linearGradient id="sageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#65856c" />
                    <stop offset="100%" stopColor="#fff8f4" />
                  </linearGradient>
                </defs>

                {/* Stress Line (Declining from 7.2 to 4.1) */}
                <path
                  d="M 30,30 L 150,55 L 270,85"
                  fill="none"
                  stroke="#c85a32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Data Points Stress */}
                <circle cx="30" cy="30" r="4" fill="#c85a32" />
                <text x="30" y="22" textAnchor="middle" fontSize="9" fill="#c85a32" fontWeight="bold">7.2/10</text>

                <circle cx="150" cy="55" r="4" fill="#c85a32" />
                <text x="150" y="47" textAnchor="middle" fontSize="9" fill="#c85a32" fontWeight="bold">5.8/10</text>

                <circle cx="270" cy="85" r="4" fill="#c85a32" />
                <text x="270" y="77" textAnchor="middle" fontSize="9" fill="#c85a32" fontWeight="bold">4.1/10</text>

                {/* Emotional Management Line (Rising) */}
                <path
                  d="M 30,80 L 150,50 L 270,25"
                  fill="none"
                  stroke="#65856c"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="80" r="3" fill="#65856c" />
                <circle cx="150" cy="50" r="3" fill="#65856c" />
                <circle cx="270" cy="25" r="3" fill="#65856c" />
              </svg>

              {/* X Axis Labels */}
              <div className="flex items-center justify-between text-[10px] text-[#716962] pt-1">
                <span>5 ส.ค. (แรกรับ)</span>
                <span>26 ก.ย. (ครั้งที่ 2)</span>
                <span>10 ต.ค. (ล่าสุด)</span>
              </div>
            </div>

            {/* Current status tag */}
            <div className="p-2.5 rounded-xl bg-[#eef4ef] text-xs text-[#2e5737] flex items-center justify-between">
              <span className="text-[#65856c]">สถานะปัจจุบัน:</span>
              <span className="font-semibold">เสถียรขึ้น ความเครียดลดลงอยู่ในเกณฑ์ปกติ</span>
            </div>
          </div>

          {/* Card 2: Note from Psychologist quote matching Image 3 */}
          <div className="bg-[#fffefb] rounded-2xl border border-[#ebdccb] p-5 shadow-xs relative">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#fef5ed] flex items-center justify-center text-[#c85a32] font-serif text-lg font-bold flex-shrink-0">
                “
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#8c827a]">
                  บันทึกข้อความจากนักจิตวิทยา
                </span>
                <p className="text-xs text-[#3d3935] leading-relaxed italic">
                  "มีความก้าวหน้าอย่างชัดเจนในการจัดการเวลาและการรับรู้ความรู้สึกตนเอง ร่างกายตอบสนองต่อการผ่อนคลายกล้ามเนื้อได้เร็วขึ้นอย่างมากในการประเมินรอบล่าสุด ขอให้ภูมิใจในความพยายามของตนเองนะคะ"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#ebdccb]/60 text-[11px] text-[#716962]">
                  <span className="font-semibold text-[#221e1a]">อ.ดร. ภาวิณี สุวรรณรัตน์</span>
                  <span>บันทึกเมื่อ 10 ต.ค. 2567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Personal Support Tools */}
          <div className="bg-[#fffefb] rounded-2xl border border-[#ebdccb] p-5 shadow-xs space-y-3">
            <div className="text-xs font-semibold text-[#8c827a] uppercase tracking-wide">
              เครื่องมือสนับสนุนสุขภาพจิตส่วนบุคคล
            </div>

            <div className="space-y-2.5">
              {/* Item 1: Audio PMR */}
              <div className="p-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingPMR(!isPlayingPMR)}
                      className="w-9 h-9 rounded-full bg-[#c85a32] hover:bg-[#b34d28] text-white flex items-center justify-center shadow-xs cursor-pointer flex-shrink-0"
                    >
                      {isPlayingPMR ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#221e1a]">
                        คลิปเสียงนำฝึก PMR ฉบับ มข. (15 นาที)
                      </h4>
                      <p className="text-[11px] text-[#716962]">
                        จัดทำโดยศูนย์สุขภาวะ มหาวิทยาลัยขอนแก่น
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8c827a]" />
                </div>

                {isPlayingPMR && (
                  <div className="mt-2.5 pt-2 border-t border-[#ebdccb]/60 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#716962]">
                      <span className="text-[#c85a32] font-semibold">กำลังเล่นเสียงนำฝึก...</span>
                      <span>05:15 / 15:00 น.</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#f6f1e8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c85a32] rounded-full w-[35%] animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Item 2: Mood Diary */}
              <button
                id="open-mood-diary-btn"
                onClick={onOpenMoodDiary}
                className="w-full p-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#eef4ef] text-[#65856c] flex items-center justify-center flex-shrink-0">
                    <BookHeart className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#221e1a]">
                      บันทึกอารมณ์ประจำวัน (Mood Diary)
                    </h4>
                    <p className="text-[11px] text-[#e08d58] font-medium">
                      บันทึกของวันนี้ยังไม่สมบูรณ์
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8c827a]" />
              </button>

              {/* Item 3: Assessment 2Q / 9Q */}
              <button
                id="open-assessment-btn"
                onClick={onOpenAssessment}
                className="w-full p-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#fef5ed] text-[#c85a32] flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#221e1a]">
                      ทำแบบประเมินภาวะอารมณ์รอบสัปดาห์ (2Q / 9Q)
                    </h4>
                    <p className="text-[11px] text-[#716962]">
                      ครบกำหนดทำในอีก 4 วัน
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8c827a]" />
              </button>
            </div>
          </div>

          {/* Emergency Crisis Callout matching Image 3 */}
          <div className="p-4 rounded-2xl bg-[#fef0ed] border border-[#f5c6cb] space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#b83a2c]">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>หากรู้สึกไม่ไหวในทันที</span>
            </div>
            <p className="text-[#691b12] text-[11px] leading-relaxed">
              ท่านไม่ต้องรอนัดหมาย สามารถติดต่อสายด่วนสุขภาพจิต มข. หรือกดปุ่ม SOS ด้านบนเพื่อประสานงานเจ้าหน้าที่เวรได้ตลอด 24 ชั่วโมง
            </p>
            <button
              onClick={onOpenSOS}
              className="w-full py-1.5 rounded-lg bg-[#b83a2c] hover:bg-[#a13124] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              ติดต่อเจ้าหน้าที่เวรฉุกเฉินทันที
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
