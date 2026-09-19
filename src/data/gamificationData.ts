import { 
  CharacterType, 
  HatchedCharacter, 
  GamificationState, 
  ShopItem, 
  CommunityCompanion, 
  CommunityNote 
} from '../types';

export interface CharacterDef {
  type: CharacterType;
  name: string;
  title: string;
  tagline: string;
  personality: string;
  quote: string;
  rarity: 'common' | 'rare' | 'legendary';
  themeColor: string;
  bgGradient: string;
  badge: string;
  avatarIcon: string;
  description: string;
  healingEffect: string;
  favoriteSnack: string;
}

export const CHARACTERS_CATALOG: Record<CharacterType, CharacterDef> = {
  moo_deng: {
    type: 'moo_deng',
    name: 'น้องหมูเด้งฮีลใจ',
    title: 'ตัวตึงพลังบวกแห่งมอดินแดง',
    tagline: 'เด้งดึ๋งสู้ชีวิต เหนื่อยก็พัก เด้งใหม่ได้เสมอ!',
    personality: 'ร่าเริง ซุกซน เต็มไปด้วยพลังงานชีวิต ไม่ยอมแพ้ต่ออุปสรรค',
    quote: 'วันนี้เธอเก่งมากแล้วนะ! เด้งให้สุดแล้วอย่าลืมดื่มน้ำเยอะๆ พักผ่อนให้ใจฟูนะฮับ!',
    rarity: 'legendary',
    themeColor: '#c85a32',
    bgGradient: 'from-[#fef5ed] to-[#fbd5b5]/40',
    badge: '🏆 ฮีโร่คลายเครียดระดับตำนาน',
    avatarIcon: '🦛',
    description: 'ฮิปโปแคระตัวตึงนุ่มนิ่ม มีทักษะเด้งดึ๋งคลายความเครียด เปลี่ยนความเหนื่อยล้าให้กลายเป็นรอยยิ้มเสียงหัวเราะ',
    healingEffect: 'เพิ่มพลังใจและความสดชื่นทันทีที่เปิดแอป +15%',
    favoriteSnack: 'หญ้าเนเปียร์สด & แตงโมหวานฉ่ำ'
  },
  mor_din_daeng: {
    type: 'mor_din_daeng',
    name: 'น้องกระรอกมอดินแดง',
    title: 'นักสะสมความสุขใต้ต้นกาลพฤกษ์',
    tagline: 'สะสมความสุขเล็กๆ ทีละนิด เติมใจให้เต็มกระเป๋า',
    personality: 'ช่างสังเกต อบอุ่น มีความสุขง่าย และรักการพักผ่อน',
    quote: 'ความสุขไม่จำเป็นต้องเป็นเรื่องใหญ่ แค่วันนี้ได้กินของอร่อยและได้พัก ก็ยอดเยี่ยมที่สุดแล้ว!',
    rarity: 'common',
    themeColor: '#d97706',
    bgGradient: 'from-[#fffbeb] to-[#fef3c7]/50',
    badge: '🐿️ ผู้พิทักษ์ความสุขรายวัน',
    avatarIcon: '🐿️',
    description: 'กระรอกน้อยขนฟูสีส้มอิฐมอดินแดง ชอบเก็บเม็ดมะขามหวานและลูกกาลพฤกษ์มาเป็นของขวัญปลอบใจเพื่อนๆ',
    healingEffect: 'ช่วยดึงสติสู่ปัจจุบัน (Mindfulness Reminder)',
    favoriteSnack: 'เมล็ดกาลพฤกษ์อบกรอบ'
  },
  si_than_lotus: {
    type: 'si_than_lotus',
    name: 'น้องบัวน้อยบึงศรีฐาน',
    title: 'ภูติแห่งความสงบและสติ',
    tagline: 'ลอยเหนือน้ำอย่างสงบเย็น ใจนิ่งได้ในทุกคลื่นลม',
    personality: 'อ่อนโยน สงบนิ่ง สุขุม และเป็นผู้รับฟังที่ดีเยี่ยม',
    quote: 'หายใจเข้าลึกๆ... ปล่อยเรื่องที่แบกไว้ให้ไหลไปกับสายน้ำบึงศรีฐานนะคนเก่ง',
    rarity: 'rare',
    themeColor: '#059669',
    bgGradient: 'from-[#ecfdf5] to-[#d1fae5]/50',
    badge: '🪷 ผู้เชี่ยวชาญความสงบใจ',
    avatarIcon: '🪷',
    description: 'ดอกบัวน้อยเรืองแสงอ่อนๆ จากบึงศรีฐาน คอยช่วยปรับจังหวะลมหายใจและคลายความวิตกกังวล',
    healingEffect: 'ปลอบประโลมความวิตกกังวลและช่วยให้นอนหลับสบายขึ้น',
    favoriteSnack: 'หยดน้ำค้างยามเช้า'
  },
  khon_kaen_dino: {
    type: 'khon_kaen_dino',
    name: 'น้องไดโน่ภูเวียง',
    title: 'ไดโนเสาร์จิ๋วหัวใจภูเขา',
    tagline: 'ตัวเล็กแต่ใจใหญ่ ให้กอดอุ่นๆ ได้เสมอ!',
    personality: 'ซื่อสัตย์ อบอุ่น กล้าหาญ และชอบกอดปลอบโยน',
    quote: 'ถึงข้อสอบจะยากหรือโปรเจกต์จะเหนื่อย แต่เธอยังมีเค้าอยู่ข้างๆ เสมอนะ โฮกปิ๊บ!',
    rarity: 'rare',
    themeColor: '#2563eb',
    bgGradient: 'from-[#eff6ff] to-[#dbeafe]/50',
    badge: '🦖 เพื่อนซี้ใจแกร่ง',
    avatarIcon: '🦖',
    description: 'ไดโนเสาร์ภูเวียงสายพันธุ์กินพืชตัวกลมดิ๊ก สวมผ้าพันคอสีอิฐ มข. มีอ้อมกอดที่อบอุ่นที่สุดในจักรวาล',
    healingEffect: 'ฟื้นฟูความมั่นใจในตนเอง (Self-Compassion Boost)',
    favoriteSnack: 'ยอดใบไผ่อ่อนบึงหนองแวง'
  },
  kalapruek_bloom: {
    type: 'kalapruek_bloom',
    name: 'น้องดอกกาลพฤกษ์',
    title: 'ภูติดอกไม้แห่งความหวังและการเริ่มต้น',
    tagline: 'ทุกฤดูกาลย่อมผลิบานในจังหวะของตัวเอง',
    personality: 'มองโลกในแง่ดี อ่อนหวาน สดใส และให้กำลังใจเก่ง',
    quote: 'ไม่ต้องรีบร้อนแข่งกับใครนะ ค่อยๆ เติบโตและผลิบานตามจังหวะที่หัวใจเธอพร้อม',
    rarity: 'rare',
    themeColor: '#ec4899',
    bgGradient: 'from-[#fdf2f8] to-[#fbcfe8]/40',
    badge: '🌸 แสงสว่างแห่งความหวัง',
    avatarIcon: '🌸',
    description: 'ดอกไม้ประจำมหาวิทยาลัยขอนแก่นที่ผลิบานสีชมพูขาวสะพรั่งในฤดูร้อน สัญลักษณ์แห่งความสดใส',
    healingEffect: 'เติมพลังแห่งความหวัง ลดอาการท้อแท้ในการเรียน',
    favoriteSnack: 'น้ำหวานเกสรดอกไม้ป่า'
  },
  phu_pha_man_bat: {
    type: 'phu_pha_man_bat',
    name: 'น้องค้างคาวภูผาม่าน',
    title: 'ผู้พิทักษ์ราตรีและการนอนหลับ',
    tagline: 'กอดดาวเข้าสู่นิทรา พักผ่อนให้เต็มอิ่มนะ',
    personality: 'นุ่มนวล ขี้เซา ใจดี และปกป้องยามค่ำคืน',
    quote: 'เก็บความกังวลไว้ในกล่องก่อนนะ คืนนี้หลับตาให้สบาย พรุ่งนี้ค่อยเริ่มใหม่ ฝันดีนะฮับ',
    rarity: 'common',
    themeColor: '#7c3aed',
    bgGradient: 'from-[#f5f3ff] to-[#ede9fe]/50',
    badge: '🦇 ผู้พิทักษ์นิทราแสนอบอุ่น',
    avatarIcon: '🦇',
    description: 'ค้างคาวจิ๋วขนปุยจากถ้ำภูผาม่าน สวมหมวกนอนลายดาว ช่วยขจัดความคิดฟุ้งซ่านก่อนนอน',
    healingEffect: 'ส่งเสริมสุขอนามัยการนอนหลับ (Sleep Hygiene Guidance)',
    favoriteSnack: 'ผลกล้วยไม้ป่าหอมหวาน'
  }
};

