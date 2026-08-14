import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  MessageCircle, 
  RefreshCw,
  Building2,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { BRAND_INFO } from '../data';

export const AiGrowthAdvisor: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Hospital & Healthcare');
  const [location, setLocation] = useState('Krishnagiri');
  const [monthlyGoal, setMonthlyGoal] = useState('Get 50+ high-value patient appointments and dominate Google Maps');
  const [currentBottlenecks, setCurrentBottlenecks] = useState('Low online visibility, competitors ranking higher');
  const [budgetRange, setBudgetRange] = useState('₹50,000 / month (Growth Lead)');

  const [isLoading, setIsLoading] = useState(false);
  const [strategyResult, setStrategyResult] = useState<any>(null);

  const handleGenerateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessType,
          location,
          monthlyGoal,
          currentBottlenecks,
          budgetRange,
        }),
      });

      const data = await res.json();
      setStrategyResult(data);
    } catch (err) {
      console.error('Failed to generate AI Strategy:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppStrategy = () => {
    if (!strategyResult) return;
    const text = encodeURIComponent(
      `Hello DCOLLABERZ! I generated an AI Growth Blueprint for ${businessName || 'my business'} in ${location}.\nGoal: ${monthlyGoal}\nRecommended Package: ${strategyResult.recommendedPackage || 'Gold Growth'}.\nLet's schedule a kickoff session.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-white relative overflow-hidden" id="ai-audit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Growth Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Instant 30-Day Growth Blueprint <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              Tailored for Your Business
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            Powered by DCOLLABERZ's strategic playbook and advanced marketing intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Enter Business Profile</span>
            </h3>

            <form onSubmit={handleGenerateStrategy} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Business / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Multi-Speciality Clinic"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Industry Sector</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  >
                    <option>Hospital & Healthcare</option>
                    <option>Real Estate & Construction</option>
                    <option>Restaurant & Cafe</option>
                    <option>Automobile Showroom</option>
                    <option>School & College</option>
                    <option>Jewellery & Retail</option>
                    <option>Manufacturing & Industrial</option>
                    <option>Local Professional Services</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Location Hub</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Krishnagiri / Hosur"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Primary Monthly Growth Goal</label>
                <input
                  type="text"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(e.target.value)}
                  placeholder="e.g. +150 WhatsApp inquiries from Krishnagiri"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Current Marketing Bottlenecks</label>
                <input
                  type="text"
                  value={currentBottlenecks}
                  onChange={(e) => setCurrentBottlenecks(e.target.value)}
                  placeholder="e.g. Low Google Reviews, weak Meta ads, cold website"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Monthly Marketing Budget Bracket</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                >
                  <option>₹25,999 / month (Tier-1 Silver Starter)</option>
                  <option>₹50,000 / month (Tier-2 Gold Growth Lead)</option>
                  <option>₹75,000+ / month (Tier-3 Diamond Full Performance)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating 30-Day Growth Blueprint...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-neutral-950" />
                    <span>Generate Free 30-Day Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right AI Output Canvas */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 min-h-[480px] flex flex-col justify-between space-y-6">
            {!strategyResult ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Your Custom Blueprint Awaits</h4>
                  <p className="text-xs text-neutral-400 max-w-md">
                    Fill out the parameters on the left to receive a custom 30-day marketing roadmap with audience demographics, funnel breakdown, projected reach, and expected ROI.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateStrategy}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-amber-300 border border-neutral-700"
                >
                  Load Sample Hospital / Real-Estate Blueprint
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Executive Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                      Strategic Assessment
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                      High-Confidence Funnel
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed">
                    {strategyResult.executiveSummary}
                  </p>
                </div>

                {/* 30-Day Projected Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase block">Est. Reach (30d)</span>
                    <span className="text-sm font-bold text-white">
                      {strategyResult.estimated30DayMetrics?.estimatedReach || '25,000+ Reach'}
                    </span>
                  </div>

                  <div className="p-3.5 bg-neutral-950 rounded-2xl border border-emerald-500/40">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">Est. Enquiries</span>
                    <span className="text-sm font-bold text-emerald-300">
                      {strategyResult.estimated30DayMetrics?.estimatedEnquiries || '120 - 240 Leads'}
                    </span>
                  </div>

                  <div className="p-3.5 bg-neutral-950 rounded-2xl border border-amber-500/40">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Projected ROI</span>
                    <span className="text-sm font-bold text-amber-300">
                      {strategyResult.estimated30DayMetrics?.estimatedRoi || '4.5x Return'}
                    </span>
                  </div>
                </div>

                {/* 4-Stage Funnel Action Items */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                    Recommended 4-Stage Execution:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                      <strong className="text-amber-400 block mb-1">1. ATTRACT (Top):</strong>
                      <p className="text-neutral-300">{strategyResult.recommendedFunnel?.attract?.join(' • ')}</p>
                    </div>
                    <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                      <strong className="text-cyan-400 block mb-1">2. ENGAGE (Mid):</strong>
                      <p className="text-neutral-300">{strategyResult.recommendedFunnel?.engage?.join(' • ')}</p>
                    </div>
                    <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                      <strong className="text-emerald-400 block mb-1">3. CONVERT (Bottom):</strong>
                      <p className="text-neutral-300">{strategyResult.recommendedFunnel?.convert?.join(' • ')}</p>
                    </div>
                    <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                      <strong className="text-yellow-400 block mb-1">4. ANALYSIS (Scale):</strong>
                      <p className="text-neutral-300">{strategyResult.recommendedFunnel?.analysis?.join(' • ')}</p>
                    </div>
                  </div>
                </div>

                {/* Actionable Quick Wins */}
                {strategyResult.actionableQuickWins && (
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                      Immediate Day 1 - Day 7 Quick Wins:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {strategyResult.actionableQuickWins.map((win: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* WhatsApp Hand-off CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Recommended Retainer:</span>
                    <span className="text-xs font-bold text-amber-300">{strategyResult.recommendedPackage}</span>
                  </div>

                  <button
                    onClick={handleWhatsAppStrategy}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Execute This Plan with DCOLLABERZ</span>
                  </button>
                </div>

              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
