import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Logo3DExperience } from './components/Logo3DExperience';
import { NinePillarsSection } from './components/NinePillarsSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { FullCapabilitiesSection } from './components/FullCapabilitiesSection';
import { PricingSection } from './components/PricingSection';
import { FunnelSection } from './components/FunnelSection';
import { GrowthSimulatorSection } from './components/GrowthSimulatorSection';
import { GrowthMetricsComparison } from './components/GrowthMetricsComparison';
import { Slide8ConversionSection } from './components/Slide8ConversionSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Modals
import { CheckoutModal } from './components/CheckoutModal';
import { StrategySessionModal } from './components/StrategySessionModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { DirectCallModal } from './components/DirectCallModal';
import { EmailInquiryModal } from './components/EmailInquiryModal';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';

import { PricingTier } from './types';
import { BRAND_INFO } from './data';
import { logVisitorToDb, logNotificationToDb, subscribeToNotifications } from './lib/firebase';
import { useTheme } from './lib/ThemeContext';

export function App() {
  // Theme context
  const { theme } = useTheme();

  // Modal states
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [directCallModalOpen, setDirectCallModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // Real-time notification log
  const [notifications, setNotifications] = useState<any[]>([]);

  // Smooth global scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Subscribe to Firestore Real-Time Notifications Stream & Log Visitor Arrival
  useEffect(() => {
    const unsubscribe = subscribeToNotifications((dbNotifs) => {
      if (dbNotifs && dbNotifs.length > 0) {
        setNotifications(dbNotifs);
      }
    });

    const notifyVisitorEntry = async () => {
      try {
        const visitorData = {
          city: 'Krishnagiri / Tamil Nadu Region',
          device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
          referrer: document.referrer || 'Direct Visit / Google Search',
          page: window.location.pathname,
        };

        // 1. Persist visitor to Cloud Firestore
        await logVisitorToDb(visitorData);

        // 2. Dispatch to Backend Express Route
        const res = await fetch('/api/notify-entry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitorData),
        });
        const data = await res.json();

        // 3. Log event notification to Firestore
        await logNotificationToDb({
          type: 'visitor_entry',
          title: '👀 New Visitor Entered DCOLLABERZ Website',
          details: `Visitor from ${visitorData.city} (${visitorData.device}) arrived via ${visitorData.referrer}. Automated alert dispatched to ${BRAND_INFO.officialEmail}.`,
          recipientEmail: BRAND_INFO.officialEmail,
          payload: visitorData,
        });

        if (data.notification) {
          setNotifications((prev) => [data.notification, ...prev]);
        }
      } catch (err) {
        console.error('Error logging visitor entry:', err);
      }
    };

    notifyVisitorEntry();
    fetchNotifications();

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.logs) {
        setNotifications(data.logs);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  const handleSelectTier = (tier: PricingTier, cycle: 'monthly' | 'quarterly') => {
    setSelectedTier(tier);
    setSelectedBillingCycle(cycle);
    setCheckoutModalOpen(true);
  };

  const handleLeadSuccess = (record: any) => {
    setNotifications((prev) => [record, ...prev]);
  };

  const handlePaymentSuccess = (record: any) => {
    setNotifications((prev) => [record, ...prev]);
  };

  return (
    <div className={`min-h-screen font-sans antialiased overflow-x-hidden relative transition-colors duration-500 ${
      theme === 'light' 
        ? 'bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-neutral-950' 
        : 'bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950'
    }`}>
      {/* Global Agency Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 origin-left z-50 shadow-sm shadow-amber-400/50"
        style={{ scaleX }}
      />

      {/* Navigation Header with Light/Dark Mode Switcher & Direct Call/Email CTAs */}
      <Navbar
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
        onOpenNotificationCenter={() => setNotificationModalOpen(true)}
        onOpenDirectCallModal={() => setDirectCallModalOpen(true)}
        onOpenEmailModal={() => setEmailModalOpen(true)}
        notificationCount={notifications.length}
      />

      {/* ========================================================================= */}
      {/* 1st: HERO BANNER & AGENCY POSITIONING                                     */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <HeroSection
          onOpenStrategyModal={() => setStrategyModalOpen(true)}
          onOpenDirectCallModal={() => setDirectCallModalOpen(true)}
          onOpenEmailModal={() => setEmailModalOpen(true)}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 1.5: 3D SCROLLING EMBLEM & BRAND IDENTITY EXPERIENCE                      */}
      {/* ========================================================================= */}
      <Logo3DExperience onOpenStrategyModal={() => setStrategyModalOpen(true)} />

      {/* ========================================================================= */}
      {/* 2nd & 3rd: 9 PILLARS OF SYSTEMATIC DIGITAL MARKETING (Slide 2)            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <NinePillarsSection onOpenStrategyModal={() => setStrategyModalOpen(true)} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 4th: PROBLEM VS SOLUTION COMPARISON (Slide 3 & 9)                          */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <ProblemSolutionSection onOpenStrategyModal={() => setStrategyModalOpen(true)} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 5th: FULL CAPABILITIES (8 Core Service Execution Verticals)               */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <FullCapabilitiesSection onOpenStrategyModal={() => setStrategyModalOpen(true)} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 6th: PACKAGES & PRICING (Silver, Gold, Diamond + Instant Checkout)        */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <PricingSection onSelectTier={handleSelectTier} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 7th: SLIDE 11 • 4-TIER LEAD GENERATION FUNNEL & SQL/BI INTELLIGENCE       */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <FunnelSection />
      </motion.div>

      {/* ========================================================================= */}
      {/* 8th: INTERACTIVE GROWTH SIMULATOR & GEMINI AI STRATEGY BLUEPRINT          */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <GrowthSimulatorSection />
      </motion.div>

      {/* ========================================================================= */}
      {/* 9th: SLIDE 06 & 07 • 30-DAY GROWTH METRICS COMPARISON                     */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <GrowthMetricsComparison />
      </motion.div>

      {/* ========================================================================= */}
      {/* 10th: SLIDE 08 • CONVERSION ARCHITECTURE & ROI BREAKDOWN                  */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <Slide8ConversionSection onOpenStrategyModal={() => setStrategyModalOpen(true)} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 11th: CLIENT REVIEWS WITH CONTINUOUS RUNNING MARQUEE TRANSITION           */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* ========================================================================= */}
      {/* 12th: FOOTER WITH INTEGRATED HOTLINES & SLIDE 12 CLOSE                    */}
      {/* ========================================================================= */}
      <Footer
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
        onOpenNotificationCenter={() => setNotificationModalOpen(true)}
      />

      {/* ========================================================================= */}
      {/* FLOATING ACTION DOCK (WhatsApp + Call + Email + Theme Toggle)             */}
      {/* ========================================================================= */}
      <FloatingWhatsAppWidget
        onOpenDirectCallModal={() => setDirectCallModalOpen(true)}
        onOpenEmailModal={() => setEmailModalOpen(true)}
      />

      {/* Instant Tier Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        tier={selectedTier}
        billingCycle={selectedBillingCycle}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Strategy Session Booking Modal */}
      <StrategySessionModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
        onLeadSuccess={handleLeadSuccess}
      />

      {/* Real-time Notification Center Modal */}
      <NotificationCenterModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        notifications={notifications}
        onRefresh={fetchNotifications}
      />

      {/* Direct Call & Instant Callback Request Modal */}
      <DirectCallModal
        isOpen={directCallModalOpen}
        onClose={() => setDirectCallModalOpen(false)}
        onSuccess={handleLeadSuccess}
      />

      {/* Direct Email Inquiry Modal (Dispatches to dcollaberzoffical@gmail.com) */}
      <EmailInquiryModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSuccess={handleLeadSuccess}
      />
    </div>
  );
}

export default App;
