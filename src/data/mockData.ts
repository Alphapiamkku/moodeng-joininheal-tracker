import { Appointment, ChatMessage, ChatThread, MoodEntry } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    code: 'KKU-WL-67094',
    date: '18 ต.ค. 2567',
    time: '13:30 น.',
    datetimeISO: '2024-10-18T13:30:00',
    status: 'upcoming',
    sessionNumber: 4,
    type: 'ห้องให้คำปรึกษา C-204 หรือ ผ่านวิดีโอคอล',
    counselorName: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
    counselorRole: 'นักจิตวิทยาคลินิกชำนาญการ',
    counselorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    room: 'ห้องให้คำปรึกษา C-204',
    topic: 'การติดตามผลและฝึกเทคนิคการเผชิญความวิตกกังวล',
    nextGoal: 'ติดตามผลหลังการประยุกต์เทคนิค PMR ในช่วงอ่านหนังสือสอบกลางภาค และผลการบันทึกระดับความวิตกกังวลประจำวัน',
    counselorNotes: 'ลิงก์ห้องสนทนาออนไลน์จะเปิดก่อนเวลา 15 นาที'
  },
  {
    id: 'apt-2',
    code: 'KKU-WL-67042',
    date: '10 ต.ค. 2567',
    time: '14:00 - 15:00 น.',
    datetimeISO: '2024-10-10T14:00:00',
    status: 'completed',
    sessionNumber: 3,
    type: 'การให้คำปรึกษารายบุคคล (On-site)',
    counselorName: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
    counselorRole: 'ศูนย์สุขภาวะทางจิต มข.',
    counselorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    room: 'ห้อง C-204',
    topic: 'การจัดการความวิตกกังวลช่วงเตรียมสอบและปัญหานอนหลับ',
    homeworkCompletionRate: 80,
    homework: [
      {
        id: 'hw-1',
        title: 'ฝึกเทคนิคผ่อนคลายกล้ามเนื้อ (PMR)',
        description: 'วันละ 15 นาทีก่อนนอน เพื่อลดความตึงเครียดของร่างกายส่วนคอบ่าไหล่',
        completed: true
      },
      {
        id: 'hw-2',
        title: 'บันทึกไดอารี่อารมณ์ (Thought Record)',
        description: 'จดบันทึกสิ่งที่คิดขณะตื่นกลางดึก ไม่ฝืนนอนต่อหากนอนไม่หลับเกิน 20 นาที',
        completed: true
      }
    ],
    counselorNotes: 'นักศึกษาเริ่มตระหนักถึงสัญญาณความเครียดทางกายภาพได้เร็วขึ้น การนำเทคนิคหายใจชะลอชีพจรมาใช้ก่อนอ่านหนังสือได้ผลน่าพอใจ แนะนำให้ปฏิบัติต่อเนื่องและหลีกเลี่ยงคาเฟอีนหลังเวลา 16:00 น.',
    rating: 5
  },
  {
    id: 'apt-3',
    code: 'KKU-WL-66998',
    date: '26 ก.ย. 2567',
    time: '10:30 - 11:30 น.',
    datetimeISO: '2024-09-26T10:30:00',
    status: 'completed',
    sessionNumber: 2,
    type: 'ออนไลน์ผ่าน Google Meet',
    counselorName: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
    counselorRole: 'นักจิตวิทยาการปรึกษา',
    counselorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    topic: 'การปรับสมดุลชีวิตกับการเรียนและการสื่อสารในกลุ่ม',
    materials: [
      {
        title: 'แนวทางการสื่อสารอย่างเข้าอกเข้าใจ (Non-violent Communication Guide)',
        type: 'PDF เอกสารประกอบ',
        size: '1.4 MB',
        downloadUrl: '#'
      }
    ],
    rating: 5,
    counselorNotes: 'ประเมินความพึงพอใจเรียบร้อย (5/5 ดาว)'
  },
  {
    id: 'apt-4',
    code: 'KKU-WL-66850',
    date: '5 ส.ค. 2567',
    time: '13:30 - 14:30 น.',
    datetimeISO: '2024-08-05T13:30:00',
    status: 'completed',
    sessionNumber: 1,
    isFirstIntake: true,
    type: 'การประเมินเบื้องต้น (On-site)',
    counselorName: 'ดร. นฤมล ศรีสง่า',
    counselorRole: 'หัวหน้างานจิตวิทยา',
    counselorAvatar: 'https://images.unsplash.com/photo-1580894732484-813c9a6338b5?auto=format&fit=crop&q=80&w=256',
    room: 'ห้องประเมินแรกรับ A-101',
    topic: 'การประเมินแรกรับและค้นหาเป้าหมายการรับคำปรึกษา (Intake Assessment)',
    counselorNotes: 'การประเมินภาวะสุขภาพจิตเบื้องต้น (Mental Status Screening) ระบุความต้องการในการเสริมทักษะจัดการความเครียดช่วงสอบ และส่งต่อเพื่อเข้ารับการปรึกษาต่อเนื่องกับนักจิตวิทยาประจำกรณี',
    stressScore: 7
  }
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'thread-pawinee',
    counselorName: 'อ.ดร. ภาวิณี สุวรรณรัตน์',
    counselorRole: 'นักจิตวิทยาประจำตัว • ว่างให้คำปรึกษา',
    counselorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    status: 'online',
    statusText: 'กำลังออนไลน์',
    lastMessage: 'อย่าลืมฝึกหายใจ 4-7-8 ...',
    lastMessageTime: '14:20 น.',
    unreadCount: 1,
    category: 'psychologist',
    nextAppointment: 'พฤหัสบดี 10:00 น.',
    credentials: 'วุฒิบัตรจิตวิทยาคลินิกและการปรึกษา ศูนย์สุขภาวะทางจิต มข.'
  },
  {
    id: 'thread-narumon',
    counselorName: 'ดร. นฤมล ศรีสง่า',
    counselorRole: 'ที่ปรึกษาร่วม',
    counselorAvatar: 'https://images.unsplash.com/photo-1580894732484-813c9a6338b5?auto=format&fit=crop&q=80&w=256',
    status: 'offline',
    statusText: 'ออฟไลน์',
    lastMessage: 'ยินดีเสมอค่ะ ขอให้ทำแบบทดส...',
    lastMessageTime: 'เมื่อวาน',
    unreadCount: 0,
    category: 'psychologist',
    credentials: 'หัวหน้างานจิตวิทยาและการประเมินแรกรับ'
  },
  {
    id: 'thread-coordinator',
    counselorName: 'เจ้าหน้าที่ประสานงาน',
    counselorRole: 'ศูนย์สุขภาวะทางจิต',
    counselorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    status: 'online',
    statusText: 'กำลังออนไลน์',
    lastMessage: 'ยืนยันห้องให้คำปรึกษาหมายเล...',
    lastMessageTime: '12 พ.ค.',
    unreadCount: 0,
    category: 'coordinator',
    credentials: 'เจ้าหน้าที่บริการตารางนัดหมายและห้องให้คำปรึกษา'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'thread-pawinee': [
    {
      id: 'msg-1',
      threadId: 'thread-pawinee',
      senderId: 'counselor-1',
      senderName: 'อ.ดร. ภาวิณี',
      senderRole: 'counselor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      text: 'สวัสดีค่ะคุณกานต์พิชชา 🌿 อาจารย์แวะมาสอบถามความเป็นอยู่ หลังจากที่เราเจอกันในรอบสัปดาห์ที่แล้ว การฝึกกำหนดลมหายใจช่วยให้ผ่อนคลายขึ้นบ้างไหมคะ?',
      timestamp: Date.now() - 3600000 * 2,
      timeFormatted: '13:45 น.',
      isRead: true
    },
    {
      id: 'msg-2',
      threadId: 'thread-pawinee',
      senderId: 'student-user',
      senderName: 'คุณ (กานต์พิชชา)',
      senderRole: 'student',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      text: 'อาจารย์คะ ช่วงนี้ลองทำแบบฝึกหัดหายใจตามที่อาจารย์แนะนำแล้ว รู้สึกหลับได้ง่ายขึ้นเยอะเลยค่ะ ไม่ต้องนอนพลิกตัวไปมาเหมือนสัปดาห์ก่อน แต่ยังมีกังวลเรื่องการพรีเซนต์โปรเจกต์สัมมนาวันศุกร์นี้อยู่บ้างค่ะ มือสั่นและใจเต้นเร็วมากตอนซ้อมพูดคนเดียว',
      timestamp: Date.now() - 3600000,
      timeFormatted: '14:12 น.',
      isRead: true
    },
    {
      id: 'msg-3',
      threadId: 'thread-pawinee',
      senderId: 'counselor-1',
      senderName: 'อ.ดร. ภาวิณี',
      senderRole: 'counselor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      text: 'เก่งมากเลยนะคะที่เริ่มจับสัญญาณร่างกายตนเองได้ อาการมือสั่นและใจเต้นเป็นปฏิกิริยาความตื่นเต้นปกติ อย่าลืมฝึกหายใจ 4-7-8 หรือ Box Breathing ก่อนเริ่มพูด 5 นาทีนะคะ หากรู้สึกหนักใจสามารถกดส่งแบบประเมินด่วน PHQ-9 ให้อาจารย์ตรวจดูเพิ่มเติมได้เลยค่ะ ✨',
      timestamp: Date.now() - 1800000,
      timeFormatted: '14:20 น.',
      isRead: true
    }
  ],
  'thread-narumon': [
    {
      id: 'msg-n1',
      threadId: 'thread-narumon',
      senderId: 'counselor-2',
      senderName: 'ดร. นฤมล ศรีสง่า',
      senderRole: 'counselor',
      senderAvatar: 'https://images.unsplash.com/photo-1580894732484-813c9a6338b5?auto=format&fit=crop&q=80&w=256',
      text: 'ยินดีเสมอค่ะ ขอให้ทำแบบทดสอบสภาวะทางอารมณ์รอบประเมินแรกรับให้ครบถ้วนนะคะ เพื่อประโยชน์สูงสุดในการดูแลค่ะ',
      timestamp: Date.now() - 86400000,
      timeFormatted: 'เมื่อวาน',
      isRead: true
    }
  ],
  'thread-coordinator': [
    {
      id: 'msg-c1',
      threadId: 'thread-coordinator',
      senderId: 'staff-1',
      senderName: 'เจ้าหน้าที่ประสานงาน',
      senderRole: 'staff',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
      text: 'ยืนยันห้องให้คำปรึกษาหมายเลข C-204 ชั้น 2 อาคารกิจกรรมนักศึกษา สำหรับรอบการนัดหมายครั้งถัดไปเรียบร้อยแล้วค่ะ',
      timestamp: Date.now() - 86400000 * 5,
      timeFormatted: '12 พ.ค.',
      isRead: true
    }
  ]
};