export interface StepMilestone {
  day: number;
  title: string;
  description: string;
  points: number;
  bonusPoints: number;
  eggVisualStage: string;
  eggScale: string;
  isBigMilestone: boolean;
}

export const SEVEN_DAY_STEPS: StepMilestone[] = [
  {
    day: 1,
    title: 'วันที่ 1: จุดประกายไออุ่น',
    description: 'ไข่เริ่มได้รับพลังงานบวกจากการแวะมาสำรวจตนเอง',
    points: 50,
    bonusPoints: 0,
    eggVisualStage: 'ไข่สีอบอุ่น เปลือกเรียบเนียน มีไออุ่นลอยขึ้นเบาๆ',
    eggScale: 'scale-95',
    isBigMilestone: false
  },
  {
    day: 2,
    title: 'วันที่ 2: ไข่เริ่มขยับดุ๊กดิ๊ก',
    description: 'น้องในไข่รับรู้ถึงความใส่ใจ เริ่มขยับตัวดุ๊กดิ๊กทักทาย',
    points: 50,
    bonusPoints: 0,
    eggVisualStage: 'ไข่เริ่มสั่นโยกเยกไปมาเบาๆ มีหัวใจลอยขึ้น',
    eggScale: 'scale-100',
    isBigMilestone: false
  },
  {
    day: 3,
    title: 'วันที่ 3: รอยร้าวประกายทอง (ก้าวแรกแห่งวินัย)',
    description: 'สะสมความต่อเนื่องครบ 3 วัน! ปลดล็อกโบนัสแต้มก้าวแรก',
    points: 50,
    bonusPoints: 100,
    eggVisualStage: 'เปลือกไข่มีรอยร้าวเล็กๆ สีทองเปล่งประกาย',
    eggScale: 'scale-105',
    isBigMilestone: true
  },
  {
    day: 4,
    title: 'วันที่ 4: รอยร้าวสีรุ้งแห่งพลังใจ',
    description: 'พลังความอบอุ่นเพิ่มขึ้นเป็น 60% เปลือกไข่เปล่งแสงสีรุ้ง',
    points: 50,
    bonusPoints: 0,
    eggVisualStage: 'รอยร้าวขยายตัว มีแสงประกายระยิบระยับ',
    eggScale: 'scale-105',
    isBigMilestone: false
  },
  {
    day: 5,
    title: 'วันที่ 5: เปลือกไข่เริ่มกะเทาะ (พลังใจมั่นคง)',
    description: 'ผ่านเกินครึ่งทางแล้ว! เปลือกไข่เริ่มกะเทาะ รับโบนัสแต้มสเต็ป 5',
    points: 50,
    bonusPoints: 150,
    eggVisualStage: 'ชิ้นส่วนเปลือกไข่เริ่มกะเทาะ น้องเริ่มส่งเสียงจิ๊บๆ',
    eggScale: 'scale-110',
    isBigMilestone: true
  },
  {
    day: 6,
    title: 'วันที่ 6: น้องเตรียมลืมตาดูโลก',
    description: 'แอบมองเห็นแววตาแป๋วแหววของน้องโผล่ออกมา อีกแค่วันเดียวเท่านั้น!',
    points: 50,
    bonusPoints: 0,
    eggVisualStage: 'ตาแป๋วๆ ของน้องแอบโผล่มาทักทาย เตรียมพร้อมฟัก',
    eggScale: 'scale-115',
    isBigMilestone: false
  },
  {
    day: 7,
    title: 'วันที่ 7: 🌟 วันฟักไข่สำเร็จ! (HATCH DAY)',
    description: 'เปลือกไข่เปิดออก! น้องลืมตาดูโลกอย่างอบอุ่น รับโบนัสใหญ่ 500 แต้ม!',
    points: 50,
    bonusPoints: 500,
    eggVisualStage: 'เปลือกไข่เปิดออกอย่างสง่างาม พร้อมแสงระยิบระยับและสายรุ้ง',
    eggScale: 'scale-125',
    isBigMilestone: true
  }
];

