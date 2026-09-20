import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Lock, 
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  Calendar, 
  MoreVertical, 
  ShieldCheck, 
  CheckCheck, 
  AlertTriangle,
  FileCheck2,
  HeartHandshake,
  ExternalLink,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface ChatScreenProps {
  onOpenSOS: () => void;
  onOpenAssessment: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onOpenSOS, onOpenAssessment }) => {
  const { 
    threads, 
    activeThreadId, 
    setActiveThreadId, 
    messages, 
    sendMessage,
    user 
  } = useFirebase();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [threadCategory, setThreadCategory] = useState<'all' | 'psychologist' | 'coordinator'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'chat' | 'list'>('chat');
  const [isNoticeExpanded, setIsNoticeExpanded] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice recording timer simulation
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      setRecordingSeconds(0);
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    const text = inputMessage;
    setInputMessage('');
    setShowEmojiPicker(false);
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const handleSendVoiceNote = () => {
    const mins = Math.floor(recordingSeconds / 60);
    const secs = recordingSeconds % 60;
    const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    sendMessage(`🎤 ข้อความเสียงบันทึก (${timeStr})`, {
      name: `voice-note-${Date.now()}.m4a`,
      size: `${(recordingSeconds * 12).toFixed(0)} KB`,
      type: 'audio/m4a'
    });
    setIsRecording(false);
  };

  const handleCancelVoiceNote = () => {
    setIsRecording(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sendMessage(`แนบไฟล์: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type
    });
  };

  const quickEmojis = ['🌿', '🤍', '🌸', '☕', '✨', '🙏', '😊', '💪', '🥺', '🙌', '🍃', '☀️'];

  const filteredThreads = threads.filter((th) => {
    if (threadCategory === 'psychologist' && th.category !== 'psychologist') return false;
    if (threadCategory === 'coordinator' && th.category !== 'coordinator') return false;
    if (searchQuery.trim()) {
      return th.counselorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             th.counselorRole.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex-1 w-full bg-[#fdfbf7] flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Left Column: Thread List (Full-screen on Mobile when mobileView === 'list', sidebar on Desktop) */}
      <div 
        className={`w-full lg:w-80 border-r border-[#ebdccb] bg-[#fffefb] flex flex-col justify-between flex-shrink-0 transition-all ${
          mobileView === 'list' ? 'flex h-full' : 'hidden lg:flex'
        }`}
      >
        <div className="p-3.5 sm:p-4 space-y-3 flex-1 overflow-hidden flex flex-col">
          {/* Mobile Header indicator */}
          <div className="flex items-center justify-between lg:hidden pb-1 border-b border-[#ebdccb]/60">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#fef5ed] text-[#c85a32]">
                <UserCheck className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-sm text-[#221e1a]">
                เลือกนักจิตวิทยาหรือผู้ให้คำปรึกษา
              </h3>
            </div>
            <button
              onClick={() => setMobileView('chat')}
              className="p-1.5 text-xs font-semibold text-[#c85a32] bg-[#fef5ed] rounded-lg border border-[#fbd5b5]"
            >
              เปิดห้องแชท
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c827a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาบทสนทนา หรือนักจิตวิทยา..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#f6f1e8] rounded-xl text-xs text-[#221e1a] placeholder-[#8c827a] border border-transparent focus:border-[#c85a32] focus:bg-[#fffefb] outline-hidden transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 border-b border-[#ebdccb]/60 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setThreadCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[34px] ${
                threadCategory === 'all'
                  ? 'bg-[#c85a32] text-white font-bold'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              ทั้งหมด ({threads.length})
            </button>
            <button
              onClick={() => setThreadCategory('psychologist')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[34px] ${
                threadCategory === 'psychologist'
                  ? 'bg-[#c85a32] text-white font-bold'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              นักจิตวิทยา
            </button>
            <button
              onClick={() => setThreadCategory('coordinator')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[34px] ${
                threadCategory === 'coordinator'
                  ? 'bg-[#c85a32] text-white font-bold'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              ประสานงาน
            </button>
          </div>

          {/* Threads List */}
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
            {filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  id={`thread-item-${thread.id}`}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setMobileView('chat');
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-3 cursor-pointer min-h-[64px] active:scale-98 ${
                    isActive
                      ? 'bg-[#fef5ed] border border-[#fbd5b5] shadow-2xs'
                      : 'hover:bg-[#f6f1e8] bg-[#fdfbf7] border border-[#ebdccb]/60'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={thread.counselorAvatar}
                      alt={thread.counselorName}
                      className="w-11 h-11 rounded-full object-cover border border-[#ebdccb]"
                    />
                    <span
                      className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-[#fffefb] ${
                        thread.status === 'online' ? 'bg-[#65856c]' : 'bg-[#a89f91]'
                      }`}
                    ></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#221e1a] truncate">
                        {thread.counselorName}
                      </h4>
                      <span className="text-[10px] text-[#8c827a] flex-shrink-0">
                        {thread.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#c85a32] truncate font-medium">
                      {thread.counselorRole}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[11px] text-[#716962] truncate">
                        {thread.lastMessage}
                      </p>
                      {thread.unreadCount > 0 && !isActive && (
                        <span className="w-4 h-4 rounded-full bg-[#c85a32] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom prompt */}
        <div className="p-3 m-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] flex items-center gap-2.5 text-xs text-[#57423b]">
          <HeartHandshake className="w-5 h-5 text-[#e08d58] flex-shrink-0" />
          <p className="text-[11px] leading-snug">
            <strong>พื้นที่ปลอดภัย ไร้การตัดสิน</strong> ติดตามสภาวะอารมณ์และรับคำแนะนำอย่างเป็นส่วนตัว
          </p>
        </div>
      </div>

      {/* Main Chat Panel (Full-screen on Mobile when mobileView === 'chat') */}
      <div 
        className={`flex-1 flex flex-col bg-[#fdfbf7] overflow-hidden ${
          mobileView === 'chat' ? 'flex h-full' : 'hidden lg:flex'
        }`}
      >
        {/* Top Secure Banner (Compact on Mobile) */}
        <div className="bg-[#fef5ed] border-b border-[#fbd5b5] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <span className="bg-[#c85a32] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              KKU SECURE
            </span>
            <span className="text-[11px] text-[#57423b] truncate">
              พื้นที่สื่อสารปลอดภัยตาม พ.ร.บ. สุขภาพจิต
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#65856c] font-semibold bg-[#fffefb] px-2 py-0.5 rounded-md border border-[#cbe1d0] flex-shrink-0">
            <Lock className="w-3 h-3" />
            <span className="hidden sm:inline">เข้ารหัสลับ End-to-End</span>
            <span className="sm:hidden">เข้ารหัสลับ</span>
          </div>
        </div>

        {/* Chat Active Header with Mobile Back Button & Actions */}
        <div className="bg-[#fffefb] border-b border-[#ebdccb] px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col gap-1.5 shadow-2xs flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Back to thread list on Mobile */}
              <button
                onClick={() => setMobileView('list')}
                className="lg:hidden flex items-center justify-center w-10 h-10 -ml-1 rounded-xl bg-[#f6f1e8] hover:bg-[#ebdccb] active:scale-90 text-[#574e47] border border-[#ebdccb] flex-shrink-0 transition-all select-none"
                title="กลับไปเลือกนักจิตวิทยา"
              >
                <ChevronLeft className="w-5 h-5 text-[#c85a32]" />
              </button>

              <div className="relative flex-shrink-0">
                <img
                  src={activeThread.counselorAvatar}
                  alt={activeThread.counselorName}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#fbd5b5]"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-[#65856c] absolute bottom-0 right-0 border-2 border-[#fffefb]"></span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs sm:text-base font-bold text-[#221e1a] truncate leading-tight">
                    {activeThread.counselorName}
                  </h2>
                  <span className="text-[10px] font-semibold text-[#65856c] flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#65856c] animate-pulse"></span>
                    <span className="hidden sm:inline">ออนไลน์</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-[#716962] leading-tight truncate">
                  {activeThread.credentials || activeThread.counselorRole}
                </p>
              </div>
            </div>

            {/* Quick Actions (PHQ-9 screener shortcut) */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {activeThread.nextAppointment && (
                <div className="hidden md:flex items-center gap-1.5 text-xs text-[#57423b] bg-[#f6f1e8] px-3 py-1.5 rounded-xl border border-[#ebdccb]">
                  <Calendar className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>นัดหมาย: {activeThread.nextAppointment}</span>
                </div>
              )}
              <button
                id="phq9-quick-button"
                onClick={onOpenAssessment}
                className="flex items-center gap-1 bg-[#fef5ed] hover:bg-[#faebd7] text-[#c85a32] border border-[#fbd5b5] px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer min-h-[38px]"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ส่งแบบประเมิน (PHQ-9)</span>
                <span className="sm:hidden">คัดกรองใจ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notice Box (Collapsible on Mobile to maximize screen real estate) */}
        <div className="mx-3 sm:mx-4 my-1.5 sm:my-2 rounded-xl bg-[#fef0ed] border border-[#fbd5b5] text-xs text-[#57423b] p-2 sm:p-2.5 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#b83a2c]">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>สายด่วน มข. ภาวะวิกฤต: 043-009700 ต่อ 40222</span>
            </div>
            <button
              onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}
              className="text-[10px] text-[#c85a32] underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <span>{isNoticeExpanded ? 'ย่อข้อตกลง' : 'ข้อตกลง'}</span>
              {isNoticeExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {isNoticeExpanded && (
            <p className="mt-1.5 pt-1.5 border-t border-[#fbd5b5]/60 text-[11px] text-[#57423b] leading-relaxed">
              ช่องทางนี้ใช้สำหรับการติดตามผลและทบทวนแบบฝึกหัด หากน้องนักศึกษาอยู่ในภาวะวิกฤตทางอารมณ์หรือมีความคิดทำร้ายตนเอง กรุณาโทร{' '}
              <a href="tel:043009700" className="underline font-bold text-[#b83a2c]">
                043-009700 ต่อ 40222
              </a>{' '}
              หรือกดปุ่ม <strong>SOS</strong> บนแถบเมนูด้านบนทันที
            </p>
          )}
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5">
          {/* Date Separator */}
          <div className="flex items-center justify-center my-1">
            <span className="text-[10px] sm:text-[11px] text-[#8c827a] bg-[#f6f1e8] px-3 py-0.5 rounded-full border border-[#ebdccb]">
              วันนี้ • การสนทนาส่วนบุคคล
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderRole === 'student';

            if (isMe) {
              return (
                /* Student Message (Right-aligned) */
                <div key={msg.id} className="flex flex-col items-end space-y-1">
                  <div className="text-[10px] sm:text-[11px] text-[#8c827a]">
                    {msg.senderName} • {msg.timeFormatted}
                  </div>
                  <div className="max-w-[88%] sm:max-w-[70%] bg-[#c85a32] text-white p-3 sm:p-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs sm:text-sm leading-relaxed break-words">
                    {msg.text}
                    {msg.attachment && (
                      <div className="mt-2 pt-2 border-t border-white/20 text-[11px] flex items-center gap-1.5 opacity-90">
                        <Paperclip className="w-3 h-3" />
                        <span>{msg.attachment.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#8c827a]">
                    <span>อ่านแล้ว</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#65856c]" />
                  </div>
                </div>
              );
            }

            return (
              /* Psychologist Message (Left-aligned) */
              <div key={msg.id} className="flex items-start gap-2 max-w-[88%] sm:max-w-[75%]">
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#ebdccb] flex-shrink-0 mt-3"
                />
                <div className="space-y-1 min-w-0">
                  <div className="text-[10px] sm:text-[11px] text-[#8c827a]">
                    {msg.senderName} • {msg.timeFormatted}
                  </div>
                  <div className="bg-[#fffefb] text-[#221e1a] p-3 sm:p-3.5 rounded-2xl rounded-tl-xs border border-[#ebdccb] shadow-xs text-xs sm:text-sm leading-relaxed break-words">
                    {msg.text}
                    {msg.attachment && (
                      <div className="mt-2 pt-2 border-t border-[#ebdccb] text-[11px] flex items-center gap-1.5 text-[#716962]">
                        <Paperclip className="w-3 h-3 text-[#c85a32]" />
                        <span>{msg.attachment.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (Smooth Touch Horizontal Scroll) */}
        <div className="px-3 sm:px-4 py-1.5 bg-[#fdfbf7] border-t border-[#ebdccb]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs flex-shrink-0">
          <span className="text-[10px] sm:text-[11px] text-[#8c827a] font-semibold whitespace-nowrap">
            ข้อความด่วน:
          </span>
          {[
            'ขอบคุณอาจารย์มากค่ะ 🤍',
            'ช่วงนี้เครียดเรื่องเรียน/สอบ 📚',
            'นอนไม่หลับ กังวลใจ 🌙',
            'รู้สึกหมดพลัง/หมดไฟสะสม 🌧️',
            'ขอคำแนะนำจัดการความเครียด 🌿',
            'ขอนัดคุยแบบด่วนสัปดาห์นี้ 📅',
            'ทำแบบฝึกหัดเรียบร้อยแล้ว ✨'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickReply(prompt)}
              className="px-3 py-1.5 rounded-full bg-[#f6f1e8] hover:bg-[#ebdccb] active:scale-95 text-[#574e47] whitespace-nowrap cursor-pointer transition-all text-[11px] font-medium border border-[#ebdccb]/50 select-none"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Quick Emoji Tray when toggled */}
        {showEmojiPicker && (
          <div className="px-3 py-2 bg-[#fffefb] border-t border-[#ebdccb] flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
            <span className="text-[10px] text-[#716962] font-semibold whitespace-nowrap">ใส่อิโมจิ:</span>
            {quickEmojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputMessage((prev) => prev + emoji);
                  inputRef.current?.focus();
                }}
                className="w-8 h-8 rounded-lg hover:bg-[#f6f1e8] active:scale-125 flex items-center justify-center text-base transition-all select-none"
              >
                {emoji}
              </button>
            ))}
            <button
              onClick={() => setShowEmojiPicker(false)}
              className="p-1 text-[#8c827a] hover:text-[#b83a2c] ml-auto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Live Audio Recording Status Banner */}
        {isRecording && (
          <div className="px-3 py-2 bg-red-50 border-t border-red-200 flex items-center justify-between text-xs text-red-700 animate-pulse flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-bold">
                กำลังบันทึกเสียง: {Math.floor(recordingSeconds / 60)}:
                {recordingSeconds % 60 < 10 ? '0' : ''}{recordingSeconds % 60}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelVoiceNote}
                className="px-2.5 py-1 rounded-lg bg-white border border-red-200 text-red-600 font-bold active:scale-95"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSendVoiceNote}
                className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold active:scale-95"
              >
                ส่งเสียง
              </button>
            </div>
          </div>
        )}

        {/* Message Input Box (Mobile-optimized touch targets >= 44px) */}
        <div className="p-2 sm:p-3 bg-[#fffefb] border-t border-[#ebdccb] flex-shrink-0">
          <div className="flex items-center gap-1.5 bg-[#fdfbf7] border border-[#dfcfbc] rounded-2xl p-1 sm:p-1.5 pl-2 sm:pl-3 focus-within:border-[#c85a32] focus-within:ring-2 focus-within:ring-[#fbd5b5]">
            {/* Attachment Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="แนบไฟล์หรือการบ้าน"
              className="w-10 h-10 flex items-center justify-center text-[#8c827a] hover:text-[#c85a32] active:scale-90 rounded-xl transition-all cursor-pointer flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Recording Button */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              title="บันทึกเสียงพูด"
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer flex-shrink-0 active:scale-90 ${
                isRecording ? 'text-red-500 bg-red-100 animate-pulse' : 'text-[#8c827a] hover:text-[#c85a32]'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Main Input Text Field (text-sm sm:text-base to prevent mobile iOS zoom) */}
            <input
              ref={inputRef}
              id="chat-text-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`พิมพ์ข้อความถึง ${activeThread.counselorName}...`}
              className="flex-1 bg-transparent text-sm text-[#221e1a] placeholder-[#8c827a] outline-hidden px-1.5 py-2 min-h-[40px]"
            />

            {/* Emoji Tray Toggle Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="ใส่อิโมจิ"
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer flex-shrink-0 active:scale-90 ${
                showEmojiPicker ? 'text-[#c85a32] bg-[#fef5ed]' : 'text-[#8c827a] hover:text-[#c85a32]'
              }`}
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* Send Button (Large 44px Touch Target) */}
            <button
              id="send-message-button"
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className={`w-11 h-11 flex items-center justify-center rounded-xl text-white transition-all cursor-pointer flex-shrink-0 active:scale-95 ${
                inputMessage.trim()
                  ? 'bg-[#c85a32] hover:bg-[#b34d28] shadow-xs ring-2 ring-[#fbd5b5]'
                  : 'bg-[#dec0b7] opacity-60 cursor-not-allowed'
              }`}
              title="ส่งข้อความ"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer status line */}
          <div className="flex items-center justify-between text-[10px] text-[#8c827a] mt-1.5 px-1">
            <span className="flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65856c]"></span>
              <span className="truncate">นักจิตวิทยาตอบกลับใน 24 ชม. วันทำการ</span>
            </span>
            <span className="hidden sm:inline flex-shrink-0">
              {user?.displayName || 'นักศึกษา มข.'} ({user?.studentId || '643040xxx-x'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

