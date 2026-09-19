import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Heart, 
  Trophy, 
  Smile, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Gift, 
  ShoppingBag,
  Zap,
  Info
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { EggVisual } from './EggVisual';
import { CHARACTERS_CATALOG, SEVEN_DAY_STEPS } from '../data/gamificationData';
import { HatchedCharacter } from '../types';

interface EggHatcheryCardProps {
  onOpenMoodDiary: () => void;
  onOpenSanctuary: () => void;
  onEggHatched: (character: HatchedCharacter) => void;
}

export const EggHatcheryCard: React.FC<EggHatcheryCardProps> = ({
  onOpenMoodDiary,
  onOpenSanctuary,
  onEggHatched
}) => {
  const { 
    gamification, 
    tapEgg, 
    hatchCurrentEgg, 
    simulateAdvanceEggDay 
  } = useFirebase();

  const [isHatching, setIsHatching] = useState(false);
  const egg = gamification.currentEgg;
  const targetChar = CHARACTERS_CATALOG[egg.targetCharacterType] || CHARACTERS_CATALOG.moo_deng;
  const canHatch = egg.currentDay >= 7;

  const handleHatchClick = async () => {
    setIsHatching(true);
    try {
      const newChar = await hatchCurrentEgg();
      onEggHatched(newChar);
    } catch (e) {
      console.warn('Hatch error:', e);
    } finally {
      setIsHatching(false);
    }
  };

  const activeCompanion = gamification.hatchedCharacters.find(
    (c) => c.id === gamification.activeCompanionId
  ) || gamification.hatchedCharacters[0];

  return (
    <div className="bg-[#fffefb] rounded-3xl border border-[#ebdccb] shadow-xs p-5 sm:p-7 space-y-6 relative overflow-hidden group">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#fef5ed] via-[#fbd5b5]/30 to-transparent rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Top Bar: Title & Points Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebdccb]/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#fef5ed] text-[#c85a32] border border-[#fbd5b5] text-[11px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>ระบบฟักไข่เพื่อนซี้ฮีลใจ (Mind Gamification)</span>
            </span>
            <span className="text-[11px] text-[#716962] hidden sm:inline">
              ไม่ต้องป่วยก็ใช้ได้ • บันทึกอารมณ์เพื่อสะสมแต้มทุกวัน
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#221e1a] tracking-tight mt-1">
            ฟาร์มฟักไข่ & เพาะพันธุ์พลังบวก มข.
          </h3>
        </div>

        {/* Action button & Points summary */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onOpenSanctuary}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fdfbf7] hover:bg-[#f6f1e8] text-[#574e47] border border-[#ebdccb] rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#c85a32]" />
            <span>สวนเพื่อนซี้ & ร้านค้า</span>
          </button>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#fef5ed] border border-[#fbd5b5] rounded-xl text-xs font-bold text-[#c85a32] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{gamification.points.toLocaleString()} แต้มใจดี</span>
          </div>
        </div>
      </div>

      {/* Center Layout: Visual Egg + Progress Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 5 cols: Interactive Egg Canvas */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-[#fffdfa] to-[#fef5ed]/50 border border-[#ebdccb]/60 relative">
          <EggVisual
            egg={egg}
            onTap={tapEgg}
            size="md"
            canHatch={canHatch}
          />

          {/* Active Companion Little Cheerleader */}
          {activeCompanion && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#fffefb] border border-[#ebdccb] shadow-2xs flex items-center gap-2.5 max-w-xs">
              <span className="text-2xl">{activeCompanion.avatarIcon}</span>
              <div className="text-left leading-tight">
                <div className="text-[10px] text-[#8c827a] font-semibold">{activeCompanion.name} เชียร์อยู่:</div>
                <div className="text-[11px] text-[#221e1a] font-medium truncate">
                  "อีกนิดเดียวน้องจะฟักแล้ว สู้ๆ นะ!"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 7 cols: Stage Details, 7-Day Timeline, and Actions */}
        <div className="lg:col-span-7 space-y-5">
          {/* Target Creature Preview Banner */}
          <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-2xl flex-shrink-0">
                {targetChar.avatarIcon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#221e1a]">{egg.eggName}</span>
                  <span className="text-[10px] text-[#c85a32] bg-[#fef5ed] px-2 py-0.5 rounded font-semibold">
                    {targetChar.rarity === 'legendary' ? '✨ ระดับตำนาน' : '🌟 ระดับหายาก'}
                  </span>
                </div>
                <p className="text-xs text-[#574e47] mt-0.5">
                  เป้าหมาย: ฟักเป็น <strong>{targetChar.name}</strong> ({targetChar.title})
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[11px] text-[#8c827a] block">วันที่</span>
              <span className="text-xl font-extrabold text-[#c85a32]">
                {egg.currentDay} / 7
              </span>
            </div>
          </div>

          {/* 7-Day Steps Interactive Timeline */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#3d3935]">ความต่อเนื่องการดูแลใจ (7-Day Steps)</span>
              <span className="text-[#716962] text-[11px]">
                {egg.currentDay >= 7 ? '🎉 พร้อมฟักตัวละคร!' : `สะสมอีก ${7 - egg.currentDay} วันเพื่อฟักไข่`}
              </span>
            </div>

            {/* Step Pills Bar */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {SEVEN_DAY_STEPS.map((step) => {
                const isCompleted = egg.currentDay >= step.day;
                const isCurrent = egg.currentDay === step.day;

                return (
                  <div
                    key={step.day}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      isCurrent
                        ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs scale-105'
                        : isCompleted
                        ? 'bg-[#fef5ed] text-[#c85a32] border-[#fbd5b5]'
                        : 'bg-[#fdfbf7] text-[#8c827a] border-[#ebdccb]'
                    }`}
                    title={step.title}
                  >
                    <span className="text-[10px] font-bold">ว.{step.day}</span>
                    <span className="text-xs sm:text-sm mt-0.5">
                      {isCompleted ? '✓' : step.day === 7 ? '🐣' : step.day === 3 || step.day === 5 ? '🎁' : '🥚'}
                    </span>
                    <span className="text-[9px] font-semibold mt-0.5 leading-none">
                      {step.bonusPoints > 0 ? `+${step.bonusPoints}` : '+50'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#716962] pt-1">
              <span>ว.3: โบนัส +100 แต้ม</span>
              <span>ว.5: โบนัส +150 แต้ม</span>
              <span className="font-bold text-[#c85a32]">ว.7: ฟักไข่ +500 แต้ม!</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {canHatch ? (
              <button
                onClick={handleHatchClick}
                disabled={isHatching}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-[#c85a32] via-[#e08d58] to-[#c85a32] hover:brightness-105 text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isHatching ? 'กำลังฟักไข่...' : '🎉 แตะเพื่อฟักไข่ตัวละครเลย!'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenMoodDiary}
                className="flex-1 py-3 px-5 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>
                  {egg.warmedToday ? 'บันทึกอารมณ์เพิ่มเติม (+แต้ม)' : 'บันทึกอารมณ์ส่งไออุ่นให้ไข่ (+50 แต้ม)'}
                </span>
              </button>
            )}

            <button
              onClick={tapEgg}
              className="py-3 px-4 bg-[#fdfbf7] hover:bg-[#f6f1e8] text-[#c85a32] border border-[#ebdccb] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="แตะส่งความอบอุ่นให้น้องในไข่"
            >
              <Heart className="w-4 h-4 fill-[#c85a32]" />
              <span>แตะส่งไออุ่น (+2)</span>
            </button>

            {/* Fast-forward demo button */}
            <button
              onClick={simulateAdvanceEggDay}
              className="py-3 px-3 bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47] border border-[#ebdccb] rounded-xl text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
              title="ปุ่มจำลองวันถัดไปสำหรับการทดสอบและสาธิต"
            >
              <Zap className="w-3.5 h-3.5 text-[#d97706]" />
              <span className="hidden sm:inline">จำลองข้ามวัน</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
