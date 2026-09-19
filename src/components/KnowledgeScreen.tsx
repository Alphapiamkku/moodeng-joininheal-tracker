import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Wind, 
  FileCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Brain, 
  ArrowRight, 
  Clock, 
  Activity, 
  ShieldCheck,
  Flame,
  HelpCircle
} from 'lucide-react';
import { AssessmentToolId } from '../types';
import { PSYCHOLOGICAL_SCREENERS } from '../data/psychologicalScreeners';

interface KnowledgeScreenProps {
  onOpenAssessment: (toolId?: AssessmentToolId) => void;
}

export const KnowledgeScreen: React.FC<KnowledgeScreenProps> = ({ onOpenAssessment }) => {
  // Breathing exercise state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stress' | 'anxiety' | 'burnout' | 'depression'>('all');

  useEffect(() => {
    let interval: any;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            setBreathPhase((current) => {
              if (current === 'Inhale') return 'Hold';
              if (current === 'Hold') return 'Exhale';
              if (current === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const phaseText = {
    Inhale: 'หายใจเข้าช้าๆ ทางจมูกให้ท้องขยาย...',
    Hold: 'กลั้นหายใจเบาๆ นับ 4 วินาที...',
    Exhale: 'ผ่อนลมหายใจออกช้าๆ ทางปาก...',
    Rest: 'พักสบายๆ เตรียมพร้อมรอบถัดไป...'
  };

  const articles = [
    {
      title: 'ทฤษฎีไตรภาคีแห่งอารมณ์ (Tripartite Model) : ทำไมความเครียดจึงต่างจากความวิตกกังวล',
      desc: 'ทำความเข้าใจความต่างระหว่าง Physiological Arousal (วิตกกังวล) และ Negative Affectivity (ความเครียด) เพื่อเลือกวิธีผ่อนคลายที่ตรงจุด',
      category: 'จิตวิทยาคลินิก',
      theorist: 'Clark & Watson / Lovibond',
      readTime: '4 นาที'
    },
    {
      title: 'การปรับโครงสร้างความคิด (Cognitive Restructuring ตามแนวทาง CBT)',
      desc: 'วิธีสังเกต Automatic Negative Thoughts (ANTs) ในช่วงสอบ และเปลี่ยนเป็นความคิดที่มีหลักฐานรองรับและยืดหยุ่น',
      category: 'CBT Skills',
      theorist: 'Aaron T. Beck',
      readTime: '6 นาที'
    },
    {
      title: 'ทฤษฎีภาวะหมดไฟ 3 มิติ (Maslach Burnout Model) ในชีวิตนักศึกษา',
      desc: 'แยกแยะระหว่างความเหนื่อยล้าทางกาย (Fatigue) กับภาวะหมดไฟ (Burnout) พร้อมแนวทางป้องกันก่อนถึงสัปดาห์สอบปลายภาค',
      category: 'การดูแลตนเอง',
      theorist: 'Christina Maslach',
      readTime: '5 นาที'
    }
  ];

  const filteredScreeners = PSYCHOLOGICAL_SCREENERS.filter((s) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'stress') return s.category === 'stress' || s.id === 'DASS-21';
    if (selectedFilter === 'anxiety') return s.category === 'anxiety' || s.id === 'DASS-21';
    if (selectedFilter === 'depression') return s.category === 'depression' || s.id === 'DASS-21';
    if (selectedFilter === 'burnout') return s.category === 'burnout';
    return true;
  });

  return (
    <div className="flex-1 w-full bg-[#fdfbf7] p-4 lg:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ebdccb]/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c85a32]">
            <BookOpen className="w-4 h-4" />
            <span>ศูนย์การเรียนรู้สุขภาวะทางจิตวิทยา มข.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#221e1a] tracking-tight mt-1">
            คลังความรู้และแบบคัดกรองตามหลักทฤษฎีจิตวิทยา
          </h1>
          <p className="text-xs sm:text-sm text-[#716962] mt-1">
            เครื่องมือคัดกรองระดับความเครียด ความวิตกกังวล ภาวะหมดไฟ และซึมเศร้า ที่อิงมาตรฐานทางวิทยาศาสตร์และทฤษฎีทางจิตวิทยา
          </p>
        </div>

        <button
          onClick={() => onOpenAssessment('DASS-21')}
          className="px-5 py-2.5 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start md:self-auto flex-shrink-0"
        >
          <Brain className="w-4 h-4" />
          <span>เปิดศูนย์คัดกรองสุขภาพจิต</span>
        </button>
      </div>

      {/* 1. Psychological Screening Tools Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#c85a32]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#221e1a]">
                แบบคัดกรองตามหลักทฤษฎีจิตวิทยา (Psychological Screening Suite)
              </h2>
            </div>
            <p className="text-xs text-[#716962] mt-0.5">
              เลือกทำแบบประเมินตามมิติที่ท่านต้องการสังเกตตนเอง มีระบบคำนวณและแปลผลตามเกณฑ์มาตรฐานสากล
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'all', label: 'ทั้งหมด (6 เครื่องมือ)' },
              { id: 'stress', label: 'ความเครียด (ST-5, DASS-21)' },
              { id: 'anxiety', label: 'ความวิตกกังวล (GAD-7)' },
              { id: 'burnout', label: 'ภาวะหมดไฟ (MBI-SS)' },
              { id: 'depression', label: 'ภาวะซึมเศร้า (PHQ-9, 2Q)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-[#c85a32] text-white shadow-2xs font-semibold'
                    : 'bg-[#fffefb] border border-[#ebdccb] text-[#574e47] hover:bg-[#f6f1e8]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Screening Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScreeners.map((screener) => (
            <div
              key={screener.id}
              className="bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-5 shadow-2xs hover:shadow-md hover:border-[#c85a32]/60 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#fef5ed] border border-[#fbd5b5] text-[#c85a32] font-bold text-xs">
                    {screener.id}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#8c827a] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{screener.targetTime}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#221e1a] group-hover:text-[#c85a32] transition-colors">
                    {screener.nameTh}
                  </h3>
                  <p className="text-xs text-[#5c544e] mt-1 line-clamp-2 leading-relaxed">
                    {screener.description}
                  </p>
                </div>

                {/* Psychological Theory Background Tag */}
                <div className="p-2.5 rounded-xl bg-[#fdfbf7] border border-[#ebdccb]/60 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#443d37]">
                    <Brain className="w-3.5 h-3.5 text-[#c85a32]" />
                    <span className="truncate">{screener.theory.name}</span>
                  </div>
                  <div className="text-[10px] text-[#716962] line-clamp-1">
                    โดย {screener.theory.theorist}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#ebdccb]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#8c827a]">
                  {screener.questions.length} ข้อคำถาม
                </span>
                <button
                  onClick={() => onOpenAssessment(screener.id)}
                  className="px-3.5 py-1.5 bg-[#fdfbf7] group-hover:bg-[#c85a32] text-[#c85a32] group-hover:text-white border border-[#ebdccb] group-hover:border-[#c85a32] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <span>เริ่มทำแบบประเมิน</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Relaxation Tools & Articles Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Breathing Tool (Box Breathing) */}
        <div className="lg:col-span-6 bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#ebdccb]/60 pb-3">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#c85a32]" />
              <h3 className="font-bold text-[#221e1a]">
                แบบฝึกกำหนดลมหายใจ Box Breathing (4-4-4-4)
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#2e5737] bg-[#eef4ef] px-2.5 py-0.5 rounded-full">
              อิงทฤษฎี Polyvagal
            </span>
          </div>

          <p className="text-xs text-[#57423b] leading-relaxed">
            เทคนิคการหายใจ 4 จังหวะ ช่วยกระตุ้นเส้นประสาท Vagus เพื่อดึงระบบประสาทพาราซิมพาเทติก (Parasympathetic) ให้กลับมาทำงาน ลดอัตราการเต้นของหัวใจ และคลายความตื่นเต้นก่อนพรีเซนต์งานหรืออ่านหนังสือสอบ
          </p>

          {/* Interactive Breathing Visualizer */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            <div
              className={`w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                breathingActive
                  ? breathPhase === 'Inhale'
                    ? 'scale-110 bg-[#fef5ed] border-4 border-[#c85a32] shadow-lg shadow-[#c85a32]/20'
                    : breathPhase === 'Hold'
                    ? 'scale-110 bg-[#fef5ed] border-4 border-[#e08d58]'
                    : breathPhase === 'Exhale'
                    ? 'scale-90 bg-[#fdfbf7] border-4 border-[#65856c]'
                    : 'scale-95 bg-[#fdfbf7] border-4 border-[#dfcfbc]'
                  : 'bg-[#f6f1e8] border-4 border-[#ebdccb]'
              }`}
            >
              <span className="text-xs font-bold text-[#c85a32] uppercase tracking-wider">
                {breathingActive ? breathPhase : 'พร้อมฝึก'}
              </span>
              <span className="text-3xl font-extrabold text-[#221e1a] mt-1">
                {breathingActive ? breathTimer : '4'}
              </span>
              <span className="text-[10px] text-[#716962] mt-1">วินาที</span>
            </div>

            <p className="text-xs font-semibold text-[#3d3935] mt-4 text-center">
              {breathingActive ? phaseText[breathPhase] : 'กดปุ่มด้านล่างเพื่อเริ่มฝึกกำหนดลมหายใจ 2-5 นาที'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-all ${
                breathingActive
                  ? 'bg-[#57423b] hover:bg-[#3d3935] text-white'
                  : 'bg-[#c85a32] hover:bg-[#b34d28] text-white'
              }`}
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{breathingActive ? 'หยุดชั่วคราว' : 'เริ่มฝึกกำหนดลมหายใจ'}</span>
            </button>
            {breathingActive && (
              <button
                onClick={() => {
                  setBreathingActive(false);
                  setBreathPhase('Inhale');
                  setBreathTimer(4);
                }}
                className="p-2.5 rounded-xl border border-[#ebdccb] hover:bg-[#f6f1e8] text-[#574e47] cursor-pointer"
                title="รีเซ็ต"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Theory & Knowledge Articles */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c85a32]" />
                <h3 className="font-bold text-[#221e1a] text-base">บทความจิตวิทยาและการดูแลตนเอง</h3>
              </div>
              <span className="text-xs text-[#8c827a]">ศูนย์สุขภาวะ มข.</span>
            </div>

            <div className="space-y-3">
              {articles.map((art, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] hover:border-[#c85a32] transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#8c827a]">
                    <span className="font-semibold text-[#c85a32] bg-[#fef5ed] px-2.5 py-0.5 rounded-md">
                      {art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#221e1a] leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-[#5c544e] leading-relaxed">
                    {art.desc}
                  </p>
                  <div className="text-[10px] text-[#8c827a] pt-1">
                    ทฤษฎีอ้างอิง: <strong>{art.theorist}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
