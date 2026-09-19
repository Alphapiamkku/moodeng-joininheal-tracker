import React, { useState } from 'react';
import { Sparkles, Heart, Flame, Star } from 'lucide-react';
import { EggState } from '../types';
import { CHARACTERS_CATALOG } from '../data/gamificationData';

interface EggVisualProps {
  egg: EggState;
  onTap: () => void;
  size?: 'sm' | 'md' | 'lg';
  canHatch?: boolean;
}

export const EggVisual: React.FC<EggVisualProps> = ({
  egg,
  onTap,
  size = 'md',
  canHatch = false
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [tapHearts, setTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const targetCharacter = CHARACTERS_CATALOG[egg.targetCharacterType] || CHARACTERS_CATALOG.moo_deng;

  const handleEggClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now(), x, y };
    setTapHearts((prev) => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setTapHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);

    onTap();
  };

  const dimensions = {
    sm: 'w-24 h-32',
    md: 'w-36 h-48 sm:w-44 sm:h-56',
    lg: 'w-48 h-64 sm:w-56 sm:h-72'
  }[size];

  // Colors based on egg type & day
  const getEggGradient = () => {
    if (egg.currentDay >= 7) {
      return 'from-[#fef3c7] via-[#fbd5b5] to-[#f472b6]';
    }
    if (egg.currentDay >= 5) {
      return 'from-[#fffbeb] via-[#fed7aa] to-[#fb923c]';
    }
    if (egg.currentDay >= 3) {
      return 'from-[#fef9c3] via-[#ffedd5] to-[#f97316]';
    }
    return 'from-[#fffdf7] via-[#fef3c7] to-[#fbd5b5]';
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Floating Floating Hearts on Tap */}
      {tapHearts.map((heart) => (
        <div
          key={heart.id}
          style={{ left: heart.x, top: heart.y }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-[#c85a32] animate-bounce z-20"
        >
          <Heart className="w-4 h-4 fill-[#c85a32] text-[#c85a32]" />
          <span className="text-[10px] bg-white/90 px-1 rounded-full shadow-xs">+2 แต้ม</span>
        </div>
      ))}

      {/* Aura Glow Backdrop */}
      <div
        className={`absolute rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          egg.currentDay >= 7
            ? 'w-56 h-64 bg-[#f472b6]/30 animate-pulse'
            : egg.currentDay >= 5
            ? 'w-48 h-56 bg-[#f97316]/25'
            : 'w-40 h-48 bg-[#f59e0b]/20'
        }`}
      />

      {/* Main Egg Container */}
      <div
        onClick={handleEggClick}
        className={`relative ${dimensions} cursor-pointer transition-transform duration-300 active:scale-95 group ${
          isWiggling ? 'animate-[wiggle_0.4s_ease-in-out_infinite]' : ''
        } ${canHatch ? 'animate-bounce' : ''}`}
        title="คลิกเพื่อส่งไออุ่นและแตะเล่นกับน้องในไข่!"
      >
        {/* Egg Shell SVG */}
        <svg
          viewBox="0 0 200 260"
          className="w-full h-full drop-shadow-lg filter group-hover:brightness-105 transition-all"
        >
          <defs>
            <linearGradient id={`eggGrad-${egg.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffcf5" />
              <stop offset="35%" stopColor={egg.currentDay >= 5 ? '#fed7aa' : '#fef3c7'} />
              <stop offset="70%" stopColor={egg.currentDay >= 7 ? '#f472b6' : '#fbd5b5'} />
              <stop offset="100%" stopColor={egg.currentDay >= 4 ? '#c85a32' : '#e08d58'} />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shadow underneath */}
          <ellipse cx="100" cy="245" rx="65" ry="12" fill="#221e1a" opacity="0.12" />

          {/* Egg Outer Silhouette */}
          <path
            d="M 100 15 
               C 155 15, 185 85, 185 155 
               C 185 215, 150 245, 100 245 
               C 50 245, 15 215, 15 155 
               C 15 85, 45 15, 100 15 Z"
            fill={`url(#eggGrad-${egg.id})`}
            stroke="#ebdccb"
            strokeWidth="3"
          />

          {/* Egg Shell Shading Highlight */}
          <path
            d="M 60 40 
               C 40 70, 35 120, 42 165
               C 36 120, 42 65, 60 40 Z"
            fill="#ffffff"
            opacity="0.45"
          />

          {/* Day 1-2: Warm Pattern Dots / Heart mark */}
          {egg.currentDay < 3 && (
            <g opacity="0.6">
              <circle cx="85" cy="110" r="5" fill="#fbd5b5" />
              <circle cx="120" cy="130" r="6" fill="#fbd5b5" />
              <circle cx="95" cy="160" r="8" fill="#fbd5b5" />
              <path
                d="M 100 115 C 95 105, 80 110, 85 120 Q 100 135 100 135 Q 100 135 115 120 C 120 110, 105 105, 100 115 Z"
                fill="#c85a32"
                opacity="0.3"
              />
            </g>
          )}

          {/* Day 3+: Golden First Cracks */}
          {egg.currentDay >= 3 && (
            <g stroke="#c85a32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 95 80 L 105 95 L 90 110 L 108 125 L 98 140" filter="url(#glow)" />
              <path d="M 105 95 L 120 102" />
            </g>
          )}

          {/* Day 4+: Expanding Rainbow Cracks */}
          {egg.currentDay >= 4 && (
            <g stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 65 140 L 78 148 L 70 162 L 85 170" />
              <path d="M 130 130 L 142 142 L 132 155 L 145 168" />
            </g>
          )}

          {/* Day 5+: Shell Chipping Off & Glowing Core */}
          {egg.currentDay >= 5 && (
            <g>
              <polygon
                points="95,115 110,118 108,135 90,130"
                fill="#fef08a"
                opacity="0.9"
                filter="url(#glow)"
              />
              <path
                d="M 90 125 L 75 120 L 70 132"
                stroke="#c85a32"
                strokeWidth="2"
                fill="none"
              />
            </g>
          )}

          {/* Day 6+: Cute Creature Eyes Peeking Out */}
          {egg.currentDay >= 6 && (
            <g className="animate-pulse">
              {/* Eye Left */}
              <ellipse cx="88" cy="115" rx="5.5" ry="7" fill="#221e1a" />
              <circle cx="86" cy="113" r="2" fill="#ffffff" />
              {/* Eye Right */}
              <ellipse cx="112" cy="115" rx="5.5" ry="7" fill="#221e1a" />
              <circle cx="110" cy="113" r="2" fill="#ffffff" />
              {/* Blushing Cheeks */}
              <circle cx="78" cy="122" r="4" fill="#f43f5e" opacity="0.6" />
              <circle cx="122" cy="122" r="4" fill="#f43f5e" opacity="0.6" />
            </g>
          )}

          {/* Day 7+: Top Shell Lifting & Magical Stars */}
          {egg.currentDay >= 7 && (
            <g>
              <path
                d="M 60 50 L 80 40 L 100 52 L 120 42 L 140 54"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                filter="url(#glow)"
              />
              <circle cx="100" cy="35" r="4" fill="#fbbf24" filter="url(#glow)" />
              <circle cx="145" cy="80" r="3" fill="#f472b6" filter="url(#glow)" />
              <circle cx="55" cy="95" r="3" fill="#60a5fa" filter="url(#glow)" />
            </g>
          )}
        </svg>

        {/* Floating sparkles on Day 5+ */}
        {egg.currentDay >= 4 && (
          <div className="absolute top-2 right-2 text-amber-500 animate-spin">
            <Sparkles className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Tap hint message */}
      <div className="mt-2 text-center">
        {canHatch ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fef5ed] border border-[#fbd5b5] text-[#c85a32] text-xs font-extrabold animate-bounce shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ครบ 7 วันแล้ว! แตะที่ไข่เพื่อฟักตัวละคร</span>
          </span>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-[#716962] bg-[#fdfbf7] px-3 py-1 rounded-full border border-[#ebdccb]">
            <Flame className="w-3 h-3 text-[#c85a32]" />
            <span>
              {egg.warmedToday ? 'วันนี้มอบไออุ่นแล้ว' : 'แตะที่ไข่เพื่อส่งไออุ่น (+2 แต้ม)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
