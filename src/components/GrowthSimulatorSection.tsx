import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  MessageCircle, 
  PhoneCall, 
  Users, 
  Building2, 
  Store, 
  GraduationCap, 
  Home, 
  Briefcase, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  RefreshCw, 
  Download,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { useTheme } from '../lib/ThemeContext';

const INDUSTRIES = [
  { id: 'restaurant', name: 'Restaurant & Banquet Hall', avgTicket: 1200, conversionRate: 0.18, icon: Store, defaultBudget: 35000 },
  { id: 'hospital', name: 'Hospital & Healthcare Clinic', avgTicket: 4500, conversionRate: 0.22, icon: Building2, defaultBudget: 50000 },
  { id: 'realestate', name: 'Real Estate & Villa Plots', avgTicket: 75000, conversionRate: 0.08, icon: Home, defaultBudget: 75000 },
  { id: 'showroom', name: 'Retail Showroom & Silks / Jewellery', avgTicket: 6500, conversionRate: 0.16, icon: Store, defaultBudget: 50000 },
  { id: 'education', name: 'School & College Admissions', avgTicket: 35000, conversionRate: 0.14, icon: GraduationCap, defaultBudget: 60000 },
  { id: 'manufacturing', name: 'B2B & Manufacturing Motors', avgTicket: 85000, conversionRate: 0.09, icon: Briefcase, defaultBudget: 65000 },
];

