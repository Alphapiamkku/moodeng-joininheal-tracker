import React from 'react';

interface KKULogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'wellness' | 'morecare';
  className?: string;
}

export const KKULogo: React.FC<KKULogoProps> = ({
  size = 'md',
  showSubtitle = true,
  variant = 'wellness',
  className = ''
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem matching Image 9 and Image 10 */}
      <div className={`relative flex items-center justify-center ${iconSize} rounded-2xl bg-gradient-to-br from-[#d35f34] to-[#ba4d24] shadow-sm flex-shrink-0 text-white`}>
        {/* Soft inner pin/heart motif */}
        <div className="w-[68%] h-[68%] bg-[#fdfbf7] rounded-full flex items-center justify-center shadow-inner">
          <div className="w-[62%] h-[62%] bg-[#f8be90] rounded-full flex items-center justify-center relative">
            {/* Gentle smile arc */}
            <div className="w-2.5 h-1 border-b-2 border-[#b54a22] rounded-full mt-0.5"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {variant === 'wellness' ? (
          <>
            <span className={`font-bold tracking-tight text-[#221e1a] leading-none ${titleSize}`}>
              KKU Wellness
            </span>
            {showSubtitle && (
              <span className="text-xs font-medium text-[#c85a32] mt-1 leading-none tracking-normal">
                ศูนย์สุขภาวะทางจิต มข.
              </span>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c85a32] bg-[#fef5ed] px-1.5 py-0.5 rounded border border-[#fbd5b5]">
                KKU
              </span>
              <span className="font-bold text-sm text-[#221e1a] tracking-tight">
                ศูนย์สุขภาวะทางจิต KKU MORE CARE
              </span>
            </div>
            {showSubtitle && (
              <span className="text-[11px] text-[#716962] leading-tight">
                KKU Student Wellness & Counseling System
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
