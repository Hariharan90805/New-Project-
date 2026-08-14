import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  PhoneCall, 
  ShoppingBag, 
  Share2, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Calculator,
  Building,
  DollarSign
} from 'lucide-react';
import { GROWTH_METRICS, BRAND_INFO } from '../data';

const iconMap: Record<string, any> = {
  Users,
  PhoneCall,
  ShoppingBag,
  Share2,
  MapPin,
};

export const GrowthMetricsComparison: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<number>(1); // default Enquiries
  const [calculatorCategory, setCalculatorCategory] = useState<'Restaurant' | 'Hospital' | 'Real Estate' | 'Retail' | 'School'>('Real Estate');
  const [avgTicketSize, setAvgTicketSize] = useState<number>(50000);

  const categoryDefaults: Record<string, { ticket: number; monthlyLeads: number; closeRate: number }> = {
    Restaurant: { ticket: 800, monthlyLeads: 180, closeRate: 0.4 },
    Hospital: { ticket: 3500, monthlyLeads: 120, closeRate: 0.35 },
    'Real Estate': { ticket: 150000, monthlyLeads: 45, closeRate: 0.15 },
    Retail: { ticket: 4000, monthlyLeads: 140, closeRate: 0.25 },
    School: { ticket: 35000, monthlyLeads: 65, closeRate: 0.3 },
  };

  const currentCalc = categoryDefaults[calculatorCategory] || categoryDefaults['Real Estate'];
  const estimatedNewRevenue = Math.round(currentCalc.monthlyLeads * currentCalc.closeRate * avgTicketSize);

  return (
    <section className="py-20 lg:py-28 bg-neutral-900/90 text-white relative overflow-hidden border-t border-b border-neutral-800" id="growth-metrics">
      {/* Background Graphic Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from Slide 6 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>Slide 06 & 07 • Proven Case Study</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Grow Your Business in <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Krishnagiri & Regional Hubs
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-medium">
            <span className="text-amber-400 font-bold">More Visibility</span> •{' '}
            <span className="text-emerald-400 font-bold">More Enquiries</span> •{' '}
            <span className="text-cyan-400 font-bold">More Customers</span>
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 italic">
            Before Online Shop vs. After Our Digital Marketing (Krishnagiri Region — Average 30-Day Client Results)
          </p>
        </motion.div>

        {/* 30-Day Growth Metric Comparison Bar Charts (Slide 6) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          className="bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-800">
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>30-Day Performance Multipliers</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Click any metric below to examine the before vs. after transformation.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-neutral-600 inline-block" />
                <span className="text-neutral-400">Before DCOLLABERZ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-gradient-to-r from-emerald-500 to-teal-400 inline-block" />
                <span className="text-emerald-300 font-bold">After 30 Days</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {GROWTH_METRICS.map((metric, idx) => {
              const Icon = iconMap[metric.iconName] || Users;
              const isSelected = selectedMetric === idx;
              const maxVal = metric.after * 1.15;
              const beforePercent = (metric.before / maxVal) * 100;
              const afterPercent = (metric.after / maxVal) * 100;

              return (
                <button
                  key={metric.label}
                  onClick={() => setSelectedMetric(idx)}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-neutral-900 border-emerald-400 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-neutral-800 text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {metric.growth}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-tight min-h-[32px] flex items-center">
                      {metric.label}
                    </h4>
                  </div>

                  {/* Visual Bar Comparison */}
                  <div className="py-4 space-y-2 w-full">
                    {/* Before Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Before</span>
                        <span className="font-mono">{metric.before}</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-600 rounded-full transition-all duration-500"
                          style={{ width: `${beforePercent}%` }}
                        />
                      </div>
                    </div>

                    {/* After Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-emerald-400 font-bold">
                        <span>After 30d</span>
                        <span className="font-mono">{metric.after}</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                          style={{ width: `${afterPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 line-clamp-2">
                    {metric.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Metric Deep Dive Box */}
          <div className="mt-6 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Detailed Insight: {GROWTH_METRICS[selectedMetric].label}
              </span>
              <p className="text-sm text-neutral-200">
                Increased from <strong className="text-white">{GROWTH_METRICS[selectedMetric].before} {GROWTH_METRICS[selectedMetric].unit}</strong> to <strong className="text-emerald-400">{GROWTH_METRICS[selectedMetric].after} {GROWTH_METRICS[selectedMetric].unit}</strong> in 30 days ({GROWTH_METRICS[selectedMetric].growth}).
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block uppercase">Conversion Multiplier</span>
                <span className="text-lg font-black text-amber-300 font-mono">
                  {GROWTH_METRICS[selectedMetric].growth}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Population & Opportunity Funnel (Slide 8) & ROI Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Krishnagiri Population Funnel (Slide 8) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-xs font-bold text-cyan-400 border border-neutral-800">
                <span>Slide 08 • Market Reach Opportunity</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Krishnagiri's Population & Addressable Market
              </h3>
              <p className="text-xs text-neutral-400">
                Data-driven calculation on how capturing even a fraction of the regional population creates explosive revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 uppercase">Total Population</span>
                <p className="text-2xl font-black text-white font-mono">~2.45M</p>
                <p className="text-[10px] text-neutral-400">District & economic corridor</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-cyan-500/30 space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase">Target 10% Market</span>
                <p className="text-2xl font-black text-cyan-300 font-mono">~245,000</p>
                <p className="text-[10px] text-neutral-400">Active online seekers</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase">Qualified Leads</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">~24,500+</p>
                <p className="text-[10px] text-emerald-300 font-semibold">Good Leads = More Profit $</p>
              </div>
            </div>

            {/* List of deliverables you get (Slide 6) */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                What You Get With DCOLLABERZ:
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>More local customers from Krishnagiri, Hosur, Dharmapuri & nearby areas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Higher quality enquiries through Google Maps & Meta Ads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Consistent predictable customer flow instead of seasonal guesswork</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Interactive Local ROI & Revenue Calculator */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-amber-500/30 flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Interactive Growth Simulator</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Estimate Your 30-Day Revenue Upside
              </h3>
              <p className="text-xs text-neutral-400">
                Select your business industry to estimate realistic lead volume and pipeline value.
              </p>
            </div>

            {/* Industry Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {(['Real Estate', 'Hospital', 'Restaurant', 'Showroom', 'School'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCalculatorCategory(cat as any);
                    setAvgTicketSize(categoryDefaults[cat]?.ticket || 50000);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    calculatorCategory === (cat as any)
                      ? 'bg-amber-400 text-neutral-950 shadow-md'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Input Slider for Ticket Size */}
            <div className="space-y-2 bg-neutral-900/80 p-4 rounded-xl border border-neutral-800">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300">Average Customer Value / Ticket Size:</span>
                <span className="font-bold text-amber-300 font-mono">₹{avgTicketSize.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={500}
                max={300000}
                step={500}
                value={avgTicketSize}
                onChange={(e) => setAvgTicketSize(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Forecast Output Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-amber-400/40 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Est. Monthly Leads</span>
                  <span className="text-xl font-extrabold text-white font-mono">
                    {currentCalc.monthlyLeads}+ Leads
                  </span>
                </div>
                <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Est. Closures (30d)</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    {Math.round(currentCalc.monthlyLeads * currentCalc.closeRate)} Deals
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">Projected New Monthly Pipeline:</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    ₹{estimatedNewRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                  ~4.5x Average ROI
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
