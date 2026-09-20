import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Headphones, 
  Waves, 
  CloudRain, 
  Bell, 
  Droplets, 
  Music, 
  Moon, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { soundTherapy, SOUND_TRACKS, SoundTrackId, SoundTrack } from '../lib/soundTherapyEngine';

interface SoundTherapyPlayerProps {
  className?: string;
}

export const SoundTherapyPlayer: React.FC<SoundTherapyPlayerProps> = ({ className = '' }) => {
  const [activeTrackId, setActiveTrackId] = useState<SoundTrackId>('rain');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [showTheoryInfo, setShowTheoryInfo] = useState<boolean>(false);

  const activeTrack = SOUND_TRACKS.find((t) => t.id === activeTrackId) || SOUND_TRACKS[0];

  // Sync volume with sound engine
  useEffect(() => {
    soundTherapy.setVolume(isMuted ? 0 : volume / 100);
  }, [volume, isMuted]);

  // Handle countdown sleep timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && remainingSeconds !== null && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev === null || prev <= 1) {
            handleStop();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, remainingSeconds]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      soundTherapy.stop();
      setIsPlaying(false);
    } else {
      soundTherapy.play(activeTrackId);
      setIsPlaying(true);
      if (timerMinutes && remainingSeconds === null) {
        setRemainingSeconds(timerMinutes * 60);
      }
    }
  };

  const handleSelectTrack = (trackId: SoundTrackId) => {
    setActiveTrackId(trackId);
    soundTherapy.play(trackId);
    setIsPlaying(true);
    if (timerMinutes && remainingSeconds === null) {
      setRemainingSeconds(timerMinutes * 60);
    }
  };

  const handleStop = () => {
    soundTherapy.stop();
    setIsPlaying(false);
    setRemainingSeconds(null);
  };

  const handleSetTimer = (mins: number | null) => {
    setTimerMinutes(mins);
    if (mins) {
      setRemainingSeconds(mins * 60);
    } else {
      setRemainingSeconds(null);
    }
  };

  const renderIcon = (iconName: string, active: boolean) => {
    const iconClasses = `w-5 h-5 ${active ? 'text-[#c85a32]' : 'text-[#716962]'}`;
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className={iconClasses} />;
      case 'Waves':
        return <Waves className={iconClasses} />;
      case 'Bell':
        return <Bell className={iconClasses} />;
      case 'Droplets':
        return <Droplets className={iconClasses} />;
      case 'Music':
        return <Music className={iconClasses} />;
      case 'Moon':
        return <Moon className={iconClasses} />;
      default:
        return <Headphones className={iconClasses} />;
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`bg-[#fffefb] rounded-3xl border border-[#ebdccb] p-5 sm:p-6 shadow-2xs space-y-6 ${className}`}>
      {/* Header with Visualizer Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebdccb]/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#fef5ed] text-[#c85a32] border border-[#fbd5b5]">
              <Headphones className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#221e1a]">
              ดนตรีบำบัด & เสียงธรรมชาติผ่อนคลายจิตใจ (Sound Therapy)
            </h2>
          </div>
          <p className="text-xs text-[#716962] mt-1">
            คลื่นเสียงบำบัดทางประสาทวิทยา (Neuroacoustic) และเสียงธรรมชาติช่วยกระตุ้นคลื่นสมองอัลฟ่า (Alpha Waves) เพื่อผ่อนคลายความเครียดสะสม
          </p>
        </div>

        {/* Live Audio Waves Indicator */}
        <div className="flex items-center gap-2 bg-[#fdfbf7] px-3.5 py-1.5 rounded-2xl border border-[#ebdccb] self-start sm:self-auto flex-shrink-0">
          <div className="flex items-end gap-1 h-4">
            <span className={`w-1 bg-[#c85a32] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`}></span>
            <span className={`w-1 bg-[#e08d58] rounded-full transition-all duration-200 ${isPlaying ? 'h-3 animate-bounce' : 'h-2'}`}></span>
            <span className={`w-1 bg-[#65856c] rounded-full transition-all duration-400 ${isPlaying ? 'h-4 animate-pulse' : 'h-1'}`}></span>
            <span className={`w-1 bg-[#c85a32] rounded-full transition-all duration-150 ${isPlaying ? 'h-2.5 animate-bounce' : 'h-1.5'}`}></span>
          </div>
          <span className="text-xs font-bold text-[#3d3935]">
            {isPlaying ? 'กำลังบรรเลงคลื่นเสียง 🌿' : 'พักการเล่น'}
          </span>
        </div>
      </div>

      {/* Active Track Highlight & Master Control Center */}
      <div className="bg-gradient-to-br from-[#fef5ed] to-[#fffefb] rounded-2xl border border-[#fbd5b5] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#c85a32] text-white">
              {activeTrack.frequencyTag}
            </span>
            <span className="text-[11px] font-semibold text-[#65856c] bg-[#eef4ef] px-2.5 py-0.5 rounded-full border border-[#cbe1d0]">
              {activeTrack.category}
            </span>
            {remainingSeconds !== null && (
              <span className="text-[11px] font-bold text-[#b83a2c] bg-[#fef0ed] px-2.5 py-0.5 rounded-full border border-[#fbd5b5] animate-pulse">
                ปิดอัตโนมัติใน: {formatTimer(remainingSeconds)}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#221e1a]">
            {activeTrack.title}
          </h3>
          <p className="text-xs text-[#57423b] leading-relaxed">
            {activeTrack.description}
          </p>
        </div>

        {/* Master Action Buttons */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end flex-shrink-0">
          {/* Volume Slider & Mute */}
          <div className="flex items-center gap-1.5 bg-[#fffefb] px-3 py-2 rounded-xl border border-[#ebdccb]">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#716962] hover:text-[#c85a32] transition-colors p-1"
              title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#65856c]" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 sm:w-20 accent-[#c85a32] h-1.5 cursor-pointer bg-[#ebdccb] rounded-lg"
              title={`ความดังเสียง: ${volume}%`}
            />
            <span className="text-[10px] text-[#716962] font-semibold w-6 text-right">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          {/* Big Play/Pause Button */}
          <button
            onClick={handlePlayToggle}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer select-none ${
              isPlaying
                ? 'bg-[#57423b] hover:bg-[#3d3935] text-white'
                : 'bg-[#c85a32] hover:bg-[#b34d28] text-white ring-4 ring-[#fbd5b5]/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>หยุดชั่วคราว</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>เล่นคลื่นเสียง</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sleep Timer Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs pt-1">
        <div className="flex items-center gap-1.5 text-[#716962] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#c85a32]" />
          <span>ตั้งเวลาปิดอัตโนมัติ (Sleep Timer):</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { label: 'ต่อเนื่อง', val: null },
            { label: '5 นาที', val: 5 },
            { label: '10 นาที', val: 10 },
            { label: '15 นาที', val: 15 },
            { label: '30 นาที', val: 30 }
          ].map((t, idx) => (
            <button
              key={idx}
              onClick={() => handleSetTimer(t.val)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                timerMinutes === t.val
                  ? 'bg-[#c85a32] text-white shadow-2xs'
                  : 'bg-[#f6f1e8] hover:bg-[#ebdccb] text-[#574e47]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Track Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SOUND_TRACKS.map((track) => {
          const isSelected = activeTrackId === track.id;
          const isThisPlaying = isSelected && isPlaying;

          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                isSelected
                  ? 'bg-[#fffefb] border-[#c85a32] shadow-xs ring-2 ring-[#c85a32]/20'
                  : 'bg-[#fdfbf7] hover:bg-[#fffefb] border-[#ebdccb] hover:border-[#dfcfbc]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-xl border ${isSelected ? 'bg-[#fef5ed] border-[#fbd5b5]' : 'bg-[#fffefb] border-[#ebdccb]'}`}>
                      {renderIcon(track.iconName, isSelected)}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f6f1e8] text-[#574e47] border border-[#ebdccb]">
                      {track.frequencyTag}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        handlePlayToggle();
                      } else {
                        handleSelectTrack(track.id);
                      }
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isThisPlaying
                        ? 'bg-[#57423b] text-white'
                        : isSelected
                        ? 'bg-[#c85a32] text-white'
                        : 'bg-[#f6f1e8] text-[#716962] group-hover:bg-[#c85a32] group-hover:text-white'
                    }`}
                    title={isThisPlaying ? 'หยุด' : 'เล่นแทร็กนี้'}
                  >
                    {isThisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                  </button>
                </div>

                <div>
                  <h4 className={`text-xs sm:text-sm font-bold transition-colors ${isSelected ? 'text-[#c85a32]' : 'text-[#221e1a]'}`}>
                    {track.title}
                  </h4>
                  <p className="text-[11px] text-[#716962] line-clamp-2 mt-1 leading-relaxed">
                    {track.description}
                  </p>
                </div>
              </div>

              {/* Benefit Tags */}
              <div className="pt-2 border-t border-[#ebdccb]/60 flex flex-wrap gap-1">
                {track.benefits.map((b, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-medium bg-[#fffefb] text-[#574e47] px-2 py-0.5 rounded-md border border-[#ebdccb]/70"
                  >
                    • {b}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific Rationale / Psychoacoustics Accordion */}
      <div className="border border-[#ebdccb] rounded-2xl bg-[#fdfbf7] p-3.5 text-xs text-[#574e47] space-y-2">
        <button
          onClick={() => setShowTheoryInfo(!showTheoryInfo)}
          className="w-full flex items-center justify-between font-bold text-[#3d3935] hover:text-[#c85a32] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#c85a32]" />
            <span>หลักการทางจิตวิทยาและประสาทวิทยาของดนตรีบำบัด (Neuroacoustic Science)</span>
          </div>
          <span className="text-[11px] text-[#c85a32] underline">
            {showTheoryInfo ? 'ย่อข้อมูล' : 'อ่านเพิ่มเติม'}
          </span>
        </button>

        {showTheoryInfo && (
          <div className="pt-2 space-y-2 border-t border-[#ebdccb]/60 text-[11px] leading-relaxed text-[#5c544e]">
            <p>
              • <strong>Brainwave Entrainment (การเหนี่ยวนำคลื่นสมอง):</strong> คลื่นเสียงความถี่เฉพาะ เช่น คลื่นอัลฟ่า (8-12 Hz) และทีต้า (4-7 Hz) ช่วยเหนี่ยวนำให้สมองเปลี่ยนจากสภาวะตื่นตระหนก (High Beta) เข้าสู่สภาวะผ่อนคลายลึก มีสมาธิ และสงบ
            </p>
            <p>
              • <strong>Pink Noise Spectrum:</strong> คลื่นเสียงสีชมพู (เช่น เสียงฝนตกริมบึงสีฐาน) มีพลังงานความถี่ลดลง 3 dB ต่อออคเทฟ ซึ่งสอดคล้องกับจังหวะการทำงานตามธรรมชาติของระบบประสาทมนุษย์ ช่วยกลบเสียงแทรกภายนอกและลดอัตราการตื่นกลางดึก
            </p>
            <p>
              • <strong>Polyvagal & Parasympathetic Regulation:</strong> ดนตรีจังหวะช้า 60 BPM และความถี่ 432Hz ช่วยกระตุ้นเส้นประสาทเวกัส (Vagus Nerve) ส่งผลให้ชีพจรและการหายใจช้าลง ร่างกายลดการหลั่งฮอร์โมนคอร์ติซอลได้อย่างมีนัยสำคัญ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
