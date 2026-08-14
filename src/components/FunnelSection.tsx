import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Filter, 
  Layers, 
  ArrowDown, 
  Database, 
  BarChart4, 
  Terminal, 
  CheckCircle, 
  TrendingUp, 
  Cpu, 
  MessageSquare, 
  Phone 
} from 'lucide-react';

export const FunnelSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simulatedFilter, setSimulatedFilter] = useState<'All' | 'Google' | 'Meta' | 'WhatsApp'>('All');

  const funnelTiers = [
    {
      id: 'attract',
      step: 'ATTRACT',
      tagline: 'Top of Funnel Discovery',
      elements: 'SEO • Ads • Social Media • Content',
      color: 'bg-neutral-900 border-neutral-700 text-neutral-200',
      badgeColor: 'bg-neutral-800 text-neutral-300',
      details: 'Creating initial awareness across Google searches and Meta ad feeds targeting Krishnagiri, Hosur, and Dharmapuri consumers.',
      metric: '35,000+ Monthly Regional Impressions',
    },
    {
      id: 'engage',
      step: 'ENGAGE',
      tagline: 'Middle of Funnel Trust',
      elements: 'Reels • Website • Email • Shorts',
      color: 'bg-teal-950/70 border-teal-600/50 text-teal-100',
      badgeColor: 'bg-teal-900 text-teal-300',
      details: 'Hooking buyers with high-definition 4K video reels, model shoots, real customer reviews, and fast responsive mobile websites.',
      metric: '12,500+ Video Retentions & Site Visits',
    },
    {
      id: 'convert',
      step: 'CONVERT',
      tagline: 'Bottom of Funnel Action',
      elements: 'PPC • Landing pages • WhatsApp • Insta • FB • YouTube • Email • Website',
      color: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-100',
      badgeColor: 'bg-emerald-800 text-emerald-200',
      details: '1-click direct conversion into instant WhatsApp conversations, phone calls, and booked appointments.',
      metric: '210+ Verified WhatsApp Inquiries/mo',
    },
    {
      id: 'analysis',
      step: 'ANALYSIS',
      tagline: 'Live BI & SQL Intelligence',
      elements: 'Dashboards using Power BI • Excel • Tableau • SQL',
      color: 'bg-amber-950/80 border-amber-500/60 text-amber-100',
      badgeColor: 'bg-amber-800 text-amber-200',
      details: 'Visualizing raw ad data, cost-per-lead, closing ratios, and ROI so your business continuously scales without blind spending.',
      metric: '100% Data Clarity & Multiplied ROI',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-neutral-900/95 text-white relative overflow-hidden border-b border-neutral-800" id="funnel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from Slide 11 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>Slide 11 • Lead Generation Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            From First Impression to <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Qualified Conversation.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            "Every <strong>QUERY TO A LEAD</strong>. We connect creative execution with measurable actions so you can see where demand is created and what to improve next."
          </p>
        </motion.div>

        {/* 4-Tier Funnel Graphic (Replicating Slide 11) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Stacked Stepped Funnel Bars */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 space-y-4"
          >
            {funnelTiers.map((tier, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.div
                  key={tier.id}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ scale: 1.01 }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${tier.color} ${
                    isActive ? 'ring-2 ring-amber-400 shadow-xl' : 'opacity-90 hover:opacity-100'
                  }`}
                  style={{
                    // Stepped width visual like Slide 11
                    marginLeft: `${idx * 1.5}%`,
                    marginRight: `${idx * 1.5}%`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${tier.badgeColor}`}>
                        {tier.step}
                      </span>
                      <span className="text-xs font-mono font-bold tracking-wide">
                        {tier.elements}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-amber-300 font-mono">
                      {tier.metric}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-white/10 text-xs text-neutral-200"
                    >
                      {tier.details}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: Live BI / SQL Analytics Mockup (Power BI / Excel / Tableau / SQL from Slide 11) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold font-mono text-white">
                  DCOLLABERZ BI Engine (Power BI / SQL)
                </span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* Simulated SQL Query */}
            <div className="p-3 bg-neutral-900 rounded-xl font-mono text-[11px] text-neutral-300 space-y-1 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-500 text-[10px]">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>SELECT channel, COUNT(leads), AVG(cost_per_lead)</span>
              </div>
              <p className="text-emerald-400">
                FROM dcollaberz_krishnagiri_leads WHERE status = 'CONVERTED';
              </p>
            </div>

            {/* Interactive KPI metrics inside BI dashboard */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Cost Per WhatsApp Lead</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">₹42.50</span>
                <span className="text-[9px] text-emerald-300 block">▼ 62% vs Industry avg</span>
              </div>

              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Conversion Ratio</span>
                <span className="text-lg font-bold text-amber-300 font-mono">24.8%</span>
                <span className="text-[9px] text-amber-300 block">▲ 3.8x baseline</span>
              </div>
            </div>

            {/* Visual Channel Breakdown */}
            <div className="space-y-2 pt-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Channel Lead Attribution (30 Days):
              </span>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-300">WhatsApp 1-Click Funnel</span>
                  <span className="font-mono text-emerald-400 font-bold">115 Leads (54%)</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '54%' }} />
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-300">Google Maps / Local 3-Pack</span>
                  <span className="font-mono text-cyan-400 font-bold">62 Leads (29%)</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '29%' }} />
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-300">Instagram & Facebook Reels</span>
                  <span className="font-mono text-amber-400 font-bold">33 Leads (17%)</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '17%' }} />
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
