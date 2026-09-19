import React from 'react';
import { X, AlertCircle, Phone, HeartPulse, ShieldAlert } from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-lg rounded-3xl border border-[#ebdccb] shadow-2xl p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fef0ed] text-[#b83a2c] flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#b83a2c] uppercase tracking-wider">
              บริการช่วยเหลือเร่งด่วน 24 ชั่วโมง
            </span>
            <h3 className="text-xl font-bold text-[#221e1a]">
              คุณไม่ได้อยู่คนเดียว เราพร้อมรับฟังและช่วยเหลือ
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#57423b] leading-relaxed bg-[#fef5ed] p-3.5 rounded-2xl border border-[#fbd5b5]">
          หากคุณรู้สึกไม่ปลอดภัย มีความคิดทำร้ายตนเอง หรืออยู่ในภาวะวิกฤตทางอารมณ์อย่างรุนแรง กรุณาติดต่อสายด่วนต่อไปนี้ทันทีโดยไม่ต้องรอนัดหมาย:
        </p>

        {/* Emergency Hotline List */}
        <div className="space-y-2.5 text-xs">
          {/* KKU Wellness Hotline */}
          <a
            href="tel:043009700"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fff8f4] border-2 border-[#b83a2c]/30 hover:border-[#b83a2c] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b83a2c] text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#221e1a]">สายด่วนสุขภาพจิต มข.</h4>
                <p className="text-[11px] text-[#716962]">
                  ศูนย์สุขภาวะทางจิต มหาวิทยาลัยขอนแก่น (เจ้าหน้าที่เวร)
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#b83a2c] whitespace-nowrap">
              043-009700 ต่อ 40222
            </span>
          </a>

          {/* Department of Mental Health 1323 */}
          <a
            href="tel:1323"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] hover:border-[#c85a32] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c85a32] text-white flex items-center justify-center flex-shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#221e1a]">สายด่วนกรมสุขภาพจิต</h4>
                <p className="text-[11px] text-[#716962]">
                  กระทรวงสาธารณสุข (โทรฟรีตลอด 24 ชั่วโมง)
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#c85a32]">โทร 1323</span>
          </a>

          {/* Samaritans */}
          <a
            href="tel:021136789"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fffefb] border border-[#ebdccb] hover:border-[#65856c] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#65856c] text-white flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#221e1a]">สมาคมสะมาริตันส์แห่งประเทศไทย</h4>
                <p className="text-[11px] text-[#716962]">
                  บริการรับฟังด้วยใจ ไม่ตัดสิน (12:00 - 22:00 น.)
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#65856c]">02-113-6789</span>
          </a>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#574e47] hover:bg-[#f6f1e8] rounded-xl cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
