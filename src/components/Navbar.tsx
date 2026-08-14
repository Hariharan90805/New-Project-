import React, { useState } from 'react';
import { Logo } from './Logo';
import { BRAND_INFO } from '../data';
import { 
  MessageCircle, 
  Sparkles, 
  Menu, 
  X, 
  BellRing, 
  ArrowRight, 
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

interface NavbarProps {
  onOpenStrategyModal: () => void;
  onOpenNotificationCenter: () => void;
  onOpenDirectCallModal: () => void;
  onOpenEmailModal: () => void;
  notificationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStrategyModal,
  onOpenNotificationCenter,
  onOpenDirectCallModal,
  onOpenEmailModal,
  notificationCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const navLinks = [
    { label: '9 Pillars', href: '#nine-pillars' },
    { label: 'Problem & Solution', href: '#problem-solution' },
    { label: 'Capabilities', href: '#full-capabilities' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Lead Funnel (Slide 11)', href: '#funnel' },
    { label: 'Growth Simulator', href: '#growth-simulator' },
    { label: '30-Day Growth', href: '#growth-metrics' },
    { label: 'ROI Breakdown', href: '#conversion-architecture' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ! I want to scale my business in ${BRAND_INFO.serviceAreas[0]} with digital marketing. Please guide me.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
    
    // Log WhatsApp event
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Navbar WhatsApp Button' }),
    }).catch(() => {});
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-xl ${
      theme === 'light' 
        ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm' 
        : 'bg-neutral-950/85 border-neutral-800/80 text-neutral-100'
    }`}>
      {/* Top Notification Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-950/80 via-amber-950/70 to-emerald-950/80 py-1.5 px-4 text-xs border-b border-amber-500/20 text-neutral-300 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-300">
              <strong className="text-amber-300 font-semibold">Krishnagiri & Hosur Growth Partner:</strong> Average +500% WhatsApp enquiries in 30 days
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Direct Email Header Link */}
            <button
              onClick={onOpenEmailModal}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{BRAND_INFO.officialEmail}</span>
            </button>

            <span className="text-neutral-600">|</span>

            {/* Direct Call Header Link */}
            <button
              onClick={onOpenDirectCallModal}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Call: {BRAND_INFO.contactPhone}</span>
            </button>

            <span className="text-neutral-600">|</span>

            {/* Live Notifications */}
            <button
              onClick={onOpenNotificationCenter}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-300 transition-colors bg-neutral-900/80 px-2.5 py-0.5 rounded-full border border-neutral-700/60 text-[11px]"
            >
              <BellRing className="w-3 h-3 text-amber-400" />
              <span>Live Alerts</span>
              {notificationCount > 0 && (
                <span className="bg-amber-500 text-neutral-950 font-bold px-1.5 rounded-full text-[10px]">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="focus:outline-none flex items-center">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold tracking-wide transition-colors py-1 relative group ${
                  theme === 'light' ? 'text-slate-700 hover:text-amber-600' : 'text-neutral-300 hover:text-amber-300'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Call Button */}
            <button
              onClick={onOpenDirectCallModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold transition-all"
              id="btn-nav-call"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>

            {/* WhatsApp Chat Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold shadow-sm transition-all"
              id="btn-nav-whatsapp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            {/* Strategy Session CTA */}
            <button
              onClick={onOpenStrategyModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-xs font-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200"
              id="btn-nav-strategy"
            >
              <span>Book Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenDirectCallModal}
              className="p-2 rounded-lg bg-amber-500 text-neutral-950 font-bold"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDirectCallModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: {BRAND_INFO.contactPhone}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({BRAND_INFO.whatsappDisplay})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmailModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold"
            >
              <Mail className="w-4 h-4" />
              <span>Email: {BRAND_INFO.officialEmail}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStrategyModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 text-xs font-black shadow-md"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
