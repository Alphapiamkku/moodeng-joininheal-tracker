import React from 'react';
import { Phone, AlertCircle, LogIn, LogOut, CheckCircle, Database, Users, Edit3, User } from 'lucide-react';
import { KKULogo } from './KKULogo';
import { useFirebase } from '../context/FirebaseContext';

interface HeaderProps {
  onOpenSOS: () => void;
  onOpenSanctuary?: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSOS, onOpenSanctuary, onOpenProfile }) => {
  const { user, isGuest, signInWithGoogle, signOut, isDbConnected, gamification, communityCompanions } = useFirebase();

  const activeCompanion = gamification.hatchedCharacters.find(
    (c) => c.id === gamification.activeCompanionId
  ) || gamification.hatchedCharacters[0];

  const displayName = user?.nickname || user?.displayName || 'นักศึกษา มข.';
  const facultyShort = user?.faculty ? user.faculty.replace(/^คณะ/, '') : 'มข.';
  const yearShort = user?.yearLevel ? user.yearLevel.replace(/^ชั้นปีที่\s*/, 'ปี ').split(' ')[0] : '';

  return (
    <header className="w-full bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#ebdccb] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Logo Section matching Image 7 header */}
        <div className="flex items-center gap-3">
          <KKULogo variant="morecare" size="md" />
        </div>

        {/* Center Hotline & Status */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:043009700"
            className="flex items-center gap-2 text-xs lg:text-sm text-[#716962] hover:text-[#c85a32] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c85a32]" />
            <span>
              สายด่วนสุขภาพจิต มข.{' '}
              <strong className="text-[#3d3935] font-semibold">043-009700 ต่อ 40222</strong>
            </span>
          </a>

          {/* Firebase connection indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eef4ef] text-[#2e5737] text-[11px] font-medium border border-[#cbe1d0]">
            <Database className="w-3 h-3 text-[#65856c]" />
            <span>Firebase: moodeng-joininheal-tracker</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#65856c] animate-pulse"></span>
          </div>
        </div>

        {/* Right Section: SOS Button & User Profile / Login with Gmail */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Egg & Points Badge with Community peers indicator */}
          {onOpenSanctuary && (
            <button
              onClick={onOpenSanctuary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fef5ed] hover:bg-[#fed7aa]/50 border border-[#fbd5b5] text-xs font-bold text-[#c85a32] shadow-2xs transition-all cursor-pointer"
              title="เปิดสวนเพื่อนซี้ ชุมชนเพื่อน มข. และร้านค้าแลกรางวัล"
            >
              <span className="text-sm">
                {activeCompanion ? activeCompanion.avatarIcon : '🥚'}
              </span>
              <span className="hidden sm:inline">ว.{gamification.currentEgg.currentDay}/7</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#2e5737]">
                <Users className="w-3 h-3" />
                <span>{communityCompanions?.length || 0}</span>
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{gamification.points} แต้ม</span>
            </button>
          )}

          {/* Emergency SOS Button matching Image 7 */}
          <button
            id="sos-button"
            onClick={onOpenSOS}
            className="flex items-center gap-2 bg-[#b83a2c] hover:bg-[#a13124] active:scale-98 text-white px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm transition-all duration-150 cursor-pointer"
          >
            <AlertCircle className="w-4 h-4 text-white animate-bounce" />
            <span className="whitespace-nowrap hidden sm:inline">ขอความช่วยเหลือเร่งด่วน (SOS)</span>
            <span className="sm:hidden font-bold">SOS</span>
          </button>

          {/* User Profile & Edit Custom Nickname / Faculty */}
          <button
            onClick={onOpenProfile}
            id="student-profile-header-button"
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-[#fdfbf7] hover:bg-[#f6f1e8] border border-[#ebdccb] hover:border-[#c85a32] transition-all text-left cursor-pointer group shadow-2xs"
            title="ตั้งชื่อเล่นและแก้ไขข้อมูลคณะ/ชั้นปี"
          >
            <div className="relative">
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover border border-[#fbd5b5] shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#c85a32] text-white rounded-full flex items-center justify-center text-[8px] group-hover:scale-110 transition-transform">
                <Edit3 className="w-2 h-2" />
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#221e1a] group-hover:text-[#c85a32] transition-colors leading-tight max-w-[90px] sm:max-w-[120px] truncate">
                  {displayName}
                </span>
                <span className="text-[9px] font-semibold text-[#65856c] bg-[#eef4ef] px-1.5 py-0.2 rounded-sm border border-[#cbe1d0] hidden sm:inline">
                  {yearShort || 'มข.'}
                </span>
              </div>
              <span className="text-[10px] text-[#716962] leading-tight truncate max-w-[100px] sm:max-w-[130px]">
                {facultyShort || 'มหาวิทยาลัยขอนแก่น'}
              </span>
            </div>
          </button>

          {/* User Auth Section (Gmail) */}
          {user && !isGuest ? (
            <button
              id="sign-out-button"
              onClick={signOut}
              title="ออกจากระบบ Gmail"
              className="p-2 text-[#716962] hover:text-[#b83a2c] hover:bg-[#fef0ed] rounded-full transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="google-signin-button"
              onClick={signInWithGoogle}
              title="เข้าสู่ระบบด้วย Gmail เพื่อซิงค์ข้อมูลกับคลาวด์"
              className="flex items-center gap-1.5 bg-[#fffefb] hover:bg-[#fef5ed] text-[#c85a32] border border-[#ebdccb] hover:border-[#c85a32] px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              <span className="hidden sm:inline text-xs font-semibold">ซิงค์ Gmail</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