export const INITIAL_HATCHED_CHARACTERS: HatchedCharacter[] = [
  {
    id: 'char-starter-1',
    characterType: 'mor_din_daeng',
    name: 'น้องกระรอกมอดินแดง',
    title: 'นักสะสมความสุขใต้ต้นกาลพฤกษ์',
    tagline: 'สะสมความสุขเล็กๆ ทีละนิด เติมใจให้เต็มกระเป๋า',
    personality: 'ร่าเริง ช่างสังเกต อบอุ่น',
    quote: 'ยินดีต้อนรับสู่พื้นที่สบายใจนะฮับ วันนี้มีเรื่องอะไรที่ทำให้เธอยิ้มได้บ้างรึยัง?',
    hatchedAt: Date.now() - 86400000 * 8,
    level: 2,
    affection: 85,
    rarity: 'common',
    badge: '🐿️ ผู้พิทักษ์ความสุขรายวัน',
    themeColor: '#d97706',
    avatarIcon: '🐿️'
  }
];

export const INITIAL_GAMIFICATION_STATE: GamificationState = {
  points: 650, // Initial points from previous logs
  currentStreak: 6, // 6 days continuous streak, ready for Day 7 hatch!
  maxStreak: 6,
  totalCheckIns: 13,
  currentEgg: {
    id: 'egg-current-1',
    eggType: 'healing_amber',
    eggName: 'ไข่พลังบวกมอดินแดง',
    currentDay: 6, // On day 6, ready to hit day 7!
    warmedToday: false,
    warmthEnergy: 85,
    startedAt: Date.now() - 86400000 * 5,
    targetCharacterType: 'moo_deng', // Hatches into Moo Deng!
    tapsCountToday: 0
  },
  hatchedCharacters: INITIAL_HATCHED_CHARACTERS,
  activeCompanionId: 'char-starter-1',
  claimedStepRewards: [3, 5],
  inventory: ['item-kku-scarf']
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item-grad-cap',
    name: 'หมวกบัณฑิตน้อย มข.',
    category: 'accessory',
    price: 150,
    description: 'หมวกรับปริญญาใบจิ๋วสำหรับสวมใส่ให้ตัวละคร เพิ่มความมั่นใจในการเรียน',
    icon: '🎓',
    tag: 'ยอดนิยม'
  },
  {
    id: 'item-kku-scarf',
    name: 'ผ้าพันคอถักสีอิฐ มข.',
    category: 'accessory',
    price: 100,
    description: 'ผ้าพันคอถักไหมพรมสีอิฐ สัญลักษณ์ชาวมอดินแดง ให้ความอบอุ่นตลอดฤดูหนาว',
    icon: '🧣',
    tag: 'ครอบครองแล้ว'
  },
  {
    id: 'item-kalapruek-flower',
    name: 'ช่อดอกกาลพฤกษ์ติดอก',
    category: 'accessory',
    price: 120,
    description: 'ดอกกาลพฤกษ์สีชมพูอ่อน ประดับบนตัวละครเพื่อเพิ่มออร่าความสดใส',
    icon: '🌸'
  },
  {
    id: 'item-nerd-glasses',
    name: 'แว่นตาทรงกลมเด็กเนิร์ด',
    category: 'accessory',
    price: 80,
    description: 'แว่นตากรอบกลมน่ารัก ใส่แล้วดูเป็นนักศึกษาที่ขยันและน่าเอ็นดู',
    icon: '👓'
  },
  {
    id: 'item-tea-voucher',
    name: 'คูปองชาร้อนสมุนไพรผ่อนคลาย (ศูนย์สุขภาวะ มข.)',
    category: 'kku_perk',
    price: 300,
    description: 'รับชาร้อนเก๊กฮวย-คาโมมายล์ฟรี 1 แก้ว ณ ห้องพักผ่อนศูนย์สุขภาวะ มข. ชั้น 2 อาคารกิจกรรม',
    icon: '🍵',
    tag: 'แลกรับจริงได้'
  },
  {
    id: 'item-coffee-discount',
    name: 'คูปองส่วนลด 20 บาท ร้านกาแฟ U-Center',
    category: 'kku_perk',
    price: 250,
    description: 'ใช้เป็นส่วนลดเครื่องดื่มที่ร้านกาแฟพันธมิตรใน มข. เพียงแสดงหน้าจอนี้',
    icon: '☕',
    tag: 'สิทธิพิเศษ'
  },
  {
    id: 'item-moo-deng-stickers',
    name: 'เซ็ตสติกเกอร์น้องหมูเด้งฮีลใจ (Digital Asset)',
    category: 'garden',
    price: 200,
    description: 'สติกเกอร์ดุ๊กดิ๊กส่งให้เพื่อนๆ ในแชท หรือแชร์ลงโซเชียลเพื่อส่งต่อพลังบวก',
    icon: '✨'
  }
];

