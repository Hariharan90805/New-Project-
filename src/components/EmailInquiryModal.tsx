import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Send, CheckCircle2, Sparkles, Phone, Building2, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data';
import { logLeadToDb, logNotificationToDb } from '../lib/firebase';

interface EmailInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (log: any) => void;
}

export const EmailInquiryModal: React.FC<EmailInquiryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Showroom / Retail',
    location: 'Krishnagiri',
    budget: '₹50,000 / month',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.businessName) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        channel: 'Official Email Form',
      };

      // 1. Log lead to Cloud Firestore
      await logLeadToDb({
        ...payload,
        name: formData.contactPerson || formData.businessName,
      });

      // 2. Dispatch to backend API
      const res = await fetch('/api/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      // 3. Log notification to Firestore
      await logNotificationToDb({
        type: 'email_inquiry',
        title: `📧 Direct Email Inquiry from ${formData.businessName}`,
        details: `${formData.contactPerson || formData.businessName} (${formData.phone}) requested consultation for ${formData.industry} in ${formData.location}. Dispatched to ${BRAND_INFO.officialEmail}.`,
        recipientEmail: BRAND_INFO.officialEmail,
        payload,
      });

      if (onSuccess && data.notification) {
        onSuccess(data.notification);
      }

      // Also trigger a direct mailto client fallback
      const subject = encodeURIComponent(`Digital Marketing Strategy Inquiry - ${formData.businessName}`);
      const body = encodeURIComponent(
        `Hello DCOLLABERZ Team,\n\nBusiness Name: ${formData.businessName}\nContact Person: ${formData.contactPerson}\nPhone: ${formData.phone}\nIndustry: ${formData.industry}\nLocation: ${formData.location}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}\n\nPlease contact me.`
      );
      
      // Open client email if preferred
      window.open(`mailto:${BRAND_INFO.officialEmail}?subject=${subject}&body=${body}`, '_blank');

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({
          businessName: '',
          contactPerson: '',
          email: '',
          phone: '',
          industry: 'Showroom / Retail',
          location: 'Krishnagiri',
          budget: '₹50,000 / month',
          message: '',
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to submit email inquiry:', err);
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
            className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl z-10 text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Email Official Inquiry</h3>
                  <p className="text-xs text-cyan-300 font-mono">{BRAND_INFO.officialEmail}</p>
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
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Email Inquiry Dispatched!</h4>
                <p className="text-xs text-neutral-400">
                  Logged to Cloud database and dispatched to <strong>{BRAND_INFO.officialEmail}</strong>. Our strategy director will respond within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Hospital"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Nathan"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Krishnagiri">Krishnagiri District</option>
                      <option value="Hosur">Hosur</option>
                      <option value="Dharmapuri">Dharmapuri</option>
                      <option value="Kaveripattinam">Kaveripattinam</option>
                      <option value="Tamil Nadu">Tamil Nadu State</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="₹25,999 / mo (Silver)">₹25,999 / mo (Silver Plan)</option>
                      <option value="₹50,000 / mo (Gold)">₹50,000 / mo (Gold Growth)</option>
                      <option value="₹75,000 / mo (Diamond)">₹75,000 / mo (Diamond Dominance)</option>
                      <option value="Custom Enterprise">Custom Enterprise Project</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your business goals and marketing requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching to {BRAND_INFO.officialEmail}...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-neutral-950" />
                      <span>Send to {BRAND_INFO.officialEmail}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
