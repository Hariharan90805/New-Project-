import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Sparkles, 
  Rotate3d, 
  Layers, 
  Compass, 
  Video, 
  TrendingUp, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { useTheme } from '../lib/ThemeContext';

interface Logo3DExperienceProps {
  onOpenStrategyModal?: () => void;
}

export const Logo3DExperience: React.FC<Logo3DExperienceProps> = ({ onOpenStrategyModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [manualRotate, setManualRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { theme } = useTheme();

  // Scroll Parallax Controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // 3D Scroll Rotations & Perspective Transforms
  const logoRotateX = useTransform(smoothProgress, [0, 0.5, 1], [28, 0, -28]);
  const logoRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-35, 0, 35]);
  const logoRotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-8, 0, 8]);
  const logoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const logoTranslateZ = useTransform(smoothProgress, [0, 0.5, 1], [-100, 40, -80]);
  const lightShineX = useTransform(smoothProgress, [0, 1], [-150, 250]);

  // Floating 3D Satellites Parallax
  const satellite1Y = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const satellite2Y = useTransform(smoothProgress, [0, 1], [80, -80]);
  const satellite3X = useTransform(smoothProgress, [0, 1], [-70, 70]);
  const satellite4X = useTransform(smoothProgress, [0, 1], [60, -60]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // -15 to +15 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30; // -15 to +15 deg
    setManualRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setManualRotate({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative py-20 sm:py-28 overflow-hidden transition-colors duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-slate-100 via-amber-50/30 to-slate-100 text-slate-900 border-y border-slate-200'
          : 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 border-y border-neutral-800'
      }`}
      id="3d-logo-experience"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Ambient Glow Behind 3D Stage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-amber-700/30 blur-[130px]"
        />
        {/* Fine Digital Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4"
        >
          <Rotate3d className="w-3.5 h-3.5 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D Brand Experience</span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
        >
          Engineered for Visual <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Excellence</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 mt-3 font-medium"
        >
          Scroll or hover to interact with the DCOLLABERZ cinema emblem in 3D space.
          Forging high-performance digital presence across Krishnagiri & Hosur.
        </motion.p>

        {/* 3D Interactive Stage Canvas */}
        <div className="relative mt-12 sm:mt-16 flex items-center justify-center min-h-[420px] sm:min-h-[500px]">

          {/* 3D Floating Satellites (Pillars orbiting in 3D space) */}
          <motion.div
            style={{
              y: satellite1Y,
              transformStyle: 'preserve-3d',
            }}
            className="absolute -top-4 left-4 sm:left-12 z-20 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-amber-500/40 text-left shadow-xl shadow-amber-500/10 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Pillar I</div>
              <div className="text-xs font-black text-white">Connect Audience</div>
            </div>
          </motion.div>

          <motion.div
            style={{
              y: satellite2Y,
              transformStyle: 'preserve-3d',
            }}
            className="absolute -bottom-4 right-4 sm:right-12 z-20 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-emerald-500/40 text-left shadow-xl shadow-emerald-500/10 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Pillar III</div>
              <div className="text-xs font-black text-white">Grow Scalable ROI</div>
            </div>
          </motion.div>

          <motion.div
            style={{
              x: satellite3X,
              transformStyle: 'preserve-3d',
            }}
            className="absolute top-1/2 -left-2 sm:left-8 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-neutral-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md"
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-300">4K CINEMA RIG</span>
          </motion.div>

          <motion.div
            style={{
              x: satellite4X,
              transformStyle: 'preserve-3d',
            }}
            className="absolute top-1/2 -right-2 sm:right-8 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-neutral-900/90 border border-purple-500/40 shadow-xl backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-purple-300">100% ATTRIBUTED</span>
          </motion.div>

          {/* MAIN 3D LOGO EMBLEM CARD */}
          <motion.div
            style={{
              rotateX: isHovered ? manualRotate.x : logoRotateX,
              rotateY: isHovered ? manualRotate.y : logoRotateY,
              rotateZ: isHovered ? 0 : logoRotateZ,
              scale: logoScale,
              z: logoTranslateZ,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-lg mx-auto rounded-[36px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8 sm:p-12 border border-amber-500/40 shadow-[0_25px_60px_-15px_rgba(245,158,11,0.25)] backdrop-blur-2xl group cursor-grab active:cursor-grabbing"
          >
            {/* Texture Overlay (Embossed Leather Texture Feel) */}
            <div 
              className="absolute inset-0 rounded-[36px] opacity-25 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
                backgroundSize: '12px 12px',
              }}
            />

            {/* Specular Light Beam Glint Following Scroll */}
            <motion.div
              style={{
                x: lightShineX,
                transform: 'rotate(25deg)',
              }}
              className="absolute -inset-y-20 w-32 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent pointer-events-none blur-md"
            />

            {/* Top Badge HUD */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400 pb-6 border-b border-neutral-800">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                OFFICIAL EMBLEM
              </span>
              <span className="text-neutral-400">EST. KRISHNAGIRI</span>
            </div>

            {/* 3D Vector Emblem Render matching official brand image */}
            <div className="relative z-10 my-8 flex items-center justify-center">
              <div 
                className="relative w-48 h-48 sm:w-60 sm:h-60 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                style={{ transform: 'translateZ(60px)' }}
              >
                {/* 3D Deep Gold Emblem Vector */}
                <svg
                  viewBox="0 0 240 240"
                  className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(217,119,6,0.4)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Multi-Stop Hyper-Realistic Metallic Gold Gradients */}
                    <linearGradient id="gold3DBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF7D1" />
                      <stop offset="20%" stopColor="#F5D77F" />
                      <stop offset="45%" stopColor="#D4AF37" />
                      <stop offset="70%" stopColor="#AA7C11" />
                      <stop offset="90%" stopColor="#E5C158" />
                      <stop offset="100%" stopColor="#684704" />
                    </linearGradient>

                    <linearGradient id="goldFront" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFF1B5" />
                      <stop offset="35%" stopColor="#E5C158" />
                      <stop offset="75%" stopColor="#B38715" />
                      <stop offset="100%" stopColor="#8A6006" />
                    </linearGradient>

                    <linearGradient id="goldSpecular" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#DFB743" />
                      <stop offset="100%" stopColor="#5E3F00" />
                    </linearGradient>

                    <filter id="embossBevel" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
                      <feDropShadow dx="-1" dy="-1" stdDeviation="1.5" floodColor="#FFF1B5" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* Outer 'D' Arc Shape with Embossed Bevel Depth */}
                  <g filter="url(#embossBevel)">
                    {/* Outer 'D' Main Body */}
                    <path
                      d="M75 60 H115 C150 60 175 82 175 120 C175 158 150 180 115 180 H75 V60 Z"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/* Outer 'D' Top & Bottom Serif Wings */}
                    <path
                      d="M75 50 V70 M75 170 V190"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="18"
                      strokeLinecap="square"
                    />

                    {/* Concentric Inner Ring 1 (Outer Circle of the C) */}
                    <circle
                      cx="105"
                      cy="120"
                      r="36"
                      stroke="url(#goldFront)"
                      strokeWidth="9"
                      strokeDasharray="180 60"
                      strokeDashoffset="30"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Concentric Inner Ring 2 (Inner Ring of the C) */}
                    <circle
                      cx="105"
                      cy="120"
                      r="22"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="7"
                      fill="none"
                    />

                    {/* Center Play Button Triangle (Video / Media / Growth Catalyst) */}
                    <polygon
                      points="100,108 116,120 100,132"
                      fill="url(#goldSpecular)"
                      stroke="url(#goldFront)"
                      strokeWidth="2"
                    />

                    {/* Stylized Hand Grip Fist holding Cinema Camera Rig (From official logo) */}
                    {/* Vertical Monopod Rod */}
                    <rect
                      x="160"
                      y="85"
                      width="5"
                      height="40"
                      rx="2"
                      fill="url(#gold3DBevel)"
                    />

                    {/* Fist Silhouette around handle */}
                    <path
                      d="M152 108 C150 108 148 111 148 114 C148 126 150 134 163 134 C173 134 175 125 175 114 C175 110 172 108 168 108"
                      stroke="url(#goldFront)"
                      strokeWidth="4"
                      fill="#121212"
                    />
                    {/* Knuckle Lines */}
                    <path
                      d="M153 115 H169 M153 121 H169 M154 127 H168"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Top Cinema Camera Rig & Monitor Box */}
                    <rect
                      x="135"
                      y="42"
                      width="58"
                      height="26"
                      rx="7"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="7"
                      fill="#151515"
                    />

                    {/* Top Camera Rig Handle */}
                    <path
                      d="M150 42 C150 34 178 34 178 42"
                      stroke="url(#gold3DBevel)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Camera Lens Aperture Circle in Monitor */}
                    <circle
                      cx="164"
                      cy="55"
                      r="7"
                      stroke="url(#goldSpecular)"
                      strokeWidth="3.5"
                      fill="#1e1e1e"
                    />
                    <circle
                      cx="164"
                      cy="55"
                      r="2.5"
                      fill="url(#goldFront)"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Official Typography from Brand Asset: "D C Θ L L A B E R Z" */}
            <div 
              className="relative z-10 text-center space-y-2"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
                <span className="text-2xl sm:text-4xl font-black tracking-[0.25em] sm:tracking-[0.35em] uppercase font-sans bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                  DC<span className="inline-block relative">Θ</span>LLABERZ
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-neutral-300 uppercase font-sans drop-shadow">
                Connect <span className="text-amber-400 font-bold mx-1">|</span> Create <span className="text-amber-400 font-bold mx-1">|</span> Grow
              </div>
            </div>

            {/* Bottom Interactive Shimmer Badge */}
            <div 
              className="relative z-10 mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="text-[11px] font-mono text-neutral-400">
                <span>Cinema Rig • Meta Ads • Web & Local SEO</span>
              </div>
              <button
                onClick={onOpenStrategyModal}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-black flex items-center gap-1 transition-transform hover:scale-105 shadow"
              >
                <span>Scale Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Brand Triad Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12 text-left">
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="text-amber-400 font-black text-sm tracking-wider uppercase font-mono mb-1">01. CONNECT</div>
            <p className="text-xs text-neutral-300">
              Laser-targeted local Tamil & regional audiences across Krishnagiri & Hosur through precision Meta & Google funnel architectures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="text-amber-400 font-black text-sm tracking-wider uppercase font-mono mb-1">02. CREATE</div>
            <p className="text-xs text-neutral-300">
              High-end cinematic 4K studio shoots, scroll-stopping vertical reels, and brand-first high-speed responsive web experiences.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="text-amber-400 font-black text-sm tracking-wider uppercase font-mono mb-1">03. GROW</div>
            <p className="text-xs text-neutral-300">
              Transparent multi-touch Power BI ROI dashboards tracking qualified phone calls, walk-ins, and closed customer transactions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
