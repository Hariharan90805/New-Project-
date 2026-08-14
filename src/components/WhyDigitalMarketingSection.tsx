import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Search,
  MessageSquare,
  Smartphone,
  Store,
  Building2
} from 'lucide-react';
import { PILLARS, PROBLEMS_VS_SOLUTIONS, BRAND_INFO } from '../data';

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

export const WhyDigitalMarketingSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null);

  const customerBehaviors = [
    {
      title: 'Customers search on Google before visiting',
      desc: '93% of purchasing decisions in Krishnagiri & Hosur start with a mobile search for "near me" or best local service.',
      icon: Search,
    },
    {
      title: 'People check Instagram & Facebook first',
      desc: 'Local customers browse social media to verify quality, check latest reels, and view recent customer photos.',
      icon: Smartphone,
    },
    {
      title: 'Google Reviews directly influence choices',
      desc: 'A business with 4.8 stars and 100+ reviews gets 80% of local market footfall compared to unverified competitors.',
      icon: CheckCircle,
    },
    {
      title: 'WhatsApp is the #1 Enquiry Channel',
      desc: 'Tamil Nadu customers prefer instant 1-click WhatsApp messaging over slow email or awkward cold phone calls.',
      icon: MessageSquare,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-neutral-100 relative overflow-hidden" id="why-marketing">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Deck Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span>02 • Strategic Foundation</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Why Digital Marketing <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Matters Today
            </span>
          </h2>

          {/* Quote verbatim from Slide 2 */}
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm sm:text-base leading-relaxed italic text-left shadow-lg">
            <span className="text-amber-400 text-2xl font-serif leading-none mr-2">“</span>
            Today, customers don't just walk into a shop and ask for a product or service. Before making a decision, they search on Google, check Instagram and Facebook, read reviews, compare prices, and look at what other customers are saying. So, if your business is not visible online, your potential customer may choose your competitor instead. Digital marketing is not simply about posting on social media. It is a system to bring the right customers to your business and convert them into enquiries and sales.
            <span className="text-amber-400 text-2xl font-serif leading-none ml-1">”</span>
          </div>
        </motion.div>

        {/* The Core Question: Slide 3 Strong Line */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          className="mb-20 p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                <Store className="w-4 h-4" />
                <span>The Core Business Reality</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                "Our goal is not to make your business look popular online. <br />
                <span className="text-emerald-400">
                  Our goal is to make your online presence bring you real customers and measurable business growth.
                </span>"
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Whether you are running a <strong>restaurant, hospital, school, real-estate business, showroom, service business, manufacturing company or retail store</strong> in Krishnagiri or Hosur, your customers are already online right now.
              </p>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-neutral-950/80 border border-amber-400/40 text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm font-bold text-white uppercase tracking-wide">
                The Big Question:
              </p>
              <p className="text-base font-extrabold text-amber-300">
                "Are they finding YOUR business, or are they finding your competitor?"
              </p>
              <p className="text-xs text-neutral-400">
                That is exactly where DCOLLABERZ transforms your bottom line.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Changing Customer Behaviour in Krishnagiri Grid */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">
              The Changing Customer Behaviour in Krishnagiri & Regional Hubs
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              How local buyers make decisions in 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerBehaviors.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900 transition-all duration-300 space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Problems vs Solutions Matrix (Slide 4) */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              <span>Slide 04 • Problems & Solutions</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Problems Local Businesses Face vs. What Digital Marketing Solves
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {PROBLEMS_VS_SOLUTIONS.map((item, idx) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Problem #{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.problem}</h4>
                  <p className="text-xs text-neutral-400">{item.problemDesc}</p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>DCOLLABERZ Fix</span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-200">{item.solution}</p>
                  <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {item.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 9 Pillars of Digital Marketing (Slide 9) */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              <span>Slide 09 • The 9 Pillars</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              The 9 Core Pillars of DCOLLABERZ
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              "Digital marketing is not just about being visible online — it is about reaching the right customers, generating qualified leads, building trust, and driving measurable business growth."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || Sparkles;
              const isHovered = activePillarIndex === idx;

              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  onMouseEnter={() => setActivePillarIndex(idx)}
                  onMouseLeave={() => setActivePillarIndex(null)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group ${
                    isHovered
                      ? 'bg-neutral-900 border-amber-400/70 shadow-xl shadow-amber-500/10 scale-[1.02]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-widest text-amber-400/90 font-mono">
                        PILLAR {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-500/30 inline-block">
                      {pillar.highlight}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
