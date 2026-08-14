import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  CheckCheck, 
  Phone, 
  Mail, 
  Sun, 
  Moon 
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { useTheme } from '../lib/ThemeContext';

interface FloatingActionDockProps {
  onOpenDirectCallModal: () => void;
  onOpenEmailModal: () => void;
}

export const FloatingWhatsAppWidget: React.FC<FloatingActionDockProps> = ({
  onOpenDirectCallModal,
  onOpenEmailModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const { theme, toggleTheme } = useTheme();

  const quickPrompts = [
    'I want +500% more leads in Krishnagiri',
    'I want to know about Gold Plan (₹50,000)',
    'Need Google Maps #1 Ranking for my shop',
    'Book a free 30-min strategy audit',
  ];

  const handleSendPrompt = (promptText: string) => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ!\n${promptText}\nMy business is located in ${BRAND_INFO.serviceAreas[0]}. Please guide me on next steps.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
    setIsOpen(false);

    // Notify backend
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Floating Widget', packageInterest: promptText }),
    }).catch(() => {});
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSendPrompt(customMsg.trim());
    setCustomMsg('');
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${BRAND_INFO.contactPhoneRaw}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-neutral-900 border border-emerald-500/40 shadow-2xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 border-b border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-neutral-950 font-black">
                    <MessageCircle className="w-5 h-5 fill-neutral-950 text-neutral-950" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-900 rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>DCOLLABERZ Growth Team</span>
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" />
                    <span>Online • Krishnagiri & Hosur HQ</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-neutral-950/70">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 space-y-1">
                <p className="font-semibold text-amber-300">👋 Vanakkam / Hello!</p>
                <p className="leading-relaxed">
                  How can we help scale your business in Krishnagiri & Tamil Nadu today? Choose a quick question or type your custom message:
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Quick Inquiries:
                </span>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendPrompt(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-950/70 text-neutral-200 hover:text-emerald-300 border border-neutral-800 hover:border-emerald-500/40 text-xs transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <Send className="w-3 h-3 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <form onSubmit={handleSendCustom} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message to WhatsApp..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Companion Action Buttons inside Chat */}
              <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDirectCallModal();
                  }}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-amber-300 border border-amber-500/30 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Direct</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEmailModal();
                  }}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Official Email</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Pill Bar */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 shadow-2xl backdrop-blur-xl"
      >
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-amber-300 transition-all"
          title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
          id="btn-theme-toggle-floating"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Official Email Trigger */}
        <button
          onClick={onOpenEmailModal}
          className="p-2.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 transition-all"
          title={`Send Email to ${BRAND_INFO.officialEmail}`}
          id="btn-floating-email"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
        </button>

        {/* Direct Call Button (User requested Call integration near WhatsApp) */}
        <button
          onClick={onOpenDirectCallModal}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105"
          title={`Direct Call: ${BRAND_INFO.contactPhone}`}
          id="btn-floating-call"
        >
          <Phone className="w-4 h-4 fill-neutral-950 text-neutral-950 animate-bounce" />
          <span className="hidden sm:inline">Call Us</span>
        </button>

        {/* WhatsApp Us Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-105"
          id="btn-floating-whatsapp"
        >
          <MessageCircle className="w-4 h-4 fill-neutral-950 text-neutral-950" />
          <span>WhatsApp Us</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-950"></span>
          </span>
        </button>
      </motion.div>

    </div>
  );
};
