import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  TrendingDown, 
  Smile, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Heart,
  Activity,
  ShoppingBag,
  Edit3,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { EggHatcheryCard } from './EggHatcheryCard';
import { HatchedCharacter } from '../types';

interface OverviewDashboardProps {
  onNavigate: (tab: 'booking' | 'history' | 'knowledge' | 'chat') => void;
  onOpenMoodDiary: () => void;
  onOpenAssessment: (toolId?: string) => void;
  onOpenSanctuary: () => void;
  onEggHatched: (character: HatchedCharacter) => void;
  onOpenProfile?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onOpenMoodDiary,
  onOpenAssessment,
  onOpenSanctuary,
  onEggHatched,
  onOpenProfile
}) => {
  const { user, appointments, moodHistory, gamification } = useFirebase();

  const upcomingApt = appointments.find((a) => a.status === 'upcoming');
  const latestMood = moodHistory[0];

  const studentNickname = user?.nickname || user?.displayName || 'น้องมายด์';
  const studentFaculty = user?.faculty || 'คณะแพทยศาสตร์';
  const studentYear = user?.yearLevel || 'ชั้นปีที่ 3 (Junior)';

  return (
    <div className="flex-1 w-full bg-[#fdfbf7] p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#fef5ed] via-[#fffaf6] to-[#fef5ed] border border-[#fbd5b5] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c85a32]">
            <Sparkles className="w-4 h-4" />
            <span>ยินดีต้อนรับสู่ KKU Student Wellness & Counseling System</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#221e1a]">
              สวัสดีค่ะ, {studentNickname} 🌿
            </h1>
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                id="edit-profile-overview-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fffefb] hover:bg-[#f6f1e8] text-[#574e47] hover:text-[#c85a32] border border-[#ebdccb] hover:border-[#c85a32] text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
                title="คลิกเพื่อตั้งชื่อเล่นที่ชอบ และอัปเดตคณะ-ชั้นปี"
              >
                <Edit3 className="w-3 h-3 text-[#c85a32] group-hover:scale-110 transition-transform" />
                <span>ตั้งชื่อเล่น / ข้อมูลคณะ</span>
              </button>
            )}
          </div>

          {/* Student study data badges (Faculty and Academic Year) */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-[#716962] pt-0.5">
            <span className="inline-flex items-center gap-1 font-semibold text-[#c85a32] bg-[#fffefb] px-2.5 py-0.5 rounded-lg border border-[#fbd5b5]">
              <Building2 className="w-3.5 h-3.5" />
              <span>{studentFaculty}</span>
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-[#2e5737] bg-[#eef4ef] px-2.5 py-0.5 rounded-lg border border-[#cbe1d0]">
              <GraduationCap className="w-3.5 h-3.5 text-[#65856c]" />
              <span>{studentYear}</span>
            </span>
            {user?.studentId && (
              <span className="text-[11px] text-[#8c827a] font-mono">
                รหัส {user.studentId}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#716962] pt-1">
            สุขภาวะทางจิตของคุณมีแนวโน้มพัฒนาขึ้นอย่างต่อเนื่อง ข้อมูลทั้งหมดถูกเชื่อมต่อกับ Firebase (moodeng-joininheal-tracker)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            onClick={onOpenMoodDiary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            <span>เช็คอินอารมณ์วันนี้</span>
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fffefb] hover:bg-[#f6f1e8] text-[#574e47] border border-[#ebdccb] text-xs font-semibold transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#c85a32]" />
            <span>ทักแชทนักจิตวิทยา</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] shadow-xs space-y-1">
          <span className="text-xs text-[#716962] font-medium">ระดับความเครียดล่าสุด</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#221e1a]">4.1 / 10</span>
            <span className="text-xs font-semibold text-[#65856c]">ลดลง 43%</span>
          </div>
          <p className="text-[11px] text-[#65856c]">อยู่ในเกณฑ์ปกติ สมดุลดี</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] shadow-xs space-y-1">
          <span className="text-xs text-[#716962] font-medium">การเข้าพบผู้เชี่ยวชาญ</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#221e1a]">3 ครั้ง</span>
            <span className="text-xs text-[#574e47]">เสร็จสิ้น</span>
          </div>
          <p className="text-[11px] text-[#c85a32]">มีนัดถัดไป 18 ต.ค. 2567</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] shadow-xs space-y-1">
          <span className="text-xs text-[#716962] font-medium">ฝึกผ่อนคลายกล้ามเนื้อ (PMR)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#221e1a]">85%</span>
            <span className="text-xs text-[#65856c]">+12% เดือนนี้</span>
          </div>
          <p className="text-[11px] text-[#716962]">สม่ำเสมอ 6/7 วันล่าสุด</p>
        </div>

        <div 
          onClick={() => onOpenAssessment('DASS-21')}
          className="p-5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] hover:border-[#c85a32] shadow-xs space-y-1 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#716962] font-medium">ผลประเมิน DASS-21</span>
            <span className="text-[10px] text-[#c85a32] font-semibold underline">ทำซ้ำ</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#221e1a]">ไตรภาคี</span>
            <span className="text-xs text-[#2e5737] bg-[#eef4ef] px-1.5 py-0.5 rounded">ปกติ</span>
          </div>
          <p className="text-[11px] text-[#716962]">เครียดปกติ • วิตกกังวลปกติ • ซึมเศร้าปกติ</p>
        </div>
      </div>

      {/* Gamification: 7-Day Egg Hatching & Character Farm */}
      <EggHatcheryCard
        onOpenMoodDiary={onOpenMoodDiary}
        onOpenSanctuary={onOpenSanctuary}
        onEggHatched={onEggHatched}
      />

      {/* Grid: Upcoming Next Session & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upcoming Session Spotlight */}
        <div className="lg:col-span-7 bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#ebdccb]/60 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c85a32]" />
              <h3 className="font-bold text-[#221e1a]">นัดหมายที่กำลังจะมาถึง</h3>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs text-[#c85a32] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>ดูประวัติทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {upcomingApt ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c85a32] bg-[#fef5ed] px-3 py-1 rounded-full border border-[#fbd5b5]">
                  อีก 4 วัน ({upcomingApt.date} | {upcomingApt.time})
                </span>
                <span className="text-xs text-[#716962]">รหัสนัด: {upcomingApt.code}</span>
              </div>

              <div className="flex items-start gap-3.5 pt-1">
                <img
                  src={upcomingApt.counselorAvatar}
                  alt={upcomingApt.counselorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#fbd5b5]"
                />
                <div>
                  <h4 className="font-bold text-[#221e1a]">{upcomingApt.counselorName}</h4>
                  <p className="text-xs text-[#716962]">{upcomingApt.counselorRole}</p>
                  <p className="text-xs text-[#c85a32] font-medium mt-0.5">{upcomingApt.type}</p>
                </div>
              </div>

              <div className="p-3 bg-[#f6f1e8] rounded-2xl text-xs text-[#3d3935] space-y-1">
                <span className="font-semibold text-[#c85a32]">เป้าหมายครั้งถัดไป:</span>
                <p className="leading-relaxed">{upcomingApt.nextGoal}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => onNavigate('booking')}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#574e47] hover:bg-[#f6f1e8] cursor-pointer"
                >
                  เลื่อนนัดหมาย
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#c85a32] hover:bg-[#b34d28] shadow-xs cursor-pointer"
                >
                  เตรียมตัวเข้าห้องพบ
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#716962]">
              ไม่มีนัดหมายที่กำลังจะมาถึงในขณะนี้
            </div>
          )}
        </div>

        {/* Action Shortcuts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-6 shadow-xs space-y-3.5">
            <h3 className="font-bold text-[#221e1a] text-sm">บริการแนะนำประจำวัน</h3>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => onNavigate('chat')}
                className="w-full p-3 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef5ed] text-[#c85a32] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#221e1a]">สนทนากับนักจิตวิทยาประจำตัว</h4>
                    <p className="text-[11px] text-[#716962]">อ.ดร. ภาวิณี กำลังออนไลน์</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8c827a]" />
              </button>

              <button
                onClick={() => onOpenAssessment('ST-5')}
                className="w-full p-3 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#eef4ef] text-[#65856c] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#221e1a]">คัดกรองความเครียดและวิตกกังวล</h4>
                    <p className="text-[11px] text-[#716962]">ST-5 (ความเครียด), GAD-7, DASS-21</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8c827a]" />
              </button>

              <button
                onClick={() => onNavigate('knowledge')}
                className="w-full p-3 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef5ed] text-[#e08d58] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#221e1a]">คลังแบบฝึกหัดคลายเครียด</h4>
                    <p className="text-[11px] text-[#716962]">เทคนิคผ่อนคลายกล้ามเนื้อ PMR & Box Breathing</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8c827a]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
