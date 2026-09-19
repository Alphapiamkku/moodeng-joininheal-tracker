import React from 'react';
import { 
  LayoutGrid, 
  CalendarDays, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck,
  LayoutTemplate,
  PanelLeft
} from 'lucide-react';

export type NavTab = 'overview' | 'booking' | 'history' | 'knowledge' | 'chat';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  chatUnreadCount?: number;
  onTogglePosition?: (pos: 'top' | 'side') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  chatUnreadCount = 1,
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
    <aside className="w-full lg:w-64 bg-[#fffefb] border-r border-[#ebdccb] flex flex-col justify-between p-4 lg:p-5 flex-shrink-0 min-h-[calc(100vh-65px)] shadow-2xs transition-all">
      <div>
        {/* Section Title with Position Switcher */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-[11px] font-bold text-[#8c827a] uppercase tracking-wider">
            เมนูการใช้งาน
          </div>
          {onTogglePosition && (
            <button
              onClick={() => onTogglePosition('top')}
              className="text-[11px] text-[#c85a32] hover:text-[#b34d28] font-medium flex items-center gap-1 cursor-pointer bg-[#fef5ed] px-2 py-0.5 rounded-md border border-[#fbd5b5]"
              title="ย้ายเมนูไปไว้แถบด้านบน"
            >
              <LayoutTemplate className="w-3 h-3" />
              <span>ย้ายขึ้นด้านบน</span>
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#c85a32] text-white shadow-xs font-semibold'
                    : 'text-[#504843] hover:text-[#221e1a] hover:bg-[#f6f1e8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-[#716962]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.id === 'chat' && chatUnreadCount > 0 && !isActive && (
                  <span className="w-5 h-5 rounded-full bg-[#c85a32] text-white text-[11px] font-bold flex items-center justify-center">
                    {chatUnreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Support Info matching Image 3 and 7 */}
      <div className="mt-8 space-y-3 pt-4 border-t border-[#ebdccb]">
        {/* Hotline Box */}
        <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#ebdccb] text-xs text-[#574e47] space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 text-[#c85a32] font-semibold">
            <PhoneCall className="w-4 h-4 flex-shrink-0" />
            <span>สายด่วนพร้อมรับฟัง 24 ชม.</span>
          </div>
          <p className="text-[11px] text-[#716962] leading-relaxed">
            สายด่วนสุขภาพจิต กรมสุขภาพจิต โทร.{' '}
            <strong className="text-[#3d3935] font-semibold">1323</strong> หรือ ปรึกษาเร่งด่วนในเวลาราชการ
          </p>
        </div>

        {/* Confidentiality Notice */}
        <div className="flex items-start gap-2 px-1 text-[11px] text-[#80766e] leading-snug">
          <ShieldCheck className="w-4 h-4 text-[#65856c] flex-shrink-0 mt-0.5" />
          <span>ข้อมูลและการปรึกษาทั้งหมดเป็นความลับตามจรรยาบรรณวิชาชีพ</span>
        </div>
      </div>
    </aside>
  );
};
