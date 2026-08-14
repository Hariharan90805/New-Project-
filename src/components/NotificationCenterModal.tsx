import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  BellRing, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Eye, 
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BRAND_INFO } from '../data';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: any[];
  onRefresh: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}) => {
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleSendTestAlert = async () => {
    setIsSendingTest(true);
    try {
      await fetch('/api/notify-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: 'Krishnagiri Central (Test Trigger)',
          device: 'Mobile (Android/Chrome)',
          referrer: 'Google Search / Local Maps',
          page: '/home',
        }),
      });

      setTestSent(true);
      onRefresh();
      setTimeout(() => setTestSent(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingTest(false);
    }
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl text-white overflow-hidden my-8 z-10"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Live Visitor & Lead Notification Dispatcher</h3>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-amber-400" />
                      <span>Official: <strong className="text-amber-300 font-mono">{BRAND_INFO.officialEmail}</strong></span>
                    </span>
                    <span className="text-neutral-600">|</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-emerald-400" />
                      <span>Admin: <strong className="text-emerald-300 font-mono">{BRAND_INFO.adminEmail}</strong></span>
                    </span>
                  </div>
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
            <div className="p-6 space-y-6">
              {/* Status HUD Banner */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      MONITOR ACTIVE
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">Real-Time Inbound Event Stream</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Every visitor arrival, strategy inquiry, and plan subscription instantly notifies <span className="text-amber-300 font-mono">{BRAND_INFO.officialEmail}</span> and your team WhatsApp.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onRefresh}
                    className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all text-xs flex items-center gap-1.5"
                    title="Refresh Logs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={handleSendTestAlert}
                    disabled={isSendingTest}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold transition-all text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isSendingTest ? 'Dispatching...' : testSent ? 'Alert Dispatched!' : 'Send Test Alert'}</span>
                  </button>
                </div>
              </div>

              {/* Event Stream List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Recent Broadcasted Events ({notifications.length})
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    Auto-Synced (Firestore & Backend)
                  </span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((item) => {
                    let badgeColor = 'bg-neutral-800 text-neutral-300';
                    let Icon = Eye;

                    if (item.type === 'visitor_entry') {
                      badgeColor = 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30';
                      Icon = Eye;
                    } else if (item.type === 'inquiry_submitted') {
                      badgeColor = 'bg-amber-950/80 text-amber-300 border border-amber-500/40';
                      Icon = Mail;
                    } else if (item.type === 'payment_completed') {
                      badgeColor = 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40';
                      Icon = CreditCard;
                    } else if (item.type === 'whatsapp_click') {
                      badgeColor = 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30';
                      Icon = MessageCircle;
                    }

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${badgeColor}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <h4 className="text-xs font-bold text-white">{item.title}</h4>
                          </div>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed pl-8">
                          {item.details}
                        </p>

                        <div className="pl-8 pt-1 flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                          <span className="text-emerald-400">→ Broadcasted to:</span>
                          <span>{item.recipientEmail || BRAND_INFO.officialEmail}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer note */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant SMTP, Firestore & Webhook Dispatch Active</span>
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
