import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BadgePercent, 
  ShieldCheck,
  Zap,
  Layers,
  BarChart3
} from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

interface Slide8ConversionSectionProps {
  onOpenStrategyModal: () => void;
}

export const Slide8ConversionSection: React.FC<Slide8ConversionSectionProps> = ({ onOpenStrategyModal }) => {
  const { theme } = useTheme();

  const stages = [
    {
      step: '01',
      title: 'Attention & Clicks',
      formula: '10,000 High-Intent Regional Views',
      desc: 'Targeted Google search keywords & Instagram Reels stop the scroll.',
      icon: Target,
      tag: 'Awareness',
      color: 'amber',
    },
    {
      step: '02',
      title: '1-Click WhatsApp Landing',
      formula: '400+ Direct Conversations',
      desc: 'Frictionless mobile pages remove complicated forms in favor of instant chat.',
      icon: Zap,
      tag: 'Intent Capture',
      color: 'emerald',
    },
    {
      step: '03',
      title: 'Sales Team Qualification',
      formula: '210+ Qualified Inquiries',
      desc: 'Automated greeting scripts filter serious buyers with location & budget.',
      icon: ShieldCheck,
      tag: 'Qualification',
      color: 'cyan',
    },
    {
      step: '04',
      title: 'Closed Revenue & Retention',
      formula: '126 Paying Customers',
      desc: 'Closed deals + automated review requests driving repeat referral loops.',
      icon: TrendingUp,
      tag: 'Revenue & ROI',
      color: 'purple',
    },
  ];

  return (
    <section 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-white text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-900/70 text-neutral-100 border-b border-neutral-800'
      }`}
      id="conversion-architecture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (9th in layout - Slide 8) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 border border-neutral-700 text-xs font-bold uppercase tracking-widest text-purple-400 shadow-md">
            <BadgePercent className="w-3.5 h-3.5 text-purple-400" />
            <span>09 • SLIDE 08 • CONVERSION ARCHITECTURE & ROI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            How Every Click Converts <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Into Measurable Profit
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            The mathematics behind the DCOLLABERZ growth flywheel: lowering customer acquisition cost while maximizing customer lifetime value.
          </p>
        </motion.div>

        {/* 4 Step Conversion Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-black text-purple-400 px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30">
                      STAGE {st.step}
                    </span>
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {st.title}
                  </h3>

                  <div className="my-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-amber-300 font-mono">
                    {st.formula}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{st.tag}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Financial ROI Breakdown Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-950 via-purple-950/30 to-neutral-950 border border-purple-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Verified Economic Model
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Average Client ROI: ₹4.80 Return For Every ₹1.00 Invested
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
              By combining Google 3-Pack SEO (free recurring organic traffic) with high-retention 4K reels and Meta retargeting, your overall blended cost per customer drops every month.
            </p>
          </div>

          <button
            onClick={onOpenStrategyModal}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black text-xs shadow-xl flex items-center gap-2 whitespace-nowrap transition-transform hover:scale-105"
          >
            <span>Calculate My ROI Model</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
