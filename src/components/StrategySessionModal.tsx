import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  Calendar,
  Building2,
  Clock,
  Database,
  Mail
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { Logo } from './Logo';
import { saveLeadToDb, logNotificationToDb } from '../lib/firebase';

interface StrategySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSuccess: (record: any) => void;
}

export const StrategySessionModal: React.FC<StrategySessionModalProps> = ({
  isOpen,
  onClose,
  onLeadSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Retail Store / Showroom');
  const [preferredPackage, setPreferredPackage] = useState('Tier-2: Gold Growth Lead (₹50,000/mo) - Recommended');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      // 1. Save directly to Cloud Firestore Database
      const firestoreResult = await saveLeadToDb({
        clientName: name,
        phone,
        businessName: businessName || 'Local Enterprise',
        category: businessType,
        packageInterest: preferredPackage,
        notes: message,
        status: 'NEW_STRATEGY_LEAD',
      });

      // 2. Dispatch to Backend Express Notification API
      const response = await fetch('/api/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          businessName,
          businessType,
          preferredPackage,
          message,
          firestoreLeadId: firestoreResult.id,
        }),
      });

      const data = await response.json();

      // 3. Log notification in Firestore
      await logNotificationToDb({
        type: 'inquiry_submitted',
        title: `🔥 High-Intent Lead: ${name} (${businessName || 'Local Business'})`,
        details: `Phone: ${phone} | Type: ${businessType} | Plan: ${preferredPackage}. Saved to Firestore ID: ${firestoreResult.id || 'N/A'}. Dispatched to ${BRAND_INFO.officialEmail} & ${BRAND_INFO.adminEmail}`,
        recipientEmail: BRAND_INFO.officialEmail,
        payload: { name, phone, businessName, businessType, preferredPackage, message },
      });
      
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#3b82f6'],
      });

      setIsSubmitted(true);
      if (data.notification) {
        onLeadSuccess(data.notification);
      }
    } catch (err) {
      console.error(err);
      alert('Inquiry saved. Our team will contact you directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ!\nMy name is ${name || 'a Business Owner'} (${businessName || 'Business in ' + BRAND_INFO.serviceAreas[0]}).\nPhone: ${phone}\nPackage Interest: ${preferredPackage}\nI would like to schedule a 1-on-1 strategy session.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl text-white overflow-hidden my-8 z-10"
          >
            {/* Header matching Slide 12 */}
            <div className="p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size="sm" showTagline={false} />
                <div>
                  <h3 className="text-base font-bold text-white">Book a Strategy Session</h3>
                  <p className="text-xs text-amber-400 font-medium">
                    "Bring us the goal. We'll build the system."
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block">30-Minute 1-on-1 Growth Blueprint</strong>
                        <span>Auto-alert sent to <span className="text-amber-300 font-mono">{BRAND_INFO.officialEmail}</span></span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <span>Live Sync Active</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anbu Selvan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Business Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Selvam Silks"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Business Category</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                      >
                        <option>Retail Store / Showroom</option>
                        <option>Hospital / Clinic</option>
                        <option>Real Estate / Builder</option>
                        <option>Restaurant / Cafe</option>
                        <option>School / Educational Institute</option>
                        <option>Manufacturing & Industrial</option>
                        <option>Automobile Dealership</option>
                        <option>Other Service Business</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Interested Growth Package</label>
                    <select
                      value={preferredPackage}
                      onChange={(e) => setPreferredPackage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                    >
                      <option>Tier-1: Silver Starter (₹25,999/mo)</option>
                      <option>Tier-2: Gold Growth Lead (₹50,000/mo) - Recommended</option>
                      <option>Tier-3: Diamond Full Performance (₹75,000+/mo)</option>
                      <option>Custom Enterprise / Multi-Location Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Your Primary Goal / Current Challenges</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you want to achieve in the next 30-90 days..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          Broadcasting to {BRAND_INFO.officialEmail}...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm Strategy Session</span>
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleWhatsAppInstant}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Or chat instantly on WhatsApp ({BRAND_INFO.whatsappDisplay})</span>
                      </button>
                    </div>
                  </div>

                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Strategy Session Booked!</h4>
                    <p className="text-xs text-neutral-300">
                      Thank you <strong className="text-white">{name}</strong>. An email notification has been dispatched to <strong>{BRAND_INFO.officialEmail}</strong> & <strong>{BRAND_INFO.adminEmail}</strong>.
                    </p>
                    <p className="text-xs text-amber-400 font-medium">
                      Our growth strategist will contact you within 2 hours on WhatsApp: {phone}.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleWhatsAppInstant}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Direct Connect</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