export const KKU_FACULTIES = [
  'คณะแพทยศาสตร์',
  'คณะพยาบาลศาสตร์',
  'คณะวิศวกรรมศาสตร์',
  'คณะศึกษาศาสตร์',
  'คณะมนุษยศาสตร์และสังคมศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะบริหารธุรกิจและการบัญชี (KKBS)',
  'คณะนิติศาสตร์',
  'คณะเภสัชศาสตร์',
  'คณะทันตแพทยศาสตร์',
  'คณะสาธารณสุขศาสตร์',
  'คณะเกษตรศาสตร์',
  'คณะเทคนิคการแพทย์',
  'คณะสถาปัตยกรรมศาสตร์',
  'คณะศิลปกรรมศาสตร์',
  'วิทยาลัยการคอมพิวเตอร์',
  'วิทยาลัยนานาชาติ (KKUIC)'
];

export const KKU_YEAR_LEVELS = [
  'ชั้นปีที่ 1 (Freshman)',
  'ชั้นปีที่ 2 (Sophomore)',
  'ชั้นปีที่ 3 (Junior)',
  'ชั้นปีที่ 4 (Senior)',
  'ชั้นปีที่ 5',
  'ชั้นปีที่ 6 (สายวิทยาศาสตร์สุขภาพ)',
  'ระดับบัณฑิตศึกษา (ป.โท / ป.เอก)'
];

