import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  Target, 
  Phone,
  Camera,
  Globe,
  Mail
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { Logo } from './Logo';
import { useTheme } from '../lib/ThemeContext';

interface HeroSectionProps {
  onOpenStrategyModal: () => void;
  onOpenAiAudit?: () => void;
  onSelectPricing?: () => void;
  onOpenDirectCallModal: () => void;
  onOpenEmailModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenStrategyModal,
  onOpenDirectCallModal,
  onOpenEmailModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi DCOLLABERZ team! I want to turn attention into measurable growth for my business in Krishnagiri & Tamil Nadu. Let's schedule a growth consultation.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-[85vh] flex flex-col justify-center overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 border-b border-slate-200' 
          : 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 border-b border-neutral-800'
      } py-14 lg:py-20`}
      id="hero-section"
    >
      {/* 3D Dynamic Studio Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Luminous Glow Spots */}
        <div 
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-emerald-500/10 blur-[130px] transition-transform duration-700 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`,
          }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 blur-[140px] transition-transform duration-700 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        />

        {/* 3D Perspective Studio Grid Canvas overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]"
        />

        {/* Subtle Horizontal Lens Flares */}
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Hero Brand Header with Big Logo Banner */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10 lg:mb-14">
          
          {/* Main Logo & Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Iconic 3D Glowing Brand Logo */}
            <div className="p-3 sm:p-4 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-neutral-700/50 shadow-2xl shadow-amber-500/10 mb-3">
              <Logo size="lg" />
            </div>

            {/* Tagline & Official Title */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-amber-950/80 border border-amber-500/40 text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-amber-300 shadow-lg shadow-amber-500/10">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>DIGITAL GROWTH PARTNER</span>
              <span className="hidden sm:inline text-neutral-500">|</span>
              <span className="hidden sm:inline text-emerald-400">CONNECT • CREATE • GROW</span>
            </div>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl"
          >
            Turn Attention Into <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(245,158,11,0.3)]">
              Measurable Business Growth.
            </span>
          </motion.h1>

          {/* Subheading Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-normal ${
              theme === 'light' ? 'text-slate-600' : 'text-neutral-300'
            }`}
          >
            From high-end <strong>commercial photoshoots</strong> and <strong>4K viral reels</strong> to <strong>Google 3-Pack Local SEO</strong> and <strong>precision Meta ads</strong>. We engineer high-intent WhatsApp lead funnels for ambitious businesses across Krishnagiri, Hosur, Dharmapuri & Tamil Nadu.
          </motion.p>

          {/* Key Quick Actions (Book Strategy, WhatsApp, Direct Call, Direct Email) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full max-w-3xl"
          >
            {/* 1. Strategy Session */}
            <button
              onClick={onOpenStrategyModal}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transform hover:-translate-y-0.5 transition-all duration-200"
              id="btn-hero-book-strategy"
            >
              <span>BOOK STRATEGY SESSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 2. Direct Call Integration */}
            <button
              onClick={onOpenDirectCallModal}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-amber-300 border border-amber-500/40 font-bold text-sm shadow-lg hover:border-amber-400 transition-all duration-200"
              id="btn-hero-direct-call"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {BRAND_INFO.contactPhone}</span>
            </button>

            {/* 3. Direct WhatsApp Chat */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 font-bold text-sm shadow-lg hover:border-emerald-400 transition-all duration-200"
              id="btn-hero-whatsapp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </button>

            {/* 4. Official Email Integration */}
            <button
              onClick={onOpenEmailModal}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-cyan-300 border border-cyan-500/40 font-medium text-sm shadow-lg hover:border-cyan-400 transition-all duration-200"
              id="btn-hero-email"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{BRAND_INFO.officialEmail}</span>
            </button>
          </motion.div>
        </div>

        {/* Quick Highlights / Trust Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-10 pt-8 border-t border-neutral-800/80"
        >
          <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800 text-left hover:border-amber-500/40 transition-all group">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Web & Funnels</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">Website, SEO & Lead Generation</div>
            <div className="text-xs text-neutral-400 mt-0.5">High-speed web platforms, local Google rank & automated leads</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800 text-left hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Meta Ads & SEO</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">+500% Lead Velocity</div>
            <div className="text-xs text-neutral-400 mt-0.5">Hyper-targeted regional Tamil buyers</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800 text-left hover:border-cyan-500/40 transition-all group">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Google 3-Pack</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">#1 Local Search Rank</div>
            <div className="text-xs text-neutral-400 mt-0.5">Dominate local customer discovery</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800 text-left hover:border-purple-500/40 transition-all group">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Attribution</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">Live Power BI ROAS</div>
            <div className="text-xs text-neutral-400 mt-0.5">100% transparent conversion tracking</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
