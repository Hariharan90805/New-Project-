import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Award, 
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { PRICING_TIERS, BRAND_INFO } from '../data';
import { PricingTier } from '../types';

interface PricingSectionProps {
  onSelectTier: (tier: PricingTier, cycle: 'monthly' | 'quarterly') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const handleWhatsAppInquiry = (tier: PricingTier) => {
    const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceQuarterly;
    const text = encodeURIComponent(
      `Hello DCOLLABERZ! I want to start with ${tier.tierNumber} - ${tier.name} (₹${price.toLocaleString('en-IN')}/${billingCycle === 'monthly' ? 'mo' : 'mo (Quarterly)'}) for my business in ${BRAND_INFO.serviceAreas[0]}. Please share onboarding steps.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
    
    // Log WhatsApp event
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Pricing Card WhatsApp Button', packageInterest: tier.name }),
    }).catch(() => {});
  };

  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-white relative overflow-hidden" id="pricing">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from Slide 11 */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span>Slide 05 & 12 • Packages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Choose the Level of Momentum <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              Your Business is Ready to Create.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            Transparent pricing tailored for Krishnagiri, Hosur, Dharmapuri, and regional enterprises.
          </p>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-emerald-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Quarterly (3 Months)</span>
              <span className="bg-neutral-950 text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Slide 11: Tier-1, Tier-2, Tier-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceQuarterly;
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-black border-2 border-amber-400/90 shadow-2xl shadow-amber-500/20 scale-[1.03] z-20'
                    : 'bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                {/* Popular / Market Leader Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-neutral-950 shadow-amber-500/30'
                        : 'bg-gradient-to-r from-cyan-500 to-teal-400 text-neutral-950 shadow-cyan-500/30'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title & Subtitle */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">
                        {tier.tierNumber}
                      </span>
                      {isPopular && <Sparkles className="w-5 h-5 text-amber-400" />}
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="pb-6 border-b border-neutral-800 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-neutral-400 text-sm font-semibold">
                        / month
                      </span>
                    </div>
                    {billingCycle === 'quarterly' && (
                      <span className="text-[11px] text-emerald-400 font-semibold block">
                        Billed quarterly (₹{(price * 3).toLocaleString('en-IN')}) • 15% Savings applied
                      </span>
                    )}
                  </div>

                  {/* Recommended For Quote */}
                  <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-300">
                    <strong className="text-white block mb-0.5">Ideal For:</strong>
                    {tier.recommendedFor}
                  </div>

                  {/* Features List from Slide 11 */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Everything Included in {tier.tierNumber}:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <div className={`mt-0.5 p-0.5 rounded-full ${
                            isPopular ? 'bg-amber-400 text-neutral-950' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-8 space-y-3">
                  {/* Instant Checkout Button */}
                  <button
                    onClick={() => onSelectTier(tier, billingCycle)}
                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 shadow-amber-500/25'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Select & Pay Online (₹{price.toLocaleString('en-IN')})</span>
                  </button>

                  {/* WhatsApp Quick Chat */}
                  <button
                    onClick={() => handleWhatsAppInquiry(tier)}
                    className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-14 text-center max-w-2xl mx-auto space-y-2 text-xs text-neutral-400">
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified Local ROI Guarantee
            </span>
            <span>•</span>
            <span className="text-neutral-300">No Long-Term Lock-in</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">1-on-1 Monthly Strategy Lead</span>
          </div>
          <p>
            Custom enterprise requirements for industrial manufacturers or regional hospital chains? Contact us for a bespoke roadmap.
          </p>
        </div>

      </div>
    </section>
  );
};
