import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  Award, 
  Check, 
  Lock, 
  Star, 
  Volume2, 
  BookOpen, 
  Coffee, 
  Smile, 
  ShieldCheck,
  ChevronRight,
  Flame,
  HelpCircle,
  Users
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { CHARACTERS_CATALOG, SHOP_ITEMS, SEVEN_DAY_STEPS } from '../data/gamificationData';
import { CharacterType } from '../types';
import { CommunityGardenView } from './CommunityGardenView';

interface HealingSanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMoodDiary: () => void;
  onOpenProfile?: () => void;
}

export const HealingSanctuaryModal: React.FC<HealingSanctuaryModalProps> = ({
  isOpen,
  onClose,
  onOpenMoodDiary,
  onOpenProfile
}) => {
  const { 
    gamification, 
    communityCompanions,
    setActiveCompanion, 
    purchaseShopItem, 
    resetEggCycle 
  } = useFirebase();

  const [activeTab, setActiveTab] = useState<'community' | 'garden' | 'shop' | 'guide'>('community');
  const [selectedCharacterType, setSelectedCharacterType] = useState<CharacterType>('moo_deng');
  const [characterMessage, setCharacterMessage] = useState<string | null>(null);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const hatchedTypes = gamification.hatchedCharacters.map((c) => c.characterType);
  const allCharacterTypes = Object.keys(CHARACTERS_CATALOG) as CharacterType[];

  const handleSelectCharacter = (type: CharacterType) => {
    setSelectedCharacterType(type);
    const def = CHARACTERS_CATALOG[type];
    const isHatched = hatchedTypes.includes(type);

    if (isHatched) {
      setCharacterMessage(def.quote);
      const character = gamification.hatchedCharacters.find((c) => c.characterType === type);
      if (character) {
        setActiveCompanion(character.id);
      }
    } else {
      setCharacterMessage(`น้องกำลังรอให้คุณฟูมฟัก! เลือกฟักไข่ของน้องในรอบถัดไปได้เลยนะฮับ`);
    }
  };

  const handleBuyItem = async (itemId: string, price: number, name: string) => {
    if (gamification.points < price) {
      alert('แต้มใจดีของคุณยังไม่เพียงพอ แวะมาบันทึกอารมณ์สม่ำเสมอเพื่อสะสมแต้มเพิ่มนะฮับ!');
      return;
    }
    const success = await purchaseShopItem(itemId, price);
    if (success) {
      setPurchaseSuccessMessage(`แลกรับ "${name}" สำเร็จแล้ว!`);
      setTimeout(() => setPurchaseSuccessMessage(null), 3000);
    }
  };

  const activeComp = gamification.hatchedCharacters.find(
    (c) => c.id === gamification.activeCompanionId
  ) || gamification.hatchedCharacters[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#fffefb] w-full max-w-4xl rounded-3xl border border-[#ebdccb] shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#ebdccb] flex flex-wrap items-center justify-between gap-4 bg-[#fdfbf7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-xl">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#221e1a]">
                  สวนเพื่อนซี้ฮีลใจ & ร้านค้าแต้มใจดี
                </h2>
                <span className="text-[11px] font-semibold text-[#2e5737] bg-[#eef4ef] px-2 py-0.5 rounded-full border border-[#cbe1d0]">
                  Mind Sanctuary
                </span>
              </div>
              <p className="text-xs text-[#716962] mt-0.5">
                พื้นที่รวบรวมเพื่อนซี้ที่คุณฟักออกมาจากการดูแลตนเองสม่ำเสมอ
              </p>
            </div>
          </div>

          {/* Right points chip & close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fffefb] border border-[#fbd5b5] shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#c85a32]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#716962] font-semibold leading-none">แต้มใจดีสะสม</span>
                <span className="text-sm font-extrabold text-[#c85a32] leading-none mt-0.5">
                  {gamification.points.toLocaleString()} แต้ม
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#8c827a] hover:text-[#221e1a] rounded-full hover:bg-[#f6f1e8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 flex items-center gap-1 sm:gap-2 border-b border-[#ebdccb] bg-[#fffefb] text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('community')}
            className={`pb-3 px-3 font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'community'
                ? 'border-[#c85a32] text-[#c85a32]'
                : 'border-transparent text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ชุมชนเพื่อนร่วมสวน ({communityCompanions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('garden')}
            className={`pb-3 px-3 font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'garden'
                ? 'border-[#c85a32] text-[#c85a32]'
                : 'border-transparent text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>เพื่อนซี้ของฉัน ({hatchedTypes.length}/{allCharacterTypes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`pb-3 px-3 font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shop'
                ? 'border-[#c85a32] text-[#c85a32]'
                : 'border-transparent text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ร้านค้าแลกรางวัล ({SHOP_ITEMS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-3 font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-[#c85a32] text-[#c85a32]'
                : 'border-transparent text-[#716962] hover:text-[#221e1a]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ระบบ 7 สเต็ปฮีลใจ</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#fdfbf7]/50">
          {purchaseSuccessMessage && (
            <div className="p-3 bg-[#eef4ef] border border-[#cbe1d0] text-[#2e5737] rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
              <Check className="w-4 h-4" />
              <span>{purchaseSuccessMessage}</span>
            </div>
          )}

          {/* TAB 0: COMMUNITY GARDEN VIEW */}
          {activeTab === 'community' && (
            <CommunityGardenView 
              onOpenMoodDiary={() => {
                onClose();
                onOpenMoodDiary();
              }}
              onOpenProfile={() => {
                if (onOpenProfile) onOpenProfile();
              }}
            />
          )}

          {/* TAB 1: GARDEN & CHARACTERS */}
          {activeTab === 'garden' && (
            <div className="space-y-6">
              {/* Selected Character Showcase Banner */}
              {(() => {
                const def = CHARACTERS_CATALOG[selectedCharacterType];
                const isHatched = hatchedTypes.includes(selectedCharacterType);
                const isActive = activeComp?.characterType === selectedCharacterType;

                return (
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#fffefb] border border-[#ebdccb] shadow-xs flex flex-col md:flex-row items-center gap-6">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-[#fef5ed] to-[#fbd5b5]/30 border border-[#ebdccb] flex items-center justify-center text-5xl sm:text-6xl flex-shrink-0 relative shadow-inner">
                      {isHatched ? def.avatarIcon : '🔒'}
                      {isActive && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-bold shadow-xs">
                          เพื่อนซี้ปัจจุบัน
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="text-xs font-bold text-[#c85a32] bg-[#fef5ed] px-2.5 py-0.5 rounded-md border border-[#fbd5b5]">
                          {def.badge}
                        </span>
                        <span className="text-xs text-[#716962]">
                          อาหารโปรด: {def.favoriteSnack}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#221e1a]">
                        {def.name}
                      </h3>
                      <p className="text-xs text-[#574e47] leading-relaxed">
                        {def.description}
                      </p>

                      <div className="p-3 rounded-xl bg-[#fdfbf7] border border-[#ebdccb] text-xs text-[#c85a32] font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 flex-shrink-0" />
                        <span>พลังการฮีล: {def.healingEffect}</span>
                      </div>

                      {/* Quote speech */}
                      {characterMessage && (
                        <div className="p-3 rounded-xl bg-[#fffbeb] border border-[#fef08a] text-xs text-[#78350f] italic flex items-center gap-2 animate-fadeIn">
                          <Volume2 className="w-4 h-4 flex-shrink-0 text-[#d97706]" />
                          <span>"{characterMessage}"</span>
                        </div>
                      )}

                      <div className="pt-2 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                        {isHatched ? (
                          <button
                            onClick={() => handleSelectCharacter(selectedCharacterType)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#eef4ef] text-[#2e5737] border border-[#cbe1d0]'
                                : 'bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-xs'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isActive ? 'กำลังร่วมเดินทางเป็นเพื่อนซี้' : 'ตั้งเป็นเพื่อนซี้ร่วมเดินทาง'}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              resetEggCycle(selectedCharacterType);
                              alert(`ตั้งค่าให้ไข่ใบถัดไปฟักเป็น "${def.name}" แล้วฮับ! แวะมาบันทึกอารมณ์ให้ครบ 7 วันนะ`);
                            }}
                            className="px-4 py-2 bg-[#fdfbf7] hover:bg-[#f6f1e8] text-[#574e47] border border-[#ebdccb] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>เลือกเป็นเป้าหมายฟักไข่รอบถัดไป</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Character Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#574e47] uppercase tracking-wider">
                  คอลเลกชันตัวละครทั้งหมด (แตะเพื่อดูรายละเอียด)
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {allCharacterTypes.map((type) => {
                    const def = CHARACTERS_CATALOG[type];
                    const isHatched = hatchedTypes.includes(type);
                    const isSelected = selectedCharacterType === type;
                    const isActive = activeComp?.characterType === type;

                    return (
                      <div
                        key={type}
                        onClick={() => handleSelectCharacter(type)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between space-y-2 ${
                          isSelected
                            ? 'border-[#c85a32] bg-[#fef5ed] ring-2 ring-[#fbd5b5]'
                            : 'border-[#ebdccb] bg-[#fffefb] hover:border-[#dfcfbc]'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#fdfbf7] border border-[#ebdccb] flex items-center justify-center text-3xl relative">
                          {isHatched ? def.avatarIcon : '🔒'}
                          {isActive && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c85a32] rounded-full ring-2 ring-white" />
                          )}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-[#221e1a] truncate w-full">
                            {isHatched ? def.name : '???'}
                          </div>
                          <div className="text-[10px] text-[#8c827a] mt-0.5">
                            {isHatched ? def.rarity : 'ยังไม่ปลดล็อก'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POINT SHOP */}
          {activeTab === 'shop' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#fffefb] p-4 rounded-2xl border border-[#ebdccb]">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-[#c85a32]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#221e1a]">ร้านค้าสิทธิพิเศษและของตกแต่ง มข.</h3>
                    <p className="text-[11px] text-[#716962]">
                      ใช้แต้มใจดีที่ได้จากการบันทึกอารมณ์ แลกรับคูปองและของตกแต่งตัวละคร
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#716962]">แต้มพร้อมใช้</div>
                  <div className="text-base font-bold text-[#c85a32]">
                    {gamification.points.toLocaleString()} แต้ม
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SHOP_ITEMS.map((item) => {
                  const isOwned = gamification.inventory.includes(item.id);
                  const canAfford = gamification.points >= item.price;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#fffefb] border border-[#ebdccb] shadow-2xs hover:border-[#c85a32]/60 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="w-12 h-12 rounded-xl bg-[#fef5ed] border border-[#fbd5b5] flex items-center justify-center text-2xl">
                            {item.icon}
                          </div>
                          {item.tag && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fef5ed] text-[#c85a32] border border-[#fbd5b5]">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#221e1a]">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#716962] mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#ebdccb]/60 flex items-center justify-between">
                        <div className="text-xs font-bold text-[#c85a32]">
                          {item.price} แต้ม
                        </div>

                        {isOwned ? (
                          <span className="text-[11px] font-semibold text-[#2e5737] bg-[#eef4ef] px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>มีแล้ว</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleBuyItem(item.id, item.price, item.name)}
                            disabled={!canAfford}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              canAfford
                                ? 'bg-[#c85a32] hover:bg-[#b34d28] text-white shadow-2xs'
                                : 'bg-[#f6f1e8] text-[#8c827a] cursor-not-allowed border border-[#ebdccb]'
                            }`}
                          >
                            {canAfford ? 'แลกรับทันที' : 'แต้มไม่พอ'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: GUIDE & PSYCHOLOGY */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* Concept introduction */}
              <div className="p-5 rounded-3xl bg-[#fffefb] border border-[#ebdccb] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c85a32]">
                  <Sparkles className="w-4 h-4" />
                  <span>จิตวิทยาเชิงบวก: ทำไมการฟักไข่ 7 วันจึงช่วยให้ใจฟู</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#221e1a]">
                  "คุณไม่จำเป็นต้องมีปัญหาสุขภาพจิต ถึงจะเข้ามาดูแลตัวเอง"
                </h3>
                <p className="text-xs text-[#574e47] leading-relaxed">
                  งานวิจัยทางจิตวิทยาและประสาทวิทยาศาสตร์ชี้ว่า การฝึกสังเกตอารมณ์ตนเองสม่ำเสมอ (Self-Awareness) 
                  เปรียบเสมือนการออกกำลังกายให้จิตใจ (Emotional Fitness) ระบบ Gamification 7 วันนี้
                  ช่วยกระตุ้นวงจรโดพามีนเชิงบวก (Positive Dopamine Loop) ให้การดูแลตัวเองเป็นเรื่องสนุก 
                  น่ารัก น่าเข้าใช้ทุกวัน ไม่ใช่ภาระหรือเรื่องน่ากลัว
                </p>
              </div>

              {/* 7-Step breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#574e47] uppercase tracking-wider">
                  เส้นทางการฟักไข่ 7 วัน (Step Progression)
                </h4>
                <div className="space-y-2">
                  {SEVEN_DAY_STEPS.map((step) => {
                    const isPassed = gamification.currentEgg.currentDay >= step.day;
                    const isCurrent = gamification.currentEgg.currentDay === step.day;

                    return (
                      <div
                        key={step.day}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                          isCurrent
                            ? 'bg-[#fef5ed] border-[#c85a32] shadow-2xs'
                            : isPassed
                            ? 'bg-[#fffefb] border-[#ebdccb]'
                            : 'bg-[#fdfbf7] border-[#ebdccb]/60 opacity-75'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isPassed
                                ? 'bg-[#c85a32] text-white'
                                : 'bg-[#f6f1e8] text-[#8c827a]'
                            }`}
                          >
                            {step.day}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#221e1a]">
                              {step.title}
                            </div>
                            <div className="text-[11px] text-[#716962]">
                              {step.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-bold text-[#c85a32]">
                            +{step.points} {step.bonusPoints > 0 && `(+${step.bonusPoints} โบนัส)`} แต้ม
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#eef4ef] border border-[#cbe1d0] text-xs text-[#2e5737] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>บันทึกครบ 7 วัน จะได้รับแต้มรวมมากถึง 1,100 แต้ม + ตัวละครใหม่!</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMoodDiary();
                  }}
                  className="px-3.5 py-1.5 bg-[#2e5737] hover:bg-[#23422a] text-white rounded-xl font-bold cursor-pointer transition-all whitespace-nowrap shadow-2xs"
                >
                  บันทึกอารมณ์วันนี้
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
