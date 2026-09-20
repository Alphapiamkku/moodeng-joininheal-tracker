import { PsychologicalScreener, AssessmentSubscaleScore, AssessmentSelfCarePlan } from '../types';

export function generateSelfCarePlan(
  dominant: 'happy' | 'sad' | 'anxiety' | 'balanced',
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe'
): AssessmentSelfCarePlan {
  if (dominant === 'anxiety') {
    return {
      title: 'แผนจัดการความวิตกกังวลด้วยตนเอง (ลองฝึก 3 - 5 วันแรก)',
      badge: 'ลดความฟุ้งซ่าน & คืนความสงบ',
      trialDays: 3,
      coreAdvice: 'ความวิตกกังวลเป็นปฏิกิริยาปกติของสมองที่พยายามปกป้องเรา แต่เมื่อทำงานมากเกินไปจะทำให้ร่างกายตึงเครียดและคิดวน ลองฝึกทักษะ 4 เทคนิคนี้เพื่อคืนความสงบสู่ระบบประสาทด้วยตนเองก่อน 3-5 วัน',
      techniques: [
        {
          name: 'เทคนิค Grounding 5-4-3-2-1 ดึงสติสู่ปัจจุบัน',
          category: 'mindset',
          action: 'มองหาสิ่งรอบตัว 5 อย่างที่มองเห็น, 4 สิ่งที่แตะสัมผัสได้, 3 เสียงที่ได้ยิน, 2 กลิ่นที่ได้กลิ่น, 1 รสชาติ ช่วยตัดความคิดฟุ้งซ่านในทันที',
          duration: '3 นาที'
        },
        {
          name: 'การหายใจแบบ Box Breathing (4-4-4-4)',
          category: 'breath',
          action: 'หายใจเข้า 4 วินาที - กลั้นหายใจ 4 วินาที - ผ่อนลมหายใจออกทางปาก 4 วินาที - หยุดนิ่ง 4 วินาที ทำซ้ำ 4 รอบ กระตุ้นเส้นประสาท Vagus ให้หัวใจเต้นช้าลง',
          duration: '3-5 นาที'
        },
        {
          name: 'จำกัดเวลาคิดกังวล (Worry Time 15 นาที)',
          category: 'action',
          action: 'จดเรื่องที่กังวลลงกระดาษ แล้วบอกตนเองว่าจะอนุญาตให้คิดทบทวนเฉพาะเวลา 17:00-17:15 น. เท่านั้น เพื่อไม่ให้เรื่องกังวลรบกวนตลอดทั้งวัน',
          duration: '15 นาที'
        },
        {
          name: 'วงกลมแห่งการควบคุม (Circle of Control)',
          category: 'mindset',
          action: 'แยกแยะสิ่งที่กังวลเป็น 2 กอง: สิ่งที่ควบคุมได้ด้วยมือเราเอง (เช่น เริ่มอ่าน 1 หน้า, จัดโต๊ะ) กับสิ่งที่ไม่สามารถควบคุมได้ (เช่น ข้อสอบจะยากไหม)',
          duration: '5 นาที'
        }
      ],
      checklist: [
        'ฝึกหายใจคลายกังวล Box Breathing (4-4-4-4) อย่างน้อย 2 รอบต่อวัน',
        'งดชาเข้มข้น กาแฟ และเครื่องดื่มชูกำลังหลัง 14:00 น.',
        'พักสายตาจากหน้าจอโทรศัพท์ 30 นาทีก่อนเข้านอน',
        'ยืดเหยียดกล้ามเนื้อต้นคอและบ่าไหล่เพื่อคลายความเกร็งตัว'
      ],
      whenToSeekHelp: [
        'หากทดลองฝึกจัดการตนเองตามคำแนะนำครบ 3 - 5 วันแล้ว ยังรู้สึกกระวนกระวายหรือใจสั่นจนไม่สามารถมีสมาธิกับการเรียนได้',
        'มีอาการตื่นตระหนกตกใจรุนแรง (Panic Attack) หายใจไม่อิ่ม หรือสะดุ้งตื่นกลางดึกต่อเนื่อง',
        'รู้สึกว่าความกังวลรบกวนชีวิตจนรับมือคนเดียวไม่ไหว ต้องการพื้นที่ปลอดภัยในการพูดคุย'
      ]
    };
  }

  if (dominant === 'sad') {
    return {
      title: 'แผนฟื้นฟูพลังใจและคลายความเศร้าด้วยตนเอง (ลองฝึก 3 - 5 วันแรก)',
      badge: 'ก้าวเล็กๆ คืนพลังใจ',
      trialDays: 4,
      coreAdvice: 'เมื่ออารมณ์เศร้าหรือท้อแท้เข้ามาเยือน ร่างกายจะรู้สึกหมดพลังและไม่อยากทำอะไร การฟื้นฟูเริ่มจากการสร้างความสำเร็จเล็กๆ (Micro-wins) และเปิดรับแสงสว่าง ลองปฏิบัติตามแนวทางนี้ด้วยตนเอง 3-5 วัน',
      techniques: [
        {
          name: 'กฎ 5 นาที (Behavioral Activation Micro-step)',
          category: 'action',
          action: 'เมื่อรู้สึกไม่อยากลงมือทำอะไรเลย ให้บอกตนเองว่าจะทำเพียงแค่ 5 นาทีพอ (เช่น เปิดอ่านชีท 1 หน้า หรือลุกขึ้นล้างหน้า) แล้วอนุญาตให้ตนเองพักได้ตามต้องการ',
          duration: '5 นาที'
        },
        {
          name: 'รับแสงแดดยามเช้าและเดินรับลมริมบึงสีฐาน',
          category: 'rest',
          action: 'ออกไปเดินรับแดดอ่อนๆ ก่อน 09:00 น. หรือช่วงเย็น 15 นาที แสงแดดช่วยกระตุ้นการหลั่งสารสื่อประสาทเซโรโทนินและปรับวงจรการนอนให้ลึกขึ้น',
          duration: '15 นาที'
        },
        {
          name: 'บันทึก 3 สิ่งดีๆ ประจำวัน (Three Good Things Journal)',
          category: 'mindset',
          action: 'ก่อนนอน เขียน 3 สิ่งเล็กๆ ที่ทำให้รู้สึกดีในวันนี้ แม้เป็นเรื่องเรียบง่าย เช่น เครื่องดื่มอุ่นๆ รอยยิ้มของคนรอบตัว หรือการได้พักผ่อน',
          duration: '5 นาที'
        },
        {
          name: 'เชื่อมโยงกับเพื่อนหรือคนใกล้ชิด 1 คน',
          category: 'action',
          action: 'ส่งข้อความสั้นๆ หรือโทรคุยกับเพื่อนหรือคนในครอบครัวที่ไว้ใจ 1 คน ไม่จำเป็นต้องเล่าเรื่องเครียด เพียงแค่ไม่แยกตัวอยู่คนเดียวนานเกินไป',
          duration: '10 นาที'
        }
      ],
      checklist: [
        'เปิดผ้าม่านรับแสงแดดธรรมชาติเข้าห้อง หรือออกไปเดินรับลม 15 นาที',
        'รับประทานอาหารอุ่นๆ ให้ตรงเวลาอย่างน้อย 1 มื้อ',
        'จดบันทึก 1 สิ่งที่ตนเองทำสำเร็จในวันนี้แม้เป็นเรื่องเล็กน้อย',
        'อนุญาตให้ตนเองได้พักใจ โดยไม่ตำหนิตนเองที่รู้สึกเหนื่อยล้า'
      ],
      whenToSeekHelp: [
        'หากทดลองทำตามคำแนะนำครบ 3 - 5 วันแล้ว ความรู้สึกเศร้า ท้อแท้ หรือหมดเรี่ยวแรงยังคงดิ่งลงต่อเนื่อง',
        'เริ่มมีอาการเบื่ออาหารจนน้ำหนักลด หรือนอนไม่หลับ/นอนมากผิดปกติติดต่อกันเกิน 1 สัปดาห์',
        'มีความคิดไม่อยากมีชีวิตอยู่หรืออยากทำร้ายตนเอง (กรุณาโทร 043-009700 ต่อ 40222 หรือกดปุ่ม SOS ทันที)'
      ]
    };
  }

  if (dominant === 'happy') {
    return {
      title: 'แผนรักษาสมดุลและต่อยอดพลังบวก (Positive Flourishing Guide)',
      badge: 'สุขภาวะจิตสมบูรณ์ดี',
      trialDays: 7,
      coreAdvice: 'คุณกำลังอยู่ในสภาวะที่มีความสุขและพลังใจที่ดี เป็นช่วงเวลาที่ดีในการสะสม "ทุนทางจิตวิทยา (Psychological Capital)" และดูแลตนเองให้สดชื่นยั่งยืน',
      techniques: [
        {
          name: 'การดื่มด่ำกับปัจจุบัน (Savoring the Moment)',
          category: 'mindset',
          action: 'หยุดสังเกตและรับรู้ความสุขในขณะที่เกิดขึ้นอย่างตั้งใจ เช่น กลิ่นหอมของเครื่องดื่ม ลมเย็น หรือบทสนทนาที่อบอุ่น เพื่อให้สมองจดจำความรู้สึกดี',
          duration: '2 นาที'
        },
        {
          name: 'การส่งต่อพลังบวก (Random Act of Kindness)',
          category: 'action',
          action: 'กล่าวคำขอบคุณ ชื่นชม หรือช่วยเหลือเพื่อนร่วมคณะ 1 สิ่งเล็กๆ การส่งต่อความหวังดีช่วยหลั่งฮอร์โมน Oxytocin เสริมความสุขทั้งผู้ให้และผู้รับ',
          duration: '5 นาที'
        },
        {
          name: 'รักษาวงจรการนอนและการพักผ่อนที่สม่ำเสมอ',
          category: 'rest',
          action: 'นอนหลับให้ครบ 7-8 ชั่วโมงในเวลาใกล้เคียงกันทุกวัน เพื่อรักษาสารสื่อประสาทโดปามีนและเซโรโทนินให้อยู่ในระดับสมบูรณ์',
          duration: 'ทุกวัน'
        },
        {
          name: 'ต่อยอดสู่เป้าหมายที่มีความหมาย (Meaningful Goal)',
          category: 'action',
          action: 'ใช้ช่วงเวลาที่พลังใจเต็มเปี่ยมในการลงมือทำโปรเจกต์ กิจกรรมจิตอาสา หรืองานอดิเรกที่ตนเองรัก',
          duration: '30 นาที'
        }
      ],
      checklist: [
        'กล่าวคำขอบคุณหรือส่งกำลังใจให้เพื่อนรอบตัว 1 คน',
        'ดื่มน้ำสะอาดและออกกำลังกายขยับร่างกายอย่างมีความสุข',
        'จดบันทึกความรู้สึกดีๆ ในวันนี้เก็บไว้ทบทวนในวันที่เหนื่อยล้า',
        'รักษาสมดุลระหว่างเวลาตั้งใจเรียนกับเวลาผ่อนคลายกับเพื่อน'
      ],
      whenToSeekHelp: [
        'หากในอนาคตมีช่วงเวลาที่เริ่มรู้สึกเครียด กดดันจากการสอบ หรือไม่สบายใจ สามารถกลับมาทำแบบประเมินได้ตลอดเวลา',
        'ศูนย์สุขภาวะทางจิตวิทยา มข. ยินดีต้อนรับและพร้อมรับฟังทุกเรื่องราวเสมอ'
      ]
    };
  }

  // Balanced state
  return {
    title: 'แผนประคองสมดุลสุขภาวะทางใจ (Everyday Wellness Routine)',
    badge: 'อารมณ์คงที่และผ่อนคลาย',
    trialDays: 5,
    coreAdvice: 'สุขภาวะทางอารมณ์ของคุณอยู่ในเกณฑ์สมดุลดีเยี่ยม ปรับตัวเข้ากับสถานการณ์การเรียนได้ดี รักษารูปแบบการดูแลตนเองและสุขอนามัยที่ดีเพื่อคงความสดชื่น',
    techniques: [
      {
        name: 'การฝึกสมาธิกำหนดลมหายใจสั้นๆ (Mindful Pause)',
        category: 'breath',
        action: 'หยุดพักระหว่างคาบเรียน 2-3 นาที หายใจเข้า-ออกยาวๆ ปล่อยวางความคิดและสังเกตสัมผัสของร่างกาย',
        duration: '3 นาที'
      },
      {
        name: 'เทคนิคแบ่งเวลาอ่านหนังสือ Pomodoro (25/5 นาที)',
        category: 'action',
        action: 'โฟกัสการอ่านหนังสือหรือทำงาน 25 นาที แล้วพักเบรก 5 นาที เพื่อไม่ให้สมองล้าสะสม',
        duration: '30 นาที'
      },
      {
        name: 'การดูแลสุขอนามัยการนอนหลับ (Sleep Hygiene)',
        category: 'rest',
        action: 'ปรับห้องนอนให้มืด เงียบ อุณหภูมิพอเหมาะ งดเล่นมือถือบนเตียงเพื่อให้สมองจำเตียงนอนเป็นที่พักผ่อน',
        duration: 'ทุกคืน'
      },
      {
        name: 'การดูแลตนเองผ่านงานอดิเรกที่ผ่อนคลาย',
        category: 'mindset',
        action: 'จัดสรรเวลาอย่างน้อยสัปดาห์ละ 2-3 ชั่วโมงในการทำกิจกรรมที่ชอบ เช่น ฟังเพลง วาดรูป หรือเล่นกีฬา',
        duration: '1-2 ชม.'
      }
    ],
    checklist: [
      'ดื่มน้ำให้เพียงพออย่างน้อย 6-8 แก้วตลอดวัน',
      'นอนหลับพักผ่อนให้เพียงพอ 7-8 ชั่วโมง',
      'แบ่งเวลาพักสั้นๆ ระหว่างการทบทวนบทเรียน',
      'มีบทสนทนาที่สนุกสนานและอบอุ่นกับเพื่อนหรือครอบครัว'
    ],
    whenToSeekHelp: [
      'หากเริ่มมีสัญญาณความเครียดสะสมก่อนช่วงสอบ หรือรู้สึกนอนไม่หลับเกิน 3 คืน',
      'สามารถแวะมาพูดคุยหรือส่งข้อความปรึกษานักจิตวิทยา มข. ได้อย่างสบายใจ'
    ]
  };
}

