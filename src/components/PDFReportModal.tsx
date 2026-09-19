import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { KKULogo } from './KKULogo';

interface PDFReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PDFReportModal: React.FC<PDFReportModalProps> = ({ isOpen, onClose }) => {
  const { user, appointments } = useFirebase();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-2xl rounded-3xl border border-[#ebdccb] shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebdccb]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#c85a32]">รายงานสรุปผลสุขภาวะทางจิต</span>
            <span className="text-[11px] text-[#716962]">• KKU Wellness System</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#ebdccb] hover:bg-[#f6f1e8] text-xs font-medium text-[#3d3935] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#c85a32]" />
              <span>พิมพ์ / ส่งออก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-6 text-xs text-[#221e1a]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#ebdccb]">
            <KKULogo variant="wellness" size="lg" />
            <div className="text-right space-y-0.5 text-[11px] text-[#716962]">
              <p className="font-semibold text-[#221e1a]">ศูนย์สุขภาวะทางจิต มหาวิทยาลัยขอนแก่น</p>
              <p>ชั้น 2 อาคารกิจกรรมนักศึกษา มข.</p>
              <p>วันที่พิมพ์: 13 ตุลาคม 2567 (10:15 น.)</p>
            </div>
          </div>

          {/* Student Info */}
          <div className="p-3.5 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#8c827a] block text-[10px]">ชื่อ-สกุล:</span>
              <strong className="text-[#221e1a]">{user?.displayName || 'กานต์พิชชา ภักดี'}</strong>
            </div>
            <div>
              <span className="text-[#8c827a] block text-[10px]">รหัสนักศึกษา:</span>
              <strong>{user?.studentId || '643040xxx-x'}</strong>
            </div>
            <div>
              <span className="text-[#8c827a] block text-[10px]">คณะ/สังกัด:</span>
              <strong>{user?.faculty || 'คณะแพทยศาสตร์ มข.'}</strong>
            </div>
            <div>
              <span className="text-[#8c827a] block text-[10px]">นักจิตวิทยาประจำกรณี:</span>
              <strong>อ.ดร. ภาวิณี สุวรรณรัตน์</strong>
            </div>
          </div>

          {/* Clinical Progress Summary */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#c85a32] text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> สรุปผลความก้าวหน้าและการติดตามผลเชิงประจักษ์
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#fffefb] border border-[#ebdccb] text-center">
                <span className="text-[11px] text-[#716962]">จำนวนครั้งที่เข้าพบ</span>
                <div className="text-xl font-bold text-[#221e1a]">3 ครั้ง</div>
                <span className="text-[10px] text-[#65856c]">เสร็จสิ้นตามแผน</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fffefb] border border-[#ebdccb] text-center">
                <span className="text-[11px] text-[#716962]">ระดับความเครียด</span>
                <div className="text-xl font-bold text-[#c85a32]">ลดลง 43%</div>
                <span className="text-[10px] text-[#65856c]">จาก 7.2 สู่ 4.1/10</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fffefb] border border-[#ebdccb] text-center">
                <span className="text-[11px] text-[#716962]">ความต่อเนื่องแบบฝึกหัด</span>
                <div className="text-xl font-bold text-[#e08d58]">85%</div>
                <span className="text-[10px] text-[#716962]">PMR สม่ำเสมอ</span>
              </div>
            </div>
          </div>

          {/* Session History Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#221e1a] text-sm">ประวัติการรับคำปรึกษารายครั้ง</h4>
            <div className="border border-[#ebdccb] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f6f1e8] text-[#574e47] border-b border-[#ebdccb]">
                  <tr>
                    <th className="p-2.5">ครั้งที่ / วันที่</th>
                    <th className="p-2.5">หัวข้อการปรึกษา</th>
                    <th className="p-2.5">รูปแบบ</th>
                    <th className="p-2.5">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdccb]">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-[#fdfbf7]">
                      <td className="p-2.5 font-medium">
                        {apt.isFirstIntake ? 'ครั้งที่ 1 (แรกรับ)' : `ครั้งที่ ${apt.sessionNumber || '-'}`}
                        <div className="text-[10px] text-[#8c827a]">{apt.date}</div>
                      </td>
                      <td className="p-2.5">
                        <div className="font-semibold text-[#221e1a]">{apt.topic}</div>
                        <div className="text-[10px] text-[#716962]">ผู้ให้คำปรึกษา: {apt.counselorName}</div>
                      </td>
                      <td className="p-2.5 text-[#574e47]">{apt.type}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          apt.status === 'upcoming'
                            ? 'bg-[#fef5ed] text-[#c85a32]'
                            : 'bg-[#eef4ef] text-[#2e5737]'
                        }`}>
                          {apt.status === 'upcoming' ? 'รอดำเนินการ' : 'เสร็จสิ้นแล้ว'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Sign-off */}
          <div className="pt-4 border-t border-[#ebdccb] flex items-center justify-between text-[11px] text-[#716962]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#65856c]" />
              <span>คุ้มครองตามพระราชบัญญัติสุขภาพจิตแห่งชาติและมาตรฐานจรรยาบรรณวิชาชีพจิตวิทยา</span>
            </div>
            <div className="text-right">
              <span>ลงนาม: <strong>อ.ดร. ภาวิณี สุวรรณรัตน์</strong> (นักจิตวิทยาคลินิก)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
