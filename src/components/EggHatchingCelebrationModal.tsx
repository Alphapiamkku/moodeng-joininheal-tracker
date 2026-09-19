import React, { useEffect } from 'react';
import { X, Sparkles, Trophy, Star, Heart, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HatchedCharacter } from '../types';
import { CHARACTERS_CATALOG } from '../data/gamificationData';

interface EggHatchingCelebrationModalProps {
  isOpen: boolean;
  character: HatchedCharacter | null;
  onClose: () => void;
  onOpenSanctuary: () => void;
}

export const EggHatchingCelebrationModal: React.FC<EggHatchingCelebrationModalProps> = ({
  isOpen,
  character,
  onClose,
  onOpenSanctuary
}) => {
  useEffect(() => {
    if (isOpen && character) {
      // Fire celebratory confetti cannons
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch (e) {
        console.warn('Confetti launch error:', e);
      }
    }
  }, [isOpen, character]);

  if (!isOpen || !character) return null;

  const catalogEntry = CHARACTERS_CATALOG[character.characterType] || CHARACTERS_CATALOG.moo_deng;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-lg rounded-3xl border-2 border-[#ebdccb] shadow-2xl p-6 sm:p-8 space-y-6 relative text-center animate-[scaleIn_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef5ed] border border-[#fbd5b5] text-[#c85a32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ฟักไข่สำเร็จ! ครบ 7 วันแห่งความสม่ำเสมอ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#221e1a] tracking-tight">
            ยินดีต้อนรับเพื่อนซี้คนใหม่!
          </h2>
          <p className="text-xs sm:text-sm text-[#716962]">
            หัวใจที่ได้รับการดูแลสม่ำเสมอ ได้ให้กำเนิดเพื่อนซี้ฮีลใจตัวใหม่แล้ว
          </p>
        </div>

        {/* Character Avatar Showcase Card */}
        <div className="relative py-4">
          <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl bg-gradient-to-b from-[#fef5ed] via-[#fbd5b5]/40 to-[#fffdf7] border-2 border-[#fbd5b5] flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
            {/* Background Halo */}
            <div className="absolute inset-0 bg-[#c85a32]/10 rounded-full filter blur-xl scale-75 animate-pulse" />
            
            {/* Big Avatar */}
            <span className="text-6xl sm:text-7xl z-10 animate-bounce">
              {catalogEntry.avatarIcon}
            </span>

            {/* Rarity Pill */}
            <div className="absolute bottom-2 px-2.5 py-0.5 rounded-full bg-[#fffefb]/95 border border-[#ebdccb] text-[11px] font-bold text-[#c85a32] shadow-2xs z-10">
              {character.rarity === 'legendary' ? '✨ ระดับตำนาน' : character.rarity === 'rare' ? '🌟 ระดับหายาก' : '🌱 ระดับน่ารัก'}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-[#221e1a]">
              {character.name}
            </h3>
            <p className="text-xs text-[#c85a32] font-semibold">
              {character.title}
            </p>
            <p className="text-xs text-[#574e47] max-w-sm mx-auto italic pt-1">
              "{catalogEntry.tagline}"
            </p>
          </div>
        </div>

        {/* Quote Speech Bubble */}
        <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] text-left relative space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#c85a32]">
            <Heart className="w-3.5 h-3.5 fill-[#c85a32]" />
            <span>คำพูดฮีลใจจากน้อง:</span>
          </div>
          <p className="text-xs sm:text-sm text-[#3d3935] leading-relaxed">
            "{character.quote}"
          </p>
        </div>

        {/* Rewards Earned Box */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c85a32] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
              +500
            </div>
            <div>
              <div className="text-xs font-bold text-[#221e1a]">แต้มใจดีโบนัส</div>
              <div className="text-[11px] text-[#716962]">ใช้แลกของรางวัลใน มข.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#eef4ef] border border-[#cbe1d0] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2e5737] text-white flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2e5737]">เข็มกลัดเกียรติยศ</div>
              <div className="text-[11px] text-[#574e47]">ผู้พิทักษ์ใจ 7 วัน</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenSanctuary();
            }}
            className="w-full sm:flex-1 py-3 px-4 bg-[#c85a32] hover:bg-[#b34d28] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>ไปดูในสวนเพื่อนซี้ฮีลใจ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 border border-[#ebdccb] hover:bg-[#f6f1e8] text-[#574e47] rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            ฟักไข่ใบต่อไป
          </button>
        </div>
      </div>
    </div>
  );
};
