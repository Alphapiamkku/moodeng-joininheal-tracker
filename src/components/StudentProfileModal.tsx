import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Smile, 
  IdCard, 
  Building2,
  Lock,
  Heart
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { KKU_FACULTIES, KKU_YEAR_LEVELS } from '../data/gamificationData';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NICKNAME_IDEAS = [
  'น้องมายด์',
  'พี่บอส',
  'แพรวพราว',
  'กานต์',
  'ไข่ดาว',
  'ต้นกล้า',
  'ข้าวปั้น',
  'มอดินแดงแฟนคลับ'
];

const MASCOT_AVATARS = [
  { icon: '🦛', label: 'น้องหมูเด้ง', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256' },
  { icon: '🐿️', label: 'กระรอกมอดินแดง', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256' },
  { icon: '🪷', label: 'บัวศรีฐาน', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256' },
  { icon: '🦖', label: 'ไดโนพูเวียง', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256' },
  { icon: '🌸', label: 'ดอกกาลพฤกษ์', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=256' },
  { icon: '🦇', label: 'ค้างคาวภูผาม่าน', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256' }
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, updateUserProfile } = useFirebase();

  const [nickname, setNickname] = useState<string>(user?.nickname || user?.displayName || 'น้องมายด์');
  const [faculty, setFaculty] = useState<string>(user?.faculty || 'คณะแพทยศาสตร์');
  const [yearLevel, setYearLevel] = useState<string>(user?.yearLevel || 'ชั้นปีที่ 3 (Junior)');
  const [studentId, setStudentId] = useState<string>(user?.studentId || '643040182-3');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(user?.photoURL || MASCOT_AVATARS[0].url);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync state whenever modal opens or user profile changes
  useEffect(() => {
    if (user) {
      setNickname(user.nickname || user.displayName || 'น้องมายด์');
      setFaculty(user.faculty || 'คณะแพทยศาสตร์');
      setYearLevel(user.yearLevel || 'ชั้นปีที่ 3 (Junior)');
      setStudentId(user.studentId || '643040182-3');
      if (user.photoURL) setSelectedPhoto(user.photoURL);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await updateUserProfile({
      nickname: nickname.trim() || 'นักศึกษา มข.',
      faculty,
      yearLevel,
      studentId: studentId.trim(),
      photoURL: selectedPhoto
    });

    setIsSubmitting(false);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-xl rounded-3xl border border-[#ebdccb] shadow-2xl overflow-hidden relative animate-in fade-in duration-200 my-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#fef5ed] via-[#fff8f4] to-[#fef5ed] border-b border-[#fbd5b5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#c85a32] text-white flex items-center justify-center shadow-xs">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#221e1a] leading-tight">
                ตั้งชื่อเล่นและข้อมูลนักศึกษา มข.
              </h2>
              <p className="text-xs text-[#716962] leading-tight">
                Student Profile & Safe Preferred Name
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8c827a] hover:text-[#221e1a] hover:bg-[#f6f1e8] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Reassurance Callout */}
          <div className="p-3.5 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-start gap-3 text-xs text-[#57423b]">
            <ShieldCheck className="w-5 h-5 text-[#c85a32] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold leading-snug">
                พื้นที่ปลอดภัยและความเป็นส่วนตัว (Safe & Confidential Space)
              </p>
              <p className="text-[11px] text-[#716962] leading-relaxed">
                คุณสามารถตั้ง<strong>ชื่อเล่นหรือนามแฝง</strong>ได้ตามใจ เพื่อความสบายใจในการสื่อสาร โดยระบบจะ<strong>จัดเก็บข้อมูลคณะและชั้นปีไว้</strong> เพื่อช่วยให้นักจิตวิทยาและระบบให้คำแนะนำที่สอดคล้องกับบริบทการเรียนของคุณ
              </p>
            </div>
          </div>

          {/* FIELD 1: Nickname */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#221e1a] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#c85a32]" />
                <span>ชื่อเล่น / นามแฝงที่อยากให้เรียก (Preferred Name)</span>
              </span>
              <span className="text-[11px] text-[#c85a32] font-semibold">ตั้งได้ตามใจชอบ</span>
            </label>

            <input
              type="text"
              required
              maxLength={30}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="เช่น น้องมายด์, บอส, แพรว, ข้าวปั้น หรือนามแฝงที่คุณสบายใจ"
              className="w-full text-sm px-4 py-2.5 rounded-2xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] shadow-2xs font-medium"
            />

            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-[#8c827a]">ไอเดียชื่อเล่น:</span>
              {NICKNAME_IDEAS.map((idea) => (
                <button
                  type="button"
                  key={idea}
                  onClick={() => setNickname(idea)}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                    nickname === idea
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : 'bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47] border-[#ebdccb]'
                  }`}
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          {/* FIELD 2: Faculty */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#221e1a] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#c85a32]" />
                <span>คณะที่กำลังศึกษา (Faculty)</span>
              </span>
              <span className="text-[11px] text-[#65856c] font-semibold">เก็บรักษาข้อมูลอย่างเป็นระบบ</span>
            </label>

            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] shadow-2xs cursor-pointer"
            >
              {KKU_FACULTIES.map((fac) => (
                <option key={fac} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>

          {/* FIELD 3: Academic Year Level */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#221e1a] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#c85a32]" />
                <span>ชั้นปีที่กำลังศึกษา (Academic Year)</span>
              </span>
              <span className="text-[11px] text-[#65856c] font-semibold">เก็บรักษาข้อมูล</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {KKU_YEAR_LEVELS.map((yr) => (
                <button
                  type="button"
                  key={yr}
                  onClick={() => setYearLevel(yr)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                    yearLevel === yr
                      ? 'bg-[#fef5ed] border-[#c85a32] text-[#c85a32] font-semibold shadow-2xs'
                      : 'bg-[#fdfbf7] border-[#ebdccb] text-[#574e47] hover:bg-[#f6f1e8]'
                  }`}
                >
                  <span className="truncate">{yr}</span>
                  {yearLevel === yr && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* FIELD 4: Student ID (Optional) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#221e1a] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IdCard className="w-4 h-4 text-[#c85a32]" />
                <span>รหัสนักศึกษา (Student ID - ไม่บังคับ)</span>
              </span>
              <span className="text-[11px] text-[#8c827a] flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#65856c]" />
                <span>เข้ารหัสความลับ</span>
              </span>
            </label>

            <input
              type="text"
              maxLength={15}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="เช่น 643040182-3 (จัดเก็บเป็นความลับสูงสุด)"
              className="w-full text-sm px-4 py-2.5 rounded-2xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] shadow-2xs font-mono"
            />
          </div>

          {/* FIELD 5: Choose Avatar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#221e1a] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#c85a32]" />
                <span>เลือกรูปหรือมาสคอตประจำตัว</span>
              </span>
              <span className="text-[11px] text-[#716962]">แสดงในสวนและแชท</span>
            </label>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {MASCOT_AVATARS.map((m) => (
                <button
                  type="button"
                  key={m.label}
                  onClick={() => setSelectedPhoto(m.url)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    selectedPhoto === m.url
                      ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-2xs'
                      : 'bg-[#fdfbf7] hover:bg-[#f6f1e8] text-[#574e47] border-[#ebdccb]'
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* LIVE PREVIEW CARD */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fef5ed] to-[#fff8f4] border border-[#fbd5b5] space-y-2">
            <div className="text-[11px] font-bold text-[#c85a32] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ตัวอย่างการแสดงผลในระบบ (Live Preview)</span>
            </div>

            <div className="flex items-center gap-3 bg-[#fffefb] p-3 rounded-xl border border-[#ebdccb]">
              <img
                src={selectedPhoto}
                alt="preview"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#fbd5b5] shadow-2xs"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#221e1a]">
                    {nickname.trim() || 'ชื่อเล่นของคุณ'}
                  </span>
                  <span className="text-[10px] font-semibold text-[#65856c] bg-[#eef4ef] px-2 py-0.5 rounded-md border border-[#cbe1d0]">
                    นักศึกษา มข.
                  </span>
                </div>
                <div className="text-xs text-[#716962] font-medium flex items-center gap-1 mt-0.5 truncate">
                  <span>{faculty}</span>
                  <span>•</span>
                  <span>{yearLevel.replace(/\(.*\)/, '').trim()}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8c827a] italic">
              * ชื่อเล่นนี้จะแสดงในบทสนทนากับนักจิตวิทยาและในสวนฮีลใจ ส่วนข้อมูลคณะและชั้นปีจะถูกนำไปใช้อย่างเหมาะสม
            </p>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#ebdccb]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#716962] hover:bg-[#f6f1e8] transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>บันทึกสำเร็จแล้ว!</span>
                </>
              ) : isSubmitting ? (
                <span>กำลังบันทึกข้อมูล...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>บันทึกข้อมูลนักศึกษา</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