export const PSYCHOLOGICAL_SCREENERS: PsychologicalScreener[] = [
  // 0. TRI-EMO (Flagship Tri-State Mood Screener)
  {
    id: 'TRI-EMO',
    name: 'Tri-State Mood Screener (เศร้า • สุข • วิตกกังวล)',
    nameTh: 'แบบประเมินสุขภาวะ 3 อารมณ์หลัก: เศร้า • มีความสุข • วิตกกังวล',
    category: 'general',
    categoryTh: 'ประเมิน 3 อารมณ์หลัก',
    badge: 'ประมวลผลด่วน & แผนดูแลตัวเอง',
    targetTime: '1-2 นาที',
    description: 'คัดกรองเพื่อจำแนกและประมวลผลทันทีว่าคุณกำลังอยู่ในสภาวะ "เศร้า", "มีความสุข", หรือ "วิตกกังวล" พร้อมบอกวิธีการจัดการตัวเองเบื้องต้นก่อน หากลองแล้วยังไม่ดีขึ้นค่อยนัดพบนักจิตวิทยา',
    theory: {
      name: 'PANAS & Tridimensional Affective Model (ทฤษฎีไตรภาวะแห่งอารมณ์)',
      theorist: 'Watson, Clark, & Tellegen (1988) บูรณาการร่วมกับ WHO-5 Well-being Index',
      year: '1988 / ฉบับประยุกต์สุขภาวะนักศึกษา มข.',
      summary: 'อารมณ์มนุษย์สามารถจำแนกเป็น 3 แกนหลักที่ส่งผลต่อพฤติกรรมและการเรียน: (1) มีความสุข (Positive Affect & Flourishing) (2) สภาวะเศร้าหมอง (Sadness & Depressive Tendency) (3) ความวิตกกังวล (Anxiety & Hyperarousal) การรู้แกนอารมณ์เด่นช่วยให้เลือกวิธีดูแลตนเองได้ตรงจุด',
      mechanism: 'ประมวลผลคะแนนทั้ง 3 ด้านพร้อมกัน คำนวณเป็นร้อยละ และจำแนกสถานะอารมณ์หลักทันที พร้อมมอบแผนฝึกปฏิบัติด้วยตนเอง 3-5 วัน'
    },
    scaleOptions: [
      { value: 0, label: 'แทบไม่มีเลย', description: 'ไม่เคยรู้สึกเลยในช่วง 1-2 สัปดาห์นี้' },
      { value: 1, label: 'มีบ้างบางวัน', description: 'เกิดขึ้น 1-2 วันในรอบสัปดาห์' },
      { value: 2, label: 'บ่อยครั้ง', description: 'เกิดขึ้น 3-4 วันในรอบสัปดาห์' },
      { value: 3, label: 'บ่อยมาก/เกือบทุกวัน', description: 'เกิดขึ้นเกือบทุกวันหรือแทบตลอดเวลา' },
    ],
    questions: [
      // Happy / Well-being
      { id: 1, text: 'ฉันรู้สึกร่าเริง แจ่มใส และมีอารมณ์ดีเป็นส่วนใหญ่', subscale: 'happy' },
      { id: 2, text: 'ฉันรู้สึกสงบใจ สบายใจ และมีพลังในการทำกิจกรรมต่างๆ', subscale: 'happy' },
      { id: 3, text: 'ฉันรู้สึกว่าชีวิตแต่ละวันมีความหมาย น่าสนใจ และเพลิดเพลินกับสิ่งรอบตัว', subscale: 'happy' },
      // Sad / Depressive
      { id: 4, text: 'ฉันรู้สึกหม่นหมอง เศร้าใจ ท้อแท้ หรือหมดหวังในใจ', subscale: 'sad' },
      { id: 5, text: 'ฉันรู้สึกเบื่อหน่าย ไม่อยากทำสิ่งที่เคยชอบ และไม่มีเรี่ยวแรงจะเริ่มต้นทำอะไร', subscale: 'sad' },
      { id: 6, text: 'ฉันรู้สึกว่าตนเองโดดเดี่ยว ล้มเหลว หรือมองไม่เห็นทางออกในปัญหา', subscale: 'sad' },
      // Anxiety / Worry
      { id: 7, text: 'ฉันรู้สึกกระสับกระส่าย ใจสั่น แน่นหน้าอก หรือกล้ามเนื้อตึงเกร็ง', subscale: 'anxiety' },
      { id: 8, text: 'ฉันมีความคิดฟุ้งซ่าน กังวลล่วงหน้ากับเรื่องที่ยังไม่เกิดขึ้นจนหยุดคิดไม่ได้', subscale: 'anxiety' },
      { id: 9, text: 'ฉันรู้สึกกระวนกระวาย อยู่นิ่งๆ ได้ยาก และกลัวว่าจะมีเรื่องแย่ๆ เกิดขึ้น', subscale: 'anxiety' },
    ],
    calculateResult: (answers) => {
      let happyScore = 0;
      let sadScore = 0;
      let anxietyScore = 0;

      [1, 2, 3].forEach((id) => { happyScore += answers[id] || 0; });
      [4, 5, 6].forEach((id) => { sadScore += answers[id] || 0; });
      [7, 8, 9].forEach((id) => { anxietyScore += answers[id] || 0; });

      const happyPct = Math.min(100, Math.round((happyScore / 9) * 100));
      const sadPct = Math.min(100, Math.round((sadScore / 9) * 100));
      const anxietyPct = Math.min(100, Math.round((anxietyScore / 9) * 100));

      let dominant: 'happy' | 'sad' | 'anxiety' | 'balanced' = 'balanced';
      let dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';
      let overallGrade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';

      if (happyPct >= 60 && sadPct < 40 && anxietyPct < 40) {
        dominant = 'happy';
        dominantTh = 'มีความสุข & สุขภาวะจิตดี (Happy & Flourishing)';
        overallGrade = 'normal';
      } else if (sadPct >= anxietyPct && sadPct >= 40) {
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมอง & ท้อแท้ใจ (Sadness / Low Energy)';
        overallGrade = sadPct >= 70 ? 'severe' : sadPct >= 50 ? 'moderate' : 'mild';
      } else if (anxietyPct > sadPct && anxietyPct >= 40) {
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวล & ฟุ้งซ่าน (Anxiety & Hyperarousal)';
        overallGrade = anxietyPct >= 70 ? 'severe' : anxietyPct >= 50 ? 'moderate' : 'mild';
      } else if (sadPct >= 40 && anxietyPct >= 40) {
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวลร่วมกับอารมณ์เศร้า (Mixed Anxiety & Depression)';
        overallGrade = Math.max(sadPct, anxietyPct) >= 70 ? 'severe' : 'moderate';
      } else {
        dominant = 'balanced';
        dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';
        overallGrade = 'normal';
      }

      const subscales: AssessmentSubscaleScore[] = [
        {
          name: 'มีความสุข (Happy)',
          nameTh: 'ความสุขและพลังใจเชิงบวก',
          score: happyScore,
          maxScore: 9,
          level: `${happyPct}% (${happyPct >= 65 ? 'สูง สมบูรณ์ดี' : happyPct >= 40 ? 'ปานกลาง' : 'ควรเติมพลังใจ'})`,
          color: '#38a169',
          description: 'ระดับความร่าเริง สดใส และความรู้สึกพึงพอใจในชีวิต'
        },
        {
          name: 'เศร้า (Sadness)',
          nameTh: 'ความเศร้าหมองและหมดพลัง',
          score: sadScore,
          maxScore: 9,
          level: `${sadPct}% (${sadPct >= 65 ? 'สูง ควรดูแลใจ' : sadPct >= 40 ? 'ปานกลาง' : 'น้อย/ปกติ'})`,
          color: '#4a7bb0',
          description: 'ระดับความรู้สึกท้อแท้ หม่นหมอง หรือการสูญเสียความสุข'
        },
        {
          name: 'วิตกกังวล (Anxiety)',
          nameTh: 'ความวิตกกังวลและความตึงเครียด',
          score: anxietyScore,
          maxScore: 9,
          level: `${anxietyPct}% (${anxietyPct >= 65 ? 'สูง ควรผ่อนคลาย' : anxietyPct >= 40 ? 'ปานกลาง' : 'น้อย/ปกติ'})`,
          color: '#e08d58',
          description: 'ระดับความกระวนกระวาย ใจสั่น และความคิดกังวลล่วงหน้า'
        }
      ];

      const recommendations: string[] = [];
      if (dominant === 'happy') {
        recommendations.push('คุณกำลังอยู่ในสภาวะที่มีความสุขและพลังใจดีเยี่ยม รักษารูปแบบการนอนหลับและการใช้ชีวิตที่ดีต่อไป');
        recommendations.push('แนะนำให้ใช้เวลาช่วงนี้แบ่งปันพลังบวกและบันทึกสิ่งดีๆ เก็บไว้เป็นกำลังใจ');
      } else if (dominant === 'sad') {
        recommendations.push('แนะนำให้ใช้ "กฎ 5 นาที" ในการลงมือทำกิจกรรมทีละเล็กน้อย และออกไปรับแสงแดดยามเช้า 15 นาที');
        recommendations.push('ลองปฏิบัติตามแผนดูแลตนเองเบื้องต้น 3-5 วัน หากยังไม่ดีขึ้น สามารถส่งผลนี้นัดคุยกับนักจิตวิทยาได้ทันที');
      } else if (dominant === 'anxiety') {
        recommendations.push('ฝึกเทคนิคการหายใจ Box Breathing (4-4-4-4) หรือ Grounding 5-4-3-2-1 เพื่อลดความตื่นตัวของระบบประสาท');
        recommendations.push('กำหนด "Worry Time" วันละ 15 นาที เพื่อไม่ให้ความคิดกังวลรบกวนเวลาเรียนและชีวิตประจำวัน');
      } else {
        recommendations.push('อารมณ์ของคุณอยู่ในเกณฑ์สมดุลปกติ สามารถจัดการความเครียดในชีวิตประจำวันได้ดี');
        recommendations.push('รักษาสุขนิสัยที่ดี ดื่มน้ำ พักผ่อน และมีเวลาสำหรับงานอดิเรกที่ผ่อนคลาย');
      }

      recommendations.push('💡 ขั้นตอนแนะนำ: ลองนำวิธีจัดการตนเองเบื้องต้นไปฝึกปฏิบัติด้วยตัวเองก่อน 3-5 วัน หากยังรู้สึกไม่ดีขึ้น สามารถนัดหมายหรือส่งผลนี้คุยกับนักจิตวิทยา มข. ได้เสมอ');

      return {
        score: sadScore + anxietyScore,
        maxScore: 18,
        level: dominantTh,
        severityGrade: overallGrade,
        recommendations,
        subscales,
        dominantEmotion: dominant,
        dominantEmotionTh: dominantTh,
        emotionBreakdown: {
          happy: happyPct,
          sad: sadPct,
          anxiety: anxietyPct
        },
        selfCarePlan: generateSelfCarePlan(dominant, overallGrade)
      };
    }
  },

  // 1. DASS-21
  {
    id: 'DASS-21',
    name: 'DASS-21 (Depression Anxiety Stress Scales)',
    nameTh: 'แบบประเมินภาวะอารมณ์ 3 มิติ: ซึมเศร้า วิตกกังวล และความเครียด',
    category: 'general',
    categoryTh: 'ประเมิน 3 มิติหลัก',
    badge: 'มาตรฐานสากล (Gold Standard)',
    targetTime: '3-5 นาที',
    description: 'จำแนกความแตกต่างระหว่างภาวะซึมเศร้า ความวิตกกังวล และความเครียดเรื้อรัง ซึ่งมักเกิดร่วมกันแต่มีกลไกทางจิตวิทยาที่ต่างกัน',
    theory: {
      name: 'Tripartite Model of Anxiety and Depression (ทฤษฎีไตรภาคีแห่งอารมณ์)',
      theorist: 'Prof. Peter Lovibond & Syd Lovibond (1995) ต่อยอดจาก Clark & Watson (1991)',
      year: '1995 (ฉบับแปลไทยโดย ม.ขอนแก่น & จุฬาลงกรณ์มหาวิทยาลัย)',
      summary: 'ทฤษฎีระบุว่าอารมณ์ด้านลบสามารถแยกเป็น 3 มิติอิสระ: (1) ความเครียด คือภาวะตึงตัวและกระตุ้นระบบประสาทสูงเรื้อรัง (2) ความวิตกกังวล คือการตื่นตระหนกทางกายภาพและระบบประสาทอัตโนมัติ (3) ภาวะซึมเศร้า คือการสูญเสียความสามารถในการสัมผัสความสุข (Anhedonia) และความสิ้นหวัง',
      mechanism: 'ช่วยให้นักจิตวิทยารู้ว่านักศึกษากำลังเผชิญกับ Physiological Hyperarousal (วิตกกังวล) หรือ High Negative Affectivity (เครียด) หรือ Low Positive Affectivity (ซึมเศร้า)'
    },
    scaleOptions: [
      { value: 0, label: 'ไม่ตรงกับฉันเลย', description: 'ไม่เคยเกิดขึ้นในช่วงสัปดาห์ที่ผ่านมา' },
      { value: 1, label: 'ตรงกับฉันบ้าง', description: 'เกิดขึ้นบางครั้ง หรือช่วงสั้นๆ' },
      { value: 2, label: 'ตรงกับฉันมาก', description: 'เกิดขึ้นบ่อยครั้ง หรือกินเวลาพอสมควร' },
      { value: 3, label: 'ตรงกับฉันมากที่สุด', description: 'เกิดขึ้นเกือบตลอดเวลา หรือเกือบทุกวัน' },
    ],
    questions: [
      { id: 1, text: 'ฉันรู้สึกหงุดหงิดใจกับเรื่องเล็กๆ น้อยๆ ได้ง่าย', subscale: 'stress' },
      { id: 2, text: 'ฉันมีอาการปากแห้ง คอแห้ง หรือกลืนน้ำลายลำบาก', subscale: 'anxiety' },
      { id: 3, text: 'ฉันไม่สามารถสัมผัสถึงความรู้สึกเชิงบวกหรือความเพลิดเพลินใจได้เลย', subscale: 'depression' },
      { id: 4, text: 'ฉันมีอาการหายใจลำบาก หายใจไม่อิ่ม หรือหอบโดยไม่มีสาเหตุจากการออกกำลังกาย', subscale: 'anxiety' },
      { id: 5, text: 'ฉันรู้สึกยากลำบากที่จะเริ่มต้นลงมือทำสิ่งต่างๆ', subscale: 'depression' },
      { id: 6, text: 'ฉันมีแนวโน้มที่จะตอบสนองต่อสถานการณ์ต่างๆ รุนแรงเกินจริง', subscale: 'stress' },
      { id: 7, text: 'ฉันมีอาการมือสั่น ตัวสั่น หรือรู้สึกสั่นสะท้านอยู่ข้างใน', subscale: 'anxiety' },
      { id: 8, text: 'ฉันรู้สึกว่าตนเองใช้พลังงานทางประสาทไปมากและเหนื่อยล้าเรื้อรัง', subscale: 'stress' },
      { id: 9, text: 'ฉันกังวลถึงสถานการณ์ที่อาจทำให้ตนเองตื่นตระหนกหรือทำอะไรขายหน้า', subscale: 'anxiety' },
      { id: 10, text: 'ฉันรู้สึกเหมือนไม่มีอะไรน่าเฝ้ารอคอยหรือไม่มีอนาคต', subscale: 'depression' },
      { id: 11, text: 'ฉันพบว่าตนเองกระสับกระส่าย กระวนกระวาย อยู่นิ่งไม่ค่อยได้', subscale: 'stress' },
      { id: 12, text: 'ฉันรู้สึกยากที่จะผ่อนคลายร่างกายและจิตใจให้สงบลงได้', subscale: 'stress' },
      { id: 13, text: 'ฉันรู้สึกเศร้าหมอง ท้อแท้ และหดหู่ใจ', subscale: 'depression' },
      { id: 14, text: 'ฉันรู้สึกใจร้อนและหมดความอดทนกับสิ่งที่ขัดขวางการทำงาน', subscale: 'stress' },
      { id: 15, text: 'ฉันรู้สึกเหมือนตัวเองกำลังจะเป็นลมหรือหัวใจเต้นเร็วผิดปกติ', subscale: 'anxiety' },
      { id: 16, text: 'ฉันรู้สึกว่าตนเองสูญเสียความกระตือรือร้นในสิ่งต่างๆ ที่เคยชอบ', subscale: 'depression' },
      { id: 17, text: 'ฉันรู้สึกว่าตนเองไม่มีคุณค่าหรือไม่มีความสำคัญ', subscale: 'depression' },
      { id: 18, text: 'ฉันรู้สึกว่าตนเองค่อนข้างอ่อนไหวและระคายเคืองใจง่าย', subscale: 'stress' },
      { id: 19, text: 'ฉันรับรู้ได้ถึงการเต้นของหัวใจชัดเจน หรือรู้สึกใจสั่นโดยไม่ได้ออกแรง', subscale: 'anxiety' },
      { id: 20, text: 'ฉันรู้สึกหวาดกลัวโดยไม่มีเหตุผลที่ชัดเจน', subscale: 'anxiety' },
      { id: 21, text: 'ฉันรู้สึกว่าชีวิตไม่มีความหมายหรือไร้จุดหมาย', subscale: 'depression' },
    ],
    calculateResult: (answers) => {
      // DASS-21 scale scores are calculated by summing items and multiplying by 2 (to match DASS-42 normative tables)
      let stressRaw = 0;
      let anxietyRaw = 0;
      let depressionRaw = 0;

      const stressItems = [1, 6, 8, 11, 12, 14, 18];
      const anxietyItems = [2, 4, 7, 9, 15, 19, 20];
      const depressionItems = [3, 5, 10, 13, 16, 17, 21];

      stressItems.forEach((id) => { stressRaw += answers[id] || 0; });
      anxietyItems.forEach((id) => { anxietyRaw += answers[id] || 0; });
      depressionItems.forEach((id) => { depressionRaw += answers[id] || 0; });

      const stressScore = stressRaw * 2;
      const anxietyScore = anxietyRaw * 2;
      const depressionScore = depressionRaw * 2;
      const totalScore = stressScore + anxietyScore + depressionScore;

      // Subscale levels according to Lovibond (1995)
      const getStressLevel = (s: number) => {
        if (s <= 14) return { level: 'ปกติ (Normal)', color: '#65856c', grade: 'normal' };
        if (s <= 18) return { level: 'เล็กน้อย (Mild)', color: '#a38f3d', grade: 'mild' };
        if (s <= 25) return { level: 'ปานกลาง (Moderate)', color: '#e08d58', grade: 'moderate' };
        if (s <= 33) return { level: 'รุนแรง (Severe)', color: '#c85a32', grade: 'severe' };
        return { level: 'รุนแรงมาก (Extremely Severe)', color: '#b83a2c', grade: 'extremely_severe' };
      };

      const getAnxietyLevel = (a: number) => {
        if (a <= 7) return { level: 'ปกติ (Normal)', color: '#65856c', grade: 'normal' };
        if (a <= 9) return { level: 'เล็กน้อย (Mild)', color: '#a38f3d', grade: 'mild' };
        if (a <= 14) return { level: 'ปานกลาง (Moderate)', color: '#e08d58', grade: 'moderate' };
        if (a <= 19) return { level: 'รุนแรง (Severe)', color: '#c85a32', grade: 'severe' };
        return { level: 'รุนแรงมาก (Extremely Severe)', color: '#b83a2c', grade: 'extremely_severe' };
      };

      const getDepressionLevel = (d: number) => {
        if (d <= 9) return { level: 'ปกติ (Normal)', color: '#65856c', grade: 'normal' };
        if (d <= 13) return { level: 'เล็กน้อย (Mild)', color: '#a38f3d', grade: 'mild' };
        if (d <= 20) return { level: 'ปานกลาง (Moderate)', color: '#e08d58', grade: 'moderate' };
        if (d <= 27) return { level: 'รุนแรง (Severe)', color: '#c85a32', grade: 'severe' };
        return { level: 'รุนแรงมาก (Extremely Severe)', color: '#b83a2c', grade: 'extremely_severe' };
      };

      const stObj = getStressLevel(stressScore);
      const axObj = getAnxietyLevel(anxietyScore);
      const dpObj = getDepressionLevel(depressionScore);

      const subscales: AssessmentSubscaleScore[] = [
        {
          name: 'Stress',
          nameTh: 'ความเครียดทางสรีระและอารมณ์',
          score: stressScore,
          maxScore: 42,
          level: stObj.level,
          color: stObj.color,
          description: 'ประเมินความตึงเครียดของกล้ามเนื้อ ความไม่อดทน และการถูกกระตุ้นให้หงุดหงิดง่าย'
        },
        {
          name: 'Anxiety',
          nameTh: 'ความวิตกกังวลและสรีระตื่นตระหนก',
          score: anxietyScore,
          maxScore: 42,
          level: axObj.level,
          color: axObj.color,
          description: 'ประเมินการตอบสนองของระบบประสาทอัตโนมัติ อาการใจสั่น มือสั่น และความกลัวสถานการณ์'
        },
        {
          name: 'Depression',
          nameTh: 'ภาวะอารมณ์เศร้าและการสูญเสียความสุข',
          score: depressionScore,
          maxScore: 42,
          level: dpObj.level,
          color: dpObj.color,
          description: 'ประเมินการมองโลกในแง่ร้าย ความสิ้นหวัง และการขาดแรงจูงใจในการใช้ชีวิต'
        }
      ];

      // Overall Grade
      let overallGrade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      if ([stObj.grade, axObj.grade, dpObj.grade].includes('extremely_severe')) {
        overallGrade = 'extremely_severe';
      } else if ([stObj.grade, axObj.grade, dpObj.grade].includes('severe')) {
        overallGrade = 'severe';
      } else if ([stObj.grade, axObj.grade, dpObj.grade].includes('moderate')) {
        overallGrade = 'moderate';
      } else if ([stObj.grade, axObj.grade, dpObj.grade].includes('mild')) {
        overallGrade = 'mild';
      }

      const recommendations: string[] = [];
      if (stressScore > 14) {
        recommendations.push('ฝึกการผ่อนคลายกล้ามเนื้ออย่างเป็นลำดับ (PMR) วันละ 15 นาทีก่อนนอน เพื่อลดความตึงของระบบประสาท');
      }
      if (anxietyScore > 7) {
        recommendations.push('ฝึกเทคนิค Box Breathing (4-4-4-4) หรือ 4-7-8 เมื่อรู้สึกหัวใจเต้นเร็วหรือตื่นเต้น');
      }
      if (depressionScore > 9) {
        recommendations.push('จัดตารางกิจกรรมเพิ่มความสุขทีละเล็กน้อย (Behavioral Activation) และพูดคุยกับเพื่อนหรือคนที่ไว้ใจ');
      }
      if (recommendations.length === 0) {
        recommendations.push('สุขภาวะทางอารมณ์อยู่ในเกณฑ์ปกติ มีความยืดหยุ่นในการจัดการเรื่องเรียนและชีวิตได้ดี');
      }
      if (overallGrade === 'severe' || overallGrade === 'extremely_severe') {
        recommendations.push('แนะนำให้นัดหมายพูดคุยกับนักจิตวิทยาคลินิก มข. หรือส่งผลนี้เข้าแชทเพื่อวางแผนการดูแลร่วมกัน');
      }

      // Determine 3-emotion profile (Sad, Happy, Anxious)
      const depPct = Math.min(100, Math.round((depressionScore / 42) * 100));
      const anxPct = Math.min(100, Math.round((anxietyScore / 42) * 100));
      const happyPct = Math.max(0, 100 - Math.round(((depressionScore + anxietyScore + stressScore) / 126) * 100));

      let dominant: 'happy' | 'sad' | 'anxiety' | 'balanced' = 'balanced';
      let dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';

      if (happyPct >= 60 && depPct < 35 && anxPct < 35) {
        dominant = 'happy';
        dominantTh = 'มีความสุข & สุขภาวะจิตดี (Happy & Flourishing)';
      } else if (depPct >= anxPct && depPct >= 35) {
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมอง & ท้อแท้ใจ (Sadness / Low Energy)';
      } else if (anxPct > depPct && anxPct >= 35) {
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวล & ตึงเครียด (Anxiety & Hyperarousal)';
      }

      return {
        score: totalScore,
        maxScore: 126,
        level: `ความเครียด: ${stObj.level} | วิตกกังวล: ${axObj.level} | ซึมเศร้า: ${dpObj.level}`,
        severityGrade: overallGrade,
        recommendations,
        subscales,
        dominantEmotion: dominant,
        dominantEmotionTh: dominantTh,
        emotionBreakdown: {
          happy: happyPct,
          sad: depPct,
          anxiety: anxPct
        },
        selfCarePlan: generateSelfCarePlan(dominant, overallGrade)
      };
    }
  },

  // 2. ST-5 (Suanprung Stress Test)
  {
    id: 'ST-5',
    name: 'ST-5 (Suanprung Stress Test)',
    nameTh: 'แบบประเมินความเครียดสวนปรุง (ฉบับมาตรฐานกรมสุขภาพจิต 5 ข้อ)',
    category: 'stress',
    categoryTh: 'ความเครียด',
    badge: 'มาตรฐานไทย (กรมสุขภาพจิต)',
    targetTime: '1-2 นาที',
    description: 'เครื่องมือคัดกรองความเครียดที่พัฒนาขึ้นสำหรับคนไทยโดยเฉพาะ เพื่อประเมินผลกระทบทางกายและพฤติกรรมจากความกดดัน',
    theory: {
      name: 'General Adaptation Syndrome (GAS) & Stress Appraisal Theory',
      theorist: 'Hans Selye (1956) & Lazarus and Folkman (1984) ดัดแปลงโดย สถาบันสุขภาพจิตจิตเวชสวนปรุง',
      year: '2001 (กรมสุขภาพจิต กระทรวงสาธารณสุข)',
      summary: 'ประเมินการตอบสนองของร่างกายต่อความเครียดใน 3 ระยะ (Alarm Reaction, Resistance, Exhaustion) โดยสะท้อนผ่านอาการทางกายภาพ เช่น นอนไม่หลับ ปวดศีรษะ และอาการทางอารมณ์ เช่น หงุดหงิดง่าย เบื่ออาหาร',
      mechanism: 'วัดระดับความเครียดสะสมในระยะสั้น (Short-term Accumulated Stress) เพื่อป้องกันไม่ให้เข้าสู่ภาวะความเครียดเรื้อรังหรือหมดไฟ'
    },
    scaleOptions: [
      { value: 0, label: 'แทบไม่มีเลย', description: 'ไม่เคยเกิดขึ้นเลย' },
      { value: 1, label: 'เป็นบางครั้ง', description: 'เกิดขึ้น 1-2 วันในรอบสัปดาห์' },
      { value: 2, label: 'บ่อยครั้ง', description: 'เกิดขึ้น 3-4 วันในรอบสัปดาห์' },
      { value: 3, label: 'เป็นประจำ', description: 'เกิดขึ้นแทบทุกวัน (5 วันขึ้นไป)' },
    ],
    questions: [
      { id: 1, text: 'มีปัญหานอนไม่หลับ หลับๆ ตื่นๆ หรือตื่นกลางดึกแล้วนอนต่อไม่ได้' },
      { id: 2, text: 'หงุดหงิดง่าย อารมณ์เสียโดยไม่มีสาเหตุชัดเจน หรือใจร้อนกับคนรอบข้าง' },
      { id: 3, text: 'รู้สึกเบื่อหน่าย ไม่อยากพบปะผู้คน ไม่อยากไปเรียนหรือทำกิจกรรม' },
      { id: 4, text: 'ไม่อยากรับประทานอาหาร หรือรับประทานมากกว่าปกติโดยไม่รู้ตัว' },
      { id: 5, text: 'รู้สึกปวดศีรษะข้างเดียว ปวดท้ายทอย หรือปวดเมื่อยเกร็งบริเวณต้นคอบ่าไหล่' }
    ],
    calculateResult: (answers) => {
      let sum = 0;
      for (let i = 1; i <= 5; i++) {
        sum += answers[i] || 0;
      }

      const anxietyPct = Math.min(100, Math.round((sum / 15) * 100));
      const happyPct = Math.max(0, 100 - anxietyPct);
      const sadPct = Math.round(anxietyPct * 0.45);

      let dominant: 'happy' | 'sad' | 'anxiety' | 'balanced' = 'balanced';
      let dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';
      let grade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      let level = '';
      const recommendations: string[] = [];

      if (sum <= 4) {
        level = 'ความเครียดระดับน้อย (Mild Stress)';
        grade = 'normal';
        dominant = happyPct >= 65 ? 'happy' : 'balanced';
        dominantTh = dominant === 'happy' ? 'มีความสุข & สุขภาวะจิตดี (Happy & Relaxed)' : 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced)';
        recommendations.push('ระดับความเครียดอยู่ในเกณฑ์ปกติของนักศึกษา สามารถปรับตัวกับภาระการเรียนได้ดี');
        recommendations.push('รักษาสุขนิสัยที่ดีในการนอนหลับ ออกกำลังกายสม่ำเสมอ และมีเวลาพักผ่อนกับงานอดิเรก');
      } else if (sum <= 7) {
        level = 'ความเครียดระดับปานกลาง (Moderate Stress)';
        grade = 'mild';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวล & ตื่นตัวระดับเริ่มแรก (Mild Anxiety/Stress)';
        recommendations.push('มีความเครียดในชีวิตประจำวันจากการเรียนหรือกิจกรรม แต่ยังสามารถประคับประคองได้');
        recommendations.push('แนะนำให้แบ่งเวลาพักเบรกสั้นๆ (Pomodoro 25/5 นาที) ระหว่างการอ่านหนังสือ');
        recommendations.push('ฝึกยืดเหยียดกล้ามเนื้อคอบ่าไหล่ และดื่มน้ำให้เพียงพอ');
      } else if (sum <= 9) {
        level = 'ความเครียดระดับสูง (High Stress)';
        grade = 'moderate';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวล & ตึงเครียดสะสม (High Anxiety/Stress)';
        recommendations.push('ความเครียดเริ่มส่งผลกระทบต่อร่างกายและการนอนหลับอย่างเห็นได้ชัด');
        recommendations.push('แนะนำให้ฝึกเทคนิคผ่อนคลายกล้ามเนื้อ PMR ทุกวัน และลดการดื่มกาแฟหรือเครื่องดื่มชูกำลังหลัง 15:00 น.');
        recommendations.push('พูดคุยปรึกษาเพื่อนหรือนักจิตวิทยาเพื่อทบทวนการจัดตารางเวลาและจัดการสิ่งที่กังวล');
      } else {
        level = 'ความเครียดระดับรุนแรง (Severe Stress)';
        grade = 'severe';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวลรุนแรง & ร่างกายตึงตัวสูง (Severe Strain)';
        recommendations.push('ความเครียดอยู่ในระดับรุนแรง ร่างกายกำลังส่งสัญญาณเตือนอย่างชัดเจน');
        recommendations.push('ควรหยุดพักและปรึกษานักจิตวิทยาคลินิกหรือจิตแพทย์เพื่อรับการประเมินช่วยเหลืออย่างใกล้ชิด');
        recommendations.push('สามารถส่งผลนี้เข้าแชทของ อ.ดร. ภาวิณี หรือโทรสายด่วนสุขภาพจิต มข. 043-009700 ได้ทันที');
      }

      return {
        score: sum,
        maxScore: 15,
        level,
        severityGrade: grade,
        recommendations,
        dominantEmotion: dominant,
        dominantEmotionTh: dominantTh,
        emotionBreakdown: {
          happy: happyPct,
          sad: sadPct,
          anxiety: anxietyPct
        },
        selfCarePlan: generateSelfCarePlan(dominant, grade)
      };
    }
  },

  // 3. GAD-7 (Generalized Anxiety Disorder 7)
  {
    id: 'GAD-7',
    name: 'GAD-7 (Generalized Anxiety Disorder 7)',
    nameTh: 'แบบคัดกรองโรควิตกกังวลทั่วไป (Generalized Anxiety Scale)',
    category: 'anxiety',
    categoryTh: 'ความวิตกกังวล',
    badge: 'DSM-5 Validated',
    targetTime: '2-3 นาที',
    description: 'ประเมินระดับความวิตกกังวลเรื้อรังที่ควบคุมได้ยาก ความรู้สึกกระวนกระวาย และความตื่นตระหนกในช่วง 2 สัปดาห์ที่ผ่านมา',
    theory: {
      name: 'Metacognitive & Cognitive Model of Anxiety',
      theorist: 'Dr. Robert L. Spitzer, Dr. Kurt Kroenke, et al. (2006)',
      year: '2006 (อ้างอิงเกณฑ์การวินิจฉัยโรคตาม DSM-IV & DSM-5)',
      summary: 'ทฤษฎีอธิบายว่าความวิตกกังวลทั่วไปเกิดจากการตีความสิ่งเร้าในชีวิตว่าคุกคามเกินจริง (Catastrophizing) ควบคู่กับความรู้สึกว่าตนเองไม่สามารถควบคุมความคิดฟุ้งซ่านได้ (Uncontrollability of Worry) ส่งผลให้ร่างกายกระวนกระวาย กล้ามเนื้อตึง และระบบประสาท sympathetic ทำงานหนัก',
      mechanism: 'คัดกรองอาการหลัก 7 ด้านของโรควิตกกังวลทั่วไป เช่น ความไม่สามารถหยุดกังวล ความยากในการผ่อนคลาย และความกลัวว่าจะมีเรื่องเลวร้ายเกิดขึ้น'
    },
    scaleOptions: [
      { value: 0, label: 'ไม่มีเลย', description: 'ไม่เคยรู้สึกเลย' },
      { value: 1, label: 'เป็นบางวัน', description: 'มีอาการ 1-6 วันในช่วง 2 สัปดาห์' },
      { value: 2, label: 'มากกว่าครึ่งหนึ่งของจำนวนวัน', description: 'มีอาการมากกว่า 7 วัน' },
      { value: 3, label: 'เป็นเกือบทุกวัน', description: 'มีอาการแทบทุกวัน (12-14 วัน)' },
    ],
    questions: [
      { id: 1, text: 'รู้สึกกระสับกระส่าย วิตกกังวล หรือรู้สึกตึงเครียดมาก' },
      { id: 2, text: 'ไม่สามารถหยุดหรือควบคุมความวิตกกังวลที่เกิดขึ้นได้' },
      { id: 3, text: 'กังวลมากเกินไปในหลายๆ เรื่องพร้อมกัน (เช่น การเรียน สุขภาพ การเงิน ความสัมพันธ์)' },
      { id: 4, text: 'รู้สึกผ่อนคลายได้ยาก นั่งนิ่งๆ แล้วรู้สึกอึดอัดใจ' },
      { id: 5, text: 'กระวนกระวายจนอยู่นิ่งไม่ได้ ต้องเดินไปมาหรือขยับตัวตลอด' },
      { id: 6, text: 'รู้สึกหงุดหงิดหรืออารมณ์เสียง่ายกว่าปกติ' },
      { id: 7, text: 'รู้สึกกลัวราวกับว่าจะมีเรื่องร้ายแรงหรือสิ่งเลวร้ายเกิดขึ้นกับตนเอง' }
    ],
    calculateResult: (answers) => {
      let sum = 0;
      for (let i = 1; i <= 7; i++) {
        sum += answers[i] || 0;
      }

      const anxietyPct = Math.min(100, Math.round((sum / 21) * 100));
      const happyPct = Math.max(0, 100 - anxietyPct);
      const sadPct = Math.round(anxietyPct * 0.4);

      let dominant: 'happy' | 'sad' | 'anxiety' | 'balanced' = 'balanced';
      let dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';
      let grade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      let level = '';
      const recommendations: string[] = [];

      if (sum <= 4) {
        level = 'ความวิตกกังวลระดับต่ำมาก (Minimal Anxiety)';
        grade = 'normal';
        dominant = happyPct >= 65 ? 'happy' : 'balanced';
        dominantTh = dominant === 'happy' ? 'มีความสุข & ผ่อนคลายดี (Happy & Calm)' : 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced)';
        recommendations.push('ระดับความวิตกกังวลอยู่ในเกณฑ์ปกติของมนุษย์ เป็นความตื่นตัวที่มีประโยชน์ในการเตรียมตัวทำงาน');
        recommendations.push('ฝึกการกำหนดลมหายใจและการทำสมาธิสั้นๆ เพื่อเสริมสร้างสมาธิและความสงบในจิตใจ');
      } else if (sum <= 9) {
        level = 'ความวิตกกังวลระดับต่ำ (Mild Anxiety)';
        grade = 'mild';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวลระดับเริ่มต้น (Mild Anxiety)';
        recommendations.push('มีความวิตกกังวลเล็กน้อยที่อาจรบกวนสมาธิบ้างเป็นครั้งคราว');
        recommendations.push('ใช้เทคนิคการจดบันทึก "เวลาแห่งความกังวล (Worry Time 15 นาที)" กำหนดเวลาคิดกังวลเป็นสัดส่วน ไม่ให้ล้นตลอดวัน');
        recommendations.push('ฝึกเทคนิค Grounding 5-4-3-2-1 เพื่อดึงสติกลับมาอยู่กับปัจจุบันขณะ');
      } else if (sum <= 14) {
        level = 'ความวิตกกังวลระดับปานกลาง (Moderate Anxiety)';
        grade = 'moderate';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวลปานกลาง & ฟุ้งซ่าน (Moderate Anxiety)';
        recommendations.push('ความวิตกกังวลเริ่มส่งผลกระทบต่อประสิทธิภาพการเรียน การเตรียมสอบ และความสัมพันธ์');
        recommendations.push('ควรลองปฏิบัติตามแผนดูแลตนเองเบื้องต้น 3-5 วัน และหากยังไม่ดีขึ้นสามารถนัดหมายคุยกับนักจิตวิทยา');
        recommendations.push('งดเครื่องดื่มที่มีคาเฟอีนสูง เพราะอาจกระตุ้นให้อาการใจสั่นและมือสั่นรุนแรงขึ้น');
      } else {
        level = 'ความวิตกกังวลระดับรุนแรง (Severe Anxiety)';
        grade = 'severe';
        dominant = 'anxiety';
        dominantTh = 'สภาวะวิตกกังวลรุนแรง & ตื่นตระหนก (Severe Anxiety)';
        recommendations.push('เข้าเกณฑ์ความวิตกกังวลระดับรุนแรง อาจมีภาวะ Panic ร่วมด้วย หรือวิตกกังวลจนส่งผลต่อชีวิตประจำวันอย่างมาก');
        recommendations.push('แนะนำอย่างยิ่งให้รับคำปรึกษาจากนักจิตวิทยาคลินิกหรือพบจิตแพทย์เพื่อรับการดูแลอย่างถูกวิธี');
        recommendations.push('ท่านสามารถกดส่งผลการประเมินนี้เข้าห้องแชทของศูนย์สุขภาวะ มข. เพื่อขอนัดหมายด่วนได้ทันที');
      }

      return {
        score: sum,
        maxScore: 21,
        level,
        severityGrade: grade,
        recommendations,
        dominantEmotion: dominant,
        dominantEmotionTh: dominantTh,
        emotionBreakdown: {
          happy: happyPct,
          sad: sadPct,
          anxiety: anxietyPct
        },
        selfCarePlan: generateSelfCarePlan(dominant, grade)
      };
    }
  },

  // 4. PHQ-9 (Patient Health Questionnaire - 9)
  {
    id: 'PHQ-9',
    name: 'PHQ-9 (Patient Health Questionnaire)',
    nameTh: 'แบบประเมินภาวะซึมเศร้า 9 คำถาม',
    category: 'depression',
    categoryTh: 'ภาวะซึมเศร้า',
    badge: 'Clinical Screening',
    targetTime: '2-3 นาที',
    description: 'แบบคัดกรองภาวะซึมเศร้าตามเกณฑ์การวินิจฉัยทางการแพทย์ ประเมินอาการทั้งด้านอารมณ์ ร่างกาย และความคิดเกี่ยวกับตนเอง',
    theory: {
      name: 'Beck\'s Cognitive Theory of Depression & DSM Criteria',
      theorist: 'Aaron T. Beck (1967) & Kurt Kroenke, Robert L. Spitzer (2001)',
      year: '2001 (ฉบับมาตรฐานภาษาไทย กรมสุขภาพจิต)',
      summary: 'ทฤษฎีอธิบายว่าภาวะซึมเศร้าสัมพันธ์กับ Cognitive Triad (ความคิดลบอัตโนมัติต่อตนเอง ต่อโลก และต่ออนาคต) ร่วมกับการเปลี่ยนแปลงทางชีวเคมีในสมองที่ทำให้เกิดอาการ Anhedonia (เบื่อสิ่งที่เคยชอบ), Sleep disturbance, และ Fatigue',
      mechanism: 'ประเมิน 9 เกณฑ์หลักของ Major Depressive Episode พร้อมระบบคัดกรองความปลอดภัยกรณีมีความคิดทำร้ายตนเอง (ข้อที่ 9)'
    },
    scaleOptions: [
      { value: 0, label: 'ไม่มีเลย', description: 'ไม่เคยเกิดขึ้นเลย' },
      { value: 1, label: 'เป็นบางวัน', description: 'มีอาการ 1-7 วัน' },
      { value: 2, label: 'บ่อยกว่าครึ่งหนึ่ง', description: 'มีอาการมากกว่า 7 วัน' },
      { value: 3, label: 'เป็นเกือบทุกวัน', description: 'มีอาการแทบทุกวัน (12-14 วัน)' },
    ],
    questions: [
      { id: 1, text: 'เบื่อ ไม่สนใจ หรือไม่เพลิดเพลินในการทำสิ่งต่างๆ ที่เคยชอบ' },
      { id: 2, text: 'รู้สึกไม่สบายใจ ซึมเศร้า ท้อแท้ หรือหมดหวัง' },
      { id: 3, text: 'หลับยาก หรือหลับๆ ตื่นๆ หรือนอนหลับมากเกินไปผิดปกติ' },
      { id: 4, text: 'เหนื่อยง่าย รู้สึกเพลีย หรือไม่มีเรี่ยวแรงจะทำอะไร' },
      { id: 5, text: 'เบื่ออาหารจนน้ำหนักลด หรือกินจุบจิบกินมากเกินไป' },
      { id: 6, text: 'รู้สึกแย่กับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ครอบครัวผิดหวัง' },
      { id: 7, text: 'สมาธิไม่ดีเวลาทำสิ่งต่างๆ เช่น ฟังบรรยาย อ่านหนังสือ หรือดูโทรทัศน์' },
      { id: 8, text: 'พูดหรือทำอะไรช้าจนคนอื่นสังเกตเห็น หรือกระสับกระส่ายจนอยู่นิ่งไม่ได้' },
      { id: 9, text: 'คิดอยากตาย หรือคิดอยากทำร้ายตัวเองให้เจ็บ' }
    ],
    calculateResult: (answers) => {
      let sum = 0;
      for (let i = 1; i <= 9; i++) {
        sum += answers[i] || 0;
      }

      const hasSuicidalIdeation = (answers[9] || 0) > 0;
      const sadPct = Math.min(100, Math.round((sum / 27) * 100));
      const happyPct = Math.max(0, 100 - sadPct);
      const anxietyPct = Math.round(sadPct * 0.45);

      let level = 'ไม่มีภาวะซึมเศร้าหรือมีน้อยมาก';
      let grade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      let dominant: 'happy' | 'sad' | 'anxiety' | 'balanced' = 'balanced';
      let dominantTh = 'สภาวะอารมณ์สมดุลผ่อนคลาย (Balanced & Stable)';
      const recommendations: string[] = [];

      if (sum < 5) {
        level = 'ไม่มีภาวะซึมเศร้าหรือมีน้อยมาก (Minimal / Normal)';
        grade = 'normal';
        dominant = happyPct >= 65 ? 'happy' : 'balanced';
        dominantTh = dominant === 'happy' ? 'มีความสุข & สุขภาวะจิตดี (Happy & Flourishing)' : 'สภาวะอารมณ์สมดุลปกติ (Balanced)';
        recommendations.push('สุขภาพจิตอยู่ในเกณฑ์สมบูรณ์ดี รักษาการใช้ชีวิตและการดูแลตนเองต่อไป');
      } else if (sum <= 9) {
        level = 'ภาวะซึมเศร้าระดับเล็กน้อย (Mild Depression)';
        grade = 'mild';
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมอง & ท้อแท้ระดับเริ่มต้น (Mild Sadness)';
        recommendations.push('มีภาวะอารมณ์เศร้าเล็กน้อย ควรดูแลสุขอนามัยการนอนหลับ และทำกิจกรรมสร้างพลังใจตามแผนดูแลตนเอง');
        recommendations.push('บันทึก Mood Diary เพื่อสังเกตสิ่งที่กระตุ้นให้อารมณ์ดิ่งลง');
      } else if (sum <= 14) {
        level = 'ภาวะซึมเศร้าระดับปานกลาง (Moderate Depression)';
        grade = 'moderate';
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมอง & พลังใจลดลง (Moderate Sadness)';
        recommendations.push('อาการเริ่มส่งผลต่อสมาธิการเรียน แนะนำให้ทดลองฝึกตามแผนดูแลตนเอง 3-5 วัน หากยังไม่ดีขึ้นปรึกษานักจิตวิทยาประจำตัว');
        recommendations.push('หลีกเลี่ยงการแยกตัวอยู่คนเดียวนานๆ พยายามเชื่อมโยงกับกลุ่มเพื่อนหรือคนที่ไว้ใจ');
      } else if (sum <= 19) {
        level = 'ภาวะซึมเศร้าระดับรุนแรงปานกลาง (Moderately Severe Depression)';
        grade = 'severe';
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมองระดับรุนแรงปานกลาง (Moderately Severe Sadness)';
        recommendations.push('ควรรับการดูแลและประเมินอย่างใกล้ชิดจากนักจิตวิทยาคลินิกหรือจิตแพทย์');
        recommendations.push('สามารถแจ้งอาจารย์ที่ปรึกษาหรือส่งผลเข้าแชทศูนย์สุขภาวะ มข. เพื่อรับความช่วยเหลือ');
      } else {
        level = 'ภาวะซึมเศร้าระดับรุนแรง (Severe Depression)';
        grade = 'extremely_severe';
        dominant = 'sad';
        dominantTh = 'สภาวะเศร้าหมองระดับรุนแรง (Severe Depressive State)';
        recommendations.push('จำเป็นต้องได้รับการดูแลรักษาทางการแพทย์และจิตวิทยาอย่างเร่งด่วน');
        recommendations.push('กรุณาติดต่อสายด่วนสุขภาพจิต มข. 043-009700 ต่อ 40222 หรือติดต่อเจ้าหน้าที่ทันที');
      }

      if (hasSuicidalIdeation) {
        recommendations.unshift('⚠️ มีการตอบคำถามเรื่องความคิดทำร้ายตนเอง: กรุณาอย่าเก็บความรู้สึกไว้คนเดียว ติดต่อสายด่วนฉุกเฉิน มข. หรือปุ่ม SOS ทันที เราพร้อมรับฟังและอยู่เคียงข้างคุณ');
      }

      recommendations.push('💡 ขั้นตอนแนะนำ: ลองนำวิธีจัดการตนเองเบื้องต้นไปฝึกปฏิบัติด้วยตัวเองก่อน 3-5 วัน หากยังรู้สึกไม่ดีขึ้น สามารถนัดหมายหรือส่งผลนี้คุยกับนักจิตวิทยา มข. ได้เสมอ');

      return {
        score: sum,
        maxScore: 27,
        level,
        severityGrade: grade,
        recommendations,
        dominantEmotion: dominant,
        dominantEmotionTh: dominantTh,
        emotionBreakdown: {
          happy: happyPct,
          sad: sadPct,
          anxiety: anxietyPct
        },
        selfCarePlan: generateSelfCarePlan(dominant, grade)
      };
    }
  },

  // 5. MBI-SS (Maslach Burnout Inventory - Student Survey)
  {
    id: 'MBI-SS',
    name: 'MBI-SS (Maslach Burnout Inventory - Student Survey)',
    nameTh: 'แบบประเมินภาวะหมดไฟในการเรียนสำหรับนักศึกษา',
    category: 'burnout',
    categoryTh: 'ภาวะหมดไฟ',
    badge: 'Maslach Theory',
    targetTime: '2-3 นาที',
    description: 'ประเมินภาวะหมดไฟในการเรียน (Academic Burnout) แยกเป็น 3 มิติ: ความเหนื่อยล้าทางอารมณ์, ทัศนคติเหินห่างต่อการเรียน, และความรู้สึกสูญเสียประสิทธิผล',
    theory: {
      name: 'Multidimensional Model of Burnout (ทฤษฎีภาวะหมดไฟ 3 มิติ)',
      theorist: 'Prof. Christina Maslach & Prof. Wilmar Schaufeli (1996, 2002)',
      year: '2002 (MBI Student Survey Framework)',
      summary: 'อธิบายว่าภาวะหมดไฟมิใช่เพียงความเหนื่อยทางกายธรรมดา แต่เป็นผลสะสมจากความเครียดในการเรียนที่เกินกำลัง ประกอบด้วย: (1) Emotional Exhaustion (หมดพลังใจ) (2) Cynicism (หมดศรัทธาและเหินห่างจากการเรียน) (3) Inefficacy (รู้สึกว่าตนเองไร้ความสามารถ)',
      mechanism: 'ช่วยให้นักศึกษาแยกแยะได้ว่าตนเองแค่ต้องการนอนพักผ่อน (Fatigue) หรือกำลังเผชิญภาวะหมดไฟที่ต้องปรับระบบการเรียนและวิธีคิด (Burnout Syndrome)'
    },
    scaleOptions: [
      { value: 0, label: 'ไม่เคยเลย', description: 'ไม่เคยมีความรู้สึกนี้' },
      { value: 1, label: 'ไม่บ่อย (เดือนละครั้ง)', description: 'นานๆ รู้สึกครั้งหนึ่ง' },
      { value: 2, label: 'เป็นบางครั้ง (สัปดาห์ละครั้ง)', description: 'รู้สึกสัปดาห์ละครั้ง' },
      { value: 3, label: 'บ่อยมาก (เกือบทุกวัน)', description: 'รู้สึกเกือบทุกวันหรือทุกครั้งที่ไปเรียน' },
    ],
    questions: [
      { id: 1, text: 'ฉันรู้สึกหมดพลังและเหนื่อยล้าอย่างมากจากการเรียนและการทำการบ้าน', subscale: 'exhaustion' },
      { id: 2, text: 'ฉันรู้สึกอ่อนล้าทั้งทางกายและจิตใจตั้งแต่ตื่นนอนเมื่อนึกถึงว่าต้องไปเรียน', subscale: 'exhaustion' },
      { id: 3, text: 'การนั่งเรียนในห้องหรืออ่านหนังสือทำให้ฉันรู้สึกตึงเครียดจนทนแทบไม่ไหว', subscale: 'exhaustion' },
      { id: 4, text: 'ฉันเริ่มรู้สึกสนใจการเรียนน้อยลง และไม่ค่อยเห็นความหมายของสิ่งที่กำลังเรียน', subscale: 'cynicism' },
      { id: 5, text: 'ฉันมีทัศนคติที่เฉยชา เย็นชา หรือเริ่มไม่อยากมีส่วนร่วมกับคณะและเพื่อนร่วมสาขา', subscale: 'cynicism' },
      { id: 6, text: 'ฉันเริ่มสงสัยว่าสิ่งที่ตนเองกำลังทุ่มเทเรียนอยู่นี้มีประโยชน์จริงหรือไม่', subscale: 'cynicism' },
      { id: 7, text: 'ฉันรู้สึกว่าตนเองแก้ปัญหาทางการเรียนได้อย่างมีประสิทธิภาพน้อยลงเรื่อยๆ', subscale: 'inefficacy' },
      { id: 8, text: 'ฉันรู้สึกว่าตนเองไม่ได้มีส่วนร่วมหรือสร้างคุณค่าให้กับงานกลุ่มเหมือนแต่ก่อน', subscale: 'inefficacy' },
      { id: 9, text: 'ฉันสูญเสียความมั่นใจในความสามารถของตนเองที่จะเรียนให้ประสบความสำเร็จ', subscale: 'inefficacy' }
    ],
    calculateResult: (answers) => {
      let exhaustion = 0;
      let cynicism = 0;
      let inefficacy = 0;

      [1, 2, 3].forEach((id) => { exhaustion += answers[id] || 0; });
      [4, 5, 6].forEach((id) => { cynicism += answers[id] || 0; });
      [7, 8, 9].forEach((id) => { inefficacy += answers[id] || 0; });

      const total = exhaustion + cynicism + inefficacy;

      const subscales: AssessmentSubscaleScore[] = [
        {
          name: 'Emotional Exhaustion',
          nameTh: 'ความเหนื่อยล้าทางอารมณ์และพลังงาน',
          score: exhaustion,
          maxScore: 9,
          level: exhaustion >= 6 ? 'สูง (High Exhaustion)' : exhaustion >= 4 ? 'ปานกลาง' : 'ต่ำ (ปกติ)',
          color: exhaustion >= 6 ? '#c85a32' : '#65856c',
          description: 'ความรู้สึกว่าพลังงานทางจิตใจถูกสูบออกไปจนหมด'
        },
        {
          name: 'Cynicism',
          nameTh: 'ความเฉยชาและเหินห่างจากการเรียน',
          score: cynicism,
          maxScore: 9,
          level: cynicism >= 6 ? 'สูง (High Cynicism)' : cynicism >= 4 ? 'ปานกลาง' : 'ต่ำ (ปกติ)',
          color: cynicism >= 6 ? '#e08d58' : '#65856c',
          description: 'ความรู้สึกไม่ผูกพัน ไม่เห็นความหมายในสาขาวิชาที่เรียน'
        },
        {
          name: 'Academic Inefficacy',
          nameTh: 'ความรู้สึกสูญเสียประสิทธิผลทางการเรียน',
          score: inefficacy,
          maxScore: 9,
          level: inefficacy >= 6 ? 'สูง (High Inefficacy)' : inefficacy >= 4 ? 'ปานกลาง' : 'ต่ำ (ปกติ)',
          color: inefficacy >= 6 ? '#b83a2c' : '#65856c',
          description: 'ความรู้สึกว่าตนเองไม่เก่ง ไม่สามารถรับมือกับโจทย์วิชาการได้'
        }
      ];

      let level = 'ภาวะหมดไฟระดับต่ำ (Engagement & Healthy)';
      let grade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      const recommendations: string[] = [];

      if (total <= 7) {
        level = 'มีพลังและความผูกพันกับการเรียนดี (Healthy Engagement)';
        grade = 'normal';
        recommendations.push('คุณมีพลังในการเรียนและความมั่นใจที่ดี รักษาสมดุลระหว่างการเรียนและการใช้ชีวิต (Study-Life Balance)');
      } else if (total <= 13) {
        level = 'มีความเหนื่อยล้าสะสมเบื้องต้น (Early Strain)';
        grade = 'mild';
        recommendations.push('เริ่มมีสัญญาณความล้าจากการเรียนสะสม แนะนำให้ตั้งวันหยุดพักจริง (Digital Detox) อย่างน้อยสัปดาห์ละ 1 วัน');
        recommendations.push('ทบทวนเป้าหมายย่อย (Micro-goals) แทนการมองภาพใหญ่ที่อาจทำให้รู้สึกท่วมท้น');
      } else if (total <= 19) {
        level = 'ภาวะหมดไฟระดับปานกลาง (Moderate Burnout)';
        grade = 'moderate';
        recommendations.push('มีความเหนื่อยล้าทางอารมณ์และความเหินห่างจากการเรียนชัดเจน ควรทบทวนการจัดตารางเวลาและปฏิเสธภาระงานที่ไม่จำเป็น');
        recommendations.push('พูดคุยกับอาจารย์ที่ปรึกษาหรือนักจิตวิทยาเพื่อปรับโครงสร้างการส่งงานและฟื้นฟูแรงบันดาลใจ');
      } else {
        level = 'ภาวะหมดไฟในการเรียนระดับรุนแรง (Severe Academic Burnout)';
        grade = 'severe';
        recommendations.push('กำลังอยู่ในภาวะหมดไฟรุนแรง ส่งผลกระทบต่อทั้งผลการเรียน ความนับถือตนเอง และสุขภาพกาย');
        recommendations.push('แนะนำให้รับการปรึกษากับศูนย์สุขภาวะทางจิต มข. เพื่อวางแผนการฟื้นฟูจิตใจและลดความตึงเครียดอย่างเป็นระบบ');
      }

      return {
        score: total,
        maxScore: 27,
        level,
        severityGrade: grade,
        recommendations,
        subscales
      };
    }
  },

  // 6. 2Q (Depression 2 Questions Rapid Screener)
  {
    id: '2Q',
    name: '2Q (แบบคัดกรองโรคซึมเศร้า 2 คำถาม)',
    nameTh: 'แบบคัดกรองเบื้องต้น 2 คำถาม (กรมสุขภาพจิต)',
    category: 'depression',
    categoryTh: 'คัดกรองด่วน',
    badge: 'Rapid Screening',
    targetTime: '30 วินาที',
    description: 'แบบคัดกรองด่วนมาตรฐานของกระทรวงสาธารณสุข สำหรับคัดกรองผู้มีภาวะเสี่ยงต่อโรคซึมเศร้าก่อนทำแบบประเมินฉบับเต็ม PHQ-9',
    theory: {
      name: 'Primary Care Screening Protocol for Depression',
      theorist: 'Department of Mental Health Thailand (กรมสุขภาพจิต กระทรวงสาธารณสุข)',
      year: '2008',
      summary: 'ใช้ 2 คำถามสำคัญเกี่ยวกับ Cardinal Symptoms ของภาวะซึมเศร้า (Depressed Mood และ Anhedonia) เพื่อค้นหากลุ่มเสี่ยงได้อย่างรวดเร็วและแม่นยำสูง (Sensitivity > 90%)',
      mechanism: 'หากตอบ "มี" เพียงข้อใดข้อหนึ่ง จะถือว่ามีความเสี่ยงและส่งต่อไปยังการทำแบบประเมิน PHQ-9'
    },
    scaleOptions: [
      { value: 0, label: 'ไม่มี', description: 'ไม่มีอาการเลยในช่วง 2 สัปดาห์ที่ผ่านมา' },
      { value: 1, label: 'มี', description: 'มีอาการอย่างใดอย่างหนึ่งในช่วง 2 สัปดาห์' }
    ],
    questions: [
      { id: 1, text: 'ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ ท่านรู้สึกหดหู่ เศร้า หรือท้อแท้สิ้นหวัง หรือไม่?' },
      { id: 2, text: 'ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ ท่านรู้สึกเบื่อ ทำอะไรก็ไม่เพลิดเพลิน หรือไม่?' }
    ],
    calculateResult: (answers) => {
      const isPositive = (answers[1] === 1) || (answers[2] === 1);
      const score = (answers[1] || 0) + (answers[2] || 0);

      if (!isPositive) {
        return {
          score: 0,
          maxScore: 2,
          level: 'ผลการคัดกรองปกติ (ไม่มีความเสี่ยงต่อโรคซึมเศร้า)',
          severityGrade: 'normal',
          recommendations: [
            'ผลการคัดกรองเบื้องต้นไม่พบความเสี่ยงต่อภาวะซึมเศร้า',
            'รักษาสุขภาวะที่ดี ดูแลการพักผ่อนและการออกกำลังกายสม่ำเสมอ'
          ]
        };
      } else {
        return {
          score,
          maxScore: 2,
          level: 'พบความเสี่ยงต่อภาวะซึมเศร้าเบื้องต้น (2Q Positive)',
          severityGrade: 'moderate',
          recommendations: [
            'ผลคัดกรองพบว่ามีอาการหดหู่หรือเบื่อหน่าย ควรทำแบบประเมินฉบับเต็ม (PHQ-9) เพื่อประเมินระดับความรุนแรงอย่างละเอียด',
            'ท่านสามารถกดปุ่ม "ทำแบบประเมิน PHQ-9 ต่อเนื่อง" ได้ทันที'
          ]
        };
      }
    }
  }
];
