import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, PhoneCall, CheckCircle2, Clock, MapPin, User, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data';
import { logLeadToDb, logNotificationToDb } from '../lib/firebase';

interface DirectCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (log: any) => void;
}

export const DirectCallModal: React.FC<DirectCallModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [preferredTime, setPreferredTime] = useState('Immediate / Next 15 Mins');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDirectDial = () => {
    window.location.href = `tel:${BRAND_INFO.contactPhoneRaw}`;
    
    // Log call event
    fetch('/api/notify-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'Direct Phone Dial Click', referrer: 'Direct Call Modal' }),
    }).catch(() => {});
  };

  const handleRequestCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: clientName || 'Direct Call Request',
        phone: phoneNumber,
        preferredTime,
        timestamp: new Date().toISOString(),
        channel: 'Direct Phone Callback Request',
        location: 'Krishnagiri Region',
      };

      // 1. Log to Firestore
      await logLeadToDb(payload);

      // 2. Dispatch to backend
      const res = await fetch('/api/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      // 3. Log notification
      await logNotificationToDb({
        type: 'phone_call_request',
        title: `📞 Callback Request from ${clientName || phoneNumber}`,
        details: `Caller (${phoneNumber}) requested immediate callback at ${preferredTime}. Dispatched to ${BRAND_INFO.officialEmail}.`,
        recipientEmail: BRAND_INFO.officialEmail,
        payload,
      });

      if (onSuccess && data.notification) {
        onSuccess(data.notification);
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setPhoneNumber('');
        setClientName('');
      }, 2000);
    } catch (err) {
      console.error('Failed to schedule callback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-neutral-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl z-10 text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Call DCOLLABERZ</h3>
                  <p className="text-xs text-amber-300 font-mono">{BRAND_INFO.contactPhone}</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Callback Request Confirmed!</h4>
                <p className="text-xs text-neutral-400">
                  Our growth consultant will call you back at <strong>{phoneNumber}</strong> within {preferredTime}.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Instant One-Tap Direct Dial */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Instant 1-Tap Direct Dial
                  </span>

                  <button
                    onClick={handleDirectDial}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  >
                    <Phone className="w-4 h-4 text-neutral-950 fill-neutral-950" />
                    <span>Dial {BRAND_INFO.contactPhone}</span>
                  </button>

                  <p className="text-[10px] text-neutral-500">
                    Direct line to DCOLLABERZ Marketing Strategy Team • Krishnagiri HQ
                  </p>
                </div>

                {/* Or Request Instant Callback Form */}
                <form onSubmit={handleRequestCallback} className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Or Request Instant Free Callback:</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Anand / Dr. Nathan)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400 mb-2"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Your Mobile Number (+91...)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Preferred Time to Call</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Immediate / Next 15 Mins">Immediate / Next 15 Mins</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-amber-300 border border-amber-500/30 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Callback...</span>
                    ) : (
                      <>
                        <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                        <span>Request Free Callback</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