export const INITIAL_COMMUNITY_COMPANIONS: CommunityCompanion[] = [
  {
    id: 'comm-1',
    userId: 'user-ploy',
    userName: 'พลอย (ปี 3)',
    userFaculty: 'คณะพยาบาลศาสตร์',
    avatarIcon: '🪷',
    characterType: 'si_than_lotus',
    characterName: 'น้องบัวน้อยบึงศรีฐาน',
    eggDay: 5,
    streakDays: 5,
    message: 'ช่วงขึ้นวอร์ดเหนื่อยมาก แต่แวะมาดูน้องบัวแล้วมีแรงฮึดขึ้นเยอะ สู้ๆ นะทุกคน 💖',
    cheersCount: 24,
    hugsCount: 18,
    teasCount: 9,
    lastActive: Date.now() - 1000 * 60 * 4,
    isOnline: true,
    equippedBadge: '🪷 ผู้เชี่ยวชาญความสงบใจ'
  },
  {
    id: 'comm-2',
    userId: 'user-fluke',
    userName: 'ฟลุ๊ค',
    userFaculty: 'วิทยาลัยการคอมพิวเตอร์',
    avatarIcon: '🦛',
    characterType: 'moo_deng',
    characterName: 'น้องหมูเด้งฮีลใจ',
    eggDay: 7,
    streakDays: 14,
    message: 'ฟักน้องหมูเด้งออกมาสำเร็จแล้ววว! น้องเด้งดึ๋งน่ารักมาก ส่งพลังบวกให้เพื่อนๆ ทุกคนนะฮับ 🏆',
    cheersCount: 56,
    hugsCount: 32,
    teasCount: 15,
    lastActive: Date.now() - 1000 * 60 * 12,
    isOnline: true,
    equippedBadge: '🏆 ฮีโร่คลายเครียดระดับตำนาน'
  },
  {
    id: 'comm-3',
    userId: 'user-mew',
    userName: 'หมิว (ปี 1)',
    userFaculty: 'คณะศึกษาศาสตร์',
    avatarIcon: '🐿️',
    characterType: 'mor_din_daeng',
    characterName: 'น้องกระรอกมอดินแดง',
    eggDay: 3,
    streakDays: 3,
    message: 'เพิ่งเข้า มข. ยังปรับตัวไม่ค่อยทัน แต่มาบันทึกอารมณ์ทุกวันทำให้ใจนิ่งขึ้นเยอะเลย 🍂',
    cheersCount: 15,
    hugsCount: 21,
    teasCount: 6,
    lastActive: Date.now() - 1000 * 60 * 25,
    isOnline: false,
    equippedBadge: '🐿️ ผู้พิทักษ์ความสุขรายวัน'
  },
  {
    id: 'comm-4',
    userId: 'user-tan',
    userName: 'แทน',
    userFaculty: 'คณะวิศวกรรมศาสตร์',
    avatarIcon: '🦖',
    characterType: 'khon_kaen_dino',
    characterName: 'น้องไดโน่ภูเวียง',
    eggDay: 6,
    streakDays: 6,
    message: 'โจทย์แคลคูลัสยากแค่ไหน ก็แพ้ความน่ารักของน้องไดโน่! พรุ่งนี้ไข่จะฟักแล้วตื่นเต้นนน ⚡',
    cheersCount: 38,
    hugsCount: 14,
    teasCount: 11,
    lastActive: Date.now() - 1000 * 60 * 40,
    isOnline: true,
    equippedBadge: '🦖 เพื่อนซี้ใจแกร่ง'
  },
  {
    id: 'comm-5',
    userId: 'user-grace',
    userName: 'เกรซ (ปี 4)',
    userFaculty: 'คณะแพทยศาสตร์',
    avatarIcon: '🌸',
    characterType: 'kalapruek_bloom',
    characterName: 'น้องดอกกาลพฤกษ์',
    eggDay: 4,
    streakDays: 9,
    message: 'อย่าลืมดื่มน้ำและนอนหลับให้พอนะคะ ร่างกายและจิตใจของเราสำคัญที่สุดเสมอ ✨',
    cheersCount: 42,
    hugsCount: 29,
    teasCount: 19,
    lastActive: Date.now() - 1000 * 60 * 55,
    isOnline: false,
    equippedBadge: '🌸 แสงสว่างแห่งความหวัง'
  },
  {
    id: 'comm-6',
    userId: 'user-win',
    userName: 'วิน',
    userFaculty: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
    avatarIcon: '🦇',
    characterType: 'phu_pha_man_bat',
    characterName: 'น้องค้างคาวภูผาม่าน',
    eggDay: 2,
    streakDays: 2,
    message: 'คืนนี้นอนไม่หลับ มานั่งสมาธิและส่งไออุ่นให้ไข่ หลับฝันดีนะชาว มข. ทุกคน 🌙',
    cheersCount: 19,
    hugsCount: 12,
    teasCount: 8,
    lastActive: Date.now() - 1000 * 60 * 90,
    isOnline: false,
    equippedBadge: '🦇 ผู้พิทักษ์นิทราอันสงบ'
  }
];

