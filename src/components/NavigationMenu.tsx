import React from 'react';
import { 
  LayoutGrid, 
  CalendarDays, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck,
  PanelLeft,
  LayoutTemplate
} from 'lucide-react';
import { NavTab } from './Sidebar';

interface NavigationMenuProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  chatUnreadCount?: number;
  menuPosition: 'top' | 'side';
  onTogglePosition: (pos: 'top' | 'side') => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  activeTab,
  onSelectTab,
  chatUnreadCount = 1,
  menuPosition,
  onTogglePosition
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'ภาพรวมแดชบอร์ด', icon: LayoutGrid },
    { id: 'booking', label: 'จองเวลานัดหมาย', icon: CalendarDays },
    { id: 'history', label: 'ประวัติการรับคำปรึกษา', icon: FileText },
    { id: 'knowledge', label: 'คลังความรู้และประเมินตนเอง', icon: HelpCircle },
    { id: 'chat', label: 'แชทข้อความกับนักจิตวิทยา', icon: MessageSquare },
  ];

  return (
    <nav 
      aria-label="Navigation Menu Bar" 
      className="w-full bg-[#fffefb] border-b border-[#ebdccb] transition-all"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Section Label & Nav Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 no-scrollbar w-full sm:w-auto">
          <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#8c827a] uppercase tracking-wider pr-2 border-r border-[#ebdccb]">
            เมนูการใช้งาน:
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`top-nav-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#c85a32] text-white shadow-xs font-semibold'
                      : 'text-[#504843] hover:text-[#221e1a] bg-[#fdfbf7] hover:bg-[#f6f1e8] border border-[#ebdccb]/70'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-[#716962]'
                    }`}
                  />
                  <span>{item.label}</span>

                  {item.id === 'chat' && chatUnreadCount > 0 && !isActive && (
                    <span className="w-4 h-4 rounded-full bg-[#c85a32] text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                      {chatUnreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Info and Position Switcher */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-[#716962]">
          {/* Confidentiality Notice */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#65856c]">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>ข้อมูลเป็นความลับตามจรรยาบรรณวิชาชีพ</span>
          </div>

          {/* Position Selector */}
          <div className="flex items-center gap-1 bg-[#f6f1e8] p-1 rounded-xl border border-[#ebdccb] text-[11px]">
            <span className="text-[#8c827a] px-1.5 font-medium">ตำแหน่ง:</span>
            <button
              onClick={() => onTogglePosition('top')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                menuPosition === 'top'
                  ? 'bg-[#fffefb] text-[#c85a32] font-bold shadow-2xs'
                  : 'text-[#574e47] hover:text-[#221e1a]'
              }`}
              title="วางแถบเมนูไว้ด้านบน"
            >
              <LayoutTemplate className="w-3 h-3" />
              <span>ด้านบน</span>
            </button>
            <button
              onClick={() => onTogglePosition('side')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                menuPosition === 'side'
                  ? 'bg-[#fffefb] text-[#c85a32] font-bold shadow-2xs'
                  : 'text-[#574e47] hover:text-[#221e1a]'
              }`}
              title="วางแถบเมนูไว้ด้านข้าง (Sidebar)"
            >
              <PanelLeft className="w-3 h-3" />
              <span>ด้านข้าง</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
