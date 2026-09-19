import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Sparkles, 
  Send, 
  Filter, 
  Search, 
  Check, 
  Smile, 
  MessageSquare, 
  Flame, 
  Coffee,
  PlusCircle,
  Clock,
  GraduationCap,
  Edit3,
  Building2,
  User
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { KKU_FACULTIES, KKU_YEAR_LEVELS, CHARACTERS_CATALOG } from '../data/gamificationData';
import { CommunityCompanion, CommunityNote } from '../types';

interface CommunityGardenViewProps {
  onOpenMoodDiary: () => void;
  onOpenProfile?: () => void;
}

export const CommunityGardenView: React.FC<CommunityGardenViewProps> = ({ 
  onOpenMoodDiary,
  onOpenProfile
}) => {
  const { 
    user, 
    isGuest, 
    gamification, 
    communityCompanions, 
    communityNotes, 
    shareCompanionToCommunity, 
    sendCheerToCompanion, 
    addCommunityNote, 
    reactToCommunityNote,
    updateUserProfile
  } = useFirebase();

  // Filters & State
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [viewSubTab, setViewSubTab] = useState<'sanctuary' | 'notes'>('sanctuary');

  // Share Companion Form Modal / Collapse
  const [isSharingCompanion, setIsSharingCompanion] = useState<boolean>(false);
  const [shareMessage, setShareMessage] = useState<string>('');
  const [customNickname, setCustomNickname] = useState<string>(user?.nickname || user?.displayName || 'น้องมายด์');
  const [customFaculty, setCustomFaculty] = useState<string>(user?.faculty || 'คณะแพทยศาสตร์');
  const [customYearLevel, setCustomYearLevel] = useState<string>(user?.yearLevel || 'ชั้นปีที่ 3 (Junior)');
  const [shareSuccessToast, setShareSuccessToast] = useState<string | null>(null);

  // New Note Form
  const [isPostingNote, setIsPostingNote] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteMoodTag, setNoteMoodTag] = useState<string>('กำลังใจช่วงสอบ');
  const [noteSuccessToast, setNoteSuccessToast] = useState<string | null>(null);

  // Cheering feedback
  const [cheeredId, setCheeredId] = useState<string | null>(null);

  const activeComp = gamification.hatchedCharacters.find(
    (c) => c.id === gamification.activeCompanionId
  ) || gamification.hatchedCharacters[0];

  // Filter companions
  const filteredCompanions = communityCompanions.filter((comp) => {
    const matchesFaculty = selectedFaculty === 'all' || comp.userFaculty.includes(selectedFaculty);
    const matchesSearch = 
      !searchKeyword.trim() ||
      comp.userName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      comp.characterName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      comp.message.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      comp.userFaculty.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesFaculty && matchesSearch;
  });

  const handleShareCompanion = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = shareMessage.trim() || 'แวะมาพักผ่อนและส่งกำลังใจให้ทุกคนใน มข. ฮับ 💖';
    
    // Persist custom nickname, faculty, and year level to profile
    await updateUserProfile({
      nickname: customNickname.trim() || 'น้องมายด์',
      faculty: customFaculty,
      yearLevel: customYearLevel
    });

    await shareCompanionToCommunity(finalMsg, customFaculty);
    setIsSharingCompanion(false);
    setShareSuccessToast('พาน้องเพื่อนซี้มาร่วมสวนสำเร็จแล้ว! (+25 แต้มใจดี)');
    setTimeout(() => setShareSuccessToast(null), 3500);
  };

  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    await addCommunityNote(noteContent, noteMoodTag, customFaculty);
    setNoteContent('');
    setIsPostingNote(false);
    setNoteSuccessToast('ส่งข้อความให้กำลังใจบนกำแพงสำเร็จแล้ว! (+20 แต้มใจดี)');
    setTimeout(() => setNoteSuccessToast(null), 3500);
  };

  const handleCheer = async (targetId: string, type: 'heart' | 'hug' | 'tea', name: string) => {
    await sendCheerToCompanion(targetId, type);
    setCheeredId(`${targetId}-${type}`);
    setTimeout(() => setCheeredId(null), 1800);
  };

  // Check if current user is in garden
  const myCompanionInGarden = communityCompanions.find(
    (c) => c.userId === (user?.uid || 'guest-user')
  );

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {(shareSuccessToast || noteSuccessToast) && (
        <div className="p-3 bg-[#eef4ef] border border-[#cbe1d0] text-[#2e5737] rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#2e5737]" />
            <span>{shareSuccessToast || noteSuccessToast}</span>
          </div>
          <Sparkles className="w-4 h-4 text-[#c85a32]" />
        </div>
      )}

      {/* Top Interactive Banner: Live Garden Feeling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#eef4ef] via-[#f7fbf8] to-[#fef5ed] border border-[#cbe1d0] p-5 sm:p-6 shadow-xs">
        {/* Soft background decorative elements */}
        <div className="absolute top-2 right-4 text-6xl opacity-20 pointer-events-none select-none">
          🌳🌺
        </div>
        <div className="absolute bottom-1 left-10 text-4xl opacity-15 pointer-events-none select-none">
          🌷✨
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2e5737] text-white text-[11px] font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span>กำลังออนไลน์ในสวน {communityCompanions.length} คน</span>
              </span>
              <span className="text-xs text-[#574e47] font-medium hidden sm:inline">
                • พื้นที่อบอุ่นใจของชาวมอดินแดง
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[#221e1a]">
              ชุมชนเพื่อนร่วมสวน มข. (Healing Garden Community)
            </h3>
            <p className="text-xs text-[#574e47] leading-relaxed">
              ที่นี่เราไม่ได้อยู่คนเดียว! แวะมาดูเพื่อนๆ จากทุกคณะที่กำลังฟักไข่และดูแลจิตใจไปพร้อมกัน 
              ส่งหัวใจ ส่งกอดอบอุ่น หรือทักทายให้กำลังใจกันได้เลยนะ
            </p>

            {/* User Identity Chip in Garden */}
            <div className="pt-1 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] text-[#716962]">สถานะของคุณ:</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#c85a32] bg-[#fffefb] px-2.5 py-0.5 rounded-md border border-[#fbd5b5]">
                <User className="w-3 h-3 text-[#c85a32]" />
                <span>{user?.nickname || user?.displayName || 'น้องมายด์'}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#2e5737] bg-[#eef4ef] px-2.5 py-0.5 rounded-md border border-[#cbe1d0] font-medium text-[11px]">
                <Building2 className="w-3 h-3 text-[#65856c]" />
                <span>{user?.faculty || 'คณะแพทยศาสตร์'}</span>
                <span>•</span>
                <span>{user?.yearLevel?.replace(/\(.*\)/, '').trim() || 'ปี 3'}</span>
              </span>
              {onOpenProfile && (
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c85a32] hover:text-[#9e3415] hover:underline cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>เปลี่ยนชื่อเล่น/คณะ</span>
                </button>
              )}
            </div>
          </div>

          {/* Action button: Bring my companion into garden */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setIsSharingCompanion(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Smile className="w-4 h-4" />
              <span>{myCompanionInGarden ? 'อัปเดตข้อความเพื่อนซี้' : 'พาน้องมาร่วมสวน (+25 แต้ม)'}</span>
            </button>

            <button
              onClick={() => {
                setViewSubTab('notes');
                setIsPostingNote(true);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-[#fffefb] hover:bg-[#f6f1e8] text-[#574e47] border border-[#ebdccb] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-4 h-4 text-[#c85a32]" />
              <span>เขียนโน้ตให้กำลังใจ</span>
            </button>
          </div>
        </div>

        {/* Live Garden Walkway Preview Avatars */}
        <div className="mt-5 pt-4 border-t border-[#cbe1d0]/70 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-bold text-[#2e5737] uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เพื่อนในสวนตอนนี้:</span>
          </span>
          <div className="flex items-center -space-x-1.5 overflow-hidden py-1 px-1">
            {communityCompanions.slice(0, 7).map((comp) => (
              <div 
                key={comp.id}
                title={`${comp.userName} (${comp.characterName})`}
                className="w-8 h-8 rounded-full bg-[#fffefb] border-2 border-white shadow-2xs flex items-center justify-center text-sm cursor-pointer hover:scale-125 transition-transform relative"
              >
                {comp.avatarIcon}
                {comp.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                )}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-[#716962] whitespace-nowrap">
            และอีก {Math.max(0, communityCompanions.length - 7)} คนที่กำลังฮีลใจ
          </span>
        </div>
      </div>

      {/* Share Companion Form Modal / Section */}
      {isSharingCompanion && (
        <div className="p-5 rounded-3xl bg-[#fffefb] border-2 border-[#c85a32]/30 shadow-md animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b border-[#ebdccb] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeComp ? activeComp.avatarIcon : '🥚'}</span>
              <div>
                <h4 className="text-sm font-bold text-[#221e1a]">
                  พาน้อง {activeComp ? activeComp.name : 'ไข่เพื่อนซี้'} มาร่วมสวน
                </h4>
                <p className="text-[11px] text-[#716962]">
                  แชร์พลังใจให้นักศึกษา มข. คนอื่นๆ เห็นว่าคุณกำลังร่วมเดินทาง
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSharingCompanion(false)}
              className="text-xs text-[#8c827a] hover:text-[#221e1a] px-2 py-1 rounded-lg hover:bg-[#f6f1e8] cursor-pointer"
            >
              ยกเลิก
            </button>
          </div>

          <form onSubmit={handleShareCompanion} className="space-y-4">
            {/* Identity Customization in Share Form */}
            <div className="p-3.5 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c85a32] flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>ข้อมูลแสดงตัวตนในสวน (แก้ไขได้อิสระ)</span>
                </span>
                {onOpenProfile && (
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="text-[11px] text-[#c85a32] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>โปรไฟล์ฉบับเต็ม</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Nickname */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#574e47] mb-1">
                    ชื่อเล่น / นามแฝง:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={24}
                    value={customNickname}
                    onChange={(e) => setCustomNickname(e.target.value)}
                    placeholder="เช่น น้องมายด์, กานต์"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] font-medium"
                  />
                </div>

                {/* Faculty */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#574e47] mb-1">
                    คณะ:
                  </label>
                  <select
                    value={customFaculty}
                    onChange={(e) => setCustomFaculty(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a]"
                  >
                    {KKU_FACULTIES.filter(f => f !== 'ทุกคณะ').map((fac) => (
                      <option key={fac} value={fac}>{fac}</option>
                    ))}
                  </select>
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#574e47] mb-1">
                    ชั้นปี:
                  </label>
                  <select
                    value={customYearLevel}
                    onChange={(e) => setCustomYearLevel(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a]"
                  >
                    {KKU_YEAR_LEVELS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#574e47] mb-1">
                ข้อความพลังใจ หรือความรู้สึกที่คุณอยากทักทายเพื่อนๆ:
              </label>
              <input
                type="text"
                maxLength={120}
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                placeholder="เช่น เหนื่อยก็พักหน่อยนะ สู้ๆ กับโปรเจกต์มิดเทอมจ้า! 🌸"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#ebdccb] bg-[#fdfbf7] focus:outline-none focus:border-[#c85a32] text-[#221e1a]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#716962]">
                🔒 ข้อมูลคณะและชั้นปีจะถูกจัดเก็บไว้อย่างปลอดภัย
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ยืนยันพาน้องร่วมสวน (+25 แต้ม)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub Tab Switcher: Garden Companions vs Cheer Wall Notes */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#f6f1e8] border border-[#ebdccb] text-xs">
          <button
            onClick={() => setViewSubTab('sanctuary')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewSubTab === 'sanctuary'
                ? 'bg-[#fffefb] text-[#c85a32] shadow-2xs'
                : 'text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>เพื่อนซี้ในสวน ({filteredCompanions.length})</span>
          </button>

          <button
            onClick={() => setViewSubTab('notes')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewSubTab === 'notes'
                ? 'bg-[#fffefb] text-[#c85a32] shadow-2xs'
                : 'text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>กำแพงส่งพลังใจ ({communityNotes.length})</span>
          </button>
        </div>

        {/* Filter / Search Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c827a]" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ, คณะ, ข้อความ..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] w-40 sm:w-48"
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#716962]" />
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-[#ebdccb] bg-[#fffefb] focus:outline-none focus:border-[#c85a32] text-[#221e1a] cursor-pointer"
            >
              <option value="all">ทุกคณะใน มข.</option>
              {KKU_FACULTIES.filter(f => f !== 'ทุกคณะ').map((fac) => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: SANCTUARY COMPANIONS LIST */}
      {viewSubTab === 'sanctuary' && (
        <div className="space-y-4">
          {filteredCompanions.length === 0 ? (
            <div className="p-8 text-center bg-[#fffefb] rounded-3xl border border-[#ebdccb] space-y-2">
              <span className="text-4xl">🍃</span>
              <p className="text-xs font-semibold text-[#574e47]">
                ไม่พบเพื่อนซี้ตามเงื่อนไขที่ค้นหา ลองเลือก "ทุกคณะใน มข." หรือค้นหาคำอื่นนะฮับ
              </p>
              <button
                onClick={() => {
                  setSelectedFaculty('all');
                  setSearchKeyword('');
                }}
                className="text-xs text-[#c85a32] underline font-bold cursor-pointer"
              >
                ล้างการค้นหา
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompanions.map((comp) => {
                const isMe = comp.userId === (user?.uid || 'guest-user');

                return (
                  <div
                    key={comp.id}
                    className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-3 bg-[#fffefb] shadow-2xs hover:shadow-sm ${
                      isMe 
                        ? 'border-[#c85a32] ring-2 ring-[#fbd5b5]/50 bg-[#fffdfa]' 
                        : 'border-[#ebdccb] hover:border-[#dfcfbc]'
                    }`}
                  >
                    {/* Header: Avatar, Name, Faculty */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fef5ed] to-[#fbd5b5]/30 border border-[#ebdccb] flex items-center justify-center text-3xl shadow-inner">
                          {comp.avatarIcon}
                        </div>
                        {comp.isOnline && (
                          <span 
                            title="ออนไลน์อยู่ขณะนี้"
                            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-2xs" 
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-[#221e1a] truncate">
                            {comp.userName}
                          </span>
                          {isMe && (
                            <span className="px-2 py-0.2 rounded-full bg-[#c85a32] text-white text-[10px] font-bold">
                              คุณ
                            </span>
                          )}
                          <span className="text-[10px] text-[#2e5737] bg-[#eef4ef] px-2 py-0.5 rounded-full border border-[#cbe1d0] font-semibold flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            <span className="truncate max-w-[130px]">{comp.userFaculty}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#716962]">
                          <span className="font-semibold text-[#c85a32]">
                            เพื่อนซี้: {comp.characterName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-[#c85a32]" />
                            <span>ต่อเนื่อง {comp.streakDays} วัน</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Speech / Message bubble */}
                    <div className="p-3 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] text-xs text-[#221e1a] leading-relaxed relative">
                      <p className="italic">"{comp.message}"</p>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#8c827a]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>ระดับการฟักไข่: วันที่ {comp.eggDay}/7</span>
                        </span>
                        {comp.equippedBadge && (
                          <span className="text-[#c85a32] font-semibold">
                            {comp.equippedBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cheer Actions Row */}
                    <div className="pt-2 border-t border-[#ebdccb]/60 flex items-center justify-between gap-2 text-xs">
                      <div className="text-[11px] text-[#716962] flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[#c85a32] font-semibold">
                          <Heart className="w-3.5 h-3.5 fill-[#c85a32]" />
                          <span>{comp.cheersCount}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#2e5737] font-semibold">
                          <span>🫂</span>
                          <span>{comp.hugsCount}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#b45309] font-semibold">
                          <span>🧋</span>
                          <span>{comp.teasCount}</span>
                        </span>
                      </div>

                      {/* Cheering Action buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCheer(comp.id, 'heart', comp.userName)}
                          title="ส่งหัวใจ (+5 แต้ม)"
                          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            cheeredId === `${comp.id}-heart`
                              ? 'bg-[#c85a32] text-white scale-110'
                              : 'bg-[#fef5ed] hover:bg-[#fbd5b5]/50 text-[#c85a32] border border-[#fbd5b5]'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px]">ให้ใจ</span>
                        </button>

                        <button
                          onClick={() => handleCheer(comp.id, 'hug', comp.userName)}
                          title="ส่งกอดอบอุ่น (+5 แต้ม)"
                          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            cheeredId === `${comp.id}-hug`
                              ? 'bg-[#2e5737] text-white scale-110'
                              : 'bg-[#eef4ef] hover:bg-[#cbe1d0]/60 text-[#2e5737] border border-[#cbe1d0]'
                          }`}
                        >
                          <span>🫂</span>
                          <span className="hidden sm:inline text-[11px]">กอดนะ</span>
                        </button>

                        <button
                          onClick={() => handleCheer(comp.id, 'tea', comp.userName)}
                          title="เลี้ยงชานมมข. (+5 แต้ม)"
                          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            cheeredId === `${comp.id}-tea`
                              ? 'bg-[#b45309] text-white scale-110'
                              : 'bg-[#fffbeb] hover:bg-[#fef3c7] text-[#b45309] border border-[#fde68a]'
                          }`}
                        >
                          <span>🧋</span>
                          <span className="hidden sm:inline text-[11px]">ชานม</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 2: COMMUNITY CHEER WALL NOTES */}
      {viewSubTab === 'notes' && (
        <div className="space-y-4">
          {/* Create Note Box */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#fffefb] border border-[#ebdccb] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💌</span>
                <h4 className="text-xs sm:text-sm font-bold text-[#221e1a]">
                  กำแพงส่งพลังใจชาว มข. (KKU Cheer Wall)
                </h4>
              </div>
              <span className="text-[11px] text-[#c85a32] font-semibold bg-[#fef5ed] px-2.5 py-0.5 rounded-full border border-[#fbd5b5]">
                เขียนโน้ตรับ +20 แต้ม
              </span>
            </div>

            <form onSubmit={handlePostNote} className="space-y-3">
              <textarea
                rows={2}
                maxLength={240}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="เขียนข้อความสั้นๆ เพื่อให้กำลังใจเพื่อนนักศึกษา มข. ที่กำลังต่อสู้กับความเหนื่อยล้าหรือเตรียมสอบ..."
                className="w-full text-xs p-3 rounded-2xl border border-[#ebdccb] bg-[#fdfbf7] focus:outline-none focus:border-[#c85a32] text-[#221e1a] resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-[#716962]">แท็ก:</span>
                  {[
                    'กำลังใจช่วงสอบ', 
                    'คิดถึงบ้าน', 
                    'วันนี้ยิ้มได้แล้ว', 
                    'กอดตัวเองแน่นๆ', 
                    'ส่งต่อพลังบวก'
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNoteMoodTag(tag)}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                        noteMoodTag === tag
                          ? 'bg-[#c85a32] text-white font-bold'
                          : 'bg-[#f6f1e8] text-[#716962] hover:bg-[#ebdccb]'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    noteContent.trim()
                      ? 'bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-2xs'
                      : 'bg-[#f6f1e8] text-[#8c827a] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>แปะโน้ตให้กำลังใจ</span>
                </button>
              </div>
            </form>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {communityNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-3xl bg-gradient-to-br from-[#fffefb] to-[#fdfbf7] border border-[#ebdccb] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{note.characterIcon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#221e1a] truncate">
                          {note.userName}
                        </div>
                        <div className="text-[10px] text-[#716962] truncate">
                          {note.userFaculty}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-[#c85a32] bg-[#fef5ed] px-2 py-0.5 rounded-full border border-[#fbd5b5]">
                      #{note.moodTag}
                    </span>
                  </div>

                  <p className="text-xs text-[#221e1a] leading-relaxed italic bg-[#fffefb] p-2.5 rounded-xl border border-[#ebdccb]/60">
                    "{note.content}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#ebdccb]/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#8c827a]">
                    {new Date(note.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reactToCommunityNote(note.id, 'heart')}
                      className="px-2 py-1 rounded-lg bg-[#fef5ed] hover:bg-[#fbd5b5]/50 text-[#c85a32] border border-[#fbd5b5] flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                    >
                      <Heart className="w-3 h-3 fill-[#c85a32]" />
                      <span>{note.hearts}</span>
                    </button>

                    <button
                      onClick={() => reactToCommunityNote(note.id, 'hug')}
                      className="px-2 py-1 rounded-lg bg-[#eef4ef] hover:bg-[#cbe1d0]/50 text-[#2e5737] border border-[#cbe1d0] flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                    >
                      <span>🫂</span>
                      <span>{note.hugs}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Supportive Reminder */}
      <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] text-xs text-[#574e47] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Smile className="w-4 h-4 text-[#c85a32] flex-shrink-0" />
          <span>
            ยิ่งบันทึกอารมณ์สม่ำเสมอ เพื่อนซี้ของคุณจะยิ่งเติบโต และส่งต่อพลังใจให้เพื่อนใน มข. ได้มากขึ้น!
          </span>
        </div>
        <button
          onClick={onOpenMoodDiary}
          className="px-4 py-1.5 rounded-xl bg-[#c85a32] hover:bg-[#b34d28] text-white font-bold text-xs transition-all shadow-2xs whitespace-nowrap cursor-pointer"
        >
          บันทึกอารมณ์วันนี้
        </button>
      </div>
    </div>
  );
};
