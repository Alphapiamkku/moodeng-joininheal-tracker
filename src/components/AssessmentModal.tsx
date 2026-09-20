import React, { useState } from 'react';
import { 
  X, 
  FileCheck, 
  CheckCircle2, 
  Send, 
  AlertTriangle, 
  BookOpen, 
  Award, 
  Brain, 
  Activity, 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  RotateCcw,
  Check,
  ChevronRight,
  Info,
  Smile,
  Frown,
  AlertCircle,
  Calendar,
  ListChecks,
  Flame,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowRight,
  Heart,
  HelpCircle,
  MessageCircleHeart
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { AssessmentResult, AssessmentToolId, PsychologicalScreener } from '../types';
import { PSYCHOLOGICAL_SCREENERS } from '../data/psychologicalScreeners';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSentToChat?: () => void;
  initialToolId?: AssessmentToolId;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onSentToChat,
  initialToolId = 'TRI-EMO'
}) => {
  const { saveAssessment, sendAssessmentResult, activeThreadId, user } = useFirebase();

  const [selectedToolId, setSelectedToolId] = useState<AssessmentToolId>(initialToolId);
  const [activeCategory, setActiveCategory] = useState<'all' | 'tri-emo' | 'stress' | 'anxiety' | 'depression' | 'burnout'>('all');
  const [showTheoryInfo, setShowTheoryInfo] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSendingToChat, setIsSendingToChat] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkedCommitments, setCheckedCommitments] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentScreener: PsychologicalScreener = 
    PSYCHOLOGICAL_SCREENERS.find((s) => s.id === selectedToolId) || PSYCHOLOGICAL_SCREENERS[0];

  const handleSelectTool = (id: AssessmentToolId) => {
    setSelectedToolId(id);
    setAnswers({});
    setResult(null);
    setCheckedCommitments({});
  };

  const handleSelectScore = (questionId: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = currentScreener.questions.length;
  const isAllAnswered = answeredCount === totalQuestions;

  const handleCalculate = async () => {
    if (!isAllAnswered) return;

    const calc = currentScreener.calculateResult(answers);
    const now = new Date();
    const thaiDate = now.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newResult: AssessmentResult = {
      id: `assess-${Date.now()}`,
      userId: user?.uid,
      type: currentScreener.id,
      toolTitle: currentScreener.name,
      theoryName: currentScreener.theory.name,
      score: calc.score,
      maxScore: calc.maxScore,
      level: calc.level,
      severityGrade: calc.severityGrade,
      date: thaiDate,
      timestamp: Date.now(),
      recommendations: calc.recommendations,
      subscales: calc.subscales,
      dominantEmotion: calc.dominantEmotion,
      dominantEmotionTh: calc.dominantEmotionTh,
      emotionBreakdown: calc.emotionBreakdown,
      selfCarePlan: calc.selfCarePlan
    };

    setResult(newResult);
    await saveAssessment(newResult);
  };

  const handleSendToPsychologist = async () => {
    if (!result) return;
    setIsSendingToChat(true);

    try {
      await sendAssessmentResult(activeThreadId, result);
      setToastMessage(`ส่งผล ${result.toolTitle} เข้าแชท อ.ดร. ภาวิณี เรียบร้อยแล้ว`);
      setTimeout(() => {
        setToastMessage(null);
        if (onSentToChat) onSentToChat();
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsSendingToChat(false);
    }
  };

  const handleTrySelfCareFirst = () => {
    setToastMessage('บันทึกผลเรียบร้อย! ลองนำวิธีดูแลตนเองไปฝึก 3-5 วันนะคะ หากไม่ดีขึ้นกลับมาส่งผลคุยกับนักจิตวิทยาได้เสมอ 🌿');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 1800);
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setCheckedCommitments({});
  };

  const toggleCommitment = (text: string) => {
    setCheckedCommitments((prev) => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const filteredScreeners = PSYCHOLOGICAL_SCREENERS.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'tri-emo') return s.id === 'TRI-EMO';
    if (activeCategory === 'stress') return s.category === 'stress' || s.id === 'DASS-21';
    if (activeCategory === 'anxiety') return s.category === 'anxiety' || s.id === 'DASS-21';
    if (activeCategory === 'depression') return s.category === 'depression' || s.id === 'DASS-21';
    if (activeCategory === 'burnout') return s.category === 'burnout';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div 
        id="psychological-assessment-modal"
        className="bg-[#fffefb] w-full max-w-4xl rounded-3xl border border-[#ebdccb] shadow-2xl flex flex-col max-h-[94vh] overflow-hidden relative"
      >
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#221e1a] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-medium animate-bounce max-w-[90%] text-center">
            <CheckCircle2 className="w-4 h-4 text-[#8ec899] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#ebdccb] bg-[#fdfbf7] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#c85a32]/10 text-[#c85a32] flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base sm:text-lg text-[#221e1a] truncate">
                  ศูนย์คัดกรองสุขภาวะทางจิตวิทยา (Screening Hub)
                </h3>
                <span className="text-[10px] bg-[#c85a32]/10 text-[#c85a32] px-2 py-0.5 rounded-full font-bold">
                  ประมวลผลทันที
                </span>
              </div>
              <p className="text-xs text-[#716962] truncate">
                จำแนก 3 อารมณ์หลัก (เศร้า • สุข • กังวล) พร้อมแนวทางดูแลตนเองเบื้องต้นก่อนพบนักจิตวิทยา
              </p>
            </div>
          </div>
          <button
            id="close-assessment-modal-btn"
            onClick={onClose}
            className="p-2 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Tool Selector (Only shown before submission) */}
        {!result && (
          <div className="px-4 sm:px-6 pt-3 pb-2.5 bg-[#fffefb] border-b border-[#ebdccb]/60 space-y-2.5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pb-0.5">
              <span className="text-[#8c827a] font-medium mr-1 hidden sm:inline">หมวดหมู่:</span>
              {[
                { id: 'all', label: 'ทั้งหมด (7 เครื่องมือ)' },
                { id: 'tri-emo', label: '🌟 จำแนก 3 อารมณ์ (เศร้า•สุข•กังวล)' },
                { id: 'stress', label: 'ความเครียด (Stress)' },
                { id: 'anxiety', label: 'ความวิตกกังวล (Anxiety)' },
                { id: 'depression', label: 'ซึมเศร้า (Depression)' },
                { id: 'burnout', label: 'หมดไฟ (Burnout)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-xs ${
                    activeCategory === cat.id
                      ? 'bg-[#c85a32] text-white shadow-2xs font-semibold'
                      : 'bg-[#f6f1e8] text-[#5c544e] hover:bg-[#ebdccb]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Screener Tool Selection Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
              {filteredScreeners.map((tool) => {
                const isSelected = selectedToolId === tool.id;
                const isFlagship = tool.id === 'TRI-EMO';
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? 'border-[#c85a32] bg-[#fef5ed] shadow-xs'
                        : isFlagship
                        ? 'border-[#fbd5b5] bg-[#fffaf5] hover:bg-[#fef5ed]'
                        : 'border-[#ebdccb] bg-[#fdfbf7] hover:bg-[#f8f4ee]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#c85a32]' : isFlagship ? 'text-[#c85a32]' : 'text-[#332e29]'}`}>
                          {tool.id}
                        </span>
                        {isSelected ? (
                          <Check className="w-3 h-3 text-[#c85a32]" />
                        ) : isFlagship ? (
                          <Sparkles className="w-2.5 h-2.5 text-[#e08d58]" />
                        ) : null}
                      </div>
                      <div className="text-[10px] text-[#716962] line-clamp-1 font-medium mt-0.5">
                        {tool.categoryTh}
                      </div>
                    </div>
                    <span className="text-[9px] text-[#8c827a] mt-1 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {tool.targetTime}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!result ? (
            <>
              {/* Tool Header & Psychological Theory Card */}
              <div className="bg-[#fdfbf7] rounded-2xl border border-[#ebdccb] p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#c85a32]/15 text-[#c85a32] text-[11px] font-bold">
                        {currentScreener.badge}
                      </span>
                      <span className="text-xs text-[#8c827a]">
                        จำนวน {totalQuestions} ข้อ • ใช้เวลา ~{currentScreener.targetTime}
                      </span>
                      {currentScreener.id === 'TRI-EMO' && (
                        <span className="text-[10px] bg-[#65856c]/15 text-[#3b6043] px-2 py-0.5 rounded font-bold">
                          วิเคราะห์ 3 มิติอารมณ์ + แผนดูแลตนเอง 3-5 วัน
                        </span>
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#221e1a] mt-1">
                      {currentScreener.nameTh}
                    </h4>
                    <p className="text-xs text-[#574e47] mt-0.5 leading-relaxed">
                      {currentScreener.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowTheoryInfo(!showTheoryInfo)}
                    className="flex items-center gap-1.5 text-xs text-[#c85a32] hover:text-[#b34d28] font-semibold bg-[#fffefb] border border-[#fbd5b5] px-3 py-1.5 rounded-xl cursor-pointer shadow-2xs hover:bg-[#fef5ed] transition-colors flex-shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{showTheoryInfo ? 'ซ่อนหลักทฤษฎี' : 'ดูหลักทฤษฎีทางจิตวิทยา'}</span>
                  </button>
                </div>

                {/* Collapsible Theoretical Background Card */}
                {showTheoryInfo && (
                  <div className="p-3.5 bg-[#fffefb] rounded-xl border border-[#e8d5c4] space-y-2 text-xs text-[#443d37] animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-[#c85a32]">
                      <Brain className="w-4 h-4" />
                      <span>{currentScreener.theory.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#716962] pb-1 border-b border-[#ebdccb]/60">
                      <div><strong>ผู้วิจัย/ทฤษฎี:</strong> {currentScreener.theory.theorist}</div>
                      <div><strong>ปีที่ตีพิมพ์/รับรอง:</strong> {currentScreener.theory.year}</div>
                    </div>
                    <p className="text-xs text-[#574e47] leading-relaxed">
                      <strong>แก่นทฤษฎี:</strong> {currentScreener.theory.summary}
                    </p>
                    <p className="text-[11px] text-[#716962] leading-relaxed bg-[#fdfbf7] p-2 rounded-lg border border-[#ebdccb]/50">
                      💡 <strong>กลไกการแปลผล:</strong> {currentScreener.theory.mechanism}
                    </p>
                  </div>
                )}

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-semibold text-[#716962] mb-1">
                    <span>ความคืบหน้าการตอบ</span>
                    <span className="text-[#c85a32]">{answeredCount} / {totalQuestions} ข้อ</span>
                  </div>
                  <div className="w-full h-2 bg-[#ebdccb] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c85a32] transition-all duration-250 rounded-full"
                      style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8c827a]">
                    โปรดเลือกคำตอบที่ตรงกับความรู้สึกของท่านในช่วง 1-2 สัปดาห์ที่ผ่านมา:
                  </span>
                </div>

                {currentScreener.questions.map((q, idx) => {
                  const currentAnswer = answers[q.id];
                  const isSelected = currentAnswer !== undefined;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#fffefb] border-[#ebdccb] shadow-2xs'
                          : 'bg-[#fdfbf7] border-[#ebdccb]/60 hover:border-[#ebdccb]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#ebdccb]/50 text-[#5c544e] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-[#221e1a] leading-relaxed">
                            {q.text}
                          </p>
                        </div>
                        {q.subscale && (
                          <span className="text-[10px] uppercase font-bold text-[#8c827a] px-2 py-0.5 rounded bg-[#ebdccb]/40 flex-shrink-0">
                            {q.subscale}
                          </span>
                        )}
                      </div>

                      {/* Scale Options Grid */}
                      <div className={`grid grid-cols-2 ${currentScreener.scaleOptions.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-4'} gap-2`}>
                        {currentScreener.scaleOptions.map((opt) => {
                          const isOptionActive = currentAnswer === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleSelectScore(q.id, opt.value)}
                              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[50px] ${
                                isOptionActive
                                  ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                                  : 'bg-[#fdfbf7] text-[#443d37] border-[#ebdccb] hover:bg-[#f6f1e8]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${isOptionActive ? 'text-white' : 'text-[#221e1a]'}`}>
                                  {opt.label}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                                  isOptionActive ? 'bg-white/20 text-white' : 'bg-[#ebdccb]/50 text-[#716962]'
                                }`}>
                                  {opt.value}
                                </span>
                              </div>
                              {opt.description && (
                                <span className={`text-[10px] mt-1 line-clamp-1 ${
                                  isOptionActive ? 'text-white/80' : 'text-[#8c827a]'
                                }`}>
                                  {opt.description}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-fadeIn">
              {/* 1. Primary Dominant Emotion Verdict Banner */}
              <div className={`p-5 sm:p-6 rounded-3xl border text-center space-y-3 relative overflow-hidden ${
                result.dominantEmotion === 'happy'
                  ? 'bg-gradient-to-br from-[#f2f9f4] via-[#f7fcf8] to-[#fffefb] border-[#c2e4cc]'
                  : result.dominantEmotion === 'sad'
                  ? 'bg-gradient-to-br from-[#f0f4f9] via-[#f6f8fc] to-[#fffefb] border-[#c8d7eb]'
                  : result.dominantEmotion === 'anxiety'
                  ? 'bg-gradient-to-br from-[#fef5ed] via-[#fffaf5] to-[#fffefb] border-[#fbd5b5]'
                  : 'bg-gradient-to-br from-[#fdfbf7] to-[#fffefb] border-[#ebdccb]'
              }`}>
                {/* Result header tag */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebdccb] text-xs font-bold text-[#574e47] shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-[#c85a32]" />
                    <span>ผลการประเมิน: {result.toolTitle}</span>
                  </span>
                  <span className="text-xs text-[#8c827a]">
                    บันทึกเมื่อ {result.date}
                  </span>
                </div>

                {/* Dominant Emotion Main State Callout */}
                <div className="py-2">
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    {result.dominantEmotion === 'happy' && (
                      <div className="w-10 h-10 rounded-2xl bg-[#65856c]/15 text-[#426b4a] flex items-center justify-center">
                        <Smile className="w-6 h-6" />
                      </div>
                    )}
                    {result.dominantEmotion === 'sad' && (
                      <div className="w-10 h-10 rounded-2xl bg-[#4b6b94]/15 text-[#30537f] flex items-center justify-center">
                        <Frown className="w-6 h-6" />
                      </div>
                    )}
                    {result.dominantEmotion === 'anxiety' && (
                      <div className="w-10 h-10 rounded-2xl bg-[#c85a32]/15 text-[#c85a32] flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                    )}
                    {result.dominantEmotion === 'balanced' && (
                      <div className="w-10 h-10 rounded-2xl bg-[#578e7e]/15 text-[#3b6d60] flex items-center justify-center">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#221e1a] tracking-tight">
                    {result.dominantEmotionTh || result.level}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c544e] max-w-lg mx-auto mt-1 leading-relaxed">
                    {result.level} • คะแนนรวม <span className="font-mono font-bold text-[#c85a32]">{result.score}</span> จากเต็ม {result.maxScore} คะแนน
                  </p>
                </div>

                {/* Score gauge mini summary */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-white/80 border border-[#ebdccb]/80 text-[11px] text-[#716962]">
                  <Brain className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>ทฤษฎีอ้างอิง: <strong>{result.theoryName}</strong></span>
                </div>
              </div>

              {/* 2. Visual Tri-Emotion Breakdown (เศร้า • สุข • กังวล) */}
              {result.emotionBreakdown && (
                <div className="p-5 bg-[#fffefb] rounded-3xl border border-[#ebdccb] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#c85a32]" />
                      <h4 className="font-bold text-sm text-[#221e1a]">
                        สัดส่วน 3 สภาวะอารมณ์ (Tri-Emotion Balance):
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#8c827a]">คำนวณแบบสัดส่วนร้อยละ (%)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Happy Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      result.dominantEmotion === 'happy'
                        ? 'bg-[#f4faf5] border-[#bfe2ca] shadow-2xs'
                        : 'bg-[#fdfbf7] border-[#ebdccb]'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">🌿</span>
                          <span className="font-bold text-xs text-[#2b4c34]">มีความสุข & ผาสุก</span>
                        </div>
                        <span className="font-mono font-extrabold text-sm text-[#3b6043]">
                          {result.emotionBreakdown.happy}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#ebdccb]/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#65856c] rounded-full transition-all duration-500"
                          style={{ width: `${result.emotionBreakdown.happy}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#5c6e60] mt-2 line-clamp-1">
                        พลังใจบวก ความหวัง และความเพลิดเพลิน
                      </p>
                    </div>

                    {/* Sad Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      result.dominantEmotion === 'sad'
                        ? 'bg-[#f2f6fb] border-[#c0d4ec] shadow-2xs'
                        : 'bg-[#fdfbf7] border-[#ebdccb]'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">💧</span>
                          <span className="font-bold text-xs text-[#223d61]">เศร้าหมอง & ท้อแท้</span>
                        </div>
                        <span className="font-mono font-extrabold text-sm text-[#30537f]">
                          {result.emotionBreakdown.sad}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#ebdccb]/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#4b6b94] rounded-full transition-all duration-500"
                          style={{ width: `${result.emotionBreakdown.sad}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#5c6b7e] mt-2 line-clamp-1">
                        ความเหนื่อยล้าทางใจ ความสูญเสีย และหมดแรง
                      </p>
                    </div>

                    {/* Anxiety Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      result.dominantEmotion === 'anxiety'
                        ? 'bg-[#fdf5ee] border-[#f9d1b0] shadow-2xs'
                        : 'bg-[#fdfbf7] border-[#ebdccb]'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">⚡</span>
                          <span className="font-bold text-xs text-[#6e371f]">วิตกกังวล & ตื่นตระหนก</span>
                        </div>
                        <span className="font-mono font-extrabold text-sm text-[#c85a32]">
                          {result.emotionBreakdown.anxiety}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#ebdccb]/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#c85a32] rounded-full transition-all duration-500"
                          style={{ width: `${result.emotionBreakdown.anxiety}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#7a584a] mt-2 line-clamp-1">
                        ความตื่นตัวของระบบประสาท และความคิดฟุ้งซ่าน
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscale Breakdown if present (e.g. DASS-21, MBI-SS) */}
              {result.subscales && result.subscales.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#fffefb] rounded-2xl border border-[#ebdccb] space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#c85a32]" />
                    <h5 className="font-bold text-sm text-[#221e1a]">
                      การจำแนกมิติทางจิตวิทยา (Multidimensional Profile):
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {result.subscales.map((sub, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] space-y-2 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#221e1a]">{sub.name}</span>
                            <span className="text-xs font-bold text-[#c85a32] font-mono">
                              {sub.score}/{sub.maxScore}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#716962] mt-0.5">{sub.nameTh}</div>
                        </div>

                        {/* Progress meter */}
                        <div className="w-full h-2 bg-[#ebdccb] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(100, (sub.score / sub.maxScore) * 100)}%`,
                              backgroundColor: sub.color
                            }}
                          />
                        </div>

                        <div className="text-[11px] font-bold" style={{ color: sub.color }}>
                          {sub.level}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Personalized Self-Care Action Plan (ลองฝึกด้วยตนเองก่อน 3-5 วัน) */}
              {result.selfCarePlan && (
                <div className="p-5 sm:p-6 bg-[#fffefb] rounded-3xl border border-[#ebdccb] space-y-5 shadow-2xs">
                  {/* Self-Care Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#ebdccb]/70 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#65856c]/15 text-[#2b4c34] text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>ขั้นที่ 1: แผนดูแลตนเองเบื้องต้น</span>
                        </span>
                        <span className="text-xs text-[#8c827a] font-medium">
                          ระยะเวลาแนะนำ: {result.selfCarePlan.trialDays} วัน
                        </span>
                        {result.selfCarePlan.badge && (
                          <span className="text-[10px] bg-[#c85a32]/10 text-[#c85a32] px-2 py-0.5 rounded font-bold">
                            {result.selfCarePlan.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-base sm:text-lg text-[#221e1a] mt-1">
                        {result.selfCarePlan.title}
                      </h4>
                      <p className="text-xs text-[#574e47] mt-0.5 leading-relaxed">
                        {result.selfCarePlan.coreAdvice}
                      </p>
                    </div>
                  </div>

                  {/* 4 Scientifically Validated Self-Care Techniques */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#716962] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#c85a32]" />
                      <span>4 เทคนิคจิตวิทยาที่แนะนำให้ลองฝึกปฏิบัติด้วยตนเอง:</span>
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {result.selfCarePlan.techniques.map((tech, i) => {
                        const categoryLabel = 
                          tech.category === 'breath' ? 'การฝึกการหายใจ' :
                          tech.category === 'mindset' ? 'การปรับความคิด' :
                          tech.category === 'action' ? 'การปรับพฤติกรรม' : 'การพักผ่อน';
                        return (
                          <div 
                            key={i}
                            className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32]/60 transition-all flex flex-col justify-between space-y-2.5"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-[#8c827a] mb-1">
                                <span className="px-2 py-0.5 rounded-md bg-[#fffefb] border border-[#ebdccb] font-semibold text-[#c85a32]">
                                  {categoryLabel}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {tech.duration}
                                </span>
                              </div>

                              <h5 className="font-bold text-xs sm:text-sm text-[#221e1a]">
                                {tech.name}
                              </h5>
                              <p className="text-xs text-[#443d37] mt-1.5 leading-relaxed">
                                {tech.action}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Commitment Checklist */}
                  {result.selfCarePlan.checklist && result.selfCarePlan.checklist.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#fefaf6] border border-[#fbd5b5] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ListChecks className="w-4 h-4 text-[#c85a32]" />
                          <h5 className="font-bold text-xs sm:text-sm text-[#221e1a]">
                            สิ่งที่ฉันตั้งใจจะลองทำในวันนี้ (Daily Commitment):
                          </h5>
                        </div>
                        <span className="text-[10px] text-[#8c827a]">คลิกเพื่อทำเครื่องหมาย</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {result.selfCarePlan.checklist.map((item, idx) => {
                          const isDone = !!checkedCommitments[item];
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleCommitment(item)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                                isDone
                                  ? 'bg-[#fffefb] border-[#65856c] text-[#2b4c34]'
                                  : 'bg-[#fffefb] border-[#ebdccb] text-[#443d37] hover:border-[#c85a32]'
                              }`}
                            >
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-[#65856c] flex-shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-4 h-4 text-[#8c827a] flex-shrink-0 mt-0.5" />
                              )}
                              <span className={`text-xs leading-snug ${isDone ? 'line-through opacity-80' : ''}`}>
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Two-Step Progression Framework: "หากรู้สึกไม่ดีขึ้น ค่อยหานักจิตวิทยา" */}
              <div className="p-5 bg-gradient-to-br from-[#fdfbf7] to-[#fffefb] rounded-3xl border-2 border-[#ebdccb] space-y-4">
                <div className="flex items-center gap-2.5 text-[#221e1a]">
                  <div className="w-8 h-8 rounded-xl bg-[#c85a32]/10 text-[#c85a32] flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#221e1a]">
                      ลำดับขั้นตอนการดูแลสุขภาวะ (Two-Stage Care Framework)
                    </h4>
                    <p className="text-xs text-[#716962]">
                      ให้ผู้ใช้ลองฝึกดูแลตนเองก่อน หากรู้สึกไม่ดีขึ้นค่อยติดต่อขอรับคำปรึกษาจากนักจิตวิทยา
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* Step 1 Card */}
                  <div className="p-4 rounded-2xl bg-[#fffefb] border border-[#ebdccb] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#65856c] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#221e1a]">
                        ลองทำด้วยตนเองก่อน (3-5 วัน)
                      </span>
                    </div>
                    <p className="text-xs text-[#574e47] leading-relaxed">
                      ปฏิบัติตามแบบฝึกหัด 4 เทคนิคทางจิตวิทยาข้างต้นอย่างสม่ำเสมอ จดบันทึก Mood Diary สังเกตการเปลี่ยนแปลงของร่างกายและอารมณ์ในแต่ละวัน
                    </p>
                    <div className="text-[11px] text-[#65856c] font-semibold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>บันทึกผลการประเมินลงในระบบเรียบร้อยแล้ว</span>
                    </div>
                  </div>

                  {/* Step 2 Card */}
                  <div className="p-4 rounded-2xl bg-[#fffefb] border border-[#ebdccb] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#c85a32] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#221e1a]">
                        หากไม่ดีขึ้น ค่อยหานักจิตวิทยา
                      </span>
                    </div>
                    <p className="text-xs text-[#574e47] leading-relaxed">
                      หากสังเกตตนเองครบ 3-5 วันแล้ว ความรู้สึกเศร้า กังวล หรือเหนื่อยล้ายังไม่ลดลง หรือเริ่มรบกวนการนอนหลับและการเรียน ท่านสามารถกดส่งผลนี้คุยกับนักจิตวิทยา มข. ได้ทันที
                    </p>
                    <div className="text-[11px] text-[#c85a32] font-semibold flex items-center gap-1 pt-1">
                      <MessageCircleHeart className="w-3.5 h-3.5" />
                      <span>มี อ.ดร. ภาวิณี และทีมสหวิชาชีพพร้อมรับฟังในแชท</span>
                    </div>
                  </div>
                </div>

                {/* When to see counselor criteria checklist */}
                {result.selfCarePlan?.whenToSeekHelp && (
                  <div className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#ebdccb]/80 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#8c827a] uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#c85a32]" />
                      <span>เกณฑ์สัญญาณเตือนที่ควรตัดสินใจปรึกษานักจิตวิทยา:</span>
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#443d37]">
                      {result.selfCarePlan.whenToSeekHelp.map((crit, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-[#c85a32] font-bold mt-0.5">•</span>
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Psycho-Educational Recommendations */}
              <div className="p-4 sm:p-5 bg-[#fffefb] rounded-2xl border border-[#ebdccb] space-y-3">
                <div className="flex items-center gap-2 text-[#c85a32] font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>คำแนะนำเชิงจิตวิทยาเพิ่มเติม (Clinical Notes):</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#443d37]">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed bg-[#fdfbf7] p-2.5 rounded-xl border border-[#ebdccb]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#65856c] flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notice & Disclaimer */}
              <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#ebdccb] flex items-start gap-2 text-[11px] text-[#716962]">
                <Info className="w-4 h-4 text-[#8c827a] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>หมายเหตุทางคลินิก:</strong> แบบคัดกรองนี้ใช้เพื่อการสังเกตสุขภาวะตนเองและสนับสนุนการดูแลตนเองเบื้องต้น ไม่ใช่การวินิจฉัยโรคทางจิตเวช การวินิจฉัยทางการแพทย์ต้องผ่านการตรวจโดยนักจิตวิทยาคลินิกหรือจิตแพทย์
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#ebdccb] bg-[#fdfbf7] flex flex-wrap items-center justify-between gap-3">
          {!result ? (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-[#716962] hover:text-[#221e1a] rounded-xl hover:bg-[#ebdccb]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ล้างคำตอบ</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#716962]">
                  {isAllAnswered ? 'ตอบครบทุกข้อแล้ว' : `ยังตอบไม่ครบ (${totalQuestions - answeredCount} ข้อ)`}
                </span>
                <button
                  id="submit-assessment-btn"
                  type="button"
                  disabled={!isAllAnswered}
                  onClick={handleCalculate}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isAllAnswered
                      ? 'bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-xs'
                      : 'bg-[#ebdccb] text-[#8c827a] cursor-not-allowed'
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>ประมวลผลทันที</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 text-xs font-semibold text-[#716962] hover:text-[#221e1a] rounded-xl hover:bg-[#ebdccb]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ประเมินใหม่อีกครั้ง</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Stage 1 Action: Try Self-Care First */}
                <button
                  id="try-self-care-first-btn"
                  type="button"
                  onClick={handleTrySelfCareFirst}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#2b4c34] bg-[#f2f9f4] hover:bg-[#e4f3e8] border border-[#bfe2ca] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#65856c]" />
                  <span>ลองฝึกดูแลตนเองก่อน (บันทึกผลแล้ว)</span>
                </button>

                {/* Stage 2 Action: If Not Improved, Send to Psychologist */}
                <button
                  id="send-result-to-psychologist-btn"
                  type="button"
                  disabled={isSendingToChat}
                  onClick={handleSendToPsychologist}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSendingToChat ? 'กำลังส่งข้อมูล...' : 'หากไม่ดีขึ้น: ส่งผลคุยกับนักจิตวิทยา'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
