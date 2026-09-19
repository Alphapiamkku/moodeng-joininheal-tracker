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
  ExternalLink
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
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    const text = inputMessage;
    setInputMessage('');
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sendMessage(`แนบไฟล์: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type
    });
  };

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

      {/* Left Column: Thread List matching Image 7 */}
      <div className="w-full lg:w-80 border-r border-[#ebdccb] bg-[#fffefb] flex flex-col justify-between flex-shrink-0">
        <div className="p-4 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c827a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาบทสนทนา หรือนักจิตวิทยา..."
              className="w-full pl-9 pr-3 py-2 bg-[#f6f1e8] rounded-xl text-xs text-[#221e1a] placeholder-[#8c827a] border border-transparent focus:border-[#c85a32] focus:bg-[#fffefb] outline-hidden transition-all"
            />
          </div>

          {/* Filter Tabs matching Image 7 */}
          <div className="flex items-center gap-1.5 border-b border-[#ebdccb]/60 pb-2">
            <button
              onClick={() => setThreadCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                threadCategory === 'all'
                  ? 'bg-[#c85a32] text-white'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              ทั้งหมด ({threads.length})
            </button>
            <button
              onClick={() => setThreadCategory('psychologist')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                threadCategory === 'psychologist'
                  ? 'bg-[#c85a32] text-white'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              นักจิตวิทยา
            </button>
            <button
              onClick={() => setThreadCategory('coordinator')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                threadCategory === 'coordinator'
                  ? 'bg-[#c85a32] text-white'
                  : 'bg-[#f6f1e8] text-[#574e47] hover:bg-[#ebdccb]'
              }`}
            >
              ประสานงาน
            </button>
          </div>

          {/* Threads List */}
          <div className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
            {filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  id={`thread-item-${thread.id}`}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#fef5ed] border border-[#fbd5b5]'
                      : 'hover:bg-[#f6f1e8] border border-transparent'
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

                    <p className="text-[11px] text-[#c85a32] truncate">
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

        {/* Bottom prompt matching Image 7 */}
        <div className="p-3.5 m-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] flex items-center gap-2.5 text-xs text-[#57423b]">
          <HeartHandshake className="w-5 h-5 text-[#e08d58] flex-shrink-0" />
          <p className="text-[11px] leading-snug">
            <strong>พื้นที่ปลอดภัย ไร้การตัดสิน</strong> บันทึกสภาวะอารมณ์ของคุณวันนี้แล้วหรือยัง...
          </p>
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col bg-[#fdfbf7] overflow-hidden">
        {/* Top Secure Banner matching Image 7 */}
        <div className="bg-[#fef5ed] border-b border-[#fbd5b5] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#221e1a]">ข้อความตรงถึงนักจิตวิทยา</span>
            <span className="bg-[#c85a32] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              KKU SECURE PORTAL
            </span>
            <span className="hidden sm:inline text-[11px] text-[#716962]">
              พื้นที่สื่อสารและติดตามสภาวะอารมณ์อย่างปลอดภัย ได้รับการคุ้มครองตามพระราชบัญญัติสุขภาพจิต
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#57423b] bg-[#fffefb] px-2.5 py-1 rounded-md border border-[#ebdccb]">
            <Lock className="w-3.5 h-3.5 text-[#65856c]" />
            <span>การเข้ารหัสแบบ End-to-End Encryption เข้าถึงได้เฉพาะคุณและผู้เชี่ยวชาญที่ได้รับอนุญาตเท่านั้น</span>
          </div>
        </div>

        {/* Chat Active Header matching Image 7 */}
        <div className="bg-[#fffefb] border-b border-[#ebdccb] px-4 py-3 flex flex-col gap-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeThread.counselorAvatar}
                  alt={activeThread.counselorName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#fbd5b5]"
                />
                <span className="w-3 h-3 rounded-full bg-[#65856c] absolute bottom-0 right-0 border-2 border-[#fffefb]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#221e1a]">
                    {activeThread.counselorName}
                  </h2>
                  <span className="text-[11px] font-semibold text-[#65856c] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#65856c] animate-pulse"></span>
                    กำลังออนไลน์
                  </span>
                </div>
                <p className="text-xs text-[#716962] leading-tight">
                  {activeThread.credentials || activeThread.counselorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeThread.nextAppointment && (
                <div className="hidden md:flex items-center gap-1.5 text-xs text-[#57423b] bg-[#f6f1e8] px-3 py-1.5 rounded-xl border border-[#ebdccb]">
                  <Calendar className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>นัดหมายถัดไป: {activeThread.nextAppointment}</span>
                </div>
              )}
              <button
                id="phq9-quick-button"
                onClick={onOpenAssessment}
                className="flex items-center gap-1.5 bg-[#fef5ed] hover:bg-[#faebd7] text-[#c85a32] border border-[#fbd5b5] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>ส่งแบบประเมินด่วน (PHQ-9)</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#8c827a] flex items-center gap-1.5 pt-1 border-t border-[#ebdccb]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-[#65856c]" />
            <span>ระบบสนทนาเข้ารหัสปลายทาง ปลอดภัยและเป็นความลับตามมาตรฐานการแพทย์และจรรยาบรรณวิชาชีพจิตวิทยา</span>
          </div>
        </div>

        {/* Notice Box matching Image 7 */}
        <div className="p-3 mx-4 my-2.5 rounded-xl bg-[#fef0ed] border border-[#fbd5b5] text-xs text-[#57423b] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#b83a2c] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#b83a2c]">ข้อตกลงการสนทนา:</strong>{' '}
            ช่องทางนี้ใช้สำหรับการติดตามผลและทบทวนแบบฝึกหัด หากน้องนักศึกษาอยู่ในภาวะวิกฤตทางอารมณ์หรือมีความคิดทำร้ายตนเอง กรุณาติดต่อสายด่วนสุขภาพจิต มข.{' '}
            <a href="tel:043009700" className="underline font-bold text-[#b83a2c]">
              043-009700 ต่อ 40222
            </a>{' '}
            หรือกดปุ่ม SOS บนแถบเมนูหลักทันที
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Date Separator */}
          <div className="flex items-center justify-center my-2">
            <span className="text-[11px] text-[#8c827a] bg-[#f6f1e8] px-3 py-1 rounded-full border border-[#ebdccb]">
              วันนี้, 15 พฤษภาคม 2567
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderRole === 'student';

            if (isMe) {
              return (
                /* Student Message (Right-aligned) matching Image 7 */
                <div key={msg.id} className="flex flex-col items-end space-y-1">
                  <div className="text-[11px] text-[#8c827a]">
                    {msg.senderName} • {msg.timeFormatted}
                  </div>
                  <div className="max-w-[85%] sm:max-w-[70%] bg-[#c85a32] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs sm:text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#8c827a]">
                    <span>อ่านแล้ว</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#65856c]" />
                  </div>
                </div>
              );
            }

            return (
              /* Psychologist Message (Left-aligned) matching Image 7 */
              <div key={msg.id} className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-[#ebdccb] flex-shrink-0 mt-4"
                />
                <div className="space-y-1">
                  <div className="text-[11px] text-[#8c827a]">
                    {msg.senderName} • {msg.timeFormatted}
                  </div>
                  <div className="bg-[#fffefb] text-[#221e1a] p-3.5 rounded-2xl rounded-tl-xs border border-[#ebdccb] shadow-xs text-xs sm:text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills matching Image 7 */}
        <div className="px-4 py-1.5 bg-[#fdfbf7] border-t border-[#ebdccb]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] text-[#8c827a] whitespace-nowrap">คำแนะนำด่วน:</span>
          <button
            onClick={() => handleQuickReply('ขอบคุณอาจารย์มากค่ะ')}
            className="px-3 py-1 rounded-full bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47] whitespace-nowrap cursor-pointer transition-colors"
          >
            ขอบคุณอาจารย์มากค่ะ
          </button>
          <button
            onClick={() => handleQuickReply('ขอนัดคุยแบบด่วนสัปดาห์นี้')}
            className="px-3 py-1 rounded-full bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47] whitespace-nowrap cursor-pointer transition-colors"
          >
            ขอนัดคุยแบบด่วนสัปดาห์นี้
          </button>
          <button
            onClick={() => handleQuickReply('ทำแบบฝึกหัดเรียบร้อยแล้ว')}
            className="px-3 py-1 rounded-full bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47] whitespace-nowrap cursor-pointer transition-colors"
          >
            ทำแบบฝึกหัดเรียบร้อยแล้ว
          </button>
        </div>

        {/* Message Input Box matching Image 7 */}
        <div className="p-3 bg-[#fffefb] border-t border-[#ebdccb]">
          <div className="flex items-center gap-2 bg-[#fdfbf7] border border-[#dfcfbc] rounded-2xl p-1.5 pl-3 focus-within:border-[#c85a32] focus-within:ring-2 focus-within:ring-[#fbd5b5]">
            <button
              onClick={() => fileInputRef.current?.click()}
              title="แนบไฟล์หรือการบ้าน"
              className="p-1.5 text-[#8c827a] hover:text-[#c85a32] rounded-full transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsRecording(!isRecording)}
              title="บันทึกเสียง"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isRecording ? 'text-red-500 bg-red-100 animate-pulse' : 'text-[#8c827a] hover:text-[#c85a32]'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              id="chat-text-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`พิมพ์ข้อความถึง ${activeThread.counselorName}... (กด Enter เพื่อส่งข้อความ)`}
              className="flex-1 bg-transparent text-xs sm:text-sm text-[#221e1a] placeholder-[#8c827a] outline-hidden px-1"
            />

            <button
              onClick={() => setInputMessage((prev) => prev + ' 🌿')}
              title="ใส่อิโมจิ"
              className="p-1.5 text-[#8c827a] hover:text-[#c85a32] rounded-full transition-colors cursor-pointer"
            >
              <Smile className="w-4 h-4" />
            </button>

            <button
              id="send-message-button"
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className={`p-2 rounded-xl text-white transition-all cursor-pointer ${
                inputMessage.trim()
                  ? 'bg-[#c85a32] hover:bg-[#b34d28] shadow-xs'
                  : 'bg-[#dec0b7] opacity-60 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer status line matching Image 7 */}
          <div className="flex items-center justify-between text-[11px] text-[#8c827a] mt-2 px-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65856c]"></span>
              นักจิตวิทยาจะตอบกลับภายใน 24 ชม. ในวันและเวลาราชการ
            </span>
            <span>
              รหัสนักศึกษา: <strong>{user?.studentId || '643040xxx-x'}</strong> ({user?.displayName || 'กานต์พิชชา ภักดี'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
