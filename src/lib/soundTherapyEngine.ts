// Web Audio API Sound Therapy Engine for KKU Mental Health Care
// Synthesizes relaxing ambient soundscapes and binaural beats natively

export type SoundTrackId = 'rain' | 'alpha432' | 'singingbowl' | 'stream' | 'piano' | 'theta528';

export interface SoundTrack {
  id: SoundTrackId;
  title: string;
  category: string;
  frequencyTag: string;
  durationLabel: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'rain',
    title: 'สายฝนผ่อนคลายริมบึงสีฐาน มข.',
    category: 'เสียงธรรมชาติบำบัด (Nature Sound)',
    frequencyTag: 'Pink Noise Spectrum',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'เสียงหยาดฝนโปรยปรายกระทบผิวน้ำและแมกไม้ ช่วยลดสัญญาณรบกวนในสมองและกระตุ้นคลื่นอัลฟ่า',
    iconName: 'CloudRain',
    benefits: ['เพิ่มสมาธิในการอ่านหนังสือ', 'กลบเสียงรบกวนภายนอก', 'ลดความฟุ้งซ่าน']
  },
  {
    id: 'alpha432',
    title: 'คลื่นเสียงบำบัด Alpha Waves 432 Hz',
    category: 'คลื่นเสียงเหนี่ยวนำสมอง (Binaural Beats)',
    frequencyTag: '432 Hz / 8 Hz Alpha',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'ความถี่ 432Hz สั่นพ้องตามธรรมชาติ ผสานคลื่น Binaural Alpha 8Hz ช่วยคลายความวิตกกังวลและปรับอารมณ์ให้สงบ',
    iconName: 'Waves',
    benefits: ['ลดระดับคอร์ติซอล (ฮอร์โมนความเครียด)', 'คลายกล้ามเนื้อตึงเกร็ง', 'สร้างความสงบสมดุล']
  },
  {
    id: 'singingbowl',
    title: 'ระฆังทิเบตและสายลมสงบใจ (Singing Bowl)',
    category: 'เสียงกังวานสมาธิ (Sound Meditation)',
    frequencyTag: 'Harmonic Resonances',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'เสียงกังวานใสของขันธิเบตสะท้อนกังวานช้าๆ ช่วยดึงสติกลับมาอยู่กับลมหายใจและปัจจุบันขณะ',
    iconName: 'Bell',
    benefits: ['เหมาะสำหรับฝึกสติและการกำหนดลมหายใจ', 'ลดความคิดวนซ้ำ', 'คลายความตื่นเต้น']
  },
  {
    id: 'stream',
    title: 'ธารน้ำไหลและแมกไม้มอดินแดง',
    category: 'เสียงธรรมชาติบำบัด (Nature Sound)',
    frequencyTag: 'Fluid Ambient Sweep',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'กระแสน้ำไหลเอื่อยๆ เย็นสบาย ช่วยให้ระบบประสาทผ่อนคลาย รู้สึกปลอดภัยและสดชื่น',
    iconName: 'Droplets',
    benefits: ['ฟื้นฟูพลังใจยามเหนื่อยล้า', 'ปรับสมดุลอารมณ์', 'ช่วยให้จิตใจร่มเย็น']
  },
  {
    id: 'piano',
    title: 'เปียโนคลอเบาๆ ปลอบประโลมใจ',
    category: 'ดนตรีบำบัดจิตวิทยา (Music Therapy)',
    frequencyTag: 'Gentle Pentatonic Harmonies',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'คอร์ดเปียโนอบอุ่น บรรเลงอย่างนุ่มนวลช้าๆ จังหวะ 60 BPM เทียบเท่าอัตราการเต้นของหัวใจยามพักผ่อน',
    iconName: 'Music',
    benefits: ['ลดอัตราการเต้นของหัวใจ', 'บรรเทาความเหงาและกังวล', 'สร้างความรู้สึกอบอุ่นปลอดภัย']
  },
  {
    id: 'theta528',
    title: 'คลื่นเสียงหลับลึก Theta Waves 528 Hz',
    category: 'คลื่นเสียงเพื่อการนอนหลับ (Sleep Entrainment)',
    frequencyTag: '528 Hz / 4 Hz Theta',
    durationLabel: 'เล่นวนต่อเนื่อง',
    description: 'คลื่นเสียงความถี่ 528Hz (Love Frequency) ร่วมกับจังหวะทีต้า 4Hz นำพาสมองเข้าสู่สภาวะหลับลึกและฟื้นฟูเซลล์สมอง',
    iconName: 'Moon',
    benefits: ['ช่วยให้นอนหลับง่ายขึ้น', 'ป้องกันอาการตื่นกลางดึก', 'ฟื้นฟูสมองจากความอ่อนล้า']
  }
];

class SoundTherapySynthesizer {
  private ctx: AudioContext | null = null;
  private currentTrack: SoundTrackId | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.7;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private intervalIds: any[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): SoundTrackId | null {
    return this.currentTrack;
  }

