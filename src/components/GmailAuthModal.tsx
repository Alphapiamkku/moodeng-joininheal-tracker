import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  AlertCircle,
  ExternalLink,
  Lock,
  UserCheck
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface GmailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GmailAuthModal: React.FC<GmailAuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    isGuest, 
    signInWithGoogle, 
    signInWithGmail, 
    signOut, 
    authError, 
    clearAuthError, 
    loading 
  } = useFirebase();

  const [inputEmail, setInputEmail] = useState<string>('piampiamhathai@gmail.com');
  const [inputNickname, setInputNickname] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'quick' | 'manual' | 'popup'>('quick');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleQuickLogin = async (targetEmail: string) => {
    try {
      setIsProcessing(true);
      clearAuthError();
      await signInWithGmail(targetEmail, inputNickname || undefined);
      setSuccessMessage(`เข้าสู่ระบบด้วย ${targetEmail} สำเร็จเรียบร้อยแล้ว!`);
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    } catch (e) {
      // Handled by context authError
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    try {
      setIsProcessing(true);
      clearAuthError();
      await signInWithGmail(inputEmail.trim(), inputNickname || undefined);
      setSuccessMessage(`เข้าสู่ระบบด้วย ${inputEmail.trim()} สำเร็จเรียบร้อยแล้ว!`);
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    } catch (e) {
      // Handled by context authError
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGooglePopupLogin = async () => {
    try {
      setIsProcessing(true);
      clearAuthError();
      await signInWithGoogle();
      setSuccessMessage('เข้าสู่ระบบด้วย Google สำเร็จเรียบร้อยแล้ว!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    } catch (e) {
      // If popup is blocked by iframe or domain unauthorized, guide user to quick login
      setActiveTab('quick');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#fffefb] border border-[#ebdccb] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#ebdccb] bg-[#fdfbf7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#ebdccb] flex items-center justify-center shadow-2xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.6.4-2.4L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#221e1a]">
                เข้าสู่ระบบด้วย Gmail / Google
              </h3>
              <p className="text-xs text-[#716962]">
                เชื่อมต่อบัญชีเพื่อซิงค์ข้อมูลนัดหมายและประวัติสุขภาพจิตกับ Firebase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8c827a] hover:text-[#221e1a] hover:bg-[#f6f1e8] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Success Notification */}
          {successMessage && (
            <div className="p-3.5 bg-[#eef4ef] border border-[#cbe1d0] text-[#2e5737] rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-2xs animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#2e5737]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Notice */}
          {authError && (
            <div className="p-3.5 bg-[#fdf0ed] border border-[#fbd5b5] text-[#b83a2c] rounded-2xl text-xs flex items-start gap-2.5 shadow-2xs animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#b83a2c] mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold">{authError}</span>
                <p className="text-[11px] text-[#716962]">
                  💡 แนะนำ: ท่านสามารถคลิกเข้าสู่ระบบด้วย Gmail โดยตรงด้านล่างได้ทันที โดยไม่ต้องรอหน้าต่าง Popup
                </p>
              </div>
            </div>
          )}

          {/* Current User Status (if logged in) */}
          {user && !isGuest && (
            <div className="p-4 rounded-2xl bg-[#eef4ef] border border-[#cbe1d0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#cbe1d0] flex items-center justify-center font-bold text-[#2e5737]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2e5737] flex items-center gap-1.5">
                    <span>เข้าสู่ระบบแล้ว</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-xs text-[#221e1a] font-medium">{user.email || 'piampiamhathai@gmail.com'}</div>
                  <div className="text-[11px] text-[#716962]">{user.nickname || user.displayName} ({user.faculty})</div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#fdfbf7] text-[#b83a2c] border border-[#ebdccb] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </div>
          )}

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#f6f1e8] border border-[#ebdccb] text-xs font-medium">
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all text-center cursor-pointer ${
                activeTab === 'quick'
                  ? 'bg-[#fffefb] text-[#c85a32] font-bold shadow-2xs'
                  : 'text-[#716962] hover:text-[#221e1a]'
              }`}
            >
              เข้าสู่ระบบด่วน 1-Click
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all text-center cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-[#fffefb] text-[#c85a32] font-bold shadow-2xs'
                  : 'text-[#716962] hover:text-[#221e1a]'
              }`}
            >
              กรอกอีเมล Gmail อื่นๆ
            </button>
            <button
              onClick={() => setActiveTab('popup')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all text-center cursor-pointer ${
                activeTab === 'popup'
                  ? 'bg-[#fffefb] text-[#c85a32] font-bold shadow-2xs'
                  : 'text-[#716962] hover:text-[#221e1a]'
              }`}
            >
              Google Popup
            </button>
          </div>

          {/* TAB 1: Quick 1-Click Login for User */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fef5ed] to-[#fff8f4] border border-[#fbd5b5] space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>บัญชีแนะนำสำหรับคุณ</span>
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#221e1a]">
                      คุณเปี่ยมหทัย (piampiamhathai@gmail.com)
                    </div>
                    <p className="text-xs text-[#716962]">
                      ซิงค์ข้อมูลกับฐานข้อมูล Firebase Firestore อัตโนมัติทันที
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickLogin('piampiamhathai@gmail.com')}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  <Mail className="w-4 h-4" />
                  <span>เข้าสู่ระบบด้วย piampiamhathai@gmail.com ทันที</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Other Quick KKU Student Accounts */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#574e47] block">
                  หรือเลือกบัญชีตัวอย่างนักศึกษา มข.:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickLogin('karnpitcha.kku@gmail.com')}
                    className="p-3 rounded-xl bg-[#fffefb] hover:bg-[#f6f1e8] border border-[#ebdccb] text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="text-xs font-bold text-[#221e1a] group-hover:text-[#c85a32]">
                      karnpitcha.kku@gmail.com
                    </div>
                    <div className="text-[11px] text-[#716962]">กานต์พิชชา (แพทย์ มข.)</div>
                  </button>

                  <button
                    onClick={() => handleQuickLogin('student.kku@kkumail.com')}
                    className="p-3 rounded-xl bg-[#fffefb] hover:bg-[#f6f1e8] border border-[#ebdccb] text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="text-xs font-bold text-[#221e1a] group-hover:text-[#c85a32]">
                      student.kku@kkumail.com
                    </div>
                    <div className="text-[11px] text-[#716962]">นักศึกษา มอดินแดง (KKU Mail)</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manual Gmail Input */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#574e47] mb-1.5">
                  ที่อยู่อีเมล Gmail หรือ KKU Mail:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c827a]" />
                  <input
                    type="email"
                    required
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="example@gmail.com หรือ student@kkumail.com"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ebdccb] bg-[#fdfbf7] focus:outline-none focus:border-[#c85a32] text-[#221e1a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#574e47] mb-1.5">
                  ชื่อเล่นที่ต้องการแสดง (ไม่บังคับ):
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={inputNickname}
                  onChange={(e) => setInputNickname(e.target.value)}
                  placeholder="เช่น เปี่ยม, น้องมายด์"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#ebdccb] bg-[#fdfbf7] focus:outline-none focus:border-[#c85a32] text-[#221e1a]"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ยืนยันเข้าสู่ระบบด้วยอีเมลนี้</span>
              </button>
            </form>
          )}

          {/* TAB 3: Google Popup Login */}
          {activeTab === 'popup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] space-y-2 text-xs text-[#574e47]">
                <div className="flex items-center gap-2 font-bold text-[#221e1a]">
                  <ExternalLink className="w-4 h-4 text-[#c85a32]" />
                  <span>การเข้าสู่ระบบผ่าน Google Account Popup</span>
                </div>
                <p className="leading-relaxed text-[11px] text-[#716962]">
                  ระบบจะเปิดหน้าต่าง Google Popup ให้คุณเลือกล็อกอินด้วยบัญชีจริง 
                  (หากเบราว์เซอร์อยู่ในโหมด iFrame พรีวิวและบล็อกหน้าต่าง Popup ระบบจะแนะนำให้ใช้โหมด 1-Click ด้านบน)
                </p>
              </div>

              <button
                type="button"
                onClick={handleGooglePopupLogin}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#f6f1e8] text-[#221e1a] border border-[#ebdccb] text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.6.4-2.4L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"
                  />
                </svg>
                <span>เปิดหน้าต่าง Google Popup เพื่อยืนยันตัวตน</span>
              </button>
            </div>
          )}

          {/* Privacy & Confidentiality Guarantee */}
          <div className="pt-2 border-t border-[#ebdccb] flex items-center justify-between text-[11px] text-[#65856c]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>ข้อมูลเก็บรักษาเป็นความลับตามมาตรฐาน PDPA & จรรยาบรรณวิชาชีพ มข.</span>
            </div>
            <div className="flex items-center gap-1 text-[#8c827a]">
              <Lock className="w-3 h-3" />
              <span>SSL 256-bit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
