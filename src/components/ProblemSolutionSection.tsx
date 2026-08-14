import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  XCircle, 
  Sparkles, 
  Zap,
  Sliders,
  ShieldCheck,
  Building2,
  Store,
  ChevronRight
} from 'lucide-react';
import { PROBLEMS_VS_SOLUTIONS } from '../data';
import { useTheme } from '../lib/ThemeContext';

interface ProblemSolutionSectionProps {
  onOpenStrategyModal: () => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ onOpenStrategyModal }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { theme } = useTheme();

  return (
    <section 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-white text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-900/60 text-neutral-100 border-b border-neutral-800'
      }`}
      id="problem-solution"
    >
      {/* Background Ambient FX */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (3rd in layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 border border-neutral-700 text-xs font-bold uppercase tracking-widest text-emerald-400 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>03 • THE DIGITAL MARKETING TRANSFORMATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            The Traditional Marketing Dilemma vs. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
              The DCOLLABERZ Engine
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Why traditional banners, blind newspaper ads, and random Instagram posting fail — and how our systematic digital funnel turns traffic into revenue.
          </p>
        </motion.div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Card: The Traditional Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-red-500/30 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-300">Traditional / Ineffective Marketing</h3>
                <p className="text-xs text-neutral-400">What keeps businesses struggling in 2026</p>
              </div>
            </div>

            <div className="space-y-4">
              {PROBLEMS_VS_SOLUTIONS.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 text-left space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Problem {idx + 1}: {item.problem}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/20 text-xs text-red-300 text-center font-medium">
              Result: Zero customer attribution, wasted marketing budgets, and lost sales to competitors.
            </div>
          </motion.div>

          {/* Right Card: The DCOLLABERZ Systematic Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-950 via-emerald-950/30 to-neutral-950 border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-300">The DCOLLABERZ Systematic Growth</h3>
                <p className="text-xs text-neutral-400">Our measurable, revenue-driven solution</p>
              </div>
            </div>

            <div className="space-y-4">
              {PROBLEMS_VS_SOLUTIONS.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 text-left space-y-1.5 hover:border-emerald-400/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Solution: {item.solution}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Designed to capture intent directly and route qualified buyers into your WhatsApp & phone queue.
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 text-center font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Result: +500% Enquiries, #1 Google Ranking, & Transparent Power BI ROI.</span>
            </div>
          </motion.div>

        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onOpenStrategyModal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-black text-sm shadow-xl shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            <span>Switch Your Business to the Growth Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
