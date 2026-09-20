import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { 
  Appointment, 
  ChatMessage, 
  ChatThread, 
  MoodEntry, 
  AssessmentResult,
  GamificationState,
  CharacterType,
  HatchedCharacter,
  EggState,
  CommunityCompanion,
  CommunityNote,
  UserProfile
} from '../types';
import { 
  INITIAL_APPOINTMENTS, 
  INITIAL_THREADS, 
  INITIAL_MESSAGES, 
  INITIAL_MOOD_HISTORY 
} from '../data/mockData';
import {
  INITIAL_GAMIFICATION_STATE,
  CHARACTERS_CATALOG,
  SEVEN_DAY_STEPS,
  INITIAL_COMMUNITY_COMPANIONS,
  INITIAL_COMMUNITY_NOTES
} from '../data/gamificationData';

const DEFAULT_USER_PROFILE: UserProfile = {
  uid: 'student-default',
  email: 'piampiamhathai@gmail.com',
  displayName: 'น้องมายด์',
  nickname: 'น้องมายด์',
  faculty: 'คณะแพทยศาสตร์',
  yearLevel: 'ชั้นปีที่ 3 (Junior)',
  studentId: '643040182-3',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
};

const getStoredUserProfile = (): UserProfile => {
  try {
    const saved = localStorage.getItem('kku_user_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_USER_PROFILE, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading stored user profile:', e);
  }
  return DEFAULT_USER_PROFILE;
};

