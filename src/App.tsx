import React, { useState } from 'react';
import { FirebaseProvider } from './context/FirebaseContext';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { NavigationMenu } from './components/NavigationMenu';
import { HistoryScreen } from './components/HistoryScreen';
import { ChatScreen } from './components/ChatScreen';
import { OverviewDashboard } from './components/OverviewDashboard';
import { BookingScreen } from './components/BookingScreen';
import { KnowledgeScreen } from './components/KnowledgeScreen';

// Modals
import { BookingModal } from './components/BookingModal';
import { MoodDiaryModal } from './components/MoodDiaryModal';
import { AssessmentModal } from './components/AssessmentModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { PDFReportModal } from './components/PDFReportModal';
import { HealingSanctuaryModal } from './components/HealingSanctuaryModal';
import { EggHatchingCelebrationModal } from './components/EggHatchingCelebrationModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { AssessmentToolId, HatchedCharacter } from './types';

const AppContent: React.FC = () => {
  // Navigation tab state (start on 'overview' or 'history')
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  // Menu layout position state: 'top' for clean horizontal top bar, 'side' for vertical sidebar
  const [menuPosition, setMenuPosition] = useState<'top' | 'side'>('top');

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMoodDiaryOpen, setIsMoodDiaryOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedAssessmentTool, setSelectedAssessmentTool] = useState<AssessmentToolId>('DASS-21');
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isPDFReportOpen, setIsPDFReportOpen] = useState(false);
  const [isSanctuaryOpen, setIsSanctuaryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hatchedCharacter, setHatchedCharacter] = useState<HatchedCharacter | null>(null);

  const handleOpenAssessment = (toolId?: AssessmentToolId) => {
    if (toolId) {
      setSelectedAssessmentTool(toolId);
    }
    setIsAssessmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans text-[#221e1a] antialiased selection:bg-[#fbd5b5] selection:text-[#c85a32]">
      {/* 1. Unified Sticky Top Section: Brand Header & Navigation Bar */}
      <div className="sticky top-0 z-30 w-full shadow-2xs">
        <Header 
          onOpenSOS={() => setIsSOSOpen(true)} 
          onOpenSanctuary={() => setIsSanctuaryOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* 2. Top Navigation Bar (Active when menuPosition === 'top') */}
        {menuPosition === 'top' && (
          <NavigationMenu
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            chatUnreadCount={1}
            menuPosition={menuPosition}
            onTogglePosition={(pos) => setMenuPosition(pos)}
          />
        )}
      </div>

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Left Sidebar Menu (Active when menuPosition === 'side') */}
        {menuPosition === 'side' && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            chatUnreadCount={1}
            onTogglePosition={(pos) => setMenuPosition(pos)}
          />
        )}

        {/* Dynamic Screen Views with Optimal Full-Width Layout */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewDashboard
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenMoodDiary={() => setIsMoodDiaryOpen(true)}
              onOpenAssessment={(toolId) => handleOpenAssessment(toolId as any)}
              onOpenSanctuary={() => setIsSanctuaryOpen(true)}
              onEggHatched={(char) => setHatchedCharacter(char)}
              onOpenProfile={() => setIsProfileOpen(true)}
            />
          )}

          {activeTab === 'booking' && (
            <BookingScreen
              onSuccessNavigate={() => setActiveTab('history')}
            />
          )}

          {activeTab === 'history' && (
            <HistoryScreen
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenMoodDiary={() => setIsMoodDiaryOpen(true)}
              onOpenAssessment={() => handleOpenAssessment('DASS-21')}
              onOpenSOS={() => setIsSOSOpen(true)}
              onOpenChatWithPsychologist={() => setActiveTab('chat')}
              onDownloadReport={() => setIsPDFReportOpen(true)}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeScreen
              onOpenAssessment={(toolId) => handleOpenAssessment(toolId)}
            />
          )}

          {activeTab === 'chat' && (
            <ChatScreen
              onOpenSOS={() => setIsSOSOpen(true)}
              onOpenAssessment={() => handleOpenAssessment('PHQ-9')}
            />
          )}
        </main>
      </div>

      {/* Popups and Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <MoodDiaryModal
        isOpen={isMoodDiaryOpen}
        onClose={() => setIsMoodDiaryOpen(false)}
      />

      <AssessmentModal
        isOpen={isAssessmentOpen}
        initialToolId={selectedAssessmentTool}
        onClose={() => setIsAssessmentOpen(false)}
        onSentToChat={() => setActiveTab('chat')}
      />

      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

      <PDFReportModal
        isOpen={isPDFReportOpen}
        onClose={() => setIsPDFReportOpen(false)}
      />

      <HealingSanctuaryModal
        isOpen={isSanctuaryOpen}
        onClose={() => setIsSanctuaryOpen(false)}
        onOpenMoodDiary={() => {
          setIsSanctuaryOpen(false);
          setIsMoodDiaryOpen(true);
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <EggHatchingCelebrationModal
        isOpen={!!hatchedCharacter}
        character={hatchedCharacter}
        onClose={() => setHatchedCharacter(null)}
        onOpenSanctuary={() => {
          setHatchedCharacter(null);
          setIsSanctuaryOpen(true);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}