export const INITIAL_MOOD_HISTORY: MoodEntry[] = [
  {
    id: 'mood-1',
    date: '13 ต.ค. 2567',
    moodLevel: 'good',
    stressScore: 4,
    note: 'อ่านหนังสือได้ต่อเนื่อง ทำแบบฝึกหายใจ 15 นาทีก่อนนอน หลับสบายขึ้น',
    symptoms: ['ผ่อนคลายขึ้น', 'นอนหลับดี'],
    createdAt: Date.now() - 86400000
  },
  {
    id: 'mood-2',
    date: '10 ต.ค. 2567',
    moodLevel: 'calm',
    stressScore: 4,
    note: 'หลังเข้าพบ อ.ดร. ภาวิณี รู้สึกโล่งใจและมีทิศทางในการจัดการความวิตกกังวล',
    symptoms: ['สบายใจ', 'มีความหวัง'],
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'mood-3',
    date: '26 ก.ย. 2567',
    moodLevel: 'neutral',
    stressScore: 6,
    note: 'มีงานกลุ่มต้องรีบส่ง สื่อสารกับเพื่อนตามคู่มือ NVC ได้ราบรื่นขึ้น',
    symptoms: ['ตึงบ่าไหล่เล็กน้อย'],
    createdAt: Date.now() - 86400000 * 18
  },
  {
    id: 'mood-4',
    date: '5 ส.ค. 2567',
    moodLevel: 'stressed',
    stressScore: 7,
    note: 'เข้าประเมินแรกรับ รู้สึกตื่นเต้นและกังวลใจเรื่องสอบ',
    symptoms: ['มือสั่น', 'นอนไม่ค่อยหลับ'],
    createdAt: Date.now() - 86400000 * 70
  }
];