export const GrowthSimulatorSection: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(50000);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('Krishnagiri');
  
  // AI State
  const [aiPromptGoal, setAiPromptGoal] = useState('+500% WhatsApp Leads in 30 Days');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  // Mathematical Growth Model Calculations
  const calculatedMetrics = useMemo(() => {
    // Standard CPM for Krishnagiri/Tamil Nadu region is approx ₹110
    const estimatedImpressions = Math.round((monthlyBudget / 110) * 1000 * 1.8);
    
    // Google Maps & Search discovery
    const googleSearches = Math.round(monthlyBudget * 0.12);
    
    // High intent WhatsApp clicks (approx ₹24 per qualified lead click)
    const costPerLead = selectedIndustry.id === 'realestate' ? 140 : selectedIndustry.id === 'manufacturing' ? 180 : 35;
    const estimatedLeads = Math.max(25, Math.round((monthlyBudget * 0.65) / costPerLead));
    
    // Estimated closed customers
    const estimatedCustomers = Math.max(4, Math.round(estimatedLeads * selectedIndustry.conversionRate));
    
    // Estimated Gross Revenue Pipeline generated
    const estimatedRevenue = estimatedCustomers * selectedIndustry.avgTicket;
    
    // Projected ROAS (Return on Ad Spend)
    const projectedRoas = (estimatedRevenue / monthlyBudget).toFixed(1);

    return {
      impressions: estimatedImpressions,
      googleSearches,
      leads: estimatedLeads,
      customers: estimatedCustomers,
      revenue: estimatedRevenue,
      roas: projectedRoas,
    };
  }, [monthlyBudget, selectedIndustry]);

  const handleGenerateAiStrategy = async () => {
    setIsGeneratingAi(true);
    try {
      const payload = {
        businessName: businessName || `${selectedIndustry.name} in ${location}`,
        industry: selectedIndustry.name,
        location: location,
        monthlyBudget: `₹${monthlyBudget.toLocaleString('en-IN')}`,
        goal: aiPromptGoal,
        targetAudience: 'Krishnagiri, Hosur, Dharmapuri, and surrounding Tamil Nadu region',
      };

      const res = await fetch('/api/ai-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.strategy) {
        setAiReport(data.strategy);
      } else {
        setAiReport(
          `### 🚀 30-Day Growth Blueprint for ${payload.businessName}\n\n**1. Week 1: 4K Commercial Shoot & Local SEO Setup**\n- Film 6 cinematic hook reels and verify Google 3-Pack keywords for ${location}.\n\n**2. Week 2: Meta Ads & 1-Click WhatsApp Pipeline**\n- Target regional buyers with ₹${Math.round(monthlyBudget * 0.6).toLocaleString('en-IN')} ad budget routing directly into WhatsApp.\n\n**3. Week 3: Google Search PPC Blitz**\n- Target high-intent queries with call extensions for immediate appointment booking.\n\n**4. Week 4: Live Power BI Dashboard Attribution**\n- Analyze closed customers and scale top-converting ads.`
        );
      }
    } catch (err) {
      console.error('AI strategy generation error:', err);
      setAiReport(
        `### 🚀 30-Day Growth Blueprint for ${selectedIndustry.name} in ${location}\n\n- **Projected Qualified Leads**: ${calculatedMetrics.leads}+ monthly inquiries\n- **Target Channel**: Google 3-Pack + Meta 4K Reels + WhatsApp Automation\n- **Estimated ROAS**: ${calculatedMetrics.roas}x return on ₹${monthlyBudget.toLocaleString('en-IN')} budget.`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ!\nI used your Interactive Growth Simulator for my business (${selectedIndustry.name} in ${location}).\nMy Budget: ₹${monthlyBudget.toLocaleString('en-IN')}/mo\nTarget: ${calculatedMetrics.leads} Leads & ${calculatedMetrics.roas}x ROAS.\nPlease review my 30-day strategy.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    if (aiReport) {
      navigator.clipboard.writeText(aiReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-slate-100/70 text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-950 text-neutral-100 border-b border-neutral-800'
      }`}
      id="growth-simulator"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (7th in layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-widest text-emerald-400 shadow-md">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>07 • INTERACTIVE ROI & LEAD SIMULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            Calculate Your Business <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              Growth Potential
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Simulate your monthly customer acquisition, WhatsApp enquiries, and revenue growth across Krishnagiri, Hosur & Tamil Nadu.
          </p>
        </motion.div>

        {/* 2-Column Simulator Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl">
            
            {/* 1. Industry Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Select Your Industry Archetype</span>
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map((ind) => {
                  const Icon = ind.icon;
                  const isSelected = selectedIndustry.id === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setMonthlyBudget(ind.defaultBudget);
                      }}
                      className={`p-3 rounded-2xl text-left border text-xs transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold shadow-md'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                      <span className="truncate">{ind.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Monthly Budget Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Monthly Growth Budget</span>
                </label>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  ₹{monthlyBudget.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min="20000"
                max="150000"
                step="5000"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>₹20,000 (Starter)</span>
                <span>₹75,000 (Growth)</span>
                <span>₹1,50,000 (Enterprise)</span>
              </div>
            </div>

            {/* 3. Business Name & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Banquet / City Dental"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                  Primary Region
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Krishnagiri">Krishnagiri District</option>
                  <option value="Hosur">Hosur Industrial Hub</option>
                  <option value="Dharmapuri">Dharmapuri</option>
                  <option value="Kaveripattinam">Kaveripattinam</option>
                  <option value="Pan-Tamil Nadu">Pan-Tamil Nadu State</option>
                </select>
              </div>
            </div>

            {/* AI Generator CTA */}
            <div className="pt-3 border-t border-neutral-800">
              <button
                onClick={handleGenerateAiStrategy}
                disabled={isGeneratingAi}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>Gemini AI Generating 30-Day Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-neutral-950" />
                    <span>Generate Instant 30-Day AI Roadmap</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Real-Time Calculated ROI Projection */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Metrics Grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    Live Growth Forecast
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    30-Day Projected Output
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400">Target ROAS</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {calculatedMetrics.roas}x
                  </div>
                </div>
              </div>

              {/* 4 Core Forecast Tiles */}
              <div className="grid grid-cols-2 gap-3.5">
                
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Regional Impressions</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {calculatedMetrics.impressions.toLocaleString('en-IN')}+
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1">Google & Meta Feeds</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Inquiries</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    {calculatedMetrics.leads}+
                  </div>
                  <p className="text-[10px] text-emerald-500/80 mt-1">High-Intent Chat Leads</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Converted Clients</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
                    {calculatedMetrics.customers}–{calculatedMetrics.customers + 6}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1">Paying Customers</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Projected Pipeline</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                    ₹{calculatedMetrics.revenue.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1">Estimated Sales Value</p>
                </div>

              </div>

              {/* Share & WhatsApp Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Forecast to DCOLLABERZ via WhatsApp</span>
                </button>
              </div>

            </div>

            {/* AI Generated Output Display */}
            <AnimatePresence>
              {aiReport && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-6 rounded-3xl bg-neutral-900 border border-cyan-500/40 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">
                        AI Custom 30-Day Blueprint
                      </span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2">
                    {aiReport}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
