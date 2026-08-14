import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Film, 
  Sparkles, 
  Zap, 
  Eye, 
  Sliders, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Maximize2, 
  Crosshair, 
  Activity,
  Layers,
  Flame,
  Volume2
} from 'lucide-react';

interface AnimatedCameraRigProps {
  topicId: string;
  topicTitle: string;
  category: string;
  kpi: string;
  tagline: string;
  colorScheme: string;
  isLightMode: boolean;
}

export const AnimatedCameraRig: React.FC<AnimatedCameraRigProps> = ({
  topicId,
  topicTitle,
  category,
  kpi,
  tagline,
  colorScheme,
  isLightMode,
}) => {
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const shotCounterRef = useRef<number>(1);
  const [cameraAngle, setCameraAngle] = useState<number>(0);
  const [focalLength, setFocalLength] = useState<number>(50); // 35mm, 50mm, 85mm
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [capturedShots, setCapturedShots] = useState<Array<{ id: string; label: string; time: string; kpi: string }>>([
    { id: 'shot-init-1', label: 'Shot #01 - Master Angle', time: '10:42:15', kpi: kpi },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger camera click animation when topic changes
  useEffect(() => {
    triggerCameraClick();
    // Subtle auto-reposition of camera operator
    setCameraAngle(Math.floor(Math.random() * 16) - 8);
  }, [topicId]);

  // Handle scroll trigger or manual click
  const triggerCameraClick = () => {
    setIsShooting(true);
    setFlashActive(true);

    shotCounterRef.current += 1;
    const currentNumber = shotCounterRef.current;
    const uniqueShotId = `shot-${currentNumber}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    setTimeout(() => {
      setFlashActive(false);
    }, 180);

    setTimeout(() => {
      setIsShooting(false);
      setCapturedShots((prev) => [
        {
          id: uniqueShotId,
          label: `Shot #${String(currentNumber).padStart(2, '0')} - ${topicTitle.split(' ')[0]} Frame`,
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          kpi: kpi,
        },
        ...prev.slice(0, 3),
      ]);
    }, 450);
  };

  // Render specific animated vector scene based on capability topic
  const renderTopicSubjectAnimation = () => {
    switch (topicId) {
      case 'photoshoots':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Studio Lighting Umbrellas & Fashion Runway Model Silhouette */}
            <motion.div 
              animate={{ opacity: isShooting ? [1, 0.4, 1] : 1, scale: isShooting ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Studio Key Light Umbrellas */}
              <div className="absolute -top-16 -left-20 flex flex-col items-center animate-pulse">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400/80 to-yellow-200 border-2 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-neutral-950" />
                </div>
                <div className="w-1 h-16 bg-neutral-600 mt-1" />
                <span className="text-[9px] font-mono text-amber-300 uppercase tracking-widest mt-1">Softbox 800W</span>
              </div>

              <div className="absolute -top-16 -right-20 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.4s' }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-tl from-amber-400/80 to-yellow-200 border-2 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-neutral-950" />
                </div>
                <div className="w-1 h-16 bg-neutral-600 mt-1" />
                <span className="text-[9px] font-mono text-amber-300 uppercase tracking-widest mt-1">Rim Light 600W</span>
              </div>

              {/* Subject Model Silhouette Vector */}
              <svg className="w-32 h-44 drop-shadow-[0_10px_25px_rgba(245,158,11,0.3)]" viewBox="0 0 100 140" fill="none">
                {/* Model Body */}
                <circle cx="50" cy="22" r="14" fill="#f59e0b" />
                <path d="M50 38 C32 38, 25 55, 25 78 L28 125 C28 132, 72 132, 72 125 L75 78 C75 55, 68 38, 50 38 Z" fill="#d97706" />
                <path d="M30 50 L12 85 C10 90, 16 95, 22 90 L34 62 Z" fill="#b45309" />
                <path d="M70 50 L88 85 C90 90, 84 95, 78 90 L66 62 Z" fill="#b45309" />
                {/* Haute Couture Jewelry Accent */}
                <circle cx="50" cy="48" r="3.5" fill="#fef08a" className="animate-ping" />
              </svg>

              <div className="mt-2 text-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-mono bg-neutral-950/80 px-2.5 py-1 rounded-md border border-amber-500/40">
                  Fashion & Commercial Product Subject [Locked Focus]
                </span>
              </div>
            </motion.div>
          </div>
        );

      case 'ad-shoots-reels':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 4K Cinema Camera Rig Tracking Vertical Reel */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Animated 9:16 Vertical Smartphone / Cinema Monitor Frame */}
              <motion.div 
                animate={{ scale: isShooting ? [1, 1.04, 1] : [1, 0.99, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-40 h-60 rounded-2xl bg-neutral-950 border-2 border-emerald-400 p-2 shadow-[0_0_35px_rgba(16,185,129,0.3)] relative overflow-hidden flex flex-col justify-between"
              >
                {/* Reel Top Bar */}
                <div className="flex items-center justify-between text-[9px] text-emerald-400 font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    REC 4K
                  </span>
                  <span>60 FPS RAW</span>
                </div>

                {/* Reel Dynamic Soundwaves */}
                <div className="flex items-center justify-center gap-1 py-4">
                  {[40, 75, 95, 60, 85, 100, 70, 45, 90, 65, 30].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isShooting ? [h, h * 0.4, h] : [h * 0.3, h, h * 0.5] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                      className="w-1.5 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-full"
                      style={{ height: `${h * 0.4}px` }}
                    />
                  ))}
                </div>

                {/* Viral Hook Badge */}
                <div className="p-1.5 rounded-lg bg-neutral-900/90 border border-emerald-500/40 text-center">
                  <p className="text-[10px] font-bold text-white">"Want 500% More Customers in Krishnagiri?"</p>
                  <span className="text-[8px] text-emerald-400 font-mono">180K+ Views • 8.4% CTR</span>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'meta-ads':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Meta Ad Geo-Targeting Audience Radar */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-52 h-52 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-950/20">
                {/* Spinning Radar Sweep */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent pointer-events-none"
                />
                
                {/* Radar Grid Circles */}
                <div className="w-36 h-36 rounded-full border border-cyan-500/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-cyan-500/40 flex items-center justify-center">
                    <Crosshair className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                </div>

                {/* Pinpoint Customer Nodes */}
                <div className="absolute top-8 left-12 p-1 rounded-md bg-neutral-900 border border-cyan-400 text-[9px] font-mono text-cyan-300 shadow-md">
                  📍 Krishnagiri (45K Buyers)
                </div>
                <div className="absolute bottom-10 right-8 p-1 rounded-md bg-neutral-900 border border-cyan-400 text-[9px] font-mono text-cyan-300 shadow-md">
                  📍 Hosur Hub (62K Buyers)
                </div>
              </div>

              <span className="text-[11px] font-mono font-bold text-cyan-400 mt-2 bg-neutral-950/90 px-3 py-1 rounded-md border border-cyan-500/30">
                Pixel Conversion CPL: ₹18.50 per Lead
              </span>
            </div>
          </div>
        );

      case 'local-seo-gmb':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Google 3-Pack Map #1 Rank Engine */}
            <div className="relative z-10 w-full max-w-xs space-y-2.5">
              <div className="p-3 rounded-2xl bg-neutral-950 border-2 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
                    #1 ON GOOGLE 3-PACK
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">Open Now</span>
                </div>

                <h4 className="text-xs font-black text-white">Your Business Name • Krishnagiri</h4>
                <div className="flex items-center gap-1 text-amber-400 text-xs my-1">
                  <span>5.0</span>
                  <div className="flex">{'★'.repeat(5)}</div>
                  <span className="text-[10px] text-neutral-400 font-mono">(480+ Reviews)</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-neutral-800 text-[10px]">
                  <div className="p-1.5 rounded-lg bg-neutral-900 text-purple-300 text-center font-bold">
                    📞 320 Direct Calls
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-900 text-emerald-300 text-center font-bold">
                    📍 1,850 Directions
                  </div>
                </div>
              </div>

              <p className="text-center text-[10px] font-mono text-purple-300">
                +383% Increase in Local Customer Discovery
              </p>
            </div>
          </div>
        );

      case 'whatsapp-funnels':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 1-Click WhatsApp Conversation Stream */}
            <div className="relative z-10 w-full max-w-xs space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-xl space-y-2">
                {/* Incoming Buyer Lead Bubble */}
                <div className="p-2.5 rounded-xl rounded-tl-none bg-emerald-900/80 border border-emerald-400/40 text-xs text-white max-w-[85%]">
                  <p className="font-semibold text-amber-300 text-[10px]">New Customer Lead (Krishnagiri)</p>
                  <p className="text-[11px]">"Hello! I saw your 4K Ad Reel. What are your packages?"</p>
                </div>

                {/* Automated Instant Response Bot */}
                <div className="ml-auto p-2.5 rounded-xl rounded-tr-none bg-neutral-900 border border-emerald-500/40 text-xs text-emerald-300 max-w-[85%]">
                  <p className="text-[9px] text-neutral-400 font-mono">DCOLLABERZ Auto-Bot • Instant</p>
                  <p className="text-[11px]">"Vanakkam! We have special pricing for this week. Sending your customized catalog now 👇"</p>
                </div>
              </div>

              <div className="text-center text-[10px] font-mono font-bold text-emerald-400">
                ⚡ 98% Open Rate • Average Response &lt; 2 Mins
              </div>
            </div>
          </div>
        );

      case 'web-landing':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* High Speed Web Landing Architecture */}
            <div className="relative z-10 w-full max-w-xs p-3.5 rounded-2xl bg-neutral-950 border border-amber-500/50 shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-800 text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% Core Web Vitals
                </span>
                <span>0.4s Load Time</span>
              </div>

              <div className="space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-amber-400/30" />
                <div className="h-3 w-1/2 rounded bg-neutral-800" />
                <div className="h-8 w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 flex items-center justify-center text-neutral-950 font-black text-[11px]">
                  1-Click Booking & WhatsApp CTA
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] text-amber-300 font-mono">
                <span>Conversion Rate: 12.4%</span>
                <span>Mobile First UX</span>
              </div>
            </div>
          </div>
        );

      case 'power-bi-analytics':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Live Power BI Multi-Channel Gauge */}
            <div className="relative z-10 w-full max-w-xs p-3.5 rounded-2xl bg-neutral-950 border border-purple-500/50 shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-400">
                <span className="font-bold">POWER BI LIVE TELEMETRY</span>
                <span className="text-emerald-400 font-bold">ROAS 4.8x</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block">Total Ad Pipeline</span>
                  <span className="text-sm font-black text-amber-400 font-mono">₹4,85,000</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block">Cost Per Customer</span>
                  <span className="text-sm font-black text-emerald-400 font-mono">₹142.00</span>
                </div>
              </div>

              <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ['40%', '85%', '70%', '95%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-purple-500 via-emerald-400 to-amber-400"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Influencer & Creator Testimonial Production Rig */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400 p-1 flex items-center justify-center relative">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                  TN
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-neutral-950">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="bg-neutral-950/90 px-3 py-1 rounded-lg border border-cyan-500/40 text-xs text-white">
                <p className="font-bold">Regional Tamil Nadu Influencer Collab</p>
                <p className="text-[10px] text-cyan-300 font-mono">Authentic Customer Trust &amp; Case Study Filming</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full rounded-3xl bg-neutral-950 border border-neutral-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMA VIEWFINDER TOP HUD (Metrics, Battery, FPS, ISO, Timecode)       */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* Recording Red Beacon */}
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950 border border-red-500/40 text-red-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            REC
          </span>

          <span className="text-neutral-400 hidden sm:inline">4K 60FPS • 10-BIT PRORES</span>
        </div>

        <div className="flex items-center gap-3 text-neutral-300">
          <span className="text-amber-400 font-bold">ISO 400</span>
          <span>f/1.8</span>
          <span>1/250s</span>
          <span className="text-emerald-400 font-bold">BAT 98%</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 3D CINEMA STAGE & ANIMATED CAMERA OPERATOR RIG                     */}
      {/* ========================================================================= */}
      <div 
        ref={containerRef}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-neutral-900/90 border border-neutral-800 overflow-hidden flex flex-col justify-between p-4"
        style={{
          perspective: 1000,
        }}
      >
        {/* Subtle Viewfinder Crosshair / Rule of Thirds Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 grid grid-cols-3 grid-rows-3">
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-white" />
          <div className="border-r border-white" />
          <div />
        </div>

        {/* Viewfinder Center Focus Bracket */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: isShooting ? [1, 0.85, 1] : [1, 1.05, 1],
              borderColor: isShooting ? '#10b981' : '#f59e0b',
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed rounded-2xl flex items-center justify-center opacity-70"
          >
            <div className="w-3 h-3 border border-amber-400 rounded-full" />
          </motion.div>
        </div>

        {/* Dynamic Topic Subject Animation (Rendered in center) */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {renderTopicSubjectAnimation()}
        </div>

        {/* ========================================================================= */}
        {/* 3. ANIMATED CAMERAMAN / CINEMA RIG VECTOR (Bottom-Left Angle)             */}
        {/* ========================================================================= */}
        <div className="absolute bottom-2 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: cameraAngle,
              y: isShooting ? [0, -6, 0] : [0, -2, 0],
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-2.5 bg-neutral-950/90 border border-neutral-700/80 px-3 py-2 rounded-2xl shadow-2xl backdrop-blur-md"
          >
            {/* Stylized Vector Cameraman with Cinema Rig & Follow Focus */}
            <div className="relative">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 60 60" fill="none">
                {/* Cameraman Helmet/Head with Eyepiece */}
                <circle cx="20" cy="18" r="8" fill="#e5e5e5" />
                <path d="M22 16 L32 20 L28 24 Z" fill="#f59e0b" />
                {/* Torso with Shoulder Harness */}
                <path d="M12 28 C12 24, 28 24, 28 28 L26 48 L14 48 Z" fill="#737373" />
                {/* Cinema Camera Box on Shoulder */}
                <rect x="28" y="16" width="22" height="15" rx="3" fill="#171717" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Cinema Lens Cylinder */}
                <rect x="50" y="19" width="8" height="9" rx="1" fill="#404040" stroke="#f59e0b" strokeWidth="1" />
                {/* Matte Box & Lens Flare */}
                <path d="M58 17 L62 14 L62 33 L58 30 Z" fill="#525252" />
                {/* Top Handle */}
                <path d="M32 16 L32 10 L44 10 L44 16" stroke="#a3a3a3" strokeWidth="2" fill="none" />
                {/* Red Tally Light on Rig */}
                <circle cx="34" cy="13" r="1.5" fill="#ef4444" className="animate-pulse" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold uppercase tracking-wider font-mono">
                <Camera className="w-3 h-3" />
                <span>DCOLLABERZ CAM OP</span>
              </div>
              <p className="text-[10px] text-neutral-300 font-mono">
                {isShooting ? '⚡ EXECUTING SHOT...' : 'Tracking & Auto-Focusing'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Optical Flash Overlay Burst (Active on Scroll & Click) */}
        <AnimatePresence>
          {flashActive && (
            <motion.div
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Interactive Shoot Button (Bottom Right) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
          <button
            onClick={triggerCameraClick}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-xs shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Camera className={`w-4 h-4 text-neutral-950 ${isShooting ? 'animate-spin' : ''}`} />
            <span>📸 Click Shutter ({topicTitle.split(' ')[0]})</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. RECENT CAPTURED SHOTS BUFFER (Live Camera Roll Stream)                  */}
      {/* ========================================================================= */}
      <div className="mt-3.5 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
            Buffer Roll:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {capturedShots.map((shot) => (
              <span
                key={shot.id}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-700 text-amber-300 shrink-0"
              >
                {shot.label} ({shot.time})
              </span>
            ))}
          </div>
        </div>

        <div className="text-[10px] font-mono text-emerald-400">
          Verified KPI: {kpi}
        </div>
      </div>

    </div>
  );
};
