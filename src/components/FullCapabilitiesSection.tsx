import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Camera, 
  Film, 
  Sliders, 
  MapPin, 
  MessageSquare, 
  Laptop, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ChevronRight,
  Eye,
  Activity,
  Crosshair,
  Volume2
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { useTheme } from '../lib/ThemeContext';
import { AnimatedCameraRig } from './AnimatedCameraRig';

interface FullCapabilitiesSectionProps {
  onOpenStrategyModal: () => void;
}

export const FullCapabilitiesSection: React.FC<FullCapabilitiesSectionProps> = ({ onOpenStrategyModal }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      id: 'photoshoots',
      title: 'Commercial Photoshoots & Model Shoots',
      category: 'Creative Production',
      icon: Camera,
      tagline: 'High-Fashion, Store & Product Imagery',
      description: 'On-location commercial shoots with professional lighting rigs, professional models, and high-resolution color grading for showrooms, jewellery, hospitals, and real estate.',
      deliverables: [
        'On-Location Studio Lighting & 4K DSLR Rigs',
        'Model Casting & Wardrobe Styling',
        'High-Resolution Retouched Commercial Imagery',
        'Multi-Format Assets for Print, Web & Ads',
      ],
      kpi: '3.8x Higher Ad Click-Through-Rate (CTR)',
      color: 'from-amber-500/20 to-neutral-900',
    },
    {
      id: 'ad-shoots-reels',
      title: '4K Viral Video Ad Shoots & Cinematic Reels',
      category: 'Video Production',
      icon: Film,
      tagline: 'Scroll-Stopping Hooks & Narrative Reels',
      description: 'Cinema-grade video ads written with psychological hooks, local cultural context, trending audio, and subtitles that hold user attention across Instagram, Facebook, and YouTube.',
      deliverables: [
        'Hook Copywriting & Script Direction',
        '4K Cinema Camera, Drone & Gimbal Filming',
        'Dynamic Motion Graphics & Captions',
        'Fast-Paced Vertical Ad Variations for A/B Testing',
      ],
      kpi: '180,000+ Average Regional Impressions',
      color: 'from-emerald-500/20 to-neutral-900',
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads (Facebook & Instagram Lead Systems)',
      category: 'Paid Performance',
      icon: Sliders,
      tagline: 'Hyper-Targeted Krishnagiri & Hosur Campaigns',
      description: 'Precision audience targeting by geography, purchasing power, demographic age, and buyer intent. Directing traffic to high-converting instant forms and WhatsApp chats.',
      deliverables: [
        'Custom Lookalike & Retargeting Pixel Setup',
        'Instant WhatsApp Click-to-Message Ads',
        'Continuous Cost-Per-Lead (CPL) Optimization',
        'Daily Ad Spend & Bid Management',
      ],
      kpi: '₹18–₹35 Average Cost Per High-Intent Lead',
      color: 'from-cyan-500/20 to-neutral-900',
    },
    {
      id: 'local-seo-gmb',
      title: 'Google 3-Pack Local SEO & Google Search Ads',
      category: 'Search Dominance',
      icon: MapPin,
      tagline: 'Rank #1 When Local Buyers Search "Best Near Me"',
      description: 'Dominating Google Maps and Search for high-intent queries in Krishnagiri, Hosur, and Dharmapuri. Generating direct phone calls, map directions, and customer footfall.',
      deliverables: [
        'Google Business Profile Full Optimization',
        'Local Citation Building & Geo-Tagged Media',
        'Automated 5-Star Review Collection Engine',
        'Google PPC Search Ads with Call Extensions',
      ],
      kpi: '+383% Increase in Local Search Views',
      color: 'from-purple-500/20 to-neutral-900',
    },
    {
      id: 'whatsapp-funnels',
      title: 'WhatsApp Marketing & Automated Sales Chatbots',
      category: 'Conversion Engine',
      icon: MessageSquare,
      tagline: 'The #1 Communication Channel in Tamil Nadu',
      description: 'Transform website visitors and ad clicks into immediate WhatsApp conversations. Includes automated welcome flows, catalogs, and personalized lead routing.',
      deliverables: [
        'Official WhatsApp Business Cloud API Integration',
        'Instant Automated Greeting & Qualification Bot',
        'Broadcast Segmented Promotions',
        'Direct CRM & Sales Team WhatsApp Notifications',
      ],
      kpi: '98% Message Open Rate & < 3 Min Response',
      color: 'from-emerald-500/20 to-neutral-900',
    },
    {
      id: 'web-landing',
      title: 'High-Converting Websites & Fast UI/UX Platforms',
      category: 'Web Engineering',
      icon: Laptop,
      tagline: 'Lightning-Fast Digital Storefronts Built to Convert',
      description: 'Custom full-stack web platforms and landing pages engineered for 100% mobile responsiveness, blazing sub-second load times, and frictionless lead capture.',
      deliverables: [
        'Modern React & Tailwind Responsive Architecture',
        'Embedded WhatsApp Instant Lead Triggers',
        'Search Engine & Core Web Vitals Optimization',
        'Integrated SSL, Analytics & Security',
      ],
      kpi: '12.4% Average Conversion Rate',
      color: 'from-amber-500/20 to-neutral-900',
    },
    {
      id: 'power-bi-analytics',
      title: 'Live Power BI & SQL Marketing Attribution',
      category: 'Data Intelligence',
      icon: BarChart3,
      tagline: 'Total Financial Clarity on Marketing ROI',
      description: 'Custom cloud dashboards streaming real-time metrics: ad spend, cost per qualified lead, customer acquisition cost, conversion rate, and net revenue growth.',
      deliverables: [
        'Automated Multi-Channel Data Aggregation',
        'Live Executive KPI Dashboards (Power BI / Web)',
        'Weekly Transparent ROI Attribution Reports',
        'Continuous Budget Re-allocation to Top Campaigns',
      ],
      kpi: '100% Transparent Financial Attribution',
      color: 'from-purple-500/20 to-neutral-900',
    },
    {
      id: 'influencer-testimonials',
      title: 'Regional Influencer Collabs & Video Testimonials',
      category: 'Social Proof',
      icon: Users,
      tagline: 'Build Immediate Community Trust & Authority',
      description: 'Pairing your brand with authentic Tamil Nadu creators, verified client interviews, and high-impact customer case study video productions.',
      deliverables: [
        'Regional Creator Matching & Briefing',
        'On-Camera Client Success Story Filming',
        'Whitelisted Influencer Ad Distribution',
        'Social Proof Review Syndication',
      ],
      kpi: '4.9 Star Community Reputation Score',
      color: 'from-cyan-500/20 to-neutral-900',
    },
  ];

  const currentCap = capabilities[activeTab];

  // Auto scroll listener to trigger camera capture when scrolling capabilities
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      // Map scroll progress to capability tab if scrolling across section
      if (val > 0.15 && val < 0.85) {
        const normalized = (val - 0.15) / 0.70;
        const targetIdx = Math.min(capabilities.length - 1, Math.floor(normalized * capabilities.length));
        if (targetIdx !== activeTab && targetIdx >= 0) {
          setActiveTab(targetIdx);
        }
      }
    });
    return () => unsubscribe();
  }, [activeTab, capabilities.length, scrollYProgress]);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-slate-50 text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-950 text-neutral-100 border-b border-neutral-800'
      }`}
      id="full-capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-widest text-cyan-400 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>04 • FULL CAPABILITIES MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            End-to-End Digital <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              Growth Capabilities
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Every specialized service required to capture regional market share — with live camera operator animations tracking and shooting each growth topic.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
            <Camera className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll or select any topic below to trigger live camera operator clicks</span>
          </div>
        </motion.div>

        {/* 2-Column Interactive Capabilities Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Menu / Selector (8 items) */}
          <div className="lg:col-span-5 space-y-2.5">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-neutral-900 border-amber-400/80 shadow-lg shadow-amber-500/10 scale-[1.02]'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-900 text-neutral-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                          {cap.category}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            CAM FOCUS
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-bold ${isActive ? 'text-amber-300' : 'text-neutral-200'}`}>
                        {cap.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-amber-400 translate-x-1' : 'text-neutral-600'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Capability Stage with Animated Camera Operator */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCap.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-700/80 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Dynamic Animated Cameraman Rig Stage for every topic */}
                <AnimatedCameraRig
                  topicId={currentCap.id}
                  topicTitle={currentCap.title}
                  category={currentCap.category}
                  kpi={currentCap.kpi}
                  tagline={currentCap.tagline}
                  colorScheme={currentCap.color}
                  isLightMode={theme === 'light'}
                />

                {/* Topic Headline & Tagline */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase font-bold text-amber-400">
                      Topic 0{activeTab + 1} / 08 • {currentCap.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {currentCap.tagline}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {currentCap.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                    Key Execution Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentCap.deliverables.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-neutral-400">
                    Targeting <strong>Krishnagiri, Hosur, Dharmapuri & Tamil Nadu</strong>
                  </div>

                  <button
                    onClick={onOpenStrategyModal}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                  >
                    <span>Deploy {currentCap.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

