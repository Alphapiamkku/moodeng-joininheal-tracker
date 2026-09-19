import React, { useState } from 'react';
import { X, Heart, Smile, Meh, Frown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface MoodDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoodDiaryModal: React.FC<MoodDiaryModalProps> = ({ isOpen, onClose }) => {
  const { addMoodLog, gamification } = useFirebase();

  const [moodLevel, setMoodLevel] = useState<'calm' | 'good' | 'neutral' | 'stressed' | 'exhausted'>('calm');
  const [stressScore, setStressScore] = useState<number>(4);
  const [note, setNote] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const moods: { id: 'calm' | 'good' | 'neutral' | 'stressed' | 'exhausted'; label: string; icon: string }[] = [
    { id: 'calm', label: 'สงบ / ผ่อนคลาย', icon: '🌿' },
    { id: 'good', label: 'แจ่มใส / ดี', icon: '☀️' },
    { id: 'neutral', label: 'เรื่อยๆ / ปกติ', icon: '🍃' },
    { id: 'stressed', label: 'วิตกกังวล / เครียด', icon: '⚡' },
    { id: 'exhausted', label: 'เหนื่อยล้า / หมดพลัง', icon: '🌧️' },
  ];

  const commonSymptoms = [
    'นอนหลับสบาย',
    'อ่านหนังสือได้โฟกัส',
    'ฝึกหายใจครบ 15 นาที',
    'ตึงกล้ามเนื้อคอบ่าไหล่',
    'ใจเต้นเร็วช่วงสอบ',
    'นอนไม่ค่อยหลับ'
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const dateFormatted = `${today.getDate()} ต.ค. 2567`;

    await addMoodLog({
      date: dateFormatted,
      moodLevel,
      stressScore,
      note: note.trim() || 'บันทึกอารมณ์ประจำวัน',
      symptoms: selectedSymptoms
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-md rounded-3xl border border-[#ebdccb] shadow-2xl p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c85a32]">
              <Heart className="w-4 h-4" />
              <span>พื้นที่สำรวจความรู้สึก</span>
            </div>
            <span className="text-[11px] font-bold text-[#c85a32] bg-[#fef5ed] px-2.5 py-0.5 rounded-full border border-[#fbd5b5]">
              🥚 วันที่ {gamification.currentEgg.currentDay}/7 (+50 แต้ม)
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#221e1a] mt-1">
            บันทึกอารมณ์ประจำวัน (Mood Diary)
          </h3>
          <p className="text-xs text-[#716962] mt-0.5">
            บันทึกสภาวะอารมณ์เพื่อติดตามแนวโน้มสุขภาวะ พร้อมส่งไออุ่นฟักไข่เพื่อนซี้
          </p>
        </div>

        {isSaved ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-2xl animate-bounce">
              🐣
            </div>
            <h4 className="text-base font-bold text-[#221e1a]">ส่งไออุ่นให้น้องไข่เรียบร้อย!</h4>
            <div className="px-3 py-1 bg-[#eef4ef] text-[#2e5737] rounded-full text-xs font-bold border border-[#cbe1d0]">
              +50 แต้มใจดี • บันทึกลง Firebase เรียบร้อย
            </div>
            <p className="text-xs text-[#716962]">
              ความสม่ำเสมอนำพาหัวใจที่เข้มแข็งและเพื่อนซี้ตัวใหม่มาให้คุณ
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            {/* Mood selector */}
            <div className="space-y-2">
              <label className="font-semibold text-[#3d3935]">ความรู้สึกภาพรวมในวันนี้:</label>
              <div className="grid grid-cols-3 gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMoodLevel(m.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                      moodLevel === m.id
                        ? 'border-[#c85a32] bg-[#fef5ed] shadow-2xs font-bold text-[#c85a32]'
                        : 'border-[#ebdccb] hover:bg-[#fdfbf7] text-[#574e47]'
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-[11px] leading-tight">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stress level slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#3d3935]">ระดับความเครียด (1 - 10):</label>
                <span className="text-sm font-bold text-[#c85a32] bg-[#fef5ed] px-2.5 py-0.5 rounded-md border border-[#fbd5b5]">
                  {stressScore} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressScore}
                onChange={(e) => setStressScore(Number(e.target.value))}
                className="w-full accent-[#c85a32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8c827a]">
                <span>1 ผ่อนคลายมาก</span>
                <span>5 ปานกลาง</span>
                <span>10 เครียดสูงสุด</span>
              </div>
            </div>

            {/* Symptoms / Signals */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">สัญญาณร่างกายและพฤติกรรม:</label>
              <div className="flex flex-wrap gap-1.5">
                {commonSymptoms.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#c85a32] text-white border-[#c85a32]'
                          : 'bg-[#fdfbf7] border-[#ebdccb] text-[#574e47] hover:bg-[#f6f1e8]'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reflection Note */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#3d3935]">สิ่งที่คิดหรืออยากจดบันทึกไว้:</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="เช่น ลองฝึกหายใจ 4-7-8 ก่อนนอนแล้วรู้สึกนิ่งขึ้น..."
                className="w-full px-3 py-2 rounded-xl border border-[#dfcfbc] bg-[#fdfbf7] focus:border-[#c85a32] focus:ring-2 focus:ring-[#fbd5b5] outline-hidden text-xs"
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
                className="px-6 py-2 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
              >
                บันทึกลงสมุดไดอารี่
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
