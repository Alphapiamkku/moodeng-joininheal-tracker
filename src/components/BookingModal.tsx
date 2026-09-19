import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, CheckCircle, UserCheck } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { createAppointment } = useFirebase();

  const [counselor, setCounselor] = useState('อ.ดร. ภาวิณี สุวรรณรัตน์');
  const [sessionType, setSessionType] = useState<'On-site' | 'Online (Google Meet)'>('On-site');
  const [selectedDate, setSelectedDate] = useState('2024-10-25');
  const [selectedTime, setSelectedTime] = useState('14:00 - 15:00 น.');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const counselorsList = [
    {
      name: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
      role: 'นักจิตวิทยาคลินิกชำนาญการ',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      available: 'ว่างวันพุธ และ วันศุกร์'
    },
    {
      name: 'ดร. นฤมล ศรีสง่า',
      role: 'หัวหน้างานจิตวิทยาและการประเมินแรกรับ',
      avatar: 'https://images.unsplash.com/photo-1580894732484-813c9a6338b5?auto=format&fit=crop&q=80&w=256',
      available: 'ว่างวันอังคาร และ วันพฤหัสบดี'
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

    const formattedDate = '25 ต.ค. 2567';

    await createAppointment({
      date: formattedDate,
      time: selectedTime,
      status: 'upcoming',
      sessionNumber: 5,
      type: sessionType === 'On-site' ? 'ห้องให้คำปรึกษา C-204 (ศูนย์สุขภาวะ มข.)' : 'ออนไลน์ผ่าน Google Meet',
      counselorName: chosenCounselor.name,
      counselorRole: chosenCounselor.role,
      counselorAvatar: chosenCounselor.avatar,
      topic: topic.trim(),
      nextGoal: notes || 'ติดตามสภาวะอารมณ์และเสริมทักษะการเผชิญความวิตกกังวล',
      counselorNotes: 'ระบบบันทึกการนัดหมายลง Firebase เรียบร้อยแล้ว'
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-lg rounded-3xl border border-[#ebdccb] shadow-2xl p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c85a32]">
            <Calendar className="w-4 h-4" />
            <span>นัดหมายรับคำปรึกษา</span>
          </div>
          <h3 className="text-xl font-bold text-[#221e1a] mt-1">
            จองเวลานัดหมายกับนักจิตวิทยา
          </h3>
          <p className="text-xs text-[#716962] mt-0.5">
            ข้อมูลการนัดหมายจะถูกจัดเก็บลงฐานข้อมูล Firebase แบบเรียลไทม์
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#eef4ef] text-[#65856c] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#221e1a]">
              บันทึกการนัดหมายเรียบร้อยแล้ว!
            </h4>
            <p className="text-xs text-[#716962]">
              ท่านสามารถดูตารางนัดหมายได้ที่หน้ารายการประวัติการรับคำปรึกษา
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Choose Counselor */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">เลือกผู้ให้คำปรึกษา:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {counselorsList.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => setCounselor(c.name)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      counselor === c.name
                        ? 'border-[#c85a32] bg-[#fef5ed]'
                        : 'border-[#ebdccb] hover:bg-[#fdfbf7]'
                    }`}
                  >
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="min-w-0">
                      <div className="font-bold text-[#221e1a] truncate">{c.name}</div>
                      <div className="text-[10px] text-[#716962] truncate">{c.available}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Channel */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">รูปแบบการรับบริการ:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSessionType('On-site')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-medium cursor-pointer transition-colors ${
                    sessionType === 'On-site'
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : 'border-[#ebdccb] text-[#574e47] hover:bg-[#f6f1e8]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>พบตัวจริง (On-site C-204)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSessionType('Online (Google Meet)')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-medium cursor-pointer transition-colors ${
                    sessionType === 'Online (Google Meet)'
                      ? 'bg-[#c85a32] text-white border-[#c85a32]'
                      : 'border-[#ebdccb] text-[#574e47] hover:bg-[#f6f1e8]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>ออนไลน์ (Google Meet)</span>
                </button>
              </div>
            </div>

            {/* Time slot */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">เลือกช่วงเวลาที่สะดวก:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedTime === slot
                        ? 'bg-[#fef5ed] border-[#c85a32] text-[#c85a32] font-bold'
                        : 'border-[#ebdccb] hover:bg-[#f6f1e8] text-[#574e47]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">เรื่องที่ต้องการปรึกษาเบื้องต้น: *</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="เช่น การจัดการความวิตกกังวลเรื่องการเรียน, การปรับตัว"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfcfbc] bg-[#fdfbf7] focus:border-[#c85a32] focus:ring-2 focus:ring-[#fbd5b5] outline-hidden text-xs"
              />
            </div>

            {/* Goal / Notes */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">ข้อความเพิ่มเติมถึงผู้ให้คำปรึกษา:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ระบุสิ่งที่ต้องการให้เน้นเป็นพิเศษ..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#dfcfbc] bg-[#fdfbf7] focus:border-[#c85a32] focus:ring-2 focus:ring-[#fbd5b5] outline-hidden text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[#716962] hover:bg-[#f6f1e8] rounded-xl font-medium cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
              >
                {isSubmitting ? 'กำลังบันทึกลง Firebase...' : 'ยืนยันการนัดหมาย'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