  public stop() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {
        // ignore cleanup error
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public play(trackId: SoundTrackId) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Stop current track
    this.stop();

    this.currentTrack = trackId;
    this.isPlaying = true;

    switch (trackId) {
      case 'rain':
        this.playRain();
        break;
      case 'alpha432':
        this.playAlpha432();
        break;
      case 'singingbowl':
        this.playSingingBowl();
        break;
      case 'stream':
        this.playStream();
        break;
      case 'piano':
        this.playPiano();
        break;
      case 'theta528':
        this.playTheta528();
        break;
    }
  }

  // 1. Rain Synthesizer: Filtered Pink Noise + gentle drops
  private playRain() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Pink noise buffer
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Lowpass filter for smooth rain texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Highpass to eliminate low mud
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(150, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.65, ctx.currentTime);

    noiseSource.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    noiseSource.start();
    this.activeNodes.push(noiseSource, hpFilter, filter, rainGain);

    // Random soothing raindrops
    const dropInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      const freq = 1200 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);

      dropGain.gain.setValueAtTime(0.04 * Math.random(), now);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(dropGain);
      dropGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.14);
    }, 400);

    this.intervalIds.push(dropInterval);
  }

  // 2. Alpha Waves 432 Hz + Binaural 8 Hz Beat
  private playAlpha432() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Left channel: 432 Hz
    const oscLeft = ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(432, ctx.currentTime);

    // Right channel: 440 Hz (Difference = 8 Hz Alpha Brainwave)
    const oscRight = ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(440, ctx.currentTime);

    // Sub harmonic 216 Hz for grounding warmth
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(216, ctx.currentTime);

    const merger = ctx.createChannelMerger(2);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.12, ctx.currentTime);

    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.28, ctx.currentTime);

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(padGain);
    padGain.connect(this.masterGain);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();
    subOsc.start();

    this.activeNodes.push(oscLeft, oscRight, subOsc, merger, padGain, subGain);
  }

  // 3. Singing Bowl: Bell-like resonance with long soothing decays
  private playSingingBowl() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Gentle ambient warm drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(256, ctx.currentTime); // C4 grounding
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
    drone.connect(droneGain);
    droneGain.connect(this.masterGain);
    drone.start();
    this.activeNodes.push(drone, droneGain);

    const triggerBowl = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      // Frequencies of traditional Tibetan singing bowl
      const harmonics = [432, 864, 1296, 2160];
      const gains = [0.25, 0.1, 0.05, 0.02];

      harmonics.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(gains[idx], now + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(g);
        g.connect(this.masterGain!);
        osc.start(now);
        osc.stop(now + 4.6);
      });
    };

    triggerBowl();
    const interval = setInterval(triggerBowl, 5000);
    this.intervalIds.push(interval);
  }

  // 4. Stream & Forest Water Ripples
  private playStream() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Water noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Bandpass sweeping filter simulating flowing ripples
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.35, ctx.currentTime); // gentle wave speed
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);
    lfo.connect(filter.frequency);

    const streamGain = ctx.createGain();
    streamGain.gain.setValueAtTime(0.4, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(streamGain);
    streamGain.connect(this.masterGain);

    noiseSource.start();
    lfo.start();

    this.activeNodes.push(noiseSource, filter, lfo, lfoGain, streamGain);
  }

  // 5. Soothing Piano & Rhodes chords arpeggios
  private playPiano() {
    if (!this.ctx || !this.masterGain) return;

    // Peaceful pentatonic chords progression: C -> Em -> F -> G
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 261.63, 349.23, 440.00], // F major
      [196.00, 246.94, 293.66, 392.00]  // G major
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const notes = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      notes.forEach((freq, i) => {
        const now = this.ctx!.currentTime + i * 0.45;
        const osc = this.ctx!.createOscillator();
        const osc2 = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle warm second harmonic
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.08, now + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(g);
        osc2.connect(g);
        g.connect(this.masterGain!);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 3.3);
        osc2.stop(now + 3.3);
      });
    };

    playChord();
    const interval = setInterval(playChord, 3800);
    this.intervalIds.push(interval);
  }

  // 6. Theta Deep Sleep 528 Hz (Solfeggio frequency + 4Hz Theta beat)
  private playTheta528() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Left channel: 528 Hz
    const oscLeft = ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(528, ctx.currentTime);

    // Right channel: 524 Hz (Difference = 4 Hz Theta Deep Sleep Wave)
    const oscRight = ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(524, ctx.currentTime);

    // Deep warm base tone 132 Hz
    const baseOsc = ctx.createOscillator();
    baseOsc.type = 'sine';
    baseOsc.frequency.setValueAtTime(132, ctx.currentTime);

    const merger = ctx.createChannelMerger(2);
    const thetaGain = ctx.createGain();
    thetaGain.gain.setValueAtTime(0.22, ctx.currentTime);

    const baseGain = ctx.createGain();
    baseGain.gain.setValueAtTime(0.15, ctx.currentTime);

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(thetaGain);
    thetaGain.connect(this.masterGain);

    baseOsc.connect(baseGain);
    baseGain.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();
    baseOsc.start();

    this.activeNodes.push(oscLeft, oscRight, baseOsc, merger, thetaGain, baseGain);
  }
}

export const soundTherapy = new SoundTherapySynthesizer();
