import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Target, 
  Sparkles, 
  TrendingUp, 
  BadgePercent, 
  UserCheck, 
  BarChart3, 
  HeartHandshake, 
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PILLARS } from '../data';
import { useTheme } from '../lib/ThemeContext';

const iconMap: Record<string, any> = {
  Globe,
  Target,
  Sparkles,
  TrendingUp,
  BadgePercent,
  UserCheck,
  BarChart3,
  HeartHandshake,
  LayoutDashboard,
};

interface NinePillarsSectionProps {
  onOpenStrategyModal: () => void;
}

export const NinePillarsSection: React.FC<NinePillarsSectionProps> = ({ onOpenStrategyModal }) => {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'acquisition' | 'conversion' | 'analytics'>('all');
  const { theme } = useTheme();

  const pillarDetails: Record<string, { tactics: string[]; roiExample: string; color: string }> = {
    '01': {
      tactics: ['Google Business Profile Verification', 'Hyper-Local Search Optimization', 'Regional Geo-targeted Ads'],
      roiExample: 'Expand from 20 walk-ins/day to 100+ daily online searchers across Krishnagiri & Hosur.',
      color: 'amber',
    },
    '02': {
      tactics: ['High-Intent Keyword Bidding', 'WhatsApp Click-to-Chat Funnels', 'Custom Lead Qualification Forms'],
      roiExample: 'Generate 210+ verified phone & chat inquiries every month instead of unqualified traffic.',
      color: 'emerald',
    },
    '03': {
      tactics: ['Viral 4K Cinematic Reels', 'High-End Brand Aesthetics', 'Local Influencer Tie-Ups'],
      roiExample: 'Ensure 85% of regional shoppers remember your brand when making a buying decision.',
      color: 'cyan',
    },
    '04': {
      tactics: ['Google 3-Pack Supremacy', 'Review Acceleration Engine', 'Competitive Search Bid Defense'],
      roiExample: 'Rank #1 above legacy competitors when customers search "best near me".',
      color: 'purple',
    },
    '05': {
      tactics: ['High-Converting Landing Pages', 'Automated WhatsApp Retargeting', 'Festival Promotional Campaigns'],
      roiExample: 'Average 4.5x Return on Ad Spend (ROAS) directly trackable to cash flow.',
      color: 'amber',
    },
    '06': {
      tactics: ['Pinpoint Demographic Targeting', 'Custom Audience Lookalikes', 'Buyer Intent Geo-Fencing'],
      roiExample: 'Eliminate 100% of wasted flyer printing expenses by targeting only actual buyers.',
      color: 'emerald',
    },
    '07': {
      tactics: ['Cost Per Lead (CPL) Tracking', 'Customer Acquisition Cost (CAC)', 'End-to-End Pixel Attribution'],
      roiExample: 'Know the exact cost per lead down to the paisa on every single campaign.',
      color: 'cyan',
    },
    '08': {
      tactics: ['WhatsApp Automated Broadcasts', 'VIP Customer Loyalty Offers', 'Google Review Follow-up Automations'],
      roiExample: 'Boost repeat customer purchases by 40% with zero additional ad spend.',
      color: 'purple',
    },
    '09': {
      tactics: ['Real-Time Power BI Dashboards', 'Automated Daily Performance Sync', 'Weekly Executive ROI Briefings'],
      roiExample: '24/7 transparent visibility on sales conversions and team follow-up speed.',
      color: 'amber',
    },
  };

  return (
    <section 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-slate-100/80 text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-950 text-neutral-100 border-b border-neutral-800'
      }`}
      id="nine-pillars"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Ordered as 2nd Section) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/80 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-md">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>02 • CORE STRATEGIC ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            The 9 Pillars of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">
              Digital Marketing Growth
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Digital marketing is not just random social media posting. It is an interconnected 9-pillar revenue engine designed to attract, convert, and scale high-value customers.
          </p>
        </motion.div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Globe;
            const extra = pillarDetails[pillar.number] || { tactics: [], roiExample: '', color: 'amber' };
            const isExpanded = activePillar === idx;

            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActivePillar(isExpanded ? null : idx)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-amber-400'
                    : 'bg-neutral-900/80 border border-neutral-800 hover:border-amber-400/50 shadow-2xl hover:shadow-amber-500/10'
                } ${isExpanded ? 'ring-2 ring-amber-400 border-transparent' : ''}`}
              >
                {/* Header with Pillar Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-amber-400/80 font-mono">
                      {pillar.number}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:text-emerald-400 transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Pillar Highlight Tag */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{pillar.highlight}</span>
                  </div>

                  {/* Title & Core Description */}
                  <h3 className="text-xl font-black mb-2 text-white group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
                  }`}>
                    {pillar.description}
                  </p>
                </div>

                {/* Expansion Details / ROI Example */}
                <div>
                  <div className="pt-4 border-t border-neutral-800 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Actionable Deliverables:</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {extra.tactics.map((tactic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{tactic}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ROI Impact Box */}
                    <div className="mt-3 p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                      <span className="font-bold text-amber-300 block">Measurable Outcome:</span>
                      <p className="leading-snug">{extra.roiExample}</p>
                    </div>
                  </div>

                  {/* Click to activate CTA */}
                  <div className="pt-4 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-400 transition-colors">
                    <span className="font-semibold">Explore Implementation</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout & Strategy Session Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/30 to-neutral-900 border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white">
              Ready to implement the 9 Pillars for your business?
            </h4>
            <p className="text-sm text-neutral-400">
              Get a customized Krishnagiri & Hosur digital expansion blueprint within 24 hours.
            </p>
          </div>

          <button
            onClick={onOpenStrategyModal}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm shadow-xl flex items-center gap-2 whitespace-nowrap transition-transform duration-200 hover:scale-105"
          >
            <span>Audit My 9 Pillars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
