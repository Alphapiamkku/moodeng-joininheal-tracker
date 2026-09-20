export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  nickname?: string;
  faculty: string;
  yearLevel: string;
  studentId?: string;
  photoURL: string | null;
}

export interface Appointment {
  id: string;
  code: string;
  date: string;
  time: string;
  datetimeISO?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  sessionNumber?: number;
  isFirstIntake?: boolean;
  type: string;
  counselorName: string;
  counselorRole: string;
  counselorAvatar: string;
  room?: string;
  topic: string;
  nextGoal?: string;
  counselorNotes?: string;
  homework?: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
  homeworkCompletionRate?: number;
  materials?: {
    title: string;
    type: string;
    size: string;
    downloadUrl?: string;
  }[];
  rating?: number;
  stressScore?: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'counselor' | 'staff';
  senderAvatar: string;
  text: string;
  timestamp: number;
  timeFormatted: string;
  isRead: boolean;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ChatThread {
  id: string;
  counselorName: string;
  counselorRole: string;
  counselorAvatar: string;
  status: 'online' | 'offline' | 'busy';
  statusText: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  category: 'psychologist' | 'coordinator';
  nextAppointment?: string;
  credentials?: string;
}

export interface MoodEntry {
  id: string;
  userId?: string;
  date: string;
  moodLevel: 'calm' | 'good' | 'neutral' | 'stressed' | 'exhausted';
  stressScore: number;
  note: string;
  symptoms: string[];
  createdAt: number;
}

export type AssessmentToolId = 'TRI-EMO' | 'DASS-21' | 'ST-5' | 'GAD-7' | 'PHQ-9' | 'MBI-SS' | '2Q';

export interface AssessmentSubscaleScore {
  name: string;
  nameTh: string;
  score: number;
  maxScore: number;
  level: string;
  color: string;
  description: string;
}

export interface SelfCareTechnique {
  name: string;
  category: 'breath' | 'mindset' | 'action' | 'rest';
  action: string;
  duration: string;
}

export interface AssessmentSelfCarePlan {
  title: string;
  badge: string;
  trialDays: number;
  coreAdvice: string;
  techniques: SelfCareTechnique[];
  checklist: string[];
  whenToSeekHelp: string[];
}

export interface AssessmentResult {
  id: string;
  userId?: string;
  type: AssessmentToolId;
  toolTitle: string;
  theoryName: string;
  score: number;
  maxScore: number;
  level: string;
  severityGrade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe';
  date: string;
  timestamp: number;
  recommendations: string[];
  subscales?: AssessmentSubscaleScore[];
  counselorNotificationSent?: boolean;
  dominantEmotion?: 'happy' | 'sad' | 'anxiety' | 'balanced';
  dominantEmotionTh?: string;
  emotionBreakdown?: {
    happy: number; // 0-100%
    sad: number; // 0-100%
    anxiety: number; // 0-100%
  };
  selfCarePlan?: AssessmentSelfCarePlan;
}

export interface ScreenerQuestion {
  id: number;
  text: string;
  subscale?: string;
}

export interface ScreenerScaleOption {
  value: number;
  label: string;
  description?: string;
}

export interface PsychologicalScreener {
  id: AssessmentToolId;
  name: string;
  nameTh: string;
  category: 'stress' | 'anxiety' | 'depression' | 'burnout' | 'general';
  categoryTh: string;
  badge: string;
  theory: {
    name: string;
    theorist: string;
    year: string;
    summary: string;
    mechanism: string;
  };
  targetTime: string;
  description: string;
  questions: ScreenerQuestion[];
  scaleOptions: ScreenerScaleOption[];
  calculateResult: (answers: Record<number, number>) => {
    score: number;
    maxScore: number;
    level: string;
    severityGrade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe';
    recommendations: string[];
    subscales?: AssessmentSubscaleScore[];
    dominantEmotion?: 'happy' | 'sad' | 'anxiety' | 'balanced';
    dominantEmotionTh?: string;
    emotionBreakdown?: {
      happy: number;
      sad: number;
      anxiety: number;
    };
    selfCarePlan?: AssessmentSelfCarePlan;
  };
}

export type CharacterType = 
  | 'moo_deng' 
  | 'mor_din_daeng' 
  | 'si_than_lotus' 
  | 'khon_kaen_dino' 
  | 'kalapruek_bloom' 
  | 'phu_pha_man_bat';

export interface HatchedCharacter {
  id: string;
  characterType: CharacterType;
  name: string;
  title: string;
  tagline: string;
  personality: string;
  quote: string;
  hatchedAt: number;
  level: number;
  affection: number;
  rarity: 'common' | 'rare' | 'legendary';
  equippedItem?: string;
  badge: string;
  themeColor: string;
  avatarIcon: string;
}

export interface EggState {
  id: string;
  eggType: 'healing_amber' | 'lotus_pink' | 'dino_emerald' | 'celestial_blue';
  eggName: string;
  currentDay: number; // 1 to 7
  warmedToday: boolean;
  warmthEnergy: number; // 0 to 100%
  startedAt: number;
  lastWarmedDate?: string;
  targetCharacterType: CharacterType;
  tapsCountToday: number;
}

export interface GamificationState {
  points: number; // แต้มใจดี (Mind Points)
  currentStreak: number; // วันบันทึกต่อเนื่อง
  maxStreak: number;
  totalCheckIns: number;
  currentEgg: EggState;
  hatchedCharacters: HatchedCharacter[];
  activeCompanionId: string;
  claimedStepRewards: number[]; // e.g. [3, 5, 7]
  inventory: string[]; // Unlocked item IDs
  lastCheckInDate?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'accessory' | 'kku_perk' | 'garden';
  price: number;
  description: string;
  icon: string;
  tag?: string;
}

export interface CommunityCompanion {
  id: string;
  userId: string;
  userName: string;
  userFaculty: string;
  avatarIcon: string;
  characterType: CharacterType;
  characterName: string;
  eggDay: number;
  streakDays: number;
  message: string;
  cheersCount: number;
  hugsCount: number;
  teasCount: number;
  lastActive: number;
  isOnline?: boolean;
  equippedBadge?: string;
}

export interface CommunityNote {
  id: string;
  userId: string;
  userName: string;
  userFaculty: string;
  characterIcon: string;
  content: string;
  moodTag: string; // 'กำลังใจช่วงสอบ' | 'เรื่องใจฟูวันนี้' | 'ปลอบใจวันเหนื่อย' | 'เพลง/ชาร้อนฮีลใจ'
  hearts: number;
  hugs: number;
  createdAt: number;
}