interface FirebaseContextType {
  user: UserProfile | null;
  loading: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGmail: (email: string, customNickname?: string) => Promise<void>;
  signInDemoUser: () => void;
  signOut: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  updateUserProfile: (updates: {
    nickname?: string;
    faculty?: string;
    yearLevel?: string;
    studentId?: string;
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  appointments: Appointment[];
  activeFilter: 'all' | 'upcoming' | 'completed' | 'cancelled';
  setActiveFilter: (filter: 'all' | 'upcoming' | 'completed' | 'cancelled') => void;
  createAppointment: (apt: Omit<Appointment, 'id' | 'code'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  threads: ChatThread[];
  activeThreadId: string;
  setActiveThreadId: (id: string) => void;
  messages: ChatMessage[];
  sendMessage: (text: string, attachment?: ChatMessage['attachment']) => Promise<void>;
  sendAssessmentResult: (threadId: string, assessment: AssessmentResult) => Promise<void>;
  moodHistory: MoodEntry[];
  addMoodLog: (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => Promise<void>;
  assessments: AssessmentResult[];
  saveAssessment: (assessment: AssessmentResult) => Promise<void>;
  isDbConnected: boolean;
  gamification: GamificationState;
  tapEgg: () => void;
  claimStepReward: (day: number) => Promise<void>;
  hatchCurrentEgg: () => Promise<HatchedCharacter>;
  setActiveCompanion: (id: string) => Promise<void>;
  purchaseShopItem: (itemId: string, price: number) => Promise<boolean>;
  resetEggCycle: (targetCharacter?: CharacterType) => Promise<void>;
  simulateAdvanceEggDay: () => Promise<void>;
  communityCompanions: CommunityCompanion[];
  communityNotes: CommunityNote[];
  shareCompanionToCommunity: (message: string, faculty?: string) => Promise<void>;
  sendCheerToCompanion: (targetId: string, cheerType: 'heart' | 'hug' | 'tea') => Promise<void>;
  addCommunityNote: (content: string, moodTag: string, faculty?: string) => Promise<void>;
  reactToCommunityNote: (noteId: string, type: 'heart' | 'hug') => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(getStoredUserProfile);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(true);

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  // Chat State
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-pawinee');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES['thread-pawinee'] || []);

  // Mood & Assessment State
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(INITIAL_MOOD_HISTORY);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  // Gamification State
  const [gamification, setGamification] = useState<GamificationState>(() => {
    try {
      const saved = localStorage.getItem('kku_gamification_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('localStorage parse error:', e);
    }
    return INITIAL_GAMIFICATION_STATE;
  });

  // Community Sanctuary Companions & Notes State
  const [communityCompanions, setCommunityCompanions] = useState<CommunityCompanion[]>(() => {
    try {
      const saved = localStorage.getItem('kku_community_companions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('localStorage parse error for community companions:', e);
    }
    return INITIAL_COMMUNITY_COMPANIONS;
  });

  const [communityNotes, setCommunityNotes] = useState<CommunityNote[]>(() => {
    try {
      const saved = localStorage.getItem('kku_community_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('localStorage parse error for community notes:', e);
    }
    return INITIAL_COMMUNITY_NOTES;
  });

  const saveGamificationState = async (newState: GamificationState) => {
    setGamification(newState);
    try {
      localStorage.setItem('kku_gamification_state', JSON.stringify(newState));
      const uid = user?.uid || 'student-default';
      await setDoc(doc(db, 'gamification', uid), {
        ...newState,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (e) {
      console.warn('Failed to sync gamification state:', e);
    }
  };

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: User | null) => {
      if (fbUser) {
        const stored = getStoredUserProfile();
        const nickname = stored.nickname || fbUser.displayName || 'น้องมายด์';
        const profile: UserProfile = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: nickname,
          nickname: nickname,
          photoURL: fbUser.photoURL || stored.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
          studentId: stored.studentId || '643040182-3',
          faculty: stored.faculty || 'คณะแพทยศาสตร์',
          yearLevel: stored.yearLevel || 'ชั้นปีที่ 3 (Junior)'
        };
        setUser(profile);
        setIsGuest(false);

        try {
          localStorage.setItem('kku_user_profile', JSON.stringify(profile));
          await setDoc(doc(db, 'users', fbUser.uid), {
            ...profile,
            lastLoginAt: Date.now()
          }, { merge: true });
        } catch (err) {
          console.warn('Firestore user save notice:', err);
        }
      } else {
        const stored = getStoredUserProfile();
        setUser(stored);
        setIsGuest(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync Appointments with Firestore
  useEffect(() => {
    try {
      const q = collection(db, 'appointments');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const items: Appointment[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...docSnap.data() } as Appointment);
          });
          setAppointments(items);
          setIsDbConnected(true);
        } else {
          // If Firestore is empty, seed with initial appointments
          INITIAL_APPOINTMENTS.forEach(async (apt) => {
            try {
              await setDoc(doc(db, 'appointments', apt.id), apt);
            } catch (e) {
              console.warn('Seed appointment error:', e);
            }
          });
        }
      }, (err) => {
        console.warn('Firestore appointments listener notice:', err);
        setIsDbConnected(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore init notice:', err);
      setIsDbConnected(false);
    }
  }, []);

  // Sync Chat Messages with Firestore
  useEffect(() => {
    if (!activeThreadId) return;

    try {
      const msgRef = collection(db, 'threads', activeThreadId, 'messages');
      const q = query(msgRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const msgs: ChatMessage[] = [];
          snapshot.forEach((docSnap) => {
            msgs.push({ id: docSnap.id, ...docSnap.data() } as ChatMessage);
          });
          setMessages(msgs);
        } else {
          // Seed thread messages if empty
          const defaultMsgs = INITIAL_MESSAGES[activeThreadId] || [];
          setMessages(defaultMsgs);
          defaultMsgs.forEach(async (m) => {
            try {
              await setDoc(doc(db, 'threads', activeThreadId, 'messages', m.id), m);
            } catch (e) {
              console.warn('Seed message error:', e);
            }
          });
        }
      }, (err) => {
        console.warn('Firestore messages notice:', err);
        setMessages(INITIAL_MESSAGES[activeThreadId] || []);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore chat error:', err);
      setMessages(INITIAL_MESSAGES[activeThreadId] || []);
    }
  }, [activeThreadId]);

  // Sync Mood History
  useEffect(() => {
    try {
      const moodRef = collection(db, 'moodHistory');
      const unsubscribe = onSnapshot(moodRef, (snapshot) => {
        if (!snapshot.empty) {
          const list: MoodEntry[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as MoodEntry);
          });
          setMoodHistory(list.sort((a, b) => b.createdAt - a.createdAt));
        }
      }, (err) => {
        console.warn('Mood sync notice:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Mood init err:', e);
    }
  }, []);

  // Sync Community Garden and Community Notes with Firestore
  useEffect(() => {
    try {
      const gardenRef = collection(db, 'community_garden');
      const unsubscribeGarden = onSnapshot(gardenRef, (snapshot) => {
        if (!snapshot.empty) {
          const liveList: CommunityCompanion[] = [];
          snapshot.forEach((docSnap) => {
            liveList.push({ id: docSnap.id, ...docSnap.data() } as CommunityCompanion);
          });
          
          setCommunityCompanions((prev) => {
            const mergedMap = new Map<string, CommunityCompanion>();
            // Add initial mock companions first
            INITIAL_COMMUNITY_COMPANIONS.forEach(c => mergedMap.set(c.id, c));
            // Overwrite with previous in-memory state
            prev.forEach(c => mergedMap.set(c.id, c));
            // Overwrite with live Firestore docs
            liveList.forEach(c => mergedMap.set(c.id, c));
            const list = Array.from(mergedMap.values()).sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0));
            try {
              localStorage.setItem('kku_community_companions', JSON.stringify(list));
            } catch (e) {}
            return list;
          });
        } else {
          // Seed if Firestore collection is fresh
          INITIAL_COMMUNITY_COMPANIONS.forEach(async (comp) => {
            try {
              await setDoc(doc(db, 'community_garden', comp.id), comp);
            } catch (e) {}
          });
        }
      }, (err) => {
        console.warn('Firestore community_garden listener notice:', err);
      });

      const notesRef = collection(db, 'community_notes');
      const unsubscribeNotes = onSnapshot(notesRef, (snapshot) => {
        if (!snapshot.empty) {
          const liveNotes: CommunityNote[] = [];
          snapshot.forEach((docSnap) => {
            liveNotes.push({ id: docSnap.id, ...docSnap.data() } as CommunityNote);
          });

          setCommunityNotes((prev) => {
            const map = new Map<string, CommunityNote>();
            INITIAL_COMMUNITY_NOTES.forEach(n => map.set(n.id, n));
            prev.forEach(n => map.set(n.id, n));
            liveNotes.forEach(n => map.set(n.id, n));
            const list = Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
            try {
              localStorage.setItem('kku_community_notes', JSON.stringify(list));
            } catch (e) {}
            return list;
          });
        } else {
          INITIAL_COMMUNITY_NOTES.forEach(async (note) => {
            try {
              await setDoc(doc(db, 'community_notes', note.id), note);
            } catch (e) {}
          });
        }
      }, (err) => {
        console.warn('Firestore community_notes listener notice:', err);
      });

      return () => {
        unsubscribeGarden();
        unsubscribeNotes();
      };
    } catch (e) {
      console.warn('Community sync init error:', e);
    }
  }, []);

  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  // Direct Gmail or KKU Student Mail Sign-In (100% reliable in iFrame & Cloud Run)
  const signInWithGmail = async (email: string, customNickname?: string) => {
    try {
      setLoading(true);
      setAuthError(null);
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) {
        throw new Error('กรุณาระบุอีเมล');
      }

      const stored = getStoredUserProfile();
      const nickname = customNickname?.trim() || stored.nickname || cleanEmail.split('@')[0] || 'น้องมายด์';
      const uidKey = 'gmail-' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');

      const profile: UserProfile = {
        ...stored,
        uid: uidKey,
        email: cleanEmail,
        displayName: nickname,
        nickname: nickname,
      };

      setUser(profile);
      setIsGuest(false);

      // Persist to local storage
      try {
        localStorage.setItem('kku_user_profile', JSON.stringify(profile));
      } catch (e) {}

      // Persist / Sync to Firebase Firestore
      try {
        await setDoc(doc(db, 'users', uidKey), {
          ...profile,
          lastLoginAt: Date.now(),
          authProvider: 'gmail'
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore sync notice on Gmail sign in:', e);
      }
    } catch (err: any) {
      console.error('Sign in with Gmail error:', err);
      setAuthError(err?.message || 'ไม่สามารถเข้าสู่ระบบด้วย Gmail ได้ กรุณาลองใหม่อีกครั้ง');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign In with Google Popup (with clean fallback for iFrame / sandbox environments)
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const stored = getStoredUserProfile();
      const nickname = stored.nickname || fbUser.displayName || 'น้องมายด์';
      const profile: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: nickname,
        nickname: nickname,
        photoURL: fbUser.photoURL || stored.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        studentId: stored.studentId || '643040182-3',
        faculty: stored.faculty || 'คณะแพทยศาสตร์',
        yearLevel: stored.yearLevel || 'ชั้นปีที่ 3 (Junior)'
      };
      setUser(profile);
      setIsGuest(false);
      try {
        localStorage.setItem('kku_user_profile', JSON.stringify(profile));
        await setDoc(doc(db, 'users', fbUser.uid), {
          ...profile,
          lastLoginAt: Date.now(),
          authProvider: 'google-popup'
        }, { merge: true });
      } catch (e) {
        console.warn('Sync firestore user notice:', e);
      }
    } catch (error: any) {
      console.warn('Google sign-in notice (likely popup restriction in iframe):', error);
      // If popup blocked or domain restriction in iframe sandbox, provide clear notification
      const isPopupOrDomainIssue = 
        error?.code === 'auth/popup-blocked' || 
        error?.code === 'auth/unauthorized-domain' ||
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/internal-error';

      if (isPopupOrDomainIssue) {
        setAuthError('ระบบเบราว์เซอร์หรือ iFrame พรีวิวบล็อกหน้าต่าง Popup ของ Google กรุณาเลือกวิธี "เข้าสู่ระบบด้วย Gmail ทันที" ได้เลย');
      } else {
        setAuthError(error?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ Google');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInDemoUser = () => {
    const stored = getStoredUserProfile();
    const demoProfile: UserProfile = {
      ...stored,
      uid: 'user-kku-sample',
      email: 'piampiamhathai@gmail.com',
    };
    setUser(demoProfile);
    setIsGuest(false);
    try {
      localStorage.setItem('kku_user_profile', JSON.stringify(demoProfile));
    } catch (e) {}
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      const stored = getStoredUserProfile();
      setUser(stored);
      setIsGuest(true);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const updateUserProfile = async (updates: {
    nickname?: string;
    faculty?: string;
    yearLevel?: string;
    studentId?: string;
    displayName?: string;
    photoURL?: string;
  }) => {
    const base = user || getStoredUserProfile();
    const newNickname = updates.nickname !== undefined ? updates.nickname.trim() : base.nickname;
    const newFaculty = updates.faculty !== undefined ? updates.faculty : base.faculty;
    const newYearLevel = updates.yearLevel !== undefined ? updates.yearLevel : base.yearLevel;
    const newStudentId = updates.studentId !== undefined ? updates.studentId.trim() : base.studentId;
    const newPhotoURL = updates.photoURL || base.photoURL;

    const updated: UserProfile = {
      ...base,
      nickname: newNickname,
      displayName: newNickname || updates.displayName || base.displayName,
      faculty: newFaculty,
      yearLevel: newYearLevel,
      studentId: newStudentId,
      photoURL: newPhotoURL
    };

    setUser(updated);

    try {
      localStorage.setItem('kku_user_profile', JSON.stringify(updated));
    } catch (e) {}

    // Save to Firestore if uid exists
    if (base.uid) {
      try {
        await setDoc(doc(db, 'users', base.uid), {
          ...updated,
          updatedAt: Date.now()
        }, { merge: true });
      } catch (err) {
        console.warn('Update user firestore err:', err);
      }
    }

    // Update community garden companions if user has an existing entry
    setCommunityCompanions((compList) => {
      const yearShort = newYearLevel ? newYearLevel.replace(/ชั้นปีที่\s*/, 'ปี ').split(' ')[0] : '';
      const updatedComps = compList.map((c) => {
        if (c.userId === base.uid) {
          const compUpdated = {
            ...c,
            userName: newNickname ? `${newNickname} (${yearShort})` : c.userName,
            userFaculty: newFaculty
          };
          setDoc(doc(db, 'community_garden', c.id), compUpdated, { merge: true }).catch(() => {});
          return compUpdated;
        }
        return c;
      });
      try {
        localStorage.setItem('kku_community_companions', JSON.stringify(updatedComps));
      } catch (e) {}
      return updatedComps;
    });
  };

  // Create Appointment
  const createAppointment = async (aptData: Omit<Appointment, 'id' | 'code'>) => {
    const newCode = `KKU-WL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newId = `apt-${Date.now()}`;
    const newApt: Appointment = {
      ...aptData,
      id: newId,
      code: newCode
    };

    // Optimistic update
    setAppointments((prev) => [newApt, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'appointments', newId), newApt);
    } catch (err) {
      console.warn('Failed to persist appointment to Firestore:', err);
    }
  };

  // Update Appointment
  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    try {
      await setDoc(doc(db, 'appointments', id), updates, { merge: true });
    } catch (err) {
      console.warn('Failed to update appointment in Firestore:', err);
    }
  };

  // Send Message
  const sendMessage = async (text: string, attachment?: ChatMessage['attachment']) => {
    if (!text.trim() && !attachment) return;

    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;
    const newId = `msg-${Date.now()}`;

    const newMsg: ChatMessage = {
      id: newId,
      threadId: activeThreadId,
      senderId: user?.uid || 'student-user',
      senderName: user?.displayName ? `คุณ (${user.displayName})` : 'คุณ (กานต์พิชชา)',
      senderRole: 'student',
      senderAvatar: user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      text,
      timestamp: Date.now(),
      timeFormatted,
      isRead: false,
      attachment
    };

    // Local update
    setMessages((prev) => [...prev, newMsg]);

    // Update thread preview
    setThreads((prev) =>
      prev.map((th) =>
        th.id === activeThreadId
          ? {
              ...th,
              lastMessage: text.slice(0, 30) + (text.length > 30 ? '...' : ''),
              lastMessageTime: timeFormatted
            }
          : th
      )
    );

    // Save to Firestore
    try {
      await setDoc(doc(db, 'threads', activeThreadId, 'messages', newId), newMsg);
      await setDoc(doc(db, 'threads', activeThreadId), {
        lastMessage: text.slice(0, 30) + (text.length > 30 ? '...' : ''),
        lastMessageTime: timeFormatted,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (err) {
      console.warn('Failed to save message to Firestore:', err);
    }

    // Simulated Psychologist Warm Caring Response
    if (activeThreadId === 'thread-pawinee') {
      setTimeout(async () => {
        const counselorReplyId = `msg-counselor-${Date.now()}`;
        const replyDate = new Date();
        const replyTime = `${String(replyDate.getHours()).padStart(2, '0')}:${String(replyDate.getMinutes()).padStart(2, '0')} น.`;

        let replyText = 'อาจารย์ได้รับข้อความแล้วนะคะ ยินดีที่คุณสังเกตและสื่อสารความรู้สึกของตนเองออกมาอย่างสม่ำเสมอ พักผ่อนให้เพียงพอนะคะ 🌿';
        if (text.includes('ขอบคุณ')) {
          replyText = 'ยินดีเป็นอย่างยิ่งค่ะคุณกานต์พิชชา พักผ่อนให้สบายใจนะคะ หากมีเรื่องกังวลใจแวะมาส่งข้อความไว้ได้ตลอดค่ะ 🌸';
        } else if (text.includes('ด่วน') || text.includes('นัด')) {
          replyText = 'หากต้องการพูดคุยเร่งด่วน อาจารย์มีคิวแทรกวันพุธนี้เวลา 11:00 น. หรือสามารถแจ้งผ่านปุ่มจองเวลานัดหมายได้เลยนะคะ หรือหากวิกฤตกดปุ่ม SOS สีแดงด้านบนได้ตลอด 24 ชม. ค่ะ';
        } else if (text.includes('แบบฝึกหัด')) {
          replyText = 'ยอดเยี่ยมมากเลยค่ะ! การฝึก PMR สม่ำเสมอจะช่วยให้กล้ามเนื้อและระบบประสาทจดจำภาวะผ่อนคลายได้เร็วขึ้น ขอชื่นชมในความตั้งใจนะคะ 👍';
        }

        const counselorMsg: ChatMessage = {
          id: counselorReplyId,
          threadId: activeThreadId,
          senderId: 'counselor-1',
          senderName: 'อ.ดร. ภาวิณี',
          senderRole: 'counselor',
          senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
          text: replyText,
          timestamp: Date.now(),
          timeFormatted: replyTime,
          isRead: true
        };

        setMessages((prev) => [...prev, counselorMsg]);

        try {
          await setDoc(doc(db, 'threads', activeThreadId, 'messages', counselorReplyId), counselorMsg);
        } catch (e) {
          console.warn('Counselor reply save err:', e);
        }
      }, 1500);
    }
  };

  // Send Assessment Result to Counselor
  const sendAssessmentResult = async (threadId: string, assessment: AssessmentResult) => {
    let emotionInfo = '';
    if (assessment.dominantEmotionTh) {
      emotionInfo = `\n🌟 สภาวะอารมณ์เด่น: ${assessment.dominantEmotionTh}`;
      if (assessment.emotionBreakdown) {
        emotionInfo += `\n• สัดส่วน 3 อารมณ์: 🌿 มีความสุข ${assessment.emotionBreakdown.happy}% | 💧 เศร้า ${assessment.emotionBreakdown.sad}% | ⚡ วิตกกังวล ${assessment.emotionBreakdown.anxiety}%`;
      }
    }
    let subscaleInfo = '';
    if (assessment.subscales && assessment.subscales.length > 0) {
      subscaleInfo = '\n📊 มิติย่อย: ' + assessment.subscales.map(s => `${s.nameTh} ${s.score}/${s.maxScore} (${s.level})`).join(' | ');
    }
    const recText = Array.isArray(assessment.recommendations) 
      ? assessment.recommendations.slice(0, 2).join(' • ')
      : assessment.recommendations;
    
    const text = `📋 ส่งผลการประเมินตนเอง: ${assessment.toolTitle || assessment.type}\n• คะแนนรวม: ${assessment.score}/${assessment.maxScore} [${assessment.level}]${emotionInfo}${subscaleInfo}\n• ทฤษฎีอ้างอิง: ${assessment.theoryName || 'ทฤษฎีจิตวิทยาคลินิก'}\n• สถานะ: ได้ทดลองปฏิบัติตามแผนดูแลตนเองเบื้องต้นแล้ว แต่ยังรู้สึกไม่ดีขึ้น จึงส่งผลเพื่อขอนัดหมายรับคำปรึกษาจากนักจิตวิทยาค่ะ\n• แนวทางดูแลเบื้องต้น: ${recText}`;
    await sendMessage(text);
  };

  // Add Mood Log with Gamification Progression
  const addMoodLog = async (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => {
    const id = `mood-${Date.now()}`;
    const newEntry: MoodEntry = {
      ...entry,
      id,
      userId: user?.uid,
      createdAt: Date.now()
    };

    setMoodHistory((prev) => [newEntry, ...prev]);

    try {
      await setDoc(doc(db, 'moodHistory', id), newEntry);
    } catch (err) {
      console.warn('Failed to save mood log to Firestore:', err);
    }

    // Advance Gamification Progress
    const todayStr = new Date().toISOString().split('T')[0];
    const isFirstTimeToday = gamification.lastCheckInDate !== todayStr;
    const currentEggDay = gamification.currentEgg.currentDay;
    const nextDay = Math.min(7, currentEggDay + (isFirstTimeToday || !gamification.currentEgg.warmedToday ? 1 : 0));
    
    let bonusEarned = 0;
    const claimed = [...gamification.claimedStepRewards];
    if (nextDay >= 3 && !claimed.includes(3)) {
      bonusEarned += 100;
      claimed.push(3);
    }
    if (nextDay >= 5 && !claimed.includes(5)) {
      bonusEarned += 150;
      claimed.push(5);
    }

    const updatedGamification: GamificationState = {
      ...gamification,
      points: gamification.points + 50 + bonusEarned,
      currentStreak: isFirstTimeToday ? gamification.currentStreak + 1 : gamification.currentStreak,
      maxStreak: Math.max(gamification.maxStreak, isFirstTimeToday ? gamification.currentStreak + 1 : gamification.currentStreak),
      totalCheckIns: gamification.totalCheckIns + 1,
      lastCheckInDate: todayStr,
      claimedStepRewards: claimed,
      currentEgg: {
        ...gamification.currentEgg,
        currentDay: nextDay,
        warmedToday: true,
        warmthEnergy: 100,
        lastWarmedDate: todayStr
      }
    };
    await saveGamificationState(updatedGamification);
  };

  // Tap egg to send warmth
  const tapEgg = () => {
    const updatedEgg = {
      ...gamification.currentEgg,
      warmthEnergy: Math.min(100, (gamification.currentEgg.warmthEnergy || 0) + 5),
      tapsCountToday: (gamification.currentEgg.tapsCountToday || 0) + 1
    };
    const updated: GamificationState = {
      ...gamification,
      points: gamification.points + 2, // fun +2 point reward for cheering egg
      currentEgg: updatedEgg
    };
    saveGamificationState(updated);
  };

  // Claim Step Reward (day 3, 5, 7)
  const claimStepReward = async (day: number) => {
    if (gamification.claimedStepRewards.includes(day)) return;
    const step = SEVEN_DAY_STEPS.find((s) => s.day === day);
    const bonus = step?.bonusPoints || 0;
    const updated: GamificationState = {
      ...gamification,
      points: gamification.points + bonus,
      claimedStepRewards: [...gamification.claimedStepRewards, day]
    };
    await saveGamificationState(updated);
  };

  // Hatch current egg on Day 7
  const hatchCurrentEgg = async (): Promise<HatchedCharacter> => {
    const targetType = gamification.currentEgg.targetCharacterType || 'moo_deng';
    const def = CHARACTERS_CATALOG[targetType];
    const newCharacter: HatchedCharacter = {
      id: `char-${targetType}-${Date.now()}`,
      characterType: targetType,
      name: def.name,
      title: def.title,
      tagline: def.tagline,
      personality: def.personality,
      quote: def.quote,
      hatchedAt: Date.now(),
      level: 1,
      affection: 100,
      rarity: def.rarity,
      badge: def.badge,
      themeColor: def.themeColor,
      avatarIcon: def.avatarIcon
    };

    // Determine next egg candidate
    const allTypes: CharacterType[] = ['moo_deng', 'mor_din_daeng', 'si_than_lotus', 'khon_kaen_dino', 'kalapruek_bloom', 'phu_pha_man_bat'];
    const hatchedTypes = [...gamification.hatchedCharacters.map((c) => c.characterType), targetType];
    const unhatched = allTypes.find((t) => !hatchedTypes.includes(t)) || allTypes[(hatchedTypes.length) % allTypes.length];

    const nextEgg: EggState = {
      id: `egg-${Date.now()}`,
      eggType: targetType === 'moo_deng' ? 'lotus_pink' : 'healing_amber',
      eggName: `ไข่แห่งความหวังใบใหม่`,
      currentDay: 1,
      warmedToday: false,
      warmthEnergy: 20,
      startedAt: Date.now(),
      targetCharacterType: unhatched,
      tapsCountToday: 0
    };

    const updated: GamificationState = {
      ...gamification,
      points: gamification.points + 500, // Mega +500 Hatch Day bonus!
      hatchedCharacters: [newCharacter, ...gamification.hatchedCharacters],
      activeCompanionId: newCharacter.id,
      claimedStepRewards: [...gamification.claimedStepRewards, 7],
      currentEgg: nextEgg
    };

    await saveGamificationState(updated);
    return newCharacter;
  };

  // Switch Active Companion
  const setActiveCompanion = async (id: string) => {
    const updated: GamificationState = {
      ...gamification,
      activeCompanionId: id
    };
    await saveGamificationState(updated);
  };

  // Purchase item in Shop
  const purchaseShopItem = async (itemId: string, price: number): Promise<boolean> => {
    if (gamification.points < price) return false;
    if (gamification.inventory.includes(itemId)) return true;
    const updated: GamificationState = {
      ...gamification,
      points: gamification.points - price,
      inventory: [...gamification.inventory, itemId]
    };
    await saveGamificationState(updated);
    return true;
  };

  // Reset or pick next egg
  const resetEggCycle = async (targetCharacter?: CharacterType) => {
    const target = targetCharacter || 'moo_deng';
    const nextEgg: EggState = {
      id: `egg-${Date.now()}`,
      eggType: 'healing_amber',
      eggName: 'ไข่ฮีลใจใบใหม่',
      currentDay: 1,
      warmedToday: false,
      warmthEnergy: 15,
      startedAt: Date.now(),
      targetCharacterType: target,
      tapsCountToday: 0
    };
    const updated: GamificationState = {
      ...gamification,
      claimedStepRewards: [],
      currentEgg: nextEgg
    };
    await saveGamificationState(updated);
  };

  // Fast demo simulation to test advancing day by day
  const simulateAdvanceEggDay = async () => {
    const currentDay = gamification.currentEgg.currentDay;
    const nextDay = currentDay >= 7 ? 1 : currentDay + 1;
    const updated: GamificationState = {
      ...gamification,
      currentStreak: gamification.currentStreak + 1,
      points: gamification.points + 50,
      currentEgg: {
        ...gamification.currentEgg,
        currentDay: nextDay,
        warmedToday: true,
        warmthEnergy: 100
      }
    };
    await saveGamificationState(updated);
  };

  // Save Assessment
  const saveAssessment = async (assessment: AssessmentResult) => {
    setAssessments((prev) => [assessment, ...prev]);
    try {
      await setDoc(doc(db, 'assessments', assessment.id), {
        ...assessment,
        userId: user?.uid,
        createdAt: Date.now()
      });
    } catch (err) {
      console.warn('Failed to save assessment to Firestore:', err);
    }
  };

  // Community Garden & Cheering Actions
  const shareCompanionToCommunity = async (message: string, faculty?: string) => {
    const activeComp = gamification.hatchedCharacters.find(c => c.id === gamification.activeCompanionId) || gamification.hatchedCharacters[0];
    const companionId = user ? `user-${user.uid}` : `guest-user`;
    
    const userNick = user?.nickname || user?.displayName || 'นักศึกษา มข.';
    const yearShort = user?.yearLevel ? user.yearLevel.replace(/ชั้นปีที่\s*/, 'ปี ').split(' ')[0] : '';
    const formattedUserName = yearShort ? `${userNick} (${yearShort})` : userNick;

    const newEntry: CommunityCompanion = {
      id: companionId,
      userId: user?.uid || 'guest-user',
      userName: formattedUserName,
      userFaculty: faculty || user?.faculty || 'คณะแพทยศาสตร์',
      avatarIcon: activeComp ? activeComp.avatarIcon : '🥚',
      characterType: activeComp ? activeComp.characterType : 'mor_din_daeng',
      characterName: activeComp ? activeComp.name : 'ไข่เพื่อนซี้',
      eggDay: gamification.currentEgg.currentDay,
      streakDays: gamification.currentStreak,
      message: message.trim() || 'แวะมาส่งพลังใจให้เพื่อนๆ มข. ทุกคนนะฮับ 💖',
      cheersCount: 1,
      hugsCount: 0,
      teasCount: 0,
      lastActive: Date.now(),
      isOnline: true,
      equippedBadge: activeComp?.badge
    };

    setCommunityCompanions(prev => {
      const filtered = prev.filter(c => c.id !== companionId && c.userId !== (user?.uid || 'guest-user'));
      const nextList = [newEntry, ...filtered];
      try {
        localStorage.setItem('kku_community_companions', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    // Award +25 points for joining the community
    const updated: GamificationState = {
      ...gamification,
      points: gamification.points + 25
    };
    await saveGamificationState(updated);

    try {
      await setDoc(doc(db, 'community_garden', companionId), newEntry);
    } catch (e) {
      console.warn('Sync community_garden error:', e);
    }
  };

  const sendCheerToCompanion = async (targetId: string, cheerType: 'heart' | 'hug' | 'tea') => {
    let updatedTarget: CommunityCompanion | undefined;
    setCommunityCompanions(prev => {
      const nextList = prev.map(c => {
        if (c.id === targetId) {
          updatedTarget = {
            ...c,
            cheersCount: cheerType === 'heart' ? c.cheersCount + 1 : c.cheersCount,
            hugsCount: cheerType === 'hug' ? c.hugsCount + 1 : c.hugsCount,
            teasCount: cheerType === 'tea' ? c.teasCount + 1 : c.teasCount,
            lastActive: Date.now()
          };
          return updatedTarget;
        }
        return c;
      });
      try {
        localStorage.setItem('kku_community_companions', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    // Award +5 points for cheering friends
    const updatedGame: GamificationState = {
      ...gamification,
      points: gamification.points + 5
    };
    await saveGamificationState(updatedGame);

    if (updatedTarget) {
      try {
        await setDoc(doc(db, 'community_garden', targetId), updatedTarget, { merge: true });
      } catch (e) {
        console.warn('Sync cheer error:', e);
      }
    }
  };

  const addCommunityNote = async (content: string, moodTag: string, faculty?: string) => {
    const activeComp = gamification.hatchedCharacters.find(c => c.id === gamification.activeCompanionId) || gamification.hatchedCharacters[0];
    const noteId = `note-${Date.now()}`;
    const userNick = user?.nickname || user?.displayName || 'นักศึกษา มข.';
    const yearShort = user?.yearLevel ? user.yearLevel.replace(/ชั้นปีที่\s*/, 'ปี ').split(' ')[0] : '';
    const formattedUserName = yearShort ? `${userNick} (${yearShort})` : userNick;

    const newNote: CommunityNote = {
      id: noteId,
      userId: user?.uid || 'guest-user',
      userName: formattedUserName,
      userFaculty: faculty || user?.faculty || 'คณะแพทยศาสตร์',
      characterIcon: activeComp ? activeComp.avatarIcon : '🌸',
      content: content.trim(),
      moodTag: moodTag || 'กำลังใจช่วงสอบ',
      hearts: 1,
      hugs: 0,
      createdAt: Date.now()
    };

    setCommunityNotes(prev => {
      const nextList = [newNote, ...prev];
      try {
        localStorage.setItem('kku_community_notes', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    // Award +20 points for spreading positivity
    const updatedGame: GamificationState = {
      ...gamification,
      points: gamification.points + 20
    };
    await saveGamificationState(updatedGame);

    try {
      await setDoc(doc(db, 'community_notes', noteId), newNote);
    } catch (e) {
      console.warn('Sync note error:', e);
    }
  };

  const reactToCommunityNote = async (noteId: string, type: 'heart' | 'hug') => {
    let updatedNote: CommunityNote | undefined;
    setCommunityNotes(prev => {
      const nextList = prev.map(n => {
        if (n.id === noteId) {
          updatedNote = {
            ...n,
            hearts: type === 'heart' ? n.hearts + 1 : n.hearts,
            hugs: type === 'hug' ? n.hugs + 1 : n.hugs
          };
          return updatedNote;
        }
        return n;
      });
      try {
        localStorage.setItem('kku_community_notes', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    // Small cheer bonus
    const updatedGame: GamificationState = {
      ...gamification,
      points: gamification.points + 2
    };
    await saveGamificationState(updatedGame);

    if (updatedNote) {
      try {
        await setDoc(doc(db, 'community_notes', noteId), updatedNote, { merge: true });
      } catch (e) {
        console.warn('Sync note reaction error:', e);
      }
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        isGuest,
        signInWithGoogle,
        signInWithGmail,
        signInDemoUser,
        signOut,
        authError,
        clearAuthError,
        updateUserProfile,
        appointments,
        activeFilter,
        setActiveFilter,
        createAppointment,
        updateAppointment,
        threads,
        activeThreadId,
        setActiveThreadId,
        messages,
        sendMessage,
        sendAssessmentResult,
        moodHistory,
        addMoodLog,
        assessments,
        saveAssessment,
        isDbConnected,
        gamification,
        tapEgg,
        claimStepReward,
        hatchCurrentEgg,
        setActiveCompanion,
        purchaseShopItem,
        resetEggCycle,
        simulateAdvanceEggDay,
        communityCompanions,
        communityNotes,
        shareCompanionToCommunity,
        sendCheerToCompanion,
        addCommunityNote,
        reactToCommunityNote
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
