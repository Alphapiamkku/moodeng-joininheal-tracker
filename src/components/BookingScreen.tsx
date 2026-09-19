import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  UserCheck,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface BookingScreenProps {
  onSuccessNavigate: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({ onSuccessNavigate }) => {
  const { createAppointment } = useFirebase();

  const [counselor, setCounselor] = useState('อ.ดร. ภาวิณี สุวรรณรัตน์');
  const [sessionType, setSessionType] = useState<'On-site' | 'Online (Google Meet)'>('On-site');
  const [selectedDate, setSelectedDate] = useState('2024-10-25');
  const [selectedTime, setSelectedTime] = useState('14:00 - 15:00 น.');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const counselorsList = [
    {
      name: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
      role: 'นักจิตวิทยาคลินิกชำนาญการ',
      desc: 'ผู้เชี่ยวชาญด้านจิตวิทยาการปรึกษา การจัดการความเครียด และการนอนหลับ',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      available: 'ว่างวันพุธ และ วันศุกร์ (10:00 - 16:30 น.)'
    },
    {
      name: 'ดร. นฤมล ศรีสง่า',
      role: 'หัวหน้างานจิตวิทยาและการประเมินแรกรับ',
      desc: 'ผู้เชี่ยวชาญการประเมินสภาวะทางจิตวิทยาแรกเข้า และการแนะแนวพัฒนาการ',
      avatar: 'https://images.unsplash.com/photo-1580894732484-813c9a6338b5?auto=format&fit=crop&q=80&w=256',
      available: 'ว่างวันอังคาร และ วันพฤหัสบดี (09:00 - 15:00 น.)'
    }
  ];

  const timeSlots = [
    '09:30 - 10:30 น.',
    '11:00 - 12:00 น.',
    '13:30 - 14:30 น.',
    '14:00 - 15:00 น.',
    '15:30 - 16:30 น.'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsSubmitting(true);
    const chosenCounselor = counselorsList.find((c) => c.name === counselor) || counselorsList[0];

    await createAppointment({
      date: '25 ต.ค. 2567',
      time: selectedTime,
      status: 'upcoming',
      sessionNumber: 5,
      type: sessionType === 'On-site' ? 'ห้องให้คำปรึกษา C-204 (ศูนย์สุขภาวะ มข.)' : 'ออนไลน์ผ่าน Google Meet',
      counselorName: chosenCounselor.name,
      counselorRole: chosenCounselor.role,
      counselorAvatar: chosenCounselor.avatar,
      topic: topic.trim(),
      nextGoal: notes || 'ติดตามสภาวะอารมณ์และเสริมทักษะการเผชิญความวิตกกังวล',
      counselorNotes: 'ระบบบันทึกการนัดหมายลง Firebase (moodeng-joininheal-tracker) เรียบร้อยแล้ว'
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      onSuccessNavigate();
    }, 1500);
  };

  return (
    <div className="flex-1 w-full bg-[#fdfbf7] p-4 lg:p-8 space-y-6 max-w-[1200px] mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#c85a32]">
          <CalendarIcon className="w-4 h-4" />
          <span>ระบบจองคิวนัดหมายออนไลน์</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#221e1a] tracking-tight mt-1">
          จองเวลานัดหมายรับคำปรึกษาส่วนบุคคล
        </h1>
        <p className="text-xs sm:text-sm text-[#716962] mt-1">
          เลือกผู้เชี่ยวชาญ วันและเวลาที่สะดวก เพื่อพูดคุยในพื้นที่ปลอดภัยและรักษาความลับ
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-[#fffefb] border border-[#ebdccb] rounded-3xl p-12 text-center space-y-3 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#eef4ef] text-[#65856c] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-[#221e1a]">บันทึกการจองนัดหมายสำเร็จ!</h3>
          <p className="text-xs text-[#716962]">
            ข้อมูลนัดหมายถูกบันทึกสู่คลาวด์ Firebase และเพิ่มลงในหน้าประวัติเรียบร้อยแล้ว กำลังนำท่านกลับสู่หน้าประวัติ...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Booking Form */}
          <div className="lg:col-span-8 bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-6 shadow-xs space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Select Counselor */}
              <div className="space-y-2">
                <label className="font-bold text-[#3d3935] text-sm">
                  1. เลือกผู้เชี่ยวชาญที่ต้องการปรึกษา:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {counselorsList.map((c) => {
                    const isSelected = counselor === c.name;
                    return (
                      <div
                        key={c.name}
                        onClick={() => setCounselor(c.name)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#c85a32] bg-[#fef5ed] shadow-xs'
                            : 'border-[#ebdccb] hover:bg-[#fdfbf7]'
                        }`}
                      >
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#ebdccb]"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <h4 className="font-bold text-xs text-[#221e1a]">{c.name}</h4>
                          <p className="text-[11px] text-[#c85a32] font-medium">{c.role}</p>
                          <p className="text-[10px] text-[#716962] leading-tight line-clamp-2">
                            {c.desc}
                          </p>
                          <span className="text-[10px] text-[#65856c] font-semibold block pt-1">
                            {c.available}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service Channel */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-[#3d3935] text-sm">
                  2. เลือกรูปแบบการรับบริการ:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSessionType('On-site')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                      sessionType === 'On-site'
                        ? 'border-[#c85a32] bg-[#fef5ed] text-[#c85a32] font-bold'
                        : 'border-[#ebdccb] hover:bg-[#fdfbf7] text-[#574e47]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#c85a32] text-white flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs">พบตัวจริง (On-site)</div>
                      <div className="text-[10px] text-[#716962] font-normal">
                        ห้องให้คำปรึกษา C-204 อาคารกิจกรรม มข.
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSessionType('Online (Google Meet)')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                      sessionType === 'Online (Google Meet)'
                        ? 'border-[#c85a32] bg-[#fef5ed] text-[#c85a32] font-bold'
                        : 'border-[#ebdccb] hover:bg-[#fdfbf7] text-[#574e47]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#65856c] text-white flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs">ออนไลน์ (Google Meet)</div>
                      <div className="text-[10px] text-[#716962] font-normal">
                        ลิงก์ห้องสนทนาจะเปิดก่อนเวลา 15 นาที
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date and Time slots */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-[#3d3935] text-sm">
                  3. เลือกช่วงเวลา:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs ${
                          isSelected
                            ? 'border-[#c85a32] bg-[#fef5ed] text-[#c85a32] font-bold shadow-2xs'
                            : 'border-[#ebdccb] hover:bg-[#fdfbf7] text-[#574e47]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Topic */}
              <div className="space-y-1.5 pt-2">
                <label className="font-bold text-[#3d3935] text-sm">
                  4. เรื่องที่ต้องการปรึกษาเบื้องต้น: *
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="เช่น การจัดการความวิตกกังวลเรื่องผลการเรียน, ภาวะนอนไม่หลับ"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfcfbc] bg-[#fdfbf7] focus:border-[#c85a32] focus:ring-2 focus:ring-[#fbd5b5] outline-hidden text-xs"
                />
              </div>

              {/* Additional notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-[#574e47]">
                  ความคาดหวังหรือสิ่งที่ต้องการเน้นเพิ่มเติม:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ระบุข้อความถึงนักจิตวิทยา..."
                  className="w-full px-4 py-2 rounded-xl border border-[#dfcfbc] bg-[#fdfbf7] focus:border-[#c85a32] focus:ring-2 focus:ring-[#fbd5b5] outline-hidden text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#ebdccb]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl font-bold shadow-xs text-xs transition-all cursor-pointer"
                >
                  {isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการจองเวลานัดหมาย'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#c85a32]">
                <Info className="w-4 h-4" />
                <span>ข้อแนะนำก่อนรับบริการ</span>
              </div>
              <ul className="space-y-2 text-[#574e47] text-[11px] leading-relaxed list-disc list-inside">
                <li>บริการให้คำปรึกษานี้ไม่มีค่าใช้จ่ายสำหรับนักศึกษา มหาวิทยาลัยขอนแก่น</li>
                <li>การพูดคุยใช้เวลาครั้งละ 50 - 60 นาที</li>
                <li>หากไม่สะดวกตามวันเวลาที่นัดหมาย กรุณาแจ้งเลื่อนล่วงหน้าอย่างน้อย 24 ชั่วโมง</li>
                <li>กรณีเลือกรับบริการออนไลน์ กรุณาเตรียมสถานที่ที่เป็นส่วนตัวเพื่อความสบายใจ</li>
              </ul>
            </div>

            <div className="p-4 rounded-3xl bg-[#fef5ed] border border-[#fbd5b5] text-xs text-[#57423b] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#65856c] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong>การคุ้มครองความเป็นส่วนตัว:</strong> ข้อมูลทั้งหมดจะถูกจัดเก็บในระบบที่ปลอดภัยของ Firebase และเป็นความลับตามจรรยาบรรณวิชาชีพจิตวิทยา
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