export const INITIAL_COMMUNITY_NOTES: CommunityNote[] = [
  {
    id: 'note-1',
    userId: 'user-fluke',
    userName: 'ฟลุ๊ค (ว.คอมพ์)',
    userFaculty: 'วิทยาลัยการคอมพิวเตอร์',
    characterIcon: '🦛',
    content: 'ใครที่กำลังทำโปรเจกต์ดึกๆ อย่าลืมยืดเส้นยืดสายและพักสายตาทุก 45 นาทีนะ เราทำได้แน่นอน!',
    moodTag: 'กำลังใจช่วงสอบ',
    hearts: 34,
    hugs: 19,
    createdAt: Date.now() - 1000 * 60 * 30
  },
  {
    id: 'note-2',
    userId: 'user-ploy',
    userName: 'พลอย (พยาบาล)',
    userFaculty: 'คณะพยาบาลศาสตร์',
    characterIcon: '🪷',
    content: 'วันนี้แวะไปนั่งรับลมริมบึงศรีฐานตอนเย็น ดอกบัวบานสวยมาก ลมเย็นสบาย ฮีลใจได้ดีสุดๆ เลย แนะนำทุกคนนะคะ',
    moodTag: 'เรื่องใจฟูวันนี้',
    hearts: 48,
    hugs: 25,
    createdAt: Date.now() - 1000 * 60 * 75
  },
  {
    id: 'note-3',
    userId: 'user-tan',
    userName: 'แทน (วิศวะ)',
    userFaculty: 'คณะวิศวกรรมศาสตร์',
    characterIcon: '🦖',
    content: 'ถ้าวันนี้รู้สึกทำอะไรก็ไม่เป็นไปตามหวัง ไม่เป็นไรเลยนะ อนุญาตให้ตัวเองได้พัก พรุ่งนี้ค่อยเริ่มใหม่ด้วยกัน',
    moodTag: 'ปลอบใจวันเหนื่อย',
    hearts: 52,
    hugs: 37,
    createdAt: Date.now() - 1000 * 60 * 180
  },
  {
    id: 'note-4',
    userId: 'user-grace',
    userName: 'พี่เกรซ (แพทย์)',
    userFaculty: 'คณะแพทยศาสตร์',
    characterIcon: '🌸',
    content: 'ชาคาโมมายล์อุ่นๆ ผสมน้ำผึ้งนิดหน่อยก่อนนอน ช่วยผ่อนคลายกล้ามเนื้อคอบ่าไหล่ได้ดีมากๆ ลองดูน้า',
    moodTag: 'เพลง/ชาร้อนฮีลใจ',
    hearts: 29,
    hugs: 15,
    createdAt: Date.now() - 1000 * 60 * 240
  }
];
