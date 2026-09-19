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
  Info
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
  initialToolId = 'DASS-21'
}) => {
  const { saveAssessment, sendAssessmentResult, activeThreadId, user } = useFirebase();

  const [selectedToolId, setSelectedToolId] = useState<AssessmentToolId>(initialToolId);
  const [activeCategory, setActiveCategory] = useState<'all' | 'stress' | 'anxiety' | 'depression' | 'burnout'>('all');
  const [showTheoryInfo, setShowTheoryInfo] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSendingToChat, setIsSendingToChat] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentScreener: PsychologicalScreener = 
    PSYCHOLOGICAL_SCREENERS.find((s) => s.id === selectedToolId) || PSYCHOLOGICAL_SCREENERS[0];

  const handleSelectTool = (id: AssessmentToolId) => {
    setSelectedToolId(id);
    setAnswers({});
    setResult(null);
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
      subscales: calc.subscales
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

  const handleReset = () => {
    setAnswers({});
    setResult(null);
  };

  const filteredScreeners = PSYCHOLOGICAL_SCREENERS.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'stress') return s.category === 'stress' || s.id === 'DASS-21';
    if (activeCategory === 'anxiety') return s.category === 'anxiety' || s.id === 'DASS-21';
    if (activeCategory === 'depression') return s.category === 'depression' || s.id === 'DASS-21';
    if (activeCategory === 'burnout') return s.category === 'burnout';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div 
        id="psychological-assessment-modal"
        className="bg-[#fffefb] w-full max-w-3xl rounded-3xl border border-[#ebdccb] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative"
      >
        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#221e1a] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-medium animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[#8ec899]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#ebdccb] bg-[#fdfbf7] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c85a32]/10 text-[#c85a32] flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#221e1a]">
                  ศูนย์คัดกรองสุขภาวะทางจิตวิทยา (Psychological Screening Hub)
                </h3>
              </div>
              <p className="text-xs text-[#716962]">
                แบบประเมินและคัดกรองตามทฤษฎีจิตวิทยาคลินิกมาตรฐานสากลและกรมสุขภาพจิต มข.
              </p>
            </div>
          </div>
          <button
            id="close-assessment-modal-btn"
            onClick={onClose}
            className="p-2 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Selector */}
        {!result && (
          <div className="px-4 sm:px-6 pt-3 pb-2 bg-[#fffefb] border-b border-[#ebdccb]/60 space-y-2.5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[#8c827a] font-medium mr-1 hidden sm:inline">หมวดหมู่:</span>
              {[
                { id: 'all', label: 'ทั้งหมด (6 เครื่องมือ)' },
                { id: 'stress', label: 'ความเครียด (Stress)' },
                { id: 'anxiety', label: 'ความวิตกกังวล (Anxiety)' },
                { id: 'depression', label: 'ซึมเศร้า (Depression)' },
                { id: 'burnout', label: 'หมดไฟ (Burnout)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
              {filteredScreeners.map((tool) => {
                const isSelected = selectedToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#c85a32] bg-[#fef5ed] shadow-xs'
                        : 'border-[#ebdccb] bg-[#fdfbf7] hover:bg-[#f8f4ee]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#c85a32]' : 'text-[#332e29]'}`}>
                          {tool.id}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-[#c85a32]" />}
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
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#c85a32]/15 text-[#c85a32] text-[11px] font-bold">
                        {currentScreener.badge}
                      </span>
                      <span className="text-xs text-[#8c827a]">
                        จำนวน {totalQuestions} ข้อ • ใช้เวลา ~{currentScreener.targetTime}
                      </span>
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
                    className="flex items-center gap-1.5 text-xs text-[#c85a32] hover:text-[#b34d28] font-semibold bg-[#fffefb] border border-[#fbd5b5] px-3 py-1.5 rounded-xl cursor-pointer shadow-2xs hover:bg-[#fef5ed] transition-colors"
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
                          ? 'bg-[#fffefb] border-[#ebdccb]'
                          : 'bg-[#fdfbf7] border-[#ebdccb]/60 hover:border-[#ebdccb]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2">
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
                              className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
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
              {/* Top Result Banner */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-[#fef5ed] to-[#fffefb] rounded-3xl border border-[#fbd5b5] text-center space-y-3 relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c85a32]/10 text-[#c85a32] text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>ผลการประเมิน: {result.toolTitle}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#c85a32] font-mono">
                    {result.score}
                  </span>
                  <span className="text-lg text-[#8c827a] font-medium">
                    / {result.maxScore} คะแนน
                  </span>
                </div>

                <div className="inline-block px-4 py-1.5 rounded-xl bg-white border border-[#ebdccb] shadow-2xs">
                  <span className="text-sm sm:text-base font-bold text-[#221e1a]">
                    {result.level}
                  </span>
                </div>

                <p className="text-xs text-[#716962]">
                  อ้างอิงตามทฤษฎี: <strong>{result.theoryName}</strong> • บันทึกเมื่อ {result.date}
                </p>
              </div>

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

              {/* Psycho-Educational Recommendations */}
              <div className="p-4 sm:p-5 bg-[#fffefb] rounded-2xl border border-[#ebdccb] space-y-3">
                <div className="flex items-center gap-2 text-[#c85a32] font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>คำแนะนำเชิงจิตวิทยาและการดูแลตนเอง (Psychological Guidance):</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#443d37]">
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
                  <strong>หมายเหตุทางคลินิก:</strong> แบบคัดกรองนี้ใช้เพื่อการประเมินตนเองเบื้องต้นและติดตามสุขภาวะทางจิต ไม่ใช่การวินิจฉัยโรคทางจิตเวช การวินิจฉัยทางการแพทย์ต้องผ่านการตรวจโดยนักจิตวิทยาคลินิกหรือจิตแพทย์
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
                  <span>ประมวลผลตามหลักจิตวิทยา</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-[#716962] hover:text-[#221e1a] rounded-xl hover:bg-[#ebdccb]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ประเมินใหม่อีกครั้ง</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#504843] hover:bg-[#f6f1e8] border border-[#ebdccb] transition-colors cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>

                <button
                  id="send-result-to-psychologist-btn"
                  type="button"
                  disabled={isSendingToChat}
                  onClick={handleSendToPsychologist}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSendingToChat ? 'กำลังส่งข้อมูล...' : 'ส่งผลให้นักจิตวิทยาในแชท'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
