import { PsychologicalScreener, AssessmentSubscaleScore } from '../types';

export const PSYCHOLOGICAL_SCREENERS: PsychologicalScreener[] = [
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

      return {
        score: totalScore,
        maxScore: 126,
        level: `ความเครียด: ${stObj.level} | วิตกกังวล: ${axObj.level} | ซึมเศร้า: ${dpObj.level}`,
        severityGrade: overallGrade,
        recommendations,
        subscales
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

      if (sum <= 4) {
        return {
          score: sum,
          maxScore: 15,
          level: 'ความเครียดระดับน้อย (Mild Stress)',
          severityGrade: 'normal',
          recommendations: [
            'ระดับความเครียดอยู่ในเกณฑ์ปกติของนักศึกษา สามารถปรับตัวกับภาระการเรียนได้ดี',
            'รักษาสุขนิสัยที่ดีในการนอนหลับ ออกกำลังกายสม่ำเสมอ และมีเวลาพักผ่อนกับงานอดิเรก'
          ]
        };
      } else if (sum <= 7) {
        return {
          score: sum,
          maxScore: 15,
          level: 'ความเครียดระดับปานกลาง (Moderate Stress)',
          severityGrade: 'mild',
          recommendations: [
            'มีความเครียดในชีวิตประจำวันจากการเรียนหรือกิจกรรม แต่ยังสามารถประคับประคองได้',
            'แนะนำให้แบ่งเวลาพักเบรกสั้นๆ (Pomodoro 25/5 นาที) ระหว่างการอ่านหนังสือ',
            'ฝึกยืดเหยียดกล้ามเนื้อคอบ่าไหล่ และดื่มน้ำให้เพียงพอ'
          ]
        };
      } else if (sum <= 9) {
        return {
          score: sum,
          maxScore: 15,
          level: 'ความเครียดระดับสูง (High Stress)',
          severityGrade: 'moderate',
          recommendations: [
            'ความเครียดเริ่มส่งผลกระทบต่อร่างกายและการนอนหลับอย่างเห็นได้ชัด',
            'แนะนำให้ฝึกเทคนิคผ่อนคลายกล้ามเนื้อ PMR ทุกวัน และลดการดื่มกาแฟหรือเครื่องดื่มชูกำลังหลัง 15:00 น.',
            'พูดคุยปรึกษาเพื่อนหรือนักจิตวิทยาเพื่อทบทวนการจัดตารางเวลาและจัดการสิ่งที่กังวล'
          ]
        };
      } else {
        return {
          score: sum,
          maxScore: 15,
          level: 'ความเครียดระดับรุนแรง (Severe Stress)',
          severityGrade: 'severe',
          recommendations: [
            'ความเครียดอยู่ในระดับรุนแรง ร่างกายกำลังส่งสัญญาณเตือนอย่างชัดเจน',
            'ควรหยุดพักและปรึกษานักจิตวิทยาคลินิกหรือจิตแพทย์เพื่อรับการประเมินช่วยเหลืออย่างใกล้ชิด',
            'สามารถส่งผลนี้เข้าแชทของ อ.ดร. ภาวิณี หรือโทรสายด่วนสุขภาพจิต มข. 043-009700 ได้ทันที'
          ]
        };
      }
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

      if (sum <= 4) {
        return {
          score: sum,
          maxScore: 21,
          level: 'ความวิตกกังวลระดับต่ำมาก (Minimal Anxiety)',
          severityGrade: 'normal',
          recommendations: [
            'ระดับความวิตกกังวลอยู่ในเกณฑ์ปกติของมนุษย์ เป็นความตื่นตัวที่มีประโยชน์ในการเตรียมตัวทำงาน',
            'ฝึกการกำหนดลมหายใจและการทำสมาธิสั้นๆ เพื่อเสริมสร้างสมาธิและความสงบในจิตใจ'
          ]
        };
      } else if (sum <= 9) {
        return {
          score: sum,
          maxScore: 21,
          level: 'ความวิตกกังวลระดับต่ำ (Mild Anxiety)',
          severityGrade: 'mild',
          recommendations: [
            'มีความวิตกกังวลเล็กน้อยที่อาจรบกวนสมาธิบ้างเป็นครั้งคราว',
            'ใช้เทคนิคการจดบันทึก "เวลาแห่งความกังวล (Worry Time 15 นาที)" กำหนดเวลาคิดกังวลเป็นสัดส่วน ไม่ให้ล้นตลอดวัน',
            'ฝึกเทคนิค Grounding 5-4-3-2-1 เพื่อดึงสติกลับมาอยู่กับปัจจุบันขณะ'
          ]
        };
      } else if (sum <= 14) {
        return {
          score: sum,
          maxScore: 21,
          level: 'ความวิตกกังวลระดับปานกลาง (Moderate Anxiety)',
          severityGrade: 'moderate',
          recommendations: [
            'ความวิตกกังวลเริ่มส่งผลกระทบต่อประสิทธิภาพการเรียน การเตรียมสอบ และความสัมพันธ์',
            'ควรพบนักจิตวิทยาเพื่อฝึกทักษะการปรับโครงสร้างความคิด (CBT Cognitive Restructuring)',
            'งดเครื่องดื่มที่มีคาเฟอีนสูง เพราะอาจกระตุ้นให้อาการใจสั่นและมือสั่นรุนแรงขึ้น'
          ]
        };
      } else {
        return {
          score: sum,
          maxScore: 21,
          level: 'ความวิตกกังวลระดับรุนแรง (Severe Anxiety)',
          severityGrade: 'severe',
          recommendations: [
            'เข้าเกณฑ์ความวิตกกังวลระดับรุนแรง อาจมีภาวะ Panic ร่วมด้วย หรือวิตกกังวลจนส่งผลต่อชีวิตประจำวันอย่างมาก',
            'แนะนำอย่างยิ่งให้รับคำปรึกษาจากนักจิตวิทยาคลินิกหรือพบจิตแพทย์เพื่อรับการดูแลอย่างถูกวิธี',
            'ท่านสามารถกดส่งผลการประเมินนี้เข้าห้องแชทของศูนย์สุขภาวะ มข. เพื่อขอนัดหมายด่วนได้ทันที'
          ]
        };
      }
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

      let level = 'ไม่มีภาวะซึมเศร้าหรือมีน้อยมาก';
      let grade: 'normal' | 'mild' | 'moderate' | 'severe' | 'extremely_severe' = 'normal';
      const recommendations: string[] = [];

      if (sum < 5) {
        level = 'ไม่มีภาวะซึมเศร้าหรือมีน้อยมาก (Minimal / Normal)';
        grade = 'normal';
        recommendations.push('สุขภาพจิตอยู่ในเกณฑ์สมบูรณ์ดี รักษาการใช้ชีวิตและการดูแลตนเองต่อไป');
      } else if (sum <= 9) {
        level = 'ภาวะซึมเศร้าระดับเล็กน้อย (Mild Depression)';
        grade = 'mild';
        recommendations.push('มีภาวะอารมณ์เศร้าเล็กน้อย ควรดูแลสุขอนามัยการนอนหลับ และทำกิจกรรมสร้างพลังใจ');
        recommendations.push('บันทึก Mood Diary เพื่อสังเกตสิ่งที่กระตุ้นให้อารมณ์ดิ่งลง');
      } else if (sum <= 14) {
        level = 'ภาวะซึมเศร้าระดับปานกลาง (Moderate Depression)';
        grade = 'moderate';
        recommendations.push('อาการเริ่มส่งผลต่อสมาธิการเรียน แนะนำให้ปรึกษานักจิตวิทยาประจำตัวเพื่อหาแนวทางฟื้นฟู');
        recommendations.push('หลีกเลี่ยงการแยกตัวอยู่คนเดียวนานๆ พยายามเชื่อมโยงกับกลุ่มเพื่อนหรือคนที่ไว้ใจ');
      } else if (sum <= 19) {
        level = 'ภาวะซึมเศร้าระดับรุนแรงปานกลาง (Moderately Severe Depression)';
        grade = 'severe';
        recommendations.push('ควรรับการดูแลและประเมินอย่างใกล้ชิดจากนักจิตวิทยาคลินิกหรือจิตแพทย์');
        recommendations.push('สามารถแจ้งอาจารย์ที่ปรึกษาหรือส่งผลเข้าแชทศูนย์สุขภาวะ มข. เพื่อรับความช่วยเหลือ');
      } else {
        level = 'ภาวะซึมเศร้าระดับรุนแรง (Severe Depression)';
        grade = 'extremely_severe';
        recommendations.push('จำเป็นต้องได้รับการดูแลรักษาทางการแพทย์และจิตวิทยาอย่างเร่งด่วน');
        recommendations.push('กรุณาติดต่อสายด่วนสุขภาพจิต มข. 043-009700 ต่อ 40222 หรือติดต่อเจ้าหน้าที่ทันที');
      }

      if (hasSuicidalIdeation) {
        recommendations.unshift('⚠️ มีการตอบคำถามเรื่องความคิดทำร้ายตนเอง: กรุณาอย่าเก็บความรู้สึกไว้คนเดียว ติดต่อสายด่วนฉุกเฉิน มข. หรือปุ่ม SOS ทันที เราพร้อมรับฟังและอยู่เคียงข้างคุณ');
      }

      return {
        score: sum,
        maxScore: 27,
        level,
        severityGrade: grade,
        recommendations
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
